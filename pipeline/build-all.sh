#!/bin/bash 
# this script is created for building the project as an executable file.  

crtVersion=$1

if [ -z $crtVersion ]; then
    echo "[E] crtVersion is required."
    exit 1
fi

if [ "$TAG_MODE" = "true" ]; then
    export LAFTOOLS_ROOT=/home/runner/work/LafTools/LafTools-tag
    cp -a /home/runner/work/LafTools/LafTools /home/runner/work/LafTools/LafTools-tag
fi

echo "[I] LafTools is located at $LAFTOOLS_ROOT"
cd $LAFTOOLS_ROOT
echo "[I] PWD: $(pwd)"
distDir=./dist

clean-bundle(){
    echo "[I] $(date) Working..."
    echo "[I] PWD: $(pwd)"
    echo "[I] Removing dist dir: $distDir"
    [ -d $distDir ] && rm -rf $distDir  

    # dist dir
    mkdir -p $distDir
    # pkg
    pkgDir=$distDir/pkg
    [ -d $pkgDir ] && rm -rf $pkgDir
    mkdir -p $pkgDir
    # docker
    dockerDir=$distDir/docker
    [ -d $dockerDir ] && rm -rf $dockerDir
    mkdir -p $dockerDir
}

build-bundle(){
    bundleMode=$1


    echo "
    import { AppInfoClz } from \"./types\"

    export default {
    \"version\": \"$crtVersion\",
    \"releaseDate\": \"$(date +%Y-%m-%d)\",
    \"timestamp\": \"$(date +%s)\"
    } satisfies AppInfoClz
    " > ./modules/web2/app/[lang]/info.tsx


    if [ -z jq ]; then
        echo "[E] jq is not installed, please install jq first."
        exit 1
    fi

    set +e
    source ./pipeline/env.sh
    mode=$1

    crossPlatformDir=$LAFTOOLS_ROOT/cross-platform
    if [ ! -d $crossPlatformDir ]; then
        echo "[I] downloading runtime nodejs"
        ./pipeline/fetch-runtime-nodejs.sh &> /dev/null
    else 
        echo "[I] runtime nodejs already exists in $crossPlatformDir, skip downloading."
    fi


    # building LafTools with dev commands
    build-cmd(){
        echo "[I] building cmd"

        echo "[I] built cmd"
    }

    build-core(){
        platformName=$1
        platformArch=$2
        platformGoFile=$3
        platformExt=bin
        argGOOS=$4
        osPatchDir=./os-patch/$platformName
        platformDistDir=./dist/os/$platformName/
        echo "--------- CORE $platformName BEGIN ---------"
        echo "[I] building be core"
        osScriptFile=$argGOOS
        if [ $platformName == "windows-x64" ] || [ $platformName == "windows-arm64" ]; then
            platformExt=exe
        fi
        
        mkdir -p $platformDistDir
        if [ $bundleMode != "no-nodejs" ]; then
            mkdir -p $platformDistDir/bin
        else
            [ -d $platformDistDir/bin ] && rm -rf $platformDistDir/bin
        fi
        echo "[I] building [$platformName]"
        # GOOS=$argGOOS GOARCH=$platformArch go build -o $platformDistDir/core.$platformExt core/app.go 

        echo "[I] copying os-patch..."

        if [ -d $osPatchDir ];then 
            cp -a $osPatchDir/* $platformDistDir
        fi

        echo "[I] copying resources and web..."

        # cp -a ./dist/resources $platformDistDir
        cp -a ./dist/web2 $platformDistDir/core

        cp -a ./pipeline/parcel/scripts/$osScriptFile/* $platformDistDir

        if [ $bundleMode != "no-nodejs" ]; then
            echo "[I] copying nodejs service..."
            cp -a ./cross-platform/$platformName/node-dir $platformDistDir/bin/node
        fi
        echo "[I] built"
    }

    build-res(){
        cp -a ./resources/ ./dist/resources
        uglifyAllJSONInDir "./dist/resources"   
    }

    build-fe(){
        set -e
        echo "[I] building fe"
        (
            cd ./modules/web2
            # [ ! -d node_modules ] && npm install --production --verbose --force 
            # [ ! -d node_modules ] && npm install -S -D --force 
            [ -d node_modules ] && rm -rf node_modules
            rm -f *lock*
            [ ! -d node_modules ] && npm install --omit=dev --force 
            # [ ! -d node_modules ] && npm install -S -D --force 
            npm run build
            cd .next
            cp -a ../public/ ./standalone/public
            cp -a  ./static/ ./standalone/.next/static
            cd ..
            [ -d $LAFTOOLS_ROOT/dist/web2 ] && rm -rf $LAFTOOLS_ROOT/dist/web2
            cp -a ./.next/standalone/ $LAFTOOLS_ROOT/dist/web2
            echo "[I] fe bundle size: $(du -sh $LAFTOOLS_ROOT/dist/web2)"
        )
        echo "[I] built fe"
        set +e
    }

    build-be(){
        if [[ $mode = "linux" ]]; then
            build-core linux-x64 amd64 "core/app_unix.go" linux
            build-core linux-arm64 arm64 "core/app_unix.go" linux
        else
            build-core windows-x64 amd64 "core/app_windows.go" windows
            build-core windows-arm64 arm64 "core/app_windows.go" windows
            build-core linux-x64 amd64 "core/app_unix.go" linux
            build-core linux-arm64 arm64 "core/app_unix.go" linux
            build-core darwin-x64 amd64 "core/app_unix.go" darwin
            build-core darwin-arm64 arm64 "core/app_unix.go" darwin
        fi
    }

    refining(){
        echo "[I] refining resources.."
        find ./pipeline -iname "*.bin" -exec chmod 755 {} \;
        find ./dist -iname "*.bin" -exec chmod 755 {} \;
        find ./dist -iname "*.sh" -exec chmod 755 {} \;
        find ./dist -iname "*.command" -exec chmod 755 {} \;
        find ./dist -iname "ph" -exec rm -f {} \;
    }

    package-for(){
        platformName=$1
        packageType=$2
        platformDistDir=./dist/os/$platformName/
        if [ -z $packageType ]; then
            packageType=tar.gz
        fi
        echo "[I] packaging for $platformName"
        (
            cd $platformDistDir
            fileName=
            affix=
            if [ "$bundleMode" = "no-nodejs" ]; then
                affix="-NO-RUNTIME-PACK"
            fi
            if [ $packageType == "zip" ]; then
                fileName=$platformName$affix.zip
                zip -r $fileName ./* &> /dev/null
            else
                fileName=$platformName$affix.tar.gz
                tar -zcvf $fileName ./* &> /dev/null
            fi
            mv $fileName ../../pkg
            # do verify 
            cd ../../pkg
            echo "[I] verifying $fileName"
            if [ $packageType == "zip" ]; then
                unzip -l $fileName &> /dev/null
            else
                tar -ztvf $fileName &> /dev/null
            fi
            echo "[I] file size: $(du -sh $fileName | awk '{print $1}')"
        )
    }
    package-all(){
        echo "[I] packaging all platforms"
        if [[ $mode = "linux" ]]; then
            package-for linux-x64
            package-for linux-arm64
        else
            package-for windows-x64 zip
            package-for windows-arm64 zip
            package-for linux-x64
            package-for linux-arm64
            package-for darwin-x64
            package-for darwin-arm64
        fi
        echo "[I] packaged all platforms"
    }

    dockerize-laftools(){
        platformName=$1
        echo "[I] dockerizing laftools for $platformName"
        subDockerDir=$dockerDir/$platformName
        mkdir -p $subDockerDir
        (
            cd $subDockerDir
            cp ../../pkg/*$platformName.tar.gz ./linux.tar.gz
            cp $LAFTOOLS_ROOT/pipeline/parcel/docker/* ./
            find . -iname "*.sh" -exec chmod 755 {} \;
            ls -ahlrt
            docker build -t codegentoolbox/laftools-$platformName:$crtVersion -f ./Dockerfile .
            docker push codegentoolbox/laftools-$platformName:$crtVersion
            if [ $platformName == "linux-x64" ]; then
                docker save codegentoolbox/laftools-$platformName:$crtVersion > $LAFTOOLS_ROOT/dkout.tmp
                zip -r $LAFTOOLS_ROOT/pipeline-server.zip $LAFTOOLS_ROOT/pipeline/server
                gzip $LAFTOOLS_ROOT/dkout.tmp
                echo "[I] docker output file: $LAFTOOLS_ROOT/dkout.tmp.gz, size is $(du -sh $LAFTOOLS_ROOT/dkout.tmp.gz | awk '{print $1}')"
            fi
        )
    }

    docker-all(){
        # check if docker command is available
        if [ -z $(which docker) ]; then
            echo "[E] docker command is not available, will ignore this part. To run it, please install docker first."
            return;
        fi
        dockerize-laftools linux-x64
        dockerize-laftools linux-arm64
    }


    # [BEGIN]
    # build core and fe
    build-cmd
    build-res
    build-fe 
    build-be
    # refine resources
    refining
    # package as zip and tar.gz
    package-all
    # build docker images
    docker-all
    
    # [END]

    echo "[I] location: `pwd` and dist dir: $distDir"

}

clean-bundle
build-bundle "with-nodejs"
# build-bundle "no-nodejs"

echo "[I] $(date) Done."

#!/bin/bash 
# this script is created for building the project as an executable file.  


cd $(dirname $0)/..

distDir=./dist
set -e
source ./pipeline/env.sh
mode=$1

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
    
    [ -d $platformDistDir ] && rm -rf $platformDistDir

    mkdir -p $platformDistDir
    echo "[I] building [$platformName]"
    GOOS=$argGOOS GOARCH=$platformArch go build -o $platformDistDir/core.$platformExt core/app.go 

    echo "[I] copying os-patch..."

    if [ -d $osPatchDir ];then 
        cp -a $osPatchDir/* $platformDistDir
    fi

    echo "[I] copying resources and web..."

    cp -a ./dist/resources $platformDistDir
    cp -a ./dist/web $platformDistDir

    cp -a ./parcel/scripts/$osScriptFile/* $platformDistDir
    cp -a ./parcel/scripts/root/* $platformDistDir

    echo "[I] built"
}

build-res(){
    cp -a ./resources/ ./dist/resources
    uglifyAllJSONInDir "./dist/resources"   
}

build-fe(){
    echo "[I] building fe"
    (
        cd ./modules/web
        [ ! -d node_modules ] && pnpm install
        npm run build
        cp -a ./dist/ $LAFTOOLS_ROOT/dist/web
    )
    echo "[I] built fe"
}

build-be(){
    if [[ $mode = "linux" ]]; then
        build-core linux-x64 amd64 "core/app_unix.go" linux
        build-core linux-arm64 arm64 "core/app_unix.go" linux
    else
        build-core windows-x64 amd64 "core/app_windows.go" windows
        # build-core windows-arm64 arm64 "core/app_windows.go" windows
        build-core linux-x64 amd64 "core/app_unix.go" linux
        build-core linux-arm64 arm64 "core/app_unix.go" linux
        build-core darwin-x64 amd64 "core/app_unix.go" darwin
        build-core darwin-arm64 arm64 "core/app_unix.go" darwin
    fi
}

refining(){
    echo "[I] refining resources.."
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
        if [ $packageType == "zip" ]; then
            fileName=$platformName.zip
            zip -r $fileName ./* &> /dev/null
        else
            fileName=$platformName.tar.gz
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
        # package-for windows-arm64 zip
        package-for linux-x64
        package-for linux-arm64
        package-for darwin-x64
        package-for darwin-arm64
    fi
}

dockerize-laftools(){
    platformName=$1
    echo "[I] dockerizing laftools for $platformName"
    subDockerDir=$dockerDir/$platformName
    mkdir -p $subDockerDir
    (
        cd $subDockerDir
        cp ../../pkg/*$platformName.tar.gz ./linux.tar.gz
        cp $LAFTOOLS_ROOT/parcel/docker/* ./
        # date +%Y%m%d-%s
        sudo docker build -t codegentoolbox/laftools-$platformName:insider -f ./Dockerfile .
    )
}

docker-all(){
    if [[ "$mode" = "linux" ]]; then
        dockerize-laftools linux-x64
        dockerize-laftools linux-arm64
    fi
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


echo "[I] $(date) Done."

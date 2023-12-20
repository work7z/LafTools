#!/bin/bash 
# this script is created for building the project as an executable file.  


cd $(dirname $0)/..

distDir=./dist
set -e
source ./pipeline/env.sh

echo "[I] $(date) Working..."
echo "[I] PWD: $(pwd)"
echo "[I] Removing dist dir: $distDir"
[ -d $distDir ] && rm -rf $distDir  
mkdir -p $distDir

build-core(){
    platformName=$1
    platformArch=$2
    platformGoFile=$3
    platformExt=bin
    argGOOS=$4
    osPatchDir=./os-patch/$platformName
    platformDistDir=./dist/os/$platformName/
    echo "--------- CORE BEGIN ---------"
    echo "[I] building be core"
    osScriptFile=$argGOOS
    if [ $platformName == "windows-x64" ] || [ $platformName == "windows-arm64" ]; then
        platformExt=exe
    fi
    
    [ -d $platformDistDir ] && rm -rf $platformDistDir

    mkdir -p $platformDistDir
    echo "[I] building [$platformName]"
    GOOS=$argGOOS GOARCH=$platformArch go build -o $platformDistDir/core.$platformExt core/app.go $platformGoFile

    echo "[I] copying os-patch..."

    if [ -d $osPatchDir ];then 
        cp -a $osPatchDir/* $platformDistDir
    fi

    echo "[I] copying resources and web..."

    cp -a ./dist/resources $platformDistDir
    cp -a ./dist/web $platformDistDir

    cp -a ./os-script/$osScriptFile/* $platformDistDir
    cp -a ./os-script/root/* $platformDistDir

    echo "[I] built"
    echo "--------- CORE DONE ---------"
    echo ""
}

build-res(){
    cp -a ./resources/ ./dist/resources
    uglifyAllJSONInDir "./dist/resources"   
}

build-fe(){
    echo "[I] building fe"
    (
        cd ./sub/web
        [ ! -d node_modules ] && pnpm install
        npm run build
        cp -a ./dist/ $LAFTOOLS_ROOT/dist/web
    )
    echo "[I] built fe"
}

build-be(){
    # golang core
    build-core linux-x64 amd64 "core/app_unix.go" linux
    build-core linux-arm64 arm64 "core/app_unix.go" linux
    build-core darwin-x64 amd64 "core/app_unix.go" darwin
    build-core darwin-arm64 arm64 "core/app_unix.go" darwin
    build-core windows-x64 amd64 "core/app_windows.go" windows
    build-core windows-arm64 arm64 "core/app_windows.go" windows
}

clean-stuff(){
    echo "[I] executing chmod if needed.."
    find ./dist -iname "*.bin" -exec chmod 755 {} \;
    find ./dist -iname "*.sh" -exec chmod 755 {} \;
    find ./dist -iname "*.command" -exec chmod 755 {} \;
    find ./dist -iname "ph" -exec rm -f {} \;
}
test-run(){
    cd $LAFTOOLS_ROOT/dist/os/darwin-x64
    ./run.command
}

build-res
build-fe 
build-be
clean-stuff
# test-run


echo "[I] $(date) Done."

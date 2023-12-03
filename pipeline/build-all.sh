#!/bin/bash 
# this script is created for building the project as an executable file.  


cd $(dirname $0)/..
distDir=./dist
set -e
source ./pipeline/env.sh

echo "[I] $(date) Working..."

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

    if [ $platformName == "windows-x64" ] || [ $platformName == "windows-arm64" ]; then
        platformExt=exe
    fi

    [ -d $platformDistDir ] && rm -rf $platformDistDir

    mkdir -p $platformDistDir
    echo "[I] building [$platformName]"
    GOOS=$argGOOS GOARCH=$platformArch go build -o $platformDistDir/core.$platformExt core/CodeGenApplication.go $platformGoFile

    echo "[I] copying os-patch..."

    if [ -d $osPatchDir ];then 
        cp -a $osPatchDir/* $platformDistDir
    fi

    echo "[I] copying resources..."

    cp -a ./dist/resources $platformDistDir

    echo "[I] executing chmod if needed.."
    find $platformDistDir -iname "*.bin" -exec chmod 755 {} \;

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
        npm run build
    )
    echo "[I] built fe"
}

build-be(){
    # golang core
    build-core linux-x64 amd64 "core/CodeGenApplication_unix.go" linux
    build-core linux-arm64 arm64 "core/CodeGenApplication_unix.go" linux
    build-core darwin-x64 amd64 "core/CodeGenApplication_unix.go" darwin
    build-core darwin-arm64 arm64 "core/CodeGenApplication_unix.go" darwin
    build-core windows-x64 amd64 "core/CodeGenApplication_windows.go" windows
    build-core windows-arm64 arm64 "core/CodeGenApplication_windows.go" windows
}

build-res
build-fe 
build-be



echo "[I] $(date) Done."

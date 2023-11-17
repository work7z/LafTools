#!/bin/bash

cd "$(dirname "$0")"
source ./env.sh
cd ..


SYSTEM_NODE_PREFIX=system-node

downloadNodeJSToRuntime(){
    platformName=$1
    webLink=$2
    fileExt=$3
    sum=$4
    crossPlatformDir=./cross-platform/$platformName

    # check if webLink ends with fileExt
    if [[ ! $webLink =~ \.$fileExt$ ]]; then
        echo "webLink $webLink does not end with $fileExt"
        set -e
        exit 1
    fi


    mkdir -p $crossPlatformDir
    crtFile=$crossPlatformDir/$SYSTEM_NODE_PREFIX.$fileExt

    rm -f $crtFile 
    wget $webLink -O $crtFile
    shasum -a 256 $crtFile | grep $sum 
    if [ $? -ne 0 ]; then
        echo "verify $platformName failed, the sum is $sum"
        set -e
        exit 1
    fi


}


downloadNodeJSToRuntime linux-x64 https://nodejs.org/dist/latest-v8.x/node-v8.17.0-linux-x64.tar.xz tar.xz b7f6dd77fb173c8c7c30d61d0702eefc236bba74398538aa77bfa2bb47bddce6
downloadNodeJSToRuntime linux-arm64 https://nodejs.org/dist/latest-v8.x/node-v8.17.0-linux-arm64.tar.xz tar.xz 8318d1ee0265d84025ecbea76aaecd732974a6f4ac8492ddd84231cee77ba948
downloadNodeJSToRuntime darwin-x64 https://nodejs.org/dist/latest-v8.x/node-v8.17.0-darwin-x64.tar.xz tar.xz b6ef86df44292ba65f2b9a81b99a7db8de22a313f9c5abcebb6cf17ec24e2c97
downloadNodeJSToRuntime darwin-arm64 https://nodejs.org/dist/v20.9.0/node-v20.9.0-darwin-arm64.tar.xz tar.xz 2e0fb297d802ae6fd045ee37cd45bd4e489eac11dec89dcd5223fc48e02a1937
downloadNodeJSToRuntime windows-x64 https://nodejs.org/dist/latest-v8.x/node-v8.17.0-win-x64.7z 7z df219e9104fb602a3d720ae46eaf4a70cd46467a630862429b5594f9942baecc
downloadNodeJSToRuntime windows-arm64 https://nodejs.org/dist/v20.9.0/node-v20.9.0-win-arm64.7z 7z 51c314fc53049f05e5abe9388c20d8cb5fd7025842b3e83f41dee3ddc5c0ea12

echo "[I] $(date) Completed."
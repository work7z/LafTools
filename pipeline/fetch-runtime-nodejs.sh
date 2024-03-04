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
    curl $webLink --output $crtFile
    shasum -a 256 $crtFile | grep $sum 
    if [ $? -ne 0 ]; then
        echo "verify $platformName failed, the sum is $sum"
        set -e
        exit 1
    fi


}


downloadNodeJSToRuntime linux-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz tar.xz d8dab549b09672b03356aa2257699f3de3b58c96e74eb26a8b495fbdc9cf6fbe  
downloadNodeJSToRuntime linux-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-arm64.tar.xz tar.xz c957f29eb4e341903520caf362534f0acd1db7be79c502ae8e283994eed07fe1
downloadNodeJSToRuntime darwin-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-darwin-x64.tar.xz tar.xz ed69f1f300beb75fb4cad45d96aacd141c3ddca03b6d77c76b42cb258202363d      
downloadNodeJSToRuntime darwin-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-darwin-arm64.tar.xz tar.xz fd771bf3881733bfc0622128918ae6baf2ed1178146538a53c30ac2f7006af5b    
downloadNodeJSToRuntime windows-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.7z 7z fb9b5348259988a562a48eed7349e7e716c0bec78d98ad0a336b2993a8b3bf34  
downloadNodeJSToRuntime windows-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-arm64.7z 7z f1cd449fcbeb1b948e8498cb8edd9655fa319d109a7f4c5bd96a9b122b91538a  



echo "[I] $(date) Completed."
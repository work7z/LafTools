#!/bin/bash

# enter current dir
cd $(dirname $0)

prevMD5=
while [ 1 -eq 1 ];
do
    crtMD5=$(find ../src/ -exec ls -al {} \; | md5)
    if [ "$prevMD5" != "$crtMD5" ];then
        echo "File changed, start to build"
        prevMD5=$crtMD5
        ./build-tsx.sh
    fi
    sleep 1
done
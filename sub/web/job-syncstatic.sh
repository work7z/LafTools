#!/bin/bash
echo "[JOB] sync static files"
while [ 1 -eq 1 ];do 
    src=$PWD/public/static/
    target=$PWD/build/static/
    rsync -avz $src $target &> /dev/null
    sleep 1
done 


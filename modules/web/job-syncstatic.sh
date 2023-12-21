#!/bin/bash
echo "[JOB] sync static files"
while [ 1 -eq 1 ];do 
    src=$PWD/public/static/
    target=$PWD/build/static/
    rsync -avz $src $target &> /dev/null
    cp $LAFTOOLS_ROOT/modules/purejs/src/all-types.ts $LAFTOOLS_ROOT/modules/web/src/types
    sleep 5
done 


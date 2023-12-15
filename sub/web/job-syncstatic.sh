#!/bin/bash
echo "[JOB] sync static files"
while [ 1 -eq 1 ];do 
    src=$PWD/public/static/
    target=$PWD/build/static/
    rsync -avz $src $target &> /dev/null
    cp $LAFTOOLS_ROOT/sub/purejs/src/all-types.ts $LAFTOOLS_ROOT/sub/web/src/pages/FixedWorkBench/definitions/all-types.ts
    sleep 5
done 


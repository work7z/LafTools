#!/bin/bash
echo "[JOB] sync static files"
# copyFile(){
#     existFile=$1
#     newFile=$2
#     rm -f $newFile.tmp
#     echo "// DO NOT UPDATE THIS FILE, IT IS SYNCHRONIZED FROM modules/purejs/src/purejs-types.ts" >> $newFile.tmp
#     echo "" >> $newFile.tmp
#     cat $existFile  >> $newFile.tmp
#     mv $newFile.tmp $newFile
# }
# while [ 1 -eq 1 ];do 
#     # src=$PWD/public/static/
#     # target=$PWD/build/static/
#     # rsync -avz $src $target &> /dev/null
#     existFile=$LAFTOOLS_ROOT/modules/purejs/src/purejs-types.ts 
#     newFile=$LAFTOOLS_ROOT/modules/web/src/types/purejs-types-READ_ONLY.ts
#     copyFile "$existFile" "$newFile"
#     sleep 3
# done 


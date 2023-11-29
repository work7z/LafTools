#!/bin/bash

set -e
cd "$(dirname "$0")/.."

# function buildWithModule(){
#     subDIR=$1
#     subModule=$2
#     echo "start job for $subModule..."
#     tsc --outDir $1 --pretty false --module $subModule
# }

echo "removing build..."
rm -rf build && mkdir build

# buildWithModule build/commonjs commonjs
# buildWithModule build/amd amd 
npm run gen
rm -rf build/lang
cp -a ./src/lang/ build/lang/

targetDir=$LAFTOOLS_ROOT/resources/non-prohibited/purejs
# rm -rf $targetDir
mkdir -p $targetDir 
rsync -av --delete ./build/ $targetDir

echo "[I] $(date) Completed"
#!/bin/bash

set -e
cd "$(dirname "$0")/.."

function buildWithModule(){
    subDIR=$1
    subModule=$2
    echo "start job for $subModule..."
    tsc --outDir $1 --pretty false --module $subModule
}

echo "removing build..."
rm -rf build && mkdir build

buildWithModule build/commonjs commonjs
buildWithModule build/amd amd 

echo "[I] $(date) Completed"
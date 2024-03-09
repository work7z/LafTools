# Last Updated: 2024/03/09
#!/bin/bash

cd ~/LafTools-dist
ctn=$(ls | wc -l)
if [ $ctn -gt 5 ]; then
    ls -rt  | grep dkout | head -n 1  | xargs -I {} rm {}
fi

version=$1
runtimeDir=/home/$(whoami)/runtime
if [ ! -d "$runtimeDir" ]; then
  mkdir -p $runtimeDir
fi
if [ ! -d "$runtimeDir/pre-release" ]; then
  mkdir -p $runtimeDir/pre-release
fi
if [ ! -d "$runtimeDir/release" ]; then
  mkdir -p $runtimeDir/release
fi

if [ -z "$version" ]; then
    echo "Please provide a version"
    exit 1
fi

targetPkg=$(ls -t ~/LafTools-dist | grep dkout | grep $version | head -n 1)
if [ -z "$targetPkg" ]; then
    echo "No package found for version $version"
    exit 1
fi

cp $targetPkg $runtimeDir/pre-release
rm -rf $runtimeDir/release/*
mv $runtimeDir/pre-release/* $runtimeDir/release

set -e
cd ~/runtime/release
mv $targetPkg m.tmp.gz
gunzip ./m.tmp.gz
docker load -i ./m.tmp
docker stop laft-inst2
docker rm laft-inst2
docker run --name laft-inst2 -d -p 0.0.0.0:80:39899 codegentoolbox/laftools-linux-x64:insider
docker logs -f laft-inst2
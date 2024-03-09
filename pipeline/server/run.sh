# Last Updated: 2024/03/09
#!/bin/bash
$(dirname $0)/cleanup.sh
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

targetPkg=$(ls -t ~/LafTools-dist | grep linux | grep $version | head -n 1)
if [ -z "$targetPkg" ]; then
    echo "No package found for version $version"
    exit 1
fi

tar -xzvf $targetPkg -C $runtimeDir/pre-release
pm2 stop goapp
rm -rf $runtimeDir/release/*
mv $runtimeDir/pre-release/* $runtimeDir/release

cd ~/runtime/release
pm2 start ./run.sh --name goapp

#!/bin/bash
export http_proxy=http://172.17.0.1:7890
export https_proxy=http://172.17.0.1:7890
export no_proxy=172.17.0.1,localhost
export HTTP_PROXY=http://172.17.0.1:7890
export HTTPS_PROXY=http://172.17.0.1:7890
export NO_PROXY=172.17.0.1,localhost

echo "[I] $(date) decompressing linux tar file..."
tar -xzf /opt/app/linux.tar.gz
echo "[I] $(date) trigger run script"
./run.sh 
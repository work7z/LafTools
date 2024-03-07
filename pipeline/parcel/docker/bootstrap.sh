#!/bin/bash
# TODO: handle proxy mode on server
export http_proxy=http://172.17.0.1:7890
export https_proxy=http://172.17.0.1:7890
export no_proxy=172.17.0.1,localhost
export HTTP_PROXY=http://172.17.0.1:7890
export HTTPS_PROXY=http://172.17.0.1:7890
export NO_PROXY=172.17.0.1,localhost

echo -e "\033[32m[√] 已开启代理\033[0m"
tar -xzvf /opt/app/linux.tar.gz
./run.sh --mode=docker,online 
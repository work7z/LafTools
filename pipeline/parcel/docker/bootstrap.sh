#!/bin/bash

echo "[I] $(date) decompressing linux tar file..."
echo "[I] DFTLOCALE: $DFTLOCALE"
tar -xzf /opt/app/linux.tar.gz
echo "[I] $(date) trigger run script"
./run.sh $DFTLOCALE
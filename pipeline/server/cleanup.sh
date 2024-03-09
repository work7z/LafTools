#!/bin/bash
cd ~/LafTools-dist
ctn=$(ls | wc -l)
if [ $ctn -gt 3 ]; then
    ls -rt  | grep linux-x64 | head -n 2  | xargs -I {} rm {}
fi

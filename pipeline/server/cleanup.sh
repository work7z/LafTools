#!/bin/bash
cd ~/LafTools-dist
ctn=$(ls | wc -l)
if [ $ctn -gt 5 ]; then
    ls -rt  | grep dkout | head -n 1  | xargs -I {} rm {}
fi

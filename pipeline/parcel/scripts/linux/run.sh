#!/bin/bash

export HOSTNAME=0.0.0.0
export PORT=39899

if [ ! -f ./bin/node/bin/node ]; then
    node ./core/server.js
else
    ./bin/node/bin/node ./core/server.js
fi



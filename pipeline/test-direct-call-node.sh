#!/bin/bash

cd $(dirname $0)

$LAFTOOLS_ROOT/sub/node/pipeline/build-tsx.sh

read -p '[I] press key to do ts-node testing'
time ts-node -T $LAFTOOLS_ROOT/sub/node/src/ws-index.ts --mode=direct-call --direct-call-config=$LAFTOOLS_ROOT/test/time-consumer/c-XJHDM/tmp-dc-1.json
read -p '[I] press key to do regular node testing'
time node $LAFTOOLS_ROOT/sub/node/build/ws-index.js --mode=direct-call --direct-call-config=$LAFTOOLS_ROOT/test/time-consumer/c-XJHDM/tmp-dc-1.json

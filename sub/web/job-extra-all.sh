#!/bin/bash

trap 'kill $(jobs -p)' EXIT

(
    $CODEGEN_GO_ROOT/sub/web/scan.sh &
)

(
    $CODEGEN_GO_ROOT/sub/node/pipeline/job-sync-build-tsx.sh &
)


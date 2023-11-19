#!/bin/bash

trap 'kill $(jobs -p)' EXIT

(
    $LAFTOOLS_ROOT/sub/web/scan.sh &
)

(
    $LAFTOOLS_ROOT/sub/node/pipeline/job-sync-build-tsx.sh &
)


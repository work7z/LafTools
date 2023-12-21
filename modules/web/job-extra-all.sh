#!/bin/bash

trap 'kill $(jobs -p)' EXIT

(
    $LAFTOOLS_ROOT/modules/web/scan.sh &
)

(
    $LAFTOOLS_ROOT/modules/node/pipeline/job-sync-build-tsx.sh &
)


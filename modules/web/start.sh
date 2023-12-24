#!/bin/bash
set -e
if [ "$LAFTOOLS_ROOT" = "" ]; then
  echo "LAFTOOLS_ROOT is not set"
  exit 1
fi

cd "$(dirname "$0")"

export FAST_REFRESH=true
[ -d ./build ] && rm -rf ./build
FAST_REFRESH=true npm run dev 

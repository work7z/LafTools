#!/bin/bash

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# if LAFTOOLS_ROOT is not there then quit 
if [[ "$LAFTOOLS_ROOT" = "" ]]; then
  echo "LAFTOOLS_ROOT is not set"
  exit 1
fi


cd "$(dirname "$0")"

export FAST_REFRESH=true
rm -rf ./build
npm run dev 

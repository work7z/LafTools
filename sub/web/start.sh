#!/bin/bash
rm -rf ./build

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# if CODEGEN_GO_ROOT is not there then quit 
if [ ! -d "$CODEGEN_GO_ROOT" ]; then
  echo "CODEGEN_GO_ROOT is not set"
  exit 1
fi

# enter current start script dir
cd "$(dirname "$0")"

./job-syncstatic.sh &
./job-tailwind.sh &
BROWSER=none node scripts/start.js
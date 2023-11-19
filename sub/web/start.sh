#!/bin/bash
rm -rf ./build

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# if LAFTOOLS_ROOT is not there then quit 
if [[ "$LAFTOOLS_ROOT" = "" ]]; then
  echo "LAFTOOLS_ROOT is not set"
  exit 1
fi

# enter current start script dir
cd "$(dirname "$0")"

source ./job-syncstatic.sh &


BROWSER=none node scripts/start.js &

source ./job-tailwind.sh 

# wait until all sub process end
wait

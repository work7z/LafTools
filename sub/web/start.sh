#!/bin/bash
rm -rf ./build

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# if LAFTOOLS_ROOT is not there then quit 
if [ ! -d "$LAFTOOLS_ROOT" ]; then
  echo "LAFTOOLS_ROOT is not set"
  exit 1
fi

# enter current start script dir
cd "$(dirname "$0")"

source ./job-syncstatic.sh &

nohup ./job-tailwind.sh &

# BROWSER=none node scripts/start.js &

# wait until all sub process end
wait

sleep 1000000

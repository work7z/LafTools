#!/bin/bash
rm -rf ./build

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT


# if LAFTOOLS_ROOT is not there then quit 
if [[ "$LAFTOOLS_ROOT" = "" ]]; then
  echo "LAFTOOLS_ROOT is not set"
  exit 1
fi

addLicnese(){
  $LAFTOOLS_ROOT/pipeline/dev-add-license-to-each-file.sh 
  echo "[Completed]"
}

# add license
# addLicnese &


# enter current start script dir
cd "$(dirname "$0")"

source ./job-syncstatic.sh &


export FAST_REFRESH=true
BROWSER=none node scripts/start.js &

source ./job-tailwind.sh 

# wait until all sub process end
wait

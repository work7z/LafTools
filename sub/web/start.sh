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
  # infinite loop 
  while true; do
    # if license header is not there then add it
    $LAFTOOLS_ROOT/pipeline/dev-add-license-to-each-file.sh 
    echo "[Completed]"
    sleep 20
  done
}

syncFiles(){
 while true; do 
  cp $LAFTOOLS_ROOT/sub/purejs/src/all-types.ts $LAFTOOLS_ROOT/sub/web/src/pages/FixedWorkBench/definitions/all-types.ts
  sleep 4;
 done 
}

syncFiles &> /dev/null & 

# add license
addLicnese &> /dev/null &


# enter current start script dir
cd "$(dirname "$0")"

source ./job-syncstatic.sh &


export FAST_REFRESH=true
npm run dev &

source ./job-tailwind.sh 

# wait until all sub process end
wait

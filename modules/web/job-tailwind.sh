#!/bin/bash
# enter current start script dir
cd "$(dirname "$0")"
echo "[JOB] tailwind build"
# check if ./src/input.css exist
if [ ! -f "./src/input.css" ]; then
  echo "[JOB] ./src/input.css not exist"
  exit 1
fi
npx tailwindcss -i ./src/input.css -o ./public/static/tw-output.css --watch --minify
echo "[JOB] ended"
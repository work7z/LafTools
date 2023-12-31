#!/bin/bash
# enter current start script dir
cd "$(dirname "$0")"
echo "[JOB] tailwind build"
# check if ./src/tailwind-config.css exist
if [ ! -f "./src/tailwind-config.css" ]; then
  echo "[JOB] ./src/tailwind-config.css not exist"
  exit 1
fi
npx tailwindcss -i ./src/tailwind-config.css -o ./public/static/tw-output.css --watch --minify
echo "[JOB] ended"
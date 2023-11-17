#!/bin/bash
rm -rf ./build

# kill sub process when exit
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

./sync.sh &
npx tailwindcss -i ./src/input.css -o ./public/static/tw-output.css --watch --minify &
BROWSER=none node scripts/start.js
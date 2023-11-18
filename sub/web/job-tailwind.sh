#!/bin/bash
# enter current start script dir
cd "$(dirname "$0")"
echo "doing tailwind build"
npx tailwindcss -i ./src/input.css -o ./public/static/tw-output.css --watch --minify
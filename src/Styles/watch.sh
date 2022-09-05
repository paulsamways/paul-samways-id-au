#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

npx tailwindcss -i ./src/styles.css -o ../Site/PaulSamways/wwwroot/css/site.css --watch
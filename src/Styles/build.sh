#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

NODE_ENV=production npx tailwindcss \
        -c ./tailwind.config.js \
        -i ./src/styles.css \
        -o ../Site/PaulSamways/wwwroot/css/site.css \
        --minify
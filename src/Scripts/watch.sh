#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

npx tsc -outdir ../Site/PaulSamways/wwwroot/js --watch
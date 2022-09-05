#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

NODE_ENV=production npx tsc \
    -outdir ../Site/PaulSamways/wwwroot/js
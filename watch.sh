#!/usr/bin/env bash
set -e

DIR=$(dirname "$0")
    
tmux \
    new-session \; \
    split-window -h "cd $DIR/src && dotnet watch" \; \
    split-window "npx tailwindcss -i $DIR/src/wwwroot/css/_site.css -o $DIR/src/wwwroot/css/site.css --watch" \; \
    select-pane -t 0
    
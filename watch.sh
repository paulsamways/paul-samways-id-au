#!/usr/bin/env bash
set -e

DIR=$(dirname "$0")

tmux \
    new-session \; \
    split-window -h "cd $DIR/src/Site && bash -c 'trap \"bash\" INT; ./watch.sh'" \; \
    split-window "cd $DIR/src/Styles && bash -c 'trap \"bash\" INT; ./watch.sh'" \; \
    split-window "cd $DIR/src/Scripts && bash -c 'trap \"bash\" INT; ./watch.sh'" \; \
    select-pane -t 0
    
#!/usr/bin/env bash
set -e

DIR=$(dirname "$0")

$DIR/src/Styles/build.sh
$DIR/src/Scripts/build.sh
$DIR/src/Site/build.sh
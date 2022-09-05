#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

dotnet publish PaulSamways/PaulSamways.csproj -c Release -o ../../dist
#!/usr/bin/env bash
set -e

s3cmd sync --rexclude='^\.' --rexclude '\.sh$' . "s3://paul-samways-id-au/octopus/"
ssh opensimple.io -- s3cmd sync s3://paul-samways-id-au/ /srv/http/paul-samways-id-au/
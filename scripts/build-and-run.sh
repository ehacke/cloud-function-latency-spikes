#!/usr/bin/env bash
docker rm -f subprocess

set -e
docker build -t subprocess .
docker run -p 3000:3000 -it -d --name subprocess -m 2048m --cpus="1" subprocess

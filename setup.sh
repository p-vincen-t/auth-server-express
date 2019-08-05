#!/usr/bin/env bash
docker build --rm --no-cache -t nesst_auth .
# docker run -p 5001:5001 --network="f4b" f4b_auth

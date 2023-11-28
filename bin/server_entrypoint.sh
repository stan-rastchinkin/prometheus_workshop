#!/usr/bin/env sh
set -e

cd /app
./bin/node_exporter &
npm run start:server &
wait -n

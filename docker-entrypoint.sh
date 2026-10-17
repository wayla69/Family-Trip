#!/bin/sh
# Railway mounts the volume root-owned. Fix ownership once (only when needed), then drop to the unprivileged `node` user.
set -e
DATA_DIR="${DATA_DIR:-/data}"
if [ "$(id -u)" = "0" ]; then
  mkdir -p "$DATA_DIR"
  [ "$(stat -c %U "$DATA_DIR")" = "node" ] || chown -R node:node "$DATA_DIR"
  exec setpriv --reuid=node --regid=node --init-groups "$@"
fi
exec "$@"

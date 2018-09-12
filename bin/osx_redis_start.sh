#!/usr/bin/env bash

# Launch the redis instance.
# This assumes that the installation of redis on OSX was done via Homebrew.
# For instructions on how to install redis from Homebrew, see:
# https://medium.com/@djamaldg/install-use-redis-on-macos-sierra-432ab426640e
#
# This script also assumes that the installed redis instance is not configured
# for auto-run as a managed process.
redis-server /usr/local/etc/redis.conf


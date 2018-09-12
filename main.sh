#!/usr/bin/env bash

mkdir -p BUILD
python Leopard/main.py --log_level debug --log_path='BUILD/Leopard.log' "$@"

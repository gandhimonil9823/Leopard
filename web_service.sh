#!/usr/bin/env bash

mkdir -p BUILD
python Leopard/web_service.py --log_level debug --log_path='BUILD/Leopard.log' "$@"

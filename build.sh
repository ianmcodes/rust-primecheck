#!/bin/bash

wasm-pack build --release -t web
if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi
cp ./pkg/prime_check* ./doc/pkg/

cargo doc --no-deps
cp -r ./target/doc ./docs/doc
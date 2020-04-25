#!/bin/bash

yarn
yarn build
cp -r build/* .		
rm -rf build	
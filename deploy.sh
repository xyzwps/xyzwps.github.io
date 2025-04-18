#!/bin/bash

rm -rf dist

pnpm build

cd dist

git init

git add -A

git commit -m "deploy $(date)"

git checkout -b deploy

git push -f git@github.com:xyzwps/xyzwps.github.io.git deploy

cd ..

rm -rf dist
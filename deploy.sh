#!/bin/bash

rm -rf dist

npm run build

cd dist

git init

git add -A

git commit -m "deploy $(date)"

git push -f git@github.com:xyzwps/xyzwps.github.io.git master:deploy

cd ..

rm -rf dist
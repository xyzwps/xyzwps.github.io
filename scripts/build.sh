#!/bin/bash

rm -rf dist
mkdir -p dist

cp -r tools            dist/tools
cp    .nojekyll        dist/.nojekyll
cp    BingSiteAuth.xml dist/BingSiteAuth.xml
cp    CNAME            dist/CNAME
cp    index.html       dist/index.html
cp    robots.txt       dist/robots.txt

echo "<!DOCTYPE html><html><body><code>Ver: $(date -u +%Y-%m-%dT%H:%M:%S)</code></body>" > dist/version.html

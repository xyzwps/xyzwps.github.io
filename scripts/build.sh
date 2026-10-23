#!/bin/bash

rm -rf dist
mkdir -p dist

cp -r tools            dist/tools
cp -r pages            dist/pages
cp -r assets           dist/assets
cp    .nojekyll        dist/.nojekyll
cp    BingSiteAuth.xml dist/BingSiteAuth.xml
cp    CNAME            dist/CNAME
cp    404.html         dist/404.html
cp    style.css        dist/style.css
cp    index.html       dist/index.html
cp    robots.txt       dist/robots.txt

echo "<!DOCTYPE html><html><body><code>Ver: $(date -u +%Y-%m-%dT%H:%M:%S)</code></body>" > dist/version.html

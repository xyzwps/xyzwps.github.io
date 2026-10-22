#!/bin/bash

./scripts/build.sh

REMOTE_NAME=$(git remote | head -n 1)

if [ -z "$REMOTE_NAME" ]; then
    echo "No remote found. Please add a remote repository first."
    exit 1
fi

REMOTE_URL=$(git remote get-url "$REMOTE_NAME")

git init

git add -A

git commit -m "deploy $(date)"

git checkout -b deploy

git push -f "$REMOTE_URL" deploy

du -h -d 0
#!/bin/bash

echo 导出静态文件
npm run export

echo 提交部署文件
git add *
git commit -m "部署"

echo 推送到 git
git push -u
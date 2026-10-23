# 首次使用先运行 npm install
build:
    ./scripts/build.sh

deploy:
    ./scripts/deploy.sh

serve: build
    node scripts/serve.js

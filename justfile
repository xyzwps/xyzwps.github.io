build:
    ./scripts/build.sh

deploy:
    ./scripts/deploy.sh

serve: build
    node scripts/serve.js

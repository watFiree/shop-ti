# build image that runs as npm
podman build . -f containers/Containerfile --ignorefile .dockerignore -t shop-ti/shop

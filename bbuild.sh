# create a builder image (with node modules)
podman build . -f containers/builder.Containerfile --ignorefile .dockerignore -t shop-ti/builder

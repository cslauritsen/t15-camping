# Deploy to rpi cluster

This document provides instructions for deploying applications to a Raspberry Pi cluster.

# Steps

I couldn't figure out how to get an ARM64 runner
so i haven't got the github actions CI/cD working yet.

These are the manual steps.

## Build and Push Docker Images

    VERSION=1.0.1
    git tag $VERSION
    cd springboot-camping-server
    ./gradlew clean bootBuildImage -Pversion=$VERSION
    docker push cslauritsen/t15-camping-backend:$VERSION

    cd ../t15-camping-react-ui
    docker build --build-arg APP_VER=$VERSION -t cslauritsen/t15-camping-frontend:$VERSION .
    docker push cslauritsen/t15-camping-frontend:$VERSION

## Deploy with Helmfile
  
Run these commands from the repository root

    helmfile sync --set backend.image.tag=$VERSION --set ui.image.tag=$VERSION
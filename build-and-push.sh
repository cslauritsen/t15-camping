#!/bin/bash


set -e

$tmp=$(mktemp -d)

version=${VERSION?:Not set}
git tag $version

pushd springboot-camping-server
helm package ./helm/t15-camping-backend --version=$version --app-version=$version -d $tmp
./gradlew clean bootBuildImage -Pversion=$version
docker push cslauritsen/t15-camping-backend:$version
popd

pushd t15-camping-react-ui
helm package ./helm/t15-camping-ui --version=$version --app-version=$version -d $tmp
docker build --build-arg APP_VER=$version -t cslauritsen/t15-camping-frontend:$version .
docker push cslauritsen/t15-camping-frontend:$version
popd

helm push $tmp/*.tgz oci://docker.io/cslauritsen

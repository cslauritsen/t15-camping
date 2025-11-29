#!/bin/bash

set -e

tmp=$(mktemp -d)


helmup() {

  version=$1; shift

  for chart in ./charts/*-backend-chart ./charts/*-ui-chart; do
      pushd $chart
      helm dep update --skip-refresh
      helm package . --version=$version --app-version=$version -d $tmp
      helm push $tmp/*.tgz oci://docker.io/cslauritsen
      rm $tmp/*.tgz
      popd
  done

  pushd charts/t15-camping
  yq -i ".dependencies[] |= .version = \"$version\"" Chart.yaml
  helm dep update --skip-refresh
  helm package . --version=$version --app-version=$version -d $tmp
  helm push $tmp/*.tgz oci://docker.io/cslauritsen
  rm $tmp/*.tgz
  popd

}

version=${VERSION?:Not set}
git tag $version

pushd springboot-camping-server
./gradlew clean bootBuildImage -Pversion=$version
docker push cslauritsen/t15-camping-backend:$version
popd


pushd t15-camping-react-ui
docker build --build-arg APP_VER=$version -t cslauritsen/t15-camping-ui:$version .
docker push cslauritsen/t15-camping-ui:$version
popd

helmup $version
yq -i ".releases[] |=  .version = \"$version\"" ./helmfile.d/t15-camping.yaml

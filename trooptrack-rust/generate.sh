#!/bin/bash
#
cd $(dirname $0)
docker run --rm -v /Users/csl04r/repos/t15/t15-camping/trooptrack-rust:/local openapitools/openapi-generator-cli generate  \
	--artifact-id trooptrack-rust \
	-i /local/trooptrack-swagger.yaml \
	-g rust \
	-o /local/

sed -i.bak 's/name = "openapi"/name = "trooptrack-rust"/' Cargo.toml

# Deploy to rpi cluster

This document provides instructions for deploying applications to a Raspberry Pi cluster.
I do this on my apple silicon mac, so the architecture matches arm64 for raspberry pi. 
These steps won't work on Intel machines without modification.

# Steps

I couldn't figure out how to get an ARM64 runner
so i haven't got the github actions CI/CD working yet.

These are the manual steps.

## Build and Push Images & Charts

    VERSION=x.y.z  # set to desired version, must be semver compliant
    ./build-and-push.sh 

## Secrets
The backend needs secrets to run. Grab them from 1password and create a Kubernetes secret.

You might need to rename the secret if the release names change

    tmpsec=$(mktemp)
    op read "op://Troop15/unq4yagqpukv2lux7hqwphirzy/secret-env" > $tmpsec
    kubectl create secret generic t15-camping-backend-secret  \
        --from-env-file=$tmpsec --namespace t15-camping --context rpi
    rm $tmpsec


## Deploy with Helm
  
Run these commands from the repository root

    helm upgrade --install \
        --namespace t15-camping \
        --create-namespace \
        --kube-context rpi \
        t15-camping \
        oci://docker.io/cslauritsen/t15-camping-chart:$VERSION

#!/usr/bin/env bash
set -e

if [[ -z "$CLOUDSDK_CORE_PROJECT" ]]; then
    echo "Must provide CLOUDSDK_CORE_PROJECT in environment" 1>&2
    exit 1
fi

require_clean_work_tree () {
    # Update the index
    git update-index -q --ignore-submodules --refresh
    err=0

    # Disallow unstaged changes in the working tree
    if ! git diff-files --quiet --ignore-submodules --
    then
        echo >&2 "cannot $1: you have unstaged changes."
        git diff-files --name-status -r --ignore-submodules -- >&2
        err=1
    fi

    # Disallow uncommitted changes in the index
    if ! git diff-index --cached --quiet HEAD --ignore-submodules --
    then
        echo >&2 "cannot $1: your index contains uncommitted changes."
        git diff-index --cached --name-status -r --ignore-submodules HEAD -- >&2
        err=1
    fi

    if [ $err = 1 ]
    then
        echo >&2 "Please commit or stash them."
        exit 1
    fi
}

require_clean_work_tree

PACKAGE_VERSION=$(cat package.json | jq .version -r)
NAME="ehacke/subprocess"
suffix=$(git rev-parse --short HEAD)

docker pull node:12

latestTag="gcr.io/${CLOUDSDK_CORE_PROJECT}/${NAME}:latest"
tag="gcr.io/${CLOUDSDK_CORE_PROJECT}/${NAME}:${PACKAGE_VERSION}${suffix}"

echo "Building and pushing ${tag}"

docker build -t ${tag} -t ${latestTag} .
docker push ${tag}
docker push ${latestTag}

gcloud run deploy subprocess --image "${tag}" --concurrency=1 --cpu=1 --memory=2048Mi --timeout=60 --platform=managed --port=3000 --allow-unauthenticated

#!/bin/bash

yarn build && gsutil -m rsync -R build gs://www.wikinalysis.com
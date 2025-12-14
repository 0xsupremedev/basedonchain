#!/bin/bash
# Script to create GitHub labels from labels.json

# Read labels.json and create each label
cat .github/labels.json | jq -r '.[] | "gh label create \(.name) --color \(.color) --description \"\(.description)\" --repo 0xsupremedev/basedonchain"' | bash

echo "Labels created successfully!"

#!/bin/sh

set -e

cd tools/cli
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/
cd -
cd tools/ent-theme-api
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/
cd -
cd tools/vite-plugin-ent-theme
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/
echo "✅ Publish completed"
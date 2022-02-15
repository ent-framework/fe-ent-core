#!/bin/sh

set -e

#pnpm i --frozen-lockfile
#pnpm update:version

#pnpm build:libs

cd dist/fe-ent-core
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/
cd -

cd packages/build
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/

echo "✅ Publish completed"

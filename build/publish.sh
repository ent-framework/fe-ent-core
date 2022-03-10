#!/bin/sh

set -e

#pnpm i --frozen-lockfile
#pnpm build:libs
#pnpm update:version


cd dist/fe-ent-core
npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/
cd -

echo "✅ Publish completed"

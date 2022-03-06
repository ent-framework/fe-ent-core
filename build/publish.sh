#!/bin/sh

set -e

#pnpm i --frozen-lockfile
#pnpm build:libs
#pnpm update:version


cd dist/fe-ent-core
npm publish --access public -registry https://registry.npmjs.org/
cd -

cd cli
npm publish --access public -registry https://registry.npmjs.org/

echo "✅ Publish completed"

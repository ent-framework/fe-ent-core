#!/usr/bin/env node
const { run } = require('../dist/utils/process');
const { findWorkspaceRoot } = require('../dist/utils/pkg');
const { FE_PKG, OUTPUT_DIR } = require('../dist/utils/constants');

const tscOutDir = `${findWorkspaceRoot()}/${OUTPUT_DIR}/${FE_PKG}`;
const cwd = process.cwd();
const command = `pnpm vue-tsc --declaration  --emitDeclarationOnly --outDir ${tscOutDir}`;
console.log(`TSC out dir: ${tscOutDir}, cwd: ${cwd}`);
run(command, cwd);

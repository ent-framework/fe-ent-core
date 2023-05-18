import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import { definePackageConfig } from '../../configs/library';

async function run() {
  await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
  await build(await definePackageConfig());
}

export default run;

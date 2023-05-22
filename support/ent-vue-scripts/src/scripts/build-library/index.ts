import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import { defineLibraryConfig } from '../../configs/library';
import { defineUmdLibraryConfig } from '../../configs/library.umd';

async function run({ umd = false }) {
  await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
  await build(await defineLibraryConfig());
  if (umd) {
    await build(await defineUmdLibraryConfig());
  }
}

export default run;

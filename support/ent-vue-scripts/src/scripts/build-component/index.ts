import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import config from '../../configs/vite.prod';
import getUmdConfig from '../../configs/vite.prod.umd';

async function run({ umd = false }) {
  await build(config);
  if (umd) {
    await fs.ensureDirSync(path.resolve(process.cwd(), 'dist'));
    await build(getUmdConfig());
  }
}

export default run;

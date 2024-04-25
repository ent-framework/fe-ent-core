import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import consola from 'consola';
import config from '../../configs/component';
import getUmdConfig from '../../configs/component.umd';

async function run({ umd = false }) {
  consola.info(`building component... with umd ${umd}`);
  await build(config);
  if (umd) {
    await fs.ensureDirSync(path.resolve(process.cwd(), 'dist'));
    await build(getUmdConfig());
  }
}

export default run;

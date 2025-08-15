import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import consola from 'consola';
import defineComponentConfig from '../../configs/component.js';
import getUmdConfig from '../../configs/component.umd.js';
import { cleanTempStyles, copyLessFiles } from '../../utils/style.js';

async function run({ umd = false }) {
  consola.info(`building component... with umd ${umd}`);
  await build(await defineComponentConfig());

  cleanTempStyles();
  copyLessFiles();
  if (umd) {
    fs.ensureDirSync(path.resolve(process.cwd(), 'dist'));
    await build(getUmdConfig());
  }
}

export default run;

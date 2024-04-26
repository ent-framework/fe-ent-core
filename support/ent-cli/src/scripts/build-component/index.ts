import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import consola from 'consola';
import defineComponentConfig from '../../configs/component';
import getUmdConfig from '../../configs/component.umd';

async function run({ umd = false }) {
  consola.info(`building component... with umd ${umd}`);
  await build(await defineComponentConfig());
  if (fs.existsSync(path.resolve(process.cwd(), 'lib/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'lib/style.css'));
  }
  if (fs.existsSync(path.resolve(process.cwd(), 'es/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'es/style.css'));
  }
  if (umd) {
    await fs.ensureDirSync(path.resolve(process.cwd(), 'dist'));
    await build(getUmdConfig());
  }
}

export default run;

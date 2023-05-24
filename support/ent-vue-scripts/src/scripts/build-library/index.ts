import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import consola from 'consola';
import { build } from 'vite';
import { defineLibraryConfig } from '../../configs/library';
import { defineUmdLibraryConfig } from '../../configs/library.umd';

async function run({ umd = false }) {
  const cwd = process.cwd();
  await fs.emptyDir(path.resolve(cwd, 'dist'));
  await build(await defineLibraryConfig());
  consola.success(`build library successfully in path ${cwd}`);
  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('components/**/*.less', {
    cwd,
    absolute: false,
  });

  for (const filename of files) {
    const absolute = path.resolve(cwd, `${filename}`);
    fs.copySync(absolute, path.resolve(cwd, `es/${filename}`));
  }
  if (umd) {
    await build(await defineUmdLibraryConfig());
    consola.success(`build library umd successfully in path ${cwd}`);
  }
}

export default run;

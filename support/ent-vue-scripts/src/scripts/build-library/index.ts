import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import consola from 'consola';
import { build } from 'vite';
import { defineLibraryConfig } from '../../configs/library';
//import styleConfig from '../../configs/vite.prod.style';
import { defineUmdLibraryConfig } from '../../configs/library.umd';

async function run({ umd = false, source = false, base = '' }) {
  const cwd = process.cwd();
  await fs.emptyDir(path.resolve(cwd, 'dist'));
  await build(await defineLibraryConfig(source));
  consola.success(`build library successfully in path ${cwd}`);
  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('*/*.less', {
    cwd,
    absolute: false,
  });

  for (const filename of files) {
    const absolute = path.resolve(cwd, `${filename}`);
    fs.copySync(absolute, path.resolve(cwd, `es/${filename}`));
  }

  // if (fs.existsSync(path.resolve(cwd, 'style.ts'))) {
  //   await build(styleConfig);
  //   consola.success(`build library style successfully.`);
  // }

  if (umd) {
    await build(await defineUmdLibraryConfig(source, base));
    consola.success(`build library umd successfully in path ${cwd}`);
  }
}

export default run;

import path from 'path';
import fs from 'fs-extra';
import consola from 'consola';
import glob from 'glob';
import { build } from 'vite';
import paths from '../../utils/paths.js';
import styleConfig from '../../configs/component.style.js';

const run = async () => {
  // 拷贝less文件到目标文件，index.less编译生成index.css
  consola.info(`copy less to es & lib`);
  const cwd = process.cwd();
  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('**/*.less', {
    cwd: `${cwd}/src`
  });

  fs.ensureDirSync(path.resolve(process.cwd(), 'es'));
  fs.ensureDirSync(path.resolve(process.cwd(), 'lib'));
  for (const filename of files) {
    const absolute = paths.resolvePath(`src/${filename}`);
    fs.copySync(absolute, paths.resolvePath(`es/${filename}`));
  }
  for (const filename of files) {
    const absolute = paths.resolvePath(`src/${filename}`);
    fs.copySync(absolute, paths.resolvePath(`lib/${filename}`));
  }
  // 拷贝并编译less入口文件
  consola.log('build target css');

  await build(await styleConfig());
  consola.success(`target build success`);
};

export default run;

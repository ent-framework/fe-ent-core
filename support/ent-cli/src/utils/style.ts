import path from 'path';
import fs from 'fs-extra';
import consola from 'consola';
import glob from 'glob';
import paths from './paths.js';

export const cleanTempStyles = () => {
  if (fs.existsSync(path.resolve(process.cwd(), 'lib/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'lib/style.css'));
  }
  if (fs.existsSync(path.resolve(process.cwd(), 'es/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'es/style.css'));
  }
};

export const copyLessFiles = () => {
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
};

import fs from 'fs-extra';
import consola from 'consola';
import glob from 'glob';
import { build } from 'vite';
import paths from '../../utils/paths';
import config from '../../configs/vite.prod.style';

const run = async () => {
  const cwd = process.cwd();
  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('{components,directives}/**/*.less', {
    cwd: `${cwd}/src`
  });

  for (const filename of files) {
    const absolute = paths.resolvePath(`src/${filename}`);
    fs.copySync(absolute, paths.resolvePath(`es/${filename}`));
  }
  fs.copySync(paths.theme, paths.resolvePath('es/theme'), { recursive: true });
  // 拷贝并编译less入口文件
  consola.log('build target css');

  await build(config);
  consola.success(`target build success`);
};

export default run;

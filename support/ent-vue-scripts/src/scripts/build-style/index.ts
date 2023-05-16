import path from 'path';
import fs from 'fs-extra';
import less from 'less';
import consola from 'consola';
import CleanCSS from 'clean-css';
import glob from 'glob';
import { build } from 'vite';
// import ora from 'ora';
import paths from '../../utils/paths';
import config from '../../configs/vite.prod.style';
import lessgen from '../lessgen';
import { generateModifyVars } from '../../utils/modify-vars';

const run = async ({ material }: { material: boolean }) => {
  // 更新index.less文件
  if (!material) {
    //lessgen();
  }

  const cwd = process.cwd();
  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('{components,directives}/**/*.less', {
    cwd,
  });

  for (const filename of files) {
    const absolute = paths.resolvePath(`${filename}`);
    fs.copySync(absolute, paths.resolvePath(`lib/${filename}`));
  }

  // 拷贝并编译less入口文件
  consola.log('build target css');
  const indexLessPath = paths.resolvePath('theme/index.less');

  const indexLess = fs.readFileSync(indexLessPath, 'utf8');
  const result = await less.render(indexLess, {
    paths: [paths.components, paths.directives, paths.theme],
    modifyVars: generateModifyVars(),
    javascriptEnabled: true,
  });

  fs.ensureDirSync(paths.resolvePath('dist'));

  fs.writeFileSync(paths.resolvePath(material ? 'dist/app.css' : 'dist/app.css'), result.css);

  const compress = new CleanCSS().minify(result.css);

  fs.writeFileSync(
    paths.resolvePath(material ? 'dist/app.min.css' : 'dist/app.min.css'),
    compress.styles,
  );

  fs.copy(paths.theme, paths.resolvePath('lib/theme'), { recursive: true });

  consola.success(`target build success`);

  // 构建style/index.ts
  // const indexFiles = glob.sync('components/**/style/index.ts', {
  //   cwd: paths.root,
  // });
  //
  // const rollupInput = indexFiles.reduce((pre, cur) => {
  //   pre[cur.slice(11, -3)] = cur;
  //   return pre;
  // }, {} as any);
  //
  // const buildIndex = async () => {
  //   if (config?.build?.rollupOptions) {
  //     config.build.rollupOptions.input = rollupInput;
  //   }
  //
  //   await build(config);
  // };
  //
  // await buildIndex();
};

export default run;

import fs from 'fs-extra';
import less from 'less';
import consola from 'consola';
import CleanCSS from 'clean-css';
import glob from 'glob';
import paths from '../../utils/paths';
import { generateModifyVars } from '../../utils/modify-vars';

const run = async () => {
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

  fs.writeFileSync(paths.resolvePath('dist/app.css'), result.css);

  const compress = new CleanCSS().minify(result.css);

  fs.writeFileSync(paths.resolvePath('dist/app.min.css'), compress.styles);

  fs.copy(paths.theme, paths.resolvePath('lib/theme'), { recursive: true });

  consola.success(`target build success`);
};

export default run;

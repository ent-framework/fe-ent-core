import path from 'path';
import chalk from 'chalk';
import { src, dest, series, parallel } from 'gulp';
import less from 'less';
import type { StaticOptions } from 'less';
import autoprefixer from 'autoprefixer';
//import NpmImportPlugin from 'less-plugin-npm-import';
import through2 from 'through2';
import postcss from 'postcss';
import { epOutput, themeRoot, pkgRoot } from './utils';
import { readFileSync } from 'fs';

const getPreloadContent = function () {
  const antdFile = path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less');
  let preLoadContent = readFileSync(`${antdFile}`, 'utf-8');
  preLoadContent += readFileSync(`${themeRoot}/config.less`, 'utf-8');

  return preLoadContent;
};

export const buildTheme = parallel(copyThemeSource, copyThemeExceptSource);

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
export const compileLess = function (lessFile, config = {}) {
  const { cwd = process.cwd(), preLoad } = config;
  const resolvedLessFile = path.resolve(cwd, lessFile);
  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');
  // Do less compile
  const lessOpts: StaticOptions = {
    paths: [path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'), pkgRoot],
    filename: resolvedLessFile,
    //plugins: [new NpmImportPlugin({ prefix: '~' })],
    javascriptEnabled: true,
  };
  return less
    .render(preLoad + '\n' + data, lessOpts)
    .then((result) => postcss([autoprefixer]).process(result.css, { from: undefined }))
    .then((r) => {
      return r.css;
    });
};

export function copyThemeSource() {
  return src(`${pkgRoot}/theme/**/*.less`)
    .pipe(
      // 修改文件的别名
      through2.obj(function (file, encoding, next) {
        if (file.path.match(/\/app\.less$/)) {
          const content = file.contents.toString();
          file.contents = Buffer.from(content.replaceAll('@ent-core', '../es'));
        } else {
          const content = file.contents.toString();
          file.contents = Buffer.from(content.replaceAll('@ent-core', 'fe-ent-core'));
        }
        this.push(file);
        next();
      }),
    )
    .pipe(dest(`${epOutput}/theme`));
}

export function copyThemeExceptSource() {
  return src(`${pkgRoot}/{components,directives,layouts,views}/**/*.{less,css}`)
    .pipe(
      // 修改文件的别名
      through2.obj(function (file, encoding, next) {
        const content = file.contents.toString();
        file.contents = Buffer.from(content.replaceAll('@ent-core', 'fe-ent-core'));
        this.push(file);
        next();
      }),
    )
    .pipe(dest(`${epOutput}/es`));
}

function modifyStreamContent(modify) {
  return through.obj(function (file, endcoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }
    if (file.isStream()) {
      return callback();
    }
    let content = file.contents.toString();
    content = modify(content, file.path) || content;
    file.contents = new Buffer(content);
    this.push(file);
    callback();
  });
}
function AssetsRelativePath() {
  return modifyStreamContent((content, filePath) => {
    const matches = matchAll(content, /url\((\S+?)\)/gi);
    const currentDir = path.dirname(filePath);
    if (matches instanceof Array) {
      matches.forEach((match) => {
        const url: string = match[1];
        // only relative path supported
        if (url.indexOf('@ent-core') != 0) {
          return;
        }
        const file = url.replace('@ent-core', pkgRoot);
        const originalPath = path.resolve(currentDir, file);
        const relative = path.relative(distPath, originalPath);
        const res = relative.replace(/\\/g, '/');
        content = content.replace(url, res);
      });
    }
    console.log(content);
    return content;
  });
}

function matchAll(str, reg) {
  const res: string[] = [];
  let match: string;
  while ((match = reg.exec(str))) {
    res.push(match);
  }
  return res;
}

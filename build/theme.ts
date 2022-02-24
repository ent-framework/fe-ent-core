import path from 'path';
import chalk from 'chalk';
import { src, dest, series, parallel } from 'gulp';
import less from 'gulp-less';
import dartSass from 'less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import through from 'through2';
import { epOutput, themeRoot, pkgRoot } from './utils';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(epOutput, 'theme-chalk');

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
export const buildTheme = function () {
  return src(`${themeRoot}/app.less`)
    .pipe(less())
    .pipe(AssetsRelativePath())
    .pipe(dest(`${epOutput}/theme`));
};

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(dest(path.resolve(distBundle, 'src')));
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

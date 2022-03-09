import through2 from 'through2';
import { trim } from 'lodash';
import { ResolvedConfig } from 'vite';
import path from 'path';
import { readFileSync } from 'fs-extra';

export function cssImport(resolvedConfig: ResolvedConfig) {
  const cssResolve = resolvedConfig.createResolver({
    extensions: ['.less', '.css'],
    mainFields: ['less', 'style'],
    tryIndex: false,
    preferRelative: true,
  });
  const root = resolvedConfig.root;
  const regex = '(?:@import)(?:\\s)(?:url)?(?:(?:(?:\\()(["\'])?(?:[^"\')]+)\\1(?:\\))|(["\'])(?:.+)\\2)(?:[A-Z\\s])*)+(?:;)'; // eslint-disable-line
  const importRe = new RegExp(regex, 'gi');
  let match: RegExpExecArray | null;
  return through2.obj(async function (file, endcoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }
    if (file.isStream()) {
      return callback();
    }
    const contents = file.contents.toString();

    const lines: string[] = [];
    let lastpos = 0;
    while ((match = importRe.exec(contents)) !== null) {
      if (match == null) continue;
      const match2 = /@import\s+(?:url\()?(.+(?=['")]))(?:\))?.*/gi.exec(match[0]);
      if (match2 == null) continue;
      const importPath = trim(match2[1], '\'"');
      const resolved = await cssResolve(importPath, path.join(root, '*'));
      if (resolved) {
        const cssContent = readFileSync(resolved);
        lines.push(cssContent.toString());
        lines.push(contents.slice(lastpos, match.index));
        lastpos = importRe.lastIndex;
      }
    }
    lines[lines.length] = contents.slice(lastpos);
    file.contents = Buffer.from(lines.join('\n'));
    this.push(file);
    callback();
  });
}

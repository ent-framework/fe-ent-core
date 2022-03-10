import type { ProjectManifest } from '@pnpm/types';
import path from 'path';
import fs from 'fs';
import micromatch from 'micromatch';

export const getPackageManifest = (pkgPath: string) => {
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as ProjectManifest;
};

export const getPackageDependencies = (
  pkgPath: string,
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};

/**
 * 返回workspace的根目录
 */
export function findWorkspaceRoot(): string {
  const initial = process.cwd();
  let previous: string;
  let current = path.normalize(initial);

  do {
    const manifest = readPackageJSON(current);
    const workspaces = extractWorkspaces(manifest);

    if (workspaces) {
      const relativePath = path.relative(current, initial);
      if (relativePath === '' || micromatch([relativePath], workspaces).length > 0) {
        return current;
      } else {
        return '';
      }
    }

    previous = current;
    current = path.dirname(current);
  } while (current !== previous);

  return '';
}

function extractWorkspaces(manifest) {
  const workspaces = (manifest || {}).workspaces;
  return (workspaces && workspaces.packages) || (Array.isArray(workspaces) ? workspaces : null);
}

function readPackageJSON(dir) {
  const file = path.join(dir, 'package.json');
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return null;
}

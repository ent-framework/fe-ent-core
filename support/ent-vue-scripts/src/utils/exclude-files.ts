export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist', 'es', 'lib', 'style.ts'];
  return files.filter((path) => !excludes.some((exclude) => path.startsWith(exclude)));
};

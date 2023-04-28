import chalk from 'chalk';
import { command } from '@ent-build/build-utils';
import type { FileSizeReporter } from 'rollup-plugin-filesize';

export const reporter: FileSizeReporter = (opt, outputOptions, info) => {
  return command(
    `${chalk.cyan(chalk.bold(info.fileName))}: bundle size ${chalk.yellow(
      info.bundleSize,
    )} -> minified ${chalk.green(info.minSize)}`,
  );
};

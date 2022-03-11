import path from 'path';

/****
 * 获取cli 命令行根目录
 */
export const cliRoot = () => {
  return path.resolve(__dirname, '../');
};

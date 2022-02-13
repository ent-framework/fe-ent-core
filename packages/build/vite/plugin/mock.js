/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
const { viteMockServe } = require('vite-plugin-mock');

module.exports = function (isBuild) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  });
};

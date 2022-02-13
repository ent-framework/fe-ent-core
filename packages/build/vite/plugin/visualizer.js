/**
 * Package file volume analysis
 */
const visualizer = require('rollup-plugin-visualizer');
const { isReportMode } = require('../../utils');

module.exports = function () {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
};

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const isDevFn = function (mode) {
  return mode === 'development';
};

const isProdFn = function (mode) {
  return mode === 'production';
};

/**
 * Whether to generate package preview
 */
const isReportMode = function () {
  return process.env.REPORT === 'true';
};

// Read all environment variable configuration files to process.env
const wrapperEnv = function (envConf) {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script);
  if (result) {
    const mode = result[1];
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
const getEnvConfig = function (envConfig, match = 'VITE_GLOB_') {
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
};

/**
 * Get user root directory
 * @param dir file path
 */
const getRootPath = function (...dir) {
  return path.resolve(process.cwd(), ...dir);
};

const pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'));

module.exports = { isDevFn, isProdFn, isReportMode, wrapperEnv, getEnvConfig, getRootPath, pkg };

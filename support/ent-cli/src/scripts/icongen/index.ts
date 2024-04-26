import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { optimize } from 'svgo';
import { JSDOM } from 'jsdom';
import paths from '../../utils/paths';
import { toPascalCase } from '../../utils/convert-case';
import svgoConfig from './svgo.config';
import { getIconVue } from './vue-template';

interface IconData {
  title: string;
  type: string;
  list: Array<{
    name: string;
    componentName: string;
    path: string;
  }>;
}

const root = process.cwd();

function getSVGData(): IconData[] {
  const data: IconData[] = [];
  const iconData: IconData = {
    title: '通用类图标',
    type: 'general',
    list: []
  };
  const files = glob.sync(`**/*.svg`, {
    cwd: paths.iconSvgs,
    absolute: true
  });
  for (const filePath of files) {
    const name = `icon-${path.basename(filePath, '.svg')}`;
    iconData.list.push({
      name,
      componentName: `${toPascalCase(name)}`,
      path: filePath
    });
  }
  data.push(iconData);
  return data;
}

async function buildIconComponent(data: IconData[]) {
  await fs.emptyDir(path.resolve(root, 'src/components/icons'));

  for (const iconData of data) {
    for (const item of iconData.list) {
      const svgFile = fs.readFileSync(item.path, 'utf8');

      const optimizedSvg = optimize(svgFile, {
        path: item.path,
        ...svgoConfig
      });
      if ('data' in optimizedSvg) {
        const { data } = optimizedSvg;
        const svgElement = JSDOM.fragment(data).firstElementChild;
        if (svgElement) {
          fs.outputFile(
            path.resolve(paths.iconComponents, `${item.name}.vue`),
            getIconVue({
              name: item.name,
              componentName: item.componentName,
              svgHtml: svgElement.outerHTML
            }),
            (err) => {
              if (err) {
                console.log(`Build ${item.componentName} Failed: ${err}`);
              } else {
                console.log(`Build ${item.componentName} Success!`);
              }
            }
          );
        }
      }
    }
  }
}

function buildType(data: IconData[]) {
  const exports: string[] = [];
  for (const iconData of data) {
    for (const item of iconData.list) {
      exports.push(
        `${item.componentName}: typeof import('@arco-design/web-vue/es/icon')['${item.componentName}'];`
      );
    }
  }
}

const icongen = async () => {
  const data = getSVGData();
  await buildIconComponent(data);
  buildType(data);
};

export default icongen;

/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import windiCSS from 'vite-plugin-windicss';
import { primaryColor } from '../../config/themeConfig';
import { findWorkspaceRoot } from '../../utils';
import { UserOptions } from 'vite-plugin-windicss';
import { CustomConfigEnv } from '../createConfig';
import { searchForWorkspaceRoot } from 'vite';
import path from 'path';

export function configWindiPlugin(configEnv: CustomConfigEnv) {
  /**
   * Used for animation when the element is displayed
   * @param maxOutput The larger the maxOutput output, the larger the generated css volume
   */

  function createEnterPlugin(maxOutput = 7) {
    const createCss = (index: number, d = 'x') => {
      const upd = d.toUpperCase();
      return {
        [`*> .enter-${d}:nth-child(${index})`]: {
          transform: `translate${upd}(50px)`,
        },
        [`*> .-enter-${d}:nth-child(${index})`]: {
          transform: `translate${upd}(-50px)`,
        },
        [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
          'z-index': `${10 - index}`,
          opacity: '0',
          animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
          'animation-fill-mode': 'forwards',
          'animation-delay': `${(index * 1) / 10}s`,
        },
      };
    };
    const handler = ({ addBase }) => {
      const addRawCss = {};
      for (let index = 1; index < maxOutput; index++) {
        Object.assign(addRawCss, {
          ...createCss(index, 'x'),
          ...createCss(index, 'y'),
        });
      }
      addBase({
        ...addRawCss,
        [`@keyframes enter-x-animation`]: {
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        [`@keyframes enter-y-animation`]: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      });
    };
    return { handler };
  }

  const workspace = searchForWorkspaceRoot(process.cwd());
  const cwd = process.cwd();

  const paths: string[] = [];
  if (configEnv.libDev) {
    paths.push(`${findWorkspaceRoot()}/packages/**/*.{ts,tsx,vue}`);
  } else {
    paths.push(`${path.resolve(workspace, 'node_modules/fe-ent-core/**/*.{js, mjs}')}`);
  }
  paths.push(`${cwd}/src/**/*.{ts,tsx,vue}`);
  paths.push(`${cwd}/index.html`);

  const windiConfig: UserOptions = {
    transformCSS: false,
    config: {
      extract: {
        include: paths,
        exclude: ['node_modules', '.git'],
      },
      darkMode: 'class',
      plugins: [createEnterPlugin()],
      theme: {
        extend: {
          zIndex: {
            '-1': '-1',
          },
          colors: {
            primary: primaryColor,
          },
          screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1600px',
          },
        },
      },
    },
  };

  return windiCSS(windiConfig);
}

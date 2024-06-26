import fs from 'fs';
import type { InputPluginOption, OutputAsset } from 'rollup';

export default function cssOnlyPlugin(): InputPluginOption {
  return {
    name: 'vite:css-only',
    async generateBundle(outputOptions, bundle) {
      for (const filename of Object.keys(bundle)) {
        const chunk = bundle[filename];
        if (filename.endsWith('.css')) {
          const asset = chunk as OutputAsset;
          if (!fs.existsSync(`${outputOptions.dir}`)) {
            fs.mkdirSync(`${outputOptions.dir}`);
          }
          fs.writeFileSync(`${outputOptions.dir}/${filename}`, asset.source, {
            flag: 'w'
          });
        }
      }
    }
  };
}

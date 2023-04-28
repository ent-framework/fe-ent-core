import { epPackage, getPackageDependencies } from '@ent-build/build-utils';
import type { OutputOptions, RollupBuild } from 'rollup';

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = await getPackageDependencies(epPackage);

  return (id: string) => {
    const packages: string[] = peerDependencies;
    if (!options.full) {
      packages.push('vue-demi');
      // dependencies
      packages.push('@vue', ...dependencies);
    }

    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};

export const generateExtensionExternal = async (options: { extRoot: string; full: boolean }) => {
  const { dependencies, peerDependencies } = await getPackageDependencies(options.extRoot);
  const packages: string[] = peerDependencies;
  return (id: string) => {
    if (!options.full) {
      packages.push('vue-demi');
      // dependencies
      packages.push('@vue', ...dependencies);
    }
    const isExternal = [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
    return isExternal;
  };
};

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`;
}

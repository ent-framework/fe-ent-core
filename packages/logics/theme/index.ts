import { getThemeColors, generateColors } from '../../utils/themeConfig';

import { replaceStyleVariables } from 'vite-plugin-ent-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from '../../utils/tiny';

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}

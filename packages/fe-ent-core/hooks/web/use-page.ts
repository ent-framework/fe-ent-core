import { unref } from 'vue';
import { entRouter } from '@ent-core/router';
import { isString } from '@ent-core/utils/is';
import { useGlobSetting } from '@ent-core/hooks/setting/use-glob-setting';
import { REDIRECT_NAME } from '@ent-core/router/constant';
import type { RouteLocationRaw, Router } from 'vue-router';

function handleError(e: Error) {
  console.error(e);
}

// page switch
export function useGo(_router?: Router) {
  const { push, replace } = _router || entRouter;
  const globSetting = useGlobSetting();
  function go(opt: RouteLocationRaw | string = globSetting.homePath, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || entRouter;
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};

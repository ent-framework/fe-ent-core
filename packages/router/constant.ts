export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

// export { default as EXCEPTION_COMPONENT } from '@ent-core/views/sys/exception/Exception.vue';
//
// /**
//  * @description: default layout
//  */
// export { default as LAYOUT } from '@ent-core/layouts/default/index.vue';

export const EXCEPTION_COMPONENT = () => import('@ent-core/views/sys/exception/Exception.vue');

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};

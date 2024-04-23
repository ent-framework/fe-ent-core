export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const COMPONENT_LAYOUT_NAME = 'LAYOUT';
export const COMPONENT_IFRAME_NAME = 'IFrame';
export const COMPONENT_EXCEPTION_NAME = 'ExceptionPage';

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      });
    });
};

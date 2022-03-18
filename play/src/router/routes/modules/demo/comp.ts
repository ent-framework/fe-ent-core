import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { getParentLayout } from 'fe-ent-core/lib/router/constant';
import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';
import { t } from 'fe-ent-core/lib/hooks/web/use-i18n';

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.comp'),
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('/@/views/demo/comp/button/index.vue'),
      meta: {
        title: t('routes.demo.comp.basic'),
      },
    },

    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic',
      component: getParentLayout('FormDemo'),
      meta: {
        // icon: 'mdi:form-select',
        title: t('routes.demo.form.form'),
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicDemo',
          component: () => import('/@/views/demo/form/index.vue'),
          meta: {
            title: t('routes.demo.form.basic'),
          },
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('/@/views/demo/form/use-form.vue'),
          meta: {
            title: t('routes.demo.form.useForm'),
          },
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('/@/views/demo/form/ref-form.vue'),
          meta: {
            title: t('routes.demo.form.refForm'),
          },
        },
        {
          path: 'advancedForm',
          name: 'AdvancedFormDemo',
          component: () => import('/@/views/demo/form/advanced-form.vue'),
          meta: {
            title: t('routes.demo.form.advancedForm'),
          },
        },
        {
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('/@/views/demo/form/rule-form.vue'),
          meta: {
            title: t('routes.demo.form.ruleForm'),
          },
        },
        {
          path: 'dynamicForm',
          name: 'DynamicFormDemo',
          component: () => import('/@/views/demo/form/dynamic-form.vue'),
          meta: {
            title: t('routes.demo.form.dynamicForm'),
          },
        },
        {
          path: 'customerForm',
          name: 'CustomerFormDemo',
          component: () => import('/@/views/demo/form/customer-form.vue'),
          meta: {
            title: t('routes.demo.form.customerForm'),
          },
        },
        {
          path: 'appendForm',
          name: 'appendFormDemo',
          component: () => import('/@/views/demo/form/append-form.vue'),
          meta: {
            title: t('routes.demo.form.appendForm'),
          },
        },
      ],
    },
    {
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/basic',
      component: getParentLayout('TableDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: t('routes.demo.table.table'),
      },

      children: [
        {
          path: 'basic',
          name: 'TableBasicDemo',
          component: () => import('/@/views/demo/table/basic.vue'),
          meta: {
            title: t('routes.demo.table.basic'),
          },
        },
        {
          path: 'treeTable',
          name: 'TreeTableDemo',
          component: () => import('/@/views/demo/table/tree-table.vue'),
          meta: {
            title: t('routes.demo.table.treeTable'),
          },
        },
        {
          path: 'fetchTable',
          name: 'FetchTableDemo',
          component: () => import('/@/views/demo/table/fetch-table.vue'),
          meta: {
            title: t('routes.demo.table.fetchTable'),
          },
        },
        {
          path: 'fixedColumn',
          name: 'FixedColumnDemo',
          component: () => import('/@/views/demo/table/fixed-column.vue'),
          meta: {
            title: t('routes.demo.table.fixedColumn'),
          },
        },
        {
          path: 'customerCell',
          name: 'CustomerCellDemo',
          component: () => import('/@/views/demo/table/customer-cell.vue'),
          meta: {
            title: t('routes.demo.table.customerCell'),
          },
        },
        {
          path: 'formTable',
          name: 'FormTableDemo',
          component: () => import('/@/views/demo/table/form-table.vue'),
          meta: {
            title: t('routes.demo.table.formTable'),
          },
        },
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('/@/views/demo/table/use-table.vue'),
          meta: {
            title: t('routes.demo.table.useTable'),
          },
        },
        {
          path: 'refTable',
          name: 'RefTableDemo',
          component: () => import('/@/views/demo/table/ref-table.vue'),
          meta: {
            title: t('routes.demo.table.refTable'),
          },
        },
        {
          path: 'multipleHeader',
          name: 'MultipleHeaderDemo',
          component: () => import('/@/views/demo/table/multiple-header.vue'),
          meta: {
            title: t('routes.demo.table.multipleHeader'),
          },
        },
        {
          path: 'mergeHeader',
          name: 'MergeHeaderDemo',
          component: () => import('/@/views/demo/table/merge-header.vue'),
          meta: {
            title: t('routes.demo.table.mergeHeader'),
          },
        },
        {
          path: 'expandTable',
          name: 'ExpandTableDemo',
          component: () => import('/@/views/demo/table/expand-table.vue'),
          meta: {
            title: t('routes.demo.table.expandTable'),
          },
        },
        {
          path: 'fixedHeight',
          name: 'FixedHeightDemo',
          component: () => import('/@/views/demo/table/fixed-height.vue'),
          meta: {
            title: t('routes.demo.table.fixedHeight'),
          },
        },
        {
          path: 'footerTable',
          name: 'FooterTableDemo',
          component: () => import('/@/views/demo/table/footer-table.vue'),
          meta: {
            title: t('routes.demo.table.footerTable'),
          },
        },
        {
          path: 'editCellTable',
          name: 'EditCellTableDemo',
          component: () => import('/@/views/demo/table/edit-cell-table.vue'),
          meta: {
            title: t('routes.demo.table.editCellTable'),
          },
        },
        {
          path: 'editRowTable',
          name: 'EditRowTableDemo',
          component: () => import('/@/views/demo/table/edit-row-table.vue'),
          meta: {
            title: t('routes.demo.table.editRowTable'),
          },
        },
        {
          path: 'authColumn',
          name: 'AuthColumnDemo',
          component: () => import('/@/views/demo/table/auth-column.vue'),
          meta: {
            title: t('routes.demo.table.authColumn'),
          },
        },
      ],
    },
    {
      path: 'transition',
      name: 'transitionDemo',
      component: () => import('/@/views/demo/comp/transition/index.vue'),
      meta: {
        title: t('routes.demo.comp.transition'),
      },
    },
    {
      path: 'cropper',
      name: 'CropperDemo',
      component: () => import('/@/views/demo/comp/cropper/index.vue'),
      meta: {
        title: t('routes.demo.comp.cropperImage'),
      },
    },

    {
      path: 'timestamp',
      name: 'TimeDemo',
      component: () => import('/@/views/demo/comp/time/index.vue'),
      meta: {
        title: t('routes.demo.comp.time'),
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('/@/views/demo/comp/count-to/index.vue'),
      meta: {
        title: t('routes.demo.comp.countTo'),
      },
    },
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      component: getParentLayout('TreeDemo'),
      meta: {
        // icon: 'clarity:tree-view-line',
        title: t('routes.demo.comp.tree'),
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () => import('/@/views/demo/tree/index.vue'),
          meta: {
            title: t('routes.demo.comp.treeBasic'),
          },
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () => import('/@/views/demo/tree/edit-tree.vue'),
          meta: {
            title: t('routes.demo.comp.editTree'),
          },
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () => import('/@/views/demo/tree/action-tree.vue'),
          meta: {
            title: t('routes.demo.comp.actionTree'),
          },
        },
      ],
    },
    {
      path: 'editor',
      name: 'EditorDemo',
      redirect: '/comp/editor/markdown',
      component: getParentLayout('EditorDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: t('routes.demo.editor.editor'),
      },
      children: [
        {
          path: 'json',
          component: () => import('/@/views/demo/editor/json/index.vue'),
          name: 'JsonEditorDemo',
          meta: {
            title: t('routes.demo.editor.jsonEditor'),
          },
        },
        {
          path: 'markdown',
          component: getParentLayout('MarkdownDemo'),
          name: 'MarkdownDemo',
          meta: {
            title: t('routes.demo.editor.markdown'),
          },
          redirect: '/comp/editor/markdown/index',
          children: [
            {
              path: 'index',
              name: 'MarkDownBasicDemo',
              component: () => import('/@/views/demo/editor/markdown/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
            {
              path: 'editor',
              name: 'MarkDownFormDemo',
              component: () => import('/@/views/demo/editor/markdown/editor.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceForm'),
              },
            },
          ],
        },

        {
          path: 'tinymce',
          component: getParentLayout('TinymceDemo'),
          name: 'TinymceDemo',
          meta: {
            title: t('routes.demo.editor.tinymce'),
          },
          redirect: '/comp/editor/tinymce/index',
          children: [
            {
              path: 'index',
              name: 'TinymceBasicDemo',
              component: () => import('/@/views/demo/editor/tinymce/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
            {
              path: 'editor',
              name: 'TinymceFormDemo',
              component: () => import('/@/views/demo/editor/tinymce/editor.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceForm'),
              },
            },
          ],
        },
      ],
    },
    {
      path: 'scroll',
      name: 'ScrollDemo',
      redirect: '/comp/scroll/basic',
      component: getParentLayout('ScrollDemo'),
      meta: {
        title: t('routes.demo.comp.scroll'),
      },
      children: [
        {
          path: 'basic',
          name: 'BasicScrollDemo',
          component: () => import('/@/views/demo/comp/scroll/index.vue'),
          meta: {
            title: t('routes.demo.comp.scrollBasic'),
          },
        },
        {
          path: 'action',
          name: 'ActionScrollDemo',
          component: () => import('/@/views/demo/comp/scroll/action.vue'),
          meta: {
            title: t('routes.demo.comp.scrollAction'),
          },
        },
        {
          path: 'virtualScroll',
          name: 'VirtualScrollDemo',
          component: () => import('/@/views/demo/comp/scroll/virtual-scroll.vue'),
          meta: {
            title: t('routes.demo.comp.virtualScroll'),
          },
        },
      ],
    },

    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('/@/views/demo/comp/modal/index.vue'),
      meta: {
        title: t('routes.demo.comp.modal'),
      },
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('/@/views/demo/comp/drawer/index.vue'),
      meta: {
        title: t('routes.demo.comp.drawer'),
      },
    },
    {
      path: 'desc',
      name: 'DescDemo',
      component: () => import('/@/views/demo/comp/desc/index.vue'),
      meta: {
        title: t('routes.demo.comp.desc'),
      },
    },

    {
      path: 'lazy',
      name: 'LazyDemo',
      component: getParentLayout('LazyDemo'),
      redirect: '/comp/lazy/basic',
      meta: {
        title: t('routes.demo.comp.lazy'),
      },
      children: [
        {
          path: 'basic',
          name: 'BasicLazyDemo',
          component: () => import('/@/views/demo/comp/lazy/index.vue'),
          meta: {
            title: t('routes.demo.comp.lazyBasic'),
          },
        },
        {
          path: 'transition',
          name: 'BasicTransitionDemo',
          component: () => import('/@/views/demo/comp/lazy/transition.vue'),
          meta: {
            title: t('routes.demo.comp.lazyTransition'),
          },
        },
      ],
    },
    {
      path: 'verify',
      name: 'VerifyDemo',
      component: getParentLayout('VerifyDemo'),
      redirect: '/comp/verify/drag',
      meta: {
        title: t('routes.demo.comp.verify'),
      },
      children: [
        {
          path: 'drag',
          name: 'VerifyDragDemo',
          component: () => import('/@/views/demo/comp/verify/index.vue'),
          meta: {
            title: t('routes.demo.comp.verifyDrag'),
          },
        },
        {
          path: 'rotate',
          name: 'VerifyRotateDemo',
          component: () => import('/@/views/demo/comp/verify/rotate.vue'),
          meta: {
            title: t('routes.demo.comp.verifyRotate'),
          },
        },
      ],
    },
    //

    {
      path: 'qrcode',
      name: 'QrCodeDemo',
      component: () => import('/@/views/demo/comp/qrcode/index.vue'),
      meta: {
        title: t('routes.demo.comp.qrcode'),
      },
    },
    {
      path: 'strength-meter',
      name: 'StrengthMeterDemo',
      component: () => import('/@/views/demo/comp/strength-meter/index.vue'),
      meta: {
        title: t('routes.demo.comp.strength'),
      },
    },
    {
      path: 'upload',
      name: 'UploadDemo',
      component: () => import('/@/views/demo/comp/upload/index.vue'),
      meta: {
        title: t('routes.demo.comp.upload'),
      },
    },
    {
      path: 'loading',
      name: 'LoadingDemo',
      component: () => import('/@/views/demo/comp/loading/index.vue'),
      meta: {
        title: t('routes.demo.comp.loading'),
      },
    },
    {
      path: 'cardList',
      name: 'CardListDemo',
      component: () => import('/@/views/demo/comp/card-list/index.vue'),
      meta: {
        title: t('routes.demo.comp.cardList'),
      },
    },
  ],
};

export default comp;

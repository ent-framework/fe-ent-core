import { unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { forEach } from '../../../../utils';
import type { ValueAtom } from '../../../../types';
import type { FieldNames, InsertNodeParams, TreeItem } from '../types/tree';
import type { ComputedRef, Ref } from 'vue';

export function useTree(treeDataRef: Ref<TreeItem[]>, getFieldNames: ComputedRef<FieldNames>) {
  function getAllKeys(list?: TreeItem[]) {
    const keys: ValueAtom[] = [];
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!childrenField || !keyField) return keys;

    for (const node of treeData) {
      keys.push(node[keyField]! as ValueAtom);
      const children = node[childrenField] as TreeItem[];
      if (children && children.length) {
        keys.push(...(getAllKeys(children) as ValueAtom[]));
      }
    }
    return keys as ValueAtom[];
  }

  // get keys that can be checked and selected
  function getEnabledKeys(list?: TreeItem[]) {
    const keys: ValueAtom[] = [];
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!childrenField || !keyField) return keys;

    for (const node of treeData) {
      node.disabled !== true &&
        node.selectable !== false &&
        keys.push(node[keyField]! as ValueAtom);
      const children = node[childrenField] as TreeItem[];
      if (children && children.length) {
        keys.push(...(getEnabledKeys(children) as string[]));
      }
    }
    return keys as ValueAtom[];
  }

  function getChildrenKeys(nodeKey: string | number, list?: TreeItem[]) {
    const keys: ValueAtom[] = [];
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!childrenField || !keyField) return keys;
    for (const node of treeData) {
      const children = node[childrenField] as TreeItem[];
      if (nodeKey === node[keyField]) {
        keys.push(node[keyField]! as ValueAtom);
        if (children && children.length) {
          keys.push(...(getAllKeys(children) as string[]));
        }
      } else {
        if (children && children.length) {
          keys.push(...getChildrenKeys(nodeKey, children));
        }
      }
    }
    return keys as ValueAtom[];
  }

  // Update node
  function updateNodeByKey(key: string, node: TreeItem, list?: TreeItem[]) {
    if (!key) return;
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);

    if (!childrenField || !keyField) return;

    for (let index = 0; index < treeData.length; index++) {
      const element: any = treeData[index];
      const children = element[childrenField];

      if (element[keyField] === key) {
        treeData[index] = { ...treeData[index], ...node };
        break;
      } else if (children && children.length) {
        updateNodeByKey(key, node, element[childrenField]);
      }
    }
  }

  // Expand the specified level
  function filterByLevel(level = 1, list?: TreeItem[], currentLevel = 1) {
    if (!level) {
      return [];
    }
    const res: ValueAtom[] = [];
    const data = list || unref(treeDataRef) || [];
    for (const item of data) {
      const { key: keyField, children: childrenField } = unref(getFieldNames);
      const key = keyField ? item[keyField] : '';
      const children = childrenField ? (item[childrenField] as TreeItem[]) : [];
      res.push(key as ValueAtom);
      if (children && children.length && currentLevel < level) {
        currentLevel += 1;
        res.push(...filterByLevel(level, children, currentLevel));
      }
    }
    return res as string[] | number[];
  }

  /**
   * 添加节点
   */
  function insertNodeByKey({ parentKey = null, node, push = 'push' }: InsertNodeParams) {
    const treeData: any = cloneDeep(unref(treeDataRef));
    if (!parentKey) {
      treeData[push](node);
      treeDataRef.value = treeData;
      return;
    }
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!childrenField || !keyField) return;

    forEach(treeData, (treeItem) => {
      if (treeItem[keyField] === parentKey) {
        treeItem[childrenField] = treeItem[childrenField] || [];
        treeItem[childrenField][push](node);
        return true;
      }
    });
    treeDataRef.value = treeData;
  }
  /**
   * 批量添加节点
   */
  function insertNodesByKey({ parentKey = null, list, push = 'push' }: InsertNodeParams) {
    const treeData: any = cloneDeep(unref(treeDataRef));
    if (!list || list.length < 1) {
      return;
    }
    if (!parentKey) {
      for (const element of list) {
        treeData[push](element);
      }
      treeDataRef.value = treeData;
      return;
    } else {
      const { key: keyField, children: childrenField } = unref(getFieldNames);
      if (!childrenField || !keyField) return;

      forEach(treeData, (treeItem) => {
        if (treeItem[keyField] === parentKey) {
          treeItem[childrenField] = treeItem[childrenField] || [];
          for (const element of list) {
            treeItem[childrenField][push](element);
          }
          treeDataRef.value = treeData;
          return true;
        }
      });
    }
  }
  // Delete node
  function deleteNodeByKey(key: string, list?: TreeItem[]) {
    if (!key) return;
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!childrenField || !keyField) return;

    for (let index = 0; index < treeData.length; index++) {
      const element: any = treeData[index];
      const children = element[childrenField];

      if (element[keyField] === key) {
        treeData.splice(index, 1);
        break;
      } else if (children && children.length) {
        deleteNodeByKey(key, element[childrenField]);
      }
    }
  }

  // Get selected node
  function getSelectedNode(key: ValueAtom, list?: TreeItem[], selectedNode?: TreeItem | null) {
    if (!key && key !== 0) return null;
    const treeData = list || unref(treeDataRef);
    const { key: keyField, children: childrenField } = unref(getFieldNames);
    if (!keyField) return;
    treeData.forEach((item) => {
      if (selectedNode?.key || selectedNode?.key === 0) return selectedNode;
      if (item[keyField] === key) {
        selectedNode = item;
        return;
      }
      if (item[childrenField!] && (item[childrenField!] as TreeItem[]).length) {
        selectedNode = getSelectedNode(key, item[childrenField!] as TreeItem[], selectedNode);
      }
    });
    return selectedNode || null;
  }
  return {
    deleteNodeByKey,
    insertNodeByKey,
    insertNodesByKey,
    filterByLevel,
    updateNodeByKey,
    getAllKeys,
    getChildrenKeys,
    getEnabledKeys,
    getSelectedNode
  };
}

import { kebabCase } from 'lodash-es';
import * as ionic5 from './ionicons5';
import * as antd from './antd';
import type { Component } from 'vue';

const iconData = new Map<string, Component>();

export function useIconData() {
  function loadData() {
    if (!iconData.size) {
      const ionic5Keys = Object.keys(ionic5);
      ionic5Keys.forEach((key) => {
        iconData.set(`ion:${kebabCase(key)}`, ionic5[key]);
      });
      const antdKeys = Object.keys(antd);
      antdKeys.forEach((key) => {
        iconData.set(`ant-design:${kebabCase(key)}`, antd[key]);
      });
    }
  }

  function getIconData() {
    loadData();
    return iconData;
  }

  return { getIconData };
}

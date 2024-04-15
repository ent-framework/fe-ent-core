export interface SimpleMenuState {
  defaultSelectedKeys: string[];
  // 当前选中的菜单项 key 数组
  selectedKey: string;
  // 展开数组
  openKeys: string[];
}

export interface MenuState {
  activeName: string;
  openNames: string[];
  activeSubMenuNames: string[];
}

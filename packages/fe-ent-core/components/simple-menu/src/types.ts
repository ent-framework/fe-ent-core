export interface SimpleMenuState {
  defaultSelectedKeys: string[];
  // 当前选中的菜单项 key 数组
  selectedKeys: string[];
  // 展开数组
  openKeys: string[];
}

export interface MenuState {
  activeName: string;
  openNames: string[];
  activeSubMenuNames: string[];
}

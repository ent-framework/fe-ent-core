import { UserService } from '@ent-core/logics/factory/user';
import { MenuService } from '@ent-core/logics/factory/menu';
import { HttpService } from '@ent-core/logics/factory/http';
import type { UserFactory } from '@ent-core/logics/factory/user';
import type { MenuFactory } from '@ent-core/logics/factory/menu';
import type { HttpFactory } from '@ent-core/logics/factory/http';

export class Factory {
  private static userFactory: UserFactory = new UserService();
  private static menuFactory: MenuFactory = new MenuService();
  private static httpFactory: HttpFactory = new HttpService();

  static getUserFactory() {
    return this.userFactory;
  }
  static setUserFactory(_userFactory: UserFactory) {
    this.userFactory = _userFactory;
  }
  static getMenuFactory() {
    return this.menuFactory;
  }
  static setMenuFactory(_menuFactory: MenuFactory) {
    this.menuFactory = _menuFactory;
  }
  static getHttpFactory() {
    return this.httpFactory;
  }
  static setHttpFactory(_httpFactory: HttpFactory) {
    this.httpFactory = _httpFactory;
  }
}

export { UserFactory, UserService, MenuFactory, MenuService };

import { UserService } from '../../logics/factory/user';
import { LayoutService } from '../../logics/factory/layout';
import { HttpService } from '../../logics/factory/http';
import type { UserFactory } from '../../logics/factory/user';
import type { LayoutFactory } from '../../logics/factory/layout';
import type { HttpFactory } from '../../logics/factory/http';

export class Factory {
  private static userFactory: UserFactory = new UserService();
  private static layoutFactory: LayoutFactory = new LayoutService();
  private static httpFactory: HttpFactory = new HttpService();

  static getUserFactory() {
    return this.userFactory;
  }
  static setUserFactory(_userFactory: UserFactory) {
    this.userFactory = _userFactory;
  }
  static getLayoutFactory() {
    return this.layoutFactory;
  }
  static setLayoutFactory(_layoutFactory: LayoutFactory) {
    this.layoutFactory = _layoutFactory;
  }
  static getHttpFactory() {
    return this.httpFactory;
  }
  static setHttpFactory(_httpFactory: HttpFactory) {
    this.httpFactory = _httpFactory;
  }
}

export { UserFactory, UserService, LayoutFactory, LayoutService };

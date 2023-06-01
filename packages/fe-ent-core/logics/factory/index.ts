import { UserService } from '@ent-core/logics/factory/user';
import { LayoutService } from '@ent-core/logics/factory/layout';
import { HttpService } from '@ent-core/logics/factory/http';
import type { UserFactory } from '@ent-core/logics/factory/user';
import type { LayoutFactory } from '@ent-core/logics/factory/layout';
import type { HttpFactory } from '@ent-core/logics/factory/http';

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

import type { App } from 'vue';

export interface EntInstance {
  init(app: App);
}

class Ent implements EntInstance {
  static instance: Ent;
  _$app: App;
  static getInstance() {
    if (!Ent.instance) {
      Ent.instance = new Ent();
    }
    return Ent.instance;
  }
  init(app: App) {
    const _this = Ent.getInstance();
    _this._$app = app;
  }
}

export const init = (app: App) => {
  if (window['ent']) {
    return;
  }
  Ent.getInstance().init(app);
  window['ent'] = Ent.getInstance();
};

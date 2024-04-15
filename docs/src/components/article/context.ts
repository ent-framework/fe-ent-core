import type { InjectionKey } from 'vue';
import type { AnchorData } from '../aside-anchor/interface';

interface ArticleContext {
  anchors: AnchorData[];
  addAnchor: (data: AnchorData) => void;
  removeAnchor: (href: string) => void;
}

export const articleInjectionKey: InjectionKey<ArticleContext> = Symbol('ArcoArticle');

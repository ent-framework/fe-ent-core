import { createContext, useContext } from 'fe-ent-core/lib/hooks';
import type { ComputedRef, InjectionKey } from 'vue';

export interface ContentContextProps {
  contentHeight: ComputedRef<number>;
  setPageHeight: (height: number) => Promise<void>;
}

const key: InjectionKey<ContentContextProps> = Symbol();

export function createContentContext(context: ContentContextProps) {
  return createContext<ContentContextProps>(context, key, { native: true });
}

export function useContentContext() {
  return useContext<ContentContextProps>(key);
}

import type { EntRouter } from './types';
import type { InjectionKey } from 'vue';

export const routerKey = Symbol('ent-router') as InjectionKey<EntRouter>;

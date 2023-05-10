import type { InjectionKey } from 'vue';
import { EntRouter } from './types';

export const routerKey = Symbol('ent-router') as InjectionKey<EntRouter>;

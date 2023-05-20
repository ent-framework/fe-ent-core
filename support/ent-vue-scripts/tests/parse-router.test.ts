import parseInterface from '../src/scripts/docgen/utils/parse-interface';
import apigen from '../src/scripts/docgen/api';
import type { ComponentDoc } from 'vue-docgen-api';

let componentDocList: ComponentDoc[];
describe('test parse router', () => {
  beforeAll(async () => {
    apigen({ input: '../../packages/fe-ent-core/router/TEMPLATE.md' });
    componentDocList = parseInterface('../../packages/fe-ent-core/router/types.ts');
  });

  it('should be', () => {
    console.log(componentDocList);
    expect(componentDocList.length).toEqual(1);
  });
});

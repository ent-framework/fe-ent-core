import parseInterface from '../src/scripts/docgen/utils/parse-interface';
import type { ComponentDoc } from 'vue-docgen-api';

let componentDocList: ComponentDoc[];
describe('test parse interface', () => {
  beforeAll(async () => {
    componentDocList = parseInterface('tests/interface/test-interface.ts');
  });

  it('should be', () => {
    console.log(componentDocList);
    expect(componentDocList.length).toBeGreaterThan(1);
  });
});

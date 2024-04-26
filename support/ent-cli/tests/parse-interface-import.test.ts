import parseInterface from '../src/scripts/docgen/utils/parse-interface';
import type { ComponentDoc } from 'vue-docgen-api';

let componentDocList: ComponentDoc[];
describe('test parse interface import', () => {
  beforeAll(async () => {
    componentDocList = parseInterface('tests/interface/test-interface-import.ts');
  });

  it('should be', () => {
    expect(componentDocList.length > 0);
  });
});

import { parse } from 'vue-docgen-api';
import type { ComponentDoc } from 'vue-docgen-api';
import { slotTagHandler } from '../src/scripts/docgen/handlers/slot-tag-handler';
import { propExtHandler } from '../src/scripts/docgen/handlers/prop-ext-handler';
import { extendsExtHandler } from '../src/scripts/docgen/handlers/extends-ext-handler';

let componentDoc: ComponentDoc;
describe('test parse router', () => {
  beforeAll(async () => {
    componentDoc = await parse('../../packages/fe-ent-core/components/icon/src/icon.vue', {
      addScriptHandlers: [propExtHandler, slotTagHandler, extendsExtHandler],
    });
  });

  it('should be', () => {
    console.log(JSON.stringify(componentDoc, null, 2));
    //expect(componentDocList.length).toEqual(1);
  });
});

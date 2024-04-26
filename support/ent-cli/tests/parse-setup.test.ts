import { ScriptHandlers, parse } from 'vue-docgen-api';
import ScriptSetupHandlers from 'vue-docgen-api/dist/script-setup-handlers';
import { slotTagHandler } from '../src/scripts/docgen/handlers/slot-tag-handler';
import { propExtHandler } from '../src/scripts/docgen/handlers/prop-ext-handler';
import { extendsExtHandler } from '../src/scripts/docgen/handlers/extends-ext-handler';
import type { ComponentDoc } from 'vue-docgen-api';

let componentDoc: ComponentDoc;
describe('test parse router', () => {
  beforeAll(async () => {
    componentDoc = await parse(
      '../../extensions/code-editor/src/components/code-mirror/index.vue',
      {
        addScriptHandlers: [
          ScriptHandlers.extendsHandler,
          ...ScriptSetupHandlers,
          propExtHandler,
          slotTagHandler,
          extendsExtHandler,
        ],
      },
    );
  });

  it('should be', () => {
    console.log(JSON.stringify(componentDoc, null, 2));
    //expect(componentDocList.length).toEqual(1);
  });
});

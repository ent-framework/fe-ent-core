import { withInstall } from 'fe-ent-core/es/utils';
import ImportExcel from './components/import-excel.vue';
import ExportExcelModal from './components/export-excel-modal.vue';
import type { App } from 'vue';

export const EntImportExcel = withInstall(ImportExcel);
export const EntExportExcelModal = withInstall(ExportExcelModal);

export { jsonToSheetXlsx, aoaToSheetXlsx } from './components/export-2-excel';

export const install = function (app: App) {
  app.use(EntImportExcel);
  app.use(EntExportExcelModal);
  return app;
};

//export type * from './components/typing';

export default install;

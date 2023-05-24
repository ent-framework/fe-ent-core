import { withInstall } from '@ent-core/utils';
import impExcel from './src/import-excel.vue';
import expExcelModal from './src/export-excel-modal.vue';

export const EntImportExcel = withInstall(impExcel);
export const EntExportExcelModal = withInstall(expExcelModal);
export * from './src/typing';
export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/export-2-excel';

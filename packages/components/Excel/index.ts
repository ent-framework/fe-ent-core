import { withInstall } from '@ent-core/utils';
import impExcel from './src/ImportExcel.vue';
import expExcelModal from './src/ExportExcelModal.vue';

export const ExtImportExcel = withInstall(impExcel);
export const EntExportExcelModal = withInstall(expExcelModal);
export * from './src/typing';
export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/Export2Excel';

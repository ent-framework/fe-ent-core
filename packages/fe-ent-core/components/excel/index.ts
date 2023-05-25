import { withInstall } from '@ent-core/utils';
import ImportExcel from './src/import-excel.vue';
import ExportExcelModal from './src/export-excel-modal.vue';

export const EntImportExcel = withInstall(ImportExcel);
export const EntExportExcelModal = withInstall(ExportExcelModal);

export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/export-2-excel';

export default ImportExcel;
export { ExportExcelModal };

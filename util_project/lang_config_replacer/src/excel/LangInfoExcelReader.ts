import * as XLSX from 'xlsx';

import { LangInfo } from './LangInfo';
import { ExcelReader } from './ExcelReader';

export class LangInfoExcelReader implements ExcelReader {
	read(path: string): LangInfo[] {
		const workbook = XLSX.readFile(path);
		const firstSheetName = workbook.SheetNames[0];
		const workSheet = workbook.Sheets[firstSheetName];
		
		const rows:string[][] = XLSX.utils.sheet_to_json(workSheet, {header: 1});
		
		return rows.filter(v => v && v.length).map(row => new LangInfo(row));
	}
}

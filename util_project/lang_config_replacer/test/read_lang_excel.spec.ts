import test from 'ava';
import { ExcelReader, LangInfoExcelReader, LangInfo } from '@app/excel';
import * as path from 'path';

const LANG_EXCEL_FILE_PATH: string = path.resolve(__dirname, './samples/test.xlsx');

test('read_lang_excel', async t => {
	const reader: ExcelReader = new LangInfoExcelReader();
	
	const langInfoes: LangInfo[] = reader.read(LANG_EXCEL_FILE_PATH);
	langInfoes.forEach(langInfo => {
		langInfoes.push(langInfo);
	});
	t.is(langInfoes.length, 10);
});

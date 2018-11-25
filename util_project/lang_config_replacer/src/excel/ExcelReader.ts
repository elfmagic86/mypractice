import { LangInfo } from './LangInfo';

export interface ExcelReader {
	read(path: string): LangInfo[];
}

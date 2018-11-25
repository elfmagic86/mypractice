export class LangInfo {
	_row: string[] = [];
	ko: string = '';
	en: string = '';
	jp: string = '';
	cn: string = '';
	zh: string = '';

	constructor(row: string[] = []) {
		this._row = row;

		this.ko = row[1];
		this.en = row[2];
		this.jp = row[3];
		this.cn = row[4];
		this.zh = row[5];
	}
}

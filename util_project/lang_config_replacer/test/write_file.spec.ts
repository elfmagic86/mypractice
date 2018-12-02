import test from 'ava';
import * as path from 'path';
import * as fileUtil from '@app/util/fileUtil';

const EMPTY_DATA = '';
const filePath = path.resolve(__dirname, './samples/___test_create_file');
const filePathList = [...Array(50)].map((_, i) => filePath+i);

test.serial('create_file', async t => {
	await fileUtil.createFileIfNotExists(filePath, EMPTY_DATA)
	
	t.is(true, await fileUtil.exists(filePath));
});

test.serial('delete_file', async t => {
	await fileUtil.deleteFileIfExists(filePath);

	t.is(false, await fileUtil.exists(filePath));
});

test.serial('filePathList', async t => {
	await fileUtil.createFileIfNotExists(filePathList, EMPTY_DATA);
	
	(await fileUtil.exists(filePathList)).forEach(v => t.true(v));

	await fileUtil.deleteFileIfExists(filePathList);
	
	(await fileUtil.exists(filePathList)).forEach(v => t.false(v));
});

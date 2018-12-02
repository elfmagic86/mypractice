import test from 'ava';
import * as path from 'path';
import * as fileUtil from '@app/util/fileUtil';

const exists_file = path.resolve(__dirname, './samples/test.json');
const not_exists_file = path.resolve(__dirname, './samples/test_____notexists_.json');

test('exists_file', async t => {
	t.is(true, await fileUtil.exists(exists_file));
	t.deepEqual([true, true], await fileUtil.exists([exists_file, exists_file]));
});

test('not_exists_file', async t => {
	t.is(false, await fileUtil.exists(not_exists_file));
	t.deepEqual([false, false], await fileUtil.exists([not_exists_file, not_exists_file]));
});


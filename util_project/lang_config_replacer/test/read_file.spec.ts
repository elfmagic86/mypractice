import test from 'ava';
import * as fileUtil from '@app/util/fileUtil';
import * as path from 'path';

const TEST_PROPERTIY: string = path.resolve(__dirname, './samples/message_test.properties');
const TEST_JSON: string = path.resolve(__dirname, './samples/test.json');

test('read_line_file', async t => {

	let lines :String[] = [];
	await fileUtil.readLine(TEST_PROPERTIY, line => {
		lines.push(line);
	});

	t.is(true, lines.length ? true : false);
});

test('read_chunk_file', async t => {
	const json = await fileUtil.readChunkFile(TEST_JSON);

	t.is(true, json ? true : false);
});

test('read_json_file', async t => {
	const json = await fileUtil.readJSON(TEST_JSON);

	t.is('test', json.test);
});

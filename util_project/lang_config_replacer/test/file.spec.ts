import test from 'ava';
import * as fileUtil from '@app/util/fileUtil';
import * as path from 'path';

const TEST_PROPERTIY: string = path.resolve(__dirname, './message_test.properties');
const TEST_JSON: string = path.resolve(__dirname, './test.json');

test('read_line_file', async t => {
	await fileUtil.readLine(TEST_PROPERTIY, line => {
		console.log(line);
	});

	t.is('TODO', 'TODO');
});

test('read_chunk_file', async t => {
	const json = await fileUtil.readChunkFile(TEST_JSON);
	console.log(json);

	t.is('TODO', 'TODO');
});

test('read_json_file', async t => {
	const json = await fileUtil.readJSON(TEST_JSON);

	t.is('test', json.test);
});

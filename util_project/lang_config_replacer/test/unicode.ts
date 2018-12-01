import test from 'ava';
import * as unicodeUtil from '@app/util/unicodeUtil';

const UNICODE_ENCODED_STR = '\uc815\uc0c1\ucc98\ub9ac \ub418\uc5c8\uc2b5\ub2c8\ub2e4.';
const UNICODE_DECODED_STR = '정상처리 되었습니다.';

test('decode unicode', async t => {
	const str = unicodeUtil.decode(UNICODE_ENCODED_STR);
	t.is(UNICODE_DECODED_STR, str);
});
test('encode unicode', async t => {
	const str = unicodeUtil.encode(UNICODE_DECODED_STR);
	// TODO
	t.is(UNICODE_ENCODED_STR, str);
});

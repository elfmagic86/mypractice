import test from 'ava';

const fn = async () => Promise.resolve('foo');

test('test', async t => {
	console.log('test')
	t.is(await fn(), 'foo');
});

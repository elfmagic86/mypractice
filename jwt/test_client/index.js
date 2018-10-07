const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const userData = {
	username: 'username',
	password: 'password'
}

// do
//login(userData).then(isLogin);

isLogin()

function login(userData) {

	return axios.post('/api/auth/login', userData)
		.then(function (response) {
			const data = response.data;

			console.log(`login: `, data);

			return data.token
		})
		.catch(function (error) {
			console.warn('error', error.stack);
		});
}
function isLogin(token) {
	// test용
	token = createToken()

	let config = {
		headers: {'authorization': token}
	}

	return axios.get('/api/auth/isLogged', config)
		.then(function (response) {
			const data = response.data;

			console.log(`isLogin:`,  data);
			return data
		})
		.catch(function (error) {
			console.warn('error', error.stack);
		});
}

// 서버와 같은방식으로 사인함
// secret와 알고리즘등이 같은형태로 토큰만들면 valid하다.
function createToken() {
	var jwt = require('jsonwebtoken');

	var secret = 'your-256-bit-secret'
	var token = jwt.sign({ foo: 'bar' }, secret);

	token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdGVyIiwidGVzdGVyIjoyMjIyMjIyfQ.pTaOotU9f18s-7eMxn1MYmlahOqZX9Anv0rDM0bnJKI'
	token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdGVyIiwidGVzdGVyIjoyMjIyMjIyfQ.FQ12ltxlVUITr1ALEIjspLOu74jFtZVtSMd5s_2e8cM'
	token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoidGVzdGVyIiwidGVzdDIiOiJ0ZXN0ZXIiLCJ0ZXN0MyI6InRlc3RlciIsInRlc3Q0IjoidGVzdGVyIiwidGVzdDV3ZXdmd2Vmd2Vmd2VmIjoidGVzdGVyIiwidGVzdGVyIjoyMjIyMjIzfQ.6HdwlqOC8Skp3zLgrnMibGPuk_TSg5j6QzVJGFchlGE'


	console.log(`클라에서만든토큰: ${token}`)

	return token;
}

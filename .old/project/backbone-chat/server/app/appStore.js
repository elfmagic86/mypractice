/*
    # 왜
     - session을 사용하고 싶었다. 그런데 sockjs에서는 사용할수가 없다.
       그래서 httpServer에서는 세션으로 로그인 유저를 구별하고..
       chatServer에서는 현재 저장소를 이용하여 익명 유저를 구별하려고 한다.
       그렇기에 두 서버에서 공통으로 사용할 저장소가 필요하다.

	# 무엇
	 - httpServer, chatServer에서 공통으로 사용하는 인-메모리 저장소

	# 어떻게 
	 - 현재는 접속한 유저만 기록. 그래서 해제를 잘해줘야함. //용량한계가생길수도잇겠군.
	 - 나중에는 메시지나..그런것도 음.. 오늘치정도 저장하는걸로?
	   그러다 몽고로 필요 데이터 저장할수도 있겠고...
*/
var U = require(__base + 'common/util')
  , _ = U._;
////
var _stores = {};

var appStore = module.exports = {};

// 처음에 명시적으로 공간만들고...사용.  list, map 두종류.
// appStore.makeMap('users', ['id'])
appStore.makeMap = function (mapStoreName, idOfNode) {
	if(U.exist(_stores[mapStoreName])) return console.info('already exist map : ', mapStoreName);
	idOfNode = idOfNode || 'id' // default identity

	_stores[mapStoreName] = { idOfNode : idOfNode , value : {} };
	return _stores[mapStoreName].value;
}
appStore.makeList = function (listStoreName) {
	if(U.exist(_stores[listStoreName])) return console.info('already exist list : ', listStoreName);

	_stores[listStoreName] = [];
	return _stores[listStoreName];
}

// appStore.set('users', user);  
//id가 필요하다. 없다면 만듬. map일경우 중복은..걍 덮어쓰기..
var TEMP_MAP_ID = 'tempID'
  , temp_count  = 0;
appStore.set = function (storeName, newValue) {
	var store = _stores[storeName]
	if(U.notExist(store)) return console.info('not exist in appStore :', storeName);

	if(_.isArray(store)) return store.push(newValue);
	else {//mapStore   값이 0일경우 문제가되는군..
		var valueOfId = newValue[store.idOfNode]
		if(U.notExist(newValue[store.idOfNode]) ) valueOfId = TEMP_MAP_ID + (++temp_count);
		
		newValue[store.idOfNode] = valueOfId;
		store.value[valueOfId] = newValue;
		return;
	}
}
appStore.get = function (storeName, idOrValue) {
	var store    = _stores[storeName]
	  , idOfNode = store.idOfNode
	if(U.notExist(store)) return console.info('not exist in appStore :', storeName);	
	if(_.isArray(store)) return console.info('not implement to find listStore  :', storeName);
	//listStore것은 아직 구현안함.
	
	if(U.notExist(idOrValue)) return store.value;

	//mapStore
	var queryId, queryValue   //이 그지같ㄴ은 if else..를 어찌?
	if(_.isString(idOrValue)) { 
		queryId    = idOfNode;
		queryValue = idOrValue;
	} else {
		queryId    = _.keys(idOrValue)[0]; // 첫번째 것만 취급함.
		queryValue = idOrValue[queryId];
	}

    if(idOfNode === queryId) return store.value[queryValue];

	for(var i in store.value) {
		var node = store.value[i];
		if(node && node[queryId] === queryValue) { return node;}
	}
	return null; //없으면 널.
}

//array구현 해야함.
appStore.remove = function (storeName, id) {
	console.log(id)
	var aValue   = appStore.get(storeName, id)
	var store    = _stores[storeName]
	  , queryId  = store.idOfNode;
	console.log(aValue)
	var queryValue  = aValue[queryId];
	delete store.value[queryValue]
}

/// 이건 세션을 통해 저장,삭제된.. 음..
appStore.getSessionUser = function () {
	return false;
}
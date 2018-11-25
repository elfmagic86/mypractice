/**
 * Editor......
 * ù��° �۾� : ���ӽ����̽� �ʱ�ȭ
 * �ι�° �۾� : �ʿ��� ��� �ε�, iframe �����ε� �۾� ����
 * ����° �۾� : �ε� �� Editor����� �ʱ�ȭ? 
 */

/**
 * ù��° �۾� : ���ӽ����̽� �ʱ�ȭ �⺻ ���ӽ����̽� : com.kang
 */
$$NameSpace = function(nsStr) {
		var nsArray = nsStr.split('.');
		var context = window;
		var nsName;
	
		for (var i = 0, max = nsArray.length; i < max; ++i) {
			nsName = nsArray[i];
			if (!(context[nsName])) 
				context[nsName] = {};
			
			context = context[nsName];
			
		}
		return context;
	};
	
(function(str) {
	$$NameSpace(str);
})("com.kang");

/*
 * �ι�° �۾� : ��� �ε�
 */
(function() {
	// constructor
	var ns = com.kang;
	ns.ModuleLoader = function ModuleLoader(confName) {
//		this._defaultPath = this._getDefaultPath(ns.ModuleLoader.SELF_NAME); // WEF-INF/ ����
		this._defaultPath = '';
		this._curModulesIndex = 0;
		
		this._init(confName);
	};

	// static field
	ns.ModuleLoader.SELF_NAME = "ModuleLoader.js"; // ���� ����̸�
	ns.ModuleLoader.DEFAULT_MODULE_NAME = "MODULE_NAMES.js"; // MODULE_CONF
	
	// private method
	ns.ModuleLoader.prototype._init = function (confName) {
		// default
		if(confName == null) {
			confName = ns.ModuleLoader.DEFAULT_MODULE_NAME;
		}
		this._loadOfModuleName(confName);
	};

	ns.ModuleLoader.prototype._loadOfModuleName = function(moduleName) {
		var url = this._transferUrlOf(moduleName),
		 	script = this._createScript(url);
		
		document.head.appendChild(script);
		script.onload = script.onreadystatechange = this._callBack.bind(this);
	};
	ns.ModuleLoader.prototype._callBack = function(e) {
		if(!(window.$$MODULE_NAMES)) {
			throw "not found $$MODULE_NAMES ";
		};
		var moduleName = window.$$MODULE_NAMES[this._curModulesIndex++];
		if(!(moduleName)) {
			return ;
		}
		this._loadOfModuleName(moduleName);
	};

	ns.ModuleLoader.prototype._transferUrlOf = function(name) {
		if (name.indexOf('/') > 0 && name.indexOf('./') < 0) {
			return this._defaultPath + name;
		} else {
			return name;
		}
	};
	ns.ModuleLoader.prototype._createScript = function(url) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);
		script.setAttribute("charset", "utf-8");
		

		return script;
	};

	
	//�⺻ ��θ� �ε��� ModuleLoader�� ã�´�.
	//�׷��� ���� ��ġ�Ǹ鼭 �⺻�н��� �ʿ���ԵǾ� ������� ����.
	ns.ModuleLoader.prototype._getDefaultPath = function(fileName) {
		var scripts = document.getElementsByTagName("script"), i, filePath, lastIndex, WEB_INF = "/resources/";

		for (var i = 0; i < scripts.length; i++) {
			filePath = scripts[i].src;

			if (filePath.indexOf(fileName) != -1) {
				lastIndex = filePath.lastIndexOf(WEB_INF) + WEB_INF.length;
				filePath = filePath.substr(0, lastIndex);
				return filePath;
			}
		}
		throw "cannot find " + fileName + " script element";
	};

})();

/*
 * ���� ����
 */
/*(function() {
	var ns = com.kang;
	var Modules = "MODULE_NAMES.js"; //
	var loader = new ns.ModuleLoader();	
})();*/
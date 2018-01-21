# Current Status
 - Only should run in chrome browser 
 - 아마도, angularjs, backbonejs 같은 것을 배우게 된다면 사용되지 않을 것 같다.

# What is this?
 - Asynchronous javascript modules loader
 - Namespace have style like nodejs(require, module.exports) for module of javascript

# Used example
 - [nodeblog](http://elfmagic86.heroku.com/)

# how to use  
 1. load jQuery, $$namespace, modules
  ex) 
        ```javascript
       <script src="/resources/lib/jquery/jquery-2.1.1.min.js"></script>
        <script src="/resources/js/namespace/$$namespace.js"></script>
        <script src="/resources/js/modules.js"></script>
        ```
 2. source sample

   - [modules sample for load](https://github.com/elfmagic86/NodeBlog/tree/master/resources/js/modules.js)

   - [user module source sample](https://github.com/elfmagic86/NodeBlog/blob/master/resources/js/history/actionHistory.js)  
   ```javascript
	(function() {
	
	// 
	var modules = [
	                  "./editor/js/iframeContent.js",

	                  "./editor/js/util/helper.js",
	                  
	                  "./editor/js/part/treeSearcher.js",
	....


	$$namespace.load(modules, function (require, loadedModules) {
	.....
		

   ```   
   ```javascript
	$$namespace.include(function(require, module) {

		var a = require(/a.js)
		var newModule = module.exports = {}

		newModule.aa = function () {} .......
	}

   ```


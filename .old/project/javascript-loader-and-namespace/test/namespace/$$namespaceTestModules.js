


(function(){
	
	
	var modules = [
	             // �몃� 紐⑤뱢
	               "../lib/underscore-min"
	             , "../lib/chai/chai.js"
	             
	              ]  

	$$namespace.load(modules)
	
	var modules = [
	               // �몃� 紐⑤뱢
	               "../lib/underscore-min.js"
	               , "../lib/chai/chai"
	               
	               // �뚯뒪��紐⑤뱢
	               , "./$$namespaceTest"
	               ]  
	
	$$namespace.load(modules, function() {
		mocha.run();
	})
	
})();

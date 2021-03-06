
/**
 * 
 */

(function(define, _, require) {
	define([]
	, function() {
		return ['$scope'
		       ,'$window'
		       ,'app.blogBoard.blogBoardDAO'
		       ,makeEditorControllerWrap]
	})
	function makeEditorControllerWrap () {
		var self = this
		  , args = arguments;
		  
		require([ "../../lib/editor/editorModules"
		         ,"../../lib/editor/lib/namespace/$$namespace"
		         ], function() {
			makeEditorController.apply(self, args)
		})
	}
	
	function makeEditorController ($scope, $window, blogBoardDAO) {
		var $parent 	= $scope.$parent
		  , post		= $parent.post
		  , contentText = post.content || '';
		
		var $$editorModules = $window.$$editorModules
		  , $$namespace		= $window.$$namespace;

		
		//editor.html에서 window에 할당된 $$namespace , $$editorModules
		$$namespace.load($$editorModules, function(require) {
			var Editor = require('/js/Editor')
			var $$editor = new Editor(contentText, imageUploadCallback);	
			$parent.$$editor = $$editor;
			
			// etc
			function imageUploadCallback(e, fileElement, editor) {
				var file 	 = fileElement.files[0]
				  , size 	 = file.size
				  , fileName = file.name.slice(0, file.name.indexOf('.'))
				var maxByte  = 2000000;
				if(size > maxByte) {
					alert('file size should be max 2MB');
					fileElement.files = null
					fileElement.value = '' 
					return e.preventDefault();
				}
				
				var formData = new $window.FormData()
				formData.append('file', file);
				blogBoardDAO.uploadImage(formData)
							.then(function(fileInfo) {
								$$editor.insertImageToContent(fileInfo.url);
								$parent.post.fileInfoes.push(fileInfo)
							})
							
			}
		}); 
	}
	
})(define, _, require)
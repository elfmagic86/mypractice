/**
 * 
 */

define(['common/common'], function (common) {
	describe('util', function () {
		var U = null;
		beforeEach(function() {
			angular.mock.module(common)
			angular.mock.inject(function ($injector) {
				U = $injector.get('common.util');
			})
		})
		// 아직. 뭐 없다.
		it('should...', function () {
			expect('a').toEqual('a')
		})
			
	})
})
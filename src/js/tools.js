var TOOLS = (function() {

	/**
	* Param to Object
	* @param {String} str 
	* @return {Object} _paramsToJSON
	*/
	var _paramsToJSON = function(str) {
		var pairs = str.split('&');
		var result = {};
		pairs.forEach(function(pair) {
			pair = pair.split('=');
			var name = pair[0]
			var value = pair[1]
			if( name.length )
				if (result[name] !== undefined) {
					if (!result[name].push) {
						result[name] = [result[name]];
					}
					result[name].push(value || '');
				} else {
					result[name] = value || '';
				}
		});
		return( result );
	}

	/**
	* Get width from all child
	* @param {Object} Jquery object selector 
	* @param {String} child 
	* @return {Number} _setWidthFromChild
	*/
	var _setWidthFromChild = function(selector, child){
		var width = 0;
		var child_list = selector.find(child);
		child_list.each(function(index, el) {
			width += $(el).width();
		});
		return width
	}

	/**
	* Check Number ODD or Even
	* @param {Number} n
	* @return {String} _oddEven
	*/
	var _oddEven = function(n){
		if ( n % 2 == 0 ) {
			return 'even'
		}else if (Math.abs(n % 2) == 1 ){
			return 'odd'
		}
	}

	return {
		paramsToJSON : function(str){
			return _paramsToJSON(str);
		},
		setWidthFromChild : function(selector, child){
			return _setWidthFromChild(selector, child);
		},
		oddEven : function(n){
			return _oddEven(n);
		}
	}

})();
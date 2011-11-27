CUBE.Util = function() {

};

CUBE.Util.longestText = function(cubesWithText){
	var longestText = 0;
	    for ( var i = 0; i < cubesWithText.length; i ++ ) {
			text = cubesWithText[i].geometry;
	    	text.computeBoundingBox();
	        size = (text.boundingBox.x[0] > 0) ? Math.abs(text.boundingBox.x[0] - text.boundingBox.x[1]) : Math.abs(text.boundingBox.x[0] + text.boundingBox.x[1]);
	        if(longestText < size){
				longestText = size;				           		
	        }
		}
	  		
	return longestText;
}


CUBE.Util.textArrayToScene = function(cubeNames, color, rows, cubeManager){
	var textContainer = [];
	var cubeContainer = [];
	for ( var i = 1; i <= cubeNames.length; i ++ ) {
		var elem = CUBE.Factory.createCubeWithLabel(200,200,200,cubeNames[i-1], color);
		elem[0].clickable = true;
		elem[1].clickable = true;
		
		cubeContainer.push(elem[0]);
		textContainer.push(elem[1]);
		
	}
	var longestTextElem =  CUBE.Util.longestText(textContainer);
	var spaceX = longestTextElem;
	
	var x = 0;
	var y = 0;
	var spaceY = 200*4;
	for ( var i = 1; i <= cubeContainer.length; i ++ ) {
		var cube = cubeContainer[i-1];
		cube.position.x = x;
		cube.position.y = y;
		
		var text = textContainer[i-1];
		text.position.x += x;
		text.position.y = y-400;
		x += spaceX+200;
		if( i % rows == 0){
			y -= spaceY;
			x  = 0;
		}
	}
	
	for ( var i = 0; i < cubeContainer.length; i ++ ) {
		cubeManager.sceneUtil.add(cubeContainer[i]);
		cubeContainer[i].textObject = textContainer[i];
		cubeManager.sceneUtil.add(textContainer[i]);
		
	}
	return [textContainer,cubeContainer];
	
}


CUBE.Util.JsonToArray = function(url,name){
	var dimensions = [];
	$.ajax({
		  url: url,
		  async: false,
		  dataType: 'json',
		  success: function (json) {
		    $.each(json, function(k, v) {
    			var mydata =[];
		    	var hierarchies = [];
		    	for ( var i = 0; i < v.length; i ++ ) {
					var levels = [];
					for ( var y = 0; y < v[i].level.length; y ++ ) {
						var level = new OLAPCube.Level(v[i].level[y],k,v[i].hierarchy);
						levels.push(level);
					}	
		    		var h = new OLAPCube.Hierarchy(v[i].hierarchy,k, levels );
		    		hierarchies.push(h);
		    	}
    			dimensions.push(new OLAPCube.Dimension(k, hierarchies));
  			});
		  }
		});
	var cube = new OLAPCube.Cube(name,dimensions);
	return cube;
}

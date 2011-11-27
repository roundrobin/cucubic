var OLAPCube = OLAPCube || {};

OLAPCube.Cube = function(name, dimensions) {
	this.OLAPCube   = name || "";
	this.dimensions = dimensions || [];   
};

OLAPCube.Cube.prototype.dimension_names = function(){
	var dimension_names = [];
	for ( var i = 0; i < this.dimensions.length; i ++ ) {
		dimension_names.push(this.dimensions[i].name);
	}		
	return dimension_names;
}

OLAPCube.Cube.prototype.getDimensionFromString = function(dimensionName){
	var dimension;
    for ( var j = 0; j < this.dimensions.length; j ++ ) {
		if(this.dimensions[j].name == dimensionName ){
			dimension = this.dimensions[j];
			index = j;
			break;		
		}
	}
    return dimension;
}

OLAPCube.Cube.prototype.getLevelFromString = function(dimensionName,levelName){
	var dimension;
	var level;
    for ( var j = 0; j < this.dimensions.length; j ++ ) {
		if(this.dimensions[j].name == dimensionName ){
			dimension = this.dimensions[j];
			index = j;
			for ( var k = 0; k < this.dimensions[index].hierarchies[0].level.length; k ++ ) {
				if(this.dimensions[index].hierarchies[0].level[k].name == levelName ){
					level = this.dimensions[index].hierarchies[0].level[k].name; 
					break;		
				}
			}
			break;		
		}
	}
    return level;
}
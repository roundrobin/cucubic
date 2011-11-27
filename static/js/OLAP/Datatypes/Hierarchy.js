OLAPCube.Hierarchy = function(name, dimension, level) {
	this.name = name || "";
	this.level = level || [];
	this.childrenNodes = level;
	this.dimension = dimension;
};

OLAPCube.Hierarchy.prototype.level_names = function(){
	var level_names = [];
	for ( var i = 0; i < this.level.length; i ++ ) {
		level_names.push(this.level[i].name);
	}		
	return level_names;
}

OLAPCube.Hierarchy.prototype.children = function(){
	var level_names = [];
	for ( var i = 0; i < this.level.length; i ++ ) {
		level_names.push(this.level[i]);
	}		
	return level_names;
}

OLAPCube.Hierarchy.prototype.toString = function(){
	return this.name;
}

OLAPCube.Hierarchy.prototype.toMesh = function(params){
    if(params.position){
        var position = params.position;
    }else{
       var position = {x: 0, y: 0, z: 0};
    }
    var dimText = CUBE.Factory.createText(this.toString(), 65,1, rot);
	dimText.position.set( position.x, position.y, position.z);
	dimText.startPosition = new THREE.Vector3(position.x, position.y, position.z);
	dimText.value = this.toString();
	dimText.childrenNodes = this.level;
	dimText.visualChildren = [];
	dimText.dimension = this.dimension;
	return dimText; 
}
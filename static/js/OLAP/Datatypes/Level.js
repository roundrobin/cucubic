OLAPCube.Level = function(name, dimension, hierarchy, members) {
	this.name = name || "";
	this.members = members || [];
	this.dimension = dimension;
	this.hierarchy = hierarchy;
	
};

OLAPCube.Level.prototype.children = function(){
	var members = [];
	return members;
}

OLAPCube.Level.prototype.toString = function(){
	return this.name;
}

OLAPCube.Level.prototype.toMesh = function(params){
    if(params.position){
        var position = params.position;
    }else{
       var position = {x: 0, y: 0, z: 0};
    }
	
	var levelCube = CUBE.Factory.createCubeWithCanvasText(500, 100, 2, 0xffffff, this.toString());
	levelCube.position.set( position.x+150,position.y,position.z);
	levelCube.startPosition = new THREE.Vector3(position.x, position.y, position.z);
	levelCube.draggable = true;
	levelCube.clickable = true;
	levelCube.onclick = function() {};
	levelCube.value = this.toString();
	
	
    levelCube.dimension = this.dimension;
    levelCube.name     = this.name;
    levelCube.hierarchy = this.hierarchy;
    
	
	
    return levelCube;
	
}
OLAPCube.Dimension = function(name, hierarchies) {
	this.name = name;
	this.hierarchies = hierarchies || [];
};

OLAPCube.Dimension.prototype.hierarchy_names = function(){
	var hierarchy_names = [];
	for ( var i = 0; i < this.hierarchies.length; i ++ ) {
		hierarchy_names.push(this.hierarchies[i].name);
	}		
	return hierarchy_names;
}

OLAPCube.Dimension.prototype.children = function(){
	var hierarchy_names = [];
	for ( var i = 0; i < this.hierarchies.length; i ++ ) {
		hierarchy_names.push(this.hierarchies[i]);
	}		
	return hierarchy_names;
}

OLAPCube.Dimension.prototype.toString = function(){
	return this.name;
}

OLAPCube.Dimension.prototype.toMesh = function(params){
    if(params.position){
        var position = params.position;
    }else{
       var position = {x: 0, y: 0, z: 0};
    }
    var dimText = CUBE.Factory.createText(this.toString(), 65,1, blau);
	dimText.position.set( position.x, position.y, position.z);
	dimText.startPosition = new THREE.Vector3(position.x, position.y, position.z);
	dimText.clickable = true;
	dimText.childrenNodes = this.hierarchies;
    dimText.value = this.toString();
    dimText.visualChildren = [];
    dimText.dimension = this;
    dimText.onclick = CUBE.Navigator.delegatorCall(CUBE.Navigator.toogleTreeChilds, {node: dimText});  
	return dimText; 
}
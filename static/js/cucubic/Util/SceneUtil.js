CUBE.SceneUtil = function(scene) {
	this.scene = scene;	
	
	this.allObjects = [];
	this.clickableObjects    = [];
	this.nonClickableObjects = [];
	this.draggableObjects    = [];
	this.allObjects          = [];
	
};


CUBE.SceneUtil.prototype = {
	clear : function(){
		//this.scene.clear();
	},
	add : function(object){
	    if(!object.clickable){
	        this.nonClickableObjects.push(object);
	    }
	    if(object.clickable){
	        this.clickableObjects.push(object);
	    }
	    if(object.draggable){
	        this.draggableObjects.push(object);
	    }
	    
	    this.allObjects.push(object);
		this.scene.add(object);
	},
	remove : function(object){
	    if(!object.draggable){
	        this.nonClickableObjects.remove(object);
	    }
	    if(object.clickable){
	        this.clickableObjects.remove(object);
	    }
	    if(object.draggable){
	        this.draggableObjects.remove(object);
	    }
	    this.scene.removeObject(object);
	},
	getBoundingBox : function(obj3dParam){
	//Variablen mit einem random Point irgendeines Objectes aus der dem Cube-Array initialisieren
	    
	    if(obj3dParam instanceof Array){
	        obj3dParam = obj3dParam[0];
	    }
	    
		var smX = hX = obj3dParam.children[0].position.x;
		var smZ = hZ = obj3dParam.children[0].position.z;
		var smY = hY = obj3dParam.children[0].position.y;
		//THREE.SceneUtils.traverseHierarchy( obj3dParam.children, function ( obj3d ) {
		for(var i = 0; i < obj3dParam.children.length; i++ ){     
		    var smXTemp = obj3dParam.children[i].position.x;
			var smYTemp = obj3dParam.children[i].position.y;
			var smZTemp = obj3dParam.children[i].position.z;
			obj3dParam.children[i].geometry.computeBoundingBox();
			
			var bBoxCube   = obj3dParam.children[i].geometry.boundingBox;
			var widthCube  = Math.abs(bBoxCube.x[0]-bBoxCube.x[1]);
			var heightCube = Math.abs(bBoxCube.y[0]-bBoxCube.y[1]);
			var depthCube  = Math.abs(bBoxCube.z[0]-bBoxCube.z[1]);
			
			var hXTemp = smXTemp + widthCube;
			var hYTemp = smYTemp + heightCube;
			var hZTemp = smZTemp + depthCube;
	  		
	  		if(smX > smXTemp ){ smX = smXTemp;}
	  		if(smY > smYTemp ){ smY = smYTemp;}
	  		if(smZ > smZTemp ){ smZ = smZTemp;}
	  		if(hX < hXTemp ){ hX = hXTemp;}
	  		if(hY < hYTemp ){ hY = hYTemp;}
	  		if(hZ < hZTemp ){ hZ = hZTemp;}
		    
	    }
		

		var width  = Math.abs(smX - hX);
		var height = Math.abs(smY - hY);
		var depth  = Math.abs(smZ - hZ);
	    //var cube   = CUBE.Factory.createCubePlain(width, height, depth,  0x00ff00, false, 0.2)
	    //     
	    //cube.position.x = 3581;
	    //cube.position.y = 400;
	    //cube.position.z = -3000;		
		//cube.rotation.x = ((2 * Math.PI) / 360) * 90;

		//var cube2   = CUBE.Factory.createCubePlain(width, height, depth,  0x00ff00, false, 0.2)
//
		//cube2.position.x = 3581;
		//cube2.position.y = -2900;
		//cube2.position.z = 0;		
		//cube2.rotation.x = 1.57;
		
		
		
		//cubeManager.sceneUtil.add(cube);
		//cubeManager.sceneUtil.add(cube2);
		return {"width" : width,"height" : height, "depth": depth};
	},
	
	complexComputation: function(arrayWithMeshes) {
	      var smX = hX = arrayWithMeshes[0].position.x;
		  var smZ = hZ = arrayWithMeshes[0].position.z;
		  var smY = hY = arrayWithMeshes[0].position.y;
	      for(var i = 0; i < arrayWithMeshes.length; i++ ){     
    	       if(arrayWithMeshes[i].moveOnTreeUpdate){
        	        var smXTemp = arrayWithMeshes[i].position.x;
                    var smYTemp = arrayWithMeshes[i].position.y;
                    var smZTemp = arrayWithMeshes[i].position.z;
                    arrayWithMeshes[i].geometry.computeBoundingBox();
                    var bBoxCube   = arrayWithMeshes[i].geometry.boundingBox;
                    var widthCube  = Math.abs(bBoxCube.x[0]-bBoxCube.x[1]);
                    var heightCube = Math.abs(bBoxCube.y[0]-bBoxCube.y[1]);
                    var depthCube  = Math.abs(bBoxCube.z[0]-bBoxCube.z[1]);
              }else{
                    var smXTemp = arrayWithMeshes[i].startPosition.x;
                    var smYTemp = arrayWithMeshes[i].startPosition.y;
                    var smZTemp = arrayWithMeshes[i].startPosition.z;
           
              }
                    arrayWithMeshes[i].geometry.computeBoundingBox();
                    var bBoxCube   = arrayWithMeshes[i].geometry.boundingBox;
                    var widthCube  = Math.abs(bBoxCube.x[0]-bBoxCube.x[1]);
                    var heightCube = Math.abs(bBoxCube.y[0]-bBoxCube.y[1]);
                    var depthCube  = Math.abs(bBoxCube.z[0]-bBoxCube.z[1]);    
                    var hXTemp = smXTemp + widthCube;
                    var hYTemp = smYTemp + heightCube;
                    var hZTemp = smZTemp + depthCube;
                    
                    if(smX > smXTemp ){ smX = smXTemp;}
                    if(smY > smYTemp ){ smY = smYTemp;}
                    if(smZ > smZTemp ){ smZ = smZTemp;}
                    if(hX < hXTemp ){ hX = hXTemp;}
                    if(hY < hYTemp ){ hY = hYTemp;}
                    if(hZ < hZTemp ){ hZ = hZTemp;}	
	     }
	     
	    var width  = Math.abs(smX - hX);
		  var height = Math.abs(smY - hY);
		  var depth  = Math.abs(smZ - hZ);
		
		//Stehen lassen: Debug Stuff
        // var cube   = CUBE.Factory.createCubePlain(width, height, depth,  0x00ff00, false, 0.2)
        //             cube.position.x = smX;
        //             cube.position.y = smY;
        //             cube.position.z = smZ;
        // 
        // cubeManager.sceneUtil.add(cube);
        
		return {"width" : width, "height" : height, "depth": depth};
	     
	},
	
	
    getBoundingBoxFromNode : function(rootNode){
        var toCalculate = [];
        for(var i = 0; i < rootNode.length; i++ ){  
            toCalculate.push(rootNode[i].children[0]);
            toCalculate.push(rootNode[i].children[1]);
            if(rootNode[i].childrenNodes.length > 0){
                 for(var j = 0; j < rootNode[i].childrenNodes.length; j++ ){
                    toCalculate.push(rootNode[i].childrenNodes[j].children[0]);  
                 }
                //this.getBoundingBoxFromNode(rootNode[0].childrenNodes[0]);
            }
        }
        var result = [];
        for(var i = 0; i < toCalculate.length; i++ ){
                result.push(toCalculate[i]);
        }

        return this.complexComputation(result);
    }
	
	
}


CUBE.QueryBuilder = function(cubeManager, OLAPObject) {
	this.cubeManager = cubeManager;
	this.OLAPCube = OLAPObject;
	this.queryBoxes = [];
	
	//Werden später initialisiert
	this.dropCubeCol;
	this.dropCubeRow;
	this.dropCubePage;
	this.queryRunButton;
	
};

CUBE.QueryBuilder.prototype = {
	createComponentAndShow : function() {
		console.log();
		var x = this.cubeManager.screenUtil.xLeft() + 2000;
		var y = this.cubeManager.screenUtil.yTop()-150 ;
		var z = 0;
		
		var labelNames = ["Column","Row","Page"];
		var queryElems = ["dropCubeCol","dropCubeRow","dropCubePage"];
		
		// Zeichnet alle Labels und Input-Felder des Query-Builders auf die Canvas
		for ( var i = 0; i < queryElems.length; i ++ ) {
			// Drop Input-Element Columns
			var nameVar = queryElems[i];
			this[nameVar] = CUBE.Factory.createCubePlain(2000, 150, 2,  gelb, false, 0.2);
			this[nameVar].position.set(x+600, y, z);
			this[nameVar].maxSize = 3;
			this[nameVar].droppedElements = [];
			this[nameVar].matrixAutoUpdate = false;
            this[nameVar].updateMatrix();
			
			THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB(this[nameVar]));
			this.cubeManager.sceneUtil.add(this[nameVar]);
			
			var labelInputBox = CUBE.Factory.createText(labelNames[i], 100,1, gelb);
			labelInputBox.position.set( x-890,y-50,z);
			labelInputBox.matrixAutoUpdate = false;
            labelInputBox.updateMatrix();
			this.cubeManager.sceneUtil.add(labelInputBox);
			
			y -= 200;
		}
		//Füge die einzelnen Input-Felder einem Array zu, für die spätere Benutzung
		this.queryBoxes = [this.dropCubeCol,this.dropCubeRow, this.dropCubePage];
        this.showButtons(x, y, z);
		
		
		//var map = {};
		//
		//map.cube = "Calls";
		//map.colLevels = [];
		//map.rowLevels = [];
		//map.pageLevels = [];
		//map.colLevels.push( {name: "Name", hierarchy: "ServiceProvider", dimension: "ServiceProvider"});
		//map.rowLevels.push( {name: "Name", hierarchy: "CallInputChannel", dimension: "CallInputChannel"});
		//map.pageLevels.push({name: "Name", hierarchy: "OrderType", dimension:     "OrderType"});
		//
		//var message = "Das ist ein Dummy Nachicht!";
		//var colNames  = [];
		//var rowNames  = [];
		//var pageNames = [];
		//var values    = [];    		
		//var jso;	
		//
		//
		//$.ajax({url: "/getResults", async: false, dataType: 'json', data : map,
		//  success: function (json) {
		//	  jso = json; 
		//   }
		//});
	   //map = null;            
	   //message   = jso["message"];
	   //pageNames = jso["pageNames"];
	   //values    = jso["values"];    
	   //rowNames  = jso["rowNames"];
	   //colNames  = jso["columnNames"];
	   //this.CUBEGeometry = CUBE.Cubic.dataToTable(colNames, rowNames, pageNames, values, cubeManager);
//
	   // console.log(this.CUBEGeometry);
	   
	   //cubeManager.sceneUtil.add(this.CUBEGeometry);
		
		
	},
	delegatorCall: function (m, callButtonFunction){
		return function() {
			callButtonFunction(m);
		};
  },
	showButtons: function(x, y, z) {

		var button = CUBE.Factory.createButton(500, 200, 50, senf, "run query", this.delegatorCall(this, CUBE.QueryBuilder.callbackButton ), false);
		button.position.set(x-500,this.cubeManager.screenUtil.yTop()-800,z);
		button.matrixAutoUpdate = false;
        button.updateMatrix();
		this.cubeManager.sceneUtil.add(button);
		this.queryRunButton = button;
			
		var button = CUBE.Factory.createButton(500, 200, 50, senf, "reset", this.delegatorCall(this, CUBE.QueryBuilder.callbackResetButton), false);
		button.position.set(x+100,this.cubeManager.screenUtil.yTop()-800,z);
		button.matrixAutoUpdate = false;
        button.updateMatrix();
        this.cubeManager.sceneUtil.add(button);
		
        var button = CUBE.Factory.createButton(500, 200, 50, senf, "rotate left", this.delegatorCall(this, CUBE.QueryBuilder.rotateCubeY), false);
		button.position.set(x+700,this.cubeManager.screenUtil.yTop()-800,z);
		button.matrixAutoUpdate = false;
        button.updateMatrix();		
		this.cubeManager.sceneUtil.add(button);
		
        var button = CUBE.Factory.createButton(500, 200, 50, senf, "rotate down", this.delegatorCall(this, CUBE.QueryBuilder.rotateCubeX), false);
		button.position.set(x+1300,this.cubeManager.screenUtil.yTop()-800,z);
		button.matrixAutoUpdate = false;
        button.updateMatrix();
		this.cubeManager.sceneUtil.add(button);
		
		
		var button = CUBE.Factory.createButton(500, 200, 50, senf, "Drill through page", this.delegatorCall(this,CUBE.QueryBuilder.drillThrough), false);
		button.position.set(x+1900,this.cubeManager.screenUtil.yTop()-800,z);
		button.matrixAutoUpdate = false;
        button.updateMatrix();
		this.cubeManager.sceneUtil.add(button);
	},
	createComponentsOnReload : function(queryParams, olapCube){
		this.OLAPCube = olapCube;
		var x = y = z = 0;
		
		//Für jede übergebene Dimension lege ein Level an
		for ( var i = 0; i < queryParams.length; i ++ ) {
			var parSplit  = queryParams[i].split(":");
			var dimensionName = parSplit[0];
			var levelName     = parSplit[1];
			var dimension, level, index;
			//Iteriere über alle Dimensionen um die zu finden die übergeben wurde bzw. deren Index
			
			var dimension = this.OLAPCube.getDimensionFromString(dimensionName);
			var level = this.OLAPCube.getLevelFromString(dimensionName, levelName);
			
            
			var levelCube = CUBE.Factory.createCubeWithCanvasText(500, 100, 2, 0xffffff, level);
			levelCube.position.set(x, y, z);
			levelCube.draggable = true;
			levelCube.clickable = true;
			levelCube.dimension = dimension;
			levelCube.hierarchy = dimension.hierarchies[0];
			levelCube.level     = level;
			levelCube.position.set(this.queryBoxes[i].position.x,this.queryBoxes[i].position.y,this.queryBoxes[i].position.z);
			this.queryBoxes[i].droppedElements.push(levelCube);
			this.cubeManager.sceneUtil.add(levelCube);
			this.queryRunButton.onclick.call();
		}
	}
}	

CUBE.QueryBuilder.callbackButton = function(caller) 
{
    var fullFlag = true;
	
    for ( var i = 0; i < caller.queryBoxes.length; i ++ ) 
    {
        
		if(!caller.queryBoxes[i].droppedElements.length > caller.queryBoxes[i].maxSize)
        {
            
			fullFlag = false;
			break;
			
        }
		
    }
    if(fullFlag) {
	
	    var map ={};
		map.cube = caller.OLAPCube.OLAPCube;
	    map.colLevels = [];
	    map.rowLevels = [];
	    map.pageLevels = [];
		
	    for ( var i = 0; i < caller.dropCubeCol.droppedElements.length; i ++ ) {
		
	        var elem =  caller.dropCubeCol.droppedElements[i];
	        map.colLevels.push({name: elem.name, hierarchy: elem.hierarchy, dimension: elem.dimension});
			
	    }
	    for ( var i = 0; i < caller.dropCubeRow.droppedElements.length; i ++ ) {
		
	        var elem =  caller.dropCubeRow.droppedElements[i];
	        map.rowLevels.push({name: elem.name, hierarchy: elem.hierarchy, dimension: elem.dimension});
			
	    }
	    for ( var i = 0; i < caller.dropCubePage.droppedElements.length; i ++ ) {
		
	        var elem =  caller.dropCubePage.droppedElements[i];
	        map.pageLevels.push({name: elem.name, hierarchy: elem.hierarchy, dimension: elem.dimension});
			
	    }
	    
		var message = "Das ist ein Dummy Nachicht!";
		var colNames  = [];
	    var rowNames  = [];
	    var pageNames = [];
	    var values    = [];    		
	    var jso;	
		$.ajax({url: "/getResults", async: false, dataType: 'json', data : map,
		  success: function (json) {
              jso = json; 
           }
		});
       map = null;            
       message   = jso["message"];
       pageNames = jso["pageNames"];
       values    = jso["values"];    
       rowNames  = jso["rowNames"];
       colNames  = jso["columnNames"];
       caller.CUBEGeometry = CUBE.Cubic.dataToTable(colNames, rowNames, pageNames, values, caller.cubeManager);
       cubeManager.sceneUtil.add(caller.CUBEGeometry);
	     //caller.CUBEGeometry.cubic.width = cubeManager.sceneUtil.getBoundingBox(caller.CUBEGeometry).width;
	     //caller.CUBEGeometry.cubic.depth = cubeManager.sceneUtil.getBoundingBox(caller.CUBEGeometry).depth;
		
		
	}		
	
};

CUBE.QueryBuilder.callbackResetButton = function(caller) {
	for ( var i = 0; i < caller.queryBoxes.length; i ++ ) {
    	for ( var j = 0; j < caller.queryBoxes[i].droppedElements.length; j ++ ) {
    	    resetedLabel = caller.queryBoxes[i].droppedElements[j];
			
    	    if( resetedLabel.parentNode.expanded ) {
    	        
    	        var x = resetedLabel.startPosition.x;
    	        var y = resetedLabel.startPosition.y;
    	        var z = resetedLabel.startPosition.z;
    	        resetedLabel.moveOnTreeUpdate = true;
    	        cubeManager.tweenUtil.slideIn({item: resetedLabel,x: x, y: y, z: z}) 
    	        resetedLabel.dragged = false;
				resetedLabel.queryBox = null;
				resetedLabel.onTarget = false;
				console.log(resetedLabel);
				
    	    } else {
			
    	        cubeManager.sceneUtil.remove(resetedLabel);   
				 
    	    }
    		
    	}
    	caller.queryBoxes[i].droppedElements = [];	
    }
	for ( var j = 0; j < caller.CUBEGeometry.labels.length; j ++ ) {
		cubeManager.sceneUtil.remove(caller.CUBEGeometry.labels[j]);
	}
    if(caller.CUBEGeometry) cubeManager.sceneUtil.remove(caller.CUBEGeometry);
    caller.CUBEGeometry = null;
    
    //history.pushState(null, null, "/cubemanager/BuildCube/"+caller.OLAPCube.OLAPCube);	
};	


CUBE.QueryBuilder.rotateCubeX = function(caller){
    caller.CUBEGeometry.cubic.rotateDown();
};

CUBE.QueryBuilder.drillThrough = function(caller){
    caller.CUBEGeometry.cubic.drillThrough();
};

CUBE.QueryBuilder.rotateCubeY = function(caller){
	caller.CUBEGeometry.cubic.rotateLeft();
};
		
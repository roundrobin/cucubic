CUBE.Cubic = function(cubeManager, container) {
	this.cubeManager = cubeManager;
	this.container3d = container;
	
	this.pages = [];
	this.row   = [];
	this.col   = [];
	this.currentPage = 0;
	this.cubeWidth  = 200;
	this.cubeHeight = 200;
	this.cubeDepth  = 200;
    this.spaceX     = 10;
    this.startX     = cubeManager.screenUtil.xLeft()+3000;
    this.labels = [];
	
	// --------------------- NEW ------------------
	this.currentOrder = [];
	
	this.currentXAxis;
	this.currentYAxis;
	this.currentZAxis;
	this.besidePage;
	this.width;
	 	
};

CUBE.Cubic.prototype = {
	elementsOfPage : function(index) {
		return this.container3d.elementsofPage[index];
	},
	
	elementsOfRow : function(index) {
		return this.container3d.elementsofRow[index];
	},
	
	elementsOfCol : function(index) {
		return this.container3d.elementsofCol[index];
	},
	
	nextPage: function() {
		this.besidePage = this.currentPage;
		this.currentPage = 1+this.currentPage;
		var length = this.container3d.elementsofPage.length;
		if (this.currentPage >= length){
			this.currentPage = 0;
		}		
		return this.currentPage;
		
	},
	
	depth: function() {	
		
	},
	
	height: function() {
		
	},
	rotateLeft: function() {
    	window.TOOGLEFLAG *= -1;
		var dimensionBox = cubeManager.sceneUtil.getBoundingBox(this.container3d);
		if(window.TOOGLEFLAG == -1){
			var rotation = ((2 * Math.PI) / 360) * 90;
		}else{
			var rotation = 0;
		}
		
		var length = this.container3d.labels.length;
			for ( var i = 0; i < length; i ++ ) {
				this.container3d.removeChild(this.container3d.labels[i]);
				cubeManager.sceneUtil.remove(this.container3d.labels[i]);
			}
		this.container3d.labels = [];
		
		
		
		var gg = new TWEEN.Tween( this.container3d.rotation ).to( {
            y: rotation
            }, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).onUpdate(function (){
          });          
         gg.start();
		 
		 if(window.TOOGLEFLAG == -1){
			var yAprroc = 0;
			new TWEEN.Tween( this.container3d.position ).to( {
			z: 2790,
			x: 3700
			}, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).start();	
		}else{
			new TWEEN.Tween( this.container3d.position ).to( {
			z: 0,
			x: 200
			}, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).start();	
		}
		 
		 
	},
	
	rotateDown: function() {
		window.TOOGLEFLAG *= -1;
		
		if(window.TOOGLEFLAG == -1){
			var rotation = ((2 * Math.PI) / 360) * 90;
		}else{
			var rotation = 0;
		}
		
		var length = this.container3d.labels.length;
			for ( var i = 0; i < length; i ++ ) {
				this.container3d.removeChild(this.container3d.labels[i]);
				cubeManager.sceneUtil.remove(this.container3d.labels[i]);
			}
		this.container3d.labels = [];
		if(window.TOOGLEFLAG == -1){
	
			/// ------------------------------Create Labels Column -----------------------
			var xCopy = 2600;
			var yCopy = -2220;
			var zCopy = 400;
	
			this.container3d.temp = [];
	
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("X-Axis", this.container3d.colHeading, xCopy, yCopy, zCopy);
			for ( var col = 0; col < containerText.length; col ++ ) {
				this.container3d.labels.push(containerText[col]);
				this.container3d.temp.push(containerText[col]);
				cubeManager.sceneUtil.add(containerText[col]);
	
			}
			var xCopy = 2400;
			var yCopy = -2300;
			var zCopy = 400;
			/// ------------------------------Create Labels Row -----------------------
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("Y-Axis", this.container3d.pageHeading, xCopy, yCopy, zCopy);
			for ( var col = 0; col < containerText.length; col ++ ) {
				this.container3d.labels.push(containerText[col]);
				this.container3d.temp.push(containerText[col]);
				cubeManager.sceneUtil.add(containerText[col]);
			}
	
		}else{
			var xCopy = 2600;
			var yCopy = -2400;
			var zCopy = 100;
	
			this.container3d.temp = [];
			/// ------------------------------Create Labels Column -----------------------
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("X-Axis", this.container3d.colHeading, xCopy, yCopy, zCopy);
			for ( var col = 0; col < containerText.length; col ++ ) {
				this.container3d.labels.push(containerText[col]);
				this.container3d.temp.push(containerText[col]);
				cubeManager.sceneUtil.add(containerText[col]);
	
			}
			var xCopy = 2400;
			var yCopy = -2600;
			var zCopy = 100;
			/// ------------------------------Create Labels Row -----------------------
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("Y-Axis", this.container3d.rowHeading, xCopy, yCopy, zCopy);
			for ( var col = 0; col < containerText.length; col ++ ) {
				this.container3d.labels.push(containerText[col]);
				this.container3d.temp.push(containerText[col]);
				cubeManager.sceneUtil.add(containerText[col]);
			}
	
	
		}
		
		var dimensionBox  = cubeManager.sceneUtil.getBoundingBox(this.container3d);
		
	    function delegatorCall(callButtonFunction,m){
		    return function() {
		        callButtonFunction(m);
		    };
    	}
		this.container3d.dimensionBox = dimensionBox;
		var changePositionOnUpdate = function(obj) {};
		
		var printFinish = function(obj) {
		};
		console.log();
		
		new TWEEN.Tween( this.container3d.rotation ).to( {
		x: rotation,
		}, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).onUpdate(delegatorCall(changePositionOnUpdate,this.container3d)).onComplete(delegatorCall(printFinish,this.container3d)).start();

		if(window.TOOGLEFLAG == -1){
			var yAprroc = 0;
			new TWEEN.Tween( this.container3d.position ).to( {
			z: 2990,
			y: -3100
			}, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).start();	
		}else{
			console.log("xx");
			new TWEEN.Tween( this.container3d.position ).to( {
			z: 0,
			y: 0
			}, 3000 ).easing( TWEEN.Easing.Linear.EaseNone).start();	
		}
	

			
	},
	
	drillThrough : function(caller){
	    var currentPage = this.elementsOfPage(this.currentPage);
	    var dimensions = cubeManager.sceneUtil.complexComputation(currentPage);
	    var width = dimensions.width+400;
		var depth = dimensions.depth-200;  
		var tween2 = new TWEEN.Tween(currentPage[0].position ).to( {
			x: currentPage[0].position.x + 500
			}, 1000 ).easing( TWEEN.Easing.Linear.EaseNone).start();

	    var length = currentPage.length;
		for ( var i = 0; i < length; i ++ ) {
			var tween2 = new TWEEN.Tween(currentPage[i].position ).to( {
			z: currentPage[i].position.z - 500
			}, 1000 ).easing( TWEEN.Easing.Linear.EaseNone);

			var tween1 = new TWEEN.Tween(currentPage[i].position ).to( {
			x: currentPage[i].position.x +width

			}, 1000 ).easing( TWEEN.Easing.Linear.EaseNone);
			tween1.chain(tween2);
			tween1.start();
		}
	        
		for ( var i = 0; i < this.container3d.elementsofPage.length; i ++ ) {
				if(this.container3d.elementsofPage[i] != currentPage){
					 for ( var j = 0; j < this.container3d.elementsofPage[i].length; j ++ ) {
						var tween1 = new TWEEN.Tween(this.container3d.elementsofPage[i][j].position ).to( {
						z: this.container3d.elementsofPage[i][j].position.z + 210
						}, 1000 ).easing( TWEEN.Easing.Linear.EaseNone);
						tween1.start();
					 }	

				}
		}

	    if(this.besidePage >= 0 && this.besidePage != null){
	        	var pageBeside = this.elementsOfPage(this.besidePage);

				for ( var i = 0; i < pageBeside.length; i ++ ) {
					var tween3 = new TWEEN.Tween(pageBeside[i].position ).to( {
		            x: pageBeside[i].position.x - width,
		            z: pageBeside[i].position.z - 2000,
		            }, 1000 ).easing( TWEEN.Easing.Linear.EaseNone);
		            tween3.start();
				}				  	            
			}else{
			}
				
			this.nextPage();
	            
		}
	
	
		
}

CUBE.Cubic.CreateLabelsOnAxis = function(type, textNames, startX, startY, startZ){
	var container = [];
	container.labels = [];
	var longestText = 0;
	
	if(type == "Z-Axis"){
		var color = rot;
	 }else{
	 	var color = 0x007A6F;
	 }
	
	for ( var col = 0; col < textNames.length; col ++ ) {
		
		 var string = " - "+textNames[col];
		 var headline = CUBE.Factory.createText(string, 100, 2, color);
		 headline.position.x = startX;
		 headline.position.y = startY;
		 headline.position.z = startZ;

		 if(longestText <= headline.boundRadius){
			longestText = headline.boundRadius;
		 }

		 if(type == "X-Axis"){
			headline.rotation.z = 1.0;
			startX += 200;
		 }

		 if(type == "Y-Axis"){
			headline.position.x -= headline.boundRadius;
			startY -= 200;
		 }

		if(type == "Z-Axis"){
			headline.position.x -= headline.boundRadius;
			startZ -= 200;
		 }

		 container.push(headline);
		 container.labels.push(headline);
	}

	return container;
}


CUBE.Cubic.dataToTable = function(columnHeading, rowHeading, pageHeading, values, cubeManager){
    var container = new THREE.Object3D();
    container.elementsofPage = []; 
    container.elementsofRow  = []; 
    container.elementsofCol  = [];

	var onScreenHeadlines = {};
	if(columnHeading){
		container.colHeading  = columnHeading;
	}	
	if(rowHeading){
		container.rowHeading  = rowHeading;
	}	
	if(pageHeading){
		container.pageHeading = pageHeading;
	}	
	
	CUBE.Cubic.createVisualCubic(container,values);
		
    //TODO: Achsenkombination im CubicObject
	container.cubic = new CUBE.Cubic(cubeManager,container);
	container.rotatable = true;
	container.clickable = true;
  return container;
}

CUBE.Cubic.createVisualCubic = function(container, values){
	container.labels = [];
	if( container.colHeading && !container.rowHeading){ //Falls nur die Columns ausgewählt sind
		CUBE.Cubic.CaseX(container, values);
	}
	
	if( container.colHeading && container.rowHeading && !container.pageHeading){ //Falls nur die Columns ausgewählt sind
		CUBE.Cubic.CaseXY(container, values);
	}
	
	if( container.colHeading && container.rowHeading && container.pageHeading){ //Falls nur die Columns ausgewählt sind
		CUBE.Cubic.CaseXYZ(container, values);
	}

}

CUBE.Cubic.CaseX = function(container, values){
		// Hier mit wird bestimmt, wo der Cube positioniert wird
	var width = height = depth = 200;
	var shiftX = 3000; 
	var shiftY = 3000;

	var spaceX = width+10;
	var spaceY = height+10;
	var spaceZ = depth+10;

	var x = startX = cubeManager.screenUtil.xLeft()+shiftX;
	var y = startY = cubeManager.screenUtil.yTop()-shiftY;
	var z = startZ = 0;
	
	var xCopy = x;
	var zCopy = z;
	var yCopy = y;

	for ( var col = 0; col < container.colHeading.length; col ++ ) {
		 var string = " - "+container.colHeading[col];
		 var headline = CUBE.Factory.createText(string, 100, 2, 0x007A6F);
		 headline.position.x = xCopy;
		 headline.position.y = yCopy+200;
		 headline.rotation.z = 1.0;

		container.addChild(headline);
		xCopy += 200;
	}


	for ( var col = 0; col < values.length; col ++ ) {
		 var cube = CUBE.Factory.createCubicElem(container, 0xffffff, x, y, z, values[col], 0, col, 0, width, height, depth);
		 container.addChild(cube);

		 x += 200;
	}
}




CUBE.Cubic.CaseXY = function(container, values){
	// Hier mit wird bestimmt, wo der Cube positioniert wird
	var width = height = depth = 200;
	//width = 400;
	var shiftX = 3000; 
	var shiftY = 3000;

	var spaceX = width+10;
	var spaceY = height+10;
	var spaceZ = depth+10;

	var x = startX = cubeManager.screenUtil.xLeft()+shiftX;
	var y = startY = cubeManager.screenUtil.yTop()-shiftY;
	var z = startZ = 0;

	var xCopy = x;
	var zCopy = z;
	var yCopy = y+100;
	
	// ----------------------- Col Heading -----------------------------
	var containerText = CUBE.Cubic.CreateLabelsOnAxis("X-Axis", container.colHeading, xCopy, yCopy, zCopy);
	for ( var col = 0; col < containerText.length; col ++ ) {
		container.addChild(containerText[col]);
	}
	
	// ----------------------- Row Heading -----------------------------
	var xCopy = x-200;
	var zCopy = z;
	var yCopy = y-50;
	
	var containerText = CUBE.Cubic.CreateLabelsOnAxis("Y-Axis", container.rowHeading, xCopy, yCopy, zCopy);
	for ( var row = 0; row < containerText.length; row ++ ) {
		container.addChild(containerText[row]);
	}
	
	// ------------------------------------------- VALUE Creation ---------------------------
	var xCopy = x;
	var zCopy = z;
	var yCopy = y;
	
	
	for ( var row = 0; row < values.length; row ++ ) {
		for ( var col = 0; col < values[row].length; col ++ ) {
			 var cube = CUBE.Factory.createCubicElem(container, 0xffffff, x, y, z, values[row][col], 0, col, 0, width, height, depth);
			 cube.position.x = xCopy;
			 cube.position.y = yCopy;
			 
		 	 container.addChild(cube);
			 xCopy += 200;
		}
		xCopy = x;
		yCopy -= 200;
	}
}

CUBE.Cubic.CaseXYZ = function(container, values){
	// Hier mit wird bestimmt, wo der Cube positioniert wird
	var width = height = depth = 200;
	//width = 400;
	var shiftX = 5000; 
	var shiftY = 4000;

	var spaceX = width+10;
	var spaceY = height+10;
	var spaceZ = depth+10;

	var x = startX = cubeManager.screenUtil.xLeft()+shiftX;
	var y = startY = cubeManager.screenUtil.yTop()-shiftY;
	var z = startZ = 0;

	var xCopy = x;
	var zCopy = z;
	var yCopy = y;
    // ----------------------------------- COL LABELS -----------------------------
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("X-Axis", container.colHeading, xCopy, yCopy+150, zCopy);
			for ( var col = 0; col < containerText.length; col ++ ) {
				container.addChild(containerText[col]);
				container.labels = container.labels.concat(containerText.labels);
			}

	// ----------------------------------- ROW LABELS -----------------------------
	
			var xCopy = x-200;
			var zCopy = z;
			var yCopy = y-50;
	
			var containerText = CUBE.Cubic.CreateLabelsOnAxis("Y-Axis", container.rowHeading, xCopy, yCopy, zCopy);
			for ( var row = 0; row < containerText.length; row ++ ) {
				container.addChild(containerText[row]);
				container.labels = container.labels.concat(containerText.labels);
			}
	// ----------------------------------- PAGE LABELS -----------------------------
			var xCopy = x-200;
			var zCopy = z;
			var yCopy = y+200;

			var containerText = CUBE.Cubic.CreateLabelsOnAxis("Z-Axis", container.pageHeading, xCopy, yCopy, zCopy);
			for ( var page = 0; page < containerText.length; page ++ ) {
				if(page == 0){
				
					container.addChild(containerText[page]);
					container.labels = container.labels.concat(containerText.labels);
				}
			}
	
	// ----------------------------------- VALUE Creation -----------------------------------
	var xCopy = x;
	var zCopy = z;
	var yCopy = y;
	
	function delegatorCall(callButtonFunction,m, c){
		return function() {
			callButtonFunction(m,c);
		};
	}
	var hideRow = function(row,c) { 
		var all = c.children;
		for ( var x = 0; x < all.length; x ++ ) {
			if(all[x].row && all[x].row == row ){
				all[x].visible = false;
				console.log(all[x]);
			}
		}
		
	};
	var hideCol = function(col,c) {
		var all = c.children;
		for ( var x = 0; x < all.length; x ++ ) {
			console.log(all[x]);
			if(all[x].col && all[x].col == col ){
				all[x].visible = false;
				console.log(all[x]);
			}
		}
	};

	for ( var page = 0; page < values.length; page ++ ) {
		
		for ( var row = 0; row < values[page].length; row ++ ) {
			
			for ( var col = 0; col < values[page][row].length; col ++ ) {
			
				 var cube = CUBE.Factory.createCubicElem(container, 0xffffff, x, y, z, values[page][row][col], row, col, page, width, height, depth);
				 cube.position.x = xCopy;
				 cube.position.y = yCopy;
				 cube.position.z = zCopy;
				

				container.addChild(cube);
				xCopy += 200;
				
			}
			xCopy = x;
			yCopy -= 200;
		}
		yCopy = y;
		zCopy -= 200;
	}
	var xCopy = x;
	var zCopy = z;
	var yCopy = y;
	for ( var page = 0; page < values.length; page ++ ) {

		for ( var row = 0; row < values[page].length; row ++ ) {

			for ( var col = 0; col < values[page][row].length; col ++ ) {
				if(col == (values[page][row].length-1)){

					var expanderButton        = new CUBE.Navigator.createButtonNode( {x: xCopy, y: yCopy, z: zCopy});
					expanderButton.position.x = xCopy+200;
					expanderButton.position.y = yCopy;
					expanderButton.position.z = zCopy;
					if(page > 0){
						expanderButton.visible = false;
					}
					expanderButton.onclick = delegatorCall(hideRow,row,container);
					expanderButton.clickable = true;
					cubeManager.sceneUtil.clickableObjects.push(expanderButton);
					container.addChild(expanderButton);
				}

				if(row == (values[page].length-1)){
					var expanderButton        = new CUBE.Navigator.createButtonNode( {x: xCopy, y: yCopy, z: zCopy});
					expanderButton.position.x = xCopy;
					expanderButton.position.y = yCopy-200;
					expanderButton.position.z = zCopy;
					if(page > 0){
						expanderButton.visible = false;
					}
					expanderButton.onclick = delegatorCall(hideCol,col,container);
					expanderButton.clickable = true;
					cubeManager.sceneUtil.clickableObjects.push(expanderButton);
					//console.log(expanderButton.onclick);
					container.addChild(expanderButton);
				}

				if(page == 0){
					var expanderButton        = new CUBE.Navigator.createButtonNode( {x: xCopy, y: yCopy, z: zCopy});
					expanderButton.position.x = xCopy;
					expanderButton.position.y = yCopy;
					expanderButton.position.z = zCopy+200;

					expanderButton.visible = false;
					container.addChild(expanderButton);
				}
				xCopy += 200;
			}
			xCopy = x;
			yCopy -= 200;
		}
		yCopy = y;
		zCopy -= 200;
	}
}
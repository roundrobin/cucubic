CUBE.CameraMovement = function(camera) {
	this.camera = camera;
};

CUBE.CameraMovement.moveToCenter = function(containerCube,containerText,cubeManager){
	this.camera = cubeManager.camera;
//Variablen mit einem random Point irgendeines Objectes aus der dem Cube-Array initialisieren
	var smX = hX = containerCube[0].position.x;
	var smZ = hZ = containerCube[0].position.z;
	var smY = hY = containerCube[0].position.y;
	
  	for ( var i = 0; i < containerCube.length; i ++ ) {
		var smXTemp = containerCube[i].position.x;
		var smYTemp = containerCube[i].position.y;
		containerCube[i].geometry.computeBoundingBox();
		
		var bBoxCube = containerCube[i].geometry.boundingBox;
		var widthCube = Math.abs(bBoxCube.x[0]-bBoxCube.x[1]);
		var heightCube = Math.abs(bBoxCube.y[0]-bBoxCube.y[1]);
		
		var hXTemp = smXTemp + widthCube;
		var hYTemp = smYTemp + heightCube;
  		
  		if(smX > smXTemp ){ smX = smXTemp;}
  		if(smY > smYTemp ){ smY = smYTemp;}
  		if(hX < hXTemp ){ hX = hXTemp;}
  		if(hY < hYTemp ){ hY = hYTemp;}
  		if(containerText){
	  		var smXTemp = containerText[i].position.x;
			var smYTemp = containerText[i].position.y;
			var smZTemp = containerText[i].position.z;
			
			containerText[i].geometry.computeBoundingBox();
			var bBoxText = containerText[i].geometry.boundingBox;
			var widthText = Math.abs(bBoxText.x[0]-bBoxText.x[1]);
			var heightText = Math.abs(bBoxText.y[0]-bBoxText.y[1]);
			
			var hXTemp = smXTemp + widthText;
			var hYTemp = smYTemp + heightText;
	  		if(smX > smXTemp ){ smX = smXTemp;}
	  		if(smY > smYTemp ){ smY = smYTemp;}
	  		if(hX < hXTemp ){ hX = hXTemp;}
	  		if(hY < hYTemp ){ hY = hYTemp;}
	  	}
  	}

  	
	var width  = Math.abs(smX - hX);
	var height = Math.abs(smY - hY);
	
	var centerX = smX + (width/2);
	var centerY = smY + (height / 2);
	var centerZ = 4000;
	
	new TWEEN.Tween( this.camera.position ).to( {
	  x: centerX,
	  y: centerY,
	  z: centerZ }, 3000 ).easing( TWEEN.Easing.Elastic.EaseOut).start();
}

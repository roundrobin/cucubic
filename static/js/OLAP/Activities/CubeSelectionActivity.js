/*
* Diese Activity zeigt ein Grid mit allen zur Auswahl stehenden Datamarts eines Dataware-Houses.
* Ist ein Würfel freigegeben so kann man diesen anklicken.
*/

CUBE.CubeSelectionActivity = function(cubeManager) {
	this.cubeManager = cubeManager;
};


CUBE.CubeSelectionActivity.prototype = {
	init : function(cubeNames){
		this.cubeManager.sceneUtil.clear();
		
		  var selectionText = CUBE.Factory.createText("Select a cube ...", 300, 5, 0x7b7b7b);
		  selectionText.position.x -= 500;
		  selectionText.position.y = 500;
		  
		  
		  
		  cubeManager.sceneUtil.add(selectionText);
   		var elem = CUBE.Util.textArrayToScene(cubeNames, blau, 4,this.cubeManager);
   		CUBE.CameraMovement.moveToCenter(elem[1], elem[0], this.cubeManager);
        

	},
	onDocumentMouseMove: function ( intersects ) {
	},
	onDocumentMouseUp: function ( intersects ) {
	},
	onDocumentMouseDown : function(intersects){
	  var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		cubeManager.projector.unprojectVector( vector, this.cubeManager.camera);
		var ray = new THREE.Ray( this.cubeManager.camera.position, vector.subSelf( this.cubeManager.camera.position ).normalize() );
		var objects = this.cubeManager.sceneUtil.clickableObjects;
		var intersects = ray.intersectObjects( objects );

      if ( intersects.length > 0 ) {
           intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );
           
           new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
                x: this.cubeManager.screenUtil.xLeft()+200,
                y: this.cubeManager.screenUtil.yTop()-200,
                z: 0}, 3000 )
              .easing( TWEEN.Easing.Elastic.EaseOut).start();
              
           new TWEEN.Tween( intersects[ 0 ].object.textObject.position ).to( {
                x: this.cubeManager.screenUtil.xLeft()+350,
                y: this.cubeManager.screenUtil.yTop()-250,
                z: 0}, 3000 )
              .easing( TWEEN.Easing.Elastic.EaseOut).start();
           
          selected = [];
          allOtherElements = [];    
          for ( var i = 0; i < this.cubeManager.sceneUtil.scene.objects.length; i ++ ) {
          	if(!(this.cubeManager.sceneUtil.scene.objects[i] == intersects[ 0 ].object) && !(this.cubeManager.sceneUtil.scene.objects[i] == intersects[ 0 ].object.textObject)){
          		allOtherElements.push(this.cubeManager.sceneUtil.scene.objects[i]);
          	}else{
          		selected.push(this.cubeManager.sceneUtil.scene.objects[i]);
          	}
          
          }	
          
          for ( var i = 0; i < allOtherElements.length; i ++ ) {
          	  
            var callBack = function(caller) {
              this.cubeManager.sceneUtil.remove(caller);
            };
            
            new TWEEN.Tween( allOtherElements[i].position ).to( {
                x: this.cubeManager.screenUtil.xRight()-canvasWidth*3,
                z: 0}, 3000 )
              .easing( TWEEN.Easing.Elastic.EaseOut).onComplete(this.delegatorCall(callBack,allOtherElements[i])).start();
          
          }
          
          lastActivity = currentActivity;
          window.currentActivity = new CUBE.BuildCubeActivity(this.cubeManager,intersects[0].object, intersects[0].object.textObject.text ); 
          history.pushState(null, null, "BuildCube/"+intersects[0].object.textObject.text);      
          window.currentActivity.init();
          
      }

	},
	
	onDocumentMouseWheel : function ( event ) {
	      event.preventDefault();
	      fov -= event.wheelDeltaY * 0.05;
	      cubeManager.camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, canvasWidth / canvasHeight, 1, 10000 );
	},	
	delegatorCall : function(callbackFunction,args){
    return function() {
	    callbackFunction(args);
	  }
  }
	
}





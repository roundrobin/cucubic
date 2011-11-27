/*
* In dieser Activity werden alle Komponenten die für eine Cube-Abfrage benötigt werden
* angezeigt und der Datenwürfel selbst. Das sind u.a der Navigator, der Query-Builder und
* der 3D-Dimensionale Würfel mit seinen Interaktionsmöglichkeiten.
* Die Visuellen Komponenten werden in den Klassen die sich um Ordner "VisualComponents"
* befinden, näher beschrieben.
*
*/

CUBE.BuildCubeActivity = function(cubeManager, cubeMesh, cubeName ) {
	this.name = cubeName;
	this.cubeMesh = cubeMesh;
	this.cubeManager = cubeManager;
	
	// Werden noch initialisiert
	this.OLAPCube;
	this.queryBuilder;
	this.navigatorC;	

	
};


CUBE.BuildCubeActivity.prototype = {
	init : function(queryParams){
		if(!this.cubeMesh){ // Falls der View direkt aufgerufen wird, muss ein Cube erzeugt werden
		
			var cubeAndText = CUBE.Factory.createCubeWithLabel(200,200,200,this.name, blau);
			//Cube
			cubeAndText[0].clickable = false;
			cubeAndText[0].textObject = cubeAndText[0];
			cubeAndText[0].position.x = this.cubeManager.screenUtil.xLeft()+200;
			cubeAndText[0].position.y = this.cubeManager.screenUtil.yTop()-200;
			cubeAndText[0].matrixAutoUpdate = false;
      		cubeAndText[0].updateMatrix();		
			
      		//Text
			cubeAndText[1].clickable = false;
			cubeAndText[1].position.x = this.cubeManager.screenUtil.xLeft()+400;
			cubeAndText[1].position.y = this.cubeManager.screenUtil.yTop()-300;
			cubeAndText[1].matrixAutoUpdate = false;
      		cubeAndText[1].updateMatrix();			
			this.cubeManager.sceneUtil.add(cubeAndText[0]);
			this.cubeManager.sceneUtil.add(cubeAndText[1]);
		
		}else{
		
			this.cubeMesh.clickable = false;
			
		}
		
		this.OLAPCube = CUBE.Util.JsonToArray('http://localhost:4567/getDimensions/'+this.name,this.name);
		
		
		console.log(this.OLAPCube);
		console.log("-----------------------------------")
		this.showDimensionObjects();
		this.showQueryBuilder(this.OLAPCube);
		if(queryParams) this.queryBuilder.createComponentsOnReload(queryParams, this.OLAPCube);            	
		
		
	},
	showQueryBuilder : function(OLAPObject){
		this.queryBuilder = new CUBE.QueryBuilder(this.cubeManager,OLAPObject);
		this.queryBuilder.createComponentAndShow();

	},
	showDimensionObjects : function(){
		this.navigatorC = new CUBE.Navigator(this.cubeManager,this.OLAPCube.dimensions);
		this.navigatorC.createComponentAndShow();
		
	},
	
	onDocumentMouseMove: function ( event ) {
				mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;

				var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
				this.cubeManager.projector.unprojectVector( vector, this.cubeManager.camera );

				var ray = new THREE.Ray( this.cubeManager.camera.position, vector.subSelf( this.cubeManager.camera.position ).normalize() );
        		var intersects = ray.intersectObjects( this.cubeManager.sceneUtil.draggableObjects );
                
                this.onDocumentMouseMoveDraggable(intersects, ray);

		
		
	},
	onDocumentMouseDown : function ( event ) {
	
		var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
		this.cubeManager.projector.unprojectVector( vector, this.cubeManager.camera );

		var ray = new THREE.Ray( this.cubeManager.camera.position, vector.subSelf( this.cubeManager.camera.position ).normalize() );

		var intersectsDraggable = ray.intersectObjects( this.cubeManager.sceneUtil.draggableObjects );
    	var intersectsClickable = ray.intersectObjects( this.cubeManager.sceneUtil.clickableObjects );
        
		this.onDocumentMouseDownDraggable(intersectsDraggable,ray);
		this.onDocumentMouseDownClickable(intersectsClickable);

	},
	/*
    * Wenn die Maus losgelassen wird, überprüfen ob das SELECTED-Element über einer TargetBox
    * ist. Wenn ja, smooth in die Box eingleiten.
    */
	onDocumentMouseUp: function ( intersects, ray ) {
	    // Wenn ein Level ausgewält ist und gedraggt wird, dann smooth in die Box gleiten
	    if(SELECTED && SELECTED.dragged){
            
			if(SELECTED.queryBox.droppedElements.length < SELECTED.queryBox.maxSize){
			    console.log(SELECTED.queryBox.droppedElements.contains(SELECTED));
			    //Wenn das Object nicht nicht in der Box ist, dann einfügen
			    if(!SELECTED.queryBox.droppedElements.contains(SELECTED)){
			        SELECTED.moveOnTreeUpdate = false;
    			    SELECTED.dragged = true;
    			    SELECTED.onTarget = true;
    			    SELECTED.queryBox.droppedElements.push(SELECTED);
    
    				posX = SELECTED.queryBox.position.x-1300+((SELECTED.queryBox.droppedElements.length*550));
    				posY = SELECTED.queryBox.position.y;
    				posZ = SELECTED.queryBox.position.z-10;
    				
    				new TWEEN.Tween( SELECTED.position ).to( { x: posX+50, y: posY, z: posZ}, 1000 ).easing( TWEEN.Easing.Elastic.EaseOut).start();	
    			        
			        
			    }
			    
			}
			//history.pushState(null, null, window.location.href+"/"+intersects[0].object.dimension.name+":"+intersects[0].object.level.name);
			   
		}
	    //Solange nicht auf ein Dragbares Element geklickt wurde, gibt es keinen
	    // SELECT-Kandidaten
        if ( INTERSECTED ) {
            
            this.cubeManager.sceneUtil.plane.position.copy( INTERSECTED.position );
            if(SELECTED && SELECTED.onTarget == false){
                cubeManager.tweenUtil.slideIn({item: SELECTED,x: SELECTED.startPosition.x, y: SELECTED.startPosition.y,z: 0});        
               
            }
            
            
            if(SELECTED && SELECTED.onTarget == true && SELECTED.dragged == false ){
                SELECTED.onTarget = false;
                SELECTED.moveOnTreeUpdate = true;
                SELECTED.queryBox.droppedElements.remove(SELECTED);
                cubeManager.tweenUtil.slideIn({item: SELECTED,x: SELECTED.startPosition.x, y: SELECTED.startPosition.y,z: 0});        
            }
            console.log("Selected aufgehoben");
            SELECTED = null;
        }
        
        
        
        window.container.style.cursor = 'auto';
	},
	onDocumentMouseWheel : function ( event ) {
	      event.preventDefault();
	      fov -= event.wheelDeltaY * 0.05;
	      cubeManager.camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, canvasWidth / canvasHeight, 1, 10000 );
	},
    
	onDocumentMouseDownClickable : function(intersects) {
	    if ( intersects.length > 0 && intersects[0].object.clickable ) 
			intersects[ 0 ].object.onclick.call(this,intersects[0].object); 
      
	},
	
	onDocumentMouseDownDraggable : function(intersects,ray) {
	    //Wenn der Mauszeiger über einem Element ist, dass Draggable ist,
	    //dann dieses als SELECTED markieren. Der MouseMove Handler
	    //Nimmt es entgegen und manipuliert es entsprechend
	    if ( intersects.length > 0 ) {       
		     
		    SELECTED = intersects[ 0 ].object;
			var intersects = ray.intersectObject( this.cubeManager.sceneUtil.plane );
			offset.copy( intersects[ 0 ].point ).subSelf( this.cubeManager.sceneUtil.plane.position );
			window.container.style.cursor = 'pointer';

		}
		window.container.style.cursor = 'pointer';
	},
	
	onDocumentMouseMoveDraggable: function(intersects, ray) {
	    var speed = 100;
	    
	    //Wenn ein Draggable Object ausgewählt ist folgendes machen
    	if ( SELECTED ) {
    	    var rayTemp = new THREE.Ray( SELECTED.position, new THREE.Vector3(0,0,1) );
			var c = THREE.Collisions.rayCastNearest(rayTemp);
			if (!c || c.distance > speed) {
			    //console.log("Noch Kein Ziel");
				SELECTED.dragged = false;
				
			}else{ 
				if(c.mesh.droppedElements.length < c.mesh.maxSize){
					
				  SELECTED.dragged = true;
					SELECTED.queryBox = c.mesh;
					SELECTED.onTarget = true;
					window.container.style.cursor = 'pointer';
				}
				else{
					window.container.style.cursor = 'no-drop';
				}
			}
			var intersects = ray.intersectObject( this.cubeManager.sceneUtil.plane );
    		if(intersects[ 0 ]){
    		    SELECTED.position.copy( intersects[ 0 ].point.subSelf( offset ) );    
    		}
			
            return;
    		
    		
    	}
        
        /*
        * So lange nicht geklickt wurde speichere das Element über dem sich die Maus befindet
        * Dieser Zweig ist notwendig, damit beim Mousedown entschieden werden kann, welches
        * das SELECTED-Element ist. Dieses wird durch eine Collisiondection mit der Plane ermöglicht.
        */
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                        //Ist der nächste SELECT-Kandidat
                        INTERSECTED = intersects[ 0 ].object;
                this.cubeManager.sceneUtil.plane.position.copy( INTERSECTED.position );
            
            }
            
            window.container.style.cursor = 'auto';
            
        } else {
            // Es gibt keinen SELECT-Kandidat mehr       
             INTERSECTED = null;
            
            window.container.style.cursor = 'auto';
            
        }
	    
	},
	
	onDocumentMouseMoveClickable: function() {
	    
	}
	
	
	
	
	
}





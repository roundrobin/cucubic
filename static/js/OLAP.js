      function animate() {
		requestAnimationFrame(animate);

		render();
		TWEEN.update();
	//stats.update();
		}

      
      var container, stats, camera, scene, renderer, cube, plane;
      var cubes;
      var targetRotation = 0; var targetRotationOnMouseDown = 0; var mouseX = 0; var mouseXOnMouseDown = 0;
      var canvasWidth = 1500;
      var canvasHeight = 800;
      var windowHalfX = canvasWidth / 2;
      var windowHalfY = canvasHeight / 2;

	  var cubeWidth  = 135;
	  var cubeHeight = 135;
	  var cubeDepth  = 135;
	  var projector;
	  
	  var targetFlag = false;
	  function c(object){
      	console.log(object);
      }
      var radius = 600;
	  var theta = 0;
      function render() {
      	
      	for ( var i = 0; i < scene.objects.length; i ++ ) {
      		
      		if(scene.objects[i].children.length == 0){
      			//scene.objects[i].materials[0].opacity = 1;
      			//console.log(Math.sin(scene.objects[i].materials[1].opacity) *Math.random());
      			
      			//scene.objects[i].materials[1].opacity = ;
      		}	
      		
      	}

      	
		renderer.render( scene, camera );
	  }
      
      function init(cubeNames) {
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        scene = new THREE.Scene();
        cubes = cubeNames;
        
		projector = new THREE.Projector();
        
        camera = new THREE.Camera( 60, canvasWidth/ canvasHeight, 1, 10000);
        camera.position.z = 3500;
        camera.useTarget = targetFlag;
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize( canvasWidth, canvasHeight );
        renderer.domElement.style.border = "2px solid black";
        
        cubes3D      = createCubes(cubes);
        posCubes3D   = positioningCubes(cubes3D);
        check = computeCenteroid(posCubes3D, scene, renderer);
        c("new");
        c(check);
        c(scene.objects);
        scene.removeObject(check);
        
        for ( var i = 0; i < posCubes3D.length; i ++ ) {
          cube = cubes3D[i];
          scene.addObject(cube);
         }
        

        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );

      }
      
      function onDocumentMouseDown( event ) {

			event.preventDefault();
			
			var vector = new THREE.Vector3( ( event.clientX / canvasWidth ) * 2 - 1, - ( event.clientY / canvasHeight ) * 2 + 1, 0.5 );
			projector.unprojectVector( vector, camera );
			
			var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
			container = [];
			for ( var i = 0; i < scene.objects.length; i ++ ) {
				if(scene.objects[i] instanceof THREE.Mesh){
					container.push(scene.objects[i]);					
					
				}else{
					container.push(scene.objects[i].children[0]);
				}
			}
			var intersects = ray.intersectObjects( container );
			
			if ( intersects.length > 0 ) {
				c(intersects[0]);
				intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );
				
				
				new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
						x: Math.random() * 800 - 400,
						y: Math.random() * 800 - 400,
						z: Math.random() * 800 - 400 }, 2000 )
					.easing( TWEEN.Easing.Elastic.EaseOut).start();

			
			}
				
				

	  }
      
      
      function createArrayToContainer(arrayWith3DObjects){
      	var container3D =  new THREE.Object3D();
      	for ( var i = 0; i < arrayWith3DObjects.length; i ++ ) {
      		container3D.addChild(arrayWith3DObjects[i]);
      	}
      	return container3D;
      }
      
      function longestText(cubes){
        var longestText = 0;
            for ( var i = 0; i < cubes.length; i ++ ) {
	    	   if ((cubes[i].children.length >= 1)){
		    	   text = cubes[i].children[0];
		    	   text.geometry.computeBoundingBox();
		           size = (text.geometry.boundingBox.x[0] > 0) ? Math.abs(text.geometry.boundingBox.x[0] - text.geometry.boundingBox.x[1]) : Math.abs(text.geometry.boundingBox.x[0] + text.geometry.boundingBox.x[1]);
		           	if(longestText < size){
						longestText = size;				           		
		           	}
	          }
        	}
          		
        return longestText;
      }
      
      function positioningCubeAndText(container, currentX, currentY){
      	
        children = container.children;
        var x = currentX;
        var y = currentY;
        
        for ( var i = 0; i < children.length; i ++ ) {
           obj = children[i];
           if(obj.geometry != null){
           		obj.geometry.computeBoundingBox();
           		bBox = obj.geometry.boundingBox
           		obj.position.x = x;
           		obj.position.y = y;
		        y -= bBox.y[1]*2;	
           	
           }else{
           	obj.position.x = x;
           	obj.position.y = y;
           	y -= cubeHeight;
           	if(longestText < obj.children[0].boundRadius){
				longestText = obj.children[0].boundRadius;				           		
           	}
           		
           }
           
        }
        return children;
      }
      
	  function computeCenteroid(cubes, scene, renderer){
      	//Variablen mit einem random Point irgendeines Objectes aus der dem Cube-Array initialisieren
      	var smX = cubes[0].position.x;
      	var smZ = cubes[0].position.z;
      	var smY = cubes[0].position.y;
      	
      	var hX = cubes[0].position.x;
      	var hZ = cubes[0].position.z;
      	var hY = cubes[0].position.y;
      	
      	var smallestX = cubes[0].position.x;
      	var highestX  = cubes[0].position.x;
      	var depthX    = cubes[0].position.x;
      		
      	var hObjX = cubes[0];
      	var test = cubes[0];
  		var sObjX;
  		var hObjY;
  		var sObjY;
  		var hObjZ;
  		var sObjZ;
      	


      	
      	for ( var i = 0; i < cubes.length; i ++ ) {
			var x = cubes[i].position.x;
			var y = cubes[i].position.y;
			var z = cubes[i].position.z;
      		
      		
      		box  = (cubes[i].children[0] == null) ? box = cubes[i].geometry : box = cubes[i].children[0].geometry;
      		
      		box.computeBoundingBox();
      		bBox = box.boundingBox;
      		
      		var width = (bBox.x[0] < bBox.x[1]) ?  Math.abs(bBox.x[0] - bBox.x[1]) : Math.abs(bBox.x[1] - bBox.x[0]);
 
      		var smallestX = x;
      		var highestX  = x + width;
			c(x);
      		if( smallestX < smX){ 
      			smX = smallestX;
      			sObjX = cubes[i];
      		
      		}
      		if( highestX > hX)  { 
      			hX    = highestX;
      			hObjX = cubes[i];
      		}
      		
      		if( smallestY < smY){ 
      			smY = smallestY;
      			sObjY = cubes[i];
      		
      		}
      		if( highestY > hY)  { 
      			hY    = highestY;
      			hObjY = cubes[i];
      		}
      		
      		var height = (bBox.y[0] < bBox.y[1]) ? Math.abs(bBox.y[0] - bBox.y[1]) : Math.abs(bBox.y[1] - bBox.y[0]);

      		var smallestY = y;
      		var highestY  = y + height;
      		if( smallestY < smY){ smY = smallestY;}
      		if( highestY> hY)  { 
      			hY  = highestY;
      			hObjX =cube[i];
      		}
      		
      		var depth = Math.abs(bBox.z[0])+bBox.z[1];
      		
      		var smallestZ = z;
      		var highestZ  = z + depth;
      		if( smallestZ < smZ){ smZ = smallestZ;}
      		if( highestZ > hZ)  { hZ  = highestZ;}
      			
      	}

			
		// TODO: Checken wann man ABS und wann nicht
	        var width  = Math.abs(smX - hX);
	        var height = smY - hY;
	        var depth  = Math.abs(smZ - hZ);
	        cubeWidth  = hX + Math.abs(smX);
			cubeHeight = hY+Math.abs(smY);
			cubeDepth  = hZ;
			for ( var i = 0; i < 6; i ++ ) { materials.push( [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) ] ); }
			
			geo        = new THREE.CubeGeometry( cubeWidth, cubeHeight, cubeDepth);
	        targetCube = new THREE.Mesh( geo, [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, wireframe: true } ) ] );
	        geometry   = targetCube.geometry;
	        geometry.computeBoundingBox();
	        
	        var centerX = width / 2;
			var centerY = (height / 2);
			var centerZ = 1000;
	        
	        targetCube.position.x = hObjX.position.x -2500;
	        targetCube.position.y = hY-750;
	        targetCube.position.z = smZ;
	        //scene.addObject(targetCube);
			camera.position.set(centerX, centerY, centerZ  );
			return test;
      	}
      
      function positioningCubes(cubes){
        var x = 0;
        var y = 0;
        var longestTextDimension = longestText(cubes);
        spaceX = longestTextDimension + 100;
        spaceY = 600;
        for ( var i = 1; i < cubes.length+1; i ++ ) {
          cube = cubes[i-1];
          //cube = positioningCubeAndText(cube, x, y);
		}
        
        var xTemp = x;
        var yTemp = y;
        var rowCount = 6;
        var index = 0;
        for ( var i = 1; i < cubes.length+1; i ++ ) {
        	
          cube = cubes3D[i-1];
          if(index == 1){
          	yTemp -= 200;

          }
          cube.position.x = xTemp;
          cube.position.y = yTemp;
          	
          if(index == 1){
          	xTemp += spaceX;
          	yTemp += 200;
          	
          }
          if(i % (rowCount*2) == 0){
				yTemp -= spaceY;
				xTemp = x;          	
          }
          
          if(index == 1){
          	index = -1;
          }
          index++;
          
	      
        }  
        return cubes;
      }
      
      
      function createCubes(cubes){
        cubes3d   = [];
        materials = [];

        for ( var i = 0; i < 6; i ++ ) {
          materials.push( [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xff00ff } ) ] );
        }
        
        for ( var i = 0; i < cubes.length; i ++ ) {
          cube = new THREE.Mesh( new THREE.CubeGeometry( cubeWidth, cubeHeight, cubeDepth ), [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, wireframe: true } ) ] );
          cube.overdraw = true;
          textGeo = createTextObject(cubes[i]);
          
          cube.position.x = 0;
          cube.position.y = 0;
          
          textGeo.position.x = 0;
          textGeo.position.y = 200;
          
          cubes3d.push( cube );
          cubes3d.push( textGeo );
                    
        }
        return cubes3d;
      }
      
      function createTextObject(text){

      }      
      function createTexture(cubes){
      
      
      }        
      

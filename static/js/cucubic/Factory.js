CUBE.Factory = function() {
  
};

CUBE.Factory.createCubes = function(count ,width, height, depth, color){
	if(width == null) width  = 100;
	if(height== null) height = 100;
	if(depth == null) depth  = 100;
	if(color == null) color  = 0xffff00;
	
	var container = [];
	var geometry  = new THREE.CubeGeometry( width, height, depth );
	for ( var i = 0; i < count; i ++ ) {
			var cube = CUBE.Factory.createCube(geometry, color);
			container.push(cube);
	}
	return container;	
}

CUBE.Factory.createCubicElem = function(container, color,x, y, z, text,row,col,page, width, height, depth){
    
	  var cube = CUBE.Factory.createCubeWithCanvasText3(width, height, depth,  0xe3e2d4, text);
	  cube.position.set(x,y,z);
	  cube.row  = row;
      cube.col  = col;
      cube.page = page;
      cube.type = "CubicElem";
      cube.parent = container;
			
      (container.elementsofCol[col]   == undefined) ? container.elementsofCol[col]   = [cube] : container.elementsofCol[col].push(cube);
      (container.elementsofRow[row]   == undefined) ? container.elementsofRow[row]   = [cube] : container.elementsofRow[row].push(cube);
      (container.elementsofPage[page] == undefined) ? container.elementsofPage[page] = [cube] : container.elementsofPage[page].push(cube);
	  
	  return cube;
}

CUBE.Factory.sidedCube = function  (width, height, depth,  color, text, values) {
			      var group 		= new THREE.Object3D();					
				    var mergedGeo	= new THREE.Geometry();
			
        		var reducer = 150;
            
               var text1 = CUBE.Factory.createText("5", 65, 5, 0xcda869);
               text1.position.x = width / 2;
               text1.rotation.y = 1.5;
               text1.matrixAutoUpdate = false;
			         text1.updateMatrix();
               THREE.GeometryUtils.merge(mergedGeo, text1 );
               
               var text2 = CUBE.Factory.createText("2", 65, 5, 0x7587ab);
               text2.position.x -= (width-30) / 2;
               text2.rotation.y -= 1.5;
               text2.matrixAutoUpdate = false;
			         text2.updateMatrix();
               THREE.GeometryUtils.merge(mergedGeo, text2 );
               
               var text3 = CUBE.Factory.createText("23", 65, 5, 0xcda869);
               text3.position.y = height / 2;
               text3.rotation.x -= 1.5;
               text3.matrixAutoUpdate = false;
			         text3.updateMatrix();
               THREE.GeometryUtils.merge(mergedGeo, text3 );
               
               var text4 = CUBE.Factory.createText("300", 65, 5, 0x7587ab);
               text4.position.y -= height / 2;
               text4.rotation.x = 1.5;
               text4.matrixAutoUpdate = false;
			         text4.updateMatrix();             

               THREE.GeometryUtils.merge(mergedGeo, text4 );
               
               var text5 = CUBE.Factory.createText("4000", 65, 5, 0xcda869);
               text5.position.z = depth / 2;
               text5.matrixAutoUpdate = false;
			         text5.updateMatrix();    
               THREE.GeometryUtils.merge(mergedGeo, text5 );
               
               var text6 = CUBE.Factory.createText("1", 65, 5, 0x7587ab);
               text6.position.z -= depth / 2;
               text6.matrixAutoUpdate = false;
			         text6.updateMatrix(); 
               THREE.GeometryUtils.merge(mergedGeo, text6 );
               
               
               THREE.GeometryUtils.merge(mergedGeo, cube );
               
               group	= new THREE.Mesh( mergedGeo, new THREE.MeshNormalMaterial() );
              
              
              return group;
}


CUBE.Factory.createCubeWithCanvasText2 = function(width, height, depth, colorParam, text, wireframe){
	var color = colorParam;
	var colorCanvas = '#'+Math.round(color).toString(16);
	  //var mat1 = new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
    var mat2 = new CUBE.MaterialUtil().instance;
    
    
    
    
    var materials = [mat2, mat2, mat2, mat2, mat2, mat2];
    var cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
    
	cube.overdraw = true;
	return cube;
}



CUBE.Factory.createCube = function(geometry, color){
	var material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.5 } );
	var cube = new THREE.Mesh( geometry, [material] );
	cube.overdraw = true;
	return cube;
}

CUBE.Factory.createCubePlain = function(width, height, depth, color, wireframe, opacity){
	if(opacity == undefined){
		var opacity = 0.5;
	}
	var geometry  = new THREE.CubeGeometry( width, height, depth );
	var material = new THREE.MeshBasicMaterial( { color: color, opacity: opacity, wireframe : wireframe } );
	
	material.transparent = true;
	
	var materials = [ material, material ];
	
	var cube = new THREE.Mesh( geometry, materials );
	cube.overdraw = true;
	return cube;
}

CUBE.Factory.createCubeWithCanvasTextWithGeometry = function(width, height, depth, colorParam, text, geometry, wireframe){
	var color = colorParam;
	var colorCanvas = '#'+Math.round(color).toString(16);
	var mat1 = new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
    var mat2 = new CUBE.MaterialUtil().instance;

    var materials = [mat2, mat2, mat2, mat2, mat1, mat2];
    var cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth, 1, 1, 1, materials ), new THREE.MeshFaceMaterial({wireframe: true, transparent: true, opacity: 0.9, color: 0xff00ff}) );
	cube.overdraw = true;
	return cube;
}

CUBE.Factory.createCubeWithCanvasText3 = function(width, height, depth, colorParam, text, wireframe){
	var color = colorParam;
	var colorCanvas = '#'+Math.round(color).toString(16);
	var mat1 = new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
	
	//var num = Math.floor((100*Math.random())).toString();
    var mat2 = new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
	
  var materials = [mat2, mat2, mat2, mat2, mat1, mat2];
  var cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
    
	cube.overdraw = true;
	return cube;
}


CUBE.Factory.createCubeWithCanvasText = function(width, height, depth, colorParam, text, wireframe){
	var color = colorParam;
	var colorCanvas = '#'+Math.round(color).toString(16);
	var mat1 = new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
    var mat2 = new CUBE.MaterialUtil().instance;
    var materials = [mat2, mat2, mat2, mat2, mat1, mat2];
    var cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
    
	cube.overdraw = true;
	return cube;
}

CUBE.Factory.createPlaneWithText = function(width, height, text, colorParam){
	var material = CUBE.Factory.createCanvasMaterial(width, height, colorParam, text);
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( width, height, 8, 8 ), material );
    plane.position.x = cubeManager.screenUtil.xLeft()+3500;
    plane.position.y = cubeManager.screenUtil.yBottom()+250;
    plane.position.z = 0;
    plane.clickable = false;
    return plane;
}


CUBE.Factory.createCanvasMaterial = function(width, height, colorParam, text){
	var colorCanvas = '#'+Math.round(colorParam).toString(16);
	return new THREE.MeshBasicMaterial({map: CUBE.TextureUtil.createCanvasTexture(text, colorCanvas, width, height)});
}

CUBE.Factory.createText = function(text, size, height, color){
	var theText = text;
	var hash = document.location.hash.substr( 1 );
	if ( hash.length !== 0 ) { theText = hash; }
	
	var text3d = new THREE.TextGeometry( theText, {
	    size: size,
	    height: height,
	    curveSegments: 3,
	    font: "gentilis"
	});
	
	text3d.computeBoundingBox();
	//text3d.boundingBox.x[ 1 ] - text3d.boundingBox.x[ 0 ]
	var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x  );
	
	var textMaterial = new THREE.MeshBasicMaterial( { color: color, wireframe: false } );
	text = new THREE.Mesh( text3d, textMaterial );
	
	text.doubleSided = false;
	text.text   = theText;
	text.position.x = centerOffset;
	text.position.y = 0;
	text.position.z = 0;
	
	text.rotation.x = 0;
	text.rotation.y = Math.PI * 2;
	text.overdraw = true;
	return text;	
	
}


CUBE.Factory.createText2 = function(text, size, height){
	var text3d = new THREE.TextGeometry( text, {
	    size: size,
	    height: height,
	    curveSegments: 3,
	    font: "gentilis"
	});
	text = new THREE.Mesh( text3d );
	
	return text;
}

CUBE.Factory.createCubeWithLabel = function(width, height, depth, text, color){
	var cube = CUBE.Factory.createCubePlain(width, height, depth, color, true);
	var text = CUBE.Factory.createText(text, height ,1, color);
	return [cube, text];
}

CUBE.Factory.createPlane = function(width, height, raster1, raster2, visible, cubeManager){
	var plane = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.25, transparent: true, wireframe: true } ) );
    plane.lookAt( cubeManager.camera.position );
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.clickable = false;
    plane.visible = visible;
    return plane;
}

CUBE.Factory.createCamera = function(cameraPositionZ, fov, canvasWidth, canvasHeight, near, far ){
	camera = new THREE.PerspectiveCamera( fov, canvasWidth / canvasHeight, near, far );
    camera.position.z = cameraPositionZ;
    camera.useTarget = false;

    return camera;
	
}

CUBE.Factory.createButton = function(width, height, depth, colorParam, text, onclick, wireframe){
	var button = CUBE.Factory.createCubeWithCanvasText(width, height, depth, colorParam, text, wireframe);
	button.onclick = onclick;
	button.clickable = true;
	return button;
}






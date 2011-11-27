




 
function createCanvasTexture(text) {

	for(var i = 0; i < textureNames.length; i++) {
		if(textureNames[i]["name"] == text) {
			return textureNames[i]["texture"];
		}
	}

	var canvas2 = document.createElement("canvas");
	canvas2.id = "number";
	canvas2.style.width = "100px";
	canvas2.style.height = "100px";
	var context = canvas2.getContext("2d");
	var x = canvas2.width / 2;
	var y = canvas2.height / 2;
	context.font = "50pt Arial";
	color = 130;
	context.textAlign = "center";
	context.fillStyle = "#889988";
	context.fillRect(0, 0, 300, 300);

	// assign gradients to fill
	//context.fillStyle = objGradient;

	// draw 600x600 fill
	context.fillRect(0, 0, 600, 600);
	context.fillStyle = "black";
	context.fillText(text + "", x, y);
	context.save();

	//document.body.appendChild( canvas2 );
	texture = new THREE.Texture(canvas2);
	texture.needsUpdate = true;
	mapElement = new Object();
	mapElement["name"] = text;
	mapElement["texture"] = texture;
	textureNames.push(mapElement);
	return texture;
}

function createCube(text, color, x, y, z){
  var materials = [];
  for ( var j = 0; j < 6; j ++ ) {
    materials.push( [ new THREE.MeshBasicMaterial({ map: createCanvasTexture(text), wireFrame:true}) ] );
    //materials.push( [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) ] );
  }
  cube = new THREE.Mesh( new THREE.CubeGeometry( 400, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  cube.overdraw = true;
  return cube;
}

function createTable(columnHeading, rowHeading, values) {
	var x = 0;
	var y = 0;
	var z = 0;

	for(var i = 0; i < columnHeading.length; i++) {
		cube = createCube(columnHeading[i], "", x, y, z);
		scene.addObject(cube);
		x += 401;
	}
	x = -401;
	y = -201;

	for(var i = 0; i < rowHeading.length; i++) {
		cube = createCube(rowHeading[i], "", x, y, z);
		scene.addObject(cube);
		y -= 201;
	}
	x = 0;
	y = -201;

	for(var i = 0; i < values.length; i++) {
		if(values[i] instanceof Array) {
			for(var j = 0; j < values[i].length; j++) {
				cube = createCube(values[i][j], "", x, y, z);
				scene.addObject(cube);
				x += 401;
			}
		} else {
			cube = createCube(values[i], "", x, y, z);
			scene.addObject(cube);
			x += 401;
		}
		x = 0;
		y -= 201;
	}

}

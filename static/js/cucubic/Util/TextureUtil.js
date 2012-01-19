CUBE.TextureUtil = function() {

};			


CUBE.TextureUtil.createCanvasTexture = function (text,color, width, height){
	var canvas1  	  = document.createElement("canvas");
	var ctx  	      = canvas1.getContext("2d");
	//canvas1.style.width = width+"px";
	//canvas1.style.height = "40px";
	
	var dim = ctx.measureText(text).width;
	var calcWidth = dim*10;
	//console.log(text+""+calcWidth+" -- width"+width);
	
	if(calcWidth > width){
		width = width*2;
	}
	
	var canvas  	  = document.createElement("canvas");
	canvas.id   	  = "number";
	canvas.width = width*0.7;
	canvas.height = height*0.7;
	var context  	  = canvas.getContext("2d");
	var x        	  = canvas.width / 2; 
	var y             = canvas.height / 2;
	context.font 	  = "bold 30pt Arial";
	context.textAlign = "center";
	context.textBaseline = "middle";
	
	context.fillStyle = color;
	context.fillRect(0,0,width,height);
	context.fillStyle = "black";
	context.fillText(text+"", x, y);
	context.save();
	canvas = cubeManager.renderer._microCache.getSet(text+"", canvas);	
	//document.body.appendChild( document.createElement("br") );
	//document.body.appendChild( canvas );
	texture = new THREE.Texture( canvas );
	texture.needsUpdate = true;
	return  texture;			
};
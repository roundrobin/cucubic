CUBE.ScreenUtil = function(canvasWidth,cameraX, fov, ratio) {
	this.canvasWidth = canvasWidth;
	this.camera = cameraX;
	this.fov = fov;
	this.ratio = ratio;
	this.rad = (this.fov /2) * (Math.PI/180);
	this.hFar = 2 * Math.tan(( this.rad )) * this.camera.position.z;
	this.wFar = this.hFar * this.ratio;
	
	this.allObjects;
	this.allClickableObjects;
	this.allNonClickableObjects;
	
};


CUBE.ScreenUtil.prototype = {
	xLeft : function(){
		return this.camera.position.x - (this.wFar/2);
	},
	xRight : function(){
		return -(this.camera.position.x + (this.wFar/2));
	},
	yTop : function(){
		return this.camera.position.y + (this.hFar/2);
	},
	yBottom : function(){
		return -(this.camera.position.y + (this.hFar/2));
	}
}





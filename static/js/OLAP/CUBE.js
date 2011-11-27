var CUBE = CUBE || {};

CUBE.CubeManager = function(sceneUtil, camera, projector, renderer, screenUtil, gui, light, tweenUtil) {
	this.sceneUtil  = sceneUtil;
	this.camera     = camera;
	this.projector  = projector;
	this.renderer   = renderer;
	this.screenUtil = screenUtil;
	//this.light      = light;
	//this.gui = gui;
	this.tweenUtil = tweenUtil;
	var plane = new CUBE.Factory.createPlane(10000,10000,8,8, false, this);
    this.sceneUtil.add( plane );
    this.sceneUtil.plane = plane;
	
};
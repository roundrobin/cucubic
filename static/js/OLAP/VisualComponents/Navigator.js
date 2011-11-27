CUBE.Navigator = function(cubeManager, rootNodes) {
	this.cubeManager = cubeManager;
	this.rootNodes   = rootNodes;
	this.tree        = [];
	this.dragObjects  = [];
};



CUBE.Navigator.prototype = {
	createComponentAndShow : function() {
		var position = {x: this.cubeManager.screenUtil.xLeft()+100, y: this.cubeManager.screenUtil.yTop()-700 ,z: 0}
		this.showNodesRecursive({currentLevel: this.rootNodes, spaceY: 150, spaceX: 0, position: position, parentNode: null, expanded: false});

		

	},
	showNodesRecursive : function(params) {
	    
	    var spaceY    = params.spaceY;
	    var position  = params.position;
	    var positionForNotVisible = {x: params.position.x, y: params.position.y, z: params.position.z};
	    var treeNodes = [];
	    
	    for ( var i = 0; i < params.currentLevel.length; i ++ ) 
	    {
	        var treeNode = CUBE.Navigator.createTreeNode({treeNode: params.currentLevel[i], position: position, spaceY: spaceY, spaceX : params.spaceX, parentNode: params.parentNode, expanded: params.expanded });
	        
	        position.y -= spaceY;
            this.cubeManager.sceneUtil.add(treeNode.expanderElement);   
            this.cubeManager.sceneUtil.add(treeNode);
            treeNodes.push(treeNode);
		}
		this.setLinkedList(treeNodes);
		
	},
	setLinkedList : function(arrayWithTreeNodes){
	    this.root = arrayWithTreeNodes[0];
    	for ( var i = 0; i < arrayWithTreeNodes.length; i ++ ) {
    	    arrayWithTreeNodes[i].next = arrayWithTreeNodes[i+1];    	    
        }    
            
    }
    
}
CUBE.Navigator.createTreeNode = function(params){
    
	var dimText = params.treeNode.toMesh({position: {x: params.position.x-params.spaceX, y: params.position.y-params.spaceY, z: params.position.z}});
	dimText.expanderElement = null;
	dimText.parentNode = params.parentNode; 
	if(params.treeNode.children() && params.treeNode.children().length > 0){
	    var expanderButton   = new CUBE.Navigator.createButtonNode( {x: params.position.x, y: params.position.y, z: params.position.z});
	    expanderButton.position.y   -= params.spaceY;
        expanderButton.position.x   += params.spaceX;
	    dimText.expanderElement     = expanderButton;
	    dimText.expanded            = params.expanded;
	    expanderButton.onclick      = CUBE.Navigator.delegatorCall(CUBE.Navigator.toogleTreeChilds, {node: dimText});
	    dimText.onclick             = CUBE.Navigator.delegatorCall(CUBE.Navigator.toogleTreeChilds, {node: dimText});  
	}

    dimText.startPosition = new THREE.Vector3(dimText.position.x,dimText.position.y,dimText.position.z)
	return dimText;
}

CUBE.Navigator.delegatorCall = function(callbackFunction,args){
    return function() {
	    callbackFunction(args);
	};
}

CUBE.Navigator.createButtonNode = function( position ){
    var expandButton = new CUBE.Factory.createCubePlain(50, 50, 1, blau, false, 0.7);
    expandButton.clickable = true;
    expandButton.position.set( position.x-40, position.y+30, position.z);
    return expandButton; 
};

CUBE.Navigator.toogleTreeChilds = function(params){
    if(params.node.expanded){ // Dieser Zweig behandelt das einklappen des Trees
       CUBE.Navigator.hideLevels(params);
    }else{ // Dieser Zweig behandelt das aufklappen des Trees
        CUBE.Navigator.showLevels(params);      
    }
}


CUBE.Navigator.hideLevels = function(params){
    params.node.expanded = !params.node.expanded;
    var callerNode = params.node;
   
    var container = [];
   
    for ( var i = 0; i < callerNode.visualChildren.length; i ++ ) {
        container.push(callerNode.visualChildren[i]);
        for ( var k = 0; k < callerNode.visualChildren[i].visualChildren.length; k ++ ) {
            if(callerNode.visualChildren[i].visualChildren[k].moveOnTreeUpdate){
                container.push(callerNode.visualChildren[i].visualChildren[k]);                 
            }
            
        }
    }
    
    var deleteOnTarget = function(obj){
        console.log(obj);
        if(obj){
             for ( var i = 0; i < obj.length; i ++ ) {
            cubeManager.sceneUtil.remove(obj[i]);
            }
        }
    }
    
   cubeManager.tweenUtil.slideInGroup(container,-1000,0,0,CUBE.Navigator.delegatorCall(deleteOnTarget,container));
   
   var height = cubeManager.sceneUtil.complexComputation(container).height;
   var paramsTree = {item: callerNode.next,shiftY: height+100};
   cubeManager.tweenUtil.moveRestOfListDown(paramsTree);
   
   
   
   
   
   
 
};


CUBE.Navigator.showLevels = function(params){
   params.node.expanded = !params.node.expanded;
   var callerNode = params.node;
   var container = [];
   var spaceX = -100;
   var spaceY = 120;
   var incrementY = 0;
   var incrementX = 0;
   var shiftX = -1000;
   
   for ( var i = 0; i < callerNode.childrenNodes.length; i ++ ) {
        var position = {x: callerNode.position.x+incrementX+shiftX, y: callerNode.position.y-incrementY, z: callerNode.position.z};
        var node = callerNode.childrenNodes[i];
        var parentNode = callerNode;
        var expanded = true;
        var treeNode = CUBE.Navigator.createTreeNode({treeNode: node, position: position, spaceY: spaceY, spaceX : spaceX, parentNode: parentNode, expanded: expanded });
        cubeManager.sceneUtil.add(treeNode);
        container.push(treeNode);
        callerNode.visualChildren.push(treeNode);
        
        var incrementYTemp = spaceY;
        var incrementXTemp = spaceX;
        for ( var k = 0; k < node.childrenNodes.length; k ++ ) {
            var position = {x: treeNode.position.x, y: treeNode.position.y, z: treeNode.position.z};
            var nodeSub = node.childrenNodes[k];
            var parentNodeSub = callerNode;
            var expanded = true;
            var treeNodeSub = CUBE.Navigator.createTreeNode({treeNode: nodeSub , position: position, spaceY: incrementYTemp, spaceX : spaceX-100, parentNode: parentNodeSub, expanded: expanded });
            
            cubeManager.sceneUtil.add(treeNodeSub);
            
            container.push(treeNodeSub);
            treeNode.visualChildren.push(treeNodeSub);
            
            
            
            incrementYTemp += spaceY;
              
        }
        incrementY += spaceY+incrementYTemp;
        
   }
   
   var deleteOnTarget = function(obj){
        
        for ( var i = 0; i < obj.length; i ++ ) {
            cubeManager.sceneUtil.remove(obj[i]);
            obj[i] = null;
        }
    
    }
   
   
   var height = cubeManager.sceneUtil.complexComputation(container).height;
   var paramsTree = {item: callerNode.next,shiftY: -height-100};
   cubeManager.tweenUtil.moveRestOfListDown(paramsTree);
   
   var callOnComplete = function(obj){
        for ( var i = 0; i < obj.length; i ++ ) {
    	    obj[i].startPosition.copy( obj[i].position);
        }
    };
   
   cubeManager.tweenUtil.slideInGroup(container,1000,0,0,CUBE.Navigator.delegatorCall(callOnComplete,container));    

}

CUBE.Navigator.treeDepth = function(node){
//console.log(node);
if(node.children() && node.children().length > 0){
    var total = 0;
    for ( var i = 0; i < node.children().length; i ++ ) {
        total += CUBE.Navigator.treeDepth(node.children()[i])+1;
    }
    return total;
}else{
    return 0;
}
    
}



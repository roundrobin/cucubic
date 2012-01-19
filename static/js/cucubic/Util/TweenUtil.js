CUBE.TweenUtil = function() {

	
};


CUBE.TweenUtil.prototype = {
    slideIn: function(param) {
        
        
	    var toObj = {}
        if(param.x) toObj.x = param.x;
        if(param.y) toObj.y = param.y;
        if(param.z) toObj.z = param.z;
        if(!param.onComplete) param.onComplete = function(){};
        if(!param.onUpdate) param.onUpdate = function(){};
        if(param.duration){
            var duration = param.duration;
        } else {
          var duration = 500;  
        }
		posObject = param.item.position;
        
        	var tween = new TWEEN.Tween( posObject ).to(toObj , duration )
            .easing( TWEEN.Easing.Elastic.EaseOut)
            .onComplete(param.onComplete)
            .onUpdate(param.onUpdate);
            
                
          var tweenImmediately = (param.direct == false) ? false : true;
          
          if(tweenImmediately){
              
              tween.start();
              
          }else{
              
              return tween; 
              
          }
      
        
    },
    slideInFromOldPosition: function(param) {
        if(param.x) param.x = param.item.position.x + param.x;
        if(param.y) param.y = param.item.position.y + param.y;
        if(param.z) param.z = param.item.position.z + param.z;    
        
        this.slideIn(param);
      
        
    },
    updateStartPosition: function(param) {
        param.item.startPosition.x = param.item.startPosition.x + param.x;
        param.item.startPosition.y = param.item.startPosition.y + param.y;
        param.item.startPosition.z = param.item.startPosition.z + param.z;
        console.log("Start Pos wurde geändert");
    },
    slideInGroup : function(arrayWithMeshes, shiftX, shiftY, shiftZ,onCompleteF) {
         if(!shiftX) shiftX = 0;
         if(!shiftY) shiftY = 0;
         if(!shiftZ) shiftZ = 0;
         if(!onCompleteF) onCompleteF = function(){};
         
         
         for(var i = 0; i < arrayWithMeshes.length; i++ ){
             var node = arrayWithMeshes[i];
             var param = {item: arrayWithMeshes[i],x: shiftX, y: shiftY, z: shiftZ, onComplete: onCompleteF }
             
             if(node.moveOnTreeUpdate){
                this.slideInFromOldPosition(param);    
             }else{
                this.updateStartPosition(param);     
             }
             
         }
    },
    /*
    * Diese Funktion verschiebt eine verkettete Liste um eine bestimmte Position (param.Position)
    * Als Argument muss ein Parameter-Objekt übergeben werden, welches in Item
    * Ein Object enthält welches die Methode "next" implementiert hat.
    */
    moveRestOfListDown: function(param) {
    	var next = param.item;
    	var shiftX = param.shiftX || 0;
    	var shiftY = param.shiftY || 0;
    	var shiftZ = param.shiftZ || 0;
    	while(next){
    	    this.slideInFromOldPosition({ item: next, x: shiftX, y: shiftY, z: shiftZ });    
	       	this.slideInFromOldPosition({ item: next.expanderElement, x: shiftX, y: shiftY, z: shiftZ });
    	    for(var i = 0; i < next.visualChildren.length; i++ ){
    	        this.slideInFromOldPosition({ item: next.visualChildren[i], x: shiftX, y: shiftY, z: shiftZ });
    	        for(var k = 0; k < next.visualChildren[i].visualChildren.length; k++ ){
    	            var currentLevelNode = next.visualChildren[i].visualChildren[k];
    	            var callOnComplete = function(updater){
    	                updater.startPosition.copy( updater.position);
    	                
    	            };
    	            if(currentLevelNode.moveOnTreeUpdate){
    	                this.slideInFromOldPosition({ item: currentLevelNode, x: shiftX, y: shiftY, z: shiftZ, onComplete: this.functionWrapper(callOnComplete, currentLevelNode) });    
    	            }else{
    	                this.updateStartPosition({ item: currentLevelNode, x: shiftX, y: shiftY, z: shiftZ, onComplete: this.functionWrapper(callOnComplete, currentLevelNode) });    
    	            }
    	            
    	            
    	        }
    	            
    	    }
    	    next = next.next;
    	    
    	}         
    },
    functionWrapper: function(callButtonFunction,arg){
	    return function() {
	        callButtonFunction(arg);
	    };
	}

    
}
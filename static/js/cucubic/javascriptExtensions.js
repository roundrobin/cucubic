      Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };

      Array.prototype.remove=function(s){
        var i = this.indexOf(s);
        if(i != -1) this.splice(i, 1);
        }
        Array.prototype.contains=function(obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        } 
/**
 * 
 * pull-to-reload 
 * 
 * A pull-to-reload system that is compatible with both both web and mobile.
 * Configurable with loads of options.
 * 
 * @author Erlend Ellingsen <erlend.ame@gmail.com>
 * @copyright MIT, Erlend Ellingsen
 * @version	1.0	03.03.2017
 */

var PullToReload = function(optsUser) {
    var self = this; 

    //--- OPTIONS ---
    this.opts = {
        'refresh-element': 'ptr', //Required
        'content-element': 'content', //Required
        'border-height': 1,
        'height': 80,
        'font-size': '30px',
        'threshold': 20,
        'pre-content': '...',
        'loading-content': 'Loading...',
        'callback-loading': function(){ setTimeout(function(){ self.loadingEnd(); }, 1000); } //Required
    }

    //Overwrite options with user-options if present
    for (var prop in self.opts) {
        if (optsUser[prop] != undefined) self.opts[prop] = optsUser[prop];
    }

    //--- INIT CODE --- 
    this.ptr = $('#' + self.opts['refresh-element']);
    this.content = $('#' + self.opts['content-element']);

    //--- STYLING ---

    //Set style
    $(self.ptr).css('padding', '0px');
    $(self.ptr).css('margin', '0px');
    $(self.ptr).css('display', 'block');
    $(self.ptr).css('height', self.opts.height + 'px');
    $(self.ptr).css('border', self.opts['border-height'] + 'px solid #000');
    $(self.ptr).css('border-top', '0px');
    $(self.ptr).css('border-left', '0px');
    $(self.ptr).css('border-right', '0px');
    $(self.ptr).css('text-align', 'center');
    $(self.ptr).css('line-height', self.opts.height + 'px');
    $(self.ptr).css('font-size', self.opts['font-size']);

    //Hide the margin 
    $(self.ptr).css('margin-top', '-' + (self.opts['border-height'] + self.opts.height) + 'px');

    //--- CODE ---

    //--- CODE: HANDLING  ---
    this.loadingStart = function() {
        $(self.ptr).html(self.opts['loading-content']);

        self.opts['callback-loading'](); //Call callback
        //end loadingStart
    }

    this.loadingEnd = function() {
        $(self.ptr).html(self.opts['pre-content']);
        $(self.ptr).css('margin-top', '-' + (self.opts['border-height'] + self.opts.height + 'px'));

        //end loadingEnd
    }

    //--- CODE: EVENTS  ---

    //EVENT: MOUSEUP
    this.isDragging = false; 
    this.isThresholdReached = false;
    this.posStart = 0;

    $(content).on('mousedown touchstart', function(event){

        event.stopImmediatePropagation();

        self.isDragging = true;
        self.isThresholdReached = false; 

        self.posStart = event.pageY;
        
        //end mousedown touchstart
    });

    //EVENT: MOUSEUP
    $(content).on('mousemove touchmove', function(event){
        if (!self.isDragging) return;

        event.stopImmediatePropagation();
        
        //Calculate the drga distance 
        var dragDistance = (event.pageY - self.posStart);

        if (dragDistance <= 0) return; //Do not inverse the drag..
        
        var newMargin = (self.opts['border-height'] + (self.opts.height - dragDistance));
        if (newMargin <= 0) return;

        //Update 
        if (newMargin <= self.opts.threshold) {
            self.isThresholdReached = true; 
        }

        $(self.ptr).css('margin-top', '-' + (newMargin + 'px'));

        
        //end mousemove touchmove
    });

    //EVENT: MOUSEUP
    $(document).on('mouseup touchend', function(event){
        if (!self.isDragging) return;

        event.stopImmediatePropagation();
        
        //  console.log(event);

        if (self.isThresholdReached) {

            //Set margin to show entire 
            $(self.ptr).css('margin-top', '0px');

            self.isDragging = false;
            self.isThresholdReached = false;
            
            self.loadingStart();
            return;
        }

        //Reset margin 
        $(self.ptr).css('margin-top', '-' + (self.opts['border-height'] + self.opts.height + 'px'));

        self.isDragging = false; 
        self.isThresholdReached = false;

        //end mouseup touchend
    });


    //end PullToReload
}


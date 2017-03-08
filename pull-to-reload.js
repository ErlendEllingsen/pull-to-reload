/**
*
* pull-to-reload
*
* A pull-to-reload system that is compatible with both both web and mobile.
* Configurable with loads of options.
*
* @author Erlend Ellingsen <erlend.ame@gmail.com>
* @copyright MIT, Erlend Ellingsen
* @version	1.1.5	08.03.2017
*/

var PullToReload = function (optsUser) {
	var self = this;

    // --- OPTIONS ---
	this.opts = {
		'refresh-element': 'ptr', // Required
		'content-element': 'content', // Required
		'border-height': 1,
		height: 80,
		'font-size': '30px',
		threshold: 20,
		'pre-content': '...',
		'loading-content': 'Loading...',
		'callback-loading': function () {
			setTimeout(function () {
				self.loadingEnd();
			}, 1000);
		} // Required
	};

    // Overwrite options with user-options if present
	for (var prop in self.opts) {
		if (optsUser[prop] !== undefined) {
			self.opts[prop] = optsUser[prop];
		}
	}

    // --- INIT CODE ---
	this.ptr = document.querySelector('#' + self.opts['refresh-element']);
	this.content = document.querySelector('#' + self.opts['content-element']);

    // --- STYLING ---

    // Set style
	this.ptr.style.padding = '0px';
	this.ptr.style.margin = '0px';
	this.ptr.style.display = 'block';
	this.ptr.style.height = self.opts.height + 'px';
	this.ptr.style.border = self.opts['border-height'] + 'px solid #000';
	this.ptr.style.borderTop = '0px';
	this.ptr.style.borderLeft = '0px';
	this.ptr.style.borderRight = '0px';
	this.ptr.style.textAlign = 'center';
	this.ptr.style.lineHeight = self.opts.height + 'px';
	this.ptr.style.fontSize = self.opts['font-size'];

    // Hide the margin
	this.ptr.style.marginTop = '-' + (self.opts['border-height'] + self.opts.height) + 'px';

    // --- CODE ---

    // --- CODE: HANDLING  ---
	this.loadingStart = function () {
		this.ptr.innerHTML = self.opts['loading-content'];

		self.opts['callback-loading'](); // Call callback
        // end loadingStart
	};

	this.loadingEnd = function () {
		this.ptr.innerHTML = self.opts['pre-content'];
		this.ptr.style.marginTop = '-' + (self.opts['border-height'] + self.opts.height + 'px');

        // end loadingEnd
	};

    // --- CODE: COMMON FUNCS ---
	this.getPageY = function (event) {
		if (event.pageY === undefined && event.touches !== undefined) {
			if (event.touches.length <= 0) {
				return false;
			}
			event.pageY = event.touches[event.touches.length - 1].pageY;
		}
		return event.pageY;

        // end getPageY
	};

    // --- CODE: EVENTS  ---

    // EVENT: MOUSEUP
	this.isDragging = false;
	this.isThresholdReached = false;
	this.posStart = 0;

	self.content.addEventListener('touchstart', function (event) {
		self.mouseStart(event);
	});

	self.content.addEventListener('mousedown', function (event) {
		self.mouseStart(event);
	});

	this.mouseStart = function (event) {

		//Prevent PTR if position is beyond content start.
		if (document.body.scrollTop >= self.content.getBoundingClientRect().top) {
			return;
		}

		self.isDragging = true;
		self.isThresholdReached = false;

		self.posStart = self.getPageY(event);

        // end mousedown touchstart
	};

    // EVENT: MOUSEUP
	document.addEventListener('touchmove', function (event) {
		self.mouseMove(event);
	});

	document.addEventListener('mousemove', function (event) {
		self.mouseMove(event);
	});

	this.mouseMove = function (event) {

		//Prevent PTR if position is beyond content start.
		if (document.body.scrollTop >= self.content.getBoundingClientRect().top) {
			return;
		}

		if (!self.isDragging) {
			return;
		}

        // Calculate the drag distance
        // Android / Chrome compability. Sometimes consists of a list of touches.
		event.pageY = self.getPageY(event);
		if (event.pageY === false) {
			return;
		}

		var dragDistance = (event.pageY - self.posStart);

		if (dragDistance <= 0) {
			return;
		} // Do not inverse the drag..

		//Prevent defaults after dragDistance-check. (We still want to keep site scrolling functionality.)
		event.preventDefault();
		event.stopImmediatePropagation();

		var newMargin = (self.opts['border-height'] + (self.opts.height - dragDistance));
		if (newMargin <= 0) {
			return;
		}

        // Update
		if (newMargin <= self.opts.threshold) {
			self.isThresholdReached = true;
		}

		self.ptr.style.marginTop = '-' + (newMargin + 'px');

        // end mousemove touchmove
	};

    // EVENT: MOUSEUP
	document.addEventListener('touchend', function (event) {
		self.mouseEnd(event);
	});
	document.addEventListener('mouseup', function (event) {
		self.mouseEnd(event);
	});

	this.mouseEnd = function (event) {

		//Prevent PTR if position is beyond content start.
		if (document.body.scrollTop >= self.content.getBoundingClientRect().top) {
			return;
		}

		if (!self.isDragging) {
			return;
		}

		event.preventDefault();
		event.stopImmediatePropagation();

		if (self.isThresholdReached) {
            // Set margin to show entire
			self.ptr.style.marginTop = '0px';

			self.isDragging = false;
			self.isThresholdReached = false;

			self.loadingStart();
			return;
		}

        // Reset margin
		self.ptr.style.marginTop = '-' + (self.opts['border-height'] + self.opts.height + 'px');

		self.isDragging = false;
		self.isThresholdReached = false;

        // end mouseup touchend
	};

    // end PullToReload
};

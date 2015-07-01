$(function() { // Create plugins
	$.fn.extend({ // Extend jQuery prototype ($.fn) object to provide new methods that can be chained to the jQuery() function
		halloActivate: function(options) {
			options = options || {};
			var $this = $(this),
				$modified = $('#modified'),
				e = options.event;
			if (e != null) {
				$this.addClass('editable--active');
				$this.hallo({
					editable: true, //activate hallo editables
					plugins: { //add basic editing toolbar (no icon images yet). Issue: Shows on first active editable, then "not found"
						'halloformat': {
							'bold': true,
							'italic': true
						}
					},
					toolbar: 'halloToolbarFixed'
				});
				$modified.html("Editable is active");
			}
			if (options.deactivateSiblings) { 
				$this.halloDeactivateSiblings(); 
			}
		},
		// Find and activate closest editable parent element
		// E.g. click on a paragraph and activate the outer div
		halloActivateClosestEditableParent: function(e) {
			var $this = $(this),
				$target = $(e.target),
				$toActivate = $target.closest('.editable');
			$($toActivate[0]).halloActivate({ 
				event: e, 
				deactivateSiblings: true 
			});
		},
		halloDeactivate: function(e) {
			var $this = $(this);
			$this.removeClass('editable--active');
			$this.hallo({
				editable: false, //deactive hallo editables
				plugins: {
					'halloformat': {
						'bold': true,
						'italic': true
					}
				},
				toolbar: 'halloToolbarFixed' //duplicated from above, but by adding again it shows up on all active editables
			});
			$this.trigger('hallodeactivated');
		},
		// When you activate a new element, deactive previously active element
		// Only one editable should be active at a time
		halloDeactivateSiblings: function(e) {
			var $this = $(this),
				$parent = $this.parent();
			$parent.children('.editable').each(function() {
				if ($(this)[0] !== $this[0]) {
					$(this).halloDeactivate();
				}
			});
		},
		// Extract duplicate plugin code to own method.
		// Todo: successfully call this from halloActivate and halloDeactivate
		halloShowToolbar: function(e) {
			var $this = $(this);
			$this.hallo({
				plugins: {
					'halloformat': {
						'bold': true,
						'italic': true
					}
				},
				toolbar: 'halloToolbarFixed'
			});
		}
	});

	$('.editable').on('click', $.fn.halloActivateClosestEditableParent.bind($(this)));

	// // Future use - introduce react classes for hallo editables
	// React.createClass({
	// 	componentDidMount: function() {
	// 		$this = React.findDOMNode(this);
	// 		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
	// 		$this.on('click', this.clickCallback);
	// 	},
	// 	componentWillUnmount: function() {
	// 		$this.off('click');
	// 	},
	// 	render: function() {} //this should return div
	// 	// how to deal with state? 
	// });

	// Not working: Double click on wrapper to deactivate all editables
	$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($(this)));

	// Use hallo events to track modified status of editable
	// Link multiple actions onto same class selector
	var $modified = $('#modified');
	$('.editable').bind('hallomodified', function(event, data) {
		$modified.html("Editable has been modified"); //detects adding and deleting characters
	}).bind('halloselected', function(event, data) {
		$modified.html("Selection made"); //detects highlighting
	}).bind('hallounselected', function(event, data) {
		$modified.html("Selection removed"); //detects un-highlighting
	});

	$('.editable--spreadsheet').bind('hallodeactivated', function() {
		var $this = $(this),
			html = $this.html();
			// Add $().tableToJSON() here to convert
	});

	// Click link to add new editable
	$('body').on('click', '.add-editable', function() {
		$('<div class="editable"><p></p></div>').insertBefore($(this));
		// Issue: new editables don't inherit/have event listeners
		// http://stackoverflow.com/questions/15090942/jquery-even-handler-not-working-on-dynamic-content
		// http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements?lq=1
		// http://api.jquery.com/on/#direct-and-delegated-events
	});
});
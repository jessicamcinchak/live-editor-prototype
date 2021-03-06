/** jQuery plugins and helper functions */
$(function() {
	$.fn.extend({ // '$.fn' extends jQuery prototype object with new methods that can be chained to the jQuery() function
		
		/**
		 * Activate editable
		 * @param {object} options - Options object with key 'event'
		 */
		halloActivate: function(options) {
			options = options || {};
			var $this = $(this),
				$modified = $('#modified'),
				e = options.event;
			if (e != null) {
				$this.addClass('editable--active');
				$this.hallo({
					editable: true, //activate hallo editables
					plugins: { //add basic editing toolbar (no icon images yet). Additional plugins available to set h1, h2, p etc.
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

		/**
		 * Find and activate closest editable parent element. E.g. click on a paragraph and activate the whole outer div
		 * @param {event} e
		 */
		halloActivateClosestEditableParent: function(e) {
			var $this = $(this),
				$target = $(e.target),
				$toActivate = $target.closest('.editable');
			$($toActivate[0]).halloActivate({ 
				event: e, 
				deactivateSiblings: true 
			});
		},

		/**
		 * Deactivate editable
		 * @param {event} e
		 */
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
				toolbar: 'halloToolbarFixed' //repeated here to show beyond first activated editable
			});
			$this.trigger('hallodeactivated');
		},

		/** 
		 * Deactivate previously active element when you activate a new element
		 * @param {event} e
		 */
		halloDeactivateSiblings: function(e) {
			var $this = $(this),
				$parent = $this.parent();
			$parent.children('.editable').each(function() {
				if ($(this)[0] !== $this[0]) {
					$(this).halloDeactivate();
				}
			});
		}
	});
});
'use strict';
define([
	'jquery',
	'fastclick',
	'lodash',
	'backbone',
	'app/router'
], function($, FastClick, _, Backbone, Router) {
	var initialize = function() {
		// Pass in our Router module and call it's initialize function
		$(function() {
			Router.initialize();
			FastClick.attach(document.body);
			console.log('App is running');
		});
	};
	return {
		initialize: initialize
	};
});

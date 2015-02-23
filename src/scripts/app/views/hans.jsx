/**
 * @jsx React.DOM
 */
define(function(require) {
	'use strict';
	// imports
	var View = require('backbone').View;
	var React = require('react');

	/**
	 * HansPage wrapper.
	 *
	 * @class HansPage
	 * @namespace
	 */
	var HansComponent = React.createClass({
		handleClick: function() {
			alert('Hello!');
		},
		render: function() {
			return <div>BleuBleu</div>;
		}
	});
	var HansPage = View.extend({
		el: '.page-container',
		template: '<div id="hans-page page"></div>',
		render: function() {
			this.$el.html(this.template);
			React.render(<HansComponent/>, document.body);
		}
	});

	// exports
	return HansPage;
});

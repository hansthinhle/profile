/*!
 * Hans_Profile_Website v1.0.0 - Hans Profile Website
 * Url:
 * Copyright (c) Hans Thinh Le — @HansThinhLe — http://thinhle.info
 * License: ISC
 */
define([
	'jquery',
	'lodash',
	'backbone',
	'jsx!app/views/hans'/*,
	'app/views/profile',
	'app/views/skills',
	'app/views/work-and-education',
	'app/views/portfolio',
	'app/views/contacts'*/
], function($, _, Backbone, HansPage/*, ProfilePage, SkillsPage, WorkEduPage, PortfolioPage, ContactsPage*/) {
	'use strict';
	var config = {
		blogURL : 'http://blog.thinhle.info'
	};
	var Router = Backbone.Router.extend({
		routes: {
			'': 'hans',
			'hans': 'hans',
			'blog':'blog'
		}
	});

	var initialize = function() {

		/*
		+ Hans
		+ Profile
		+ Blog
		+ Skills
		+ Work & Education
		+ Portfolio
		+ Contacts
		 */

		var router = new Router();
		var hansPage = new HansPage();
		/*var profilePage = new ProfilePage();
		var skillsPage = new SkillsPage();
		var workEduPage = new WorkEduPage();
		var portfolioPage = new PortfolioPage();
		var contactsPage = new ContactsPage();*/

		router.on('route:hans', function() {
			hansPage.render();
			console.log('Router is running');
		});

		/*router.on('route:profile', function() {
			profilePage.render();
		});

		router.on('route:skills', function() {
			skillsPage.render();
		});

		router.on('route:work-and-education', function() {
			workEduPage.render();
		});

		router.on('route:portfolio', function() {
			portfolioPage.render();
		});

		router.on('route:contacts', function() {
			contactsPage.render();
		});*/

		router.on('route:blog', function() {
			location.href = config.blogURL;
		});

		Backbone.history.start();

	};
	return {
		initialize: initialize
	};
});
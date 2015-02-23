require.config({
	paths: {
		'app': 'app',
		'backbone': 'vendors/backbone/backbone',
		'react': 'vendors/react/react-with-addons',
		'jsx': 'vendors/requirejs-react-jsx/jsx',
		'text': 'vendors/requirejs-text/text',
		'lodash': 'vendors/lodash/lodash',
		'fastclick': 'vendors/fastclick/lib/fastclick',
		'modernizr': 'vendors/modernizr/modernizr',
		'bootstrap': 'vendors/bootstrap-sass/assets/javascripts/bootstrap.min',
		'jquery': 'vendors/jquery/dist/jquery',
		'react.backbone': 'vendors/react.backbone/react.backbone',
		'JSXTransformer': 'vendors/react/JSXTransformer'
	},
	shim: {
		'backbone': {
			deps: ['jquery', 'lodash']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'modernizr': {
			exports: 'Modernizr'
		},
		'JSXTransformer': {
			exports: 'JSXTransformer'
		},
		'app': ['backbone', 'react', 'react.backbone', 'modernizr', 'bootstrap']
	},
	map: {
		'backbone': {
			'underscore': 'lodash'
		},
		'react.backbone': {
			'underscore': 'lodash'
		}
	},
	jsx: {
		fileExtension: '.jsx',
		transformOptions: {
			harmony: true,
			stripTypes: false
		},
		usePragma: false
	},
	deps: ['bootstrap'],
	baseUrl: 'scripts'
});
require(['app/app'], function(App) {
	'use strict';
	App.initialize();
});

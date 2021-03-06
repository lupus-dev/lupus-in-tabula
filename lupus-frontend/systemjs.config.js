(function (global) {
	System.config({
		paths: {
			// paths serve as alias
			'npm:': 'node_modules/'
		},
		// map tells the System loader where to look for things
		map: {
			// our app is within the build folder
			app: 'build',
			// angular bundles
			'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
			'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
			'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
			// other libraries
			'rxjs':                       'npm:rxjs',
			'angular2-cookie':            'npm:angular2-cookie',
			'ng2-slim-loading-bar':       'npm:ng2-slim-loading-bar',
			'socket.io-client':           'npm:socket.io-client'
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			app: {
				main: './main.js',
				defaultExtension: 'js'
			},
			rxjs: {
				defaultExtension: 'js'
			},
			'angular2-cookie': {
				main: './core.js',
				defaultExtension: 'js'
			},
			'ng2-slim-loading-bar': {
				main: 'index.js',
				defaultExtension: 'js'
			},
			'socket.io-client': {
				main: 'socket.io.js',
				defaultExtension: 'js'
			}
		}
	});
})(this);

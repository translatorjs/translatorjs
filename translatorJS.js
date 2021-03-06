'use strict';

/**
 * i18n: Micro implementation of a translation system
 *
 * The goal is to provide a very light plugin to handle translations. It is inspired on i18next-client
 *
 * author: Jean-Christophe Cuvelier <cybertotophe@gmail.com>
 *
 * @returns {{init: Function, t: Function}}
 */

var i18n = function () {

	var i18n = {
		translations: {
			dev: {
				hello: 'Hello, World!'
			}
		},
		language: 'dev'
	};

	var init = function (options) {
		options = options || {};

		if (typeof options.language != "undefined") {
			i18n.language = options.language;
		} else if (typeof window != "undefined") {
			var language = detectLanguage();
			if (language) {
				i18n.language = language;
			}
		}

		if (typeof options.translations != "undefined") {
			merge(i18n.translations, options.translations);
		}
	};

	var reset = function (options) {
		options = options || {};

		if (typeof options.language != "undefined") {
			i18n.language = options.language;
		} else if (typeof window != "undefined") {
			var language = detectLanguage();
			if (language) {
				i18n.language = language;
			}
		}

		if (typeof options.translations != "undefined") {
			i18n.translations = options.translations;
		}
	};

	var merge = function (destination, source) {
		if (typeof source == "object") {
			for (var property in source) {
				if (typeof destination[property] == "undefined") {
					destination[property] = source[property];
				} else if (typeof source[property] == "object") {
					merge(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
		}
	};

	var detectLanguage = function () {
		var nav = window.navigator,
			browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
			i,
			language;

		// support for HTML 5.1 "navigator.languages"
		if (Array.isArray(nav.languages)) {
			for (i = 0; i < nav.languages.length; i++) {
				language = nav.languages[i];
				if (language && language.length) {
					return language;
				}
			}
		}

		// support for other well known properties in browsers
		for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
			language = nav[browserLanguagePropertyKeys[i]];
			if (language && language.length) {
				return language;
			}
		}

		return undefined;
	};

	var getLexicon = function () {
		var lexicon = i18n.translations.dev;

		if (i18n.language != 'dev' && typeof i18n.translations[i18n.language] != "undefined") {
			lexicon = i18n.translations[i18n.language];
		}

		return lexicon;
	};

	var getFallback = function (key) {
		var translation = reference(i18n.translations.dev, key);

		if (typeof translation == "undefined") {
			translation = key;
		}
		return translation;
	};

	var getTranslation = function (key) {
		var translation = reference(getLexicon(), key);

		if (typeof translation == "undefined") {
			translation = getFallback(key);
		}
		return translation;
	};

	var replace = function (string, variables) {
		for (var property in variables) {
			string = string.replace('__' + property + '__', variables[property]);
		}

		return string;
	};

	var reference = function (obj, str) {
		str = str.split(".");
		for (var i = 0; i < str.length; i++) {
			if (typeof obj != "undefined") {
				obj = obj[str[i]];
			} else {
				return undefined;
			}
		}

		return obj;
	};

	var translate = function (key, variables) {
		var translation = getTranslation(key);

		if (typeof variables != "undefined") {
			translation = replace(translation, variables);
		}

		return translation;
	};

	return {
		init: init,
		t: translate,
		reset: reset
	}
};

module.exports = new i18n;
'use strict';

describe("translatorJS initialization", function() {

	var i18n = require('./../../translatorJS.js');

	it("Should be initialized", function() {
		i18n.init();

		expect(i18n.t('hello')).toEqual("Hello, World!");
	});

});

describe("translatorJS translation tests", function() {

	var i18n = require('./../../translatorJS.js');

	beforeEach(function () {
		i18n.reset({translations:{dev:{}}});
	});

	it("Should be empty", function() {
		expect(i18n.t('hello')).toEqual("hello");
	});

	it("Should translate", function() {
		i18n.init({translations:{dev: {hello: "Hello, Dev!"}, en: {hello: "Hello, World!"}},language:"en"});

		expect(i18n.t('hello')).toEqual("Hello, World!");
	});

	it("Should have a fallback", function() {
		i18n.init({translations:{dev: {hello: "Hello, World!"}, en: {world: "Hello"}},language:"en"});

		expect(i18n.t('hello')).toEqual("Hello, World!");
	});

	it("Should translate with structure", function() {
		i18n.init({translations:{dev: {}, en: {foo: {bar: "Fubar"}}},language:"en"});

		expect(i18n.t('foo.bar')).toEqual("Fubar");
	});

	it("Should translate with variables", function() {
		i18n.init({translations:{dev: {hello: "Hello, __name__!"}},language:"en"});

		expect(i18n.t('hello', {name: "Dave"})).toEqual("Hello, Dave!");
	});

	describe("translatorJS should merge translations", function () {

		beforeEach(function () {
			i18n.reset({translations:{dev: {hello: "Hello, World!"}}});
		});

		it("Should add an entry without removing the previous one", function () {
			i18n.init({translations:{dev: {goodbye: "Goodbye, World!"}}});

			expect(i18n.t('hello')).toEqual("Hello, World!");
			expect(i18n.t('goodbye')).toEqual("Goodbye, World!");
		});

		it("Should replace an entry without destroing previous one", function () {
			i18n.init({translations:{dev: {goodbye: "Goodbye, World!"}}});
			i18n.init({translations:{dev: {hello: "Hello, Dev!"}}});

			expect(i18n.t('hello')).toEqual("Hello, Dev!");
			expect(i18n.t('goodbye')).toEqual("Goodbye, World!");
		});

	});

});
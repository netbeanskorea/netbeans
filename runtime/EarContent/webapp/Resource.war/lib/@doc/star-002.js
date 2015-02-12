/**
 * @fileOverview STAR UI RA Reference Manual
 * @author STAR UI RA Part
 * @version 1.5
 * 
 * TODO: layer, autocomplete, image
 * 
 * 
 * html ... load-start
 * external scripts ... load
 * star script ... load
 * project script ... load
 * html ... load-finish
 * star script ... init
 * component ... render
 * component ... init
 * 
 * 
 * html ... load-start
 * html ... hide
 * script loader ... load
 * scripts ... load-start
 *   external core script (jquery, jquerymobile)
 *   star script
 *   project script
 * html ... load-finish
 * scripts ... load-finish
 * component #1 script ... load-start
 *   external component script
 *   star component script
 * component #2 script ... load-start
 * component #1 script ... load-finish
 * component #1 ... render
 * component #2 script ... load-finish
 * component #2 ... render
 * html ... show
 * component #1 ... init
 * component #2 ... init
 * 
 * 
 * 
 * $(function() {
 *   $('#component1').Component1({
 *   });
 *   $('#component2').Component2({
 *   });
 * });
 * 
 * 
 * require(['project'], function() {
 *   $('#component1').Component1({
 *   });
 *   $('#component2').Component2({
 *   });
 * });
 */

(function(window) {

	var $ = window.jQuery;

	var require = window.require || function() {
		$.star.init();

		switch (arguments.length) {
			case 1:
				return arguments[0]();
			case 2:
				return arguments[1]();
			default:
				console.error(arguments);

				throw new Error();
		}
	};

	if (window.require === undefined)
		window.require = require;

	/////////////////////////////////////////////////////////////////////////
	//	JavaScript + DOM + jQuery Documentation
	/////////////////////////////////////////////////////////////////////////

	/**
	 * <p>객체 레퍼 생성.</p>
	 * <p/>
	 * <p>The Object constructor creates an object wrapper for the given value. If the value is null or undefined, it will create and return an empty object, otherwise, it will return an object of a type that corresponds to the given value.</p>
	 * <p>When called in a non-constructor context, Object behaves identically.</p>
	 * 
	 * @name Object
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Object">Mozilla Developer Network</a>
	 */

	/**
	 * Returns a reference to the Object function that created the instance's prototype. Note that the value of this property is a reference to the function itself, not a string containing the function's name, but it isn't read only (except for primitive Boolean, Number or String values: 1, true, "read-only").
	 * 
	 * @name Object.constructor
	 * @field
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Object/constructor">Mozilla Developer Network</a>
	 */

	/**
	 * The String global object is a constructor for strings, or a sequence of characters.
	 * 
	 * @name String
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/String">Mozilla Developer Network</a>
	 */

	/**
	 * <p>The length of a string.</p>
	 * <p/>
	 * <p>This property returns the number of code units in the string. UTF-16, the string format used by JavaScript, uses a single 16-bit code unit to represent the most common characters, but needs to use two code units for less commonly-used characters, so it's possible for the value returned by length to not match the actual number of characters in the string.</p>
	 * <p>For an empty string, length is 0.</p>
	 * 
	 * @name String#length
	 * @field
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/String/length">Mozilla Developer Network</a>
	 */

	/**
	 * The Number JavaScript object is a wrapper object allowing you to work with numerical values. A Number object is created using the Number() constructor.
	 * 
	 * @name Number
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Number">Mozilla Developer Network</a>
	 */

	/**
	 * <p>Returns the primitive value of a Number object.</p>
	 * <p/>
	 * <p>The valueOf method of Number returns the primitive value of a Number object as a number data type.</p>
	 * <p>This method is usually called internally by JavaScript and not explicitly in code.</p>
	 * 
	 * @name Number#valueOf
	 * @field
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Number/valueOf">Mozilla Developer Network</a>
	 */

	/**
	 * The Boolean object is an object wrapper for a boolean value.
	 * 
	 * @name Boolean
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Boolean">Mozilla Developer Network</a>
	 */

	/**
	 * <p>Returns the primitive value of a Boolean object.</p>
	 * 
	 * <p>The valueOf method of Boolean returns the primitive value of a Boolean object or literal Boolean as a Boolean data type.</p>
	 * <p>This method is usually called internally by JavaScript and not explicitly in code.</p>
	 * 
	 * @name Boolean#valueOf
	 * @field
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Boolean/valueOf">Mozilla Developer Network</a>
	 */

	/**
	 * The JavaScript Array global object is a constructor for arrays, which are high-level, list-like objects.
	 * 
	 * @name Array
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Array">Mozilla Developer Network</a>
	 */

	/**
	 * An unsigned, 32-bit integer that specifies the number of elements in an array.
	 * 
	 * @name Array#length
	 * @field
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Array/length">Mozilla Developer Network</a>
	 */

	/**
	 * Mutates an array by appending the given elements and returning the new length of the array.
	 * 
	 * @name Array#push
	 * @function
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Array/push">Mozilla Developer Network</a>
	 */

	/**
	 * Every function in JavaScript is actually a Function object.
	 * 
	 * @name Function
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Function">Mozilla Developer Network</a>
	 */

	/**
	 * Calls a function with a given this value and arguments provided as an array.
	 * 
	 * @name Function#apply
	 * @function
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Function/apply">Mozilla Developer Network</a>
	 */

	/**
	 * Calls a function with a given this value and arguments provided individually.
	 * 
	 * @name Function#call
	 * @function
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/Function/call">Mozilla Developer Network</a>
	 */

	/**
	 * The JSON object contains methods for converting values to JavaScript Object Notation (JSON) and for converting JSON to values.
	 * 
	 * @name JSON
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/JSON">Mozilla Developer Network</a>
	 */

	/**
	 * Parse a string as JSON, optionally transforming the value produced by parsing.
	 * 
	 * @name JSON#parse
	 * @function
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/JSON/parse">Mozilla Developer Network</a>
	 */

	/**
	 * Convert a value to JSON, optionally replacing values if a replacer function is specified, or optionally including only the specified properties if a replacer array is specified.
	 * 
	 * @name JSON#stringify
	 * @function
	 * @see <a href="https://developer.mozilla.org/ko/docs/JavaScript/Reference/Global_Objects/JSON/stringify">Mozilla Developer Network</a>
	 */

	/**
	 * jQuery STAR 플러그인 확장.
	 * 
	 * @name jQuery
	 * @class
	 * @see $
	 * @see <a href="http://api.jquery.com/">jQuery API</a>
	 */

	/**
	 * jQuery Static Member.
	 * 
	 * @name $
	 * @class
	 * @see jQuery
	 */

	/**
	 * jQuery Instance Member.
	 * 
	 * @name $.fn
	 * @class
	 */

	(function() {
	});

	///////////////////////////////////////////////////////////////////////////
	// Browser: Console Wrapper
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 브라우저에서 제공하는 콘솔 객체로 브라우저에서 지원하지 않을 경우 아무런 기능을 안함.
	 * 
	 * The console object provides access to the browser's debugging console. The specifics of how it works vary from browser to browser, but there is a de facto set of features that are typically provided.
	 * 
	 * @name console
	 * @class
	 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console">Mozilla Developer Network</a>
	 * @see <a href="http://getfirebug.com/wiki/index.php/Console_API">FireBug Console API</a>
	 * @see <a href="http://getfirebug.com/wiki/index.php/Command_Line_API">FireBug Command Line API</a>
	 * @see <a href="http://developer.apple.com/library/safari/#documentation/AppleApplications/Conceptual/Safari_Developer_Guide/DebuggingYourWebsite/DebuggingYourWebsite.html#//apple_ref/doc/uid/TP40007874-CH8-SW20">Safari JavaScript Console API</a>
	 */
	var console = window.console === undefined ? window.console = {} : window.console;

	if (console.debug === undefined)
		/**
		 * Outputs a message to the Web Console.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.debug">Mozilla Developer Network</a>
		 */
		console.debug = $.noop;

	if (console.dir === undefined)
		/**
		 * Displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.dir">Mozilla Developer Network</a>
		 */
		console.dir = $.noop;

	if (console.error === undefined)
		/**
		 * Outputs an error message to the Web Console.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.error">Mozilla Developer Network</a>
		 */
		console.error = $.noop;

	if (console.group === undefined)
		/**
		 * Creates a new inline group in the Web Console log. This indents all following output by an additional level, until console.groupEnd() is called.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.group">Mozilla Developer Network</a>
		 */
		console.group = $.noop;

	if (console.groupCollapsed === undefined)
		/**
		 * Creates a new inline group in the Web Console. Unlike console.group(), however, the new group is created collapsed. The user will need to use the disclosure button next to it to expand it, revealing the entries created in the group.
		 * Call console.groupEnd() to back out to the parent group.
		 * See Using groups in the console in the console documentation for details and examples.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.groupCollapsed">Mozilla Developer Network</a>
		 */
		console.groupCollapsed = $.noop;

	if (console.groupEnd === undefined)
		/**
		 * Exits the current inline group in the Web Console. See Using groups in the console in the console documentation for details and examples.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.groupEnd">Mozilla Developer Network</a>
		 */
		console.groupEnd = $.noop;

	if (console.info === undefined)
		/**
		 * Outputs an informational message to the Web Console. In Firefox, a small "i" icon is displayed next to these items in the Web Console's log.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.info">Mozilla Developer Network</a>
		 */
		console.info = $.noop;

	if (console.log === undefined)
		/**
		 * Outputs a message to the Web Console.
		 * 
		 * @param {String} msg
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.log">Mozilla Developer Network</a>
		 */
		console.log = $.noop;

	if (console.time === undefined)
		/**
		 * Starts a timer you can use to track how long an operation takes. You give each timer a unique name, and may have up to 10,000 timers running on a given page. When you call console.timeEnd() with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.
		 * See Timers in the console documentation for details and examples.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.time">Mozilla Developer Network</a>
		 */
		console.time = $.noop;

	if (console.timeEnd === undefined)
		/**
		 * Stops a timer that was previously started by calling console.time().
		 * See Timers in the console documentation for details and examples.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.timeEnd">Mozilla Developer Network</a>
		 */
		console.timeEnd = $.noop;

	if (console.trace === undefined)
		/**
		 * Outputs a stack trace to the Web Console.
		 * See Stack traces in the console documentation for details and examples.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.trace">Mozilla Developer Network</a>
		 */
		console.trace = $.noop;

	if (console.warn === undefined)
		/**
		 * Outputs a warning message to the Web Console.
		 * 
		 * @see <a href="https://developer.mozilla.org/ko/docs/DOM/console.warn">Mozilla Developer Network</a>
		 */
		console.warn = $.noop;

	/////////////////////////////////////////////////////////////////////////
	// External Library
	/////////////////////////////////////////////////////////////////////////

	if ($.blockUI !== undefined)
		$.blockUI.defaults.baseZ = 20000; // qtip = 15000+

	/////////////////////////////////////////////////////////////////////////
	// STAR
	/////////////////////////////////////////////////////////////////////////

	if ($.star === undefined)
		$.star = {};

	var star = $.star;

	/**
	 * 내부 네임스페이스.
	 * 
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 */
	star = {

		/**
		 * [설정] 로케일.
		 * 
		 * @type String
		 * @default 'ko'
		 * @deprecated 준비중
		 */
		locale: 'ko',

		/**
		 * [설정] 날짜 포멧.
		 * 
		 * @type String
		 * @default 'yyyy-MM-dd'
		 * @deprecated 준비중
		 */
		date: 'yyyy-MM-dd',

		/**
		 * [설정] 대상 기기. desktop or mobile (phone or tablet).
		 */
		device: 'desktop',

		browser: {}

	};

	$.star = star;
	window.star = star;

	// star.js 파일을 기반으로 루트 디렉토리 찾기
	$($('script').get().reverse()).each(function() {
		var s = $(this);
		var src = s.attr('src');

		if (!src)
			return;

		var index = src.indexOf('lib/star.js');

		if (index !== -1) {
			var url = src;

			if (src[0] !== '/') {
				var href = window.location.href;

				index = href.lastIndexOf('/');

				if (index === href.length - 1)
					url = href + src;
				else
					url = href.substring(0, index + 1) + src;
			}

			star.root = url.replace('lib/star.js', '');

			return false;
		}
	});

	if ($.browser.msie === true) {
		switch ($.browser.version) {
			case '7.0':
				star.browser.ie7 = true;
				break;
			case '8.0':
				star.browser.ie8 = true;
				break;
			case '9.0':
				star.browser.ie9 = true;
				break;
			// TODO: IE 10
		}
	}

	/**
	 * @ignore
	 */
	star.init = function(callback) {
		if ($.isFunction(callback) === true) {
			star.init._run.push(callback);

			if (star.init._init === true)
				callback();

			return;
		}

		if (star.init._init === true)
			return;

		for ( var i = 0, l = star.init._run.length; i < l; i++)
			star.init._run[i]();

		star.init._init = true;
	};

	star.init._init = false;
	star.init._run = [];

	$(function() {
		star.init();
	});

	/**
	 * jQuery 플러그인 정의.
	 * 
	 * @param {String} name
	 * @param {Function} func
	 * @inner
	 */
	star.define = function(name, func) {
		func._super = $.fn[name];

		$.fn[name] = func;
	};

	/**
	 * jQuery 상위 메소드 호출.
	 * 
	 * @private
	 * @param {Object} obj
	 * @param {Object} args
	 * @returns {Object}
	 */
	star.callSuper = function(obj, args) {
		if (args.callee._super !== undefined)
			return args.callee._super.apply(obj, args);

		return obj;
	};

	/**
	 * @ignore
	 */
	star.option = function(defaults, option) {
		if (defaults === undefined)
			defaults = {};

		return option === undefined ? $.extend(/*true,*/{}, defaults) : $.extend(/*true,*/{}, defaults, option);
	};

	/**
	 * 자신을 포함하여 찾기.
	 * 
	 * @name jQuery#FindAndSelf
	 * @function
	 * @param {star.data.Selector} selector
	 * @returns {jQuery}
	 * @example
	 * var jquery = $.FindAndSelf('selector');
	 * @ignore
	 */
	$.fn.FindAndSelf = function(selector) {
		return this.find(selector).add(this.filter(selector));
	};

	/////////////////////////////////////////////////////////////////////////
	// STAR Data
	/////////////////////////////////////////////////////////////////////////

	/**
	 * UI 라이브러리 내부에서 사용하는 데이터 추상화.
	 * 
	 * @name star.data
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * // 요청 전문 예제
	 * var request = {
	 *   transaction: {
	 *     id: ''
	 *   },
	 *   attributes: {
	 *   },
	 *   dataSet: {
	 *     fields: {
	 *       field1: 'value1',
	 *       field2: 'value2'
	 *     },
	 *     recordSets: {
	 *       rs1: {
	 *         nc_list: [
	 *           { column1: 'value11', column2: 'value12' },
	 *           { column2: 'value21', column2: 'value22' }
	 *         ]
	 *       },
	 *       rs2: {
	 *         nc_list: [
	 *           { column1: 'value11', column2: 'value12' },
	 *           { column2: 'value21', column2: 'value22' }
	 *         ]
	 *       }
	 *     }
	 *   }
	 * }
	 * @example
	 * // 등답 전문 예제
	 * var response = {
	 *   transaction: {
	 *     id: '',
	 *     startDate: '',
	 *     endDate: ''
	 *   },
	 *   attributes: {
	 *   },
	 *   dataSet: {
	 *     message: {
	 *       result: 'OK', // FAIL
	 *       messageId: '',
	 *       messageName: '',
	 *       messageReason: '',
	 *       messageRemark: ''
	 *     },
	 *     fields: {
	 *       field1: 'value1',
	 *       field2: 'value2'
	 *     },
	 *     recordSets: {
	 *       rs1: {
	 *         nc_recordCount: '-1',
	 *         nc_pageNo: '-1',
	 *         nc_recordCountPerPage: '-1',
	 *         nc_totalRecordCount: '-1',
	 *         nc_list: [
	 *           { column1: 'value11', column2: 'value12' },
	 *           { column2: 'value21', column2: 'value22' }
	 *         ]
	 *       },
	 *       rs2: {
	 *         nc_recordCount: '-1',
	 *         nc_pageNo: '-1',
	 *         nc_recordCountPerPage: '-1',
	 *         nc_totalRecordCount: '-1',
	 *         nc_list: [
	 *           { column1: 'value11', column2: 'value12' },
	 *           { column2: 'value21', column2: 'value22' }
	 *         ]
	 *       }
	 *     }
	 *   }
	 * }
	 */
	star.data = {};

	/**
	 * 맵 데이터.
	 * 키와 값이 모두 문자열인 자료형.
	 * 
	 * @name star.data.IMap
	 * @class
	 * @see star.data.Record
	 * @see star.data.Fields
	 * @example
	 * var map = {
	 *   column1: 'value1',
	 *   column2: 'value2'
	 * };
	 */

	/**
	 * 맵 데이터 생성.
	 * 
	 * @name star.data.IMap^2
	 * @function
	 * @returns {star.data.IMap} 데이터
	 * @example
	 * var map = {};
	 */
	$.Map = function() {
		return {};
	};

	/**
	 * 리스트 데이터.
	 * 
	 * @name star.data.IList
	 * @class
	 * @example
	 * var list = [];
	 */

	/**
	 * 리스트 데이터 생성.
	 * 
	 * @name star.data.IList^2
	 * @function
	 * @returns {star.data.IList} 데이터
	 * @example
	 * var list = [];
	 */
	$.List = function() {
		return [];
	};

	/**
	 * 데이터셋 데이터.
	 * 
	 * @name star.data.DataSet
	 * @class
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * // request
	 * var ds = {
	 *   fields: {
	 *     field1: 'value1',
	 *     field2: 'value2'
	 *   },
	 *   recordSets: {
	 *     rs1: {
	 *       nc_list: [
	 *         { column1: 'value11', column2: 'value12' },
	 *         { column2: 'value21', column2: 'value22' }
	 *       ]
	 *     },
	 *     rs2: {
	 *       nc_list: [
	 *         { column1: 'value11', column2: 'value12' },
	 *         { column2: 'value21', column2: 'value22' }
	 *       ]
	 *     }
	 *   }
	 * }
	 * @example
	 * // response
	 * var ds = {
	 *   message: {
	 *     result: 'OK', // FAIL
	 *     messageId: '',
	 *     messageName: '',
	 *     messageReason: '',
	 *     messageRemark: ''
	 *   },
	 *   fields: {
	 *     field1: 'value1',
	 *     field2: 'value2'
	 *   },
	 *   recordSets: {
	 *     rs1: {
	 *       nc_recordCount: '-1',
	 *       nc_pageNo: '-1',
	 *       nc_recordCountPerPage: '-1',
	 *       nc_totalRecordCount: '-1',
	 *       nc_list: [
	 *         { column1: 'value11', column2: 'value12' },
	 *         { column2: 'value21', column2: 'value22' }
	 *       ]
	 *     },
	 *     rs2: {
	 *       nc_recordCount: '-1',
	 *       nc_pageNo: '-1',
	 *       nc_recordCountPerPage: '-1',
	 *       nc_totalRecordCount: '-1',
	 *       nc_list: [
	 *         { column1: 'value11', column2: 'value12' },
	 *         { column2: 'value21', column2: 'value22' }
	 *       ]
	 *     }
	 *   }
	 * }
	 */

	/**
	 * 데이터셋 데이터 생성.
	 * 
	 * @name star.data.DataSet^2
	 * @function
	 * @returns {star.data.DataSet} 데이터셋
	 * @example
	 * var ds = {fields: {}, recordSets: {}};
	 */
	/**
	 * 데이터셋 데이터 생성.
	 * 
	 * @name star.data.DataSet^3
	 * @function
	 * @param {String} key 필드 키
	 * @param {String} value 필드 값
	 * @returns {star.data.DataSet} 데이터셋
	 * @example
	 * var ds = $.DataSet('key', $('#key').Value());
	 * @example
	 * var ds = {fields: {}, recordSets: {}};
	 * ds.fields['key'] = $('#key').Value();
	 */
	/**
	 * @see star.data.DataSet^2
	 */
	$.DataSet = function() {
		switch (arguments.length) {
			case 0:
				return {
					fields: {},
					recordSets: {}
				};
			case 2:
				var ds = {
					fields: {},
					recordSets: {}
				};
				ds.fields[arguments[0]] = arguments[1];

				return ds;
			default:
				throw new Error();
		}
	};

	/**
	 * 필드맵 데이터.
	 * 키와 값이 모두 문자열인 자료형.
	 * 
	 * @name star.data.Fields
	 * @class
	 * @extends star.data.IMap
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * var fields = {
	 *   column1: 'value1',
	 *   column2: 'value2'
	 * };
	 */

	/**
	 * 필드맵 데이터 생성.
	 * 
	 * @name star.data.Fields^2
	 * @function
	 * @returns {star.data.Fields} 필드맵
	 * @example
	 * var fields = {};
	 */
	$.Fields = $.Map;

	/**
	 * 레코드셋맵 데이터.
	 * 키 문자열이고 값은 레코드셋인 자료형.
	 * 
	 * @name star.data.RecordSets
	 * @class
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * var recordSets = {
	 *   rs1: {
	 *     nc_list[]
	 *   },
	 *   rs2: {
	 *     nc_list[]
	 *   }
	 * };
	 */

	/**
	 * 레코드셋맵 데이터 생성.
	 * 
	 * @name star.data.RecordSets^2
	 * @function
	 * @returns {star.data.RecordSets} 레코드셋맵
	 * @example
	 * var rss = {};
	 */
	$.RecordSets = $.Map;

	/**
	 * 레코드셋 데이터.
	 * 
	 * @name star.data.RecordSet
	 * @class
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * // request
	 * var rs = {
	 *   nc_list: [
	 *     { column1: 'value11', column2: 'value12' },
	 *     { column2: 'value21', column2: 'value22' }
	 *   ]
	 * }
	 * @example
	 * // response
	 * var rs = {
	 *   nc_recordCount: '-1',
	 *   nc_pageNo: '-1',
	 *   nc_recordCountPerPage: '-1',
	 *   nc_totalRecordCount: '-1',
	 *   nc_list: [
	 *     { column1: 'value11', column2: 'value12' },
	 *     { column2: 'value21', column2: 'value22' }
	 *   ]
	 * }
	 */

	/**
	 * 레코드셋 데이터 생성.
	 * 
	 * @name star.data.RecordSet^2
	 * @function
	 * @param {star.data.IMap[]} [records] 레코드 배열
	 * @returns {star.data.RecordSet} 레코드셋
	 * @example
	 * var rs = {nc_list: []};
	 * @example
	 * var rs = {nc_list: records};
	 */
	$.RecordSet = function(records) {
		return {
			nc_list: records || []
		};
	};

	/**
	 * 레코드 데이터.
	 * 
	 * @name star.data.Record
	 * @class
	 * @extends star.data.IMap
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * var record = {
	 *   column1: 'value1',
	 *   column2: 'value2'
	 * };
	 */

	/**
	 * 레코드 데이터 생성.
	 * 
	 * @name star.data.Record^2
	 * @function
	 * @returns {star.data.IMap} 레코드
	 * @example
	 * var record = {};
	 */
	$.Record = $.Map;

	/**
	 * jQuery Selector.
	 * 
	 * @name star.data.Selector
	 * @class
	 * @extends String
	 * @star_desktop
	 * @star_mobile
	 * @see http://api.jquery.com/category/selectors/
	 */

	(function() {
	});

	/////////////////////////////////////////////////////////////////////////
	// STAR Service
	/////////////////////////////////////////////////////////////////////////

	/**
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 */
	star.service = {

		/**
		 * [설정] 플렛폼. j2ee or .net.
		 * 
		 * @field
		 * @type String
		 * @default 'j2ee'
		 */
		platform: '.net', // j2ee, .net

		/**
		 * [설정/.NET] 주소.
		 * 
		 * @field
		 * @type String
		 * @default '/web/json.jmd'
		 */
		url: '../web/service/AJAXWebService.asmx/callNCServiceByJSON', //변경
		
		/**
		 * [설정/J2EE] 서비스 주소.
		 * 
		 * @field
		 * @type String
		 * @default '/web/json.jmd'
		 */
		service_url: '/web/json.jmd',

		/**
		 * [설정/J2EE] 로그인 주소.
		 * 
		 * @field
		 * @type String
		 * @default '/web/login.jmd'
		 */
		login_url: '/web/login.jmd',

		/**
		 * [설정/J2EE] 로그아웃 주소.
		 * 
		 * @field
		 * @type String
		 * @default '/web/logout.jmd'
		 */
		logout_url: '/web/logout.jmd',

		/**
		 * [설정] 요청 인터셉터.
		 * 
		 * @field
		 * @type Function
		 * @example
		 * star.service.request = function(ds) {
		 *   for(var rs in ds.recordSets) {
		 *     ds.recordSets[rs.replace('Grid', '')] = ds.recordSets[rs];
		 *
		 *     delete ds.recordSets[rs];
		 *   }
		 *
		 *   return ds;
		 * };
		 */
		request: undefined,

		/**
		 * [설정] 응답 인터셉터.
		 * 
		 * @field
		 * @type Function
		 * @example
		 * star.service.response = function(ds) {
		 *   for(var rs in ds.recordSets) {
		 *     ds.recordSets[rs + 'Grid'] = ds.recordSets[rs];
		 * 
		 *     delete ds.recordSets[rs];
		 *   }
		 * 
		 *   return ds;
		 * };
		 */
		response: undefined,

		/**
		 * [설정] 기본 실패 핸들러.
		 * 
		 * @field
		 * @type Function
		 * @example
		 * star.service.fail = function(ds) {
		 *   window.alert('FAIL: ' + ds.message.messageName);
		 * };
		 */
		fail: function(ds) {
			window.alert('FAIL: ' + ds.message.messageName);
		},

		/**
		 * [설정] 기본 에러 핸들러.
		 * 
		 * @field
		 * @type Function
		 * @example
		 * star.service.error = function(ds) {
		 *   window.alert('ERROR: ' + ds.message.messageName);
		 * };
		 */
		error: function(ds, xhr, status, error) {
			window.alert('ERROR: ' + ds.message.messageName);
		},

		/**
		 * [설정] 서비스 호출하는 동안 화면을 블럭킹할지 여부.
		 * 
		 * @field
		 * @type Boolean
		 * @defaults true
		 */
		block: false,

		/**
		 * [설정] 샘플데이터 사용 여부.
		 * 
		 * @field
		 * @type Boolean
		 */
		sample: false

	};

	/**
	 * @ignore
	 */
	star.service._service = function(url, option) {
		var setting;

		if ($.isPlainObject(option[0])) {
			setting = option[0];
		} else {
			setting = {
				transaction: option[0]
			};

			switch (option.length) {
				case 2:
					if ($.isFunction(option[1]) === false)
						setting.request = option[1];
					else
						setting.success = option[1];
					break;
				case 3:
					setting.request = option[1];

					if ($.isFunction(option[2]) === false)
						setting.response = option[2];
					else
						setting.success = option[2];
					break;
				case 4:
					setting.request = option[1];
					setting.response = option[2];
					setting.success = option[3];
					break;
			}
		}

		if (setting.request === undefined)
			setting.request = {
				fields: {},
				recordSets: {}
			};
		else if (typeof setting.request === 'string')
			setting.request = $(setting.request).DataSet();
		else if (setting.request.jquery !== undefined)
			setting.request = setting.request.DataSet();

		if (typeof setting.response === 'string')
			setting.response = $(setting.response);

		if (star.service.request)
			setting.request = star.service.request(setting.request);

		if (star.service.sample === true) {
			require([ '_sample/_' ], function() {
				console.log('STAR.Service.Request', setting.request);

				if (star.service.block === true && $.blockUI !== undefined)
					$.blockUI({
						message: null
					});

				var transaction = setting.transaction.replace('#', '_');
				var callback = function(ds) {
					console.log('STAR.Service.Response', ds);

					if (star.service.response)
						ds = star.service.response(ds);

					if (ds.message.result === 'OK') {
						if (setting.response)
							setting.response.DataSet(ds);

						if (setting.success)
							setting.success(ds);
					} else {
						if (setting.fail)
							setting.fail(ds);
						else
							star.service.fail(ds);
					}

					if (star.service.block === true && $.unblockUI !== undefined)
						$.unblockUI();
				};

				if (window['_sample_' + transaction])
					callback(window['_sample_' + transaction](setting.request));
				else
					$.getJSON('_sample/' + transaction + '.json', function(data, textStatus, jqXHR) {
						callback(data.dataSet);
					});
			});
			return;
		}

		switch (star.service.platform) {
			case 'j2ee':
				setting.url = url;

				star.service._serviceForJ2ee(setting);
				break;
			case '.net':
				setting.url = star.service.url;

				star.service._serviceForNet(setting);
				break;
			default:
				var message = 'ERROR: star.service.platform = ' + star.service.platform;
				window.alert(message);
				throw new Error(message);
		}
	};

	/**
	 * @ignore
	 */
	star.service._serviceForJ2ee = function(setting) {
		$.ajax({
			url: setting.url,
			type: 'POST',
			data: JSON.stringify({
				transaction: {
					id: setting.transaction
				},
				attributes: {},
				dataSet: setting.request
			}),
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			processData: false,
			cache: false,
			success: function(response) {
				if (star.service.response)
					response.dataSet = star.service.response(response.dataSet);

				if (response.dataSet.message.result === 'OK') {
					if (setting.response)
						setting.response.DataSet(response.dataSet);

					if (setting.success)
						setting.success(response.dataSet);
				} else {
					if (setting.fail)
						setting.fail(response.dataSet);
					else
						star.service.fail(ds);
				}
			},
			error: function(xhr, status, error) {
				console.error(arguments);

				var ds = {
					message: {
						result: '',
						messageId: '',
						messageName: error,
						messageReason: '',
						messageRemark: ''
					},
					fields: {},
					recordSets: {}
				};

				if (setting.error)
					setting.error(ds, xhr, status, error);
				else
					star.service.error(ds, xhr, status, error);
			}
		});
	};

	/**
	 * @ignore
	 */
	star.service._serviceForNet = function(setting) {
		var request = {
			paramData: {
				txId: setting.transaction,
				Hashtable: setting.request.fields,
				recordSet: {}
			}
		};

		for ( var rs in setting.request.recordSets)
			request.paramData.recordSet[rs] = setting.request.recordSets[rs].nc_list;

		$.ajax({
			url: setting.url,
			type: 'POST',
			data: '{"paramData":"' + JSON.stringify(request) + '"}',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			processData: false,
			cache: false,
			success: function(r) {
				r = JSON.parse(r.d);

				switch (r.bizResultCategory[0]) {
					case -1: // FAIL
						break;
					case 0: // SESSION_EXPIRED
						window.alert('ERROR: Session expired');
						return;
					case 1: // METHOD_NOT_FOUND
						window.alert('ERROR: Method not found');
						return;
					case 2: // SUCCESS
						break;
					default:
						window.alert('ERROR: Unknown BizResultCategory (' + r.bizResultCategory[0] + ')');
						return;
				}

				var response = {
					dataSet: {
						message: {
							result: r.bizResultCategory[0] === 2 ? 'OK' : 'FAIL',
							messageId: '',
							messageName: r.bizResultCategory[1],
							messageReason: '',
							messageRemark: ''
						},
						fields: r.Hashtable,
						recordSets: {}
					}
				};

				for ( var rs in r.recordSet)
					response.dataSet.recordSets[rs] = {
						nc_recordCount: String(r.recordSet[rs].length),
						nc_pageNo: '-1',
						nc_recordCountPerPage: '-1',
						nc_totalRecordCount: '-1',
						nc_list: r.recordSet[rs]
					};

				if (star.service.response)
					response.dataSet = star.service.response(response.dataSet);

				if (response.dataSet.message.result === 'OK') {
					if (setting.response)
						setting.response.DataSet(response.dataSet);

					if (setting.success)
						setting.success(response.dataSet);
				} else {
					if (setting.fail)
						setting.fail(response.dataSet);
					else
						star.service.fail(ds);
				}
			},
			error: function(xhr, status, error) {
				console.error(arguments);

				var ds = {
					message: {
						result: '',
						messageId: '',
						messageName: error,
						messageReason: '',
						messageRemark: ''
					},
					fields: {},
					recordSets: {}
				};

				if (setting.error)
					setting.error(ds, xhr, status, error);
				else
					star.service.error(ds, xhr, status, error);
			}
		});
	};

	/**
	 * NEXCORE 서비스 호출.
	 * 
	 * @name star.service.Service^1
	 * @function
	 * @param {Object} option 옵션
	 * @param {String} option.transaction 트렌젝션 아이디
	 * @param {star.data.DataSet|jQuery|star.data.Selector} [option.request] 요청 데이터셋
	 * @param {jQuery|star.data.Selector} [option.response] 응답 데이터셋 대상
	 * @param {Function} [option.success] 성공 콜백
	 * @param {Function} [option.fail] 실패 콜백
	 * @param {Function} [option.error] 에러 콜백
	 * @example
	 * $.Service({
	 *   transaction: 'TXID0001',
	 *   request: $('#search').DataSet(),
	 *   response: $('#form'),
	 *   success: function(ds) {
	 *     // do something
	 *   },
	 *   fail: function(ds) {
	 *     window.alert('FAIL: ' + ds.message.messageName);
	 *   },
	 *   error: function(ds) {
	 *     window.alert('ERROR: ' + ds.message.messageName);
	 *   }
	 * });
	 */
	/**
	 * NEXCORE 서비스 호출.
	 * 
	 * @name star.service.Service^2
	 * @function
	 * @param {String} transaction 트렌젝션 아이디.
	 * @param {star.data.DataSet|jQuery|star.data.Selector} [request] 요청 데이터셋.
	 * @param {jQuery|star.data.Selector} [response] 응답 데이터셋 대상. request 파라미터가 사용될 때만 사용 가능.
	 * @param {Function} [success] 성공 콜백.
	 * @example
	 * $.Service('transaction');
	 * @example
	 * $.Service('transaction', '#request');
	 * @example
	 * $.Service('transaction', '#request', '#response);
	 * @example
	 * $.Service('transaction', function(ds) {
	 *   window.alert(ds.message.messageName);
	 * });
	 * @example
	 * $.Service('transaction', '#request', function(ds) {
	 *   window.alert(ds.message.messageName);
	 * });
	 * @example
	 * $.Service('transaction', '#request', '#response', function(ds) {
	 *   window.alert(ds.message.messageName);
	 * });
	 */
	$.Service = function() {
		return star.service._service(star.service.service_url, arguments);
	};

	/**
	 * NEXCORE 로그인 서비스 호출.
	 * 
	 * @name star.service.Login
	 * @function
	 * @see star.service.Service^1
	 * @see star.service.Service^2
	 */
	$.Login = function() {
		return star.service._service(star.service.login_url, arguments);
	};

	/**
	 * NEXCORE 로그아웃 서비스 호출.
	 * 
	 * @name star.service.Logout
	 * @function
	 * @see star.service.Service^1
	 * @see star.service.Service^2
	 */
	$.Logout = function() {
		return star.service._service(star.service.logout_url, arguments);
	};

	///////////////////////////////////////////////////////////////////////////
	// STAR UI
	///////////////////////////////////////////////////////////////////////////

	/**
	 * @name star.ui
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 * @example
	 * IComponent
	 *   ITemplate
	 *   IDisablable
	 *   IClearable
	 *     IEditable
	 *       IPlaceholder
	 *       IMasking
	 *       IMaxLengthTab
	 *       ICaret
	 *     IValue
	 *       IDataSet
	 *         IFields
	 *           IField
	 *             Text (IDisablable, IEditable, IPlaceholder, IMasking, IMaxLengthTab, ICaret)
	 *               Number
	 *               Date
	 *               Month
	 *             Password (IDisablable, IEditable, IMaxLengthTab, ICaret)
	 *             Hidden
	 *             CheckBox (IDisablable)
	 *             Radio (IDisablable)
	 *             Select (IDisablable)
	 *             TextArea (IDisablable, IEditable)
	 *             Spinner (IDisablable)
	 *             Editor
	 *           Container (ITemplate)
	 *             Form
	 *               File
	 *         IRecordSets
	 *           IRecordSet
	 *             Grid
	 *           Container
	 *   FileItem (IField?)
	 *   Button (IDisablable)
	 *   DateRange (Container?)
	 *   ListView (IRecordSet?)
	 *   Pager (IRecordSet?)
	 *   Tree (IRecordSet?)
	 *   Tab (Container?)
	 *   Accordion?
	 *   Menu?
	 *   ProgressBar?
	 *   Slider?
	 *     Scroller?
	 *   Tooltip?
	 *   Dialog (Container?)
	 *   DateSelect (Container?)
	 *   MonthSelect (Container?)
	 */
	star.ui = {

		/**
		 * [설정] 기본 UI 라이브러리. jqueryui, jquerymobile, bootstrap.
		 */
		library: $.mobile ? 'jquerymobile' : ($.fn.popover ? 'bootstrap' : 'jqueryui'),

		/**
		 * [설정] 렌더링 여부. 라이브러리에서 렌더링 하지 않아도 되는 컴포넌트일 경우 강제로 렌더링 할 지 여부 지정.
		 * 
		 * @defaults false
		 */
		render: false,

		/**
		 * [설정] STAR 표준 HTML 구조 사용 여부. true로 지정할 경우 라이브러리에서 정의한 구조가 아니라 STAR에서 정한 구조로 HTML을 작성해야 함.
		 * 
		 * @defaults false
		 */
		structure: false,

		/** @ignore */
		componentList: [],

		/** @ignore */
		componentHash: {},

		/** @ignore */
		checkTrue: function() {
			return true;
		},

		/** @ignore */
		registerComponent: function(spec) {
			star.ui.componentList.push(spec);
			star.ui.componentHash[spec.name] = spec;

			star.ui[spec.name] = spec.fields || {};

			if (spec.constructor !== undefined)
				star.ui.registerMethod(spec.name, 'Component', spec.constructor);

			if (spec.methods !== undefined)
				for ( var m in spec.methods)
					star.ui.registerMethod(spec.name, m, spec.methods[m]);

			if (spec.methods_static !== undefined)
				for ( var m in spec.methods_static) {
					// TODO: comment
					if ($[m] !== undefined) {
						window.alert('FATAL: $.' + m + ' != undefined');
						return;
					}

					$[m] = spec.methods_static[m];
				}
		},

		/** @ignore */
		registerMethod: function(component, method, logic) {
			var m = method === 'Component' ? component : method;

			$.fn[component + method] = logic;

			if ($.fn[m] === undefined) {
				$.fn[m] = function() {
					// TODO: comment
					if (this.length === 0) {
						console.trace();
						window.alert('DEBUG: length == 0');
						return this;
					}

					for ( var i = arguments.callee.components.length - 1; i >= 0; i--) {
						var mi = arguments.callee.components[i];
						var ci = star.ui.componentHash[mi.component];

						if (mi.constructor === true) {
							if (ci.constructor_check === undefined || ci.constructor_check.apply(this) === true)
								return mi.logic.apply(this, arguments);
						} else {
							var check = ci.methods_check || ci.constructor_check;

							if (check === undefined || check.apply(this) === true)
								return mi.logic.apply(this, arguments);
						}
					}

					window.alert('FATAL: component=' + component + ', method=' + method);
				};

				$.fn[m].components = [];
			}

			// TODO: comment
			if ($.fn[m].components === undefined) {
				window.alert('FATAL: method=' + m);
				return;
			}

			$.fn[m].components.push({
				component: component,
				method: method,
				constructor: method === 'Component',
				logic: logic
			});
		}

	};

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Component
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 컴포넌트.
	 * 
	 * @name star.ui.IComponent
	 * @class
	 */
	star.ui.registerComponent({
		name: 'IComponent',
		methods: {
			/**
			 * 컴포넌트 표시
			 */
			Show: $.fn.show,
			/**
			 * 컴포넌트 숨김
			 */
			Hide: $.fn.hide
		/*
		Block: function() {
			if ($.fn.block !== undefined)
				this.block({
					message: null
				});
		},
		Unblock: function() {
			if ($.fn.unblock !== undefined)
				this.unblock();
		}
		*/
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Template
	///////////////////////////////////////////////////////////////////////////

	if (window.Handlebars !== undefined) {
		/**
		 * 템플릿 엔진.
		 * 
		 * @name star.ui.ITemplate
		 * @class
		 * @extends star.ui.IComponent
		 */
		star.ui.registerComponent({
			name: 'ITemplate',
			fields: {
				cache: {},
				compile: function(template) {
					var cache = star.ui.ITemplate.cache[template];

					if (cache === undefined) {
						cache = Handlebars.compile($(template).html());

						star.ui.ITemplate.cache[template] = cache;
					}

					return cache;
				},
				emptyObject: {
					empty: true
				}
			},
			methods: {
				/**
				 * 렌더링.
				 * 
				 * @name star.ui.ITemplate#Render^1
				 * @function
				 * @param {star.data.Selector} template 템플릿 셀렉터
				 * @param {Object} data 데이터
				 * @returns {star.ui.ITemplate}
				 * @example
				 * $('#container').Render('#template', data);
				 */
				/**
				 * 렌더링.
				 * 
				 * @name star.ui.ITemplate#Render^2
				 * @function
				 * @param {star.data.Selector} rowTemplate 행 템플릿 셀렉터
				 * @param {star.data.Selector} columnTemplate 열 템플릿 셀렉터
				 * @param {Number} column 열 갯수
				 * @param {Object} data 데이터
				 * @returns {star.ui.ITemplate}
				 * @example
				 * $('#container').Render('#template', 2, 5, data);
				 * @example
				 * &lt;div>
				 *   {{#unless empty}}
				 *     {{field1}}
				 *   {{else}}
				 *     empty
				 *   {{/unless}}
				 * &lt;/div>
				 */
				Render: function() {
					switch (arguments.length) {
						case 4:
							var rowTemplate = arguments[0];
							var columnTemplate = arguments[1];
							var column = arguments[2];
							var data = arguments[3];
							var row = Math.ceil(data.length / column);
							var html = '';

							for ( var r = 0; r < row; r++) {
								var rowHtml = '';

								for ( var c = 0; c < column; c++) {
									var i = r * column + c;

									rowHtml += $.Render(columnTemplate, i < data.length ? data[i] : star.ui.ITemplate.emptyObject);
								}

								html += $.Render(rowTemplate, rowHtml);
							}

							return this.html(html);
						default:
							var template = arguments[0];
							var data = arguments[1];

							return this.html(star.ui.ITemplate.compile(template)(data));
					}
				},
				/**
				 * 추가.
				 * 
				 * @name star.ui.ITemplate#Append
				 * @function
				 * @param {star.data.Selector} template 템플릿 셀렉터
				 * @param {Object} data 데이터
				 * @returns {star.ui.ITemplate}
				 * @example
				 * $('#container').Append('#template', data);
				 */
				Append: function(template, data) {
					return this.append(star.ui.ITemplate.compile(template)(data));
				},
				/**
				 * 삽입.
				 * 
				 * @name star.ui.ITemplate#Prepend
				 * @function
				 * @param {star.data.Selector} template 템플릿 셀렉터
				 * @param {Object} data 데이터
				 * @returns {star.ui.ITemplate}
				 * @example
				 * $('#container').Prepend('#template', data);
				 */
				Prepend: function(template, data) {
					return this.prepend(star.ui.ITemplate.compile(template)(data));
				}
			},
			methods_static: {
				/**
				 * 렌더링.
				 * 
				 * @name star.ui.ITemplate.Render
				 * @function
				 * @param {star.data.Selector} template 템플릿 셀렉터
				 * @param {Object} data 데이터
				 * @returns {String}
				 * @example
				 * var html = $.Render('#template', data);
				 */
				Render: function(template, data) {
					return star.ui.ITemplate.compile(template)(data);
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Disablable
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 활성화가 되면 사용자의 행동에 대해 반응을 하나 비활성화가 되면 사용자의 행동에 반응을 하지 않게 됩니다.
	 * 버튼 같은 경우 클릭이 안되면 입력 상자 같은 경우 키보드 입력이 불가능하게 됩니다.
	 * 
	 * @name star.ui.IDisablable
	 * @class
	 * @extends star.ui.IComponent
	 */
	star.ui.registerComponent({
		name: 'IDisablable',
		methods: {
			/**
			 * 활성화 여부 조회
			 * 
			 * @name star.ui.IDisablable#Enabled^1
			 * @function
			 * @returns {Boolean}
			 * @example
			 * var enabled = $('#data').Enabled();
			 */
			/**
			 * 활성화 여부 설정
			 * 
			 * @name star.ui.IDisablable#Enabled^2
			 * @function
			 * @param {Boolean} enabled
			 * @returns {star.ui.IDisablable}
			 * @example
			 * $('#data').Enabled(enabled);
			 */
			Enabled: function(enabled) {
				if (enabled === undefined) {
					return this.is(':enabled');
				} else {
					if (enabled === true)
						return this.removeAttr('disabled');
					else
						return this.attr('disabled', 'disabled');
				}
			},

			/**
			 * 활성화
			 * 
			 * @name star.ui.IDisablable#Enable
			 * @function
			 * @returns {star.ui.IDisablable}
			 * @example
			 * $('#data').Enable();
			 */
			Enable: function() {
				return this.Enabled(true);
			},

			/**
			 * 비활성화 여부 조회
			 * 
			 * @name star.ui.IDisablable#Disabled^1
			 * @function
			 * @returns {star.ui.IDisablable}
			 * @example
			 * var disabled = $('#data').Disabled();
			 */
			/**
			 * 비활성화 여부 설정
			 * 
			 * @name star.ui.IDisablable#Disabled^2
			 * @function
			 * @param {Boolean} disabled
			 * @returns {star.ui.IDisablable}
			 * @example
			 * $('#data').Disabled(disabled);
			 */
			Disabled: function(disabled) {
				if (disabled === undefined)
					return this.Enabled() === false;
				else
					return this.Enabled(!disabled);
			},

			/**
			 * 비활성화
			 * 
			 * @name star.ui.IDisablable#Disable
			 * @function
			 * @returns {star.ui.IDisablable}
			 * @example
			 * $('#data').Disable();
			 */
			Disable: function() {
				return this.Enabled(false);
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Clearable
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 컴포넌트 초기화 인터페이스
	 * 
	 * @name star.ui.IClearable
	 * @class
	 * @extends star.ui.IComponent
	 */
	star.ui.registerComponent({
		name: 'IClearable',
		methods: {
			/**
			 * 초기화
			 * 
			 * @returns {star.ui.IClearable}
			 * @example
			 * $('#component').Clear();
			 */
			Clear: function() {
				if (this.is('input[type="checkbox"], input[type="radio"]'))
					return this.removeAttr('checked');

				if (this.is('input, select, textarea'))
					return this.val('');

				if (this.hasClass('star-clearable') === true)
					return this._clear();

				this.find('input[type="checkbox"]:checked, input[type="radio"]:checked').removeAttr('checked');
				this.find('input:not([type="checkbox"]):not([type="radio"]), select, textarea').val('');

				this.find('.star-clearable').each(function() {
					$(this)._clear();
				});

				return this;
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Editable
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 읽기 전용이 되면 화면상에서 사용자가 입력/수정을 할 수 없게 됩니다.
	 * 
	 * @name star.ui.IEditable
	 * @class
	 * @extends star.ui.IClearable
	 */
	star.ui.registerComponent({
		name: 'IEditable',
		methods: {
			/**
			 * 수정가능 여부 조회
			 * 
			 * @name star.ui.IEditable#Editable^1
			 * @function
			 * @returns {star.ui.IEditable}
			 * @example
			 * var editable = $('#data').Editable();
			 */
			/**
			 * 수정가능 여부 설정
			 * 
			 * @name star.ui.IEditable#Editable^2
			 * @function
			 * @param {Boolean} editable
			 * @returns {star.ui.IEditable}
			 * @example
			 * $('#data').Editable(editable);
			 */
			Editable: function(editable) {
				if (editable === undefined)
					return !this.attr('readonly');
				else {
					if (editable === true)
						return this.removeAttr('readonly');
					else
						return this.attr('readonly', 'readonly');
				}
			},

			/**
			 * 읽기전용 여부 조회
			 * 
			 * @name star.ui.IEditable#Readonly^1
			 * @function
			 * @returns {star.ui.IEditable}
			 * @example
			 * var readonly = $('#data').Readonly();
			 */
			/**
			 * 읽기전용 여부 설정
			 * 
			 * @name star.ui.IEditable#Readonly^2
			 * @function
			 * @param {Boolean} readonly
			 * @returns {star.ui.IEditable}
			 * @example
			 * $('#data').Readonly(readonly);
			 */
			Readonly: function(readonly) {
				if (readonly === undefined)
					return this.Editable() === false;
				else
					return this.Editable(!readonly);
			}
		}
	});

	/////////////////////////////////////////////////////////////////////////
	// STAR UI: Placeholder
	/////////////////////////////////////////////////////////////////////////

	// FEATURE:Placeholder ==>

	/**
	 * Placeholder
	 * 
	 * @name star.ui.IPlaceholder
	 * @class
	 * @property {String} placeholder [옵션] 표시할 문자열
	 * @extends star.ui.IEditable
	 * @star_desktop
	 * @star_mobile
	 * @construct
	 * @param {Object} [option] 옵션
	 * @returns {star.ui.IPlaceholder}
	 * @example
	 * .star-placeholder {
	 *   color: #999;
	 * }
	 * @example
	 * star.ui.IPlaceholder.use = true;
	 * @example
	 * &lt;input id="text" type="text" placeholder='title' />;
	 */
	star.ui.registerComponent({
		name: 'IPlaceholder',
		fields: {
			/**
			 * [정보] 네이티브 지원 여부. 브라우저에서 네이티브 플레이스홀더를 지원하는지 여부를 조회.
			 * 
			 * @type Boolean
			 */
			support: 'placeholder' in document.createElement('input'),
			/**
			 * [설정] 사용 여부
			 * 
			 * @type Boolean
			 * @default false
			 */
			use: false,
			/**
			 * [설정] 자동 처리 여부. 화면 초기화 후 placeholder 애트리뷰가 있는 엘리먼트를 찾아 초기화할지를 지정하는 설정.
			 * 
			 * @type Boolean
			 * @default false
			 */
			init: false,
			/**
			 * @ignore
			 */
			_val: $.fn.val
		},
		// TODO: Caret
		constructor: function(option) {
			if (star.ui.IPlaceholder.use === false)
				return this;

			if (option.placeholder !== undefined)
				this.attr('placeholder', option.placeholder);

			if (star.ui.IPlaceholder.support === true)
				return this;

			return this.focus(function() {
				var input = $(this);

				if (star.ui.IPlaceholder._val.call(input) === input.attr('placeholder')) {
					star.ui.IPlaceholder._val.call(input, '');
					input.removeClass('star-placeholder');
				}
			}).blur(function() {
				var input = $(this);
				var val = star.ui.IPlaceholder._val.call(input);
				var placeholder = input.attr('placeholder');

				if (val === '' || val === placeholder) {
					input.addClass('star-placeholder');
					star.ui.IPlaceholder._val.call(input, placeholder);
				}
			}).blur();
		}
	});

	if (star.ui.IPlaceholder.support === false) {
		/**
		 * Placeholder 처리를 위한 jQuery#val 오버라이딩
		 * 
		 * @see http://api.jquery.com/val/
		 * @ignore
		 */
		$.fn.val = function(value) {
			var placeholder = this.attr('placeholder');

			if (!placeholder)
				return star.ui.IPlaceholder._val.apply(this, arguments);

			var val = star.ui.IPlaceholder._val.apply(this, arguments);

			if (value !== undefined) {
				if (val !== value)
					this.removeClass('star-placeholder');

				return star.ui.IPlaceholder._val.apply(this, arguments);
			}

			if (val !== placeholder)
				return val;

			return '';
		};

		$(function() {
			if (star.ui.IPlaceholder.use === true && star.ui.IPlaceholder.init === true)
				$('[placeholder]:not(.star-placeholder)').each(function() {
					$(this).Placeholder();
				});
		});
	}

	// <== FEATURE:Placeholder

	/////////////////////////////////////////////////////////////////////////
	// STAR UI: Masking
	/////////////////////////////////////////////////////////////////////////

	// FEATURE:Masking ==>

	if ($.fn.mask !== undefined) {
		/**
		 * Masking
		 * 
		 * @name star.ui.IMasking
		 * @class
		 * @extends star.ui.IEditable
		 * @requires jquery.maskedinput.js
		 * @star_desktop
		 * @star_mobile
		 * @construct
		 * @param {Object} [option] 옵션
		 * @returns {star.ui.IMasking}
		 */
		star.ui.registerComponent({
			name: 'IMasking',
			fields:
			/**
			 * @lends star.ui.IMasking
			 */
			{
				/**
				 * [옵션] 마스킹 패턴
				 */
				mask: undefined
			},
			constructor: function(option) {
				if (option.mask !== undefined)
					return this.mask(option.mask);
				else
					return this;
			}
		});
	}

	// <== FEATURE:Masking

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: MaxLengthTab
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 지정한 글자가 입력되면 다음 항목으로 커서 이동.
	 * 
	 * @name star.ui.IMaxLengthTab
	 * @class
	 * @extends star.ui.IEditable
	 */
	star.ui.registerComponent({
		name: 'IMaxLengthTab',
		fields:
		/**
		 * @lends star.ui.IMaxLengthTab
		 */
		{
			/**
			 * [설정] maxlength 이상 입력되면 다음 항목으로 커서 이동할지 여부
			 * 
			 * @type Boolean
			 * @defaults false
			 */
			use: false
		},
		constructor: function(option) {
			if (star.ui.IMaxLengthTab.use === false)
				return this;

			if (!this.attr('maxlength'))
				return this;

			return this.keypress(function(e) {
				var input = $(e.target);

				if (input.val().length >= Number(input.attr('maxlength'))) {
					var inputs = input.closest('form').find('input:not([type="hidden"]), select, textarea, button');
					var index = inputs.index(input);

					if (index > -1 && index < inputs.length - 1)
						inputs.eq(index + 1).focus();
				}
			});
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Caret
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 커서.
	 * 
	 * @name star.ui.ICaret
	 * @class
	 * @extends star.ui.IEditable
	 */
	star.ui.registerComponent({
		name: 'ICaret',
		methods: {
			/**
			 * 커서 위치 조회.
			 * 
			 * @name star.ui.ICaret#Caret^1
			 * @function
			 * @return {Number}
			 */
			/**
			 * 커서 위치 설정.
			 * 
			 * @name star.ui.ICaret#Caret^2
			 * @function
			 * @param {Number} position
			 */
			Caret: function(position) {
				var element = this[0];

				if (position === undefined) {
					position = 0;

					// IE Support
					if (document.selection) {
						element.focus();
						var range = document.selection.createRange();

						range.moveStart('character', -element.value.length);

						position = range.text.length;
					}
					// Firefox support
					else if (element.selectionStart || element.selectionStart == '0')
						position = element.selectionStart;

					return position;
				} else {
					if (element.createTextRange) {
						var range = element.createTextRange();
						// range.collapse(true);
						range.move('character', position); // range.moveEnd('character', pos); range.moveStart('character', pos);
						range.select();
					} else if (element.setSelectionRange) {
						element.focus();
						element.setSelectionRange(position, position);
					} else {
						element.focus();
					}

					return this;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Value
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 값 인터페이스.
	 * 
	 * @name star.ui.IValue
	 * @class
	 * @extends star.ui.IClearable
	 */
	star.ui.registerComponent({
		name: 'IValue',
		methods: {
			/**
			 * 값 조회
			 * 
			 * @name star.ui.IValue#Value^1
			 * @function
			 * @returns {Object}
			 * @example
			 * var value = $('#value').Value();
			 */
			/**
			 * 값 설정
			 * 
			 * @name star.ui.IValue#Value^2
			 * @function
			 * @param {Object} value
			 * @returns {star.ui.IValue}
			 * @example
			 * $('#value').Value(value);
			 */
			Value: function(value) {
				if (this.is('input, select, textarea') === true)
					return $.fn.Field.apply(this, arguments); // Field = val

				if (this.is('form') === true)
					return $.fn.Fields.apply(this, arguments);

				if (this.hasClass('star-field') === true)
					return $.fn.Value.apply(this, arguments);

				if (this.hasClass('star-recordset') === true)
					return $.fn.Records.apply(this, arguments);

				if (this.hasClass('star-recordset-get') === true)
					return $.fn.Records.apply(this, arguments);

				if (this.hasClass('star-recordset-set') === true)
					return $.fn.Records.apply(this, arguments);

				return $.fn.DataSet.apply(this, arguments);
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: DataSet
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 데이터셋 인터페이스
	 * 
	 * @name star.ui.IDataSet
	 * @class
	 * @extends star.ui.IValue
	 */
	star.ui.registerComponent({
		name: 'IDataSet',
		methods: {
			/**
			 * 데이터셋 조회
			 * 
			 * @name star.ui.IDataSet#DataSet^1
			 * @function
			 * @returns {star.data.DataSet}
			 * @example
			 * var ds = $('#ds').DataSet();
			 */
			/**
			 * 데이터셋 설정
			 * 
			 * @name star.ui.IDataSet#DataSet^2
			 * @function
			 * @param {star.data.DataSet} value
			 * @example
			 * $('#ds').DataSet(ds);
			 */
			DataSet: function(value) {
				if (this.is('input, select, textarea') === true || this.hasClass('star-field') === true)
					if (value === undefined) {
						var ds = {
							fields: {},
							recordSets: {}
						};
						ds.fields[this.attr('id')] = this.Field();

						return ds;
					} else {
						return this.Field(value.fields[this.attr('id')]);
					}

				if (this.hasClass('star-recordset') === true)
					if (value === undefined) {
						var ds = {
							fields: {},
							recordSets: {}
						};
						ds.recordSets[this.attr('id')] = this.RecordSet();

						return ds;
					} else {
						return this.RecordSet(value.recordSets[this.attr('id')]);
					}

				if (this.hasClass('star-recordset-get') === true)
					if (value === undefined) {
						var ds = {
							fields: {},
							recordSets: {}
						};
						ds.recordSets[this.attr('id')] = this.RecordSet();

						return ds;
					} else {
						throw new Error('star-recordset-get');
					}

				if (this.hasClass('star-recordset-set') === true)
					if (value === undefined) {
						throw new Error('star-recordset-set');
					} else {
						return this.RecordSet(value.recordSets[this.attr('id')]);
					}

				if (value === undefined) {
					value = {
						fields: this.Fields(),
						recordSets: this.RecordSets()
					};

					return value;
				} else {
					return this.Fields(value.fields).RecordSets(value.recordSets);
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Fields
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 필드맵 인터페이스
	 * 
	 * @name star.ui.IFields
	 * @class
	 * @extends star.ui.IDataSet
	 */
	star.ui.registerComponent({
		name: 'IFields',
		methods: {
			/**
			 * 필드맵 조회
			 * 
			 * @name star.ui.IFields#Fields^1
			 * @function
			 * @returns {star.data.IMap}
			 * @example
			 * var map = $('#fields').Fields();
			 */
			/**
			 * 필드맵 설정
			 * 
			 * @name star.ui.IFields#Fields^2
			 * @function
			 * @param {star.data.IMap} value
			 * @example
			 * $('#fields').Fields(map);
			 */
			Fields: function(value) {
				if (value === undefined) {
					value = {};

					// TODO: grid :input
					this.find('input:not([type="checkbox"]):not([type="radio"]), select, textarea').each(function() {
						var c = $(this);
						var id = c.attr('id');

						value[id] = c.val();
					});

					this.find('input[type="checkbox"]').each(function() {
						var c = $(this);
						var id = c.attr('id');
						var option = c.data('star-option') || star.ui.CheckBox;

						value[id] = c.is(':checked') ? (c.val() || option.checked) : option.unchecked;
					});

					this.find('input[type="radio"]').each(function() {
						var c = $(this);
						var id = c.attr('id');

						if (c.is(':checked'))
							value[id] = c.val();
						else if (value[id] === undefined)
							value[id] = '';
					});

					this.find('.star-field').each(function() {
						var c = $(this);
						var id = c.attr('id');

						value[id] = c.Value();
					});

					return value;
				} else {
					var input = this.find('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
					var checkbox = this.find('input[type="checkbox"]');
					var radio = this.find('input[type="radio"]');

					for ( var id in value) {
						var v = value[id];
						var f = '#' + id;

						input.filter(f).val(v);

						checkbox.filter(f).each(function() {
							var c = $(this);

							if (c.val() === v)
								c.attr('checked', 'checked');
							else
								c.removeAttr('checked');
						});

						radio.filter(f).removeAttr('checked').each(function() {
							var c = $(this);

							if (c.val() === v)
								c.attr('checked', 'checked');
						});

						this.find('#' + id + '.star-field').each(function() {
							$(this).Field(v);
						});
					}

					if ($.mobile !== undefined) {
						checkbox.checkboxradio('refresh');
						radio.checkboxradio('refresh');
						this.find('select').selectmenu('refresh');
					}

					return this;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Field
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 필드 인터페이스
	 * 
	 * @name star.ui.IField
	 * @class
	 * @extends star.ui.IFields
	 */
	star.ui.registerComponent({
		name: 'IField',
		constructor: function() {
			return this.addClass('star-field');
		},
		methods: {
			/**
			 * 필드 조회
			 * 
			 * @name star.ui.IField#Field^1
			 * @function
			 * @returns {String}
			 * @example
			 * var field = $('#field').Field();
			 */
			/**
			 * 필드 설정
			 * 
			 * @name star.ui.IField#Field^2
			 * @function
			 * @param {String} value
			 * @returns {star.ui.IField}
			 * @example
			 * $('#field').Field(field);
			 */
			Field: function(value) {
				return $.fn.val.apply(this, arguments);
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: RecordSets
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 레코드셋맵 인터페이스
	 * 
	 * @name star.ui.IRecordSets
	 * @class
	 * @extends star.ui.IDataSet
	 */
	star.ui.registerComponent({
		name: 'IRecordSets',
		methods: {
			/**
			 * 레코드셋맵 조회
			 * 
			 * @name star.ui.IRecordSets#RecordSets^1
			 * @function
			 * @returns {star.data.RecordSets}
			 * @example
			 * var rss = $('#container').RecordSets();
			 */
			/**
			 * 레코드셋맵 설정
			 * 
			 * @name star.ui.IRecordSets#RecordSets^2
			 * @function
			 * @param {star.data.RecordSets} value
			 * @example
			 * $('#container').RecordSets(rss);
			 */
			RecordSets: function(value) {
				if (value === undefined) {
					value = {};

					this.find('.star-recordset, .star-recordset-get').each(function() {
						var c = $(this);
						var id = c.attr('id') || c.attr('name');

						value[id] = c.RecordSet();
					});

					return value;
				} else {
					for ( var id in value)
						this.find('#' + id + '.star-recordset, #' + id + '.star-recordset-set').RecordSet(value[id]);

					return this;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: RecordSet
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 레코드셋 인터페이스
	 * 
	 * @name star.ui.IRecordSet
	 * @class
	 * @extends star.ui.IRecordSets
	 */
	star.ui.registerComponent({
		name: 'IRecordSet',
		methods: {
			/**
			 * 레코드셋 조회
			 * 
			 * @name star.ui.IRecordSet#RecordSet^1
			 * @function
			 * @returns {star.data.RecordSet}
			 * @example
			 * var rs = $('#rs').RecordSet();
			 */
			/**
			 * 레코드셋 설정
			 * 
			 * @name star.ui.IRecordSet#RecordSet^2
			 * @function
			 * @param {star.data.RecordSet} value
			 * @example
			 * $('#rs').RecordSet(rs);
			 */
			RecordSet: function(value) {
				throw new Error('FATAL: RecordSet is not implemented');

				if (value === undefined)
					return {
						nc_list: []
					};
				else
					return this;
			},

			/**
			 * 레코드배열 조회
			 * 
			 * @name star.ui.IRecordSet#Records^1
			 * @function
			 * @returns {star.data.IMap[]}
			 * @example
			 * var records = $('#rs').Records();
			 */
			/**
			 * 레코드배열 설정
			 * 
			 * @name star.ui.IRecordSet#Records^2
			 * @function
			 * @param {star.data.IMap[]} value
			 * @example
			 * $('#rs').Records(records);
			 */
			Records: function(value) {
				if (value === undefined)
					return this.RecordSet().nc_list;
				else
					return this.RecordSet({
						nc_list: value
					});
			},

			/**
			 * 레코드 조회
			 * 
			 * @name star.ui.IRecordSet#Record^1
			 * @function
			 * @param {String} id
			 * @returns {star.data.IMap}
			 * @example
			 * var map = $('#rs').Record(id);
			 */
			/**
			 * 레코드 설정
			 * 
			 * @name star.ui.IRecordSet#Record^2
			 * @function
			 * @param {String} id
			 * @param {star.data.IMap} value
			 * @example
			 * $('#rs').Record(id, map);
			 */
			Record: function(row, value) {
				throw new Error('FATAL: Record is not implemented');

				if (rs === undefined)
					return {};
				else
					return this;
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Text
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 텍스트 컴포넌트
	 * 
	 * @name star.ui.Text
	 * @class
	 * @property {Function} change [옵션] 변경 이벤트 핸들러
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IEditable
	 * @extends star.ui.IPlaceholder
	 * @extends star.ui.IMasking
	 * @extends star.ui.IMaxLengthTab
	 * @extends star.ui.ICaret
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#text').Text({
	 *   mask: '999999-9999999',
	 *   change: function() {
	 *   }
	 * });
	 * @example
	 * &lt;input id="text" type="text"/>
	 */
	star.ui.registerComponent({
		name: 'Text',
		fields:
		/**
		 * @lends star.ui.Text
		 */
		{
			/**
			 * 변경 이벤트 핸들러
			 * 
			 * @type Function
			 */
			change: undefined
		},
		/*
		constructor_check: function() {
			return this.is('input[type="text"]');
		},
		*/
		constructor: function(option) {
			option = star.option(star.ui.Text, option);

			this.IPlaceholderComponent(option).IMaxLengthTabComponent(option);

			if (option.mask !== undefined)
				this.IMaskingComponent(option);

			if (option.change !== undefined)
				this.change(function() {
					option.change.apply($(this), arguments);
				});

			if (star.ui.IMaxLengthTab.use === true)
				$.fn.IMaxLengthTabComponent.apply(this, arguments);

			return this;
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Password
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 비밀번호 컴포넌트
	 * 
	 * @name star.ui.Password
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IEditable
	 * @extends star.ui.IMaxLengthTab
	 * @extends star.ui.ICaret
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {Function} [option.change] 변경 이벤트 핸들러
	 * @example
	 * $('#password').Password({
	 *   change: function() {
	 *   }
	 * });
	 * @example
	 * &lt;input id="password" type="password"/>
	 */
	star.ui.registerComponent({
		name: 'Password',
		constructor_check: function() {
			return this.is('input[type="password"]');
		},
		constructor: function(option) {
			if (option === undefined)
				option = {};

			if (option.change !== undefined)
				this.change(function() {
					option.change.apply($(this), arguments);
				});

			if (star.ui.IMaxLengthTab.use === true)
				$.fn.IMaxLengthTabComponent.apply(this, arguments);

			return this;
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Hidden
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 히든 컴포넌트
	 * 
	 * @name star.ui.Hidden
	 * @class
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @example
	 * $('#password').Hidden();
	 * @example
	 * &lt;input id="hidden" type="hidden"/>
	 */
	star.ui.registerComponent({
		name: 'Hidden',
		constructor_check: function() {
			return this.is('input[type="hidden"]');
		},
		constructor: function(option) {
			return this;
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: CheckBox
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 체크박스 컴포넌트.
	 * 
	 * @name star.ui.CheckBox
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#checkbox').CheckBox({
	 *   click: function() {
	 *   }
	 * });
	 * @example
	 * &lt;input id="checkbox" type="checkbox"/>
	 */
	star.ui.registerComponent({
		name: 'CheckBox',
		fields: {
			/**
			 * [설정] 체크되어 있으나 value 애트리뷰트가 없을 경우 보낼 값을 설정
			 * 
			 * @name star.ui.CheckBox.checked
			 * @field
			 * @type String
			 */
			checked: 'Y',
			/**
			 * [설정] 체크되어 있지 않을 경우 보낼 값을 설정
			 * 
			 * @name star.ui.CheckBox.unchecked
			 * @field
			 * @type String
			 */
			unchecked: 'N',
			/**
			 * [옵션] 클릭 이벤트 핸들러
			 * 
			 * @name star.ui.CheckBox.click
			 * @field
			 * @type Function
			 */
			click: undefined
		},
		constructor_check: function() {
			return this.is('input[type="checkbox"]');
		},
		constructor: function(option) {
			this.data('star-option', option = star.option(star.ui.CheckBox, option));

			if (option.click !== undefined)
				this.click(function() {
					option.click.apply($(this), arguments);
				});

			return this;
		},
		methods: {
			/**
			 * 필드 조회
			 * 
			 * @name star.ui.CheckBox#Field^1
			 * @function
			 * @returns {String}
			 */
			/**
			 * 필드 설정
			 * 
			 * @name star.ui.CheckBox#Field^2
			 * @function
			 * @param {String} value
			 * @returns {star.ui.CheckBox}
			 */
			Field: function(value) {
				var option = this.data('star-option') || star.ui.CheckBox;

				if (value === undefined) {
					return this.is(':checked') ? (this.val() || option.checked) : option.unchecked;
				} else {
					if (this.val() === value)
						this.attr('checked', 'checked');
					else
						this.removeAttr('checked');

					return this;
				}
			},

			/**
			 * 체크 여부 조회
			 * 
			 * @name star.ui.CheckBox#Checked^1
			 * @function
			 * @returns {Boolean} 체크 여부
			 * @example
			 * var checked = $('#checkbox').Checked();
			 */
			/**
			 * 체크 여부 변경
			 * 
			 * @name star.ui.CheckBox#Checked^2
			 * @function
			 * @param {boolean} value 체크 여부
			 * @returns {star.ui.CheckBox}
			 * @example
			 * $('#checkbox').Checked(true);
			 */
			Checked: function(value) {
				if (value === undefined) {
					return this.is(':checked');
				} else {
					if (value === true)
						this.attr('checked', 'checked');
					else
						this.removeAttr('checked');
				}
			},

			/**
			 * 체크 상태로 변경
			 * 
			 * @name star.ui.CheckBox#Check
			 * @function
			 * @returns {star.ui.CheckBox}
			 * @example
			 * $('#checkbox').Check();
			 */
			Check: function() {
				return this.attr('checked', 'checked');
			},

			/**
			 * 체크해제 상태로 변경
			 * 
			 * @name star.ui.CheckBox#Uncheck
			 * @function
			 * @returns {star.ui.CheckBox}
			 * @example
			 * $('#checkbox').Uncheck();
			 */
			Uncheck: function() {
				return this.removeAttr('checked');
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Radio
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 라디오 컴포넌트.<br/>
	 * <br/>
	 * HTML 작성 시 라디오는 아이디와 이름을 모두 같은 값으로 설정해야 합니다.<br/>
	 * 
	 * @name star.ui.Radio
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#radio').Radio(function() {
	 *   window.alert(this.Value());
	 * });
	 * @example
	 * &lt;form>
	 *   &lt;label>&lt;input id="radio" name="radio" type="radio"/> 라디오1&lt;/label>
	 *   &lt;label>&lt;input id="radio" name="radio" type="radio"/> 라디오2&lt;/label>
	 * &lt;/form>
	 */
	star.ui.registerComponent({
		name: 'Radio',
		fields: {
			/**
			 * 변경 이벤트 핸들러
			 * 
			 * @name star.ui.Radio.change
			 * @field
			 * @type Function
			 */
			change: undefined
		},
		constructor_check: function() {
			return this.is('input[type="radio"]');
		},
		constructor: function(option) {
			this.data('star-option', option = star.option(star.ui.Radio, option));

			if (option.change !== undefined)
				this.change(function() {
					option.change.apply($(this), arguments);
				});

			return this;
		},
		methods: {
			_radios: function() {
				return this.length > 1 ? this : $(this.context).find('[id="' + this.attr('id') + '"]');
			},

			/**
			 * 활성화 여부 조회
			 * 
			 * @name star.ui.Radio#Enabled^1
			 * @function
			 * @returns {Boolean}
			 */
			/**
			 * 활성화 여부 설정
			 * 
			 * @name star.ui.Radio#Enabled^2
			 * @function
			 * @param {Boolean} enabled
			 * @returns {star.ui.Radio}
			 */
			Enabled: function(enabled) {
				if (enabled === undefined) {
					return this.is(':enabled');
				} else {
					if (enabled === true)
						return this._radios().removeAttr('disabled');
					else
						return this._radios().attr('disabled', 'disabled');
				}
			},

			/**
			 * 필드 조회
			 * 
			 * @name star.ui.Radio#Field^1
			 * @function
			 * @returns {String}
			 */
			/**
			 * 필드 설정
			 * 
			 * @name star.ui.Radio#Field^2
			 * @function
			 * @param {String} value
			 * @returns {star.ui.Radio}
			 */
			Field: function(value) {
				if (value === undefined) {
					return this._radios().filter(':checked').val() || '';
				} else {
					var radios = this._radios();

					radios.removeAttr('checked').each(function() {
						var radio = $(this);

						if (radio.val() === value) {
							radio.attr('checked', 'checked');
							return false;
						}
					});

					return radios;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Select
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 셀렉트 컴포넌트.<br/>
	 * 
	 * @name star.ui.Select
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#select').Select({
	 *   value: 'value',
	 *   label: 'label',
	 *   blank: {
	 *     value: '',
	 *     label: '==select=='
	 *   },
	 *   options: ds.recordSets.rs.nc_list, // or ds.recordSets.rs
	 *   change: function() {
	 *     // do something
	 *   }
	 * });
	 * @example
	 * // autocomplete style
	 * 
	 * .ui-combobox {
	 *   position: relative;
	 *   display: inline-block;
	 * }
	 * .ui-combobox-toggle {
	 *   position: absolute;
	 *   top: 0;
	 *   bottom: 0;
	 *   margin-left: -1px;
	 *   padding: 0;
	 *   *height: 1.7em;
	 *   *top: 0.1em;
	 * }
	 * .ui-combobox-input {
	 *   margin: 0;
	 *   padding: 0.3em;
	 * }
	 */
	star.ui.registerComponent({
		name: 'Select',
		fields:
		/**
		 * @lends star.ui.Select
		 */
		{
			/**
			 * [설정/옵션] 데이터 바인딩 시 옵션 엘리멘트에 값으로 사용할 필드명
			 * 
			 * @type String
			 * @default 'value'
			 */
			value: 'value',
			/**
			 * [설정/옵션] 데이터 바인딩 시 옵션 엘리멘트에 라벨로 사용할 필드명
			 * 
			 * @type String
			 * @default 'label'
			 */
			label: 'label',
			/**
			 * [설정/옵션] 첫 행 사용 여부
			 * 
			 * @type Object
			 * @example
			 * star.ui.Select.blank = {
			 *   value: '',
			 *   label: ''
			 * };
			 */
			blank: undefined,
			/**
			 * [옵션] 옵션 배열
			 * 
			 * @type star.data.RecordSet|star.data.IMap[]
			 */
			options: undefined,
			/**
			 * [설정/옵션] 자동 완성 사용 여부
			 * 
			 * @type Boolean
			 * @defaults false
			 */
			autocomplete: false,
			/**
			 * [옵션] 초기화 이벤트 핸들러
			 * 
			 * @type Function
			 */
			init: undefined,
			/**
			 * [옵션] 값 변경 이벤트 핸들러
			 * 
			 * @type Function
			 */
			change: undefined
		},
		constructor_check: function() {
			return this.is('select');
		},
		constructor: function(option) {
			this.data('star-option', option = star.option(star.ui.Select, option));

			if (option.autocomplete === true)
				this.combobox();

			if (this.find('option').length === 0) {
				if (option.options === undefined)
					option.options = [];

				this.SelectOptions(option.options);
			}

			if (option.init !== undefined)
				$(option.init);

			if (option.change !== undefined)
				this.change(option.change);

			return this;
		},
		methods:
		/**
		 * @lends star.ui.Select.prototype
		 */
		{
			/**
			 * 옵션 설정
			 * 
			 * @param {star.data.RecordSet|star.data.IMap[]} options 데이터
			 * @param {String} [value] 값 필드 아이디
			 * @param {String} [label] 라벨 필드 아이디
			 * @returns {star.ui.Select}
			 * @example
			 * $('#select').Options([
			 *   {value: '',  label: ''},
			 *   {value: '1', label: '#1'},
			 *   {value: '2', label: '#2'}
			 * ]);
			 * @example
			 * $('#select').Options(ds.recordSets.rs);
			 */
			Options: function(options, value, label) {
				var option = this.data('star-option') || star.ui.Select;

				if (value !== undefined) {
					option.value = value;
					option.label = label;
				}

				if (options.nc_list !== undefined)
					options = options.nc_list;

				this.find('option').remove();

				if (option.blank !== undefined)
					this.append($('<option/>').attr('value', option.blank.value).text(option.blank.label));

				for ( var i = 0, l = options.length; i < l; i++) {
					var v = options[i];

					this.append($('<option/>').attr('value', v[option.value]).text(v[option.label]));
				}

				return this;
			},

			/**
			 * 선택된 레이블 조회.
			 * 
			 * @returns {String}
			 */
			Label: function() {
				return this.children(':selected').text() || '';
			}
		}
	});

	if ($.fn.autocomplete !== undefined) {
		var val = $.fn.val;

		$.fn.val = function() {
			var result = val.apply(this, arguments);

			if (arguments.length !== 0 && this.is('select') && this.next().hasClass('ui-combobox'))
				this.change();

			return result;
		};

		$.widget('ui.combobox', {
			_create: function() {
				var input = undefined, that = this, select = this.element.hide(), selected = select.children(':selected'), value = selected.val() ? selected.text() : '', wrapper = this.wrapper = $('<span>').addClass('ui-combobox').insertAfter(select);

				function removeIfInvalid(element) {
					var value = $(element).val(), matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(value) + '$', 'i'), valid = false;
					select.children('option').each(function() {
						if ($(this).text().match(matcher)) {
							this.selected = valid = true;
							return false;
						}
					});
					if (!valid) {
						// remove invalid value, as it didn't match anything
						$(element).val('');
						select.val('');
						input.data('autocomplete').term = '';
						return false;
					}
				}

				input = $('<input>').appendTo(wrapper).val(value).attr('title', '').addClass("ui-state-default ui-combobox-input").autocomplete({
					delay: 0,
					minLength: 0,
					source: function(request, response) {
						var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
						response(select.children("option").map(function() {
							var text = $(this).text();
							if (this.value && (!request.term || matcher.test(text)))
								return {
									label: text.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(request.term) + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong>$1</strong>'),
									value: text,
									option: this
								};
						}));
					},
					select: function(event, ui) {
						ui.item.option.selected = true;
						that._trigger('selected', event, {
							item: ui.item.option
						});
					},
					change: function(event, ui) {
						if (!ui.item)
							return removeIfInvalid(this);
					}
				}).addClass('ui-widget ui-widget-content ui-corner-left');

				input.data('autocomplete')._renderItem = function(ul, item) {
					return $('<li>').data('item.autocomplete', item).append('<a>' + item.label + '</a>').appendTo(ul);
				};

				$('<a>').attr('tabIndex', -1).appendTo(wrapper).button({
					icons: {
						primary: 'ui-icon-triangle-1-s'
					},
					text: false
				}).removeClass('ui-corner-all').addClass('ui-corner-right ui-combobox-toggle').click(function() {
					// close if already visible
					if (input.autocomplete('widget').is(':visible')) {
						input.autocomplete('close');
						removeIfInvalid(input);
						return;
					}

					// work around a bug (likely same cause as #5265)
					$(this).blur();

					// pass empty string as value to search for, displaying all results
					input.autocomplete('search', '');
					input.focus();
				});

				// STAR:
				select.change(function() {
					input.val(select.children(':selected').text());
				});
			},

			destroy: function() {
				this.wrapper.remove();
				this.element.show();
				$.Widget.prototype.destroy.call(this);
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: TextArea
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 텍스트에어리어 컴포넌트
	 * 
	 * @name star.ui.TextArea
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IEditable
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 */
	star.ui.registerComponent({
		name: 'TextArea',
		constructor_check: function() {
			return this.is('textarea');
		},
		constructor: function() {
			return this;
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Container
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 컨테이너 컴포넌트
	 * 
	 * @name star.ui.Container
	 * @class
	 * @extends star.ui.ITemplate
	 * @extends star.ui.IFields
	 * @extends star.ui.IRecordSets
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {star.data.Selector|jQuery} [option.enter] 엔터키 처리 대상 객체
	 * @example
	 * $('#container').Container({
	 *   enter: '#button'
	 * });
	 */
	star.ui.registerComponent({
		name: 'Container',
		fields:
		/**
		 * @lends star.ui.Container
		 */
		{
			/**
			 * [옵션] 엔터키 처리
			 * 
			 * @type star.data.Selector|jQuery
			 */
			enter: undefined,
			/**
			 * [설정] 파일 로드 에러 핸들러.
			 */
			load_error: function() {
				window.alert('ERROR: 파일을 불러오지 못했습니다');
			}
		},
		constructor: function(option) {
			this.data('star-option', option = star.option(star.ui.Container, option));

			if (option.enter !== undefined)
				this.ContainerEnter(option.enter);

			return this;
		},
		methods: {
			/**
			 * 파일 로드.
			 * 
			 * @param {Object} option
			 * @param {String} option.url
			 * @param {String|Object} [option.data]
			 * @param {Function} [option.success]
			 * @param {Function} [option.error]
			 * @returns {star.ui.Container}
			 */
			Load: function(option) {
				var $this = this;
				var setting = {
					url: option.url,
					type: option.data === undefined ? 'GET' : 'POST',
					cache: false,
					dataType: 'text',
					processData: false,
					success: function(data, textStatus, jqXHR) {
						$this.html(data);

						if (option.success !== undefined)
							option.success();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						if (option.error !== undefined)
							option.error();
						else
							star.ui.Container.load_error();
					}
				};

				if (option.data !== undefined)
					setting.data = data;

				$.ajax(setting);
			},
			/**
			 * 엔터키 처리.
			 * 
			 * @name star.ui.Container#Enter
			 * @function
			 * @param {String} submit 제출 버튼
			 * @returns {star.ui.Container}
			 * @example
			 * $('#container').Enter('#submit');
			 * @example
			 * $('#container').Container({
			 *   enter: '#submit'
			 * });
			 */
			Enter: function(submit) {
				return this.find('input[type="text"], input[type="password"]').keypress(function(e) {
					if (e.which === 13)
						$(submit).focus().click();
				});
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Validator
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 유효성 검사.
	 * 
	 * @name star.ui.IValidator
	 * @class
	 * @extends star.ui.IClearable
	 * @constructs
	 * @param {Object} [option]
	 */
	/**
	 * 유효성 검사.
	 * 
	 * @name star.ui.IValidator#Validate
	 * @function
	 * @returns {Boolean}
	 */
	/**
	 * 유효성 검사 초기화.
	 * 
	 * @name star.ui.IValidator#Invalidate
	 * @function
	 * @returns {star.ui.IValidator}
	 */

	(function() {
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: FormValidator
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 유효성 검사.
	 * 
	 * @name star.ui.IFormValidator
	 * @class
	 * @extends star.ui.IValidator
	 */

	star.ui.IFormValidator = {
		init: undefined,
		validate: undefined,
		invalidate: undefined,
		clear: undefined
	};

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: StarFormValidator
	///////////////////////////////////////////////////////////////////////////

	if ($.validator === undefined) {
		/**
		 * 유효성 검사.
		 * 
		 * @name star.ui.IStarFormValidator
		 * @class
		 * @extends star.ui.IFormValidator
		 */
		star.ui.IStarFormValidator = {
			init: function() {
				window.alert('ERROR: star.ui.IStarFormValidator.init is not implemented');
			},
			validate: function(o) {
				window.alert('ERROR: star.ui.IStarFormValidator.validate is not implemented');
			},
			invalidate: function(o) {
				window.alert('ERROR: star.ui.IStarFormValidator.invalidate is not implemented');
			},
			clear: function(o) {
				window.alert('ERROR: star.ui.IStarFormValidator.clear is not implemented');
			}
		};

		$.extend(star.ui.IFormValidator, star.ui.IStarFormValidator);
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: ValidationFormValidator
	///////////////////////////////////////////////////////////////////////////

	if ($.validator !== undefined) {
		$.validator.addMethod('ge', function(value, element, params) {
			if (typeof params === 'string')
				params = {
					target: params,
					message: '크거나 같아야 합니다'
				};

			return this.optional(element) || value <= $(params.target).val();
		}, function(params) {
			return params.message;
		});

		$(function() {
			var defaults = {};

			switch (star.ui.Form.validation_error) {
				case 'alert':
					/** @ignore */
					defaults.onkeyup = false;
					/** @ignore */
					defaults.onclick = false;
					/** @ignore */
					defaults.onfocusout = false;
					/** @ignore */
					defaults.showErrors = function(errorMap, errorList) {
						if (this.numberOfInvalids()) {
							$(errorList[0].element).focus();

							window.alert(errorList[0].message);
						}
					};
					break;
				case 'label':
					break;
				case 'tooltip':
					/** @ignore */
					defaults.success = function(error) {
						if ($.fn.qtip !== undefined) {
							$('#' + error.attr('for')).removeData('star-tooltip').qtip('destroy');
							return;
						}
					};
					/** @ignore */
					defaults.errorPlacement = function(error, element) {
						if ($.fn.qtip !== undefined) {
							element.qtip({
								overwrite: false,
								content: error,
								position: {
									my: 'left center',
									at: 'right center',
									//viewport: $(window),
									adjust: {
										screen: true
									}
								},
								show: {
									event: false,
									ready: true
								},
								hide: false,
								style: {
									classes: 'ui-tooltip-red'
								}
							}).qtip('option', 'content.text', error);

							return;
						}

						if (element.next().is('img') === true)
							error.insertAfter(element.next());
						else
							error.insertAfter(element);
					};
					break;
			}

			$.validator.setDefaults(defaults);

			switch (star.locale) {
				case 'ko':
					$.extend($.validator.messages, {
						required: '반드시 입력해야 합니다.',
						remote: '수정 바랍니다.',
						email: '이메일 주소를 올바로 입력하세요.',
						url: 'URL을 올바로 입력하세요.',
						date: '날짜가 잘못 입력됐습니다.',
						dateISO: 'ISO 형식에 맞는 날짜로 입력하세요.',
						number: '숫자만 입력하세요.',
						digits: '숫자(digits)만 입력하세요.',
						creditcard: '올바른 신용카드 번호를 입력하세요.',
						equalTo: '값이 서로 다릅니다.',
						accept: '승낙해 주세요.',
						maxlength: $.validator.format('{0}글자 이상은 입력할 수 없습니다.'),
						minlength: $.validator.format('적어도 {0}글자는 입력해야 합니다.'),
						rangelength: $.validator.format('{0}글자 이상 {1}글자 이하로 입력해 주세요.'),
						range: $.validator.format('{0}에서 {1} 사이의 값을 입력하세요.'),
						max: $.validator.format('{0} 이하로 입력해 주세요.'),
						min: $.validator.format('{0} 이상으로 입력해 주세요.')
					});
					break;
			}
		});

		/**
		 * 유효성 검사.
		 * 
		 * @name star.ui.IValidationFormValidator
		 * @class
		 * @extends star.ui.IFormValidator
		 */
		star.ui.IValidationFormValidator = {
			init: function(option) {
				var setting = {
					rules: {},
					onsubmit: false
				};

				this.find('input[id]:not([name]), select[id]:not([name]), textarea[id]:not([name])').each(function() {
					var $this = $(this);

					$this.attr('name', $this.attr('id'));
				});

				for ( var id in option.validation)
					setting.rules[id] = option.validation[id]; // $('#' + id).rules('add', option.validation[id])

				this.validate(setting); // return validator

				return this;
			},
			validate: function() {
				return this.validate().form();
			},
			invalidate: function() {
				if ($.fn.qtip !== undefined) {
					var $this = this;

					$('.qtip').each(function() {
						$this.find('#' + $(this).find('label').attr('for')).qtip('destroy');
					});
				}

				return this;
			},
			clear: function() {
				this.validate().resetForm();

				return star.ui.IValidationFormValidator.invalidate.apply(this, arguments);
			}
		};

		$.extend(star.ui.IFormValidator, star.ui.IValidationFormValidator);
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Form
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 폼
	 * 
	 * @name star.ui.Form
	 * @class
	 * @extends star.ui.Container
	 * @extends star.ui.IFormValidator
	 * @property {String} validation [옵션] 유효성 검사. 폼 필드 컨트롤의 name 애트리뷰트를 기준으로 검사함.
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {Function} [option.init] 초기화 후 실행할 함수
	 * @param {Object} [option.validation] 유효성 검사 옵션
	 * @example
	 * $('#form').Form({
	 *   init: function() {
	 *   },
	 *   validation: {
	 *     ...
	 *   },
	 *   enter: '#button'
	 * });
	 */
	star.ui.registerComponent({
		name: 'Form',
		fields: {
			/**
			 * [설정] 유효성 검사 에러 표시 방법.<br/>
			 * <br/>
			 * alert: 브라우저 기본 경고 메시지 창 사용.<br/>
			 * label: 에러 발생한 컴포넌트 뒤에 레이블 태그 추가.<br/>
			 * tooltip: 툴팁 애드온 사용. qTip 필요.<br/>
			 * 
			 * @field
			 * @type String
			 * @defaults 'tooltip'
			 */
			validation_error: 'tooltip'
		},
		constructor_check: function() {
			return this.is('form');
		},
		constructor: function(option) {
			this.data('star-option', option = star.option(star.ui.Form, option));

			this.ContainerComponent(option);

			if (option.validation !== undefined)
				star.ui.IFormValidator.init.apply(this, arguments);

			if (option.init !== undefined)
				$(option.init);

			return this.addClass('star-clearable').submit(function(e) {
				e.preventDefault();
			});
		},
		methods: {
			/**
			 * 초기화. 유효성 검사 결과도 초기화합니다.
			 * 
			 * @name star.ui.Form#Clear
			 * @function
			 * @returns {star.ui.Form}
			 * @example
			 * $('#form').Clear();
			 */
			_clear: function() {
				star.ui.IFormValidator.clear.apply(this, arguments);
			},

			/**
			 * 엔터키 처리
			 * 
			 * @param {String} submit 제출 버튼
			 * @returns {star.ui.Form}
			 * @example
			 * $('#form').Enter('#submit');
			 */
			Enter: function(submit) {
				//this.attr('onsubmit', 'return false;');
				//this.submit($.noop);
				this.submit(function() {
					return false;
				});

				return $.fn.ContainerEnter.apply(this, arguments);
			},

			/**
			 * 유효성 검사
			 * 
			 * @param {Function} [success]
			 * @returns {Boolean} 성공 여부
			 * @requires jquery-validation
			 * @example
			 * var valid = $('#form').Validate();
			 * @example
			 * $('#form').Validate(function() {
			 *   // do
			 * });
			 */
			Validate: function(success) {
				var result = star.ui.IFormValidator.validate.apply(this, arguments);

				if (result === true && success !== undefined)
					success();

				return result;
			},

			/**
			 * 유효성 검사 오류 메시지 초기화
			 * 
			 * @return {star.ui.Form}
			 * @requires jquery-validation
			 * @example
			 * $('#form').Invalidate();
			 */
			Invalidate: function() {
				return star.ui.IFormValidator.invalidate.apply(this, arguments);
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: File
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.ajaxForm !== undefined) {
		/**
		 * 파일
		 * 
		 * @name star.ui.File
		 * @class
		 * @extends star.ui.Form
		 * @requires <a href="http://www.malsup.com/jquery/form/">jquery.form</a> <del>or <a href="http://www.uploadify.com">uploadify</a></del>
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @param {String} [option.url] 파일 업로드를 처리할 주소
		 * @param {Function} [option.success] 파일 업로드 성공치 처리할 이벤트 핸들러
		 * @param {Function} [option.error] 파일 업로드 실패치 처리할 이벤트 핸들러
		 * @example
		 * $('#file').File({
		 *   url: '/web/file',
		 *   success: function(data) {
		 *   },
		 *   error: function() {
		 *   }
		 * });
		 */
		star.ui.registerComponent({
			name: 'File',
			fields: {
				/**
				 * [설정] 파일 업로드를 처리할 주소
				 * 
				 * @field
				 * @type String
				 */
				url: 'file.html',
				/**
				 * [설정] 파일 업로드 성공치 처리할 기본 이벤트 핸들러
				 * 
				 * @field
				 * @type Function
				 */
				success: function(data) {
				},
				/**
				 * [설정] 파일 업로드 실패치 처리할 기본 이벤트 핸들러
				 * 
				 * @field
				 * @type Function
				 */
				error: function(message) {
					window.alert('ERROR: ' + message);
				}
			},
			constructor: function(option) {
				var self = this;

				option = star.option(star.ui.File, option);

				this.FormComponent(option);

				this.find('input[id]:not([name]), select[id]:not([name]), textarea[id]:not([name])').each(function() {
					var $this = $(this);

					$this.attr('name', $this.attr('id'));
				});

				/**
				 * @ignore
				 */
				var setting = {
					type: 'POST',
					dataType: 'json',
					uploadProgress: function() {
					}
				};

				if (option !== undefined) {
					setting.url = option.url !== undefined ? option.url : star.ui.File.url;
					/**
					 * @ignore
					 */
					setting.success = function(data) {
						var option = self.data('star-option');

						(option.success || star.ui.File.success).apply(this, arguments);
					};
					/**
					 * @ignore
					 */
					setting.error = function() {
						var option = self.data('star-option');

						(option.error || star.ui.File.error).apply(this, arguments);
					};
				}

				return this.data('star-option', option).data('star-setting', setting).addClass('star-file').ajaxForm(setting).submit(function() {
					e.preventDefault();
					return false;
				});
			},
			methods_check: function() {
				return this.hasClass('star-file');
			},
			methods: {
				/**
				 * 파일 업로드
				 * 
				 * @name star.ui.File#Service
				 * @function
				 * @param {Function} [success] 성공 이벤트 핸들러
				 * @returns {star.ui.File}
				 * @example
				 * $('#file').Service();
				 * @example
				 * $('#file').Service(function() {
				 *   $.Service(...);
				 * });
				 */
				Service: function(success) {
					if (success !== undefined) {
						var option = this.data('star-option');
						option.success = success;

						this.data('star-option', option);
					}

					return this.ajaxSubmit(this.data('star-setting'));
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: FileItem
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 파일 항목. 
	 * 앨리멘트를 안 보이게 스타일링할 경우 선택된 파일의 이름을 표시하기 위한 기능을 포함하는 컴포넌트.
	 * 
	 * @name star.ui.FileItem
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @property {Function} [render] [설정] 파일 항목 렌더링 함수.
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {star.data.Selector} [option.label] 파일명을 표시할 컴포넌트 셀렉터
	 * @param {Function} [option.change] 파일 선택 시 발생하는 이벤트
	 * @example
	 * $('#file-item').FileItem({
	 *   label: '#file-item-label',
	 *   change: function(name) {
	 *   }
	 * });
	 */
	star.ui.registerComponent({
		name: 'FileItem',
		fields: {
			render: function() {
			}
		},
		constructor: function(option) {
			option = star.option(star.ui.FileItem, option);

			if (option.label !== undefined)
				this.change(function() {
					$(option.label).val($(this).val());
				});

			if (option.change !== undefined)
				this.change(function() {
					var file = $(this);

					option.change(file.val(), file);
				});

			return this;
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Application
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 애플리케이션
	 * 
	 * @name star.ui.Application
	 * @class
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 */
	$.Application = {};

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Page
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 페이지
	 * 
	 * @name star.ui.Page
	 * @class
	 * @star_desktop
	 * @star_mobile
	 */
	star.ui.registerComponent({
		name: 'Page',
		fields: {
			closed: false
		/**
		 * 데이터.<br/>
		 * <br/>
		 * 팝업 윈도우에서는 호출한 파라미터가 담겨져 있음.<br/>
		 * 
		 * @name star.ui.Page.Data
		 * @field
		 * @type Object
		 * @example
		 * var value = $.Page.Data['key'];
		 */
		},
		methods_static: {
			/**
			 * 페이지 초기화
			 * 
			 * @param {Object} option 옵션
			 * @param {Function} [option.init] 초기화 이벤트 핸들러
			 * @returns {star.ui.Page}
			 * @example
			 * $.Page({
			 *   init: function() {
			 *     window.alert(JSON.stringify($.Page.Data));
			 *   },
			 *   Search: function(page) {
			 *   }
			 * });
			 * 
			 * $('#button').Button({
			 *   click: function() {
			 *     $.Page.Search(1);
			 *   }
			 * });
			 */
			Page: function(option) {
				if (window.opener) {
					var instance = window.opener.$.star.ui.Popup.instances[window.name];

					$(window).unload(function() {
						option.Close(null);
					});

					/** @ignore */
					option.Close = function(data) {
						if (star.ui.Page.closed === true)
							return;

						star.ui.Page.closed = true;

						if (data !== null)
							window.close();

						if (instance.close !== undefined)
							instance.close(data);
					};
					option.Data = instance.data;
				} else {
					option.Data = {};
				}

				if (option.init !== undefined)
					$(function() {
						option.init();

						$(document.body).css('visibility', 'visible');
					});
				else
					$(function() {
						$(document.body).css('visibility', 'visible');
					});

				$.extend($.Page, option);
			},
			/**
			 * 페이지 닫기.<br/>
			 * <br/>
			 * 팝업 윈도우에서만 호출 가능.<br/>
			 * 
			 * @name star.ui.Page.Close
			 * @function
			 * @param {Object} data 리턴할 데이터
			 * @example
			 * $.Page.Close({key: 'value'});
			 */
			/**
			 * 입력/클릭을 제한하는 오버레이 표시.
			 */
			Block: function() {
				if ($.blockUI !== undefined)
					$.blockUI({
						message: null
					});
			},
			/**
			 * 입력/클릭을 제한하는 오버레이 숨김.
			 */
			Unblock: function() {
				if ($.unblockUI !== undefined)
					$.unblockUI();
			},
			/**
			 * 프린트.
			 */
			Print: function() {
				window.print();
			},
			/**
			 * 페이지 이동
			 * 
			 * @param {String} url 이동할 주소. 같은 페이지로 파라미터만 변경해서 이동할 경우 빈문자열 사용.
			 * @param {star.data.IMap} [params]
			 * @example
			 * $.Navigate('url');
			 * @example
			 * var params = {
			 *   key1: 'value1',
			 *   key2: 'value2'
			 * };
			 * 
			 * $.Navigate('url', params);
			 */
			Navigate: function(url, params) {
				if (params !== undefined)
					url += '?' + $.param(params);

				window.location.href = url;
			},
			/**
			 * 페이지 앞으로 이동
			 * 
			 * @example
			 * $.Forward();
			 */
			Forward: function() {
				window.history.forward();
			},
			/**
			 * 페이지 뒤로 이동
			 * 
			 * @example
			 * $.Back();
			 */
			Back: function() {
				window.history.back();
			},

			/**
			 * 페이지 새로고침
			 * 
			 * @example
			 * $.Reload();
			 */
			Reload: function() {
				window.location.reload();
			},
			/**
			 * 쿼리스트링 조회
			 * 
			 * @param {String} name 파라미터 이름
			 * @returns {String|undefined} 파라미터 값
			 * @example
			 * var value = $.Param('key'); // 키가 존재하지 않으면 빈문자열 반환
			 * @example
			 * var value = $.Param['key']; // 키가 존재하지 않으면 undefined 반환
			 */
			Param: function(key) {
				return $.Param[key] || '';
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Button
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 버튼
	 * 
	 * @name star.ui.Button
	 * @class
	 * @extends star.ui.IDisablable
	 * @property_ignore {String} [library] [설정] 사용할 라이브러리. 데스크탑 환경에서는 jqueryui, 모바일 환경에서는 jquerymobile이 기본값으로 사용됨. html, jqueryui, jquerymobile, bootstrap
	 * @requires HTML or jQuery UI Button or jQuery Mobile Button
	 * @star_desktop
	 * @star_mobile
	 * @star_ui
	 * @star_mobile
	 * @star_bootstrap
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {Boolean} [option.init=false] 화면 초기화 후 클릭 이벤트 발생 여부
	 * @param {Function} [option.click] 클릭 이벤트 핸들러
	 * @example
	 * $('#button').Button({
	 *   init: false,
	 *   click: function() {
	 *     // do something
	 *   }
	 * });
	 */
	star.ui.registerComponent({
		name: 'Button',
		fields:
		/**
		 * @lends star.ui.Button
		 */
		{
			/**
			 * [설정] 라이브러리 렌더링 여부
			 * 
			 * @defaults false
			 */
			render: false
		},
		constructor: function(option) {
			option = star.option(star.ui.Button, option);

			this.data('star-ui', 'button');

			switch (star.ui.library) {
				case 'jqueryui':
					if (star.ui.Button.render)
						this.button();
					break;
				case 'jquerymobile':
					break;
				case 'bootstrap':
					break;
			}

			if (option.click !== undefined)
				this.click(function() {
					var button = $(this);

					if (button.data('star-enabled') === false)
						return;

					option.click.apply(button, arguments);
				});

			if (option.init === true)
				$(this.click);

			return this;
		},
		methods_check: function() {
			return this.data('star-ui') === 'button';
		},
		methods: {
			/**
			 * 활성화 여부 조회
			 * 
			 * @name star.ui.Button#Enabled^1
			 * @function
			 * @returns {Boolean}
			 * @example
			 * var enabled = $('#button').Enabled();
			 */
			/**
			 * 활성화 여부 설정
			 * 
			 * @name star.ui.Button#Enabled^2
			 * @function
			 * @param {Boolean} enabled
			 * @returns {star.ui.Button}
			 * @example
			 * $('#button').Enabled(enabled);
			 */
			Enabled: function(enabled) {
				if (enabled !== undefined)
					this.data('star-enabled', enabled);

				switch (star.ui.library) {
					case 'jqueryui':
						if (star.ui.Button.render)
							if (enabled === undefined)
								return !this.button('option', 'disabled');
							else {
								if (enabled === true)
									return this.button('enable');
								else
									return this.button('disable');
							}
						else
							this.attr('disabled', 'disabled');
						break;
					case 'jquerymobile':
						if (enabled === undefined)
							return !this.attr('disabled');
						else {
							if (enabled === true)
								return this.button('enable');
							else
								return this.button('disable');
						}
						break;
					case 'bootstrap':
						if (enabled === undefined)
							return this.hasClass('disabled') === false;
						else {
							if (enabled === true)
								this.removeClass('disabled').removeAttr('disabled');
							else
								this.addClass('disabled').attr('disabled', 'disabled');
						}
						break;
				}

				return this;
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Number
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.autoNumeric !== undefined) {
		/**
		 * 숫자 입력 컴포넌트
		 * 
		 * @name star.ui.Number
		 * @class
		 * @extends star.ui.Text
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @param {Boolean} [option.spinner] <del>스피너 표시 여부</del>
		 * @param {Number} [option.min] <del>최소값</del>
		 * @param {Number} [option.max] <del>최대값</del>
		 * @param {Number} [option.step] <del>증가값</del>
		 * @requires <a href="http://www.decorplanit.com/plugin/">autoNumeric</a>
		 * @example
		 * $('#number').Number({
		 *   precision: 2
		 * });
		 */
		star.ui.registerComponent({
			name: 'Number',
			fields: {
				/**
				 * [옵션] 소숫점 자릿수
				 */
				precision: 0
			},
			constructor_check: function() {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				option = star.option(star.ui.Number, option);

				return this.autoNumeric({
					aSep: ',',
					aPad: false,
					mDec: option.precision,
					dGroup: '3',
					vMax: Number.MAX_VALUE
				});
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Spinner
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.spinner !== undefined) {
		/**
		 * 스피너 컴포넌트
		 * 
		 * @name star.ui.Spinner
		 * @class
		 * @extends star.ui.IDisablable
		 * @extends star.ui.IField
		 * @star_desktop
		 * @constructs
		 * @requires <a href="http://jqueryui.com/spinner/">jQuery UI Spinner</a> <del>or https://github.com/btburnett3/jquery.ui.spinner</del>
		 * @example
		 * $('#spinner').Spinner({
		 * });
		 */
		star.ui.registerComponent({
			name: 'Spinner',
			constructor_check: function() {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				var setting = {};

				if (option !== undefined) {
				}

				return this.spinner(setting);
			},
			methods_check: function() {
				return this.hasClass('ui-spinner-input');
			},
			methods: {
				/**
				 * 활성화 여부 조회
				 * 
				 * @name star.ui.Spinner#Enabled^1
				 * @function
				 * @returns {Boolean}
				 * @example
				 * var enabled = $('#spinner').Enabled();
				 */
				/**
				 * 활성화 여부 설정
				 * 
				 * @name star.ui.Spinner#Enabled^2
				 * @function
				 * @param {Boolean} enabled
				 * @returns {star.ui.Spinner}
				 * @example
				 * $('#spinner').Enabled(enabled);
				 */
				Enabled: function(enabled) {
					if (enabled === undefined)
						return this.spinner('option', 'disabled') === false;
					else {
						if (enabled)
							return this.spinner('enable');
						else
							return this.spinner('disable');
					}
				}
			/**
			 * 수정가능 여부 조회
			 * 
			 * @name star.ui.Spinner#Editable^1
			 * @function
			 * @returns {star.ui.Spinner}
			 * @example
			 * var editable = $('#spinner').Editable();
			 * @ignore
			 */
			/**
			 * 수정가능 여부 설정
			 * 
			 * @name star.ui.Spinner#Editable^2
			 * @function
			 * @returns {star.ui.Spinner}
			 * @example
			 * $('#spinner').Editable(editable);
			 * @ignore
			 */
			/*
			Editable: function(editable) {
				if (editable === undefined)
					return !this.attr('readonly');
				else {
					if (editable === true)
						return this.removeAttr('readonly');
					else
						return this.attr('readonly', 'readonly');
				}
			}
			*/
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Date
	///////////////////////////////////////////////////////////////////////////

	if ($.datepicker !== undefined) {
		/**
		 * 날짜
		 * 
		 * @name star.ui.Date
		 * @class
		 * @extends star.ui.Text
		 * @property {String} image [설정] 달력 아이콘 주소
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires <a href="http://api.jqueryui.com/datepicker/">jQuery UI Datepicker</a>
		 * @example
		 * $('#date').Date();
		 * @example
		 * &lt;input id="date" type="text"/>
		 * });
		 */
		star.ui.registerComponent({
			name: 'Date',
			extend: 'Text',
			fields: {
				image: '/lib/ext/jquery.ui.monthpicker/images/calendar.png'
			},
			constructor_check: function(mode) {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				return this.Text(option).datepicker({
					constrainInput: true,
					dateFormat: 'yy-mm-dd',
					buttonImage: star.ui.Date.image,
					buttonImageOnly: true,
					changeYear: true,
					changeMonth: true,
					showOn: 'both' // focus, button
				});
			},
			methods_check: function() {
				return this.hasClass('hasDatepicker') === true;
			},
			methods: {
				Editable: function(editable) {
					if (editable === true)
						this.datepicker('option', 'showOn', 'both').next().show();
					else
						this.datepicker('option', 'showOn', 'button').next().hide();
				}
			}
		});

		star.init(function() {
			switch (star.locale) {
				case 'ko':
					$.datepicker.regional['ko'] = {
						closeText: '닫기',
						prevText: '이전달',
						nextText: '다음달',
						currentText: '오늘',
						monthNames: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
						monthNamesShort: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
						dayNames: [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
						dayNamesShort: [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesMin: [ '일', '월', '화', '수', '목', '금', '토' ],
						weekHeader: 'Wk',
						dateFormat: 'yy-mm-dd',
						firstDay: 0,
						isRTL: false,
						showMonthAfterYear: true,
						yearSuffix: '년'
					};
					$.datepicker.setDefaults($.datepicker.regional['ko']);
					break;
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: DateRange
	///////////////////////////////////////////////////////////////////////////

	if ($.datepicker !== undefined) {
		/**
		 * 날짜 범위
		 * 
		 * @name star.ui.DateRange
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires <a href="http://api.jqueryui.com/datepicker/">jQuery UI Datepicker</a>
		 * @example
		 * $('#daterange').DateRange();
		 * @example
		 * &lt;span id="daterange">
		 *   &lt;input id="date1" type="text"/>
		 *   ~
		 *   &lt;input id="date2" type="text"/>
		 * &lt;/span>
		 */
		star.ui.registerComponent({
			name: 'DateRange',
			constructor: function(option) {
				var dates = this.find('input');

				return $.DateRange($(dates[0]), $(dates[1]));
			},
			methods_static:
			/**
			 * @lends star.ui.DateRange
			 */
			{
				/**
				 * 날짜 범위
				 * 
				 * @param {String|jQuery} date1
				 * @param {String|jQuery} date2
				 * @example
				 * $.DateRange('#date1', '#date2');
				 * @example
				 * &lt;table>
				 *   &lt;tr>
				 *     &lt;th>date1&lt;/th>
				 *     &lt;td>&lt;input id="date1" type="text"/>&lt;/td>
				 *     &lt;th>date2&lt;/th>
				 *     &lt;td>&lt;input id="date2" type="text"/>&lt;/td>
				 *   &lt;/tr>
				 * &lt;/table>
				 */
				DateRange: function(date1, date2) {
					if (typeof date1 === 'string')
						date1 = $(date1);
					if (typeof date2 === 'string')
						date2 = $(date2);

					if (date1.hasClass('hasDatepicker') === false)
						date1.Date();
					if (date2.hasClass('hasDatepicker') === false)
						date2.Date();

					date1.datepicker('option', 'onClose', function(selectedDate) {
						date2.datepicker('option', 'minDate', selectedDate);
					});

					date2.datepicker('option', 'onClose', function(selectedDate) {
						date1.datepicker('option', 'maxDate', selectedDate);
					});
				}
			}
		});
	}

	/////////////////////////////////////////////////////////////////////////
	// STAR UI: DateSelect
	/////////////////////////////////////////////////////////////////////////

	/**
	 * 날짜 선택 컴포넌트.
	 * 
	 * @name star.ui.DateSelect
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @example
	 * $('#date').DateSelect();
	 * @example
	 * &lt;span id="date">
	 *   &lt;select id="year">&lt;/select>년
	 *   &lt;select id="month">&lt;/select>월
	 *   &lt;select id="date">&lt;/select>일
	 * &lt;/span>
	 */
	star.ui.registerComponent({
		name: 'DateSelect',
		constructor: function() {
			var children = this.find('select');

			return $.DateSelect(children[0], children[1], children[2]);
		},
		methods_static: {
			/**
			 * @name star.ui.DateSelect.DateSelect
			 * @function
			 */
			DateSelect: function(year, month, date) {
				var t = new Date();
				var y = t.getFullYear();
				var ys = [];
				var ms = [];

				for ( var i = y - 2; i <= y + 2; i++)
					ys.push({
						value: i,
						label: i
					});

				for ( var i = 1; i <= 12; i++)
					ms.push({
						value: i < 10 ? '0' + i : '' + i,
						label: i
					});

				var change = function() {
					var d = new Date(parseInt($(year).val()), parseInt($(month).val()), 0).getDate();
					var ds = [];

					for ( var i = 1; i <= d; i++)
						ds.push({
							value: i < 10 ? '0' + i : '' + i,
							label: i
						});

					$(date).empty().Options(ds);
				};

				$(year).Options(ys).val(y).change(change);
				$(month).Options(ms).val(t.getMonth() + 1).change(change);

				change();

				$(date).val(t.getDate());
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Month
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.monthpicker !== undefined) {
		/**
		 * 년월.
		 * 
		 * @name star.ui.Month
		 * @class
		 * @extends star.ui.Text
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires https://github.com/thebrowser/jquery.ui.monthpicker
		 * @example
		 * $('#month').Month({
		 * });
		 */
		star.ui.registerComponent({
			name: 'Month',
			constructor: function(option) {
				var names = [];

				switch (star.locale) {
					case 'ko':
						names = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
						break;
				}

				return this.monthpicker({
					showOn: 'both',
					buttonImage: 'lib/ext/jquery.ui.monthpicker/images/calendar.png',
					buttonImageOnly: true,
					monthNamesShort: names,
					yearRange: 'c-2:c+2',
					dateFormat: 'yy-mm'
				});
			}
		});

		if ($.validator !== undefined) {
			$.validator.addMethod('month', function(value, element, param) {
				return this.optional(element) || /^[0-9]{4}-(0[0-9]|1[12])$/g.test(value);
			});

			switch (star.locale) {
				case 'ko':
					$.validator.messages.month = '알 수 없는 형식입니다';
					break;
			}
			return this.monthpicker({
				showOn: 'both',
				buttonImage: star.ui.Date.image,
				buttonImageOnly: true,
				monthNamesShort: names,
				yearRange: 'c-2:c+2',
				dateFormat: 'yy-mm'
			});
		}
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: MonthRange
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.monthpicker !== undefined) {
		/**
		 * 년월 범위.
		 * 
		 * @name star.ui.MonthRange
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @example
		 * $('#monthrange').MonthRange();
		 * @example
		 * &lt;span id="monthrange">
		 *   &lt;input id="month1" type="text"/>
		 *   ~
		 *   &lt;input id="month2" type="text"/>
		 * &lt;/span>
		 */
		star.ui.registerComponent({
			name: 'MonthRange',
			fields:
			/**
			 * @lends star.ui.MonthRange
			 */
			{
				/**
				 * [설정] 범위 오류 시 실행될 함수
				 * 
				 * @field
				 * @type Function
				 */
				error: function() {
					window.alert('범위가 잘못되었습니다');
				}
			},
			constructor: function(option) {
				var dates = this.find('input');

				return $.MonthRange($(dates[0]), $(dates[1]));
			},
			methods_static:
			/**
			 * @lends star.ui.MonthRange
			 */
			{
				/**
				 * 날짜 범위.
				 * 
				 * @param {String|jQuery} month1
				 * @param {String|jQuery} month2
				 * @example
				 * $.MonthRange('#month1', '#month2');
				 * @example
				 * &lt;table>
				 *   &lt;tr>
				 *     &lt;th>month1&lt;/th>
				 *     &lt;td>&lt;input id="month1" type="text"/>&lt;/td>
				 *     &lt;th>month2&lt;/th>
				 *     &lt;td>&lt;input id="month2" type="text"/>&lt;/td>
				 *   &lt;/tr>
				 * &lt;/table>
				 */
				MonthRange: function(date1, date2) {
					date1.MonthComponent().change(function() {
						var value1 = date1.val();
						var value2 = date2.val();

						if (value2 !== '' && value1 > value2) {
							date1.val('');

							star.ui.MonthRange.error();
						}
					});

					date2.MonthComponent().change(function() {
						var value1 = date1.val();
						var value2 = date2.val();

						if (value1 !== '' && value1 > value2) {
							date2.val('');

							star.ui.MonthRange.error();
						}
					});
				}
			}
		});
	}

	/////////////////////////////////////////////////////////////////////////
	// STAR UI: MonthSelect
	/////////////////////////////////////////////////////////////////////////

	/**
	 * 월 선택 컴포넌트.
	 * 
	 * @name star.ui.MonthSelect
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @example
	 * $('#date').MonthSelect();
	 * @example
	 * &lt;span id="date">
	 *   &lt;select id="year">&lt;/select>년
	 *   &lt;select id="month">&lt;/select>월
	 * &lt;/span>
	 */
	star.ui.registerComponent({
		name: 'MonthSelect',
		constructor: function() {
			var children = this.find('select');

			return $.MonthSelect(children[0], children[1]);
		},
		methods_static: {
			/**
			 * @name star.ui.MonthSelect.MonthSelect
			 * @function
			 */
			MonthSelect: function(year, month) {
				var t = new Date();
				var y = t.getFullYear();
				var ys = [];
				var ms = [];

				for ( var i = y - 2; i <= y + 2; i++)
					ys.push({
						value: i,
						label: i
					});

				for ( var i = 1; i <= 12; i++)
					ms.push({
						value: i < 10 ? '0' + i : '' + i,
						label: i
					});

				$(year).Options(ys).val(y);
				$(month).Options(ms).val(t.getMonth() + 1);
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Grid
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.jqGrid !== undefined) {
		/**
		 * 그리드.<br/>
		 * <br/>
		 * TODO: formatter
		 * 
		 * @name star.ui.Grid
		 * @class
		 * @extends star.ui.IRecordSet
		 * @star_desktop
		 * @property {Number} [click_delay=0] [설정] 더블크릭 처리를 위해 클릭 후 대기할 시간 (단위: 1/1000초)
		 * @constructs
		 * @param {Object} option 옵션
		 * @param {Object[]} option.columns 컬럼 목록
		 * @param {String} option.columns.id 컬럼 아이디
		 * @param {String} [option.columns.title=''] 컬럼 제목
		 * @param {Boolean} [option.columns.visible=true] 컬럼 표시 여부
		 * @param {Boolean} [option.columns.sortable=false] 컬럼 정렬 여부
		 * @param {String} [option.columns.type="text"] 컬럼 타입 (text, checkbox)
		 * @param_TODO {Function} [option.columns.checkbox_change] 컬럼 타입이 체크박스일 경우 이벤트
		 * @param {Function} [option.columns.formatter] 포멧터
		 * @param {Function} [option.columns.unformatter] 언포멧터
		 * @param {Number} [option.columns.width] 컬럼 넓이
		 * @param {Boolean} [option.columns.fixed=false] 컬럼 넓이 고정 여부
		 * @param {Boolean} option.number 행번호 표시 여부
		 * @param {Boolean} option.footer 풋터 표시 여부
		 * @param {Boolean} option.sortable 컬럼 정렬 가능 여부
		 * @param {Boolean} option.resizable 컬럼 리사이즈 가능 여부
		 * @param {Boolean} option.tooltip 툴팁 표시 여부
		 * @param {Number} option.height 그리드 높이 (단위: 픽셀)
		 * @param {Function} option.click 행 클릭 이벤트 핸들러
		 * @requires <a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs">jqGrid</a>
		 * @example
		 * $('#grid').Grid({
		 *   columns: [
		 *     { id: 'column1', title: 'Column #1', visible: true, sortable: false, align: 'right', width: 100, fixed: false },
		 *     { id: 'column2', title: 'Column #2', visible: true, sortable: false },
		 *     {
		 *       id: 'image', 
		 *       title: 'image',
		 *       formatter: function(value, data) {
		 *         // row id => data.row
		 *         // row values => data.values.column
		 *       },
		 *       unformatter: function(value) {
		 *       }
		 *     }
		 *   ],
		 *   number: false,
		 *   footer: false,
		 *   sortable: false,
		 *   resizable: false,
		 *   tooltip: false,
		 *   click: function(row) {
		 *   },
		 *   dblclick: function(row) {
		 *   }
		 * });
		 */
		star.ui.registerComponent({
			name: 'Grid',
			fields: {
				click_delay: 0
			},
			constructor_check: function() {
				return this.is('table');
			},
			constructor: function(option) {
				var setting = {
					datatype: 'local',
					autowidth: true,
					colNames: [],
					colModel: [],
					cmTemplate: {
						title: option.tooltip === true
					}
				};

				if (option.number !== undefined)
					setting.rownumbers = option.number;

				if (option.footer !== undefined)
					setting.footerrow = option.footer;

				for ( var key in option) {
					switch (key) {
						case 'columns':
							var columns = option.columns;

							for ( var i = 0, l = columns.length; i < l; i++) {
								var column = columns[i];
								var model = {
									name: column.id,
									hidden: column.visible === false,
									sortable: column.sortable || option.sortable || false
								};

								if (column.width !== undefined) {
									model.width = column.width;

									if (column.fixed !== undefined)
										model.fixed = column.fixed;
								}

								if (column.align !== undefined)
									model.align = column.align;

								// http://www.trirand.com/jqgridwiki/doku.php?id=wiki:custom_formatter
								switch (column.type) {
									case 'checkbox':
										/** @ignore */
										model.formatter = function(cellvalue, options, rowObject) {
											return '<input value="Y" type="checkbox"' + (cellvalue === 'Y' ? 'checked' : '') + '/>';
										};
										/** @ignore */
										model.unformat = function(cellvalue, options, cellobject) {
											return $(cellobject).children().Checked() ? 'Y' : 'N';
										};
										break;
								}

								if (column.formatter !== undefined)
									(function() {
										var func = column.formatter;

										/** @ignore */
										model.formatter = function(cellvalue, options, rowObject) {
											return func(cellvalue, {
												row: options.rowId,
												values: rowObject
											});
										};
									})();

								if (column.unformatter !== undefined)
									(function() {
										var func = column.unformatter;

										/** @ignore */
										model.unformat = function(cellvalue, options, cellobject) {
											return func($(cellobject));
										};
										model.editable = true;
									})();

								setting.colNames.push(column.title);
								setting.colModel.push(model);
							}
							break;
						//case 'height':
						//	break;
						case 'click':
							if (star.ui.Grid.click_delay === 0 || option.dblclick === undefined)
								/** @ignore */
								setting.onSelectRow = option.click;
							else
								/** @ignore */
								setting.onSelectRow = function() {
									var self = this;
									var args = arguments;
									var grid = $(this);

									setTimeout(function() {
										var dblclick = parseInt(grid.data('star-dblclick'));

										if (dblclick > 0)
											grid.data('star-dblclick', dblclick - 1);
										else
											option.click.apply(self, args);
									}, star.ui.Grid.click_delay);
								};
							break;
						case 'dblclick':
							if (star.ui.Grid.click_delay === 0 || option.click === undefined)
								/** @ignore */
								setting.ondblClickRow = option.dblclick;
							else
								/** @ignore */
								setting.ondblClickRow = function() {
									$(this).data('star-dblclick', 2);

									option.dblclick.apply(this, arguments);
								};
							break;
						default:
							setting[key] = option[key];
							break;
					}
				}

				return this.addClass('star-recordset').addClass('star-clearable').data('star-option', option).jqGrid(setting);
			},
			methods_check: function() {
				return this.hasClass('ui-jqgrid-btable');
			},
			methods: {
				/**
				 * 레코드셋 데이터 조회
				 * 
				 * @name star.ui.Grid#RecordSet^1
				 * @function
				 * @returns {star.data.RecordSet}
				 * @example
				 * var rs = $('#grid').RecordSet();
				 */
				/**
				 * 레코드셋 데이터 설정
				 * 
				 * @name star.ui.Grid#RecordSet^2
				 * @function
				 * @param {star.data.RecordSet} value 데이터
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').RecordSet(rs);
				 */
				RecordSet: function(value) {
					if (value === undefined)
						return {
							nc_list: this.jqGrid('getRowData')
						};
					else
						return this.setGridParam({
							rowNum: value.length,
							data: value.nc_list
						}).trigger('reloadGrid');
				},

				/**
				 * 레코드 데이터 조회
				 * 
				 * @name star.ui.Grid#Record^1
				 * @function
				 * @param {String} row 행 아이디
				 * @returns {star.data.IMap}
				 * @example
				 * var record = $('#grid').Record('row');
				 */
				/**
				 * 레코드 데이터 설정
				 * 
				 * @name star.ui.Grid#Record^2
				 * @function
				 * @param {String} row 행 아이디
				 * @param {star.data.IMap} value 행 데이터
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Record('row', map);
				 */
				Record: function(row, value) {
					if (value === undefined) {
						return this.jqGrid('getRowData', row);
					} else {
						this.jqGrid('setRowData', row, value); // return boolean

						return this;
					}
				},

				/**
				 * 풋터 데이터 조회
				 * 
				 * @name star.ui.Grid#Footer^1
				 * @function
				 * @returns {star.data.IMap}
				 * @example
				 * var map = $('#grid').Footer();
				 */
				/**
				 * 풋터 데이터 설정
				 * 
				 * @name star.ui.Grid#Footer^2
				 * @function
				 * @param {star.data.IMap} value 행 데이터
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Footer(map);
				 */
				Footer: function(value) {
					if (value === undefined) {
						return this.jqGrid('footerData', 'get');
					} else {
						return this.jqGrid('footerData', 'set', value);
					}
				},

				/**
				 * 행 갯수 조회. 그리드에 있는 데이터의 갯수를 조회합니다.
				 * 
				 * @returns {star.ui.Grid}
				 * @example
				 * var count = $('#grid').Length();
				 */
				Length: function() {
					return this.getGridParam('reccount'); // records
				},

				/**
				 * 초기화
				 * 
				 * @name star.ui.Grid#Clear
				 * @function
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Clear();
				 */
				_clear: function() {
					return this.jqGrid('clearGridData', true); // clearfooter
				},

				/**
				 * 행 선택
				 * 
				 * @name star.ui.Grid#Select
				 * @function
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Select(row);
				 */
				Select: function(row) {
					return this.jqGrid('setSelection', row, true); // event:onSelectRow fire
				},

				/**
				 * 행 선택 해제
				 * 
				 * @name star.ui.Grid#Unselect
				 * @function
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Unselect();
				 */
				Unselect: function() {
					return this.jqGrid('resetSelection');
				},

				/**
				 * 선택된 행을 선택되지 않을 상태로 변경
				 * 
				 * @name star.ui.Grid#Reset
				 * @function
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Reset();
				 * @deprecated deprecated
				 */
				Reset: function() {
					return this.jqGrid('resetSelection');
				},

				/**
				 * 조회
				 * 
				 * @name star.ui.Grid#Get
				 * @function
				 * @param {String} id 행아이디
				 * @returns {star.data.IMap} 값
				 * @example
				 * var value = $('#grid').Get('row_10');
				 */
				Get: function(id) {
					return this.jqGrid('getRowData', id); // getLocalRow
				},

				/**
				 * 추가
				 * 
				 * @name star.ui.Grid#Add
				 * @function
				 * @param {star.data.IMap} value 값
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Add({column: 'value'});
				 */
				Add: function(value) {
					this.jqGrid('addRowData', 'sga_' + $.jgrid.randId(), value); // return Boolean

					return this;
				},

				/**
				 * 삭제
				 * 
				 * @name star.ui.Grid#Remove
				 * @function
				 * @param {String} id 행아이디
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Remove(id);
				 */
				Remove: function(id) {
					this.jqGrid('delRowData', id); // return Boolean

					return this;
				},

				/**
				 * 정렬
				 * 
				 * @name star.ui.Grid#Sort
				 * @function
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Sort();
				 */
				Sort: function() {
					var data = this.jqGrid('getRowData');

					switch (data.length) {
						case 0:
						case 1:
							break;
						default:
							this.jqGrid('clearGridData');
							this.setGridParam({
								rowNum: data.length,
								data: data
							}).trigger('reloadGrid');
							break;
					}

					return this;
				}
			}
		/*
		TODO:
		$(function() {
			$(window).bind('resize', function() {
				$('.ui-jqgrid-btable').each(function() {
					var grid = $(this);
					grid.jqGrid('setGridWidth', grid.closest('.ui-jqgrid').parent().width() - 2);
				});
			}).trigger('resize');
		});
		*/
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: ListView
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.listview !== undefined) {
		/**
		 * 리스트뷰.<br/>
		 * 
		 * @name star.ui.ListView
		 * @class
		 * @extends star.ui.IComponent
		 * @star_mobile
		 * @constructs
		 * @param {Object} option 옵션
		 * @param {String|Function} option.render 렌더링 함수 또는 렌더링 패턴
		 * @param {Function} [option.click] 행 클릭 이벤트 핸들러
		 * @requires <a href="http://jquerymobile.com/demos/1.2.0/docs/lists/index.html">jQuery Mobile Listview</a>
		 * @example
		 * $('#list').ListView({
		 *   render: function(record) {
		 *     return '<span>' + record.title + '</span>';
		 *   },
		 *   click: function(row) {
		 *   }
		 * });
		 */
		star.ui.registerComponent({
			name: 'ListView',
			constructor: function(option) {
				option = star.option(star.ui.ListView, option);

				this.data('star-option', option);

				if (option.click !== undefined)
					this.on('click', '> li', function() {
						option.click($(this).index());
					});

				return this.addClass('star-recordset-set').addClass('star-clearable');
			},
			methods_check: function() {
				return this.hasClass('ui-listview');
			},
			methods: {
				/**
				 * 레코드셋 데이터 설정
				 * 
				 * @name star.ui.ListView#RecordSet
				 * @function
				 * @param {star.data.RecordSet} value 데이터
				 * @returns {star.ui.ListView}
				 * @example
				 * $('#list').RecordSet(rs);
				 */
				RecordSet: function(value) {
					if (value === undefined)
						return {
							nc_list: []
						};
					else
						return this.Add(value.nc_list);
				},

				/**
				 * 추가
				 * 
				 * @name star.ui.ListView#Add
				 * @function
				 * @param {star.data.IMap|star.data.IMap[]} value 값
				 * @returns {star.ui.ListView}
				 * @example
				 * $('#list').Add({column: 'value'});
				 */
				Add: function(value) {
					var option = this.data('star-option');
					var html = '';

					if ($.isArray(value) === false)
						value = [ value ];

					if ($.isFunction(option.render)) {
						for ( var i = 0, l = value.length; i < l; i++)
							html += option.render(value[i]);
					} else {
						for ( var i = 0, l = value.length; i < l; i++)
							for ( var key in value[i])
								html += option.render.replace('{{' + key + '}}', value[i][key]);
					}

					return this.append(html).listview('refresh');
				},

				/**
				 * 초기화
				 * 
				 * @name star.ui.ListView#Clear
				 * @function
				 * @returns {star.ui.ListView}
				 * @example
				 * $('#list').Clear();
				 */
				_clear: function() {
					return this.empty();
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Pager
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 페이저
	 * 
	 * @name star.ui.Pager
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * .star-pager {
	 *   text-align: center;
	 * }
	 * .star-pager a {
	 *   padding: 5px;
	 * }
	 * .star-pager a.active {
	 *   cursor: hand;
	 * }
	 * .star-pager a.inactive {
	 *   color: #888;
	 * }
	 * .star-pager a.current {
	 *   color: #f00;
	 * }
	 * @example
	 * $('#pager').Pager({
	 *   init: true,
	 *   block_size: 10,
	 *   click: function(page) {
	 *     // do something
	 *   }
	 * });
	 */
	star.ui.registerComponent({
		name: 'Pager',
		fields: {
			/**
			 * [설정/옵션] 초기화 후 자동 페이지 처리 또는 실행할 함수
			 * 
			 * @type Boolean|Function
			 */
			init: undefined,
			/**
			 * [설정/옵션] 클릭 이벤트 핸들러
			 * 
			 * @type Function
			 * @defaults 10
			 */
			click: undefined,
			/**
			 * [설정/옵션] 페이지 크기
			 * 
			 * @type String
			 * @defaults 10
			 */
			page_size: 10,
			/**
			 * [설정/옵션] 블럭 크기
			 * 
			 * @type String
			 * @defaults 10
			 */
			block_size: 10,
			/**
			 * [설정/옵션] 
			 * 
			 * @type String
			 */
			space: '',
			/**
			 * [설정/옵션] 
			 * 
			 * @type String
			 */
			item_normal: '<a class="active">{{page}}</a>',
			/**
			 * [설정/옵션] 
			 * 
			 * @type String
			 */
			item_current: '<a class="current">{{page}}</a>',
			/**
			 * [설정/옵션] 이전 페이지 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			page_prev_enabled: '<a class="pre">&lt;</a>',
			/**
			 * [설정/옵션] 이전 페이지 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			page_prev_disabled: '<a class="inactive pre">&lt;</a>',
			/**
			 * [설정/옵션] 다음 페이지 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			page_next_enabled: '<a class="active">&gt;</a>',
			/**
			 * [설정/옵션] 다음 페이지 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			page_next_disabled: '<a class="inactive">&gt;</a>',
			/**
			 * [설정/옵션] 이전 블럭 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			block_prev_enabled: '<a class="first active" title="{{page}}">&lt;&lt;</a>',
			/**
			 * [설정/옵션] 이전 블럭 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			block_prev_disabled: '<a class="first inactive">&lt;&lt;</a>',
			/**
			 * [설정/옵션] 다음 블럭 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			block_next_enabled: '<a class="last active">&gt;&gt;</a>',
			/**
			 * [설정/옵션] 다음 블럭 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			block_next_disabled: '<a class="last inactive">&gt;&gt;</a>'
		},
		constructor: function(option) {
			option = star.option(star.ui.Pager, option);

			this.data('star-option', option).addClass('star-pager')/*.addClass('star-recordset-set')*/.addClass('star-clearable');

			if (option.init !== undefined) {
				var self = this;

				$(function() {
					if ($.isFunction(option.init))
						option.init();
					else
						self.PagerClick(1);
				});
			}

			return this;
		},
		methods_check: function() {
			return this.hasClass('star-pager');
		},
		methods: {
			/**
			 * 페이저 생성
			 * 
			 * @name star.ui.Pager#Build
			 * @function
			 * @param {Number} page 페이지 번호
			 * @param {Number} total 전체 갯수
			 * @param {Number} [page_size] 페이지 크기
			 * @param {Number} [block_size] 블럭 크기
			 * @returns {star.ui.Pager}
			 * @example
			 * $('#pager').Build(1, 100, 10, 10);
			 */
			Build: function(page, total, page_size, block_size) {
				var option = this.data('star-option');

				if (page_size === undefined)
					page_size = option.page_size;
				if (block_size === undefined)
					block_size = option.block_size;

				var pages = Math.floor(total / page_size) + (total % page_size === 0 ? 0 : 1);

				var block = Math.floor(page / block_size) + (page % block_size === 0 ? 0 : 1);
				var blocks = Math.floor(pages / block_size) + (pages % block_size === 0 ? 0 : 1);
				var page_start = page === 0 ? 0 : (block - 1) * block_size + 1;
				var page_end = page === 0 ? 0 : (pages < block * block_size ? pages : block * block_size);

				var o_block_prev;
				var o_block_next;
				var o_page_prev;
				var o_page_next;

				if (block > 1) {
					var target1 = (block - 1) * block_size;

					o_block_prev = $(option.block_prev_enabled.replace('{{page}}', target1)).click(function() {
						option.click(target1);
					});
				} else {
					o_block_prev = $(option.block_prev_disabled);
				}

				if (block < blocks) {
					var target2 = block * block_size + 1;

					o_block_next = $(option.block_next_enabled.replace('{{page}}', target2)).click(function() {
						option.click(target2);
					});
				} else {
					o_block_next = $(option.block_next_disabled);
				}

				if (page > 1) {
					var target3 = page - 1;

					o_page_prev = $(option.page_prev_enabled.replace('{{page}}', target3)).click(function() {
						option.click(target3);
					});
				} else {
					o_page_prev = $(option.page_prev_disabled);
				}

				if (page < pages) {
					var target4 = page + 1;

					o_page_next = $(option.page_next_disabled.replace('{{page}}', target4)).click(function() {
						option.click(target4);
					});
				} else {
					o_page_next = $(option.page_next_disabled);
				}

				this.empty();

				this.append(o_block_prev).append(option.space);
				this.append(o_page_prev).append(option.space);

				if (page > 0) {
					for ( var i = page_start; i <= page_end; i++) {
						var o_page = undefined;

						(function() {
							var p = i;

							if (page != p)
								o_page = $(option.item_normal.replace('{{page}}', p)).click(function() {
									option.click(p);
								});
							else
								o_page = $(option.item_current.replace('{{page}}', p));
						})();

						this.append(o_page).append(option.space);
					}
				}

				this.append(o_page_next).append(option.space);
				this.append(o_block_next);

				return this;
			},

			/**
			 * 레코드셋 데이터로 페이저 생성
			 * 
			 * @name star.ui.Pager#RecordSet
			 * @function
			 * @param {star.data.RecordSet} rs 레코드셋
			 * @returns {star.ui.Pager}
			 * @example
			 * $('#pager').RecordSet(rs);
			 */
			RecordSet: function(rs) {
				return this.PagerBuild(rs.nc_pageNo, rs.nc_totalRecordCount, rs.nc_recordCountPerPage);
			},

			/**
			 * 초기화.
			 * 
			 * @name star.ui.Pager#Clear
			 * @function
			 * @returns {star.ui.Pager}
			 * @example
			 * $('#pager').Clear();
			 */
			_clear: function() {
				return this.PagerBuild(1, 0);
			},

			/**
			 * 페이저 클릭 이벤트 트리거
			 * 
			 * @name star.ui.Pager#Click
			 * @function
			 * @param {Number} page 페이지
			 * @returns {star.ui.Pager}
			 * @example
			 * $('#pager').Click(1);
			 */
			Click: function(page) {
				this.data('star-option').click(page);

				return this;
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Tree
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.jstree !== undefined) {
		/**
		 * 트리
		 * 
		 * @name star.ui.Tree
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @param {star.data.IMap[]} [option.value]
		 * @param {String} [option.id]
		 * @param {String} [option.title]
		 * @param {String} [option.parent]
		 * @param {String} [option.children]
		 * @param {Boolean} [option.expand]
		 * @param {Function} [option.load]
		 * @param {Function} [option.click]
		 * @requires <a href="http://www.jstree.com/">jstree</a>
		 * @example
		 * $('#tree').Tree({
		 *   value: [],
		 *   id: 'id',
		 *   title: 'title',
		 *   parent: 'parent',
		 *   children: 'chilren',
		 *   expand: false,
		 *   load: function(data) {
		 *   },
		 *   click: function(node) {
		 *   }
		 * });
		 */

		/**
		 * @ignore
		 */
		star.ui._Tree = {
			/**
			 * @ignore
			 */
			create: function(option) {
				var setting = {
					plugins: [ 'themes', 'json_data', 'ui' ],
					themes: {},
					json_data: {
						data: []
					},
					load_open: true
				};

				if (option === undefined)
					option = {};

				option = $.extend({}, star.ui.Tree, option);

				if (option.expand === true || option.load !== undefined)
					this.bind('loaded.jstree', function(e, data) {
						if (option.expand === true)
							$(e.target).jstree('open_all');

						if (option.load !== undefined)
							option.load();
					});

				if (option.click !== undefined)
					this.bind('select_node.jstree', function(e, data) {
						option.click($(data.rslt.obj[0]).attr('data-id'));
					});

				if (option.value !== undefined)
					setting.json_data.data = star.ui._Tree.parse(option, option.value);

				return this.addClass('star-recordset-set').data('star-option', option).jstree(setting);
			},
			/**
			 * @ignore
			 */
			parse: function(option, value) {
				//if (option.type === 'list') {
				var tree = [];
				var hash = {};

				option.value = value;

				for ( var i = 0, l = option.value.length; i < l; i++) {
					var value = option.value[i];
					var id = value[option.id];
					var title = value[option.title];
					var parent = value[option.parent];

					var data = {
						data: {
							title: title
						},
						attr: {
							'data-id': id
						},
						metadata: {
							value: value
						},
						children: []
					};

					hash[id] = data;

					var parentData = hash[parent];

					if (parentData !== undefined)
						parentData.children.push(data);
					else
						tree.push(data);
				}
				//}

				return tree;
			}
		};

		star.ui.registerComponent({
			name: 'Tree',
			fields: {
				/**
				 * [설정] 데이터 타입. list <del>or tree</del>
				 * 
				 * @field
				 * @type String
				 * @defaults 'list'
				 */
				type: 'list',
				/**
				 * [설정] 아이디 필드
				 * 
				 * @field
				 * @type String
				 * @defaults 'id'
				 */
				id: 'id',
				/**
				 * [설정] 제목 필드
				 * 
				 * @field
				 * @type String
				 * @defaults 'title'
				 */
				title: 'title',
				/**
				 * [설정] 부모 필드
				 * 
				 * @field
				 * @type String
				 * @defaults 'parent'
				 */
				parent: 'parent',
				/**
				 * [설정] 자식 필드
				 * 
				 * @field
				 * @type String
				 * @defaults 'children'
				 */
				children: 'children',
				/**
				 * [설정] 펼쳐진 상태로 데이터 로드할 지 여부
				 * 
				 * @field
				 * @type String
				 * @defaults false
				 */
				expand: false,
				/**
				 * [옵션] 노드 클릭 핸들러
				 * 
				 * @field
				 * @type Function
				 */
				click: undefined
			},
			constructor: function(option) {
				return star.ui._Tree.create.apply(this, arguments);
			},
			methods_check: function() {
				return this.hasClass('jstree');
			},
			methods: {
				/**
				 * 레코드셋 데이터 설정
				 * 
				 * @name star.ui.Tree#RecordSet
				 * @function
				 * @param {star.data.RecordSet} value 데이터
				 * @returns {star.ui.Tree}
				 * @example
				 * $('#tree').RecordSet(rs);
				 */
				RecordSet: function(value) {
					if (value === undefined)
						return {
							nc_list: []
						};

					this.jstree('destroy');

					var option = this.data('star-option');
					option.value = value.nc_list;

					return star.ui._Tree.create.call(this, option);
				},

				/**
				 * 레코드 데이터 조회
				 * 
				 * @name star.ui.Tree#Record
				 * @function
				 * @param {String} row 행 아이디
				 * @returns {star.data.IMap}
				 * @example
				 * var record = $('#tree').Record('row');
				 */
				Record: function(row, value) {
					return this.find('[data-id="' + row + '"]').data('value');
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Editor
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.tinymce !== undefined) {
		/**
		 * 에디터
		 * 
		 * @name star.ui.Editor
		 * @class
		 * @extends star.ui.IField
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires <a href="http://www.tinymce.com/">tinymce</a>
		 * @example
		 * $('#editor').Editor({
		 * });
		 * @example
		 * &lt;textarea id="editor">&lt;/textarea>
		 */
		star.ui.registerComponent({
			name: 'Editor',
			constructor: function(option) {
				var setting = {
					theme: 'simple'
				};

				option = star.option(star.ui.Editor, option);

				return this.addClass('star-field').tinymce(setting);
			},
			methods_check: function() {
				return this.next().hasClass('mceEditor');
			},
			methods: {
				/**
				 * 값 조회
				 * 
				 * @name star.ui.Editor#Value^1
				 * @function
				 * @returns {String}
				 * @example
				 * var value = $('#editor').Value();
				 */
				/**
				 * 값 설정
				 * 
				 * @name star.ui.Editor#Value^2
				 * @function
				 * @param {String} value
				 * @returns {star.ui.Editor}
				 * @example
				 * $('#editor').Value(value);
				 */
				Field: function(value) {
					if (value === undefined)
						return this.html();
					else
						return this.html(value);
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Tab
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.tabs !== undefined) {
		/**
		 * 탭
		 * 
		 * @name star.ui.Tab
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @param {Number} [option.active] 활성화된 탭 번호 (0부터 시작)
		 * @param {Function} [option.change] 탭 변경 이벤트
		 * @example
		 * $('#tab').Tab({
		 *   active: 0,
		 *   change: function() {
		 *   }
		 * });
		 * @example
		 * $('#tab').Tab(0);
		 */
		star.ui.registerComponent({
			name: 'Tab',
			fields: {
				render: false
			},
			constructor: function(option) {
				var setting = {};
				var link = false;

				if (option !== undefined && $.isPlainObject(option) === false)
					option = {
						active: option
					};

				option = star.option(star.ui.Tab, option);

				if (option.active !== undefined)
					setting.active = option.active;

				if (option.change !== undefined)
					setting.activate = option.change;

				this.find('ul a').each(function() {
					if ($(this).attr('href')[0] !== '#') {
						link = true;
						return false;
					}
				});

				if (link === true)
					/** @ignore */
					setting.beforeActivate = function(e, ui) {
						e.preventDefault();
						window.location.href = ui.newTab.find('a').attr('href');
						return false;
					};

				return this.tabs(setting);
			},
			methods_check: function() {
				return this.hasClass('ui-tabs');
			},
			methods: {
				/**
				 * 선택된된 탭 조회
				 * 
				 * @name star.ui.Tab#Active^1
				 * @function
				 * @star_desktop
				 * @constructs
				 * @return {Number}
				 * @example
				 * var active = $('#tab').Active();
				 */
				/**
				 * 선택된된 탭 변경
				 * 
				 * @name star.ui.Tab#Active^2
				 * @function
				 * @param {Number} value
				 * @example
				 * $('#tab').Active(1);
				 */
				Active: function(value) {
					if ($.fn.tabs !== undefined) {
						if (value === undefined)
							return this.tabs('option', 'active');
						else
							return this.tabs('option', 'active', value);
					}
				},

				/**
				 * 탭 활성화
				 * 
				 * @name star.ui.Tab#Enable
				 * @function
				 * @param {Number} index
				 * @return {star.ui.Tab}
				 */
				Enable: function(index) {
					var disabled = this.tabs('option', 'disabled');
					var result = [];

					if (disabled === true) {
						var length = this.find('> ul > li').length;

						disabled = [];

						for ( var i = 0; i < length; i++)
							disabled.push(i);
					} else if (disabled === false) {
						disabled = [];
					}

					for ( var i = 0; i < disabled.length; i++)
						if (disabled[i] !== index)
							result.push(disabled[i]);

					//console.log('ensable', disabled, result);

					return this.tabs('option', 'disabled', result);
				},

				/**
				 * 탭 비활성화
				 * 
				 * @name star.ui.Tab#Disable
				 * @function
				 * @param {Number} index
				 * @return {star.ui.Tab}
				 */
				Disable: function(index) {
					var disabled = this.tabs('option', 'disabled');
					var result = [ index ];

					if (disabled === true) {
						var length = this.find('> ul > li').length;

						disabled = [];

						for ( var i = 0; i < length; i++)
							disabled.push(i);
					} else if (disabled === false) {
						disabled = [];
					}

					for ( var i = 0; i < disabled.length; i++)
						if (disabled[i] !== index)
							result.push(disabled[i]);

					//console.log('disable', disabled, result);

					return this.tabs('option', 'disabled', result);
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Dialog
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.dialog !== undefined) {
		/**
		 * 다이얼로그
		 * 
		 * @name star.ui.Dialog
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option]
		 * @param {Boolean} [option.modal=true]
		 * @requires jquery-ui
		 * @example
		 * $('#dialog').Dialog({
		 *   modal: true
		 * });
		 */
		star.ui.registerComponent({
			name: 'Dialog',
			fields: {
				/**
				 * [설정/옵션] 모달 여부
				 * 
				 * @fields
				 * @type Boolean
				 * @defaults true
				 */
				modal: true
			},
			constructor: function(option) {
				option = star.option(star.ui.Dialog, option);

				this.ContainerComponent(option).dialog({
					modal: option.modal
				});
			},
			methods_check: function() {
				return this.hasClass('ui-dialog');
			},
			methods: {
				/**
				 * 제목 조회
				 * 
				 * @name star.ui.Dialog#Title^1
				 * @function
				 * @returns {String}
				 * @example
				 * var title = $('#dialog').Title();
				 */
				/**
				 * 제목 변경
				 * 
				 * @name star.ui.Dialog#Title^2
				 * @function
				 * @param {String} value
				 * @returns {star.ui.Dialog}
				 * @example
				 * $('#dialog').Title('new title');
				 */
				Title: function(value) {
					return this.dialog('option', 'title', value);
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Popup
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 팝업
	 * 
	 * @name star.ui.Popup
	 * @class
	 * @star_desktop
	 */
	star.ui.registerComponent({
		name: 'Popup',
		fields: {
			id: 0,
			option: {
				width: 800,
				height: 600,
				modal: false,
				center: false,
				data: {}
			},
			instances: {}
		},
		methods_static: {
			/**
			 * 팝업 윈도우 열기
			 * 
			 * @name star.ui.Popup.Popup
			 * @function
			 * @param {Object} option
			 * @param {String} option.url 주소
			 * @param {Number} [option.width=800] 넓이
			 * @param {Number} [option.height=600] 높이
			 * @param {Boolean} [option.modal=false] <del>모달 여부</del>
			 * @param {Boolean} [option.center=false] 화면 가운데 위치 여부
			 * @param {Object} [option.data] 팝업 윈도우에 넘길 데이터
			 * @param {Function} [option.close] 팝업 윈도우가 닫혔을 때 처리할 이벤트 핸들러. $.Page.Close 함수로 종료하지 않을 경우 null 이 전달됨.
			 * @example
			 * $.Popup({
			 *   modal: true
			 * });
			 */
			Popup: function(option) {
				var setting = $.extend({}, star.ui.Popup.option, option);
				setting.id = 'starPopup' + star.ui.Popup.id++;

				star.ui.Popup.instances[setting.id] = setting;

				var param = 'width=' + setting.width + ',height=' + setting.height;

				if (setting.center === true) {
					param += ',left=' + (window.screen.width - setting.width) / 2;
					param += ',top=' + Math.max((window.screen.height - setting.height) / 2 - 50, 0);
				}

				/*
				if (setting.modal === true) {
					if (window.showModalDialog) {
						window.showModalDialog(setting.url, setting.id, param);
					} else {
						window.open(setting.url, setting.id, param + ',modal=yes');
					}
				} else {
				*/
				window.open(setting.url, setting.id, param);
				/*
				}
				*/
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Chart (Hightcharts)
	///////////////////////////////////////////////////////////////////////////

	if (window.Highcharts !== undefined) {
		/**
		 * 챠트.
		 * 
		 * @name star.ui.ExtHighcharts
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires <a href="http://api.highcharts.com">highcharts</a>
		 */
		star.ui.registerComponent({
			name: 'ExtHighcharts',
			constructor: function(option) {
				return this.ExtHighchartsBuild(option);
			},
			methods:
			/**
			 * @lends star.ui.ExtHighcharts.prototype
			 */
			{
				/**
				 * 챠트 생성.
				 * 
				 * @param {Object} option
				 * @returns {star.ui.ExtHighcharts}
				 */
				ExtHighchartsChart: function(option) {
					return this.ExtHighchartsBuild(option);
				},

				/**
				 * 챠트 생성.
				 * 
				 * @param {Object} option
				 * @returns {star.ui.ExtHighcharts}
				 */
				Build: function(option) {
					if (this.children().hasClass('highcharts-container')) {
						this.data('star-chart').destroy();

						option = $.extend(true, {}, this.data('star-option'), option);
					}

					if (option.chart === undefined)
						option.chart = {};

					if (option.chart.renderTo === undefined)
						option.chart.renderTo = this.attr('id');

					if (option.chart.type === undefined)
						option.chart.type = 'bar';

					if (option.title === undefined)
						option.title = {};

					if (option.title.text === undefined)
						option.title.text = '';

					if (option.xAxis === undefined)
						option.xAxis = {};

					if (option.xAxis.title === undefined)
						option.xAxis.title = {};

					if (option.xAxis.title.text === undefined)
						option.xAxis.title.text = '';

					if (option.yAxis === undefined)
						option.yAxis = {};

					if (option.yAxis.title === undefined)
						option.yAxis.title = {};

					if (option.yAxis.title.text === undefined)
						option.yAxis.title.text = '';

					option.credits = {
						enabled: false
					};

					return this.data('star-chart', new Highcharts.Chart(option)).data('star-option', option);
				}
			},
			methods_check: function() {
				return this.children().hasClass('highcharts-container');
			}
		});
	}

	/////////////////////////////////////////////////////////////////////////
	// STAR Utility
	/////////////////////////////////////////////////////////////////////////

	/**
	 * @name star.utility
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 */
	star.utility = {};

	if ($.cookie !== undefined) {
		/**
		 * 쿠키 조회
		 * 
		 * @name star.utility.Cookie^1
		 * @function
		 * @param {String} key 키
		 * @returns {String|null} 값
		 * @requires <a href="https://github.com/carhartl/jquery-cookie">jquery-cookie</a>
		 * @example
		 * var value = $.Cookie('key');
		 */
		/**
		 * 쿠키 설정
		 * 
		 * @name star.utility.Cookie^2
		 * @function
		 * @param {String} key 키
		 * @param {String|null} value 값. null 일 경우 삭제.
		 * @param {Number|Date} [expires] 숫자일 경우 지정한 일이 지나고 만료. 날짜일 경우 지정일에 만료. 생략하면 브라우저 종료시 만료.
		 * @requires <a href="https://github.com/carhartl/jquery-cookie">jquery-cookie</a>
		 * @example
		 * $.Cookie('key', 'value', 7);
		 */
		$.Cookie = function(key, value, expires) {
			switch (arguments.length) {
				case 1:
					return $.cookie(key);
				case 2:
					if (value !== null)
						$.cookie(key, value, {
							path: '/'
						});
					else
						$.removeCookie(key);
					break;
				case 3:
					$.cookie(key, value, {
						expires: expires,
						path: '/'
					});
					break;
			}
		};
	}

	if (window.CryptoJS !== undefined && window.CryptoJS.enc.Base64 !== undefined) {
		/**
		 * 암호화
		 * 
		 * @name star.utility.Encrypt
		 * @function
		 * @param {String} decrypted 암호화할 문자열
		 * @returns {String} 암호화된 문자열
		 * @example
		 * var encrypted = $.Encrypt(decrypted);
		 */
		$.Encrypt = function(decrypted) {
			return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(decrypted));
		};

		/**
		 * 복호화
		 * 
		 * @name star.utility.Decrypt
		 * @function
		 * @param {String} encrypted 암호 해제할 문자열
		 * @returns {String} 암호 해제된 문자열
		 */
		$.Decrypt = function(encrypted) {
			return CryptoJS.enc.Base64.parse(encrypted);
		};
	}

	/**
	 * 숫자 포멧
	 * 
	 * @name star.utility.NumberFormat
	 * @function
	 * @param {Number} value 숫자
	 * @param {String} [format] 패턴
	 * @returns {String} 숫자 문자열
	 * @deprecated 준비중
	 */
	$.NumberFormat = function(value, format) {
		var str = String(value);
		var x = str.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1))
			x1 = x1.replace(rgx, '$1' + ',' + '$2');

		return x1 + x2;
	};

	/**
	 * 날짜 포멧
	 * 
	 * @name star.utility.DateFormat
	 * @function
	 * @param {Date} value 날짜
	 * @param {String} [format] 패턴
	 * @returns {String} 날짜 문자열
	 * @deprecated 준비중
	 */
	/**
	 * 날짜 파싱
	 * 
	 * @name star.utility.DateParse
	 * @function
	 * @param {String} value 날짜 문자열
	 * @param {String} [format] 패턴
	 * @returns {Date} 날짜
	 * @deprecated 준비중
	 */

	if ($.format !== undefined) {
		$.DateFormat = function(value, format) {
			return '';
		};
	}

	if (Date.CultureInfo !== undefined) {
		/**
		 * @ignore
		 */
		$.DateFormat = function(value, format) {
			return value.toString(format);
		};

		$.DateParse = function(value, format) {
			return Date.parse(value, format);
		};
	}

	star.utility.ArrayRemove = function(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};

	(function() {
		var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, query = window.location.search.substring(1), /**@ignore*/
		decode = function(s) {
			return decodeURIComponent(s.replace(pl, ' '));
		};

		$.Param.count = 0;

		for ( var i = 0; match = search.exec(query); i++) {
			var key = decode(match[1]);
			var value = decode(match[2]);

			$.Param[key] = value;
			$.Param[i] = {
				key: key,
				value: value
			};
			$.Param.count++;
		}
	})();

	/**
	 * 쿼리스트링 인코딩
	 * 
	 * @name star.utility.ParamEncode
	 * @function
	 * @param {String} value 인코딩할 값
	 * @returns {String} 인코딩된 값
	 * @example
	 * var encoded = $.ParamEncode(decoded);
	 */
	$.ParamEncode = function(value) {
		return encodeURIComponent(value);
	};

	/**
	 * 쿼리스트링 디코딩
	 * 
	 * @name star.utility.ParamDecode
	 * @function
	 * @param {String} value 디코딩할 값
	 * @returns {String} 디코딩된 값
	 * @example
	 * var decoded = $.ParamEncode(encoded);
	 */
	$.ParamDecode = function(value) {
		return decodeURIComponent(value.replace('+', ' '));
	};

	///////////////////////////////////////////////////////////////////////////
	// STAR Initializer
	///////////////////////////////////////////////////////////////////////////

	// 샘플 데이터 -->
	/*
	if (window.location.href.indexOf('/web/star/') !== -1) {
		document.write('<script src="/web/star/_sample/_.js"></script>');
		//$.getScript('/web/star/_sample/_.js');
	}
	if (window.location.href.indexOf('/web/project/slms/') !== -1) {
		document.write('<script src="/web/project/slms/_sample/_.js"></script>');
		//$.getScript('/web/project/slms/_sample/_.js');
	}
	*/
	//if (star.service.sample === true)
	document.write('<script src="' + star.root + '_sample/_.js"></script>');
	// <-- 샘플 데이터

	if ($.mobile !== undefined) {
		$.mobile.ajaxEnabled = false;
		$.mobile.ignoreContentEnabled = true;
		$.mobile.pushStateEnabled = false;

		//$.mobile.page.prototype.options.domCache = false;

		$(document).on('pageshow', 'div[data-role="page"]', function() {
			// 78 : iPhone bottom bar height (retina)
			//$('div[data-role="content"]').css('height', parseInt($('div[data-role="page"]').css('height')) - parseInt($('div[data-role="header"]').css('height')) - parseInt($('div[data-role="footer"]').css('height')));
		});
	}

	function script(deps, callback) {
		switch (arguments.length) {
			case 1:
				callback = deps;
				break;
			case 2:
				break;
			default:
				throw new Error();
		}

		star.ui.Page.step = Math.max(1, star.ui.Page.step);

		if (deps === undefined) {
			$(callback);
		} else {
			require(deps, function() {
				$(callback);
			});
		}
	}

	///////////////////////////////////////////////////////////////////////////

})(window);

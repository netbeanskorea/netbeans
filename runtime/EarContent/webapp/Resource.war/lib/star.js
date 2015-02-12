/*
 * COPYRIGHT ⓒ 2013 SK C&C CO., LTD. ALL RIGHT RESERVED.  
 * We are willing to license this program to you only upon the condition that you accept all of the terms contained in the STAR UI Framework License Agreement v1.0. Read the terms thereof carefully before copying or using this program. 
 * If you are not willing to be bound by these terms, do not copy nor use this program.
 */

/**
 * @fileOverview STAR UI RA Reference Manual
 * @author STAR UI RA Part
 * @version 1.5
 */

(function(window) {

	var $ = window.jQuery;

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
	 * Returns a reference to the Object function that created the instance's prototype. Note that the value of tes property is a reference to the function itself, not a string containing the function's name, but it isn't read only (except for primitive Boolean, Number or String values: 1, true, "read-only").
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

	;

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

	// 블럭킹 오버레이가 툴팁보다 위에 표시되도록 설정
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
	 * @name star
	 * @namespace
	 * @star_desktop
	 * @star_mobile
	 */

	$.star = star;
	window.star = star;

	if (star.root === undefined)
		// star.js 파일을 기반으로 스크립트 디렉토리 찾기
		$($('script').get().reverse()).each(function() {
			var s = $(this);
			var src = s.attr('src');

			if (!src)
				return;

			var index = src.indexOf('star.js');

			if (index !== -1) {
				var url = src;

				if (src.charAt(0) !== '/') {
					var href = window.location.href;

					index = href.lastIndexOf('/');

					if (index === href.length - 1)
						url = href + src;
					else
						url = href.substring(0, index + 1) + src;
				}

				star.root = url.replace('star.js', '');

				return false;
			}
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
	 * @name jQuery#Attrs
	 * @function
	 * @returns {Object}
	 */
	$.fn.Attrs = function() {
		var elem = this[0];
		var attrs = {};

		$.each(elem.attributes, function(index, attr) {
			if ($.browser.msie) {
				switch (parseInt($.browser.version, 10)) {
					case 7:
						var defaults = {
							'accessKey': '',
							'dir': '',
							'lang': '',
							'language': '',
							'dataSrc': '',
							'class': '',
							'title': '',
							'role': '',
							'dataFld': '',
							'dataFormatAs': '',
							'name': '',
							'hideFocus': 'false',
							'disabled': 'false',
							'style': 'null',
							'implementation': 'null',
							'aria-level': '0',
							'aria-posinset': '0',
							'tabIndex': '0',
							'aria-setsize': '0',
							'contentEditable': 'inherit'
						};

						if (attr.name.indexOf('on') === 0 && attr.value === 'null')
							return;
						if (attr.name.indexOf('aria-') === 0 && attr.value === '')
							return;
						if (attr.name.indexOf('jQuery') === 0)
							return;
						if (defaults[attr.name] === attr.value)
							return;

						if (elem.tagName === 'BUTTON' && attr.name === 'type' && attr.value === 'button')
							return;
						break;
					case 8:
						if (attr.name.indexOf('jQuery') === 0)
							return;

						if (elem.tagName === 'BUTTON' && attr.name === 'type' && attr.value === 'submit')
							return;
						break;
				}
			}

			attrs[attr.name] = attr.value;
		});

		return attrs;
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
	 * {
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
	 * // 응답 전문 예제
	 * {
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
	 * @example
	 * var ds = $.DataSet();
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
	 * 데이터셋 여부 조회.
	 * 
	 * @name star.data.IsDataSet
	 * @function
	 * @param {Object} ds 데이터셋
	 * @returns {Boolean}
	 */
	$.IsDataSet = function(ds) {
		return ds && ds.fields !== undefined && ds.recordSets !== undefined;
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
	 * var rs = $.RecordSet();
	 * @example
	 * var rs = $.RecordSet(records);
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
	 * 레코드셋 여부 조회.
	 * 
	 * @name star.data.IsRecordSet
	 * @function
	 * @param {Object} rs 레코드셋
	 * @returns {Boolean}
	 */
	$.IsRecordSet = function(rs) {
		return rs && $.isArray(rs.nc_list);
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
	 * jQuery Selector String.
	 * 
	 * @name star.data.Selector
	 * @class
	 * @extends String
	 * @star_desktop
	 * @star_mobile
	 * @see http://api.jquery.com/category/selectors/
	 */

	;

	/////////////////////////////////////////////////////////////////////////
	// STAR Service
	/////////////////////////////////////////////////////////////////////////

	(function(window, $, star) {
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
			platform: 'j2ee', // j2ee, .net

			/**
			 * [설정/.NET] 주소.
			 * 
			 * @field
			 * @type String
			 * @default '/web/json.jmd'
			 */
			url: '/web/json.jmd',

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
			 * [설정/J2EE] HTML 처리 주소.
			 * 
			 * @field
			 * @type String
			 * @default '/web/standard.cmd'
			 */
			content_url: '/web/standard.cmd',

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
				window.alert('FAIL: [' +ds.message.messageId+'] ' + ds.message.messageName);
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
				window.alert('ERROR: [' +ds.message.messageId+'] ' + ds.message.messageName);
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

		var _service = function(url, option) {
			var config = star.service;
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
			else if((Object.prototype.toString.call(setting.request)=='[object Array]')==true) {
				var request = {
					fields: {},
					recordSets: {}	
				};
				for(var i = 0; i < setting.request.length; i++) {
					if(typeof setting.request[i] === 'string') {
						var ds = $(setting.request[i]).DataSet();
						request.fields = $.extend(request.fields, ds.fields);
						request.recordSets = $.extend(request.recordSets, ds.recordSets);
					} else if (setting.request[i].jquery !== undefined) {
						var ds = $(setting.request[i]).DataSet();
						request.fields = $.extend(request.fields, ds.fields);
						request.recordSets = $.extend(request.recordSets, ds.recordSets);
					}
				}
				setting.request = request;
			} else if (setting.request.jquery !== undefined)
				setting.request = setting.request.DataSet();

			if (typeof setting.response === 'string')
				setting.response = $(setting.response);

			if (config.request)
				setting.request = config.request(setting.request);

			if (config.sample === true) {
				(function() {
					console.log('STAR.Service.Request', setting.request);

					if (config.block === true && $.blockUI !== undefined)
						$.blockUI({
							message: null
						});

					var transaction = setting.transaction.replace('#', '_');
					var callback = function(ds) {
						console.log('STAR.Service.Response', ds);

						if (config.response)
							ds = config.response(ds);

						if (ds.message.result === 'OK') {
							if (setting.response) {
								if((Object.prototype.toString.call(setting.response)=='[object Array]')==true) {
									for(var i = 0; i < setting.response.length; i++) {
										if(typeof setting.response[i] === 'string') {
											$(setting.response[i]).DataSet(ds);
										} else {
											setting.response[i].DataSet(ds);
										}
									}
								} else 
									setting.response.DataSet(ds);
							}
							if (setting.success)
								setting.success(ds);
						} else {
							if (setting.fail)
								setting.fail(ds);
							else
								config.fail(ds);
						}

						if (config.block === true && $.unblockUI !== undefined)
							$.unblockUI();
					};

					if (window['_sample_' + transaction])
						callback(window['_sample_' + transaction](setting.request));
					else
						$.getJSON('_sample/' + transaction + '.json', function(data, textStatus, jqXHR) {
							callback(data.dataSet);
						});
				})();
				return;
			}

			switch (config.platform) {
				case 'j2ee':
					setting.url = url;

					_serviceForJ2ee(setting);
					break;
				case '.net':
					setting.url = config.url;

					_serviceForNet(setting);
					break;
				default:
					var message = 'ERROR: star.service.platform = ' + config.platform;
					window.alert(message);
					throw new Error(message);
			}
		};

		var _serviceForJ2ee = function(setting) {
			// 2013. 03. 13 / Service 전처리 추가
			if(typeof star.service.pre_process == 'function') {
				star.service.pre_process(setting);
			}
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
				success: function(response, status, xhr) {
					// 2013. 03. 13 / Service 전처리 추가
					if(typeof star.service.call_pre_process == 'function') {
						star.service.call_pre_process(response, status, xhr);
					}
					
					if (star.service.response)
						response.dataSet = star.service.response(response.dataSet);

					if (response.dataSet.message.result === 'OK') {
						if (setting.response) {
							if((Object.prototype.toString.call(setting.response)=='[object Array]')==true) {
								for(var i = 0; i < setting.response.length; i++) {
									if(typeof setting.response[i] === 'string') {
										$(setting.response[i]).DataSet(response.dataSet);
									} else {
										setting.response[i].DataSet(response.dataSet);
									}
								}
							} else 
								setting.response.DataSet(response.dataSet);
						}

						if (setting.success)
							setting.success(response.dataSet);
					} else {
						if (setting.fail)
							setting.fail(response.dataSet);
						else
							star.service.fail(response.dataSet);
					}
					// 2013. 03. 13 / Service 후처리 추가
					if(typeof star.service.call_post_process == 'function') {
						star.service.call_post_process(response, status, xhr);
					}
				},
				error: function(xhr, status, error) {
					if(typeof star.service.call_error_pre_process == 'function') {
						star.service.call_error_pre_process(xhr, status, error);
					}
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
					
					if(typeof star.service.call_error_post_process == 'function') {
						star.service.call_error_post_process(xhr, status, error);
					}
				}
			});
			// 2013. 03. 13 / Service 후처리 추가 - (주의) Ajax 처리이기 때문에
			// call stack이 pre_process -> call_pre_process -> call_post_process -> post_process 가 보장되지 않는다.
			if(typeof star.service.post_process == 'function') {
				star.service.post_process(setting);
			}
		};

		var _serviceForNet = function(setting) {
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
				data: '{"paramData":"' + JSON.stringify(request).replace(/"/g, '\\"') + '"}',
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
							star.service.fail(response.dataSet);
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
		 * @example
		 * $.Service({
		 *   transaction: 'TXID0001',
		 *   request: ['#form1', '#form2', '#form3'],
		 *   response: ['#grid1', '#pager1', '#grid2],
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
			return _service(star.service.service_url, arguments);
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
			return _service(star.service.login_url, arguments);
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
			return _service(star.service.logout_url, arguments);
		};

		/**
		 * NEXCORE HTML.
		 * 
		 * @name star.service.Content^1
		 * @function
		 * @param {Object} option
		 * @param {String} option.transaction
		 * @param {String} option.target
		 * @param {star.data.Fields|jQuery|star.data.Selector} [option.request] 요청 데이터
		 * @param {jQuery|star.data.Selector} [option.response] 응답 데이터 대상
		 * @param {Function} [option.success] 성공 콜백
		 * @param {Function} [option.fail] 실패 콜백
		 * @param {Function} [option.error] 에러 콜백
		 */
		/**
		 * NEXCORE HTML.
		 * 
		 * @name star.service.Content^2
		 * @function
		 * @param {String} transaction
		 * @param {String} target
		 * @param {star.data.Fields|jQuery|star.data.Selector} [request] 요청 데이터
		 * @param {jQuery|star.data.Selector} [response] 응답 데이터 대상
		 * @param {Function} [option.success] 성공 콜백
		 */
		$.Content = function(option) {
			var setting;

			if ($.isPlainObject(option)) {
				setting = option;
			} else {
				setting = {
					transaction: arguments[0],
					target: arguments[1]
				};

				switch (arguments.length) {
					case 3:
						if ($.isFunction(arguments[2]) === false)
							setting.request = arguments[2];
						else
							setting.success = arguments[2];
						break;
					case 4:
						setting.request = arguments[2];

						if ($.isFunction(arguments[3]) === false)
							setting.response = arguments[3];
						else
							setting.success = arguments[3];
						break;
					case 5:
						setting.request = arguments[2];
						setting.response = arguments[3];
						setting.success = arguments[4];
						break;
				}
			}

			if (setting.request === undefined)
				setting.request = {};
			else if (typeof setting.request === 'string')
				setting.request = $(setting.request).Fields();
			else if (setting.request.jquery !== undefined)
				setting.request = setting.request.Fields();

			if (typeof setting.response === 'string')
				setting.response = $(setting.response);

			var params = $.extend({}, option.request);
			params.nc_trId = option.transaction;
			params.nc_target = option.target;

			$.ajax({
				url: star.service.content_url,
				type: 'POST',
				dataType: 'text',
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				processData: false,
				cache: false,
				data: $.param(params),
				success: function(response) {
					if (setting.response)
						setting.response.html(response);

					if (setting.success)
						setting.success(response);
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
			//timeout: function() {
			//}
			});
		};
	})(window, window.jQuery, star);

	///////////////////////////////////////////////////////////////////////////
	// STAR Support
	///////////////////////////////////////////////////////////////////////////

	// 페이지간 이동 시 대량의 데이터를 전달할 수 있도록 브라우저의 이름을 저장공간으로 사용하는 일종의 세션 기능

	(function(window, $, star) {
		// window.cookie => limit: size (4k?)
		// window.name => limit: same tab
		// IE7-: userData => limit: same directory

		/*
		if (window.sessionStorage) {
			$.Session = function(key, value) {
				if (value === undefined)
					return window.sessionStorage.getItem(key);
				else
					window.sessionStorage.setItem(key, value);
			};
		} else {
		*/
		var root = window.top;

		while (root.opener)
			root = root.opener.top;

		var name = root.name;
		var init = name.length >= 2 && name.charAt(0) === '{';
		var data = init ? JSON.parse(name) : {};

		$.Session = function(key, value) {
			if (value === undefined) {
				return data[key];
			} else {
				data[key] = value;

				root.name = JSON.stringify(data);
			}
		};
		/*
		}
		*/
	})(window, window.jQuery, star);

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
		library: $.mobile ? 'jquerymobile' : ($.fn.popover ? 'bootstrap' : 'jqueryui')
	};

	var _componentList = [];
	var _componentHash = {};

	$._Component = function(ui) {
		return _componentHash[ui];
	};

	var _component = function(spec) {
		_componentList.push(spec);
		_componentHash[spec.name] = spec;

		var o = {};

		if (spec.fields !== undefined)
			$.extend(o, spec.fields);
		if (spec.events !== undefined)
			$.extend(o, spec.events);

		star.ui[spec.name] = o;

		if (spec.constructor !== undefined)
			_method(spec.name, 'Component', spec.constructor);

		if (spec.methods !== undefined)
			for ( var m in spec.methods)
				_method(spec.name, m, spec.methods[m]);

		if (spec.methods_static !== undefined)
			for ( var m in spec.methods_static) {
				// TODO: comment
				if ($[m] !== undefined) {
					window.alert('FATAL: $.' + m + ' != undefined');
					return;
				}

				$[m] = spec.methods_static[m];
			}
	};

	star.ui.component = _component;

	var _method = function(component, method, logic) {
		var m = method === 'Component' ? component : method;

		$.fn[component + method] = logic;

		if ($.fn[m] === undefined || $.fn[m].components === undefined) {
			$.fn[m] = function() {
				if (this.length === 0) {
					console.trace();
					//window.alert('ERROR: component=' + component + ', method=' + (method === 'Component' ? '<init>' : method) + ', selector=' + this.selector);
					return this;
				}

				for ( var i = arguments.callee.components.length - 1; i >= 0; i--) {
					var mi = arguments.callee.components[i];
					var ci = _componentHash[mi.component];

					if (mi.constructor === true) {
						if (ci.constructor_check === undefined || ci.constructor_check.apply(this) === true)
							return mi.logic.apply(this, arguments);
					} else {
						var check = ci.methods_check || ci.constructor_check;

						if (check === undefined || check.apply(this) === true)
							return mi.logic.apply(this, arguments);
					}
				}
				
				//window.alert('FATAL: component=' + component + ', method=' + method);
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
	_component({
		name: 'IComponent',
		methods:
		/**
		 * @lends star.ui.IComponent.prototype
		 */
		{
			/**
			 * 컴포넌트 표시
			 * 
			 * @param {Boolean} [space=false] 공간 차지 여부
			 * @return {star.ui.IComponent}
			 */
			Show: function(space) {
				if (space === true)
					return this.css('visibility', 'visible');

				return this.show();
			},
			/**
			 * 컴포넌트 숨김
			 * 
			 * @param {Boolean} [space=false] 공간 차지 여부
			 * @return {star.ui.IComponent}
			 */
			Hide: function(space) {
				if (space === true)
					return this.css('visibility', 'hidden');

				return this.hide();
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Template
	///////////////////////////////////////////////////////////////////////////

	if (window.Handlebars !== undefined) {
		(function(window, $, star) {
			var _cache = {};
			var _empty = {
				empty: true
			};

			var _compile = function(template) {
				var cache = _cache[template];

				if (cache === undefined)
					cache = _cache[template] = window.Handlebars.compile($(template).html());

				return cache;
			};

			/**
			 * 템플릿 엔진.
			 * 
			 * @name star.ui.ITemplate
			 * @class
			 * @extends star.ui.IComponent
			 */
			_component({
				name: 'ITemplate',
				methods:
				/**
				 * @lends star.ui.ITemplate.prototype
				 */
				{
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
					/** @ignore */
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

										rowHtml += _compile(columnTemplate)(i < data.length ? data[i] : _empty);
									}

									html += _compile(rowTemplate)(rowHtml);
								}

								return this.html(html);
							default:
								var template = arguments[0];
								var data = arguments[1];

								return this.html(_compile(template)(data));
						}
					},

					/**
					 * 추가.
					 * 
					 * @param {star.data.Selector} template 템플릿 셀렉터
					 * @param {Object} data 데이터
					 * @returns {star.ui.ITemplate}
					 * @example
					 * $('#container').Append('#template', data);
					 */
					Append: function(template, data) {
						return this.append(_compile(template)(data));
					},

					/**
					 * 삽입.
					 * 
					 * @param {star.data.Selector} template 템플릿 셀렉터
					 * @param {Object} data 데이터
					 * @returns {star.ui.ITemplate}
					 * @example
					 * $('#container').Prepend('#template', data);
					 */
					Prepend: function(template, data) {
						return this.prepend(_compile(template)(data));
					}
				},
				methods_static:
				/**
				 * @lends star.ui.ITemplate
				 */
				{
					/**
					 * 렌더링.
					 * 
					 * @param {star.data.Selector} template 템플릿 셀렉터
					 * @param {Object} data 데이터
					 * @returns {String}
					 * @example
					 * var html = $.Render('#template', data);
					 */
					Render: function(template, data) {
						return _compile(template)(data);
					}
				}
			});
		})(window, window.jQuery, star);
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
	_component({
		name: 'IDisablable',
		methods:
		/**
		 * @lends star.ui.IDisablable.prototype
		 */
		{
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
			/** @ignore */
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
			/** @ignore */
			Disabled: function(disabled) {
				if (disabled === undefined)
					return this.Enabled() === false;
				else
					return this.Enabled(!disabled);
			},

			/**
			 * 비활성화
			 * 
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
	_component({
		name: 'IClearable',
		methods:
		/**
		 * @lends star.ui.IClearable.prototype
		 */
		{
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
	_component({
		name: 'IEditable',
		methods:
		/**
		 * @lends star.ui.IEditable.prototype
		 */
		{
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
			/** @ignore */
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
			/** @ignore */
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

	(function(window, $, star) {
		var _val = $.fn.val;
		var _support = 'placeholder' in document.createElement('input');

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
		_component({
			name: 'IPlaceholder',
			fields:
			/**
			 * @lends star.ui.IPlaceholder
			 */
			{
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
				init: false
			},
			constructor: function(option) {
				// TODO: Caret

				if (star.ui.IPlaceholder.use === false)
					return this;

				if (option !== undefined)
					if (option.placeholder !== undefined)
						this.attr('placeholder', option.placeholder);

				if (_support === true)
					return this;

				return this.focus(function() {
					var input = $(this);

					if (_val.call(input) === input.attr('placeholder')) {
						_val.call(input, '');
						input.removeClass('star-placeholder');
					}
				}).blur(function() {
					var input = $(this);
					var val = _val.call(input);
					var placeholder = input.attr('placeholder');

					if (val === '' || val === placeholder) {
						input.addClass('star-placeholder');
						_val.call(input, placeholder);
					}
				}).blur();
			}
		});

		if (_support === false) {
			/**
			 * Placeholder 처리를 위한 jQuery#val 오버라이딩
			 * 
			 * @see http://api.jquery.com/val/
			 * @ignore
			 */
			$.fn.val = function(value) {
				var placeholder = this.attr('placeholder');

				if (!placeholder)
					return _val.apply(this, arguments);

				var val = _val.apply(this, arguments);

				if (value !== undefined) {
					if (val !== value)
						this.removeClass('star-placeholder');

					return _val.apply(this, arguments);
				}

				if (val !== placeholder)
					return val;

				return '';
			};

			$(function() {
				if (star.ui.IPlaceholder.use === true && star.ui.IPlaceholder.init === true)
					$('[placeholder]:not(.star-placeholder)').each(function() {
						$(this).IPlaceholderComponent();
					});
			});
		}
	})(window, window.jQuery, star);

	// <== FEATURE:Placeholder

	/////////////////////////////////////////////////////////////////////////
	// STAR UI: Masking
	/////////////////////////////////////////////////////////////////////////

	// FEATURE:Masking ==>

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
	_component({
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
			if ($.fn.mask === undefined)
				return this;

			if (option.mask === undefined)
				return this;

			return this.mask(option.mask);
		}
	});

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
	_component({
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
	_component({
		name: 'ICaret',
		methods:
		/**
		 * @lends star.ui.ICaret.prototype
		 */
		{
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
			/** @ignore */
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
	_component({
		name: 'IValue',
		methods:
		/**
		 * @lends star.ui.IValue.prototype
		 */
		{
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
			/** @ignore */
			Value: function(value) {
				if (this.is('input, select, textarea') === true)
					return $.fn.Field.apply(this, arguments);

				// TODO: DataSet?
				if (this.is('form') === true)
					return $.fn.Fields.apply(this, arguments);

				if (this.hasClass('star-field') === true)
					return $.fn.Field.apply(this, arguments);

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
	_component({
		name: 'IDataSet',
		methods:
		/**
		 * @lends star.ui.IDataSet.prototype
		 */
		{
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
			/** @ignore */
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
	_component({
		name: 'IFields',
		methods:
		/**
		 * @lends star.ui.IFields.prototype
		 */
		{
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
			/** @ignore */
			Fields: function(value) {
				if (value === undefined) {
					value = {};

					// TODO: grid :input
					this.find('input:not([type="checkbox"]):not([type="radio"])[id], select[id], textarea[id]').each(function() {
						var c = $(this);
						var id = c.attr('id');

//						value[id] = c.val();
						value[id] = c.Value();
					});

					this.find('input[type="checkbox"][id]').each(function() {
						var c = $(this);
						var id = c.attr('id');
						var option = c.data('star-option') || star.ui.CheckBox;

						value[id] = c.is(':checked') ? (c.val() || option.checked) : option.unchecked;
					});

					this.find('input[type="radio"][id]').each(function() {
						var c = $(this);
						var id = c.attr('id');

						if (c.is(':checked'))
							value[id] = c.val();
						else if (value[id] === undefined)
							value[id] = '';
					});

					this.find('.star-field[id]').each(function() {
						var c = $(this);
						var id = c.attr('id');

						value[id] = c.Field();
					});

					return value;
				} else {
					var input = this.find('input:not([type="checkbox"]):not([type="radio"])[id], select[id], textarea[id]');
					var checkbox = this.find('input[type="checkbox"][id]');
					var radio = this.find('input[type="radio"][id]');

					for ( var id in value) {
						var v = value[id];
						var f = '#' + id;

						// input.filter(f).val(v);
						// 2013. 4. 24 Number쪽 적용을 위해서 이렇게 바꿈. 성능은 조금 떨어질지도.... 고려할점은 data, month, number 적용할때 
						// 이렇게 해야 정확하게 설정됨. 그것만 예외로 처리하거나 이렇게 하는게 좋을 듯
						input.filter(f).Value(v);

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
	_component({
		name: 'IField',
		constructor: function() {
			return this.addClass('star-field');
		},
		methods:
		/**
		 * @lends star.ui.IField.prototype
		 */
		{
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
			/** @ignore */
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
	_component({
		name: 'IRecordSets',
		methods:
		/**
		 * @lends star.ui.IRecordSets.prototype
		 */
		{
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
			/** @ignore */
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
	_component({
		name: 'IRecordSet',
		methods:
		/**
		 * @lends star.ui.IRecordSet.prototype
		 */
		{
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
			/** @ignore */
			RecordSet: function(value) {
				throw new Error('FATAL: RecordSet is not implemented');

				/*
				if (value === undefined)
					return {
						nc_list: []
					};
				else
					return this;
				*/
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
			/** @ignore */
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
			/** @ignore */
			Record: function(row, value) {
				throw new Error('FATAL: Record is not implemented');

				/*
				if (rs === undefined)
					return {};
				else
					return this;
				*/
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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
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
	 * @example
	 * $('#text').Text({
	 *   number: true,
	 *   maxlength: 5
	 * });
	 */
	_component({
		name: 'Text',
		fields:
		/**
		 * @lends star.ui.Text
		 */
		{
			/**
			 * [설정/옵션] Text Box에 숫자만 입력 가능하다.
			 * 
			 * @type Boolean
			 * @defaults false
			 */
			number: false,
			/**
			 * [설정/옵션] Text Box Maxlength
			 * 
			 * @type Number
			 */
			maxlength: undefined
		},
		events:
		/**
		 * @lends star.ui.Text
		 */
		{
			/**
			 * [옵션] 변경 이벤트 핸들러
			 * 
			 * @type Function
			 */
			change: undefined
		},
		constructor_check: function() {
			return this.is('input[type="text"]');
		},
		constructor: function(option) {
			option = star.option(star.ui.Text, option);

			this.IPlaceholderComponent(option).IMaskingComponent(option).IMaxLengthTabComponent(option);

			if (option.change !== undefined)
				this.change(function() {
					option.change.apply($(this), arguments);
				});
			
			if (option.number === true) {
				this.keydown(function(event) {
			        // Allow: backspace, delete, tab, escape, and enter
			        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
			             // Allow: Ctrl+A
			            (event.keyCode == 65 && event.ctrlKey === true) || 
			             // Allow: home, end, left, right
			            (event.keyCode >= 35 && event.keyCode <= 39)) {
			                 // let it happen, don't do anything
			                 return;
			        }
			        else {
			            // Ensure that it is a number and stop the keypress
			            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
			                event.preventDefault(); 
			            }   
			        }
			    });
			}
			
			if (option.maxlength !== undefined ) {
				this.attr('maxlength', option.maxlength);
			}

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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
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
	_component({
		name: 'Password',
		constructor_check: function() {
			return this.is('input[type="password"]');
		},
		constructor: function(option) {
			if (option === undefined)
				option = {};

			this.IMaxLengthTabComponent(option);

			if (option.change !== undefined)
				this.change(function() {
					option.change.apply($(this), arguments);
				});

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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
	 * @constructs
	 * @example
	 * $('#password').Hidden();
	 * @example
	 * &lt;input id="hidden" type="hidden"/>
	 */
	_component({
		name: 'Hidden',
		constructor_check: function() {
			return this.is('input[type="hidden"]');
		},
		constructor: function(option) {
			window.alert('ERROR: Hidden is not implemented');
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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
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
	_component({
		name: 'CheckBox',
		fields:
		/**
		 * @lends star.ui.CheckBox
		 */
		{
			/**
			 * [설정/옵션] 체크되어 있으나 value 애트리뷰트가 없을 경우 보낼 값을 설정
			 * 
			 * @type String
			 * @defaults 'Y'
			 */
			checked: 'Y',

			/**
			 * [설정/옵션] 체크되어 있지 않을 경우 보낼 값을 설정
			 * 
			 * @type String
			 * @defaults 'N'
			 */
			unchecked: 'N'
		},
		events:
		/**
		 * @lends star.ui.CheckBox
		 */
		{
			/**
			 * [옵션] 클릭 이벤트 핸들러
			 * 
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
			
			if(!($(this).attr('value')) || ($(this).attr('value') == 'on') ) {
				$(this).attr('value', option.checked);
			}

			return this;
		},
		methods:
		/**
		 * @lends star.ui.CheckBox.prototype
		 */
		{
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
			/** @ignore */
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
			/** @ignore */
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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * &lt;form>
	 *   &lt;label>&lt;input id="radio" name="radio" type="radio"/> 라디오1&lt;/label>
	 *   &lt;label>&lt;input id="radio" name="radio" type="radio"/> 라디오2&lt;/label>
	 * &lt;/form>
	 */
	_component({
		name: 'Radio',
		events:
		/**
		 * @lends star.ui.Radio
		 */
		{
			/**
			 * [옵션] 변경 이벤트 핸들러
			 * 
			 * @type Function
			 */
			change: undefined
		},
		constructor_check: function() {
			return this.is('input[type="radio"]');
		},
		constructor: function(option) {
			var radios = this._radios();
			radios.data('star-option', option = star.option(star.ui.Radio, option));

			if (option.change !== undefined)
				radios.change(function() {
					option.change.apply($(radios), arguments);
				});

			return this;
		},
		methods:
		/**
		 * @lends star.ui.Radio.prototype
		 */
		{
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
			/** @ignore */
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
			/** @ignore */
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
	 * 셀렉트 컴포넌트.
	 * 
	 * @name star.ui.Select
	 * @class
	 * @extends star.ui.IDisablable
	 * @extends star.ui.IField
	 * @star_desktop
	 * @star_mobile
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
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
	_component({
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
			autocomplete: false
		},
		events:
		/**
		 * @lends star.ui.Select
		 */
		{
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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
	 */
	_component({
		name: 'TextArea',
		constructor_check: function() {
			return this.is('textarea');
		},
		constructor: function() {
			window.alert('ERROR: TextArea is not implemented');
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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {star.data.Selector|jQuery} [option.enter] 엔터키 처리 대상 객체
	 * @example
	 * $('#container').Container({
	 *   enter: '#button'
	 * });
	 */
	_component({
		name: 'Container',
		fields:
		/**
		 * @lends star.ui.Container.prototype
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
		methods:
		/**
		 * @lends star.ui.Container.prototype
		 */
		{
			/**
			 * 파일 로드.
			 * 
			 * @param {Object} option
			 * @param {String} [option.url] url/transaction 중 하나는 필수.
			 * @param {String} [option.transaction] url/transaction 중 하나는 필수. deprecated.
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
					/** @ignore */
					success: function(data, textStatus, jqXHR) {
						$this.html(data);

						if (option.success !== undefined)
							option.success();
					},
					/** @ignore */
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
			 * @param {String} submit 제출 버튼
			 * @returns {star.ui.Container}
			 * @example
			 * $('#container').Container({
			 *   enter: '#submit'
			 * });
			 * @example
			 * $('#container').Enter('#submit');
			 * @deprecated $('#container').Container({ enter: '#submit' });
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
	// STAR UI: Frame
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 프레임 컴포넌트
	 * 
	 * @name star.ui.Frame
	 * @class
	 * @extends star.ui.IFields
	 * @extends star.ui.IRecordSets
	 * @star_desktop
	 * @star_jqueryui
	 * @constructs
	 */
	_component({
		name: 'Frame',
		fields:
		/**
		 * @lends star.ui.Frame.prototype
		 */
		{
			/**
			 * 로드 완료 이벤트 핸들러
			 * 
			 * @type Function
			 */
			load: undefined
		},
		constructor_check: function() {
			return this.is('iframe');
		},
		constructor: function(option) {
			var self = this;

			option = star.option(star.ui.Frame, option);

			this.load(function() {
				self.Page = self.get(0).contentWindow.$.Page;

				if (option.load !== undefined)
					option.load();
			});

			return this;
		},
		methods:
		/**
		 * @lends star.ui.Frame.prototype
		 */
		{
			Get: function(selector) {
				var frame = this.get(0).contentWindow;

				return frame.$(selector);
			},

			Fields: function(value) {
				var frame = this.get(0).contentWindow;

				return frame.$(frame.document.body).Fields(value);
			},

			RecordSets: function(value) {
				var frame = this.get(0).contentWindow;

				return frame.$(frame.document.body).RecordSets(value);
			},

			Clear: function() {
				var frame = this.get(0).contentWindow;

				return frame.$(frame.document.body).Clear();
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
	 * @param {Object} option
	 * @param {Boolean} option.validation.required 필수요소
	 * @param {Boolean} option.validation.email 이메일 형식 검사
	 * @param {Boolean} option.validation.url URL 형식 검사
	 * @param {Boolean} option.validation.number 숫자인지 검사
	 * @param {Integer} option.validation.maxlength 문자열 최대 길이
	 * @param {Integer} option.validation.minlength 문자열 최소 길이
	 * @param {Integer[]} option.validation.rangelength 문자열 입력 범위
	 * @param {Integer[]} option.validation.range 숫자 입력 범위
	 * @param {Integer} option.validation.max 숫자 최대 크기
	 * @param {Integer} option.validation.min 숫자 최소 크기
	 * @example
	 * validation: {
	 *  ...
	 * }
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

	;

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
	_component({
		name: 'Form',
		fields:
		/**
		 * @lends star.ui.Form
		 */
		{
			/**
			 * [설정] 유효성 검사 에러 표시 방법.<br/>
			 * <br/>
			 * alert: 브라우저 기본 경고 메시지 창 사용.<br/>
			 * label: 에러 발생한 컴포넌트 뒤에 레이블 태그 추가.<br/>
			 * tooltip: 툴팁 애드온 사용. qTip 필요.<br/>
			 * 
			 * @type String
			 * @defaults 'tooltip'
			 */
			validation_error: 'alert'
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
		methods:
		/**
		 * @lends star.ui.Form.prototype
		 */
		{
			/**
			 * 초기화. 유효성 검사 결과도 초기화합니다.
			 * 
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

				// IE 8이상, other browser 에서 enter 2번 눌러지는거
				this.attr('enterchecker', 0);
				
				(function(form) {
				form.find('input[type="text"], input[type="password"]').keypress(function(e) {
					if (e.which === 13) {
						var entercheck = form.attr('enterchecker');
						if(entercheck!='0') {
							form.attr('enterchecker', 0);
							if (!e)
								e = window.event;
	
						    //IE9 & Other Browsers
						    if (e.stopPropagation) {
						     	e.stopPropagation();
						    }
						    //IE8 and Lower
						    else {
						     	e.cancelBubble = true;
						    }
						    return true;
						} 
						form.attr('enterchecker', 1);
						return false;
					}
				});
				})(this);
				// IE 8이상, other browser 에서 enter 2번 눌러지는거
				
				return $.fn.ContainerEnter.apply(this, arguments);
				
				
			},

			/**
			 * 유효성 검사
			 * 
			 * @param {Function} [success]
			 * @returns {Boolean} 성공 여부
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
		 * @param {Function} [option.success] 파일 업로드 성공치 처리할 이벤트 핸들러
		 * @param {Function} [option.error] 파일 업로드 실패치 처리할 이벤트 핸들러
		 * @example
		 * $('#file').File({
		 *   success: function(data) {
		 *   },
		 *   error: function() {
		 *   }
		 * });
		 * $('#file').Service();
		 */
		_component({
			name: 'File',
			fields:
			/**
			 * @lends star.ui.File
			 */
			{
				/**
				 * [설정] 파일 업로드를 처리할 주소
				 * 
				 * @type String
				 */
				url: 'file.html'
			},
			events:
			/**
			 * @lends star.ui.File
			 */
			{
				/**
				 * [설정] 파일 업로드 성공치 처리할 기본 이벤트 핸들러
				 * 
				 * @type Function
				 */
				success: function(data) {
				},

				/**
				 * [설정] 파일 업로드 실패치 처리할 기본 이벤트 핸들러
				 * 
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

				return this.data('star-option', option).data('star-setting', setting).addClass('star-file').ajaxForm(setting).submit(function(e) {
					e.preventDefault();
					return false;
				});
			},
			methods_check: function() {
				return this.hasClass('star-file');
			},
			methods:
			/**
			 * @lends star.ui.File.prototype
			 */
			{
				/**
				 * 파일 업로드
				 * 
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
		/**
		 * 파일 다운로드
		 * 
		 * @param {String} File Download
		 * @example
		 * $.FileDownload('FileId');
		 */
		;
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
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#file-item').FileItem({
	 *   label: '#file-item-label',
	 *   change: function(name) {
	 *   }
	 * });
	 */
	_component({
		name: 'FileItem',
		fields:
		/**
		 * @lends star.ui.FileItem
		 */
		{
			/**
			 * [설정] 파일 항목 렌더링 함수.
			 * 
			 * @type Function
			 * @deprecated TODO
			 */
			render: undefined,

			/**
			 * [옵션] 파일명을 표시할 컴포넌트 셀렉터
			 * 
			 * @type star.data.Selector
			 */
			label: undefined
		},
		events:
		/**
		 * @lends star.ui.FileItem
		 */
		{
			/**
			 * [옵션] 파일 선택 시 발생하는 이벤트
			 * 
			 * @type Function
			 */
			change: undefined
		},
		constructor: function(option) {
			option = star.option(star.ui.FileItem, option);

			if (option.label !== undefined)
				this.change(function() {
					var label = $(option.label);
					var val = $(this).val();

					if (label.is('input, select, textarea'))
						label.val(val);
					else
						label.text(val);
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

	(function() {
		/**
		 * 페이지
		 * 
		 * @name star.ui.Page
		 * @class
		 * @star_desktop
		 * @star_mobile
		 */
		_component({
			name: 'Page',
			methods_static:
			/**
			 * @lends star.ui.Page
			 */
			{
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
				 * @param {String} [key] 파라미터 이름, 생략 시 모든 파라미터를 조회함.
				 * @returns {String|Object} 파라미터 값
				 * @example
				 * var value = $.Param('key'); // 키가 존재하지 않으면 빈문자열 반환
				 * @example
				 * var value = $.Param['key']; // 키가 존재하지 않으면 undefined 반환
				 */
				Param: function(key) {
					if (key === undefined) {
						var params = {};

						for ( var i = 0; i < $.Param.count; i++) {
							var param = $.Param[i];

							params[param.key] = param.value;
						}

						return params;
					}

					return $.Param[key] || '';
				},

				/**
				 * 데이터
				 * 
				 * @param {String} [key]
				 * @param {Object} [value]
				 * @returns {Object|undefined}
				 */
				Data: function(key, value) {
					if (key === undefined)
						return $.extend({}, $.Data);

					if (value === undefined)
						return $.Data[key];

					$.Data[key] = value;

					return $.Data;
				}
			}
		});

		$.extend($.Page, _componentHash['Page'].methods_static);

		// query parsing

		var match, search = /([^&=]+)=?([^&]*)/g, query = window.location.search.substring(1);

		$.Param.count = 0;

		for ( var i = 0; match = search.exec(query); i++) {
			var key = decodeURIComponent(match[1].replace(/\+/g, ' '));
			var value = decodeURIComponent(match[2].replace(/\+/g, ' '));

			$.Param[key] = value;
			$.Param[i] = {
				key: key,
				value: value
			};
			$.Param.count++;

			$.Data[key] = value;
		}
	})();

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Popup
	///////////////////////////////////////////////////////////////////////////

	(function(window, $, star) {
		var _id = 0;

		/**
		 * 팝업
		 * 
		 * @name star.ui.Popup
		 * @class
		 * @star_desktop
		 */
		_component({
			name: 'Popup',
			fields:
			/**
			 * @lends star.ui.Popup
			 */
			{
				_instances: {},
				/**
				 * [옵션] 주소
				 * 
				 * @type String
				 */
				url: undefined,
				/**
				 * [옵션] 넓이
				 * 
				 * @type Number
				 * @defaults 800
				 */
				width: 800,
				/**
				 * [옵션] 높이
				 * 
				 * @type Number
				 * @defaults 600
				 */
				height: 600,
				/**
				 * [옵션] <del>모달 여부</del>
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				modal: false,
				/**
				 * [옵션] 화면 가운데 위치 여부
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				center: false,
				/**
				 * [옵션] 스크롤바 생성 여부
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				scroll: false,
				/**
				 * [옵션] 팝업 윈도우에 넘길 데이터
				 * 
				 * @type Object
				 */
				data: {}
			},
			events:
			/**
			 * @lends star.ui.Popup
			 */
			{
				/**
				 * [옵션] 팝업 윈도우가 닫혔을 때 처리할 이벤트 핸들러. $.Page.Close 함수로 종료하지 않을 경우 null 이 전달됨.
				 * 
				 * @type Function
				 */
				close: undefined
			},
			methods_static:
			/**
			 * @lends star.ui.Popup
			 */
			{
				/**
				 * 팝업 윈도우 열기
				 * 
				 * @param {Object} option
				 * @example
				 * $.Popup({
				 *   modal: true
				 *   close: function(data) {
				 *     // data == null => $.Page.Close 함수로 종료되지 않았을 경우
				 *     // data != null => $.Page.close로 종료 되었을 경우
				 *   }
				 * });
				 */
				Popup: function(option) {
					// modal 처리
					// 브라우저간 modal 처리가 많이 다르므로 화면을  block 처리하는 걸로 구현
					if(option.modal == true) {
						option.close_pop = option.close;
						option.close = function(data) {
							$.Unblock();
							if(option.close_pop)
								option.close_pop(data);
						}
					}
					
					var setting = $.extend({}, star.ui.Popup, option);
					
					setting.id = 'S' + 'starPopup' + Math.floor((Math.random()*100)+1) + "" + _id++;
					star.ui.Popup._instances[setting.id] = setting;

					var param = 'width=' + setting.width + ',height=' + setting.height;

					if (setting.center === true) {
						param += ',left=' + (window.screen.width - parseInt(setting.width)) / 2;
						param += ',top=' + Math.max((window.screen.height - parseInt(setting.height)) / 2 - 50, 0);
					}
					
					if (setting.scroll === true) {
						param += ',scrollbars=yes';
					}
					
					if (setting.modal === true) {
						$.Block();
					} 
					
					window.open(setting.url, setting.id, param);
					
					
				}

			/**
			 * 닫기
			 * 
			 * @param {Object} [data]
			 * @example
			 * $.Close({
			 *   key: 'value'
			 * });
			 */
			}
		});
		
		if (window.opener) {
			var _closed = false;
			var _instance = undefined;

			/**
			 * @name $.Popup
			 */

			$.extend($.Popup, $.Page);

			$.Close = $.Page.Close = $.Popup.Close = function(data) {
				if (_closed === true)
					return;

				_closed = true;

				if (data !== null)
					window.close();

				if (_instance && _instance.close)
					_instance.close(data);
			};
			
			_instance = window.opener.$.star.ui.Popup._instances[window.name]||{};

			$(window).unload(function() {
				$.Unblock();
				$.Popup.Close(null);
			});

			$.extend($.Popup.Data, _instance.data);
		}
	})(window, window.jQuery, star);

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
		_component({
			name: 'Dialog',
			fields:
			/**
			 * @lends star.ui.Dialog
			 */
			{
				/**
				 * [설정/옵션] 모달 여부
				 * 
				 * @type Boolean
				 * @defaults true
				 */
				modal: true
			},
			constructor: function(option) {
				option = star.option(star.ui.Dialog, option);

				this.ContainerComponent(option).dialog({
					autoOpen: false,
					modal: option.modal
				});
				
				return this;
			},
			methods_check: function() {
				return this.hasClass('ui-dialog-content');
			},
			methods:
			/**
			 * @lends star.ui.Dialog.prototype
			 */
			{
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
				/** @ignore */
				Title: function(value) {
					return this.dialog('option', 'title', value);
				},

				/**
				 * 열기
				 */
				Open: function() {
					this.dialog('open');
				},

				/**
				 * 닫기
				 */
				Close: function() {
					this.dialog('close');
				}
			},
			methods_static:
			/**
			 * @lends star.ui.Dialog
			 */
			{
				/**
				 * 열기
				 * 
				 * @param {Object} option
				 * @param {String} option.url
				 * @param {Object} [option.data]
				 * @param {Boolean} [option.modal=true]
				 * @param {Number} [option.width=600]
				 * @param {Number} [option.height=400]
				 * @param {Function} [option.close]
				 */
				Dialog: function(option) {
					option = $.extend({
						title: '',
						id: 'star-dialog-' + $.Dialog._index++,
						url: 'about:blank',
						data: {},
						modal: true,
						resizable: false,
						width: 600,
						height: 400
					}, option);

					var dialog = $('<div id="' + option.id + '" class="star-dialog" style="display: none; padding: 0px; overflow: hidden;"></div>').appendTo(window.document.body);
					var iframe = $('<iframe style="width: 100%; height: 100%; border: none;" class="star-dialog-iframe" frameborder="0"></iframe>').appendTo(dialog);

					dialog.data('star-dialog-open-data', option.data).dialog({
						title: option.title,
						modal: option.modal,
						resizable: option.resizable,
						width: option.width,
						height: option.height,
						beforeClose: function(event, ui) {
							if (option.close !== undefined)
								option.close(dialog.data('star-dialog-close-data') || null);
						},
						close: function() {
							dialog.dialog('destroy').remove();
						}
					});

					iframe.attr('src', option.url);
				}

			/**
			 * 닫기
			 * 
			 * @param {Object} [data]
			 * @example
			 * $.Close({
			 *   key: 'value'
			 * });
			 */
			}
		});

		$.Dialog._index = 0;

		if (window.parent && window.parent.$) {
			window.parent.$('iframe').each(function(index, element) {
				/*  IE 에서 체크하는 로직이 문제가 있음 일단 이렇게 하고 나중에 버그나면 여기부터 의심 */
				if (element.contentWindow.frameElement!=null) {
//				if (element.contentWindow === window) {
					var iframe = window.parent.$(element);

					if (iframe.hasClass('star-dialog-iframe')) {
						var dialog = iframe.parent();
						var data = function() {
							var data = {};

							for ( var key in $.Dialog.Data) {
								var value = $.Dialog.Data[key];

								if ($.isFunction(value) === false)
									data[key] = value;
							}

							return data;
						};

						$.extend($.Dialog, $.Page);

						/**
						 * @name $.Dialog
						 */

						$.Close = $.Page.Close = $.Dialog.Close = function(data) {
							dialog.data('star-dialog-close-data', data).dialog('close');
						};

						$.extend($.Dialog.Data, dialog.data('star-dialog-open-data'));
					}

					return false;
				}
			});
		}
	}

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
	 * @star_jqueryui
	 * @star_jquerymobile
	 * @star_bootstrap
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @example
	 * $('#button').Button({
	 *   init: false,
	 *   click: function() {
	 *     // do something
	 *   }
	 * });
	 */
	_component({
		name: 'Button',
		fields:
		/**
		 * @lends star.ui.Button
		 */
		{
			/**
			 * [설정] 라이브러리 렌더링 여부
			 * 
			 * @type Boolean
			 * @defaults false
			 */
			render: false,

			/**
			 * [옵션] 화면 초기화 후 클릭 이벤트 발생 여부
			 * 
			 * @type Boolean
			 * @defaults false
			 */
			init: false,
			role: ''
		},
		events:
		/**
		 * @lends star.ui.Button
		 */
		{
			/**
			 * [옵션] 클릭 이벤트 핸들러
			 * 
			 * @type Function
			 */
			click: undefined
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
				$(option.click);
			
			return this;
		},
		methods_check: function() {
			return this.data('star-ui') === 'button';
		},
		methods:
		/**
		 * @lends star.ui.Button.prototype
		 */
		{
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
			/** @ignore */
			Enabled: function(enabled) {
				if (enabled === undefined) {
					if (this.attr('disabled') == 'disabled') 
						return true;
					else
						return false;
				} else if (enabled === true)
					return this.removeAttr('disabled', 'disabled');
				else
					return this.attr('disabled', 'disabled');
			},
		
			/**
			 * 비활성화 설정
			 * 
			 * @name star.ui.Button#Disabled
			 * @function
			 * @param 
			 * @returns {star.ui.Button}
			 * @example
			 * $('#button').Disabled();
			 */
			Disabled: function() {
				return this.attr('disabled', 'disabled');
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
		 * @star_jqueryui
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @param {Number} [option.precision] 소수점 자리 수
		 * @param {Number} [option.max] 최대값
		 * @param {String} [option.aSet] 구분자
		 * @param {String} [option.lZero] 좌측 숫자 0 처리
		 * @requires <a href="http://www.decorplanit.com/plugin/">autoNumeric</a>
		 * @example
		 * $('#number').Number({
		 *   precision: 2
		 * });
		 * @example
		 * $('#number').Number({
		 *   aSep: '',
		 *   lSZero: 'keep'
		 * });
		 */
		_component({
			name: 'Number',
			fields:
			/**
			 * @lends star.ui.Number
			 */
			{
				/**
				 * [옵션] 소숫점 자릿수
				 * [옵션] 최대값 설정
				 * [옵션] 분리자 설정
				 * [옵션] 좌측 숫자 0 처리
				 */
				precision: 0,
				max : Number.MAX_VALUE,
				min : -Number.MAX_VALUE,
				dGroup : '3',
				aSep: ',',
				lZero: 'allow'
			},
			events:
			{
				change: undefined
			},
			constructor_check: function() {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				option = star.option(star.ui.Number, option);
				this.addClass('star-autoNumberic');
				
				if (option.change !== undefined)
					this.change(function() {
						option.change.apply($(this), arguments);
					});

				return this.autoNumeric({
					aSep: option.aSep,
					aPad: false,
					mDec: option.precision,
					dGroup: option.dGroup,
					vMax: option.max,
					vMin: option.min,
					lZero: option.lZero
				});
			},
			methods_check: function() {
				return this.hasClass('star-autoNumberic');
			},
			methods: {
				Value: function(value) {
					if(value===undefined) {
						return this.autoNumeric('get');
					} else {
						return this.autoNumeric('set', value);
					}
				},
				Field: function(value) {
					if(value===undefined) {
						return this.autoNumeric('get');
					} else {
						return this.autoNumeric('set', value);
					}
				}
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
		_component({
			name: 'Spinner',
			constructor_check: function() {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				var setting = {};

				//if (option !== undefined) {
				//}

				return this.spinner(setting);
			},
			methods_check: function() {
				return this.hasClass('ui-spinner-input');
			},
			methods:
			/**
			 * @lends star.ui.Spinner.prototype
			 */
			{
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
				/** @ignore */
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
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @param {String} option.string 'FDM' 달의 첫날
		 * @param {String} option.string 'LDM' 달의 마지막 날
		 * @param {String} option.string 'FDW' 주의 첫날
		 * @param {String} option.string 'LDW' 주의 마지막 날
		 * @param {String} option.string '(+|-)nY' n만큼 년도 계산
		 * @param {String} option.string '(+|-)nM' n만큼 월 계산
		 * @param {String} option.string '(+|-)nW' n만큼 주 계산
		 * @param {String} option.string '(+|-)nD' n만큼 일 계산
		 * @requires <a href="http://api.jqueryui.com/datepicker/">jQuery UI Datepicker</a>
		 * @example
		 * $('#date').Date();
		 * @example
		 * $('#date').Date('2013-03-01');
		 * @example
		 * $('#date').Date('+2Y,-1M');
		 * @example
		 * &lt;input id="date" type="text"/>
		 * });
		 */
		_component({
			name: 'Date',
			extend: 'Text',
			fields:
			/**
			 * @lends star.ui.Date
			 */
			{
				/**
				 * [설정] 달력 아이콘 주소
				 * 
				 * @type String
				 */
				image: '/web/star/lib/ext/jquery.ui.monthpicker/images/calendar.png',
				/**
				 * 년도 범위
				 * 
				 * @type String
				 */
				yearRange: 'c-2:c+2',
				/**
				 * 날짜 초기화
				 * 
				 * @type boolean
				 */
				eraser: false,
				/**
				 * 표시되는 달력 수
				 * 
				 * @type int
				 */
				numberOfMonths: 1,
				/**
				 * 표시되는 현재 월의 위치
				 * 
				 * @type int(0(처음), 1(두번째), 2(세번째)...)
				 */
				showCurrentAtPos: 0
			},
			constructor_check: function(mode) {
				return this.is('input[type="text"]');
			},
			constructor: function(option) {
				option = star.option(star.ui.Date, option);
				
				var name = $(this).attr('id');
				var setting = {
						constrainInput: true,
						dateFormat: 'yy-mm-dd',
						yearRange: star.ui.Date.yearRange,
						buttonImage: star.ui.Date.image,
						buttonImageOnly: true,
						changeYear: true,
						changeMonth: true,
						closeText: 'Clear',
						showOn: 'both',
						numberOfMonths: option.numberOfMonths,
						showCurrentAtPos: option.showCurrentAtPos
					};
					
					if(option.eraser === true){
						setting = $.extend({
							showButtonPanel: true,
							onClose: function(dateText, inst){
								if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
									$(this).val('');
									$(this).datepicker('option', 'minDate', '');
									$(this).datepicker('option', 'maxDate', '');
								}
							}
						}, setting);
					}

					return this.Text(option).datepicker(setting);
			},
			methods_check: function() {
				return this.hasClass('hasDatepicker') === true;
			},
			methods:
			/**
			 * @lends star.ui.Date.prototype
			 */
			{
				Editable: function(editable) {
					if (editable === true)
						this.datepicker('option', 'showOn', 'both').next().show();
					else
						this.datepicker('option', 'showOn', 'button').next().hide();
				},
				/**
				 * 활성화 여부 조회/설정
				 */
				Enabled: function(enabled) {
					if (enabled === true)
						return this.datepicker().datepicker('enable');
					else
						return this.datepicker().datepicker('disable');
				}
			}
		});

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
		_component({
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
					var option = star.option(star.ui.Date);
					
					if (typeof date1 === 'string')
						date1 = $(date1);
					if (typeof date2 === 'string')
						date2 = $(date2);

					if (date1.hasClass('hasDatepicker') === false)
						date1.Date();
					if (date2.hasClass('hasDatepicker') === false)
						date2.Date();

					if (option.eraser === true) {
						date1.datepicker('option', 'onSelect', function(selectedDate) {
							date2.datepicker('option', 'minDate', selectedDate);
						});
						date2.datepicker('option', 'onSelect', function(selectedDate) {
							date1.datepicker('option', 'maxDate', selectedDate);
						});
					} else {
						date1.datepicker('option', 'onClose', function(selectedDate) {
							date2.datepicker('option', 'minDate', selectedDate);
						});
						date2.datepicker('option', 'onClose', function(selectedDate) {
							date1.datepicker('option', 'maxDate', selectedDate);
						});
					}
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
	_component({
		name: 'DateSelect',
		constructor: function() {
			var children = this.find('select');

			return $.DateSelect(children[0], children[1], children[2]);
		},
		methods_static:
		/**
		 * @lends star.ui.DateSelect
		 */
		{
			/**
			 * 
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
		 * @extends star.ui.IDisablable
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @param {String} option.string '(+|-)nY' n만큼 년도 계산
		 * @param {String} option.string '(+|-)nM' n만큼 월 계산
		 * @param {String} option.string '(+|-)nW' n만큼 주 계산
		 * @param {String} option.string '(+|-)nD' n만큼 일 계산
		 * @requires https://github.com/thebrowser/jquery.ui.monthpicker
		 * @example
		 * $('#month').Month();
		 * @example
		 * $('#month').Month('2013-03');
		 * @example
		 * $('#month').Month('+2Y,-1M');
		 * @example
		 * &lt;input id="month" type="text"/>
		 */
		_component({
			name: 'Month',
			events:
			/**
			 * @lends star.ui.Month
			 */
			{
				/**
				 * 이미지 주소
				 * 
				 * @type String
				 */
				image_url: 'lib/ext/jquery.ui.monthpicker/images/calendar.png',
				/**
				 * 년도 범위
				 * 
				 * @type String
				 */
				yearRange: 'c-2:c+2',

				/**
				 * TODO: 값 변경 이벤트
				 */
				change: undefined
			},
			constructor: function(option) {
				option = star.option(star.ui.Month, option);

				var names = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];

				//if (option.change !== undefined)
				//	this.change(option.change);

				return this.monthpicker({
					showOn: 'both',
					buttonImage: option.image_url,
					buttonImageOnly: true,
					monthNamesShort: names,
					yearRange: star.ui.Date.yearRange,
					dateFormat: 'yy-mm'
				});
			},
			methods_check: function() {
				return this.hasClass('hasMonthpicker');
			},
			methods:
			/**
			 * @lends star.ui.Month.prototype
			 */
			{
				/**
				 * 활성화 여부 조회/설정
				 */
				Enabled: function(enabled) {
					if (enabled === true)
						return this.monthpicker('enable');
					else
						return this.monthpicker('disable');
				}
			}
		});

		if ($.validator !== undefined) {
			$.validator.addMethod('month', function(value, element, param) {
				return this.optional(element) || /^[0-9]{4}-(0[0-9]|1[12])$/g.test(value);
			});

			$.validator.messages.month = '알 수 없는 형식입니다';
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
		_component({
			name: 'MonthRange',
			fields:
			/**
			 * @lends star.ui.MonthRange
			 */
			{
				/**
				 * [설정] 범위 오류 시 실행될 함수
				 * 
				 * @type Function
				 */
				error: function() {
					window.alert('범위가 잘못되었습니다');
				}
			},
			constructor: function(option) {
				var dates = this.find('input');
				dates.Month();

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
	_component({
		name: 'MonthSelect',
		constructor: function() {
			var children = this.find('select');

			return $.MonthSelect(children[0], children[1]);
		},
		methods_static:
		/**
		 * @lends star.ui.MonthSelect
		 */
		{
			/**
			 * 날짜 컴포넌트 초기화
			 * 
			 * @param {star.data.Selector} year
			 * @param {star.data.Selector} month
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
	
	/////////////////////////////////////////////////////////////////////////
	// STAR UI: TimeSelect
	/////////////////////////////////////////////////////////////////////////

	/**
	 * 시간 선택 컴포넌트.
	 * 
	 * @name star.ui.TimeSelect
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @star_mobile
	 * @constructs
	 * @example
	 * $('#time').TimeSelect();
	 * @example
	 * &lt;span id="date">
	 *   &lt;select id="hour">&lt;/select>시
	 *   &lt;select id="minute">&lt;/select>분
	 * &lt;/span>
	 */
	_component({
		name: 'TimeSelect',
		constructor: function() {
			var hours = [];
			var minutes = [];
			var children = this.find('select');

			var digit2 = function(value) {
				return (value < 10 ? '0' : '') + value;
			};

			for ( var i = 0; i < 24; i++)
				hours.push({
					value: digit2(i),
					label: i + '시'
				});

			for ( var i = 0; i < 60; i++)
				minutes.push({
					value: digit2(i),
					label: i + '분'
				});
			
			var hour = $(children[0]).Select({
				blank: {
					value: '',
					label: '시 선택'
				},
				options: hours
			});
			var minute = $(children[1]).Select({
				blank: {
					value: '',
					label: '분 선택'
				},
				options: minutes
			});
			return this.addClass('star-time-select').addClass('star-field');
		},
		methods_check: function() {
			return this.hasClass('star-time-select');
		},
		methods:
		/**
		 * @lends star.ui.TimeSelect
		 */
		{
			Field: function(value) {
				var hour = this.find('select:eq(0)');
				var minute = this.find('select:eq(1)');

				if (value === undefined) {
					return hour.val() + ':' + minute.val();
				} else {
					hour.val(value.substr(0, 2));
					minute.val(value.substr(3, 2));

					return this;
				}
			}
		}
	});
	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Grid
	///////////////////////////////////////////////////////////////////////////

	if ($.fn.jqGrid !== undefined) {
		if ($.jgrid.formatter === undefined)
			$.jgrid.formatter = {};

		if ($.jgrid.formatter.integer === undefined)
			$.jgrid.formatter.integer = {};

		if ($.jgrid.formatter.number === undefined)
			$.jgrid.formatter.number = {};

		$.jgrid.formatter.integer.thousandsSeparator = ',';
		$.jgrid.formatter.number.decimalSeparator = '.';
		$.jgrid.formatter.number.thousandsSeparator = ',';

		/**
		 * 그리드.<br/>
		 * 
		 * @name star.ui.Grid
		 * @class
		 * @extends star.ui.IRecordSet
		 * @star_desktop
		 * @star_mobile
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
		 * @param {Boolean} [option.columns.editable=false] 컬럼 수정 여부
		 * @param {Boolean} [option.columns.edittype="text"] 컴럼 수정 type (text, select, checkbox, date, month)
		 * @param {Boolean} option.number 행번호 표시 여부
		 * @param {Boolean} option.footer 풋터 표시 여부
		 * @param {Boolean} option.sortable 컬럼 정렬 가능 여부
		 * @param {Boolean} option.resizable 컬럼 리사이즈 가능 여부
		 * @param {Boolean} option.tooltip 툴팁 표시 여부
		 * @param {Number} option.height 그리드 높이 (단위: 픽셀)
		 * @param {Function} option.click 행 클릭 이벤트 핸들러
		 * @param {Function} option.loadComplete 그리드 로딩 완료시 실행 될 이벤트 핸들러
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
		_component({
			name: 'Grid',
			fields:
			/**
			 * @lends star.ui.Grid
			 */
			{
				/**
				 * [설정] 더블크릭 처리를 위해 클릭 후 대기할 시간 (단위: 1/1000초)
				 * 
				 * @type Number 
				 * @defaults 0
				 */
				click_delay: 0,

				/**
				 * [설정] 로딩중 메시지 사용 여부
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				loading: false,

				/**
				 * [설정] 로딩중 메시지 표시시 메시지 표시 여부
				 * 
				 * @type Boolean
				 * @defaults true
				 */
				loading_message: true,

				/**
				 * [설정] 로딩중 메시지 텍스트
				 * 
				 * @type String
				 */
				loading_message_text: '로딩 중...',

				/**
				 * [설정] 로딩중 메시지 표시시 오버레이 표시 여부
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				loading_overlay: false,
				/**
				 * [설정] Grid frozen 사용 시, IE7 호환 
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				frozen_grid: false
			},
			events:
			/**
			 * @lends star.ui.Grid
			 */
			{
				/**
				 * [옵션] 행 클릭 핸들러
				 * 
				 * @type Function (rowid, e, status)
				 */
				click: undefined,
				/**
				 * [옵션] 행 더블클릭 핸들러
				 * 
				 * @type Function (rowid)
				 */
				dblclick: undefined
			},
			constructor_check: function() {
				return this.is('table');
			},
			constructor: function(option) {
				option = star.option(star.ui.Grid, option);

				var setting = $.extend({
					datatype: 'local',
					autowidth: true,
					colNames: [],
					colModel: [],
					cmTemplate: {
						title: option.tooltip === true
					},
					loadtext: option.loading_message_text,
					loadui: option.loading_message_overlay ? 'block' : 'enable'
				}, option);

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
								var model = $.extend({}, column, {
									name: column.id,
									sortable: column.sortable || option.sortable || false
								});

								if (column.visible !== undefined)
									model.hidden = column.visible === false;

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

										if ($.isFunction(func))
											/** @ignore */
											model.formatter = function(cellvalue, options, rowObject) {
												return func(cellvalue, {
													grid: $(this).attr('id'),
													row: options.rowId,
													column: options.colModel.name,
													values: rowObject
												});
											};
										else
											model.formatter = func;
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
								
								if (column.frozen !== undefined)
									option.frozen_grid = true;

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
			methods:
			/**
			 * @lends star.ui.Grid.prototype
			 */
			{
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
				/** @ignore */
				RecordSet: function(value) {
					if (value === undefined)
						return {
							nc_list: this.jqGrid('getRowData')
						};
					else {
						var option = this.data('star-option') || {};

						if (option.loading === true)
							this.LoadingShow();

						this.setGridParam({
							rowNum: value.nc_list.length,
							data: value.nc_list
						}).trigger('reloadGrid');

						if (option.loading === true)
							this.LoadingHide();

						return this;
					}
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
				/** @ignore */
				Record: function(row, value) {
					if (value === undefined) {
						return this.jqGrid('getRowData', row);
					} else {
						this.jqGrid('setRowData', row, value); // return boolean

						return this;
					}
				},
				/**
				 * 컬럼 데이터 조회
				 * 
				 * @name star.ui.Grid#Record^1
				 * @function
				 * @param {String} row 행 아이디
				 * @returns {star.data.IMap}
				 * @example
				 * var record = $('#grid').Column('row', 'column');
				 */
				/**
				 * 컬럼 데이터 설정
				 * 
				 * @name star.ui.Grid#Column
				 * @function
				 * @param {String} row 행 아이디
				 * @param {String} column 컬럼 아이디
				 * @param {star.data.IMap} value 컬럼 데이터
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Column('row', 'column', value);
				 */
				/** @ignore */
				Column: function(row, column, value) {
					if (value === undefined) {
						return this.jqGrid('getCell', row, column);
					} else {
						this.jqGrid('setCell', row, column, value);

						return this;
					}
				},
				/**
				 * 컬럼 속성 설정
				 * 
				 * @name star.ui.Grid#ColProp
				 * @function
				 * @param {String} column 컬럼 아이디
				 * @param {Object} property 설정정보
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').ColProp('column', property);
				 */
				/** @ignore */
				ColProp: function(column, property) {
					return this.jqGrid('setColProp', column, property);
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
				 * @param {Boolean} [format=false] 포멧팅 여부
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Footer(map);
				 */
				/** @ignore */
				Footer: function(value, format) {
					if (value === undefined)
						return this.jqGrid('footerData', 'get');
					else
						return this.jqGrid('footerData', 'set', value, !!format);
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
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Clear();
				 */
				_clear: function() {
					var clear_grid = this.data('star-option');
					
					if (clear_grid.frozen_grid === true) {
						this.jqGrid('destroyFrozenColumns');
						var ret = this.jqGrid('clearGridData', true);
						this.jqGrid('setFrozenColumns');
						return ret;
					} else {
						return this.jqGrid('clearGridData', true); // clearfooter
					}
					//return this.jqGrid('clearGridData', true);
				},

				/**
				 * 행 선택
				 * 
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
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Deselect();
				 */
				Deselect: function() {
					return this.jqGrid('resetSelection');
				},

				/**
				 * 행 선택 해제
				 * 
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Unselect();
				 * @deprecated Deselect()
				 */
				Unselect: function() {
					return this.jqGrid('resetSelection');
				},

				/**
				 * 행 선택 해제
				 * 
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').Reset();
				 * @deprecated deprecated
				 */
				Reset: function() {
					return this.jqGrid('resetSelection');
				},

				/**
				 * 행 편집
				 * 
				 * @param {String} id 행아이디
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').RowEdit(id);
				 */
				RowEdit: function(row) {
					this.jqGrid('editRow', row, true); // return Boolean

					return this;
				},

				/**
				 * 행 편집복원
				 * 
				 * @param {String} id 행아이디
				 * @returns {star.ui.Grid}
				 * @example
				 * $('#grid').RowRestore(id);
				 */
				RowRestore: function(row) {
					this.jqGrid('restoreRow', row); // edit모드 닫기

					return this;
				},
				/**
				* 행 편집복원 (저장)
				* 
				 * @param {String} id 행아이디
				* @returns {star.ui.Grid}
				* @example
				* $('#grid').RowSave(id);
				*/
				RowSave: function(row) {
					this.jqGrid('saveRow', row, {
						url: 'clientArray',
						aftersavefunc: function(req) {
						}
					});
					return this;
				},

				/**
				 * 조회
				 * 
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
				 * @param {star.data.IMap} value 값
				 * @returns rowid
				 * @example
				 * $('#grid').Add({column: 'value'});
				 */
				Add: function(value) {
					var rowid = 'sga_' + $.jgrid.randId();
					
					this.jqGrid('addRowData', rowid, value); // return Boolean

					return rowid;
				},

				/**
				 * 삭제
				 * 
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
				},

				/**
				 * 컬럼 보이기
				 * 
				 * @param {String} column 컬럼 아이디
				 * @param {Boolean} Grid 전체 길이를 보존할건지 선택 여부 (default: false)
				 */
				ColumnShow: function(column) {
					return this.jqGrid('showCol', column);
				},

				/**
				 * 컬럼 숨기기
				 * 
				 * @param {String} column 컬럼 아이디
				 * @param {Boolean} Grid 전체 길이를 보존할건지 선택 여부 (default: false)
				 */
				ColumnHide: function(column) {
					return this.jqGrid('hideCol', column);
				},

				/**
				 * 헤더 변경
				 * 
				 * @param {String} column 컬럼 헤더 아이디
				 * @param {String} data  변경 헤더
				 * @param {String} class 컬럼 헤더 
				 */
				HeaderSet: function(column, data, addclass, property) {
					return this.jqGrid('setLabel', column, data, addclass, property);
				},

				/**
				 * 넓이 변경
				 * 
				 * @param {Number} [width] 넓이 픽셀. 생략시 컨테이너의 넓이에 맞게 자동 조절.
				 */
				WidthResize: function(width) {
					if (width === undefined) {
						/*
						var container = this.closest('.ui-jqgrid').parent();

						width = container.attr('clientWidth') || 0;

						if (width < 1)
							width = container.attr('offsetWidth') || 0;

						width = width - 2;

						if (!(width > 0 && Math.abs(width - this.width()) > 5))
							width = 0;
						*/

						width = this.closest('.ui-jqgrid').parent().width() - 2;
					}

					return width > 0 ? this.jqGrid('setGridWidth', width) : this.jqGrid('columnChooser');
					//return width > 0 ? this.jqGrid('setGridWidth', width) : this;
					
					
				},

				/**
				 * 로딩중 메시지 표시
				 */
				LoadingShow: function() {
					var option = this.data('star-option') || {};
					var grid = this.closest('.ui-jqgrid');

					if (option.loading_message !== false)
						grid.find('.loading').show();

					if (option.loading_overlay === true)
						grid.find('.jqgrid-overlay').show();

					return this;
				},

				/**
				 * 로딩중 메시지 숨기기
				 */
				LoadingHide: function() {
					var grid = this.closest('.ui-jqgrid');

					grid.find('.loading').hide();
					grid.find('.jqgrid-overlay').hide();

					return this;
				},
				FooterMerge: function(column, span) {
					var id = this.attr('id');
					var table = this.closest('.ui-jqgrid').find('.ui-jqgrid-ftable');
					var trs = table.find('> tbody > tr.footrow');
	
					if (!table.hasClass('star-dummy')) {
						table.addClass('star-dummy');
	
						var thead = table.children('thead');
	
						if (thead.length === 0)
							table.prepend(thead = $('<thead/>'));
	
						var footer = trs.eq(0);
						var dummy = footer.clone().addClass('star-dummy');
						
						dummy.find('td').each(function(index, value) {
							this.style.width= '';
						});
						
						var td = dummy.children('[aria-describedby="' + id + '_' + column + '"]').attr('colspan', span);
						var width = td.width();
						var next = td;
						for ( var i = 1; i < span; i++) {
							next = next.next();
	
							width += next.width();
	
							next.hide();
						}
	
						table.append(dummy);
//						footer.hide();
						
						footer.find('td').each(function(index, value) {
							$(this).html('');
							$(this).height('0');
						});
						footer.attr('aria-hidden', 'true');
						footer.height('0');
					}
				}
			}
		});
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
		_component({
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
			methods:
			/**
			 * @lends star.ui.ListView.prototype
			 */
			{
				/**
				 * 레코드셋 데이터 설정
				 * 
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
	_component({
		name: 'Pager',
		fields:
		/**
		 * @lends star.ui.Pager
		 */
		{
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
			 * [설정/옵션] 데이터 크기
			 * 
			 * @type String
			 * @defaults 0
			 */
			total_size: 0,
			
			/**
			 * [설정/옵션] 
			 * 
			 * @type String
			 */
			space: '',
			
			/**
			 * [설정/옵션] 개수별보기
			 * 
			 * @type boolean
			 */
			pageInfo: false,
			
			/**
			* [설정/옵션] 개수별보기
			* 
			* @type boolean
			*/
			selectBoxShow: true,
			
			/**
			* [설정/옵션] 개수별보기(데이터양 많을 경우)
			* 
			* @type boolean
			*/
			selectBoxLong: false,

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
			block_next_disabled: '<a class="last inactive">&gt;&gt;</a>',

			/**
			 * [설정/옵션] 처음 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			total_prev_enabled: '<a style="display: none;">처음</a>',

			/**
			 * [설정/옵션] 처음 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			total_prev_disabled: '<a style="display: none;">처음</a>',

			/**
			 * [설정/옵션] 마지막 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			total_next_enabled: '<a style="display: none;">마지막</a>',

			/**
			 * [설정/옵션] 마지막 항목에 표시할 HTML
			 * 
			 * @type String
			 */
			total_next_disabled: '<a style="display: none;">마지막</a>'
		},
		events:
		/**
		 * @lends star.ui.Pager
		 */
		{
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
			click: undefined
		},
		constructor: function(option) {
			option = star.option(star.ui.Pager, option);

            this.data('star-option', option).addClass('star-pager')/*.addClass('star-recordset-set')*/.addClass('star-clearable');

            if (option.init !== undefined) {
                var self = this;

                $(function () {
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
		methods:
		/**
		 * @lends star.ui.Pager.prototype
		 */
		{
			/**
			 * 페이저 생성
			 * 
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
			    var pagerId = this.attr('id');
			    option.total_size = total;

			    if (page_size === undefined)
			        page_size = option.page_size;
			    if (block_size === undefined)
			        block_size = option.block_size;

			    option.page = page;
			    option.page_size = page_size;

			    page = Number(page);
			    total = Number(total);
			    page_size = Number(page_size);
			    block_size = Number(block_size);

			    var pages = Math.floor(total / page_size) + (total % page_size === 0 ? 0 : 1);

			    var block = Math.floor(page / block_size) + (page % block_size === 0 ? 0 : 1);
			    var blocks = Math.floor(pages / block_size) + (pages % block_size === 0 ? 0 : 1);
			    var page_start = page === 0 ? 0 : (block - 1) * block_size + 1;
			    var page_end = page === 0 ? 0 : (pages < block * block_size ? pages : block * block_size);

			    var o_total_prev;
			    var o_total_next;
			    var o_block_prev;
			    var o_block_next;
			    var o_page_prev;
			    var o_page_next;

				if (page > 1)
					o_total_prev = $(option.total_prev_enabled.replace('{{page}}', 1)).click(function() {
						option.click(1);
					});
				else
					o_total_prev = $(option.total_prev_disabled);

				if (page < pages) {
					o_total_next = $(option.total_next_enabled.replace('{{page}}', pages)).click(function() {
						option.click(pages);
					});
				} else {
					o_total_next = $(option.total_next_disabled);
				}

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

					o_page_next = $(option.page_next_enabled.replace('{{page}}', target4)).click(function() {
						option.click(target4);
					});
				} else {
					o_page_next = $(option.page_next_disabled);
				}

				this.empty();

				 if (option.pageInfo === true) {
				        var totalPager = 'total_' + pagerId;
				        this.append('<span class="brdcnt">총 건수 : <label id="'
								+ totalPager + '"></label></span>').html();
				        $('#' + totalPager).text(total);
				    }

				    this.append(o_total_prev).append(option.space);
				    this.append(o_block_prev).append(option.space);
				    this.append(o_page_prev).append(option.space);

				    if (page > 0) {
				        for (var i = page_start; i <= page_end; i++) {
				            var o_page = undefined;

				            (function () {
				                var p = i;

				                if (page != p)
				                    o_page = $(option.item_normal.replace('{{page}}', p)).click(function () {
				                        option.click(p);
				                    });
				                else
				                    o_page = $(option.item_current.replace('{{page}}', p));
				            })();

				            this.append(o_page).append(option.space);
				        }
				    }

				    this.append(o_page_next).append(option.space);
				    this.append(o_block_next).append(option.space);
				    this.append(o_total_next);
					
				    if (option.pageInfo === true && option.selectBoxShow === true) {
						var selectPager = 'select_' + pagerId;
//						this.addClass('brdcnt');
						this.append('<span class="rowcnt"><select id="'
								+ selectPager + '"></select></span>').html();
						
						if (option.selectBoxLong === true){
							var selectPageSize = ['10', '20', '30', '50', '100', '200'];
							
							
							for (var i = 0; i < selectPageSize.length; i++) {
								$('#' + selectPager).append("<option value=" + selectPageSize[i] + ">" + selectPageSize[i] + "</option>");
							}
							
							$('#' + selectPager).val(option.page_size);

							$('#' + selectPager).change(function () {
								option.page_size = $('#' + selectPager).val();
								option.click(1);
							});
						} else {
							selectPageSize = ['10', '20', '30', '50'];
							
							for (var i = 0; i < selectPageSize.length; i++) {
								$('#' + selectPager).append("<option value=" + selectPageSize[i] + ">" + selectPageSize[i] + "</option>");
							}
							$('#' + selectPager).val(option.page_size);

							$('#' + selectPager).change(function () {
								option.page_size = $('#' + selectPager).val();
								option.click(1);
							});
						}
					}

				    return this.data('star-option', option);
			},
			
			/**
			 * 레코드셋 데이터로 페이저 생성
			 * 
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
			 * @param {Number} page 페이지
			 * @returns {star.ui.Pager}
			 * @example
			 * $('#pager').Click(1);
			 */
			Click: function(page) {
				this.data('star-option').click(page);

				return this;
			},

			/**
			 * 현재 페이지 번호.
			 * 
			 * @returns {Number}
			 * @example
			 * var page = $('#pager').Page();
			 */
			Page: function() {
				return this.data('star-option').page || 0;
			},

			/**
			 * 현재 페이지 번호.
			 * 
			 * @returns {Number}
			 * @example
			 * var page_size = $('#pager').PageSize();
			 */
			PageSize: function() {
				return this.data('star-option').page_size || 0;
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Overlay
	///////////////////////////////////////////////////////////////////////////

	if ($.blockUI) {
		/**
		 * 오버레이
		 * 
		 * @name star.ui.Overlay
		 * @class
		 * @extends star.ui.IComponent
		 * @star_desktop
		 * @constructs
		 * @param {Object} [option] 옵션
		 * @example
		 * .star-overlay: {
		 *   display: none;
		 * }
		 */
		_component({
			name: 'Overlay',
			fields:
			/**
			 * @lends star.ui.Overlay
			 */
			{
				/**
				 * [옵션] 효과
				 * 
				 * @type String
				 * @deprecated default setting
				 */
				effect: 'fade',
				/**
				 * [옵션] 효과 지속 시간
				 * 
				 * @type Number
				 * @deprecated default setting
				 */
				duration: 1000
			},
			events:
			/**
			 * @lends star.ui.Overlay
			 */
			{
				/**
				 * [옵션] 보이는 이펙트 이후에 발생하는 이벤트
				 * 
				 * @type Function
				 */
				show: undefined,
				/**
				 * [옵션] 숨기는 이펙트 이후에 발생하는 이벤트
				 * 
				 * @type Function
				 */
				hide: undefined
			},
			constructor: function(option) {
				return this.data('star-option', option = $.extend({}, star.ui.Overlay, option)).addClass('star-overlay');
			},
			methods_check: function() {
				return this.hasClass('star-overlay');
			},
			methods:
			/**
			 * @lends star.ui.Overlay.prototype
			 */
			{
				/**
				 * 보이기
				 * 
				 * @param {Function} [callback]
				 * @return {star.ui.Overlay}
				 */
				Show: function(callback) {
					var setting = {
						message: this,
						css: {
							border: 'none',
							backgroundColor: 'transparent'
						}
					};

					callback = callback || this.data('star-option').show;

					if (callback)
						setting.onBlock = callback;

					$.blockUI(setting);

					return this;
				},

				/**
				 * 숨기기
				 * 
				 * @param {Function} [callback]
				 * @return {star.ui.Overlay}
				 */
				Hide: function(callback) {
					var setting = {};

					callback = callback || this.data('star-option').hide;

					if (callback)
						setting.onUnblock = callback;

					$.unblockUI(setting);

					return this;
				}
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Tree (jstree)
	///////////////////////////////////////////////////////////////////////////

	(function(window, $, star) {
		if ($.fn.jstree !== undefined) {
			var _parse = function(option, value) {
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
			};

			var _create = function(option) {
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

				if (option.expand || option.load !== undefined)
					this.bind('loaded.jstree', function(e, data) {
						if (option.expand === true)
							$(e.target).jstree('open_all');
						else if ($.isNumeric(option.expand))
							$(e.target).Expand(option.expand);

						if (option.load !== undefined)
							option.load();
					});

				if (option.click !== undefined)
					this.bind('select_node.jstree', function(e, data) {
						option.click($(data.rslt.obj[0]).attr('data-id'));
					});

				if (option.value !== undefined)
					setting.json_data.data = _parse(option, option.value);

				return this.addClass('star-recordset-set').data('star-option', option).jstree(setting);
			};

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
			_component({
				name: 'Tree',
				fields:
				/**
				 * @lends star.ui.Tree
				 */
				{
					/**
					 * [설정] 데이터 타입. list <del>or tree</del>
					 * 
					 * @type String
					 * @defaults 'list'
					 */
					type: 'list',

					/**
					 * [설정] 아이디 필드
					 * 
					 * @type String
					 * @defaults 'id'
					 */
					id: 'id',

					/**
					 * [설정] 제목 필드
					 * 
					 * @type String
					 * @defaults 'title'
					 */
					title: 'title',

					/**
					 * [설정] 부모 필드
					 * 
					 * @type String
					 * @defaults 'parent'
					 */
					parent: 'parent',

					/**
					 * [설정] 자식 필드
					 * 
					 * @type String
					 * @defaults 'children'
					 */
					children: 'children',

					/**
					 * [설정] 펼쳐진 상태로 데이터 로드할 지 여부. 숫자일 경우 몇 번째 레벨까지 펼칠지 지정.
					 * 
					 * @type Boolean|Number
					 * @defaults false
					 */
					expand: false
				},
				events:
				/**
				 * @lends star.ui.Tree
				 */
				{
					/**
					 * [옵션] 노드 클릭 핸들러
					 * 
					 * @type Function
					 */
					click: undefined
				},
				constructor: function(option) {
					return _create.apply(this, arguments);
				},
				methods_check: function() {
					return this.hasClass('jstree');
				},
				methods:
				/**
				 * @lends star.ui.Tree.prototype
				 */
				{
					/**
					 * 레코드셋 데이터 설정
					 * 
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

						return _create.call(this, option);
					},

					/**
					 * 레코드 데이터 조회
					 * 
					 * @param {String} row 행 아이디
					 * @returns {star.data.IMap}
					 * @example
					 * var record = $('#tree').Record(row);
					 */
					Record: function(row, value) {
						return this.find('[data-id="' + row + '"]').data('value');
					},

					/**
					 * 펼치기
					 * 
					 * @param {Number} level 레벨
					 * @param {Boolean} [animation=false] 애니메이션 여부
					 * @returns {star.ui.Tree}
					 */
					Expand: function(level, animation) {
						var tree = this;
						var s = this;

						for ( var i = 0; i < level; i++) {
							s = s.find('> ul > li');
							s.each(function() {
								tree.jstree('open_node', this, false, !animation);
							});
						}

						return this;
					}
				}
			});
		}
	})(window, window.jQuery, star);

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: SimpleTree
	///////////////////////////////////////////////////////////////////////////

	/**
	 * 트리
	 * 
	 * @name star.ui.SimpleTree
	 * @class
	 * @extends star.ui.IComponent
	 * @star_desktop
	 * @constructs
	 * @param {Object} [option] 옵션
	 * @param {star.data.IMap[]} [option.value]
	 * @example
	 * $('#tree').SimpleTree({
	 *   click: function(node) {
	 *   }
	 * });
	 */
	_component({
		name: 'SimpleTree',
		fields:
		/**
		 * @lends star.ui.SimpleTree
		 */
		{},
		events:
		/**
		 * @lends star.ui.SimpleTree
		 */
		{
			/**
			 * [옵션] 노드 클릭 핸들러
			 * 
			 * @type Function
			 */
			click: undefined
		},
		constructor: function(option) {
			var tree = this;

			this.on('mouseover', 'a', function() {
				$(this).addClass('jstree-hovered');
			});
			this.on('mouseout', 'a', function() {
				$(this).removeClass('jstree-hovered');
			});
			this.on('click', 'a', function() {
				var a = $(this);

				tree.find('.jstree-clicked').removeClass('jstree-clicked');

				a.addClass('jstree-clicked');

				if (option.click)
					option.click(a.parent());
			});
			this.on('click', 'li > ins', function() {
				var ins = $(this);
				var li = ins.parent();

				if (li.hasClass('jstree-open')) {
					li.removeClass('jstree-open').addClass('jstree-closed');
					return;
				}

				if (li.hasClass('jstree-closed')) {
					li.removeClass('jstree-closed').addClass('jstree-open');
					return;
				}
			});

			return this.addClass('star-tree').addClass('star-recordset-set').addClass('jstree').addClass('jstree-default');
		},
		methods_check: function() {
			return this.hasClass('star-tree');
		},
		methods:
		/**
		 * @lends star.ui.SimpleTree.prototype
		 */
		{}
	});

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Editor
	///////////////////////////////////////////////////////////////////////////

	if (window.tinymce !== undefined) {
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
		_component({
			name: 'Editor',
			fields:
			/**
			 * @lends star.ui.Editor
			 */
			{
				/**
				 * [설정/옵션] Image Upload
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				image: false
			},
			constructor: function(option) {
				var id = '#' + this.attr('id');
				var toolbar = "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image";
				
				var setting = {
					selector: id,
					plugin: "image",
				    toolbar: toolbar
				};
				
				option = $.extend(true, {}, this.data('star-option'), option);
				
//				if(option.image == true) {
//					setting.toolbar += " | image"; 
//					setting.setup = function(editor) {
//						editor.addButton('image', {
//							text: '',
//							icon: 'image',
//							tooltip: 'Image',
//							
//							onclick: function() {
//							    $.ImageBox();
//							}
//						});
//					}
//				}
				
				option = star.option(star.ui.Editor, option);
				this.addClass('star-field');
		        
				return tinymce.init(setting);
				// return this.addClass('star-field').tinymce(setting);
			},
			methods_check: function() {
				return this.next().hasClass('mceEditor');
			},
			methods:
			/**
			 * @lends star.ui.Editor.prototype
			 */
			{
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
				/** @ignore */
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
		 * @example
		 * $('#tab').Tab({
		 *   active: 0,
		 *   change: function() {
		 *   }
		 * });
		 */
		_component({
			name: 'Tab',
			fields:
			/**
			 * @lends star.ui.Tab
			 */
			{
				render: false,

				/**
				 * [옵션] 활성화된 탭 번호 (0부터 시작)
				 * 
				 * @type Number
				 * @defaults 0
				 */
				active: 0
			},
			events:
			/**
			 * @lends star.ui.Tab
			 */
			{
				/**
				 * [옵션] 탭 변경 이벤트
				 * 
				 * @type Function
				 */
				change: undefined
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
					if ($(this).attr('href').charAt(0) !== '#') {
						link = true;
						return false;
					}
				});

				if (link === true)
					/** @ignore */
					setting.beforeActivate = function(e, ui) {
						e.preventDefault();
						if($.isFunction(option.link)) {
							option.link(ui.newTab.find('a').attr('href'));
						} else 
							window.location.href = ui.newTab.find('a').attr('href');
						return false;
					};

				return this.tabs(setting);
			},
			methods_check: function() {
				return this.hasClass('ui-tabs');
			},
			methods:
			/**
			 * @lends star.ui.Tab.prototype
			 */
			{
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
				/** @ignore */
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
		_component({
			name: 'ExtHighcharts',
			constructor: function(option) {
				return this.ExtHighchartsBuild(option);
			},
			methods_check: function() {
				return this.children().hasClass('highcharts-container');
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

					//if (option.chart.type === undefined)
					//	option.chart.type = 'bar';

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
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////
	// STAR UI: LoadOverlay (jquery-loadmask)
	///////////////////////////////////////////////////////////////////////////
	if ($.fn.mask !== undefined) {
		/**
		 * LoadOverlay
		 * 
		 * @name star.ui.LoadOverlay
		 * @class
		 * @extends 
		 * @star_desktop
		 * @constructs
		 * @param {Object} option
		 * @requires <a href="http://code.google.com/p/jquery-loadmask/">jquery-loadmask</a>
		 */
		_component({
			name: 'LoadOverlay',
			fields: {
				label: '로딩중'
			},
			constructor: function(option) {
				option = star.option(star.ui.LoadOverlay, option);
				return this.LoadOverlay(option);
			},
			methods: {
				LoadOverlay: function(option) {
					return this.LoadOverlay(option);
				},
				Load: function(option) {
					
					var setting = {
						label: star.ui.LoadOverlay.label
					};
					return this.mask(setting.label);
				},
				UnLoad: function(option) {
					return this.unmask();
				}
			}
		});
	}
	
	///////////////////////////////////////////////////////////////////////////
	// STAR UI: Calendar 
	///////////////////////////////////////////////////////////////////////////
	/*
	 * Calendar를 Load할때 사용한다.
	 * script : javascript 의 Date를 이용해서 만듬. 일요일만 빨간색으로 표시됨.
	 * server : Server와 거래를 통해서 일자 정보를 받아와서 화면에 표시. 영업일로 표시 가능.
	 * file : js파일을 서버에 만들어서 화면에 표시 Server와 동일하나. 미리 js파일을 떨궈 놓아서 사용 
	 * custom : 사용자가 직접 만듬. ( 안쓸듯... )
	 */
	var CalendarLoading = function() {
		var $this = this;
		var option = this.data('star-option');
		var calendar = this.find('.star-ui-calendar-main');
		
		var drawCalendar = function(cal) {
			// 현재 일자 년월을 가지고 객체 생성
			var d = new Date(option.currentYear, option.currentMonth - 1, 1);
			// server, file 용 데이터 객체 정의
			var sd, ed, dateObj;
			if(cal!==undefined) {
				sd = new Date(cal.fields.mindate.substring(0, 4) + '-' + cal.fields.mindate.substring(4, 6) + '-' + cal.fields.mindate.substring(6, 8));
				ed = new Date(cal.fields.maxdate.substring(0, 4) + '-' + cal.fields.maxdate.substring(4, 6) + '-' + cal.fields.maxdate.substring(6, 8));
				sd.setHours(0, 0, 0, 0);
				ed.setHours(0, 0, 0, 0);
				
				if( !((sd.getTime() <= d.getTime()) && (d.getTime() < ed.getTime())) ) {
					alert('표시 date 범위 초과');
					// 기존에 그려진 달력을 삭제
					calendar.find('table').find('tr.star-ui-calendar-row').remove();
					// 변경된 년월을 화면에 반영함.
					$this.find('.star-ui-calendar-subtitle').html(option.setTitle(option.currentYear, option.currentMonth));
					return;
				}
			}
			// gray 표시는 달력에서 전후달에 대해 일부 정보가 보여지고자 할때 사용
			// 이부분은 요새 트렌드가 이래 보여서 넣었는데, 나중에 Value등 로직 작성할때 어려움. 괜히 넣은 듯
			var gray = true;
			// 요일 [일, 월, 화, 수, 목, 금, 토]
			// 0, 1, 2, 3, 4, 5, 6 을 리턴함
			var day = d.getDay();
			// 위의 요일 정보를 가지고 일자 년월 객체를 다시 설정함 (전달 정보를 일부 가져옴)
			d.setDate(d.getDate() - day);
			if(day===0)
				gray = false;
			var date = d.getDate();
			var month = d.getMonth();
			var year = d.getFullYear();
			var trs = '';
			// 조건문을 통해서 달력을 한줄 한줄 그림
			while((month < option.currentMonth || option.currentMonth===1)&& (year <= option.currentYear)) {
				if(option.currentMonth===1 && month===1) {
					break;
				}
				date = d.getDate();
				
				// 1주일을 그림
				trs += '<tr class="star-ui-calendar-row">';
				for(var i = 0; i < 7; i++) {
					// server, file 일때 
					if(cal!==undefined) {
						dateObj = cal.recordSets[year + '' + (month+ 1)].nc_list[d.getDate() - 1];
					} else 
						dateObj = undefined;
					
					if(dateObj===undefined) {
						if(i===0) {
							dateObj = {
								holiday : true,
								data : ''
							};
						} else {
							dateObj = {
								holiday : false,
								data : ''
							};
						}
						
					}
					if(gray) {
						trs += '<td class="star-ui-calendar-col star-ui-calendar-col'+i+' gray star-ui-calendar-date'+date+'">';
					} else {
						trs += '<td class="star-ui-calendar-col star-ui-calendar-col'+i+' star-ui-calendar-date'+date+'">';
					}
					if(dateObj.holiday===true || (typeof dateObj.holiday === 'string' && dateObj.holiday === 'true')) {
						trs += '<span class="star-ui-calendar-col-date day'+i+' holiday">'+date+'</span><br/><span class="star-ui-calendar-col-data">' + option.formatter(dateObj.data) + '</span>';
					} else {
						trs += '<span class="star-ui-calendar-col-date day'+i+'">'+date+'</span><br/><span class="star-ui-calendar-col-data">' + option.formatter(dateObj.data) + '</span>';
					}
					trs += '</td>';
					date++;
					d.setDate(date);
					if(month!==d.getMonth()) {
						date = d.getDate();
						month = d.getMonth();
						gray = !gray;
					}
				}
				trs += '</tr>';
				month = d.getMonth();
				year = d.getFullYear();
			}
			// 기존에 그려진 달력을 삭제
			calendar.find('table').find('tr.star-ui-calendar-row').remove();
			// 새로운 달력을 table에 붙임.
			calendar.find('table').append(trs);
			
			// 변경된 년월을 화면에 반영함.
			$this.find('.star-ui-calendar-subtitle').html(option.setTitle(option.currentYear, option.currentMonth));
		};
		
		switch(option.data_type) {
		case 'script' : 
			drawCalendar();
			break;
		case 'server' :
			// 서버는 file과 로직이 똑같아야 함.
			// 서버에서 오는 데이터 형식은
			/**
			 * {
			 * 		"fields":{
			 * 			"mindate":"20120101",
			 * 			"maxdate":"20141231"
			 * 		},
			 * 		"recordSets":{
			 * 			"20121":{
			 * 				"nc_list":[
			 * 					{
			 * 						"year":2012
			 * 						"month":1,
			 * 						"date":1,
			 * 						"day":0,
			 * 						"holiday":false,
			 * 						"data":""
			 * 					}
			 * 				]
			 * 			}
			 * 		}
			 * }
			 */
			var request = $.DataSet();
			var yearStr = null;
			var monthStr = null;
			if(option.currentMonth===1)  {
				request.fields.mindate = '' + (option.currentYear - 1) + '1201';
				request.fields.maxdate = '' + option.currentYear + '0228';
			} else if(option.currentMonth===12) {
				request.fields.mindate = '' + option.currentYear + '1101';
				request.fields.maxdate = '' + (option.currentYear + 1)+ '0131';
			} else if(option.currentMonth === 9) {
				request.fields.mindate = '' + option.currentYear + '0801';
				request.fields.maxdate = '' + option.currentYear + '1031';
			} else if(option.currentMonth === 10){
				request.fields.mindate = '' + option.currentYear + '0901';
				request.fields.maxdate = '' + option.currentYear + '1131';
			} else if(option.currentMonth === 11){
				request.fields.mindate = '' + option.currentYear + '1001';
				request.fields.maxdate = '' + option.currentYear + '1231';
			} else {
				request.fields.mindate = '' + option.currentYear + '0' + (option.currentMonth - 1) + '01';
				request.fields.maxdate = '' + option.currentYear + '0' + (option.currentMonth + 1) + '30';
			}
			// 서버로직 태우는건 동기화 문제가 있음.
			$.Service({
				transaction: option.data_tr,
				request: request,
				success: function(ds) {
					drawCalendar(ds);
				}
			});
			break;
		case 'file' : 
			var file = option.data_file;
			// sync를 싫어하지만 동기화 문제를 해결하려면 이방법이 제일 좋은것 같음.
			$.ajax({
				url: file,
				async: false,
				dataType: 'json',
				success: function (cal) {
					drawCalendar(cal);
				},
				fail: function() {
					alert('calendar file load fail');
				}
			});
			break;
		case 'custom' :
			option.data_custom();
			break;
		}
		return this;
	}
	
	/**
	 * Calendar
	 * 
	 * @name star.ui.Calendar
	 * @class
	 * @extends star.ui.IDataSet
	 * @star_desktop
	 * @constructs
	 * @param {Object} option
	 * @param {String} option.prev_year 전년 표시 Html Tag
	 * @param {String} option.prev_month 전월 표시 Html Tag
	 * @param {String} option.next_year 후년 표시 Html Tag
	 * @param {String} option.next_month 후월 표시 Html Tag
	 * @param {Function} option.setTitle 년월 표시는 함수를 통해서 Html Tag 생성
	 * @param {String} option.data_type 달력을 그릴때 Data를 어디서 취득할지 정함. (script, server, file, custom 지원)
	 * @param {Function} option.data_custom data_type이 'custom'일때 사용되는 함수.
	 * @param {Object} option.day_label 달력 일자(일월화수목금토) 표시
	 * @param {Function} option.prev_year_click 전년 클릭 이벤트 핸들러
	 * @param {Function} option.prev_month_click 전월 클릭 이벤트 핸들러
	 * @param {Function} option.next_year_click 후년 클릭 이벤트 핸들러
	 * @param {Function} option.next_month_click 후월 클릭 이벤트 핸들러
	 * @param {Function} option.title_click 타이틀 클릭 이벤트 핸들러 
	 * @param {Function} option.click 달력 일자 클릭 이벤트 핸들러
	 * @example
	 *  TODO 작성해야함.
	 */
	_component({
		name: 'Calendar',
		fields:
		/**
		 * @lends star.ui.Calendar
		 */
		{
			/**
			 * [설정/옵션] 전년 표시 Html Tag
			 * 
			 * @type String
			 * @defaults <<-
			 */
			prev_year : '<<-',
			/**
			 * [설정/옵션] 전월 표시 Html Tag
			 * 
			 * @type String
			 * @defaults <-
			 */
			prev_month: '<-',
			/**
			 * [설정/옵션] 후년 표시 Html Tag
			 * 
			 * @type String
			 * @defaults ->>
			 */
			next_year : '->>',
			/**
			 * [설정/옵션] 후월 표시 Html Tag
			 * 
			 * @type String
			 * @defaults ->
			 */
			next_month: '->',
			/**
			 * [설정/옵션] 년월을 표시할 타이틀 생성 함수
			 * 
			 * @type Function
			 */
			setTitle : function(year, month) {
				return '<span class="star-ui-calendar-year-title">'+year+'</span>년<span calss="star-ui-calendar-month-title">'+month+'</span>월';
			},
			/**
			 * [설정/옵션] 달력생성시 데이터 취득 방법 (script, server, file(js), custom)
			 * 
			 * @type String
			 * @defaults script
			 */
			data_type : 'script',	// script, server, file(js), custom
			/**
			 * [설정/옵션] 데이터 취득 방법이 'file'일 때 파일 경로 설정
			 * 
			 * @type String
			 */
			data_file : null,
			/**
			 * [설정/옵션] 데이터 취득 방법이 'server'일 때 서버 거래명 설정
			 * 
			 * @type String
			 */
			data_tr : null,
			/**
			 * [설정/옵션] 데이터 취득 방법이 custom일때 사용되는 함수
			 * 
			 * @type Function
			 */
			data_custom : null,
			/**
			 * [설정/옵션] 달력 요일(일월화수목금토) 표시 Html 
			 * 
			 * @type Object
			 * @defaults 일월화수목금토
			 */
			day_label : {
				sunday : '일',
				monday : '월',
				tuesday : '화',
				wednesday : '수',
				thursday : '목',
				friday : '금',
				saturday : '토'
			},
			formatter: function(value) {
				return value;
			},
			unformatter: function(value) {
				return value;
			}
		},
		events:
		/**
		 * @lends star.ui.Calendar
		 */
		{
			/**
			 * [옵션] 전년 클릭 이벤트 핸들러
			 * 
			 * @type Function (events, currentYear, currentMonth)
			 */
			prev_year_click : null,
			/**
			 * [옵션] 전월 클릭 이벤트 핸들러
			 * 
			 * @type Function (events, currentYear, currentMonth)
			 */
			prev_month_click : null,
			/**
			 * [옵션] 후년 클릭 이벤트 핸들러
			 * 
			 * @type Function (events, currentYear, currentMonth)
			 */
			next_year_click : null,
			/**
			 * [옵션] 후월 클릭 이벤트 핸들러
			 * 
			 * @type Function (events, currentYear, currentMonth)
			 */
			next_month_click : null,
			/**
			 * [옵션] 타이틀 클릭 이벤트 핸들러 
			 * 
			 * @type Function (events, currentYear, currentMonth)
			 */
			title_click : null,
			/**
			 * [옵션] 달력 일자 클릭 이벤트 핸들러
			 * 
			 * @type Function (events, year, month, date, day)
			 */
			click: null
		},
		constructor_check: function() {
			return this.is('div');
		},
		constructor: function(option) {
			option = star.option(star.ui.Calendar, option);
			var d = new Date();
			option.currentYear = d.getFullYear();
			option.currentMonth = d.getMonth() + 1;

			var calendarS = '<div><table><colgroup><col width="14%"><col width="14%"><col width="14%"><col width="14%"><col width="14%"><col width="14%"><col width="14%"></colgroup>' + 
							'<tr class="star-ui-calendar-header-row"><th class="star-ui-calendar-header sunday">'+option.day_label.sunday+'</th>' + 
							'<th class="star-ui-calendar-header monday">'+option.day_label.monday+'</th>' +
							'<th class="star-ui-calendar-header tuesday">'+option.day_label.tuesday+'</th>' +
							'<th class="star-ui-calendar-header wednesday">'+option.day_label.wednesday+'</th>' +
							'<th class="star-ui-calendar-header thursday">'+option.day_label.thursday+'</th>' +
							'<th class="star-ui-calendar-header friday">'+option.day_label.friday+'</th>' +
							'<th class="star-ui-calendar-header saturday">'+option.day_label.saturday+'</th>' +
							'</tr></table></div>'; 
			var $calendar = $(calendarS);
			var $yearTitle = $('<div/>');
			var $this = this;
			
			// title 생성 
			// <<-<- 년월일 ->->> 
			$yearTitle.addClass('star-ui-calendar-title');
			var $prev_year_span = $('<span class="star-ui-calendar-prev-year">').append(option.prev_year);
			var $prev_month_span = $('<span class="star-ui-calendar-prev-month">').append(option.prev_month);
			var $title_span = $('<span class="star-ui-calendar-subtitle">').append(option.setTitle(option.currentYear, option.currentMonth));
			var $next_year_span = $('<span class="star-ui-calendar-next-year">').append(option.next_year);
			var $next_month_span = $('<span class="star-ui-calendar-next-month">').append(option.next_month);
			if($.isFunction(option.prev_year_click)) {
				$prev_year_span.click(function(events) {
					var $calendar = $this;
					var data = $calendar.data('star-option');
					data.currentYear --;
					option.prev_year_click(events, data.currentYear, data.currentMonth);
					
					CalendarLoading.apply($calendar, []);
				});
			}
			if($.isFunction(option.prev_month_click)) {
				$prev_month_span.click(function(events) {
					var $calendar = $this;
					var data = $calendar.data('star-option');
					data.currentMonth --;
					if(data.currentMonth === 0) { 
						data.currentMonth = 12;
						data.currentYear--;
					}
					option.prev_month_click(events, data.currentYear, data.currentMonth);
					
					CalendarLoading.apply($calendar, []);
				});
			}
			if($.isFunction(option.title_click)) {
				$title_span.click(function(events) {
					var $calendar = $this;
					var data = $calendar.data('star-option');
					option.prev_click(events, data.currentYear, data.currentMonth);
					
					CalendarLoading.apply($calendar, []);
				});
			}
			if($.isFunction(option.next_year_click)) {
				$next_year_span.click(function(events) {
					var $calendar = $this;
					var data = $calendar.data('star-option');
					data.currentYear ++;
					option.next_year_click(events, data.currentYear, data.currentMonth);
					
					CalendarLoading.apply($calendar, []);
				});
			}
			if($.isFunction(option.next_month_click)) {
				$next_month_span.click(function(events) {
					var $calendar = $this;
					var data = $calendar.data('star-option');
					data.currentMonth ++;
					if(data.currentMonth === 13) { 
						data.currentMonth = 1;
						data.currentYear++;
					}
					option.next_month_click(events, data.currentYear, data.currentMonth);
					
					CalendarLoading.apply($calendar, []);
				});
			}
			$yearTitle.append($prev_year_span);
			$yearTitle.append($prev_month_span);
			$yearTitle.append($title_span);
			$yearTitle.append($next_month_span);
			$yearTitle.append($next_year_span);
			$this.append($yearTitle);
			
			// Calendar 생성
			$calendar.addClass('star-ui-calendar-main');
			$this.append($calendar);
			
			this.addClass('star-ui-calendar').data('star-option', option)
			
			CalendarLoading.apply(this, []);
			
			$calendar.on('click', function(events){
				var $calendar = $this;
				var data = $calendar.data('star-option');
				var $target = $(events.target);
				if(!$target.is('td')) {
					$target = $target.closest('td');
				}
				var date = $target.find('.star-ui-calendar-col-date').text();
				var day = $target.index();
				var year = data.currentYear;
				var month = data.currentMonth;
				if($target.hasClass('gray')) {
					if($target.parent().index()===1)
						month--;
					else 
						month++;
					if(month===0) {
						month = 12;
						year--;
					} else if(month===13) {
						month = 1;
						year++;
					}
				}
				if($.isFunction(data.click) && day!==-1) {
					return data.click(events, year, month, date, day);
				}
			});
			
			return this;
		},
		methods_check: function() {
			return this.hasClass('star-ui-calendar');
		},
		/**
		 * @lends star.ui.Calendar.prototype
		 */
		methods: {
			// val이 true이거나 otherMonth가 true이면 
			/**
			 * 달력 데이터 조회
			 * 
			 * @name star.ui.Calendar.Value^1
			 * @function
			 * @param {Number} 조회 일자 
			 * @param {Boolean} 다른 달 조회
			 * @returns {String}
			 * @example
			 * var val = $('#calendar').Value(10);
			 * var val = $('#calendar').Value(1, true);
			 */
			/**
			 * 달력 데이터 설정
			 * 
			 * @name star.ui.Calendar.Value^2
			 * @function
			 * @param {Number} 설정 일자
			 * @param {String} 설정 값 
			 * @param {Boolean} 다른 달 설정
			 * @returns {star.ui.Calendar}
			 * @example
			 * $('#calendar').Value(10, '<span> 일정 </span>');
			 * $('#calendar').Value(1, '<span> 다음 달 일정 </span>', true);
			 */
			Value: function(day, val, /* optional */ otherMonth) {
				var option = this.data('star-option');
				if(arguments.length===1) {
					var data = this.find('.star-ui-calendar-main').find('table').find('.star-ui-calendar-date' + day).not('.gray').find('.star-ui-calendar-col-data');
					return option.unformatter(data.html());
				} else if(arguments.length===2 && val!==true) {
					var data = this.find('.star-ui-calendar-main').find('table').find('.star-ui-calendar-date' + day).not('.gray').find('.star-ui-calendar-col-data');
					data.html(option.formatter(val));
					return this;
				} else if(arguments.length===2 && val===true) {
					var data = this.find('.star-ui-calendar-main').find('table').find('.gray.star-ui-calendar-date' + day).find('.star-ui-calendar-col-data');
					return option.unformatter(data.html());
				} else if(arguments.length===3 && otherMonth===true) {
					var data = this.find('.star-ui-calendar-main').find('table').find('.gray.star-ui-calendar-date' + day).find('.star-ui-calendar-col-data');
					data.html(option.formatter(val));
					return this;
				}
			},
			/*
			Fields: function(value) {
				if(value===undefined) {
					var data = this.data('star-option');
					
					var fields = {
						year: data.currentYear,
						month: data.currentMonth
					};
					
					return fields;
				} else {
					
				}
				 
			},*/
			RecordSets: function(value) {
				if(value===undefined) {
					value = {};
					value[this.attr('id')] = this.RecordSet();
					
					return value;
				} else {
					return this.RecordSet(value[this.attr('id')]);
				}
			},
			RecordSet: function(value) {
				if(value===undefined) {
					var rs = {
						nc_list: []
					};
					var data = this.data('star-option');
					var cols = this.find('.star-ui-calendar-main').find('table').find('.star-ui-calendar-col').not('.gray').find('.star-ui-calendar-col-data');
					
					for(var i = 0; i < cols.length; i++)
						rs.nc_list.push(data.unformatter(cols.eq(i).html()));
					
					return rs;
				} else {
					for(var i = 0; i < value.nc_list.length; i++) {
						this.Value(i + 1, value.nc_list[i]);
					}
					return this;
				}
			}
		}
	});
	
	/**
	 * Push 컴포넌트
	 * 
	 * @name star.ui.Push
	 * @class
	 * @constructs
	 * @param {Object} option 옵션
	 * @param {Number} [option.maxtimeout] Max Timeout 시간
	 * @param {String} [option.transaction] PUSH 거래 거래아이디
	 * @param {Function} [option.handler] PUSH 거래 호출 핸들러
	 * @param {String} [option.timeoutCookieId] Timeout Check Value 저장 Cookie Id
	 * @example
	 * $.Push({
	 *     transaction: 'pushPmCall',
	 *     handler: function(ds) {
	 *     		console.log(ds);
	 *     }
	 * });
	 */
	_component({
		name: 'Push',
		/**
		 * @lends star.ui.Push
		 */
		fields: {
			/**
			 * [옵션] Service URL
			 * 
			 * @type String
			 * @defaults ref:star.service.service_url
			 */
			push_url: null,
			/**
			 * [옵션] 서버 전송 데이터 변환 함수 (기본적으로 NEXCORE 연동 함수)
			 * 
			 * @type Function
			 */
			push_data: null,
			/**
			 * [옵션] 서버에서 응답이 왔을때 호출 되는 함수 (기본적으로 NEXCORE 연동 함수) 
			 * 
			 * @type Function
			 */
			push_success: null,
			/**
			 * [옵션] 서버와의 연동 실패시 호출 되는 함수 (기본적으로 NEXCORE 연동 함수)
			 * 
			 * @type Function
			 */
			push_error: null,
			/**
			 * [옵션] Max Timeout 시간
			 * 
			 * @type Number
			 * @defaults 300000
			 */
			maxtimeout: 300000,
			/**
			 * [옵션] PUSH 거래 거래아이디
			 * 
			 * @type String
			 */
			transaction: null,
			/**
			 * [옵션] PUSH 거래 호출 핸들러
			 * 
			 * @type Function
			 */
			handler: null,
			/**
			 * [옵션] Timeout Check Value 저장 Cookie Id
			 * 
			 * @type String
			 * @defaults 'push_timestamp'
			 */
			timeoutCookieId : 'push_timestamp'
		},
		methods_static: 
		/**
		 * @lends star.ui.Push
		 */
		{
			/**
			 * Push 기능 활성화
			 * 
			 * @param {Object} option 옵션
			 * @param {String} [option.transaction] PUSH 거래 거래아이디
			 * @param {Function} [option.handler] PUSH 거래 호출 핸들러
			 * @example
			 * var dialoghtmlS = '<div id="msg">';
			 * var dialoghtmlE = '</div>';
			 * $.Push({
			 * 		handler : function(msg) {
			 * 			try {
			 * 				for(var i = 0; i < msg.recordSets.PUSH_LIST.nc_list.length; i++) { 
			 * 					var $dialog = $(dialoghtmlS + msg.recordSets.PUSH_LIST.nc_list[i].MSG + dialoghtmlE);
			 * 					$dialog.Dialog().Title('관리자 메시지').Open();
			 * 				}
			 * 			} catch(e) {
			 * 			}
			 * 		},
			 * 		transaction: 'com.COMBBase#pCOM10301'
			 * });
			 */
			Push: function(option) {
				
				option = star.option(star.ui.Push, option);
				
				// 화면의 Timestamp 값을 저장한다.
				// 서버와의 연동에서 이 부분의 구현이 변경될 여지가 있다.
				var timestamp = $.Cookie(option.timeoutCookieId);
				if(timestamp===null || timestamp===undefined) timestamp = 0;
				
				// 서비스를 날릴 URL을 지정한다. Long-Polling의 경우 서버에 부하가 가기 때문에 사용에 있어서 기존 서블릿이 아닌 새로운 서블릿으로 통신할 경우가 있다.
				if(option.push_url===null) 
					option.push_url = star.service.service_url;
				
				// 넥스코어와의 연동이 아닐 경우 AJAX 통신에서 data부분을 맞춰주기 위해서 만듬.
				// 기본적으로 거래아이디와 timestamp가 인자로 넘어간다.
				if($.isFunction(option.push_data) !== false || option.push_data === null) {
					option.push_data = function(transaction, timestamp) {
						return JSON.stringify({
							transaction: {
								id: transaction
							},
							attributes: {},
							dataSet: {
								fields: {
									timestamp: timestamp
								},
								recordSets: {}
							}
						});
					};
				}
				// 넥스코어와의 연동이 아닐 경우 AJAX Success 부분을 맞춰주기 위해 만듬.
				// 기본적으로 NEXCORE와의 연동을 전재로 만들어 졌다.
				if($.isFunction(option.push_success) !== false || option.push_success === null) {
					option.push_success = function(response, status, xhr) {
						// Timestamp를 클라이언트에 저장한다.
						timestamp = response.dataSet.fields.timestamp;
						$.Cookie(option.timeoutCookieId, timestamp, 1);
						delete response.dataSet.fields.timestamp;
						// response.dataSet
						if (response.dataSet.message.result === 'OK'){
							// 성공시 Handler 호출
							if($.isFunction(option.handler)) {
								option.handler(response.dataSet);
							}
						}
						else {
							// fail
						}
					};
					
				}
				// 넥스코어와의 연동이 아닐 경우 AJAX Success 부분을 맞춰주기 위해 만듬.
				// 기본적으로 NEXCORE와의 연동을 전재로 만들어 졌다.
				if($.isFunction(option.push_error) !== false || option.push_error === null) {
					option.push_error = function(xhr, status, error) {
						
					};
				}
				(function poll() {
					// Long-Polling 방식으로 구현 되었다
					$.ajax({
						// 특정 URL로 AJAX 통신을 요청한다. (기본은 service_url)
						url: option.push_url,
						type: 'POST',
						// data의 경우는 기본적으로 DataSet으로 보내준다. 이를 확장하고자 할경우 json형태로 보낼 정보를 반환하는 함수를 제작 해야 한다. 
						data: option.push_data(option.transaction, timestamp),
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						processData: false,
						cache: false,
						// success / fail 등 ajax 함수 완료 후 자기 자신을 호출 한다.
						complete: poll,
						// 서버와의 통신시간을 조절 한다.
						timeout: option.maxtimeout,
						success: option.push_success,
						error: option.push_error
					});
				})();
			}
		}
	});
	
	
	///////////////////////////////////////////////////////////////////////////
	// STAR Mobile UI: Swipe( flicking) (jquery-touchSwipe)
	///////////////////////////////////////////////////////////////////////////
	if($.fn.swipe !== undefined) {
		/**
		 * Swipe 컴포넌트
		 * 
		 * @name star.ui.Swipe
		 * @class
		 * @extends star.ui.IDisalable
		 * @star_mobile
		 * @constructs
		 * @param {Object} option 옵션
		 * @param {String} [option.finger] 인식 가능한 손가락 수
		 * @param {Number} [option.threshold] 최소 인식 길이 (px)
		 * @param {Number} [option.maxTimeThreshold] 최대 인식 가능 시간 (milliseconds)
		 * @param {Boolean} [option.triggerOnTouchEnd] true일경우 손가락을 띄었을때 event가 발생하고, false이면 threshold를 넘어가게 되면 이벤트가 발생한다
		 * @param {Boolean} [option.triggerOnTouchLeave] ture일 경우는 지정된 object안에서 swipe되어야 하고 false일 경우 Object를 벗어나면 이벤트가 발생한다.
		 * @param {Function} [option.swipe] swipe 인식 시 동작
		 * @param {Function} [option.swipeLeft] 왼쪽 swipe 인식 시 동작
		 * @param {Function} [option.swipeRight] 오른쪽 swipe 인식 시 동작
		 * @param {Function} [option.swipeUp] 위 swipe 인식 시 동작
		 * @param {Function} [option.swipeDown] 아래 swipe 인식 시 동작
		 * @param {Function} [option.swipeStart] swipe 시작 시 동작
		 * @param {Function} [option.swipeEnd] swipe 종료 시 동작
		 * @param {Function} [option.swipeCancle] swipe 취소 시 동작
		 * @param {Function} [option.swipeMove] swipe 중 동작
		 * @param {Function} [option.swipeStatus] 모든 Swipe 이벤트 관리
		 * @requires <a href="http://labs.rampinteractive.co.uk/touchSwipe">jquery-swipe</a>
		 * @example
		 * $('#obj').Swipe({
		 * 	swipe: function (event, direction, distance, duration, fingerCount) {
		 * 		alert('You Swiped ' + direction);
		 * 	}
		 * });
		 */
		_component({
			name: 'Swipe',
			/**
			 * @lends star.ui.Swipe
			 */
			fields: {
				/**
				 * [옵션] 인식할 손가락 제스쳐를 선택한다. 'one', 'two', 'all'
				 * 
				 * @type String
				 * @defaults 'one'
				 */
				finger: 'one',
				/**
				 * [옵션] threshold 값이상 손가락 제스쳐를 해야 Swipe Event가 발동한다
				 * 
				 * @type Number
				 * @defaults 75
				 */
				threshold: 75,
				/**
				 * [옵션] 제스처를 해당 시간 안에 처리해야 한다 (단위: 1/1000초)
				 * 
				 * @type Number
				 * @defaults null
				 */
				maxTimeThreshold: null,
				/**
				 * [옵션] Swipe Event가 동작하는 순간을 설정한다. <br/>
				 * true :  제스처가 종료 된 시점 <br/>
				 * false : threshold가 만족된 시점
				 * 
				 * @type Boolean
				 * @defaults true
				 */
				triggerOnTouchEnd: true,	// If true, the swipe events are triggered when the touch end event is received (user releases finger). If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
				/**
				 * [옵션] Swipe Event가 동작하는 순간을 설정한다. <br/>
				 * true : Swipe이 적용된 Object를 벗어나는 순간
				 * false : Swipe이 적용된 Object안에서 발생
				 * 
				 * @type Boolean
				 * @defaults false
				 */
				triggerOnTouchLeave: false	// If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers.
			},
			/**
			 * @lends star.ui.Swipe
			 */
			events: {
				/**
				 * [설정] Swipe Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipe: null,		// function (event, direction, distance, duration, fingerCount)
				/**
				 * [설정] 왼쪽 Swipe Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeLeft: null,
				/**
				 * [설정] 오른쪽 Swipe Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeRight: null,
				/**
				 * [설정] 위 Swipe Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeUp: null,
				/**
				 * [설정] 아래 Swipe Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeDown: null,
				/**
				 * [설정] Swipe Event 시작 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeStart: null,
				/**
				 * [설정] Swipe Event 종료 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeEnd: null,
				/**
				 * [설정] Swipe Event 취소 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeCancle: null,
				/**
				 * [설정] Swipe Event 작동중 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				swipeMove: null,
				/**
				 * [설정] Swipe Event Status 핸들러 <br/>
				 * Status 핸들러 안에서 swipeStart, End, Cancle, Move를 따로 컨트롤 할 수 있다.
				 * 해당 핸들러를 정의하면 swipeStart, End, Cancle, Move 가 동작하지 않는다.
				 * 
				 * @type Function (event, phase, direction, distance, duration, fingers)
				 */
				swipeStatus: null
			},
			constructor: function(option) {
				this.addClass('star-ui-mobile-swipe');
				
				if(this.hasClass('star-ui-mobile-pinch') || this.hasClass('star-ui-mobile-tap') ) {
					option = star.option(this.data('star-mobile-option'), option);
					this.swipe('destroy');
				}
				
				option = star.option(star.ui.Swipe, option);
				
				if(option.finger=='one') option.fingers = $.fn.swipe.fingers.ONE;
				else if(option.finger=='two')  option.fingers = $.fn.swipe.fingers.TWO;
				else  option.fingers = $.fn.swipe.fingers.ALL;
				
				if(option.swipeStatus!=null) {
					option.swipeStatusUser = option.swipeStatus;
				}
				option.swipeStatus = function(event, phase, direction, distance, duration, fingers) {
					var option = $(this).data('star-mobile-option');
					
					if(option.swipeStatusUser != undefined) {
						return option.swipeStatusUser(event, phase, direction, distance, duration, fingers);
					}
					
					if(phase==$.fn.swipe.phases.PHASE_START) {
						if(option.swipeStart != null) {
							option.swipeStart(event, direction, distance, duration, fingers);
						}
			        } 
					if(phase==$.fn.swipe.phases.PHASE_CANCEL) {
						if(option.swipeCancle != null) {
							optin.swipeCancle(event, direction, distance, duration, fingers);
						}
			        }
					if(phase==$.fn.swipe.phases.PHASE_END) {
						if(option.swipeEnd != null) {
							option.swipeEnd(event, direction, distance, duration, fingers);
						}
			        }
					if(phase==$.fn.swipe.phases.PHASE_MOVE) {
						if(option.swipeMove != null) {
							option.swipeMove(event, direction, distance, duration, fingers);
						}
			        }
				}
				
				return this.swipe(option).data('star-mobile-option', option);
			},
			methods_check: function() {
				return this.hasClass('star-ui-mobile-swipe');
			},
			methods:
			/**
			 * @lends star.ui.IDisablable.prototype
			 */
			{
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
				/** @ignore */
				Enabled: function(enabled) {
					if (enabled === undefined)
						return this.swipe('disable');
					else {
						if (enabled)
							return this.swipe('enable');
						else
							return this.swipe('disable');
					}
				},
				/**
				 * 활성화
				 * 
				 * @returns {star.ui.IDisablable}
				 * @example
				 * $('#data').Enable();
				 */
				Enable: function() {
					return this.swipe('enable');
				},
				/**
				 * 활성화
				 * 
				 * @returns {star.ui.IDisablable}
				 * @example
				 * $('#data').Enable();
				 */
				Disable: function() {
					return this.swipe('disable');
				}
			}
		});
		
		/**
		 * Tap 컴포넌트
		 * 
		 * @name star.ui.Tap
		 * @class
		 * @extends star.ui.IDisalable
		 * @star_mobile
		 * @constructs
		 * @param {Object}	option 옵션
		 * @param {Number}	[option.doubleTapThreshold] Dobule Tap 인식 인터벌 (milliseconds)
		 * @param {Number}	[option.longTapThreshold] Long Tap 인식 시간 (milliseconds)
		 * @param {Array}	[option.excludeElements] Tap 동작시 제외 할 객체
		 * @requires <a href="http://labs.rampinteractive.co.uk/touchSwipe">jquery-swipe</a>
		 * @example
		 * $('#obj').Tap({
		 * 	tap: function (event, target) {
		 * 		alert('Tap');
		 * 	}
		 * });
		 */
		_component({
			name: 'Tap',
			/**
			 * @lends star.ui.Tap
			 */
			fields: {
				/**
				 * [옵션] Double Tap Event 발생을 위한 인식 인터벌 ( 1/1000 초)
				 * 
				 * @type Number
				 * @defaults 200
				 */
				doubleTapThreshold: 200,
				/**
				 * [옵션] Long Tap Event 발생을 위한 인식 시간 ( 1/1000 초)
				 * 
				 * @type Number
				 * @defaults 500
				 */
				longTapThreshold : 500,
				/**
				 * [옵션] Tap Eevent가 동작하지 않는 Element 설정
				 * 
				 * @type String
				 * @defaults 'input, button, select, textarea, a'
				 */
				excludedElements: 'input, button, select, textarea, a, .noSwipe'
			},
			events: {
				/**
				 * [설정] Tap Event 핸들러
				 * 
				 * @type Function (event, target)
				 */
				tap: function() {},
				/**
				 * [설정] Long Tap Event 핸들러
				 * 
				 * @type Function (event, target)
				 */
				longTap: null,
				/**
				 * [설정] Double Tap Event 핸들러
				 * 
				 * @type Function (event, target)
				 */
				doubleTap: null
			},
			constructor: function(option) {
				this.addClass('star-ui-mobile-tap');
				
				if(this.hasClass('star-ui-mobile-swipe') || this.hasClass('star-ui-mobile-pinch') ) {
					option = star.option(this.data('star-mobile-option'), option);
					this.swipe('destroy');
				}
				
				option = star.option(star.ui.Tap, option);
				
				return this.swipe(option).data('star-mobile-option', option);
			},
			methods_check: function() {
				return this.hasClass('star-ui-mobile-tap');
			},
			methods:
				/**
				 * @lends star.ui.IDisablable.prototype
				 */
				{
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
					/** @ignore */
					Enabled: function(enabled) {
						if (enabled === undefined)
							return this.swipe('disable');
						else {
							if (enabled)
								return this.swipe('enable');
							else
								return this.swipe('disable');
						}
					},
					/**
					 * 활성화
					 * 
					 * @returns {star.ui.IDisablable}
					 * @example
					 * $('#data').Enable();
					 */
					Enable: function() {
						return this.swipe('enable');
					},
					/**
					 * 활성화
					 * 
					 * @returns {star.ui.IDisablable}
					 * @example
					 * $('#data').Enable();
					 */
					Disable: function() {
						return this.swipe('disable');
					}
				}
		});
		
		/**
		 * Pinch 컴포넌트
		 * 
		 * @name star.ui.Pinch
		 * @class
		 * @extends star.ui.IDisalable
		 * @star_mobile
		 * @constructs
		 * @param {Object}	option 옵션
		 * @param {Number}	[option.pinchThreshold] Pinch 인식 거리 (px)
		 * @requires <a href="http://labs.rampinteractive.co.uk/touchSwipe">jquery-swipe</a>
		 * @example
		 * $('#obj').Pinch({
		 * 	pinchIn: function (event, direction, distance, duration, fingerCount) {
		 * 		alert('Pinch In');
		 * 	},
		 *  pinchOut: function (event, direction, distance, duration, fingerCount) {
		 * 		alert('Pinch Out');
		 * 	}
		 * });
		 */
		_component({
			name: 'Pinch',
			/**
			 * @lends star.ui.Pinch
			 */
			fields: {
				/**
				 * [옵션] Pinch Event 발생을 위한 인식 거리 (px)
				 * 
				 * @type Number
				 * @defaults 20
				 */
				pinchThreshold: 20
			},
			events: {
				/**
				 * [설정] Pinch In Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				pinchIn: null,
				/**
				 * [설정] Pinch Out Event 핸들러
				 * 
				 * @type Function (event, direction, distance, duration, fingerCount)
				 */
				pinchOut: null
			},
			constructor: function(option) {
				this.addClass('star-ui-mobile-pinch');
				
				if(this.hasClass('star-ui-mobile-swipe') || this.hasClass('star-ui-mobile-tap') ) {
					option = star.option(this.data('star-mobile-option'), option);
					this.swipe('destroy');
				}
				
				option = star.option(star.ui.Pinch, option);
				
				return this.swipe(option).data('star-mobile-option', option);
			},
			methods_check: function() {
				return this.hasClass('star-ui-mobile-pinch');
			},
			methods:
				/**
				 * @lends star.ui.IDisablable.prototype
				 */
				{
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
					/** @ignore */
					Enabled: function(enabled) {
						if (enabled === undefined)
							return this.swipe('disable');
						else {
							if (enabled)
								return this.swipe('enable');
							else
								return this.swipe('disable');
						}
					},
					/**
					 * 활성화
					 * 
					 * @returns {star.ui.IDisablable}
					 * @example
					 * $('#data').Enable();
					 */
					Enable: function() {
						return this.swipe('enable');
					},
					/**
					 * 활성화
					 * 
					 * @returns {star.ui.IDisablable}
					 * @example
					 * $('#data').Enable();
					 */
					Disable: function() {
						return this.swipe('disable');
					}
				}
		});
	}

	/////////////////////////////////////////////////////////////////////////
	// STAR Utility
	/////////////////////////////////////////////////////////////////////////

	/**
	 * 
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
	 * @param {Number} precision 숫자
	 * @param {String} [format] 패턴
	 * @returns {String} 숫자 문자열
	 * @deprecated 준비중
	 */
	$.NumberFormat = function(option) {
		var precision = '';
		var str = String(option.value);
		
		var x = str.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1))
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		
		if(option.precision === 0){
			return x1;
		} else if(option.precision){
			precision = parseInt(option.precision);
						
			if(x2 === ''){
				for(var i = 0; i < precision; i++)
					x2 += '0';
				x2 = '.' + x2;
			}
			
			var x3 = x2.substring(0, precision + 1);
			if(x3.length - 1 < precision){
				var zero = precision - x3.length + 1
				for (var i=0; i < zero; i++){
					x3 += '0';
				}
			}
			return x1 + x3;
		} else {
			return x1 + x2;
		}
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
		return encodeURIComponent(value || '');
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
	// ES5 Method 
	///////////////////////////////////////////////////////////////////////////
	
	// Array Method
	if( window.Array !== undefined ) {
		// Array.isArray
		if( window.Array.isArray === undefined ) {
			Array.isArray = function(obj) {
				return Object.prototype.toString.call(obj)=='[object Array]';
			}
		}
		
		// every( callback[, thisObject])
		if( Array.prototype.every === undefined ) {
			Array.prototype.every = function (callback, thisObject) {
				var _self = this;
				var _this = thisObject === undefined ? this : thisObject;
				
				for( var i = 0; i < _self.length; i++) {
					if(callback.apply(_this, [_self[i], i, _self]) === false)
						return false;
				}
				
				return true;
			}
		}
		
		// filter( callback )
		if( Array.prototype.filter === undefined ) {
			Array.prototype.filter = function (callback) {
				var _self = this;
				var returnArray = [];
				
				for( var i = 0; i < _self.length; i++) {
					if(callback.apply(_self, [_self[i], i, _self]) === true)
						returnArray.push(_self[i]);
				}
				
				return returnArray;
			}
		}
		
		// forEach ( callback )
		if( Array.prototype.forEach === undefined ) {
			Array.prototype.forEach = function (callback) {
				var _self = this;
				
				for( var i = 0; i < _self.length; i++) {
					callback.apply(_self, [_self[i], i, _self]);
				}
			}
		}
		
		// indexOf ( findValue[, startIndex] )
		if( Array.prototype.indexOf === undefined ) {
			Array.prototype.indexOf = function (findValue, startIndex) {
				var _self = this;
				var i = startIndex === undefined ? 0 : startIndex;
				var returnIndex = -1;
				
				for( ; i < _self.length; i++) {
					if(_self[i] === findValue)
						return i;
				}
				
				return returnIndex;
			}
		}
		
		// lastIndexOf ( findValue )
		if( Array.prototype.lastIndexOf === undefined ) {
			Array.prototype.lastIndexOf = function (findValue) {
				var _self = this;
				var returnIndex = -1;
				
				for(i = _self.length - 1; i >= 0; i--) {
					if(_self[i] === findValue)
						return i;
				}
				
				return returnIndex;
			}
		}
		
		// map( callback )
		if( Array.prototype.map === undefined ) {
			Array.prototype.map = function (callback) {
				var _self = this;
				var returnArray = [];
				
				for( var i = 0; i < _self.length; i++) {
					returnArray.push(callback.apply(_self, [_self[i], i, _self]));
				}
				
				return returnArray;
			}
		}
		
		// reduce( callback [, initialValue )
		if( Array.prototype.reduce === undefined ) {
			Array.prototype.reduce = function (callback, initialValue) {
				var _self = this;
				var value;
				var isValueSet = false; 
				
				if(initialValue !== undefined) {
					isValueSet = true;
					value = initialValue;
				} 
				
				for( var i = 0; i < _self.length; i++) {
					if(isValueSet) {
						value = callback.apply(_self, [value, _self[i], i, _self]); 
					} else {
						value = _self[i];
						isValueSet = true;
					}
				}
				
				return value;
			}
		}
		
		// reduceRight( callback [, initialValue )
		if( Array.prototype.reduceRight === undefined ) {
			Array.prototype.reduceRight = function (callback, initialValue) {
				var _self = this;
				var value;
				var isValueSet = false; 
				
				if(initialValue !== undefined) {
					isValueSet = true;
					value = initialValue;
				} 
				
				for( var i = _self.length - 1 ; i >= 0; --i) {
					if(isValueSet) {
						value = callback.apply(_self, [value, _self[i], i, _self]); 
					} else {
						value = _self[i];
						isValueSet = true;
					}
				}
				
				return value;
			}
		}
		
		// some(callback[, thisObject])
		if( Array.prototype.some === undefined ) {
			Array.prototype.some = function (callback, thisObject) {
				var _self = this;
				var _this = thisObject === undefined ? this : thisObject;
				
				for( var i = 0; i < _self.length; i++) {
					if(callback.apply(_this, [_self[i], i, _self]) === true)
						return true;
				}
				
				return false;
			}
		}
	}	
	
	///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	// STAR Initializer
	///////////////////////////////////////////////////////////////////////////

	if ($.mobile !== undefined) {
		$.mobile.ajaxEnabled = false;
		$.mobile.ignoreContentEnabled = true;
		$.mobile.pushStateEnabled = false;

		//$.mobile.page.prototype.options.domCache = false;

		//$(document).on('pageshow', 'div[data-role="page"]', function() {
		// 78 : iPhone bottom bar height (retina)
		//$('div[data-role="content"]').css('height', parseInt($('div[data-role="page"]').css('height')) - parseInt($('div[data-role="header"]').css('height')) - parseInt($('div[data-role="footer"]').css('height')));
		//});
	}

	///////////////////////////////////////////////////////////////////////////

})(window);

/*! Alopex UI - v2.2.34.2 - 2015-01-28
* http://ui.alopex.io
* Copyright (c) 2015 alopex.ui; Licensed Copyright. SK C&C. All rights reserved. */
+(function($) {
	if (!window.console) {
		window.console = {
			history: [],
			historyLimit: 200,
			log: function() {
				this.history.push(Array.prototype.join.call(arguments, ' '));
				while (this.history.length > this.historyLimit) {
					this.history.shift();
				}
			}
		};
	}
	var $window = $(window);
	var $windowtop = $(window.top);

	function getParamNames(fn) {
		var funStr = fn.toString();
		return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
	}
	function voidFunction(){}
	var isMobile = ("ontouchstart" in document.documentElement || 'ontouchstart' in window);
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	var isIE = (function() {
		//get document mode
		for (var v = 3, el = document.createElement('b'), all = el.all || [];
			 el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->', all[0];);
		return _min(v > 4 ? v : document.documentMode, document.documentMode);
	}());
	var ieVER = (function(){
		//get browser mode
		var e, obj = document.createElement("div"), x,
			verIEtrue = null,  // True IE version [string/null]
			CLASSID = [
				"{45EA75A0-A269-11D1-B5BF-0000F8051515}", // Internet Explorer Help
				"{3AF36230-A269-11D1-B5BF-0000F8051515}", // Offline Browsing Pack 
				"{89820200-ECBD-11CF-8B85-00AA005B4383}"];
		try{obj.style.behavior = "url(#default#clientcaps)"}
		catch(e){ };
		for (x=0;x<CLASSID.length;x++)
		{
			try{verIEtrue = obj.getComponentVersion(CLASSID[x], "componentid").replace(/,/g,".")}
			catch(e){ };
			if (verIEtrue) break;
		};
		return typeof verIEtrue ==="string" ? Number(verIEtrue.split(".")[0]) : null;
	})();
	var isAlopexEvent = $.fn.hasOwnProperty('tap') || $.fn.hasOwnProperty('singletap');
	var isAlopexMobile = isMobile && isAlopexEvent;
	var wheelEventName = ("onwheel" in document.createElement("div")) ? "wheel" : // Modern browsers support "wheel"
		document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
		"DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	function _noapi(){
		setTimeout(function(){
			console.error('[DO NOT USE]');
			throw new Error('[AlopexGrid] unsupported API');
		},0);
	}
	//Polyfill
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun/*, thisArg*/) {
			'use strict';
			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i];
					// NOTE: Technically this should Object.defineProperty at
					//       the next index, as push can be affected by
					//       properties on Object.prototype and Array.prototype.
					//       But that method's new, and collisions should be
					//       rare, so use the more-compatible alternative.
					if (fun.call(thisArg, val, i, t)) {
						res.push(val);
					}
				}
			}

			return res;
		};
	}
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {

			var k;

	    // 1. Let O be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this == null) {
	    	throw new TypeError('"this" is null or not defined');
	    }

	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If len is 0, return -1.
	    if (len === 0) {
	    	return -1;
	    }

	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = +fromIndex || 0;

	    if (Math.abs(n) === Infinity) {
	    	n = 0;
	    }

	    // 6. If n >= len, return -1.
	    if (n >= len) {
	    	return -1;
	    }

	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of O with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in O && O[k] === searchElement) {
	      	return k;
	      }
	      k++;
	  }
	  return -1;
	};
	}
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

	  Array.prototype.map = function(callback, thisArg) {

	    var T, A, k;

	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }

	    // 1. Let O be the result of calling ToObject passing the |this| 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal 
	    //    method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    if (arguments.length > 1) {
	      T = thisArg;
	    }

	    // 6. Let A be a new array created as if by the expression new Array(len) 
	    //    where Array is the standard built-in constructor with that name and 
	    //    len is the value of len.
	    A = new Array(len);

	    // 7. Let k be 0
	    k = 0;

	    // 8. Repeat, while k < len
	    while (k < len) {

	      var kValue, mappedValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal 
	        //    method of O with argument Pk.
	        kValue = O[k];

	        // ii. Let mappedValue be the result of calling the Call internal 
	        //     method of callback with T as the this value and argument 
	        //     list containing kValue, k, and O.
	        mappedValue = callback.call(T, kValue, k, O);

	        // iii. Call the DefineOwnProperty internal method of A with arguments
	        // Pk, Property Descriptor
	        // { Value: mappedValue,
	        //   Writable: true,
	        //   Enumerable: true,
	        //   Configurable: true },
	        // and false.

	        // In browsers that support Object.defineProperty, use the following:
	        // Object.defineProperty(A, k, {
	        //   value: mappedValue,
	        //   writable: true,
	        //   enumerable: true,
	        //   configurable: true
	        // });

	        // For best browser support, use the following:
	        A[k] = mappedValue;
	      }
	      // d. Increase k by 1.
	      k++;
	    }

	    // 9. return A
	    return A;
	  };
	}

	var _tickstack = [];//{timestamp:time,name:name}
	function _clock(){
		var totalTime = 0;
		var result = $.map(_tickstack, function(v,i){
			if(i) {
				var elapsed = (v.timestamp - _tickstack[i-1].timestamp);
				totalTime += elapsed;
				return '['+_tickstack[i-1].name+'~'+v.name+'] ' + elapsed + 'ms';
			}
		});
		result.push('[total]'+totalTime+'ms');
		_tickstack = []
		return result.join(' / ');
	}
	function _tick(name){
		_tickstack.push({timestamp:new Date().getTime(), name:name || _tickstack.length});
	}

	var _idbase = Number(Math.random().toString().split(".").pop().slice(-3));
	var _idprefix = "alopexgrid";
	var hasAlopexValidate = false;
	$(function(){
		hasAlopexValidate = window["Validator"] && $.isFunction($.fn.validator) && $.isFunction($.fn.getErrorMessage);
	});
	if($.inArray('dataTransfer', $.event.props)<0) {
		$.event.props.push('dataTransfer');
	}
	if($.inArray('clipboardData', $.event.props)<0) {
		$.event.props.push('clipboardData');
	}
	function hasAlopexValidator() {
		return hasAlopexValidate;
	}
	function _convertAlopex (str){
		if(this.option && this.option.disableAlopexConvert) {
			return str;
		}
		if($ && $.alopex && $.isFunction($.fn.convert)) {
			var containDataType = true;
			if(typeof str === "string" && str.indexOf('data-type') === -1) {
				containDataType = false;
			}
			if(containDataType){
				return $(str).convert();
			}
		}
		return str;
	}

	function processMappingValidate(mapping) {
		return $.isPlainObject(mapping.validate) && hasAlopexValidator();
	}
	var _tooltipTimer = null;
	var _changeTimer = null;
	function processValidateChange(mapping, valid, errorMessage, cell, value, e) {
		var self = this;
		if(_tooltipTimer) {
			clearTimeout(_tooltipTimer);
			_tooltipTimer = null;
		}
		var ischange = (e && e.type === "change");
		if(!self.option.validateOnchangeForAnyEvent && ischange
				&& $.isFunction(mapping.validate.onchange)) {
			if(_changeTimer) clearTimeout(_changeTimer);
			_changeTimer = null;
			_changeTimer = setTimeout(function(){
				$.isFunction(mapping.validate.onchange) ? 
					mapping.validate.onchange(valid, errorMessage, cell, value) : "";
				_changeTimer = null;
			},200);
		}
		_tooltipTimer = setTimeout(function(){
			//사용자 지정 callback이 있는 경우
			($.isFunction(mapping.validate.onchange) && self.option.validateOnchangeForAnyEvent) 
				? mapping.validate.onchange(valid, errorMessage, cell, value) : "";
			($.isFunction(self.option.on.validate)) 
				? self.option.on.validate(valid, errorMessage, cell, value) : "";

			var usetooltip = ($.type(self.option.useValidateTooltip) === "boolean") ? self.option.useValidateTooltip : true;
			if(mapping.validate.onchange || self.option.on.validate) {
				if(mapping.validate.enableTooltip === true) {
					usetooltip = true;
				} else if(self.option.useValidateTooltip !== true) {
					usetooltip = false;
				}
			} else {
				if(mapping.validate.enableTooltip === false) {
					usetooltip = false;
				}else if(mapping.validate.enableTooltip === true) {
					usetooltip = true;
				}
			}

			if (usetooltip) {
				//사용자 지정 callback이 없는 경우 default 처리
				var $cell = cell.jquery ? cell : $(cell);
				$cell[valid ? "removeClass" : "addClass"]("invalid");
				$cell[!valid ? "removeClass" : "addClass"]("valid");
				var id = _generateUniqueId();
				$cell.prop('id', id);

				self._showTooltip($cell[0], errorMessage.join('<br>'), null);
			}
			_tooltipTimer = null;
		},200);
	}
	function getValidatoredInput(cell, mapping) {
		var self = this;
		var $input = (self.option.directEdit && mapping.editable===true) ?
			$('<input type="text" value="'+$(cell).text()+'">')
			: $(cell).find('input,select,textarea');
		if ($input && $input.length) {
			//validator option이 없는 경우 해당 항목을 추출하여 validator를 $(cell)에 호출시킨다.
			if (!$input.attr("data-validate-rule") && !$input.attr('data-validation-rule')) {
				$input.validator({
					option: {
						onkeyup: false,
						onchange: false,
						onblur: false
					},
					rule: $.extend({}, mapping.validate.rule),
					message : $.extend({}, mapping.validate.message)
				});
				if($.isPlainObject(mapping.validate.attr)) {
					var attr = $.extend({}, mapping.validate.attr);
					if(attr["styleclass"]) {
						attr["class"] = [(attr["class"]||""),attr["styleclass"]].join(' ');
						delete attr["styleclass"];
					}
					$input.attr(attr);
				}
			}
		}
		return $input.length ? $input : null;
	}

	var __tagsToReplace = {
		'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#039;',' ':'&nbsp;'
	};
	function __replaceTag(tag) {
		return __tagsToReplace[tag] || tag;
	}
	function _escapeHTML(str) {
		return String(str).replace(/[&<>"'\s\u00A0]/g, __replaceTag);
	}

	function _generateUniqueId() {
		return _idprefix + (_idbase++);
	}
	function _generateUniqueNumber() {
		return _idbase++;
	}

	function _scrollHack($elem, ns){
		if(isMobile) { $elem.on('touchstart'+(ns||''), voidFunction); }
	}
	function clearSelection() {
		if (window.getSelection) {
			if (window.getSelection().empty) {
				try {
					window.getSelection().empty();
				} catch (error) {
				}
			} else {
				if (window.getSelection().removeAllRanges) {
					try {
						window.getSelection().removeAllRanges();
					} catch (error) {
					}
				}
			}
		} else {
			if (document.selection && document.selection.empty) {
				try {
					document.selection.empty();
				} catch (error) {
				}
			}
		}
	}
	function _valid(value) {
		return !(value === null || value === undefined);
	}
	function _min(a, b) {
		return a < b ? a : b;
	}
	function _max(a, b) {
		return a > b ? a : b;
	}
	function _generateHTML(data, $root) {
		var html = [];
		if($.isArray(data)) {
			data = {child:data};
		}
		if (!$root && ((data === undefined || data === null) || (!data.tag && (data.child === undefined || data.child === null)))) {
			return (data === undefined || data === null) ? "" : data;
		}
		if ($root && !$root.jquery) {
			$root = $($root);
		}

		if (data !== undefined && data !== null) {
			if (data.tag && !$root) {
				html.push('<', data.tag);
				if (data.attr) {
					for ( var key in data.attr) {
						var name = key;
						if (key == "styleclass") {
							name = "class";
						}
						html.push(' ', name, '="', data.attr[key], '"');
					}
				}
				html.push('>');
			}
			if ($root && data.attr) {
				for ( var key in data.attr) {
					if (key === "styleclass") {
						$root.addClass(data.attr[key]);
					} else {
						$root.attr(key, data.attr[key]);
					}
				}
			}

			if (data.hasOwnProperty('child') && data.child !== null && data.child !== undefined) {
				if ($.isArray(data.child)) {
					for ( var i in data.child) {
						html.push(_generateHTML(data.child[i]));
					}
				} else {
					html.push(_generateHTML(data.child));
				}
			}

			if (data.tag && !$root) {
				html.push('</', data.tag, '>');
			}
		}
		if ($root) {
			$root.html(html.join(''));
		} else {
			return html.join('');
		}
	}
	function _addClassAttribute(elem, className) {
		if(!elem.attr.styleclass || $.inArray(className,elem.attr.styleclass.split(' ')) < 0) {
			elem.attr.styleclass = (elem.attr.styleclass || '') + ' ' + className;
		}
	}
	function _addEventAttribute(elem, type, handler, useAttr) {
		if (!elem || typeof elem !== "object" || !elem.hasOwnProperty('tag') || typeof type !== "string") {
			return;
		}
		var name = type;
		elem.attr = elem.attr || {};
		elem.attr[name] = elem.attr[name] || "";
		elem.attr[name] += handler;
	}

	function _isColumnValid(mapping, cell, value, data) {
		var self = this;
		if ($.isArray(mapping.valid)) {
			for ( var i in mapping.valid) {
				if (mapping.valid[i] === value) {
					return true;
				}
			}
			return false;
		} else if (typeof mapping.valid == "function") {
			return mapping.valid(cell, value, data);
		} else if ($.isArray(mapping.rule)) {
			for ( var i in mapping.rule) {
				if (_ruleValue(mapping.rule[i],"value") === value) {
					return true;
				}
			}
			return false;
		}
		return true;
	}
	//mapping.render.rule object parser/reader
	function _parseRule(render, value, data, mapping) {
		if(!render.rule) return null;
		var rules = render.rule || null;
		if($.isFunction(render.rule)) {
			rules = render.rule(value, data, mapping) || null;
		}
		if($.isArray(render.rule)) {
			rules = render.rule;
		}
		return rules;
	}
	function _ruleValue(ruleobj, key) {
		if(ruleobj.hasOwnProperty(key)) return ruleobj[key];
		if(ruleobj.hasOwnProperty(key.toUpperCase())) return ruleobj[key.toUpperCase()];
		if(ruleobj.hasOwnProperty(key.toLowerCase())) return ruleobj[key.toLowerCase()];
		return undefined;
	}
	//셀 내부의 데이터로부터 현재 선택된 값을 추출..?
	function _extractValue(mapping, cell, data) {
		//render.type="text" : 셀 내부의 input의 value를 data로 추출한다
		//render.type="select" : 셀 내부의 select의 selected option의 value를 추출
		//render.type="radio" : 셀 내부의 radio input중 checked input의 value를 추출
		//render.type="check" : 셀 내부의 check input의 check여부에 따라 boolean값 추출
		//그 외에 처리되지 않는 내용은 endEdit함수에 의해 처리된다.
		var self = this;
		var $cell = cell.jquery ? cell : $(cell);
		if (mapping.editable === true) {
			if(self.option.directEdit) {
				return $cell.text();
			}
			return $cell.find('input').eq(0).val();
		}
		var editable = mapping.editable;

		if(editable.type && (self.option.renderMapping[editable.type] || self.option.renderMapping["*"])) {
			var mappedRender = self.option.renderMapping[editable.type] || self.option.renderMapping["*"];
			if($.isFunction(mappedRender)) {
				editable = mappedRender(editable, mapping);
			} else if($.isPlainObject(mappedRender)) {
				editable = $.extend({}, editable, mappedRender);
			}
		}

		if(editable.type) {
			if (editable.type == "text") {
				var val = $cell.find('input').val();
				if (editable.rule) {
					if (editable.rule === "comma") {
						val = val.replace(/,/g, '');
					} else if (editable.rule === "date" || editable.rule === "month") {
						val = val.replace(/-/g, '');
					}
				}
				return val;
			}
			if (editable.type == "select") {
				return $cell.find('select option').filter(":selected").val();
			}
			if (editable.type == "radio") {
				return $cell.find('input').filter(":checked").val();
			}
			if (editable.type == "textarea") {
				return $.cell.find('textarea').val();
			}
			if (editable.type == "check") {
				var rule = editable.rule;
				var checked = $cell.find('input').eq(0).is(":checked");
				//true/false만 리턴하거나, 또는 render.rule이 지정하는 바가 있을 경우 찾아서 value를 생성한다.
				if ($.isArray(rule)) {
					$.each(rule, function(idx, r) {
						if (_ruleValue(r,"check") === checked) {
							checked = _ruleValue(r,"value");
							return false;
						}
					});
				}
				return checked;
			}
			if (editable.type == "date") {
				return $cell.find('input').val().replace(/\-/gi, '');
			}
		} else {
			var worker = null;
			if ($.isFunction(mapping.editedValue) || $.isFunction(editable.editedValue)) {
				worker = (mapping.editedValue || editable.editedValue);
			}
			if($.isFunction(worker)) {
				return worker(cell, $.extend({}, data), mapping);
			}
		}
	}
	function _renderValue(render, value, data, mapping) {
		var self = this;
		var rendered = "";
		if (value === undefined) {
			value = "";
		}
		// var copied = $.extend({}, data);
		var type = render.type || null;
		var orgtype = type;
		if(type && (self.option.renderMapping[type] || self.option.renderMapping["*"])) {
			var mappedRender = self.option.renderMapping[type] || self.option.renderMapping["*"];
			if($.isFunction(mappedRender)) {
				render = mappedRender(render, mapping);
			} else if($.isPlainObject(mappedRender)) {
				render = $.extend({}, render, mappedRender);
			}
			type = render.type || null;
		}
		if(!(type || render)) {
			throw new Error('[AlopexGrid] Unable to render cell with a renderer of type "'+orgtype+'"');
		}
		rendered += _renderValue.plugin[type || "general"].call(self, render, value, data, mapping);
		return rendered;
	}

	_renderValue.plugin = {};
	_renderValue.plugin["general"] = function(render, value, data, mapping) {
		var rendered = "";
		if (typeof render == "string") {
			rendered += render;
		} else if ($.isFunction(render)) {
			rendered += render.call(this, value, data, mapping, render);
		} else if ($.isPlainObject(render)) {
			if(render.rule) {
				var rules = $.isFunction(render.rule) ? render.rule(value, data, mapping, render) : render.rule;
				for ( var idx in rules) {
					if (_ruleValue(rules[idx],"value") == value) {
						rendered += _ruleValue(rules[idx],"text");
					}
				}
			}
		}
		return rendered;
	};
	//TODO 메타기반으로 자동 생성 가능토록
	_renderValue.plugin["href"] = function(render, value, data, mapping) {
		var rendered = "";
		rendered += ('<a href="'+ (value || '#') + '" class="');
		if (render.styleclass) {
			rendered += (render.styleclass);
		}
		rendered += ('" ');
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				rendered += (prop + '="' + render.attr[prop] + '" ');
			}
		}
		rendered += ('>');
		if (render.text) {
			rendered += (render.text);
		}
		rendered += ('</a>');
		return rendered;//.join('');
	};
	//일반 텍스트 렌더링 모듈. 천단위 콤마와 같은 특수 포매팅도 담당한다. 
	_renderValue.plugin["string"] = function(render, value, data, mapping) {
		value = _escapeHTML(value);
		var tag = {
			tag: "div",
			attr: {},
			child: value
		};
		tag.attr = $.extend(tag.attr, $.isPlainObject(render.attr) ? render.attr : null);
		if (typeof render.styleclass === "string") {
			tag.attr.styleclass = render.styleclass;
		}
		var renderrule = _parseRule(render, value, data, mapping);
		if (typeof renderrule === "string") {
			var rules = renderrule.split(' ');
			var result = value;
			$.each(rules, function(idx, rule) {
				if (rule === "comma") {
					result = _addCommas(result);
				} else if (rule === "ellipsis") {
					tag.attr.style = tag.attr.style || "";
					tag.attr.style += "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;";
				}
			});
			tag.child = result;
		} else if($.isArray(render.rule) || $.isFunction(render.rule)) {
			var result = value;
			var rules = ($.isFunction(render.rule) ? render.rule(value, data, mapping) : render.rule) || [];
			for(var i=0,l=rules.length; i<l; i++) {
				var rule = rules[i];
				if(_ruleValue(rule, "value") === undefined) continue;
				if(String(_ruleValue(rule, "value")) === String(value) && _ruleValue(rule, "text") !== undefined) {
					result = _ruleValue(rule, "text");
				}
			}
			tag.child = result;
		}
		if($.isEmptyObject(tag.attr)) return _generateHTML(tag.child);
//		tag.child = _escapeHTML(tag.child);
		return _generateHTML(tag);
	};
	//textarea 생성 
	_renderValue.plugin["textarea"] = function(render, value, data, mapping) {
		//{ type : "textarea" , attr : {row : 6, col : 30}, styleclass : "newtextarea"
		var tag = {
			tag: "textarea",
			attr: {
				name: (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()
			},
			child: value
		};
		tag.attr = $.extend(tag.attr, $.isPlainObject(render.attr) ? render.attr : null);
		if (typeof render.styleclass === "string") {
			tag.attr.styleclass = render.styleclass;
		}
		if (!tag.attr.style || tag.attr.style.indexOf('width') === -1) {
			tag.attr.style = (tag.attr.style || "") + "width:100%;max-width:100%;";
		}
		return _generateHTML(tag);
	};
	//input tag 생성,  type="text"
	_renderValue.plugin["text"] = function(render, value, data, mapping) {
		var self = this;
		var rendered = '<input type="text" value="';
		rendered += ((value === undefined ? "" : value) + '" ');
		rendered += ('name="' + ((this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()) + '" ');
		if (render.styleclass) {
			rendered += ('class="'+ render.styleclass+ '" ');
		}
		var align = self.option.innerAlignForEditableText ? render.align : '';
		var aligntext = (align || render.textAlign) ? 
				('text-align:'+ (align || render.textAlign) + ';') : ''
		var styleoccured = false;
		if (typeof render.attr == "object") {	
			for ( var prop in render.attr) {
				if (prop == "style") {
					styleoccured = true;
					rendered += (prop + '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop] + aligntext + '" ');
				} else {
					rendered += (prop + '="' + render.attr[prop] + '" ');
				}
			}
		} 
		if(!styleoccured) {
			rendered += ('style="width:100%;'+aligntext+'"');
		}
		var irule = null;
		if (typeof render.rule === "string") {
			irule = render.rule.split(' ');
		} else if ($.isArray(render.rule)) {
			irule = render.rule;
		} else if ($.isFunction(render.rule)) {
			irule = render.rule(value, data, mapping);
		}
		if ($.isArray(irule)) {
			$.each(irule, function(idx, rule) {
				if (rule === "number") {//숫자만 입력 가능한 input
					rendered += (' onkeypress="AlopexGrid._renderNumberOnlyHandler(event);"');
				} else if (rule === "comma" || rule === "date" || rule === "month") {
					//comma : 3자리마다 쉼표를 넣기. number로 제한. extractor도 구현해야 함.
					//date : 2014-01-01. number로 제한
					//month : 2014-01. number로 제한. 
					rendered += (' onkeypress="if(AlopexGrid._renderNumberOnlyHandler(event)===false){return false;};return AlopexGrid._renderReplaceHandler(this,event,\'' + rule + '\');"');
				}
			});
		}
		rendered += ('/>');
		return rendered;//.join('');
	};
	_renderValue.plugin["select"] = function(render, value, data, mapping) {
		var rendered = '<select name="';
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		rendered += (((this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()) + '" ');

		if (render.styleclass) {
			rendered += ('class="'+ render.styleclass+ '" ');
		}
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				if (prop == "style") {
					rendered += (prop, '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop]+ '" ');
				} else {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
		} else {
			rendered += ('style="width:100%;"');
		}

		if (render.readonly) {
			rendered += (' disabled="disabled"');
		}
		rendered += ('>');
		for ( var idx in rules) {
			var rule = rules[idx];
			rendered += ('<option value="', _ruleValue(rule, "value"), '"');
			if (_ruleValue(rule, "value") == value) {
				rendered += (' selected="selected"');
			}
			rendered += ('>'+ (_ruleValue(rule, "text") || _ruleValue(rule, "value"))+ '</option>');
		}
		rendered += ('</select>');

		return rendered;//.join('');
	};
	_renderValue.plugin["radio"] = function(render, value, data, mapping) {
		var rendered = "";
		var name = (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId();
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		for ( var idx in rules) {
			var rule = rules[idx];
			rendered += ('<label ');
			if (typeof render.attr == "object") {
				for ( var prop in render.attr) {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
			rendered += ('><input type="radio" name="'+ name+ '" value="'+ _ruleValue(rule, "value")+ '"');
			if (render.readonly) {
				rendered += (' disabled="disabled" ');
			}
			if (render.styleclass) {
				rendered += (' class="'+ render.styleclass+ '" ');
			}
			if (_ruleValue(rule, "value") == value) {
				rendered += (' checked="checked"');
			}
			rendered += ('/>'+ '<span>'+ (_ruleValue(rule, "text") || _ruleValue(rule, "value"))+ '</span>');
			rendered += ('</label>');
		}
		return rendered;//.join('');
	};
	_renderValue.plugin["check"] = function(render, value, data, mapping) {
		var rendered = "";
		var name = (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId();
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		rendered += ('<input type="checkbox" name="'+ name+ '"');
		if (render.styleclass) {
			rendered += (' class="'+ render.styleclass+ '" ');
		}
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				rendered += (prop+ '="'+ render.attr[prop]+ '" ');
			}
		}
		if (value == true || value == "true") {
			rendered += (' checked="checked"');
		}
		if ($.isArray(rules)) {
			for ( var idx in rules) {
				var rule = rules[idx];
				if (_ruleValue(rule, "value") == value && _ruleValue(rule, "check")) {
					rendered += (' checked="checked"');
					break;
				}
			}
		}
		if (render.readonly) {
			rendered += (' disabled="disabled"');
		}
		rendered += ('/>');
		return rendered;//.join('');
	};
	_renderValue.plugin["date"] = function(render, value, data, mapping) {
		var rendered = '<input type="text" data-type="dateinput" ';
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				if (prop == "style") {
					rendered += (prop+ '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop]+ '" ');
				} else {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
		}
		var datestr = value.substr(0, 4) + '-' + value.substr(4, 2) + '-'
			+ value.substr(6, 2);
		rendered += (' value="' + ((value.length != 0) ? datestr : '') + '" ');
		rendered += ('/>');
		return rendered;
		// var str = rendered.join('');
		// return str;
	};

	//MergeSort - stable
	function _merge_sort(array, comparison, begin, end) {
		begin = begin || 0;
		end = end || array.length;
		var size = end - begin;
		if (size < 2)
			return array;
		var middle = begin + Math.floor(size / 2);
		var merged = _merge(_merge_sort(array.slice(begin, middle), comparison), _merge_sort(array.slice(middle, end), comparison), comparison);
		merged.unshift(begin, merged.length);
		Array.prototype.splice.apply(array, merged);
		//array.splice(begin, merged.length, )
		return array;
	}
	function _merge(left, right, comparison) {
		var result = [];
		while ((left.length > 0) && (right.length > 0)) {
			if (comparison(left[0], right[0]) <= 0)
				result.push(left.shift());
			else
				result.push(right.shift());
		}
		while (left.length > 0)
			result.push(left.shift());
		while (right.length > 0)
			result.push(right.shift());
		return result;
	}
	//Sort General
	function _sort(list, comparison, begin, end) {
		if (!list || !list.length) {
			return list;
		}
		if (list.length < 2) {
			return list;
		}

		begin = begin || 0;
		end = end || (list.length);
		if(end-begin > 120000 && begin == 0 && end == list.length && !isChrome) {
			list.sort(comparison);//12만건 이상의 자체함수 이용 정렬은 크롬에서도 스택초과로 불과. 또한 정렬결과가 stable하지 않음.
		} else {
			_merge_sort(list, comparison, begin, end);
		}
		return list;
	}
	//정렬되어 있지 않은 list에 대해서, rowspan:"always"가 있는 경우 해당 컬럼 기준으로 
	//흩어진 데이터들을 맨 앞의 최초 출현 시점으로 모으도록 한다.
	//drag and drop등으로 데이터 순서가 변경되어 정렬이 해제된 경우 사용.
	function _rowspanPack(datalist, mapping) {//console.log('pack')
		if (!mapping || !mapping.key || mapping.rowspan !== "always") {
			return datalist;
		}
		var key = mapping.key;
		var begin = 0;
		var end = datalist.length;
		while (begin < end) {
			var beginval = datalist[begin][key];//비교대상 시작 값.
			var pos = begin + 1;//다음 출현값을 넣을 위치. 출현값 넣고난 후 1 증가시킨다.
			var cursor = begin + 1;//읽기 시작할 값의 위치. 읽고나서 1증가시킨다.
			while (cursor < end) {
				if (datalist[cursor][key] === beginval) {
					if (pos !== cursor) {//같은위치에서는 옮길 필요 없음.
						var removed = datalist.splice(cursor, 1);
						datalist.splice(pos, 0, removed[0]);
					}
					pos++;
				}
				cursor++;
			}
			begin = pos;
		}
		return datalist;
	}
	//숫자 - rowspan=""에 쓰일 값, true - span되었으니 렌더링 하지 마세요.
	//호출 로직은 state.rowspanindex[]에서 컬럼인덱스에 의해 rowspanindex값을 얻어온 뒤,
	//이 함수를 호출하고. 결과에 따라 자신의 업무를 처리한다.
	function _rowspanned(rowspanindex, myindex, getindex) {
		var result = false;
		var summary = rowspanindex[rowspanindex.length - 1];
		if (!summary) {
			return;
		}
		var index = summary[myindex];
		if(!index) return false;
		var from = Number(index.from);
		var to = Number(index.to);
		var my = Number(myindex);
		if (from === my) {
			return getindex ? index : (to - from);
		}
		if (from < my && my < to) {
			return getindex ? index : true;
		}
		return false;

		//    $.each(rowspanindex, function(i,index) {
		//      var from = Number(index.from);
		//      var to = Number(index.to);
		//      var my = Number(myindex);
		//      if(from === my) {
		//        result = getindex ? index : (to - from);
		//        return false;
		//      }
		//      if(from < my && my < to) {
		//        result = getindex ? index : true;
		//        return false;
		//      }
		//    });
		//    return result;
	}
	//자신이 속한 row가 rowspanindex에 따를 때 어떤 row에 의해 span되었는가?
	function _rowspannedFrom(rowspanindex, myindex) {//console.log('from')
		var result = false;
		$.each(rowspanindex, function(i, index) {
			var from = Number(index.from);
			var to = Number(index.to);
			var my = Number(myindex);
			if (from <= my && my <= to) {
				result = from;
				return false;
			}
		});
		return result;
	}
	function _rowspanWidestIndex(rowspanindex, dataIndex) {
		var result = null;
		if (!rowspanindex || !rowspanindex.length) {
			return result;
		}
		$.each(rowspanindex, function(idx,rindex) {
			if(!rindex) {
				return;
			}
			if(!result) {
				result = _rowspanned(rindex, Number(dataIndex), true);
			} else {
				var comp = _rowspanned(rindex, Number(dataIndex), true);
				if(Math.abs(comp.to - comp.from) > Math.abs(result.to - result.from)) {
					result = comp;
				}
			}
		});
		return result;
	}

	var AlopexGrid = function(elem, option) {
		var self = this == window ? {} : this;
		var globalAlopexGrid = window["AlopexGrid"];
		var preloaded = $(elem).data(globalAlopexGrid.KEY_NAME);
		if (preloaded) {
			self.updateOption(option);
			return self;
		}

		var key = _generateUniqueId();
		self.key = key;
		self.unique = _generateUniqueNumber();
		self.serial = AlopexGrid.serial++;
		self.state = {
			progressStack: 0,
			data: [],
			metaData : {},
			deletedData: [],
			rendered:[],
			_paddingDataLength:0,
			footerData : {}
		};
		//option extend
		self.option = $.extend(true, {}, globalAlopexGrid.defaultOption, globalAlopexGrid.commonOption);
		self.root = elem;
		self.$root = $(elem);

		//IE8에서 window.resize 무한루프 버그
		self.lastWindowHeight = $(window).height();
		self.lastWindowWidth = $(window).width();

		//마크업 생성
		self.viewInit();
		self.$title = this.$root.find('>.title');
		self.$pager = this.$root.find('>.pager');
		self.$pagerleft = self.$pager.find('.pagerleft');
		self.$pagerright = self.$pager.find('.pagerright');
		self.$wrapper = self.$root.find('.wrapper');
		self.$footer = self.$root.find('>.footer');
		self.$scroller = self.$wrapper.find('.scroller');
		self.$scrollpanel = self.$scroller.find('.scrollpanel');
		self.$table = this.$wrapper.find('.table').not('.cloned');
		self.$tablebody = self.$table.find('.table-body');
		self.$tableheader = self.$table.find('.table-header');
		self.$colgroup = self.$table.find('colgroup');
		self.$tablespacertop = self.$root.find('.ie-spacer-top');
		self.$tablespacerbottom = self.$root.find('.ie-spacer-bottom');
		self.$overridewrapper = self.$wrapper.children('.fixed-override-wrapper');
		self.$focusfixture = self.$root.find('.fixed-focus-catch');
		//옵션적용(updateOption)
		self.updateOption(option);
		if (self.option.pager && $.isPlainObject(self.option.paging) && $.isFunction(self.option.paging.pageSet)) {
			setTimeout(function() {
				self.pageSet(1);
			}, 0);
		}
		self._initTooltip();
		//jQuery에서 선택 가능하도록 data 생성.
		$(elem).data(globalAlopexGrid.KEY_NAME, self).attr("data-alopexgrid", key);
		self.state.loaded = true;
		globalAlopexGrid.instances[key] = self;
		globalAlopexGrid.serialInstances[self.serial] = self;
		setTimeout(function(){dataChangeCallback(self, "changed", ["init"]);},0);
		return self;
	};
	$.extend(AlopexGrid, {
		KEY_NAME: _generateUniqueId(),
		//KEY_ROOT : ".positioner",
		serial : 0,
		instances: {},
		serialInstances : {},
		markup: {
			tag: "div",
			attr: {
				styleclass: "alopexgrid positioner"
			},
			child: [{
				tag: "div",
				attr: {
					styleclass: "title"
				},
				child: [{
					tag: "div",
					attr: {
						styleclass: "title-label"
					},
					child: null
				}, {
					tag: "div",
					attr: {
						styleclass: "table-toggle"
					},
					child: null
				}]
			}, {
				tag: "div",
				attr: {
					styleclass: "wrapper",
					style: "width:100%;"
				},
				child: [{
					tag: "div",
					attr: {
						styleclass: "scroller",
						style:"min-height:0%;position:relative;"//IE9 hover-addclass add height bug...
					},
					child: [{
						tag: "div",
						attr: {
							styleclass: "scrollpanel",
							style: "height:auto;min-height:0%;position:relative;"
						},
						child: [
							{ tag: "div", attr: { "data-type": "tooltip","data-position": "","data-tooltip-trigger":"alopexgrid-nontrigger"}
							},
							{ tag: "div", attr: { "styleclass" : "ie-spacer-top"}},
							{
								tag: "table",
								attr: {
									styleclass: "table"
								},
								child: [{
									tag: "colgroup"
								}, {
									tag: "thead",
									attr: {
										styleclass: "table-header"
									}
								}, {
									tag: "tbody",
									attr: {
										styleclass: "table-body"
									}
								}]
							},
							{ tag: "div", attr: { "styleclass" : "ie-spacer-bottom"}}
						]
					}]
				},{
					tag: "div",
					attr: {
						styleclass: "fixed-items",
						style:""
					},
					child : [
						{tag:"input",attr:{"type":"text","style":"position:absolute;left:-9999px;top:-9999px;","styleclass":"fixed-focus-catch"}}
					]
				},{
					tag : "div",
					attr : {
						styleclass:"fixed-override-wrapper fixed-body-div",
						style:"display:none;position:absolute;top:0px;left:0px;overflow:hidden;"
					},
					child : [
						{
							tag: "table",
							attr: {
								styleclass: "table"
							},
							child: [{
								tag: "colgroup"
							}, {
								tag: "thead",
								attr: {
									styleclass: "table-header"
								}
							}, {
								tag: "tbody",
								attr: {
									styleclass: "table-body"
								}
							}]
						}
					]
				}]
			},
				{
					tag: "div",
					attr: {
						styleclass: "footer",
						style: "position:relative;"
					},
					child: []
				},
				{
					tag: "div",
					attr: {
						styleclass: "pager",
						style: "position:relative;"
					},
					child: [{
						tag: "div",
						attr: {
							styleclass: "pagerleft",
							style: ""
						},
						child: ""
					}, {
						tag: "div",
						attr: {
							styleclass: "pagercenter"
						},
						child: [{
							tag: "div",
							attr: {
								styleclass: "pagination first-page"
							}
						}, {
							tag: "div",
							attr: {
								styleclass: "pagination prev-page"
							}
						}, {
							tag: "ul",
							attr: {
								styleclass: "pagination page-list"
							}
						}, {
							tag: "div",
							attr: {
								styleclass: "pagination next-page"
							}
						}, {
							tag: "div",
							attr: {
								styleclass: "pagination last-page"
							}
						}]
					}, {
						tag: "div",
						attr: {
							styleclass: "pagerright",
							style: ""
						},
						child: ""
					}]
				}]
		},
		markupTemplate: {
			colgroup: {
				tag: "colgroup"
			},
			col: {
				tag: "col"
			},
			row: {
				tag: "tr",
				attr: {
					styleclass: "row"
				}
			},
			cell: {
				tag: "td",
				attr: {
					styleclass: "cell"
				}
			},
			headerRow: {
				tag: "tr",
				attr: {
					styleclass: "row header"
				}
			},
			headerCell: {
				tag: "td",
				attr: {
					styleclass: "cell header"
				}
			}
		},
		defaultOption: {
			width: null,//600,
			height: null,
			header:true, //show header by default
			scroll: true, //우선은 scroll은 default로 header fix 를 내포하는것으로 코딩. TODO header fix와 scroll 분리
			title: false,
			pager: false,
			data: [], //array
			dataLengthLimit : null,
			paging: {
				left: false,
				right: false
			}, //object
			columnMapping: [], //array
			rowOption : {}, //object
			footer : {
				position : null,
				footerMapping : []
			},
			on: {
				cell : {},
				row : {},
				headercell : {},
				headerrow : {},
				invalidEdit : null,
				scrollBottom : null,
				sortToggle : null,
				sortClear : null,
				pageSet : null,
				perPageChange : null,
				data:{
					"add"      : null,
					"set"      : null,
					"edit"     : null,
					"empty"    : null,
					"delete"   : null,
					"undelete" : null,
					"select"   : null,
					"selected" : null,
					"changed"  : null
				}
			},
			autoResize: true,
			autoResizeDelay : 200,
			minColumnWidth: 10,
			floatingHeader:true,
			message: {
				"nodata" : null,
				"dataLengthLimit" : null,
				"valueFilter" : null,
				"pagerTotal" : null
			},
			rowClickSelect: false,
			rowSingleSelect: false,
			rowInlineEdit : false,
			rowspanGroupSelect: true,
			rowspanGroupEdit: true,
			useClassHovering: true,
			progressDelay: null,
			scrollBottomDelay: 50,
			virtualScroll: false,
			virtualScrollPadding:20,
			virtualScrollDelay:50,
			horizontalVirtualScrollBufferWidth:400,
			defaultState:{
				dataAdd:{},
				dataSet:{}
			}
			,defaultUIComponent : {
				"check" : {},
				"select" : {},
				"radio" : {},
				"text" : {},
				"textarea" : {}
			}
			,eventMapping : {}
			,renderMapping : {}
			,rowHeightCompensate:0
			,valueFilter:null//filter value of grid data on endEdit
			,endInlineEditByOuterClick:false//end rowInlineEdit by clicking outside the grid.
			
			,hideSortingHandle : false//hide header sorting arrow
			,disableHeaderClickSorting : false

			,useValidateTooltip : null//force to show/hide mapping.validateTooltip when boolean value is assigned
			,getEditingDataOnEvent : true//get intermediate data if data._state.editing is true.
			,allowTabToCellMove:false//enable tab key to move between cell when enableTabFocus option is set.
			,enableTabFocus : false//enable keyboard focus functionality(show bright border by browser when clicked or tab key pressed)
			,enableKeyboardEdit : false//enable focused cells to react enterkey/copy/paste action.
			,fitTableWidth : true//fit table width upto grid width
			,directEdit : false //edit cell with contenteditable, without <input> tag.
			,ellipsisText : false//show ... on overflowed text
			,autoSortingType : false//auto-detect sorting type when columnMapping.sorting:true
			,highlightLastAction : false//add class to last clicked row and cell.
			,lastActionRowClass : 'row-last-action'
			,lastActionCellClass : 'cell-last-action'
			,clientSortingOnDynamicDataSet : false//sort data even when dynamic binding is uses
			,disableFocusedState:false//disable data._state.focus state
			,useTabindexOnEditable : false//use tabindex on input/select/textarea tags when data is in editing state.
			,tabindexBase : 2 //tabindex starts from 2
			,editableNameWithKey : false//use mapping.key value as <input name=""> name attribute
			,parseNullValueCell : false//extract cell value on data init if value is null and it is editable. 
										//using default value for column is encouraged.
			,limitSelectorColumnClickArea : false //set true to allow row select iff checkbox in selector column has clicked.
			,mergeEditingImmediately:false //merge editing data and set edited flag right after editing value has changed
			,fullCompareForEditedState:false
			,renderInternallyMerged : false //merge data and data._state.recent for _rowRender and _cellRender API

			,fixcolumnTopCompensate : 0 //if css hierarchy is severly screwed, use this property to compensate fix column top position.

			,grouping : {
				by : [],//['key1','key2','key3',...]
				useSummary:true,
				useGroupRowspan:false,
				useGrouping:false,
				summaryRender:{
					'sum' : function(value){ return '합계 : '+value; },
					'count' : function(value){ return '건수 : '+value; },
					'groupName' : function(value){ return value; },
					'average' : function(value){ return '평균 :'+value; }
				}
			}
			,filteringHeader : false
			,filterTypeNameMap : {
				'equal' : '일치'
				,'notequal' : '불일치'
				,'contain' : '포함'
				,'notcontain' : '포함하지 않음'
				,'lt' : '보다 작은'
				,'lte' : '보다 작거나 같은'
				,'gt' : '보다 큰'
				,'gte' : '보다 크거나 같은'
			}
			,filterSubmitName : '>>'

			,hidePinnedData : false //hinder pinned data from rendering

			,enableCellSelect : false //focus,selection에 관여 
			,cellInlineEdit : false //keydown, mouse click에 의한 셀단위 편집시작/종료에 관여

			//TODO defaultOption 위치가 맞는가?
			,contextMenu : [
				{
					title : function(data, $cell, grid) {
						return [
							'틀고정(행',
							$cell.attr('data-alopexgrid-renderedindex'),
							',열',
							$cell.attr('data-alopexgrid-columnindex'),
							')'].join('');
					},
					processor : function(data, $cell, grid) {
						var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
						$.each(grid.option.columnMapping, function(i, mapping) {
							mapping.fixed = mapping.columnIndex <= columnIndex;
						});
						$(this).alopexGrid('rowPin', data._index.rendered, true);
					},
					use : function(data, $cell) {
						return !$cell.hasClass('pinnedcell') && $cell.hasClass('bodycell') && !$cell.hasClass('summarycell');
					}
				},
				{
					title : function(data,$cell,grid){ 
						return ['틀고정(행',$cell.attr('data-alopexgrid-renderedindex'),')'].join('');
					}, 
					processor : function(d,$cell){
						$(this).alopexGrid('rowPin', d._index.rendered, true);
					}, 
					use : function(data, $cell){
						return !$cell.hasClass('pinnedcell') && $cell.hasClass('bodycell') && !$cell.hasClass('summarycell');
					}
				},
				{
					title : function(data,$cell,grid){ 
						return ['틀고정(열',$cell.attr('data-alopexgrid-columnindex'),')'].join('');
					}, 
					processor : function(d,$cell, grid) {
						var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
						$.each(grid.option.columnMapping, function(i, mapping) {
							mapping.fixed = mapping.columnIndex <= columnIndex;
						});
						grid.updateOption();
					},
					use : function(data, $cell, grid) {
						return $cell.hasClass('bodycell') && !$cell.hasClass('cell-fixcol') && $cell.attr('data-alopexgrid-columnindex');
					}
				},
				{
					title : '틀고정 해제',
					processor : function(data, $cell, grid) {
						$.each(grid.option.columnMapping, function(i, mapping) {
							mapping.fixed = false;
						});
						$(this).alopexGrid('dataUnpin');
					},
					use : function(data, $cell, grid) {
						return $cell.hasClass('pinnedcell');
					}
				},
				{
					title : '틀고정(행) 해제', 
					processor : function(d,$cell, grid){
						$(this).alopexGrid('dataUnpin');
					},
					use : function(data, $cell,grid) {
						return $cell.hasClass('pinnedcell') && $cell.hasClass('bodycell');
					}
				},
				{
					title : '틀고정(열) 해제',
					processor : function(d,$cell,grid) {
						$.each(grid.option.columnMapping, function(i, mapping) {
							mapping.fixed = false;
						});
						grid.updateOption();
					},
					use : function(data, $cell, grid) {
						return $cell.hasClass('bodycell') && $cell.hasClass('cell-fixcol') && $cell.attr('data-alopexgrid-columnindex');
					}
				},
				{
					title : '확대보기',
					processor : function(data,$cell,grid) {
						
					}
				}
			]
			,contextMenuTitleMapper : null

			//backward compatibility options
			,wrapCellOnAlign : true//create div.cell-wrapper only when mapping.align is specified
			,disableAlopexConvert:false
			,allowSelectorColumnTitle:true//older versions didnt use mapping.title of selectorColumn

			,extendStateOnSet : true//allow user data._state to be merged into grid data
			,extendStateOnAdd : true
			,fillUndefinedKey : false//if columnMapping has keys but data doesn't, fill the empty value with this value. false to disable.
			,forceEditedOnEdit : false//force edited state on dataEdit. false to only when there is any differences.
			,trimUnmappedKey : false//remove key from data if key is not mapped to column.
			,readonlyRender : true//default renderer in columnMapping.render will be default to readonly. set false to keep backward compatibility.
			,disableCellTitle : false //do not add [title] attribute to td.cell.
			,showVerticalScrollBar : true //always show scroller vertical scrollbar if height value is specified
			,headerGroupWiderFirst : false // always show widest headerGroup at topmose
			,disableValueEscape : false//disable value string escaping when no mapping.render option is specified
			,defaultSortingOnDataSet : true//older versions uses defaultSorting property only at init time. set false to work as older way.
			,currentPageInCenter : false//older versions shows current page number at the center of pager. set true to work as older way.
			,validateOnchangeForAnyEvent : false//columnMapping.validate.onchange worked on any of change/click/keyup event of editable element. 
				//to use it again like that, set this to true.
			,innerAlignForEditableText:true//render.align option affect default editable type text renderer's inner text(text-align css)
			,enableHeaderGroupResizing:true//to disable header group resizing, set this value to false
			,overrideBrowserScroll : false//to follow browser default scroll action, set this value to false.
			,evaluateAllowEditWithMergedData : true//old cases has some instance that mapping.allowEdit was run with 
				//non-editing-merged data. to work in old way, set this to false.
			,setOriginalFromStart : false//to generate data._original on dataSet/dataAdd, set this to true.
			,calculateFixedColumnWidthOldWay : false
			,useNativeSorting:true //

		},
		getter: {},
		trimObject : function(dataObject) {
			var trimmed = $.extend({}, dataObject);
			delete trimmed._state;
			delete trimmed._index;
			delete trimmed._edited;
			delete trimmed._invalid;
			delete trimmed._key;
			delete trimmed._original;
			return trimmed;
		},
		trimData: function(data) {
			if($.isArray(data)) {
				var trimmedlist = [];
				for(var i=0,l=data.length;i<l;i++) {
					if($.isPlainObject(data[i])) {
						trimmedlist.push(AlopexGrid.trimObject(data[i]));
					}
				}
				return trimmedlist;
			}
			return AlopexGrid.trimObject(data);
		},
		escapeHTML : function(str) {
			return _escapeHTML(str);
		},
		_renderNumberOnlyHandler: function(evt) {
			var e = evt || window.event;
			var key = e.keyCode || e.which;
			key = String.fromCharCode(key);
			var regex = /[0-9]|\./;
			if (!regex.test(key)) {
				e.returnValue = false;
				if (e.preventDefault)
					e.preventDefault();
				return false;
			}
		},
		_renderReplaceHandler: function(context, evt, formatter) {
			var self = context;
			var val = self.value;
			evt = evt || window.event;
			// Ensure we only handle printable keys, excluding enter and space
			var charCode = typeof evt.which == "number" ? evt.which : evt.keyCode;
			if (charCode && charCode > 32) {
				var keyChar = String.fromCharCode(charCode);

				var start, end;
				if (typeof self.selectionStart == "number" && typeof self.selectionEnd == "number") {
					// Non-IE browsers and IE 9
					start = self.selectionStart;
					end = self.selectionEnd;
					val = val.slice(0, start) + keyChar + val.slice(end);
					self.value = AlopexGrid["_" + formatter + "Formatter"](val);

					// Move the caret
					self.selectionStart = self.selectionEnd = start + 1 + (val.length !== self.value.length ? (self.value.length - val.length) : 0);
				} else if (document.selection && document.selection.createRange) {
					// For IE up to version 8
					var selectionRange = document.selection.createRange();
					var textInputRange = self.createTextRange();
					var precedingRange = self.createTextRange();
					var bookmark = selectionRange.getBookmark();
					textInputRange.moveToBookmark(bookmark);
					precedingRange.setEndPoint("EndToStart", textInputRange);
					start = precedingRange.text.length;
					end = start + selectionRange.text.length;

					val = val.slice(0, start) + keyChar + val.slice(end);
					self.value = AlopexGrid["_" + formatter + "Formatter"](val);
					start++;
					start += (val.length !== self.value.length ? (self.value.length - val.length) : 0);

					// Move the caret
					textInputRange = self.createTextRange();
					textInputRange.collapse(true);
					textInputRange.move("character", start - (self.value.slice(0, start).split("\r\n").length - 1));
					textInputRange.select();
				}

				return false;
			}
		},
		"_commaFormatter": function(str) {
			str = str.replace(/,/g, '');
			while (/(\d+)(\d{3})/.test(str.toString())) {
				str = str.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
			}
			return str;
		},
		"_dateFormatter": function(str) {
			return str;
		},
		"_monthFormatter": function(str) {
			return str;
		},
		dragObject: null,
		clipboard : {},
		generateKey: _generateUniqueId
	});
	window["AlopexGrid"] = AlopexGrid;

	// AlopexGrid.run("alopexgrid28175988", "dataAdd", {});
	AlopexGrid.run = function(id, api) {
		var instance = AlopexGrid.instances[id];
		if (!instance) {
			return;
		}
		var args = Array.prototype.slice.call(arguments, 2);
		return instance[api].apply(instance, args);
	};
	AlopexGrid.prototype._simpleRedraw = function(datadraw, viewupdate) {
		var self = this;
		if(self.state.renderingSuppressed) {
			return;
		}
		self.pageInfo();
		self._dataDraw(datadraw);
		self.viewUpdate(viewupdate);
	};
	AlopexGrid.prototype.readOption = function(){
		return $.extend(true, {}, this.option);
	};
	var _dataEventList = ["add","edit","set","delete","undelete","select"];
	function _getMergedDataEvent(orgoption,option) {
		//original event의 orgoption.on.data["add","edit"... 등에 새로운 옵션의 녀석들을 순차적으로 merge하고 리턴.
		if(!option) {
			return orgoption && orgoption.on && $.isPlainObject(orgoption.on.data) ?
				$.extend(true, {}, orgoption.on.data) : {};
		}
		var eobj = {};
		for(var prop in _dataEventList) {

		}
		return eobj;
	}
	AlopexGrid.prototype.updateOption = function(data) {
		var self = this;
		//var mergedDataEvent = _getMergedDataEvent(self.option, data);
		var option = self.option = $.extend(true, {}, self.option, data ? data : {});
		var $wrapper = self.$wrapper;
		var $pager = self.$pager;
		var $title = self.$title;
		var $r = self.$root;

		if(_valid(option.height)) {
			//if option value is set by common settings but not pixel
			if(typeof option.height === "string" && option.height.indexOf('px') >= 0
				&& $.isNumeric(option.height.split('px')[0])) {
				option.height = Number(option.height.split('px')[0])
			}
			if(typeof option.height === "string" && option.height.toLowerCase().indexOf('row') >= 0) {
				self.state.userHeight = option.height;
				delete self.state.userHeightRowCount;
			}
		}
		if(!option.header) {
			delete self.state.scrollerScrollHeight;
			delete self.state.scrollerClientHeight;
			delete self.state.wrapperInnerHeight;
			delete self.state.tableheaderHeight;
			delete self.state.scrollerTopMargin;
			delete self.state.scrollerCss;
		}
		if($.isPlainObject(data) && data.hasOwnProperty("height")){
			delete self.state.scrollerScrollHeight;
			delete self.state.scrollerClientHeight;
			delete self.state.wrapperInnerHeight;
			delete self.state.tableheaderHeight;
			delete self.state.scrollerTopMargin;
			//delete self.state.scrollerMarginTop;
			delete self.state.scrollerCss;
			if(!$.isNumeric(data.height)) {
				self.state.userHeight = data.height;
			} else {
				option.height = Number(data.height);
				delete self.state.userHeight;
			}
			if(typeof data.height === "string") {
				if(data.height.indexOf('px') >= 0) {
					option.height = Number(data.height.split('px')[0]);
				} else if(!isNaN(Number(data.height))) {
					option.height = Number(data.height);
				} else if(data.height.toLowerCase().indexOf('row') >= 0) {
					delete self.state.userHeightRowCount;
				}
			} else {
				delete self.state.userHeightRowCount;
			}
		}
		if($.isPlainObject(data) && (data.rowPadding || data.rowpadding)){
			self.option.rowPadding = data.rowPadding || data.rowpadding;
		}

		var headerProps = ['columnMapping', 'headerGroup'];//merge가 아닌, overwrite해야 하는 대상.
		$.each(headerProps, function(idx, prop) {
			if (data && data.hasOwnProperty(prop)) {
				option[prop] = $.extend(true, [], data[prop]);
				delete self.state.tableheaderHeight;//헤더속성을 건드린 후에는 높이를 저장하는 cache성 값들을 제거한다.
				delete self.state.scrollerTopMargin;
				delete self.state.scrollerClientHeight;
			}
		});
		if(data && data.hasOwnProperty('footer')) {
			option.footer = $.extend({}, option.footer, data.footer);
		}
		if (self.option.columnMapping) {
			self.state.mappedKey = [];
			self.state.columnIndexToKeyMap = {};
			self.state.columnKeyToIndexMap = {};
			self.state.columnIndexToMapping = {};
			$.each(self.option.columnMapping, function(idx, mapping) {
				if(mapping.hasOwnProperty('key')) { 
					self.state.mappedKey.push(mapping.key);
					self.state.columnKeyToIndexMap[mapping.key] = parseInt(mapping.columnIndex);
				}
				if(mapping.hasOwnProperty('columnIndex')) {
					self.state.columnIndexToKeyMap[mapping.columnIndex] = String(mapping.key);
					self.state.columnIndexToMapping[mapping.columnIndex] = mapping;
				}
			});

			self.option.columnMapping.sort(function(former, latter) {
				var fi = _valid(former.columnIndex) ? Number(former.columnIndex) : Infinity;
				var li = _valid(latter.columnIndex) ? Number(latter.columnIndex) : Infinity;
				if (fi > li)
					return 1;
				if (fi < li)
					return -1;
				return 0;
			});

			var fixupto = -1;
			$.each(self.option.columnMapping, function(idx, mapping) {
				if (mapping.columnIndex === null || mapping.columnIndex === undefined || mapping.hidden === true) {
					return;
				}
				if (mapping.fixed) {
					fixupto = mapping.columnIndex;
				} else {
					return false;
				}
			});
			self.state.fixupto = fixupto;

			var maxColumnIndex = -1;
			self.state.hasNumberingColumn = false;
			self.state.hasSelectorColumn = false;
			self.state.hasAllowEdit = false;
			self.state.dataCompositorMap = [];
			self.state.dataKeyList = [];
			$.each(self.option.columnMapping, function(idx, mapping) {
				if (mapping.hasOwnProperty('columnIndex')) {
					var i = Number(mapping.columnIndex);//no original column index for this value;
					if (i > maxColumnIndex) {
						maxColumnIndex = i;
					}
				}
				if(mapping.hasOwnProperty('key')) {
					self.state.dataKeyList.push(mapping.key);
					if(mapping.hasOwnProperty('value') && _valid(mapping.key) && _valid(mapping.value)) {
						self.state.dataCompositorMap.push(mapping);
					}
				}
				
				if (mapping.numberingColumn) {
					self.state.hasNumberingColumn = true;
				}
				if (mapping.selectorColumn) {
					self.state.hasSelectorColumn = true;
				}
				if (mapping.allowEdit) {
					self.state.hasAllowEdit = true;
				}
				if($.isPlainObject(self.option.defaultColumnMapping)) {
					$.each(self.option.defaultColumnMapping, function(k,v){
						if(!mapping.hasOwnProperty(k)) {
							mapping[k] = v;
						}
					});
				}
			});
			self.state.emptyData = {
				"_index" : {}, "_state" : {}
			};
			for(var j in self.state.dataKeyList) {
				var k = self.state.dataKeyList[j];
				self.state.emptyData[k] = "";
			}
			self.state.dataCompositor = self.state.dataCompositorMap.length ? function(data){
				for(var j in self.state.dataCompositorMap) {
					var mapping = self.state.dataCompositorMap[j];
					data[mapping.key] = $.isFunction(mapping.value) ? mapping.value(data[mapping.key], data, mapping) : mapping.value;
					if(data._state && data._state.editing && data._state.recent && data._state.recent.hasOwnProperty(mapping.key)) {
						data._state.recent[mapping.key] = data[mapping.key];
					}
				}
				return data;
			} : null;
			//defaultValue가 존재할 경우 && fillUndefinedKey가 있을 경우
			var needFiller = (self.option.fillUndefinedKey !== false) ||
				!!$.map(self.option.columnMapping, function(m){return m.defaultValue;}).length;
			//option check.
			var needTrimmer = self.option.trimUnmappedKey;
			self.state.dataFilltrimmer = (needTrimmer || needFiller) ? function(data) {
				if(needFiller) {
					for(var j in self.option.columnMapping) {
						var mapping = self.option.columnMapping[j];
						if(_valid(mapping.key) && !data.hasOwnProperty(mapping.key) &&
							(self.option.fillUndefinedKey !== false || mapping.defaultValue !== undefined)) {
							data[mapping.key] =
								($.isFunction(mapping.defaultValue) ? mapping.defaultValue(data) : mapping.defaultValue)
								|| (self.option.fillUndefinedKey === true ? "" : self.option.fillUndefinedKey);
						}
					}	
				}
				if(needTrimmer) {
					//self.state.mappedKey = [columnmapping에 처리된 key들의 목록]
					for(var prop in data) {
						if(!data.hasOwnProperty(prop) || prop == "_state" || prop == "_index"
							|| prop == "_key" || prop == "_edited") continue;
						if($.inArray(prop, self.state.mappedKey) < 0) {
							delete data[prop];
						}
					}
				}
			} : null;
			self.state.maxColumnIndex = maxColumnIndex;
		}

		if(self._shouldScrollBeOverridden()) {
			self.$scrollpanel.children('table').empty();
			self.$overridewrapper.show();
		} else {
			self.$overridewrapper.hide().children('table').empty();
		}

		if ($.isArray(this.option.data)) {
			this.dataSet(this.option.data, true);
			this.option.data = null;
		}
		
		self.state.testRowAllowSelect = !!(self.option.rowOption && $.isFunction(self.option.rowOption.allowSelect))

		if(self.state.renderingSuppressed) {
			return;
		}
		var scrolloffset = self._scrollOffset();
		self.pageInfo();
		self._dataDraw();
		self.viewUpdate(scrolloffset);
		self.viewEventUpdate();
		self.$scroller.trigger('scroll');
		self.state.columnWidthMap = self._calcCellWidth();

		self.state.tableheaderHeight = (self.$fixedheader || self.$tableheader).height();
	};
	//columnIndex may be real index or column key
	AlopexGrid.prototype.updateColumnMapping = function(columnIK, userMapping, dorecursive){
		if(!_valid(columnIK) || !_valid(userMapping)) return;
		if(!$.isPlainObject(userMapping) || $.isEmptyObject(userMapping)) return;
		var self = this;
		var option = self.option;
		if($.isArray(columnIK)) {
			$.each(columnIK, function(idx, columnIKV){
				self.updateColumnMapping(columnIKV, userMapping, true);
			});
			self.updateOption();
			return;
		}
		var columnMapping = option.columnMapping;
		$.each(columnMapping, function(idx, mapping) {
			if(Number(mapping.columnIndex)===Number(columnIK)
				|| (typeof mapping.key === "string" && mapping.key === columnIK) ) {
				$.each(userMapping, function(key, value) {
					if(value === null) {
						delete mapping[key];
					} else {
						mapping[key] = value;
					}
				});
			}
		});
		if(dorecursive) return;
		self.updateOption();
	};

	function _readMappingProp(mapping, prop) {
		return $.isFunction(mapping[prop]) ? mapping[prop](mapping) : mapping[prop];
	}
	AlopexGrid.prototype._processSortingMulti = function(sortingMulti){
		var self = this;
		if(!$.isArray(sortingMulti)) return;
		self.state.sortingMulti = [];
		$.each(sortingMulti, function(i,sortingMultiItem){
			if(!$.isPlainObject(sortingMultiItem)) { return; }
			if(sortingMultiItem.hasOwnProperty('sortingColumn') || sortingMultiItem.hasOwnProperty('sortingKey')) {
				self.state.sortingMulti.push($.extend({},sortingMultiItem));
			}
		});
	};
	AlopexGrid.prototype._processDefaultSorting = function() {
		var self = this;
		delete self.state.sortingColumn;
		delete self.state.sortingDirection;
		delete self.state.sortingMulti;
		for ( var i in self.option.columnMapping) {
			var mapping = self.option.columnMapping[i];
			var sorting = mapping.sorting;
			//if (mapping.sorting) {
			if(sorting) {
				//if (!self.state.loaded && (sorting == "desc" || sorting == "asc")) {
				if (sorting == "desc" || sorting == "asc") {
					self.state.sortingColumn = self.columnIndex;
					self.state.sortingDirection = sorting;
					//} else if (!self.state.loaded && self.option.defaultSorting) {
				} else if (self.option.defaultSorting) {
					var ci = Number(_valid(self.option.defaultSorting.columnIndex) ? self.option.defaultSorting.columnIndex
							: self.option.defaultSorting.sortingColumn);
					if (Number(mapping.columnIndex) === ci) {
						self.state.sortingColumn = mapping.columnIndex;
						self.state.sortingDirection = self.option.defaultSorting.sorting 
							|| self.option.defaultSorting.sortingDirection;
					}
				}
			}
		}
		if($.isPlainObject(self.option.defaultSorting) 
			&& $.isArray(self.option.defaultSorting.sortingMulti)) {
			self._processSortingMulti(self.option.defaultSorting.sortingMulti);
		}
	};
	AlopexGrid.prototype._shouldScrollBeOverridden = function(){
		return (this.option.overrideBrowserScroll && !!this.option.height);
	}
	AlopexGrid.prototype._locateMainTable = function(){
		var self = this;
		if(self._shouldScrollBeOverridden()) {
			return self.$overridewrapper.children('table');
		}
		return self.$scrollpanel.children('table');
	};
	AlopexGrid.prototype._renderedBodyHeight = function(){
		var self = this;
		var tableHeight = parseInt(self.$table.css('height')) || 0;
		var headerHeight = parseInt(self.$tableheader.css('height')) || 0;
		var bodyHeight = parseInt(self.$tablebody.css('height')) || 0;
		return bodyHeight + _max(tableHeight - headerHeight - bodyHeight,0);
	}
	AlopexGrid.prototype.viewInit = function(data) {
		var self = this;
		if(!self.option.defaultSortingOnDataSet) {
			self._processDefaultSorting();
		}
		_generateHTML(AlopexGrid.markup, self.root);
	};

	AlopexGrid.prototype.viewUpdate = function(viewoption) {
		var self = this;
		self.state.viewUpdating = true;
		var $r = self.$root;
		var option = self.option;
		var $title = self.$title;
		var $pager = self.$pager;
		var $wrapper = self.$wrapper;
		var $scroller = self.$scroller;
		var $table = self.$table;
		var $fixedheader = self.$fixedheader;
		var $scrollpanel = self.$scrollpanel;
		var tableheaderHeight = 0;

		if(self.state.renderingSuppressed) {
			return;
		}

		self.$wrapper.find('.cloned').remove();

		if (viewoption && viewoption.updateColgroup) {
			this._updateColgroup();
		}

		if(option.floatingHeader) {
			var fht = $('<table class="table cloned">');//$table.clone();
			fht.attr('style', $table.attr('style'));
			fht.css({"margin-top":"","margin-bottom":""});//vscroll
			fht.append($table.find('colgroup').clone());

			fht.append($('<thead class="table-header"></thead>').append(_convertAlopex.call(self, this._headerRender())));
			fht.children('.table-header').css({
				"display": ""
			}).removeClass("fixed");
			var fhtcss = {
				"position": "absolute",
				"top": (isChrome && option.compensate1px) ? "-1px" : "0px"
			};
			var leftval = (viewoption && viewoption.scrollLeft ? (-viewoption.scrollLeft) :
					(self.state.hasHorizontalScrollBar ? -$scroller.prop('scrollLeft') : 0) ) + "px";
			if(isIE<9) {
				fhtcss["left"] = leftval;
			} else {
				fhtcss["left"] = '0px';
				fhtcss["transform"] = 'translateX('+leftval+')';
			}
			fht.css(fhtcss);
			fht.show().children('.table-header').show();
			self.$fixedheader = fht;
			self.$wrapper.children('.fixed-items').append(self.$fixedheader);

			$fixedheader = self.$fixedheader;

			self.state.tableheaderHeight = tableheaderHeight = $fixedheader.height();
			var $cells = $fixedheader.find('.cell');
			var _h = $cells.outerHeight() || undefined;
			if(_h) {
				//self.state.footerHeight = Math.round(_h / Number($cells.attr("rowspan") || 1));
			}
		} else {
			self.$fixedheader = null;
			$fixedheader = null;
			tableheaderHeight = self.state.tableheaderHeight
				= self.state.tableheaderHeight ? self.state.tableheaderHeight : self.$tableheader.height();
		}

		self.state.hasHorizontalScrollBar = false;
		self.state.hasVerticalScrollBar = false;

		if(option.floatingHeader===false && isIE/* && ieVER<10*/) {
			tableheaderHeight -= 1;
		}

		if(_valid(option.height) && typeof option.height === "string" && option.height.indexOf('row') >= 0)
			self.state.userHeight = option.height;
		///=======================================================
		if(String(self.state.userHeight).toLowerCase().indexOf('row')>=0) {
			var rowcount = null;
			var heightValue = self.state.userHeight;
			if(heightValue.toLowerCase() === "rowpadding") {
				//option.rowpadding = true : follow paging.perPage
				//option.rowpadding 10 : rowcount is 10 
				if(option.rowPadding === true) {
					rowcount = option.paging.perPage;
				} else if(typeof option.rowPadding === "number") {
					rowcount = option.rowPadding;
				}
			} else if(!isNaN(Number(heightValue.split("row")[0]))) {
				rowcount = Number(heightValue.split("row")[0]);
			}
			if(rowcount && tableheaderHeight > 0 && self.$root.is(':visible')) {
				self.state.userHeightRowCount = rowcount;
				self._calcRowHeight();
				var hmap = [];
				hmap.push(self.option.title?self.$title.outerHeight():0);
				hmap.push(tableheaderHeight);
				hmap.push(self.$root.outerHeight()-self.$root.height());
				hmap.push(self.$wrapper.outerHeight()-self.$wrapper.height());
				hmap.push((self.state.rowHeight)*rowcount);
				hmap.push(self.state.rowHeightBorderWidth || 1);
				hmap.push(self.$scroller.height()-self.$scroller.prop('clientHeight'));
				hmap.push(self._hasFooter()?self.$footer.outerHeight():0);
				hmap.push(option.pager?self.$pager.outerHeight():0);
				//hmap.push(1);
				var prev = option.height;
				option.height = 0;
				for(var hm=0;hm<hmap.length;hm++) {
					if(isNaN(Number(hmap[hm]))) {
						option.height = prev;
						break;
					}
					option.height += hmap[hm];
				}
			}
		}

		$.each(["width", "height", "min-height", "max-height"], function(idx, elem) {
			if (option && typeof option[elem] === "number") {
				self.$root.css(elem, option[elem]+"px");
			}
			if(!_valid(self.option[elem])) {
				self.$root.css(elem, "");
				if(elem === "height") {
					self.$scroller.css("height","");
				}
			}
		});

		$title[option.title ? "show" : "hide"]();
		if($.isPlainObject(option) && option.hasOwnProperty('title')) {
			//현재 옵션에 따라 사이즈/스크롤 옵션 등을 조절한다.
			$title.find('.title-label').text(typeof option.title === "string" ? option.title : "");
			$title.data('alopex-grid-visible', option.title ? true : false);
			$title.find('.table-toggle').off(".alopexgridtitletoggle").on("click.alopexgridtitletoggle", function(e) {
				if ($r.hasClass("fold")) {
					$r.removeClass("fold");
					$r.animate({
						"height": (option.height ? option.height : $title.height() + $wrapper.height() + $pager.outerHeight()) + "px"
					}, function() {
						if (!option.height) {
							$(this).css({
								"height": ""
							});
						}
						self.viewUpdate();
					});
				} else {
					self._autoResizeSet(false);
					$r.addClass("fold");
					$r.animate({
						"height": $title.height() + "px"
					});
				}
			});
		}
		$pager[option.pager ? "show" : "hide"]();
		if($.isPlainObject(option) && option.hasOwnProperty('pager')) {
			//view의 pager 보임 설정
			$pager.data('alopex-grid-visible', option.pager ? true : false);
		}

		//grid root element의 사이즈 조정
		self._wrapperHeightRefresh();

		if(!self.option.virtualScroll) {
			self._tableSpacing(0,null,0);
		}

		if ($wrapper[0].style.height && !option.height) {
			var tableHeight = (option.height || option["max-height"] ? $r.innerHeight() : 0) - ($title.data('alopex-grid-visible') ? $title.height() : 0) -
				($pager.data('alopex-grid-visible') ? $pager.outerHeight() : 0);
			$wrapper.css('height', "");
			delete this.state.wrapperInnerHeight;
		} else if (option.height && $wrapper[0].style.height !== (tableHeight + "px")) {
			this._wrapperHeightRefresh();
		}

		////=======================================================

		var hasFooter = self._hasFooter("bottom");
		// if(self.state.footerHeight === undefined) {
		// 	var $cells = self.$wrapper.find('.cell');
		// 	self.state.footerHeight = $cells.outerHeight() / Number($cells.attr("rowspan") || 1);
		// }
		//var footerHeight = hasFooter ? self.state.footerHeight:0;
		var footerHeight = hasFooter ? self.$footer.children().height():0;
		self.state.footerHeight = footerHeight;
		var scrollerTopMargin = (option.scroll ? (tableheaderHeight || self.state.scrollerTopMargin) : 0)||0;//option.scroll?tableheaderHeight:0;//(this.state.scrollerTopMargin || tableheaderHeight):0;//$tableheader.height():0;
		this.state.scrollerTopMargin = scrollerTopMargin;
		if(self._shouldScrollBeOverridden() && !self._vscrollInfo()) {
			//var panelHeight = parseInt(self.$table.css('height')) - (self.state.scrollerTopMargin || 0);
			var panelHeight = self._renderedBodyHeight();
			self.$scrollpanel.css('height', panelHeight+'px');
		} else {
			self.$scrollpanel.css('height','auto');
		}
		var scrollercss = {
			"overflow": "auto",
			"overflow-y" : (self.option.showVerticalScrollBar && option.height) ? "scroll" : "",
			//"-webkit-overflow-scrolling" : "touch",
			"width": "100%"
		};
		if (option.height) {
			var wih = $wrapper.innerHeight();
			scrollercss["height"] = (wih - (self.option.floatingHeader===false?0:scrollerTopMargin)) + "px";
		}
		if(option["max-height"]) {
			scrollercss["max-height"] = ( Number(option["max-height"]) - self.$title.outerHeight()
				- self.$pager.outerHeight() - (self.option.floatingHeader===false?0:scrollerTopMargin) ) + "px";
		}
		if (option.floatingHeader !== false
			&& $scroller.css("margin-top") !== (scrollerTopMargin + "px")) {
			this.state.scrollerMarginTop = scrollerTopMargin || 0;
			//20131223 Hynix Issue - (-1)을 적용..? 다시 빼봄.
			scrollercss["margin-top"] = (this.state.scrollerMarginTop) + "px";
		}
		if (this.state.scrollerCss) {
			var same = true;
			for ( var prop in scrollercss) {
				if (this.state.scrollerCss[prop] !== scrollercss[prop]) {
					same = false;
				}
			}
			if (!same) {
				$scroller.css(scrollercss);
			}
		} else {
			$scroller.css(scrollercss);
		}
		this.state.scrollerCss = scrollercss;
		var scrollerClientHeight = this.state.scrollerClientHeight = $scroller.prop('clientHeight');
		var scrollerScrollHeight = this.state.scrollerScrollHeight = $scroller.prop('scrollHeight');
		if (scrollerClientHeight < scrollerScrollHeight) {
			self.state.hasVerticalScrollBar = true;
		}
		//스크롤 활성화를 위한 내부 영역 크기 조정
		var tableWidth = self.state.tableWidth;
		var clientWidth = self.state.scrollerClientWidth = $scroller.prop('clientWidth');
		//var scrollWidth = self.state.scrollerScrollWidth = $scroller.prop('scrollWidth');

		if(self._shouldScrollBeOverridden()) {
			var scrollerBorder = (parseInt($scroller.css('borderTopWidth')) || 0)
				+ (parseInt($scroller.css('borderBottomWidth')) || 0)
			self.$overridewrapper
				.css({
					width:clientWidth+'px',
					height:(scrollerClientHeight+scrollerBorder)+'px',
					top:scrollerTopMargin+'px'
				})
				.show()
				.children('table')
					.css({
						position:'absolute'
					});
		} else {
			self.$overridewrapper.hide();
		}
		if (tableWidth > clientWidth) {
			self.state.hasHorizontalScrollBar = true;
			$table.css('width', tableWidth + 'px');
			$scrollpanel.css({
				width: tableWidth + 'px',
				overflow: 'visible'
			});
			$scroller.css('overflow-x','scroll');
		} else {
			self.state.hasHorizontalScrollBar = false;
			var targetWidth = clientWidth;
			if(!self.option.fitTableWidth) {
				targetWidth = tableWidth;
			}
			if(targetWidth > 0) {
				$table.css('width', targetWidth + 'px');
				$scrollpanel.css({
					width: targetWidth + 'px',
					overflow: ''
				});
			}
			$scroller.css('overflow-x','hidden');
		}
		if(document['documentMode']) {
			//margin-bottom등이 스크롤 높이에 반영되지 않고 스크롤바가 생기다 마는 증상.
			//$scrollpanel.css({"overflow-y":"auto","overflow-x":"hidden"});
		}
		//기본 크기 잡은 후 table-layout속성 토글해줘야 헤더가 사라지지않고 보임.(웹킷?). 가로 너비 자동 조정과도 연계됨.?
		//if(isChrome || isSafari) {
		$table.css({
			"table-layout": "auto"
		}).css({
			"table-layout": "fixed"
		});
		//}
		//width가 없는 경우 그리드는 최초에 생성된 너비/높이로 고정이 되어버려서, 윈도우 사이즈 변경에 따른 refresh가 필요하다.
		self._autoResizeSet(!!option.autoResize);

		if(option.floatingHeader) {
			self.$fixedheader.css('width',$table.css('width'));
			self.$tableheader.removeClass("fixed").hide();
			self.$tableheader.empty();
			if(!self.state.hasHorizontalScrollBar) {
				if(isIE<9) {
					self.$fixedheader.css('left','0px');
				} else {
					self.$fixedheader.css('transform','translateX(0px)');
				}
			}
		} else {
			self.$fixedheader = null;
		}

		if(self._hasFooter("bottom")) {
			var markup = '<tbody class="table-header">'+_generateHTML(self._footerRowRender())+'</tbody>';
			var colgroup = self.$colgroup.clone();
			var footer = (self.$fixedheader || self.$tableheader).clone().html(markup).prepend(colgroup).css("top","");
			self.$footer.html(footer).css('height', footerHeight+"px").show();
			if(self.state.hasFixColumn) {
				var colgrouphtml = '<colgroup>';
				var stopit = false;
				var twidth = 0;
				$.each(option.columnMapping, function(idx, mapping) {
					if (mapping.columnIndex === null || mapping.columnIndex === undefined) {
						return;
					}
					if(mapping.columnIndex > self.state.fixupto) {
						return;
					}
					if (mapping.fixed) {
						if (!mapping.hasOwnProperty('width')) {
							stopit = true;
							return false;
						}
						twidth += Number(mapping.width.split("px")[0]);
					}
					colgrouphtml += '<col style="width:' + (mapping.width) + ';">';
				});
				colgrouphtml += '</colgroup>';

				if(!stopit) {
					var fixedMarkup = '<tbody class="table-header fixeddd">'
						+_generateHTML(self._footerRowRender(self.state.fixupto))
						+'</tbody>';
//					var fixedColgroup = self.$colgroup.clone();
//					fixedColgroup.children('col').map(function(idx,elem){if(idx>self.state.fixupto) return elem;}).remove();
					var fixedColgroup = colgrouphtml;
					var fixedFooter = fht.clone().html(fixedMarkup).prepend(fixedColgroup)
						.css({"top":"","width":twidth+"px","left":"0px"});
					self.$footer.append(fixedFooter);
				}
			}
			var footerleft = -9999;
			self.$scroller.off('.footerscroll');
			_scrollHack(self.$scroller, '.footerscroll');
			self.$scroller.on('scroll.footerscroll', function(){
				var thisleft = this.scrollLeft;
				if(thisleft !== footerleft) {
					footer.css("left", (-thisleft)+"px");
					footerleft = thisleft;
				}
			});
		} else {
			self.$footer.empty().hide();
			self.$scroller.off('.footerscroll');
		}

		//고정헤더의 가로 스크롤연동
		$scroller.off('.alopexgridview');
		if (self.state.hasHorizontalScrollBar && self.option.floatingHeader !== false) {
			_scrollHack($scroller, '.alopexgridview');
			$scroller.on('touchend.alopexgridview', function(e){
				$scroller.trigger('scroll');
			});
			$scroller.on('scroll.alopexgridview', {self:self,lastleft:-1},function(e) {
				var self = e.data.self;
				var left = Number(this.scrollLeft);
				if (left !== e.data.lastleft) {
					//$tableheader.css('left', (-left)+'px');
					//$scroller.find('.table.cloned').not('.fixed-column').css({'left': (-left)+'px'});
					self.state.lastScrollLeft = left;
					(isIE<9)?fht.css('left', (-left) + 'px') : fht.css('transform','translateX('+(-left)+'px)');
				}
				e.data.lastleft = left;
			});
		}
		if (self.state.hasVerticalScrollBar && self.option.on && self.option.on.scrollBottom) {
			var timer = null;
			_scrollHack($scroller, '.alopexgridview');
			$scroller.on('scroll.alopexgridview', function(e, param1) {
				var top = this.scrollTop;
				var height = this.clientHeight;
				var scrollHeight = this.scrollHeight;
				if (self.state.scrollBottomPrevTop === top) {
					return;
				}
				self.state.scrollBottomPrevTop = top;
				if (timer !== null) {
					clearTimeout(timer);
				}
				if (height < scrollHeight && top + height >= scrollHeight) {
					if (self.option.on && self.option.on.scrollBottom) {
						timer = setTimeout(function() {
							var handlers = self.option.on.scrollBottom;
							if (!$.isArray(handlers)) {
								handlers = [handlers];
							}
							$.each(handlers, function(idx, handler) {
								if (typeof handler == "function") {
									handler.call(self);
								}
							});
							timer = null;
						}, self.option.scrollBottomDelay);
					}
				}
			});
		}
		$scroller.on('scroll.alopexgridview', function(e){
			if($(this).is(':hidden')) return; // hidden상태에서는 scrollTop, scrollLeft 0 return;
			self.state.lastScrollTop = this.scrollTop;
			self.state.lastScrollLeft = this.scrollLeft;
		});
		self._fixColumnLoad(viewoption);
		if(self.option.enableHeaderGroupResizing && self.option.headerGroup && self.option.headerGroup.length) {
			var $headergroup = $()
				.add(self.$tableheader.find('.header-group'))
				.add(self.$fixedheader ? self.$fixedheader.find('.header-group') : $())
				.add(self.state.hasFixColumn ? self.state.$fixcolwrap.find('.header-group') : $());
			var widthmap = self.state.columnWidthMap = self._calcCellWidth();
			$headergroup.each(function(idx, groupcell){
				var $groupcell = $(groupcell);
				var $resizinghandles = $groupcell.find('.resizing-handle');
				$resizinghandles.each(function(idx1, resizinghandle) {
					var $resizinghandle = $(resizinghandle);
					var sumof = $resizinghandle.attr('data-alopexgrid-resizingsumof');
					if(sumof) {
						sumof = sumof.split(',');
						var right = -(parseInt($resizinghandle.attr('data-alopexgrid-resizingcompensate'))||0);
						$.each(sumof, function(idx, cidx){
							right += (parseInt(widthmap[cidx])||0);
						});
						$resizinghandle.css('right', right + 'px');
					}
				});
			});	
		}
		self.viewEventUpdate();
		var vscroll = self._vscrollInfo();
		if(self._shouldScrollBeOverridden() && vscroll) {
			//if _simpleRedraw() invoked in this condition, table top can be screwed.
			self.$table.attr('data-vscroll-top',vscroll["paddingTopHeight"]);
		}
		//내용물을 모두 띄운 후, 필요에 따라 강제업데이트가 이루어진 경우 scroller의  scroll위치를 복원한다.
		if(viewoption && viewoption.restoreScrollOffset) {
			viewoption.scrollLeft = self.state.lastScrollLeft;
			self.state.lastScrollLeft = -1;
			viewoption.scrollTop = self.state.lastScrollTop;
			self.state.lastScrollTop = -1;
		}
		if (option.scroll) {
			var changed = false;
			if (viewoption && viewoption.hasOwnProperty('scrollLeft')) {
				if (viewoption.scrollLeft !== self.state.lastScrollLeft && self.state.hasHorizontalScrollBar) {
					$scroller.scrollLeft(viewoption.scrollLeft);
					changed = true;
				}
				self.state.lastScrollLeft = viewoption.scrollLeft;
			}
			if (viewoption && viewoption.hasOwnProperty('scrollTop')) {
				if (viewoption.scrollTop !== self.state.lastScrollTop && self.state.hasVerticalScrollBar) {
					$scroller.scrollTop(viewoption.scrollTop);
					changed = true;
				}
				self.state.lastScrollTop = viewoption.scrollTop;
			}
			if(vscroll) {
				changed = true;
			}
			if(changed) {
				$scroller.trigger("scroll");
			}
		}
		self.state.viewUpdating = false;
	};
	AlopexGrid.prototype._wrapperHeightRefresh = function() {
		var self = this;
		var option = self.option;
		var $r = self.$root;
		var $title = self.$title;
		var $pager = self.$pager;
		var $wrapper = self.$wrapper;
		if(option.height) {
			$r.css('height', option.height+"px");
		}

		var tableHeight = "";
		if(typeof self.state.userHeight === "string" && self.state.userHeight.indexOf('row')>=0) {
			tableHeight = self.state.tableheaderHeight
				+ self.$wrapper.outerHeight() - self.$wrapper.height()
				+ self.state.rowHeight*self.state.userHeightRowCount
				+ self.$scroller.height()-self.$scroller.prop('clientHeight')
				+ (self.state.rowHeightBorderWidth||1);
		} else {
			tableHeight = (option.height || option["max-height"] || $r.height() || 0) - ($title.data('alopex-grid-visible') ? $title.height() : 0) -
				($pager.data('alopex-grid-visible') ? $pager.outerHeight() : 0);
			//jQuery on IE10 returns null at $wrapper.css('borderTopWidth').
			var minus1 = Number(($wrapper.css('borderTopWidth')||"").split('px')[0]);
			var minus2 = Number(($wrapper.css('borderBottomWidth')||"").split('px')[0]);
			tableHeight = tableHeight - (isNaN(minus1) ? 0 : minus1) - (isNaN(minus2) ? 0 : minus2);
			if ($wrapper.css('box-sizing') === 'border-box') { //box-sizing : border-box 적용시 border가 높이 계산시 먹힘.
				var rht = Number(($r.css('borderTopWidth')||"").split('px')[0]);
				var rhb = Number(($r.css('borderBottomWidth')||"").split('px')[0]);
				tableHeight -= isNaN(rht) ? 0 : rht / 2;
				tableHeight -= isNaN(rhb) ? 0 : rhb;
			}
			//tableHeight = tableHeight - (this._hasFooter("bottom") ? this.state.footerHeight : 0);
			tableHeight = tableHeight - (this._hasFooter("bottom") ? self.$footer.children().height() : 0);
		}
		$wrapper.css('height', Math.ceil(tableHeight) + "px");
		delete self.state.wrapperInnerHeight;
	};
	//이벤트 핸들러 기능을 하므로 일반 호출 불가.
	AlopexGrid.prototype._columnResizeStart = function(e, column) {
		if (!e || !e.type) {
			return;
		}
		var self = this;
		if (self.state.columnResizing) {
			return;
		}
		e = $.event.fix(e);
		if (e.which !== 1) {
			return;
		}
		var $wrapper = self.$wrapper;
		var $scroller = self.$scroller;
		var $target = $(e.target);
		var $table = $target.parentsUntil($scroller, '.table').eq(0);
		var $headercell = $target.parentsUntil($scroller, '.cell').eq(0);
		var columnIndex = column !== undefined ? column : $headercell.attr('data-alopexgrid-columnindex');
		if (isNaN(Number(columnIndex))) {
			return;
		}
		var mapping = $(self.option.columnMapping).filter(function(idx, cm) {
			if (Number(cm.columnIndex) === Number(columnIndex)) {
				return true;
			}
			return false;
		})[0];
		var nextmapping = $(self.option.columnMapping).filter(function(idx, cm) {
			if (Number(cm.columnIndex) === (Number(columnIndex) + 1)) {
				return true;
			}
			return false;
		})[0];
		//columnMapping에서 해당 cell의 width를 읽고, 향후 변경된 width값 입력 후 viewUpdate를 떄린다.

		var ratio = self._colRatio(true);
		var scrollLeft = self.option.scroll ? Number($scroller[0].scrollLeft) : 0;
		var scrollTop = self.option.scroll ? Number($scroller[0].scrollTop) : 0;
		if (self.state.$resizeBar) {
			self.state.$resizeBar.remove();
			delete self.state.$resizeBar;
		}
		var bar = $('<div class="resize-align">');
		//bar의 시작 위치
		var baseOffset = 0;
		if(self.option.calculateResizingHandlePositionOldWay) {
			baseOffset = 0;
			$.each(self.option.columnMapping, function(idx, cm) {
				if (cm.columnIndex === undefined || cm.columnIndex === null) {
					return;
				}
				if (Number(cm.columnIndex) <= Number(columnIndex)) {
					if (cm.width && !cm.hidden) { // hidden column인 경우, 더하지 않기.
						baseOffset += Number(cm.width.split('px')[0]);
					} else {
						baseOffset = null;
						return false;
					}
				}
			});
			if (!baseOffset) {
				var ol = (mapping.width && mapping.width.indexOf('px') >= 0)
					? ((Number(mapping.width.split('px')[0]) * ratio) | 0) - 1
					: e.target.parentNode.clientWidth;//TODO get actual header width or for headergroup, subwidth of actual column
				//var cl = mapping.width ? -1 : e.target.clientLeft;
				var pol = e.target.parentNode.offsetLeft;
				baseOffset = ol + pol;
			} else {
				baseOffset = (baseOffset * ratio) | 0;
			}
		} else {
			var widthmap = self.state.columnWidthMap = self._calcCellWidth();
			$.each(widthmap, function(cindex, width){
				if(Number(cindex) <= Number(columnIndex)) {
					baseOffset += width;
				}
			});
		}
		var barx = Number(baseOffset - ($table.hasClass('fixed-column') ? 0 : scrollLeft));
		//마우스의 시작 위치. 마우스 이벤트의 clientX를 통해서 변위를 얻어내고 bar의 위치를 변경한다.
		var from = e.clientX;//console.log('from',e.clientX, e.offsetX, $scroller[0].scrollLeft)
		var barheight = self.option.height ? self.option.height : 2500;//$wrapper.height();임의로 높이를 정해도 이것을 넘어가는 화면이 현재는 없다.
		bar.css({
			"position": "absolute",
			"top": "0px",
			"left": (barx) + "px",
			"border": "1px dotted black",
			"height": barheight + "px"
		});
		bar.appendTo($wrapper);
		self.state.$resizeBar = bar;

		var dataobj = {
			mode: _readMappingProp(mapping,'resizing'),//resize모드 - 우측 컬럼에 영향을 주는가 자신만 변경되는가.
			barx: barx,//바의 시작 위치 
			from: from,//마우스의 시작위치 
			//target : targetCell, //수정대상 셀
			ratio: ratio,//col 크기 변경에 대한 비율
			mapping: mapping, //변위값을 적용할 매핑
			nextmapping: nextmapping,//변위값을 적용할 컬럼의 옆 컬럼 매핑
			bar: bar,
			scrollLeft: scrollLeft,
			scrollTop: scrollTop,
			//orgWidth : e.target.parentNode.clientWidth
			orgWidth : widthmap[columnIndex],//$headercell.width(),
			$headercell :$headercell
		};
		$(document).off('.alopexgridresizeevent' + self.key).on('mousemove.alopexgridresizeevent' + self.key, dataobj, resizeMoveHandler).on('mouseup.alopexgridresizeevent' + self.key, dataobj,
			resizeUpHandler);
		e.preventDefault();
		self.state.columnResizing = true;
		self.state.disableSort = true;
		var lastx = -100;
		function resizeMoveHandler(e) {
			var curr = e.clientX;//console.log('curr',curr)
			if (curr !== lastx) { //IE에서는 포인터가 같은 위치에 있어도 mousemove이벤트가 계속 발생한다.
				e.data.bar.css("left", (e.data.barx + (curr - e.data.from)) + "px");
				lastx = curr;
				e.preventDefault();
				if (document.selection && document.selection.empty) {
					//드래그시 선택을 방지 
					clearSelection();
				}
			}
		}
		function resizeUpHandler(e) {
			var curr = e.clientX;
			var diff = Number(curr - e.data.from) / e.data.ratio;
			if(e.data.mapping.width && String(e.data.mapping.width).indexOf('%')>=0) {
				var m1width = Number(e.data.mapping.width.split('%')[0]) || null;
				var m2width = e.data.nextmapping && e.data.nextmapping.width ?
					Number(e.data.nextmapping.width.split('%')[0]) : null;
				var incr = 0;
				if(m1width) {
					var newwidth = ((m1width * (e.data.orgWidth + diff) / e.data.orgWidth)*10)|0;
					newwidth /= 10;
					incr = _max(newwidth,1) - m1width;
					if(m2width && (m2width - incr) <1 ) {
						incr = m2width - 1;
						newwidth = incr + m1width;
					}
					e.data.mapping.width = _max(newwidth, 1) + '%';
				}
				if(m2width && e.data.mode !== "self") {
					e.data.nextmapping.width = _max(Math.floor((m2width-incr)*10)/10,1) + '%';
				}
			} else {
				var m1width = e.data.mapping.width ? Number(e.data.mapping.width.split("px")[0]) : (e.data.orgWidth || null);
				var m2width = e.data.nextmapping && e.data.nextmapping.width ? Number(e.data.nextmapping.width.split("px")[0]) : e.data.$headercell.next().width();
				if (m2width === 0)
					m2width = null;
				if (m1width === null) {
//					m1width = e.data.target.width(); // target 넘기는 부분 주석처리해서 에러발생. 
					m1width = parseInt($(e.data.bar).css('left')); // edited by SM 20140917
				}
				var minwidth = self.option.minColumnWidth || 1;
				if (m1width !== null) {
					if (m2width !== null && (m2width - diff <= minwidth) && e.data.mode !== "self") {
						diff = m2width - minwidth;
					}
				}
				if (m2width !== null) {
					if (m1width !== null && (diff + m1width <= minwidth) && e.data.mode !== "self") {
						diff = (-m1width) + minwidth;
					}
				}
				diff = diff | 0;
				e.data.mapping.width = _max(((m1width + diff) | 0), minwidth) + "px";
				if (m2width !== null && e.data.mode != "self") {
					e.data.nextmapping.width = _max(((m2width - diff) | 0), minwidth) + "px";
				}
			}
			//var bar = e.data.bar;
			self.state.$resizeBar.remove();
			delete self.state.$resizeBar;
			$(document).off('.alopexgridresizeevent' + self.key);
			var param = {
				scrollLeft: e.data.scrollLeft,
				scrollTop: e.data.scrollTop,
				updateColgroup: true
			};
			//$r.off('.alopexgridresizeevent');
			self._showProgress(function() {
				var hs = self.state.hasHorizontalScrollBar;
				self.viewUpdate(param);
				//self._simpleRedraw(null, param);
				var ahs = self.state.hasHorizontalScrollBar;
				if (self.option.scroll) {
					if (hs !== ahs) { //없다 있으니까, 또는 있다 없으니까 깨진 상태로 렌더링됨. 다시 한번 리프레시.
						self.viewUpdate();
						self._simpleRedraw();
					}
					if (ahs) {//가로스크롤이 다시 그려지면서 맞춰지지 않는 문제.
						self.$scroller.trigger('scroll');
					}
					//self.$scroller.prop({'scrollLeft':e.data.scrollLeft,'scrollTop':e.data.scrollTop});
				}
				clearSelection();
				self.state.columnResizing = false;
				self.state.disableSort = false;
			});
		}
	};
	/**
	 * $(grid).alopexGrid('sortToggle', columnIndex or key, direction)
	 * 정렬을 column index 또는 key 기준으로 수행. 현재 렌더링된 데이터에 대해서 정렬 가능.
	 */
	AlopexGrid.prototype.sortToggle = function(column, dir) {
		if(typeof column === "string") { //key값 명시를 시도한 경우.
			for(var i=0,l=this.option.columnMapping.length;i<l;i++) {
				var m = this.option.columnMapping[i];
				if(m && m.columnIndex !== undefined && m.columnIndex !== null
					&& (typeof m.key === "string") && m.key === column) {
					column = Number(m.columnIndex);
					break;
				}
			}
		}
		return this._sortToggle(column, dir, false);
	};
	AlopexGrid.prototype.dataSort = function(column, dir, sortingMulti) {
		var self = this;
		if(!dir) dir = "asc";
		if($.isArray(column)) {
			column = $.extend(true, [], column);
			var head = column.shift();
			sortingMulti = column;
			column = self.state.columnKeyToIndexMap[head.sortingKey];
			if(!_valid(column)) column = head.sortingColumn;
			dir = head.sortingDirection || "asc";
			if(!sortingMulti.length) sortingMulti = undefined;
		}
		if(!$.isArray(sortingMulti)) {
			delete self.state.sortingMulti;
			return self.sortToggle(column, dir);
		}
		sortingMulti = $.extend(true, [], sortingMulti);
		self.state.sortingColumn = column;
		self.state.sortingKey = self.state.columnIndexToKeyMap[column];
		self.state.sortingDirection = dir || "asc";
		self._processSortingMulti(sortingMulti);
		self._simpleRedraw();
	}
	AlopexGrid.prototype._sortToggle = function(column, dir, e) {
		var self = this;
		var columnIndex = column;
		if (self.state.disableSort) {
			return;
		}
		if (e) {
			e = $.event.fix(e);
			var $target = $(e.target);
			//resize에 의해 sort cell에 click이벤트가 발생하는 경우가 있다. 이를 방지.
			if ($(e.target).hasClass("resizing-handle")) {
				return;
			}
			if (columnIndex === undefined || columnIndex === null) {
				var $cell = $target.hasClass('headercell') ? $target : $target.parentsUntil(self.$scroller, '.cell').eq(0);
				columnIndex = $cell.attr('data-alopexgrid-columnindex');
			}
		}

		if (columnIndex === undefined || columnIndex === null) {
			return;
		}

		function valueCorrector() {
			columnIndex = Number(columnIndex);
			if (self.state.hasOwnProperty('sortingColumn') && self.state.sortingColumn !== undefined && self.state.sortingColumn !== null && Number(self.state.sortingColumn) !== Number(columnIndex)) {
				delete self.state.sortingDirection;
			}
			if(self.state.sortingMulti) {
				delete self.state.sortingDirection;
			}
			if (dir === "desc" || (!dir && self.state.sortingDirection === "asc")) {
				self.state.sortingDirection = 'desc';
			} else if (dir === "asc" || (!dir && self.state.sortingDirection === "desc")) {
				self.state.sortingDirection = 'asc';
			} else {
				self.state.sortingDirection = 'asc';
			}
			self.state.sortingColumn = Number(columnIndex);
		}
		//valueCorrector();
		if(e && e.shiftKey) {
			self.state.sortingMulti = self.state.sortingMulti || [];
			var already = self.state.sortingColumn === columnIndex ? columnIndex : $.grep(self.state.sortingMulti, function(sm,ii){
				if(sm.sortingColumn === columnIndex || self.state.columnKeyToIndexMap[sm.sortingKey] === columnIndex) {
					return true;
				}
			});
			if($.type(already)==="number") {
				self.state.sortingDirection = self.state.sortingDirection ==="desc" ? "asc" : "desc";
			}
			else if(already.length) {
				already[0].sortingDirection = already[0].sortingDirection === "desc" ? "asc" : "desc";
			} else {
				self.state.sortingMulti.push({sortingColumn:columnIndex,sortingDirection:"asc"});
			}
		} else {
			valueCorrector();
			delete self.state.sortingMulti;
		}
		self._showProgress(function(done) {
			var tret = null;
			var params = null;
			if(self.option.on && $.isFunction(self.option.on.sortToggle)) {
				params = getParamNames(self.option.on.sortToggle);
				var sortingKey = "";
				for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
					var ci = self.option.columnMapping[i].columnIndex;
					if(ci !== undefined && ci !== null && Number(ci)===Number(self.state.sortingColumn)) {
						sortingKey = self.option.columnMapping[i].key || "";
						break;
					}
				}
				tret = self.option.on.sortToggle.call(self,
					self.option.pager ? $.extend({},self.option.paging) : null,
					{"key":sortingKey,
						"column":self.state.sortingColumn,
						"direction":self.state.sortingDirection},
					done);
			}
			if(tret === false) {
				if(!params || (params && params.length<3)){
					$.isFunction(done) ? done() : "";
				}
				return;
			}
			var scrolloffset = self._scrollOffset();
			self._dataDraw();
			self.state.lastScrollLeft = -1;
			self.state.lastScrollTop = -1;
			self.viewUpdate(scrolloffset);
			if(!params || (params && params.length < 3)) {
				$.isFunction(done) ? done() : "";
			}
		}, 0,(e===false)?false:true);

	};
	var lasthoverenterY = -100;
	var lasthoverleaveY = -100;
	AlopexGrid.prototype._hoverEnter = function(row, e) {
		var self = this;
		if (AlopexGrid.dragObject) {
			return;
		}
		var y = e.clientY;
		if (lasthoverenterY === y) {
			return;
		}
		lasthoverenterY = y;
		var $this = $(row);
		var dataIndex = Number($this.attr('data-alopexgrid-dataindex'));
		if (self.state.hovered) {
			$.each(self.state.hovered, function(idx, elem) {
				//mouseleaveHandler.call(elem[0], {});
				self._hoverLeave(elem[0], {});
			});
			delete self.state.hovered;
		}
		self.state.hovered = [];
		var rowspanindex = self.state.columnRowspanned ? _rowspanWidestIndex(self.state.rowspanindex, dataIndex) : null;
		if (self.state.columnRowspanned && rowspanindex) {
			var rowspanfrom = null
			var rowspanto = null;
			rowspanfrom = rowspanindex.from;
			rowspanto = rowspanindex.to;

			self.$tablebody.children('.row').each(function(idx, row) {
				var sdataIndex = row.getAttribute('data-alopexgrid-dataindex');
				if (sdataIndex === undefined || sdataIndex === null || sdataIndex === "") {
					return;
				}
				if (rowspanfrom <= Number(sdataIndex) && Number(sdataIndex) < rowspanto) {
					var $row = $(row);
					$row.addClass("hovering");
					self.state.data[sdataIndex]._state.hovering = true;
					if (self.state.hasFixColumn) {
						self._findClonePair($row).addClass("hovering");
					}
					self.state.hovered.push($row);
					if (Number(sdataIndex) === (Number(rowspanto) - 1)) {
						return false;
					}
				}
			});
		} else {
			$this.addClass("hovering");
			self.state.hovered.push($this);
			if (!isNaN(dataIndex)) {
				self.state.data[dataIndex]._state.hovering = true;
			}
			if (self.state.hasFixColumn) {
				self._findClonePair($this).addClass("hovering");
			}
		}
		//$this.one('mouseleave.alopexgridevent', mouseleaveHandler);

	};
	AlopexGrid.prototype._hoverLeave = function(row, e) {
		var self = this;
		if (AlopexGrid.dragObject) {
			return;
		}
		var y = e.clientY;
		if (lasthoverleaveY === y) {
			return;
		}
		lasthoverleaveY = y;
		var $this = $(row);
		if (!$this.hasClass('hovering')) {
			return;
		}
		var dataIndex = Number($this.attr('data-alopexgrid-dataindex'));
		var rowspanindex = null;
		rowspanindex = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
		if (self.state.columnRowspanned && rowspanindex) {
			var rowspanfrom = null;
			var rowspanto = null;
			rowspanfrom = rowspanindex.from;
			rowspanto = rowspanindex.to;

			self.$tablebody.children('.row').each(function(idx, row) {
				var sdataIndex = Number(row.getAttribute('data-alopexgrid-dataindex'));
				if (rowspanfrom <= sdataIndex && sdataIndex < rowspanto) {
					var $row = $(row);
					$row.removeClass("hovering");
					self.state.data[sdataIndex]._state.hovering = false;
					if (self.state.hasFixColumn && self.state.fixupto >= 0) {
						self._findClonePair($row).removeClass("hovering");
					}
					if (Number(sdataIndex) === (Number(rowspanto) - 1)) {
						return false;
					}
				}
			});
		} else {
			$this.removeClass("hovering");
			if (!isNaN(dataIndex)) {
				self.state.data[dataIndex]._state.hovering = false;
			}
			if (self.state.hasFixColumn && self.state.fixupto >= 0) {
				self._findClonePair($this).removeClass("hovering");
			}
		}

	};
	AlopexGrid.prototype.rowElementGet = function(query) {
		return this._elementGet(query);
	};
	AlopexGrid.prototype.cellElementGet = function(query, columnIK) {
		return _valid(query) && _valid(columnIK) ? this._elementGet(query, columnIK) : $();
	};
	AlopexGrid.prototype._elementGet = function(query, columnIK) {
		var self = this;
		var $empty = $();
		if(!_isEmptyQuery(query) && !_valid(columnIK)) {
			return self.refreshRow(query, true) || $empty;
		} else if(!_isEmptyQuery(query) && _valid(columnIK)) {
			return self.refreshCell(query, columnIK, true) || $empty;
		}
		return $empty;
	};
	AlopexGrid.prototype.refreshRow = function(query, elementget) {
		if(!query) return null;
		var self = this;
		var $rows = null;
		var $empty = $();
		if(query.jquery) {
			$rows = query;
		} else if(query.nodeType) {
			$rows = $(query);
		} else if(query._index) {
			var data = self.dataGetByIndex(query._index);
			var dataIndex = null;
			if(data && data._index) {
				dataIndex = data._index.data;
			}
			if(dataIndex !== null) {
				//$rows = self.$tablebody.children('.bodyrow').filter('[data-alopexgrid-dataindex="'+dataIndex+'"]');
				$rows = self.$tablebody.children('.'+data._index.id);
			}
		}
		if($rows === null || !$rows.length || !_valid($rows.attr('data-alopexgrid-dataindex'))) {
			return $empty;
		}
		if(elementget === true) {
			return $rows.add(self.state.hasFixColumn ? self._findClonePair($rows) : $empty);
		}
		//var $newrows = $();
		$rows.each(function(idx,row) {
			var $row = $(row);
			self._redrawRow($row);
		});
	};
	AlopexGrid.prototype.refreshCell = function(query, columnIndexKey, elementget) {
		var self = this;
		var $cell = null;
		var $empty = $();
		var dataIndex = null;
		var columnIndex = null;
		if(query.jquery || query.nodeType) {
			$cell = query.jquery ? query : $(query);
			columnIndex = Number($cell.attr('data-alopexgrid-columnindex'));
			dataIndex = Number($cell.parent().attr('data-alopexgrid-dataindex'));
		} else if(query._index) {
			var data = self.dataGetByIndex(query._index);
			if(!data) return $empty;
			dataIndex = Number(data._index.data);
			columnIndex = typeof columnIndexKey === "number" ? columnIndexKey :
				getColumnIndexByKey(self.option.columnMapping, columnIndexKey);
			var $rows = null;
			if(self.state.hasFixColumn && columnIndex <= self.state.fixupto && self.state.$fixcolbody) {
				$rows = self.state.$fixcolbody.children('.bodyrow');
			} else {
				$rows = self.$tablebody.children('.bodyrow');
			}
			if($rows !== null) {
				var rowfrom = Number($rows.eq(0).attr('data-alopexgrid-dataindex'));
				var rowto = Number($rows.eq(-1).attr('data-alopexgrid-dataindex'));
				if(dataIndex < rowfrom || dataIndex > rowto) {
					return $empty;
				}	
				$cell = $rows.eq(dataIndex-rowfrom)
					.children('[data-alopexgrid-columnindex="'+columnIndex+'"]');
			}
		}
		if($cell === null || !$cell.length || !_valid($cell.attr('data-alopexgrid-columnindex'))) {
			return $empty;
		}
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		self.state.dataCompositor ? self.state.dataCompositor(self.state.data[dataIndex]) : 0;
		if(elementget === true) {
			return $cell;
		}
		var $renderedcell = $(_convertAlopex.call(
				self,
				self._cellRender(_getCurrentData(self, self.state.data[dataIndex]), mapping))
		);
		if($renderedcell.length && $cell.length) {
			$cell.replaceWith($renderedcell);
		}
		return $renderedcell;
	};
	function _getMappingByQuery(columnMapping, query, self, data) {
		for(var ci in columnMapping) {
			var mapping = columnMapping[ci];
			for(var prop in query) {
				if(mapping.hasOwnProperty(prop)) {
					if(typeof mapping[prop] === "string" && String(query[prop]) === mapping[prop]) return mapping;
					else if(typeof mapping[prop] === "number" && Number(query[prop]) === mapping[prop]) return mapping;
					else if(mapping[prop] === query[prop]) return mapping;
				}
			}
			var multiTemp = null;
			if(($.isFunction(mapping.multi) && $.isArray(multiTemp=mapping.multi.call(self, data[mapping.key], data, mapping)))
					|| $.isArray(mapping.multi)) {
				var r = _getMappingByQuery(multiTemp || mapping.multi, query, self, data);
				if(r) return r;
			}
		}
		return false;
	}

	//cell 셀렉션 영역 오버레이를 생성하고(또는 스타일을 바꿔주고)
	//이미 생성되어 있다면 영역을 사각형으로 확장한다
	AlopexGrid.prototype._cellSelectionExpand = function(cell) {

	};
	AlopexGrid.prototype._cellSelectionRemove = function(cell) {

	};
	AlopexGrid.prototype._enableSelection = function(enable) {
		var self = this;
	};

	//TODO selection이 있다면 해당 영역을 테이블로 조합하고
	//없다면 현재 active cell하나만 테이블로 조합한다
	AlopexGrid.prototype._cellCopy = function(cell, e) {
		var self = this;
		var $cell = cell.jquery ? cell : $(cell);
		var $row = $cell.parent();
		var key = $cell.attr('data-alopexgrid-key');
		var dataid = $row.attr('data-alopexgrid-dataid');
		if(dataid && key) {
			var data = self.dataGetByIndex({id:dataid});
			var value = data[key];
			AlopexGrid.clipboard["text"] = value;
			if(AlopexGrid.clipboard["elements"] && AlopexGrid.clipboard["elements"].length) {
				AlopexGrid.clipboard["elements"].removeClass('copied');
				AlopexGrid.clipboard["elements"] = $();
			}
			$cell.addClass('copied');
			AlopexGrid.clipboard["elements"] = AlopexGrid.clipboard["elements"] || $();
			AlopexGrid.clipboard["elements"] = AlopexGrid.clipboard["elements"].add($cell);

		}
	};
	//TODO 클립보드의 내용이 table tag라면 영역 붙여넣기를.
	//클립보드의 내용이 그냥 텍스트라면 셀 하나만 바꾸는식으로.
	AlopexGrid.prototype._cellPaste = function(cell, e) {
		var self = this;
		e = e.originalEvent || e;
		// var pasted = "";
		// if(e.clipboardData && e.clipboardData.getData) {
		// 	console.log(e.clipboardData.types);
		// 	if(/text\/html/.test(e.clipboardData.types)) {
		// 		pasted = e.clipboardData.getData('text/html');
		// 	} else if(/text\/plain/.test(e.clipboardData.types)) {
		// 		pasted = e.clipboardData.getData('text/plain');
		// 	} else {
		// 		pasted = false;
		// 	}
		// }

		var $cell = cell.jquery ? cell : $(cell);
		var $row = $cell.parent();
		var key = $cell.attr('data-alopexgrid-key');
		var dataid = $row.attr('data-alopexgrid-dataid');
		if(dataid && key && AlopexGrid.clipboard["text"]) {
			var fi = self._focusInfo($cell,$row);
			var obj = {};
			obj[key] = AlopexGrid.clipboard["text"];
			self.dataEdit(obj, {_index:{id:dataid}},true);
			//focus restore
			self._focusRestore(fi);
		}
		if(!AlopexGrid.clipboard["text"] && AlopexGrid.clipboard["elements"]
			&& AlopexGrid.clipboard["elements"].length) {
			AlopexGrid.clipboard["elements"].removeClass('copied');
			AlopexGrid.clipboard["elements"] = $();
		}
	};
	AlopexGrid.prototype._focusInfo = function($cell,$row){
		var self = this;
		var insideActive = false;
		if(!$cell) {
			$cell = $(document.activeElement);
			if(!$cell.hasClass('bodycell')) {
				$cell = $cell.parentsUntil('.alopexgrid', '.bodycell').eq(0);
				insideActive = true;
			}
			if(!$cell.length) return false;
		}
		$row = $row || $cell.parent();
		var cellidx = $cell.index();
		var rowidx = $row.index();
		var copiedidx = $row.children('.copied').index();
		return $.extend({
			"column" : cellidx,
			"row":rowidx,
			"copied":copiedidx,
			"fixcol":(self.state.hasFixColumn && self.state.fixupto >= 0 && $cell.hasClass('cell-fixcol'))
		},insideActive ? 
			{
				"inside":true,
				"insideTag":document.activeElement.tagName,
				"insideIndex":$cell.find(document.activeElement.tagName).index(document.activeElement)
			} : null);
	};
	AlopexGrid.prototype._focusRestore = function(focusinfo) {
		var self = this;
		if(!focusinfo) return;
		var $tablebody = focusinfo["fixcol"] ? self.state.$fixcolbody : self.$tablebody;
		var $newcells = $tablebody.children().eq(focusinfo.row).children();
		var $targetcell = $newcells.eq(focusinfo.column);
		if(focusinfo.inside) {
			$targetcell.find(focusinfo.insideTag).eq(focusinfo.insideIndex).focus();
		} else {
			$targetcell.focus();			
		}
		if(focusinfo.copied >= 0) {
			AlopexGrid.clipboard["elements"] = AlopexGrid.clipboard["elements"]
				.add($newcells.eq(focusinfo.copied).addClass('copied'));
		}
		return $targetcell;
	};

	function _getSelectionTextInfo(el) {
		var atStart = false, atEnd = false;
		var selRange, testRange;
		if (window.getSelection) {
			var sel = window.getSelection();
			if (sel.rangeCount) {
				selRange = sel.getRangeAt(0);
				testRange = selRange.cloneRange();

				testRange.selectNodeContents(el);
				testRange.setEnd(selRange.startContainer, selRange.startOffset);
				atStart = (testRange.toString() == "");

				testRange.selectNodeContents(el);
				testRange.setStart(selRange.endContainer, selRange.endOffset);
				atEnd = (testRange.toString() == "");
			}
		} else if (document.selection && document.selection.type != "Control") {
			selRange = document.selection.createRange();
			testRange = selRange.duplicate();

			testRange.moveToElementText(el);
			testRange.setEndPoint("EndToStart", selRange);
			atStart = (testRange.text == "");

			testRange.moveToElementText(el);
			testRange.setEndPoint("StartToEnd", selRange);
			atEnd = (testRange.text == "");
		}

		return { atStart: atStart, atEnd: atEnd };
	}
	function _placeCaretAtEnd(el) {
		if (typeof window.getSelection != "undefined"
			&& typeof document.createRange != "undefined") {
			var range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.body.createTextRange != "undefined") {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}
	}
	function _moveCaret(charCount) {
		var sel, range;
		win = window;
		if (win.getSelection) {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				var textNode = sel.focusNode;
				var newOffset = sel.focusOffset + charCount;
				sel.collapse(textNode, Math.min(textNode.length, newOffset));
			}
		} else if ( (sel = win.document.selection) ) {
			if (sel.type != "Control") {
				range = sel.createRange();
				range.move("character", charCount);
				range.select();
			}
		}
	}
	AlopexGrid.prototype._cellFocusMove = function(cell, e, direction, dataid) {
		var self = this;
		e = $.event.fix(e);
		//PgUp(33), PgDn(34), End(35), Home(36), Left(37), Up(38), Right(39), Down(40)
		var arrows = [33,34,35,36,37,38,39,40,9];
		var arrowmap = {33:"pgup",34:"pgdn",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",9:"tab"};
		var direction = arrowmap[e.which];
		if(direction === "tab" && self.option.allowTabToCellMove) {
			direction = e.shiftKey ? "left" : "right";
		}
		var tag = e.target.tagName.toUpperCase();
		if(tag==='INPUT' || tag==="SELECT" || tag==="TEXTAREA") return;

		if($.inArray(e.which, arrows)>=0) {
			var $cell = $(cell);
			var contenteditable = $cell.attr('contentEditable');
			if(contenteditable && (direction=="right"||direction=="left") && arrowmap[e.which] !== "tab") {
				//_moveCaret(direction=="right"?1:-1);
				//e.preventDefault();
				return;
			}
			var selection = contenteditable ? _getSelectionTextInfo($cell[0]) : {atStart:true,atEnd:true};
			var $focustarget = null;
			var rowchange = false;
			//if(direction === "right" && selection.atEnd === true) {
			if(direction === "right") {
				var $next = $cell.next();
				if(self.state.hasFixColumn && !$next.length && $cell.hasClass('cell-fixcol')) {
					var $row = $cell.parent();
					$next = self.$tablebody.children().eq($row.index()).children().eq($cell.index()+1);
				}else if($cell.hasClass('lastcell')) {
					var $row = $cell.parent();
					if(self.state.hasFixColumn) {
						$row = self.state.$fixcolbody.children().eq($row.index()+1);
					} else {
						$row = $row.next();
					}
					if($row.length) {rowchange = true;}
					$next = $row.children().eq(0);
				}
				$focustarget = $next;
				//} else if(direction === "left" && selection.atStart === true) {
			} else if(direction === "left") {
				var $prev = $cell.prev();
				if(self.state.hasFixColumn &&!$cell.hasClass('cell-fixcol') && $prev.hasClass('cell-fixcol')) {
					var $row = $cell.parent();
					$prev = self.state.$fixcolbody.children().eq($row.index()).children().eq($cell.index()-1);
					self.$scroller.scrollLeft(0);
				} else if($cell.index() === 0) {
					var $row = $cell.parent();
					if(self.state.hasFixColumn) {
						var eq = $row.index()-1;
						if(eq >= 0) {
							$row = self.$tablebody.children().eq(eq);
						} else {
							$row = $();
						}
					} else {
						$row = $row.prev();
					}
					if($row.length) {rowchange = true;}
					$prev = $row.children().eq(-1);
				}
				$focustarget = $prev;
			} else if(direction === "up") {
				var eq = $cell.index();
				$focustarget = $cell.parent().prev().children().eq(eq);
				if(self.state.hasFixColumn && $cell.hasClass('cell-fixcol')) {

				}
				if($focustarget.length) {rowchange = true;}
			} else if(direction === "down") {
				var eq = $cell.index();
				$focustarget = $cell.parent().next().children().eq(eq);
				if(self.state.hasFixColumn && $cell.hasClass('cell-fixcol')) {

				}
				if($focustarget.length) {rowchange = true;}
			}
			if($focustarget) {
				var proceed = true;
				if(rowchange && self.option.rowInlineEdit) {
					var ended = self.endEdit({_index:{id:dataid}});
					if(ended === false) {
						proceed = false;
					}
				}
				if(proceed) {
					$focustarget.focus();
					if($focustarget.attr('contentEditable')) {
						_placeCaretAtEnd($focustarget[0]);
					}
					e.preventDefault();
				}
			}
		}
	};
	AlopexGrid.prototype._cellEditUpdate = function(cell, dataid, key, e) {
		var self = this;
		var mapping = null;
		var data = null;
		var dataIndex = null;
		//var row = null;
		if($.isPlainObject(dataid) && dataid._index.id) {
			data = dataid;
			dataid = data._index.id;
			dataIndex = data._index.data;
		}
		while (!cell.attributes["data-alopexgrid-columnindex"]) {
			cell = cell.parentNode;
			if (!cell) {
				return;
			}
		}
		// if(!_valid(dataid) && cell) {
		// 	row = cell.parentNode;
		// 	dataid = row.attributes['data-alopexgrid-dataid'].value;
		// }

		if(!_valid(dataid)) return;

		if(!data) {
			// $.each(self.state.data, function (idx, dat) {
			// 	if (dat._index.id === dataid) {
			// 		data = dat;
			// 		dataIndex = data._index.data;
			// 		return false;
			// 	}
			// });
			data = self.state.data[self.state.dataIdToIndexMap[dataid]];
			dataIndex = data._index.data;
		}

		if (!data) {
			return;
		}
		if (key === undefined || key === null || typeof key === "number") {
			var columnIndex = typeof key === "number" ? key : cell.attributes['data-alopexgrid-columnindex'].value;
			if (columnIndex === undefined || columnIndex === null) {
				return;
			}
			columnIndex = Number(columnIndex);
			//mapping = _getMappingByQuery(self.option.columMapping, {columnIndex:columnIndex}, self, data);
			mapping = _getMappingFromColumnIndex(self, columnIndex);
		} else if (typeof key === "object" && key.hasOwnProperty('columnIndex')) {
			mapping = key;
		} else if (typeof key === "string") {
			mapping = _getMappingByQuery(self.option.columnMapping, {key:key}, self, data);
		}
		if (mapping && mapping.editable) {
			if($.isFunction(mapping.allowEdit)) {
				var result = self._evaluateAllowEdit(data, mapping);
				if(result === false) return;
			}
			if (processMappingValidate(mapping)) {
				//TODO validate()와 getErrorMessage()를 사용하여 메세지 처리 및 핸들러 호출
				var $input = getValidatoredInput.call(self, cell, mapping);
				if ($input) {
					//validate()를 $(cell)에 대해 수행하고 에러 여부를 검출한 뒤 핸들러를 호출한다.
					var errorMessage = $input.getErrorMessage() || [];
					var valid = !($.isArray(errorMessage) && errorMessage.length);
					processValidateChange.call(self, mapping, valid, errorMessage, cell, $input.val(), e);
				}
			}

			//var prevData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
			var extractedValue = _extractValue.call(self, mapping, $(cell), data);
			//var newData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
			var refreshed = [];
			if(self._isEditingCell(data._index.rendered, mapping.columnIndex)) {
				self.state.editingCellInfo["value"] = extractedValue;
			} else {
				data._state.recent = data._state.recent || {};
				var prevValue = data._state.recent.hasOwnProperty(mapping.key) ?
					data._state.recent[mapping.key] : data[mapping.key];

				var prevData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
				var value = data._state.recent[mapping.key] = extractedValue;
				var newData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
				if(prevValue !== value) {
					if(self.option.mergeEditingImmediately) {
						if(!data._state._beforeEditing) {
							data._state._beforeEditing = AlopexGrid.trimObject(data);
						}
						if(!data._state.edited) {
							data._original = AlopexGrid.trimObject(data);
							self.rowElementGet(data).addClass('edited');
							data._state._beforeEditing._state = {edited:false};
						}
						data[mapping.key] = value;
						if(self.option.fullCompareForEditedState) {
							data._state.edited = false;
							if(data._original) {
								$.each(data._original, function(k,v){
									if(v !== data[k]) {
										data._state.edited = true;
										return false;
									}
								});
							}
						} else {
							data._state.edited = true;	
						}
					}
					//refresh other columns which are depend on this column
					for(var j=0;j<self.option.columnMapping.length; j++) {
						var targetmapping = self.option.columnMapping[j];
						if(!_valid(targetmapping.columnIndex) || !$.isPlainObject(targetmapping)) continue;
						if(Number(targetmapping.columnIndex) === Number(mapping.columnIndex)) continue;
						if(targetmapping.hasOwnProperty('refreshBy')) {
							var doit = false;
							var cond = targetmapping.refreshBy;
							if(cond === true) {
								doit = true;
							}
							else if(typeof cond === "string" && cond === mapping.key) {
								doit = true;
							}
							else if($.isArray(cond)
								&& ($.inArray(mapping.key, cond)>=0
									|| $.inArray(Number(mapping.columnIndex), cond)>=0)
								) {
								doit = true;
							}
							else if($.isFunction(cond)) {
								var op = {};
								op["prevData"] = prevData;
								op["newData"] = newData;
								op["_key"] = targetmapping.key;
								op["_column"] = targetmapping.columnIndex;
								op["_index"] = $.extend({}, data._index);
								op["mapping"] = targetmapping;
								op["done"] = function() {
									var $cell = self.refreshCell({_index:{data:this._index.data}}, this._column);
									$.isFunction(this["_done"]) ? this["_done"]() : null;
									$cell ? $cell.find('input,select,textarea').trigger('change') : null;
									this.complete = true;
								};

								var res = cond.call(op, prevData, newData, targetmapping,
									(function(worker){
										return function(){worker.done();};
									})(op));
								if(res === true) {
									doit = true;
								} else if(res === "async") {
									(function(worker){
										if(!worker.complete) {
											self._showProgress(function(done){
												worker["_done"] = done;
											},0,true);
										}
									})(op);
								}
							}
							if(doit) {
								var $cell = self.refreshCell({_index:{data:dataIndex}}, targetmapping.columnIndex);
								refreshed.push(targetmapping.columnIndex);
								$cell ? $cell.find('input,select,textarea').trigger('change') : null;
							}
						}
					}
					//refresh pinned cell or row
					if(self._hasPinnedData(data._index.id)) {
						if(String(cell.className).indexOf('pinnedcell') >= 0) {
							self.refreshCell({_index:{id:data._index.id}},mapping.columnIndex);
						} else {
							self._pinnedRefresh(data._index.id);
						}
					}
				}
				if (self.state.columnRowspanned && self.option.rowspanGroupEdit && self.state.rowspanindex[Number(mapping.columnIndex)]) {
					//span된 값을 동일 범위 key에 배포한다.
					var rindex = _rowspanned(self.state.rowspanindex[Number(mapping.columnIndex)], dataIndex, true);
					if (rindex) {
						for (var i = rindex.from; i < rindex.to; i++) {
							if(!self.state.data[i]._state.editing) continue;
							self.state.data[i]._state.recent = self.state.data[i]._state.recent || {};
							self.state.data[i]._state.recent[mapping.key] = value;

							if(mapping.rowspan && refreshed.length && i !== dataIndex && $.inArray(i, refreshed)>=0) {
								//만일 수정된 컬럼이 span되있다면 연결될 수 있는 다른 row를 리프레시한다.
								self.refreshRow({_index:{data:i}});
							}
						}
					}
				}
				if(self.state.groupRowspanned && self.option.rowspanGroupEdit) {
					// var lookupTable = self.state.groupingLookupTable;
					// var key = mapping.key;
					// var lookupTableItem = lookupTable[key] || {};
					// var lookupItem = lookupTableItem[dataIndex];
					//TODO 현재 셀이 rowspan을 하고 있는 범위의 key를 추출해야 한다.
					var lookupItem = self._getGroupingRangeByMapping(dataIndex, mapping);
					if(lookupItem) {
						for(var i=lookupItem.from; i<=lookupItem.to;i++) {
							if(!self.state.data[i]._state.editing) continue;
							self.state.data[i]._state.recent = self.state.data[i]._state.recent || {};
							self.state.data[i]._state.recent[mapping.key] = value;

							if(self.option.mergeEditingImmediately) {
								if(!self.state.data[i]._state._beforeEditing) {
									self.state.data[i]._state._beforeEditing = AlopexGrid.trimObject(self.state.data[i]);
								}
								if(!self.state.data[i]._state.edited) {
									self.state.data[i]._original = AlopexGrid.trimObject(self.state.data[i]);
									self.rowElementGet(self.state.data[i]).addClass('edited');
									self.state.data[i]._state._beforeEditing._state = {edited:false};
								}
								self.state.data[i][mapping.key] = value;
								self.state.data[i]._state.edited = true;
							}
						}
					}
				}
			}
			
		}
	};
	AlopexGrid.prototype._evaluateAllowEdit = function(data, mapping) {
		var self = this;
		var result = mapping.allowEdit !== false;
		if($.isFunction(mapping.allowEdit)) {
			var targetData = data;
			if(self.option.evaluateAllowEditWithMergedData && data._state.editing) {
				targetData = $.extend({}, targetData, data._state.recent);
			}
			result = mapping.allowEdit(targetData[mapping.key], targetData, mapping);
		}
		return result;
	}
	AlopexGrid.prototype._allowEditProcess = function(row, dataidindex) {
		var self = this;
		if (!self.state.hasAllowEdit) {
			return;
		}
		var $row = row.jquery ? row : $(row);
		var $cells = $row.children();
		var dataIndex = Number($row.attr('data-alopexgrid-dataindex'));
		self._refreshEditableCell(dataIndex, $row);
		var data = self._getRecentData(dataIndex);
		for ( var i in self.option.columnMapping) {
			var mapping = self.option.columnMapping[i];
			if (!mapping.allowEdit) {
				continue;
			}
			var key = mapping.key;
			var value = data[key];
			var $cell = $cells.filter('[data-alopexgrid-columnindex="' + mapping.columnIndex + '"]');
			if(!$cell.length) continue;
			var rendered = null;
			if (typeof mapping.allowEdit == "function") {
				var result = self._evaluateAllowEdit(data, mapping);
				if (!result && $cell.hasClass('allow-valid')) {
					//invalid로 격하 - render를 적용
					rendered = self._cellRender(data, $.extend(true, {}, mapping, {
						editable: false
					}), {
						styleclass: "allow-invalid"
					});
				} else if (result && $cell.hasClass('allow-invalid')) {
					//valid로 격상 - editable을 적용
					rendered = self._cellRender(data, mapping, {
						styleclass: "allow-valid"
					});
				}
			}
			if (rendered) {
				$cell.replaceWith(_convertAlopex.call(self, rendered));
			}
		}
	};

	function _wheelScrollOverrideHandler(e) {
		var self = e.data.self;
		var $scroller = self.$scroller;
		//if(!self.state.hasVerticalScrollBar) return;
		var org = $scroller.scrollTop();
		var deltaY = 0;
		if(wheelEventName === "mousewheel") {
			deltaY = -1 * e.originalEvent.wheelDelta;
		} else {
			deltaY = e.originalEvent.deltaY;
		}
		var scrollTo = org + (deltaY);
		if(isNaN(scrollTo) || !deltaY) return;
		$scroller.scrollTop(scrollTo);
		if(org !== $scroller.scrollTop()) e.preventDefault();
	}

	AlopexGrid.prototype.viewEventUpdate = function(data) {
		var self = this;
		var $r = self.$root;
		var $table = self.$table;
		var $wrapper = self.$wrapper;
		var $scroller = self.$scroller;
		var $scrollpanel = self.$scrollpanel;
		var option = self.option;
		var $document = $(document).off('.alopexgridevent'+self.key);
		$r.off('.alopexgridevent');
		self.$title.off('.alopexgridevent');
		self.$pager.off('.alopexgridevent');
		$wrapper.off('.alopexgridevent');
		$scroller.off('.alopexgridevent');
		$scrollpanel.off('.alopexgridevent');
		self.$overridewrapper.off('.alopexgridevent');

		var delegate = [{
			target: "cell",
			delegate: ".bodycell"
		}, {
			target: "row",
			delegate: ".bodyrow"
		}, {
			target : "headercell",
			delegate : ".headercell"
		},{
			target : "headerrow",
			delegate : ".headerrow"
		}];
		$.each(delegate, function(idx, elem) {
			if (option.on && option.on[elem.target]) { //on.cell
				$.each(option.on[elem.target], function(type, handle) { //on.cell.click
					$wrapper.on((self.option.eventMapping[type] || type) + '.alopexgridevent', elem.delegate, function(e, e2) {
						var handler = typeof handle == "function" ? [handle] : handle;
						var data = null;
						var $row = e.target.tagName === 'TR' ? $(this) : $(e.target).parentsUntil($wrapper, '.row').eq(0);
						if ($row.hasClass("emptyrow")) {
							return;
						}
						//TODO _index.row 가 virtual scrolling이 적용되었을 땐 어떻게 취급되어야 하는가?
						var dataIndex = $row.attr('data-alopexgrid-dataindex');
						if(dataIndex === undefined || dataIndex === null) {
							data = {};
							var columnIndex = this.getAttribute('data-alopexgrid-columnindex');
							if(columnIndex !== undefined && columnIndex !== null) {

								data["_index"] = {"column":columnIndex};
								var k = this.getAttribute('data-alopexgrid-key');
								if(k) {
									data["_key"] = k;
								} else {
									$.each(self.option.columnMapping, function(idx, elem) {
										if (elem.hasOwnProperty('columnIndex') && Number(elem.columnIndex) === Number(columnIndex)) {
											data["_key"] = elem.key;
											return false;
										}
									});
								}
							}
						} else {
							dataIndex = Number(dataIndex);
							//var rowIndex = $rows.index($row);
							var columnIndex = this.getAttribute('data-alopexgrid-columnindex');
							if ((self.state.data[dataIndex]._state.editing || $row.hasClass("editing")) && self.option.getEditingDataOnEvent ) {
								self._refreshEditableCell(dataIndex, $row);
								data = self._getRecentData(dataIndex);
								//data = $.extend({},self.dataGetByIndex({"element":this}), data);
								data = $.extend(true, {}, self.state.data[dataIndex], data);
							} else {
								//data = self.dataGetByIndex({"element" : this});
								data = $.extend(true, {}, self.state.data[dataIndex]);
								if (!data || !(data._index.data >= 0)) {
									data = self.dataGetByIndex({
										"element": self._findClonePair(this)
									});
								}
							}
							var rowIndex = $.inArray(dataIndex, self.state.rendered);
							if (rowIndex >= 0) {
								data._index.row = rowIndex;
							}
							if (columnIndex !== null && columnIndex !== undefined) {
								data._index.column = Number(columnIndex);
								var k = this.getAttribute('data-alopexgrid-key');
								if(k) {
									data._key = k;
								} else {
									$.each(self.option.columnMapping, function(idx, elem) {
										if (elem.hasOwnProperty('columnIndex') && Number(elem.columnIndex) === Number(columnIndex)) {
											data._key = elem.key;
											return false;
										}
									});
								}
							}
						}
						if(data.hasOwnProperty('_key')) {
							data._key = data._key || undefined;
						}
						//var $cell = $(e.target).hasClass(".cell") ? $(e.target) : $(e.target).parents(".cell").eq(0);
						for ( var j in handler) {
							var h = handler[j];
							//TODO editing기능. handler의 리턴값을 인식하거나, 또는 두번째 파라메터에 data만 받는 편집함수를 넣어서
							//자동으로 state.data에 반영되도록 한다(index는 내부에서 알아서 핸들)
							h.call(this, data, e, e, e2);
						}
					});
				});
			}
		});

		if(self.option.highlightLastAction) {
			var end = isMobile ? 'touchend' : 'click';
			var lastActionRowClass = self.option.lastActionRowClass;
			var lastActionCellClass = self.option.lastActionCellClass;
			self.$root
				.on(end+'.alopexgridevent','.bodycell', function(e){
					var $cell = $(this);
					if(_valid(self.state.lastActionRowId) && _valid(self.state.lastActionColumnIndex)) {
						var $body = self.$tablebody;
						if(self.state.hasFixColumn) {
							$body = $body.add(self.state.$fixcolbody);
						}
						$body
							//.children('[data-alopexgrid-dataid="'+self.state.lastActionRowId+'"]')
							.children('.'+self.state.lastActionRowId)
							.removeClass(lastActionRowClass)
							.children('[data-alopexgrid-columnindex="'+self.state.lastActionColumnIndex+'"]')
							.removeClass(lastActionCellClass);
					}
					$cell.addClass(lastActionCellClass);
					var ci = $cell.attr('data-alopexgrid-columnindex');
					if(_valid(ci)) {
						self.state.lastActionColumnIndex = Number(ci);
					} else {
						delete self.state.lastActionColumnIndex;
					}

					var $row = $cell.parent();
					$row.addClass(lastActionRowClass);
					if(self.state.hasFixColumn) {
						var $cloned = self._findClonePair($row);
						if($cloned && $cloned.length) {
							$cloned.addClass(lastActionRowClass);
						}
					}
					var rid = $row.attr('data-alopexgrid-dataid');
					if(_valid(rid)) {
						self.state.lastActionRowId = rid;
					} else {
						delete self.state.lastActionRowId;
					}
				});
		}

		if(isAlopexMobile) {
			//TODO Event Module Refinement
			var start = isMobile ? 'touchstart' : 'mousedown';
			var move = isMobile ? 'touchmove' : 'mousemove';
			var end = isMobile ? 'touchend' : 'mouseup';
			var cancel = isMobile ? 'touchcancel' : 'mouseup';
			var ns = '.gridtapworkaround';
			function getx(e) {
				return isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
			}
			function gety(e) {
				return isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
			}
			function dist(x1,y1,x2,y2) {
				return ((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2));
			}
			function distTap(o) {
				return dist(o.x,o.y,o.x2,o.y2);
			}
			$r.off(ns).on(start+ns,function(e) {
				self.state._tap = {
					target:e.target,
					x:getx(e),
					y:gety(e),
					x2:getx(e),
					y2:gety(e),
					timestamp:new Date().getTime()
				};

				$(window).off(ns)
					.on(move+ns,function(e) {
						if(!self.state._tap) return;
						self.state._tap.x2 = getx(e);
						self.state._tap.y2 = gety(e);
					})
					.on(end+ns,function(e) {
						if(self.state._tap && self.state._tap.target === e.target) {
							if(distTap(self.state._tap) < 25 && new Date().getTime()-self.state._tap.timestamp < 750) {
								$(e.target).parents().add(e.target).filter('[data-gridtap]').each(function(){
									var attrhandler = $(this).attr('data-gridtap');
									if(attrhandler) {
										var func = new Function('event',attrhandler);
										func.call(this,e);
									}
								});
							}
						}
						self.state._tap = null;
						$(window).off(ns);
					})
					.on(cancel+ns, function(e) {
						self.state._tap = null;
						$(window).off(ns);
					});
			});
		}
		if(self.option.enableKeyboardEdit) {
			var preventStartTimer = null;
			function preventStart (duration){
				if(preventStartTimer) {
					clearTimeout(preventStartTimer);
				}
				preventStartTimer = setTimeout(function(){
					preventStartTimer = null;
				},duration);
			}
			function allowed(){
				return preventStartTimer === null;
			}
			$document.off('.alopexgrideventcopypaste'+self.key);
			//isIE ? $document.on('beforepaste.alopexgrideventcopypaste'+self.key, function(e){return false;}) : +0;
			//$document.on('beforecopy.alopexgrideventcopypaste'+self.key, function(e){return false;});
			$document.on('copy.alopexgrideventcopypaste'+self.key,function(e) {
				var $cell = $(document.activeElement);
				var $grid = $cell.closest('.alopexgrid');
				if($grid.attr('data-alopexgrid') === self.key && $cell.length && $cell.attr('data-alopexgrid-columnindex')) {
					self._cellCopy($cell, e);
				}
			});
			$document.on('paste.alopexgrideventcopypaste'+self.key,function(e) {
				var $cell = $(document.activeElement);
				var $grid = $cell.closest('.alopexgrid');
				if($grid.attr('data-alopexgrid') === self.key && $cell.length && $cell.attr('data-alopexgrid-columnindex')) {
					self._cellPaste($cell, e);
				}
			});
			$document.on('keyup.alopexgrideventcopypaste'+self.key, function(e) {
				if(e.which === 27) {//esc
					if(AlopexGrid.clipboard["elements"] && AlopexGrid.clipboard["elements"].length) {
						AlopexGrid.clipboard["elements"].removeClass('copied');
						AlopexGrid.clipboard["elements"] = $();
					}
					AlopexGrid.clipboard["text"] = null;

					var $act = $(document.activeElement);
					var $cell = $act.attr('data-alopexgrid-columnindex') ? $act : $act.closest('.cell');
					if($cell.length && $cell.attr('data-alopexgrid-columnindex')) {
						var $row = $cell.parent();
						var $grid = $cell.closest('.alopexgrid');
						if($grid.attr('data-alopexgrid') !== self.key) return;
						var dataid = $row.attr('data-alopexgrid-dataid');
						var _inst = _instance($grid);
						var fi = _inst._focusInfo($cell, $row);
						if($row.hasClass('editing')) {
							_inst.endEdit({_index:{id:dataid}});
						}
						_inst._focusRestore(fi);
					}
				} else if (e.which === 13) {//enter
					var $act = $(document.activeElement);
					var $cell = $act.attr('data-alopexgrid-columnindex') ? $act : $act.closest('.cell');
					if($cell.length && $cell.attr('data-alopexgrid-columnindex')) {
						var $row = $cell.parent();
						var $grid = $cell.closest('.alopexgrid');
						if($grid.attr('data-alopexgrid') !== self.key) return;
						var dataid = $row.attr('data-alopexgrid-dataid');
						var _inst = _instance($grid);
						var fi = _inst._focusInfo($cell, $row);
						if($row.hasClass('editing')) {
							$act.trigger('change').blur();
							_inst.endEdit({_index:{id:dataid}});
							preventStart(150);
						} else if(allowed()) {
							var go = true;
							if(_inst.option.rowInlineEdit) {
								$act.trigger('change').blur();
								go = _inst.endEdit();
							}
							if(go !== false) {
								_inst.startEdit({_index:{id:dataid}});
							}
						}
						var $focused = _inst._focusRestore(fi);
						if($focused.attr('contentEditable')) {
							_placeCaretAtEnd($focused[0]);
						}
					}
				}
			});
			$document.on('keypress.alopexgrideventcopypaste'+self.key,'.bodycell', function(e){
				if(this !== document.activeElement || e.which === 13) {
					if(e.which === 13) return false;
					return;
				}
				var $inputs = $(this).find('input');
				if($inputs.length) {
					$inputs.focus();
				}
			});
		}

		$(document).off('.alopexgrideventinineedit'+self.key);
		if (option.rowInlineEdit) {
			var ev = $.type(option.rowInlineEdit)=="string" ? option.rowInlineEdit : 'dblclick';
			if(isAlopexMobile) ev = 'doubletap';
			$wrapper.on('click.alopexgridevent', '.row', function(e, click) {
				if (self._noData()) {
					return;
				}
				if (!e.target || !e.target.parentNode) {
					return;
				}
				var $row = $(this);
				if ($row.hasClass("editing")) {
					return;
				}
				self._endEditAllIfEditingExist();
			});
			$wrapper.on('click.alopexgridevent', function(e) {
				if(e.target === e.currentTarget) {
					//빈공간이 클릭되었을 때
					self._endEditAllIfEditingExist();
				}
			});
			if(option.endInlineEditByOuterClick) {
				//TODO 외부클릭이라는 행위를 jquery 기반의 이벤트로 구현할 수 있다.
				//이때엔 $(grid).on('outsideclick', function(e){endEdit;}) 같은
				//형식으로 처리를 할 수 있게 된다.
				$(document).on('click.alopexgrideventinineedit'+self.key,function(e){
					var $target = $(e.target);
					var $chain = $target.add($target.parents());
					if($chain.filter('.alopexgrid')[0] === self.$root[0]) {
						return;
					}//check only if area outside the grid is clicked
					if($chain.filter('input,select,button,textarea,a').length) {
						return;
					}//clicking on control elements should not end editing mode.
					self._endEditAllIfEditingExist();
				});
			}
			self.$title.on('click.alopexgridevent', function(e) {
				if (self._noData()) {
					return;
				}
				self._endEditAllIfEditingExist();
			});
			self.$pager.on('click.alopexgridevent', function(e) {
				if (self._noData()) {
					return;
				}
				self._endEditAllIfEditingExist();
			});
			$wrapper.on(ev + '.alopexgridevent', '.bodyrow', function(e) {
				var data = self.dataGetByIndex({
					"element": this
				});
				var $row = $(e.target).parentsUntil($r).filter(".row");
				var incell = !!$row.length;
				if (e.target.tagName == "INPUT") {
					return;
				}
				if ($row.hasClass("emptyrow")) {
					return;
				}
				if (incell && data._state && data._state.editing) {
					self.endEdit();
					clearSelection();
					return;
				}
				if (!self.state.data || !self.state.data.length) {
					return;
				}
				self.endEdit();
				if (data && (!data._state || !data._state.editing)) {
					setTimeout(function(){self.startEdit(data);},0);
				}
				clearSelection();
			});
		}//option.rowInlineEdit
		if(self.option.cellInlineEdit) {
			$wrapper.on('dblclick.alopexgridevent', '.bodycell', {self:self},function(e){
				var self = e.data.self;
				var $cell = $(this);
				if($cell.hasClass('editingcell')) return;
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				self._endCellEdit();
				self._startCellEdit(renderedIndex, columnIndex);
				locateCellForPosition(self, renderedIndex, columnIndex).find('input,select,textarea').focus();
			});
			$wrapper.on('mousedown.alopexgridevent', '.bodycell', {self:self},function(e){
				var self = e.data.self;
				var $cell = $(this);
				if($cell.hasClass('editingcell')) {
					return;
				}
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				self._endCellEdit();
				setFocusFixture(self, renderedIndex, columnIndex);
			});
			$wrapper.on('keydown.alopexgridevent','.bodycell',{self:self}, function(e){
				var self = e.data.self;
				var $cell = $(this);
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				var isEditingCell = self._isEditingCell(renderedIndex, columnIndex);
				if(isEditingCell) {
					if(e.which === 27) { //esc
						self._cancelCellEdit();
						setFocusFixture(self, renderedIndex, columnIndex);
					} else if(e.which === 13 && !e.altKey) { //enter
						self._endCellEdit();
						setFocusFixture(self, renderedIndex, columnIndex);
						changeCellFocusByIncrement(self, (e.shiftKey ? -1 : 1),0);
					} else if(e.which === 9) {
						self._endCellEdit();
						setFocusFixture(self, renderedIndex, columnIndex);
						changeCellFocusByIncrement(self, 0, (e.shiftKey ? -1 : 1));
					}
				} else {
					if(e.which === 113) { //f2
						self._startCellEdit(renderedIndex, columnIndex);
						setFocusFixture(self, renderedIndex, columnIndex);
					}
				}
			});
		}//cellInlineEdit
		self._startCellSelectEngine(self.option.cellSelectable);

		self._enableDragDrop(!!self.option.useDragDrop);

		if(self._shouldScrollBeOverridden()) {
			$scroller.on(wheelEventName+'.alopexgridevent', {self:self}, _wheelScrollOverrideHandler);
			self.$overridewrapper
				.on(wheelEventName+'.alopexgridevent', {self:self}, _wheelScrollOverrideHandler)
				//fix scroll caused by tab
				.on('scroll.alopexgridevent',{self:self}, function(e){
					var self = e.data.self;
					var scrollTop = this.scrollTop;
					var scrollLeft = this.scrollLeft;
					var scrollerTop = self.$scroller.scrollTop();
					var scrollerLeft = self.$scroller.scrollLeft();
					if(scrollTop) {
						self.$scroller.scrollTop(scrollerTop + scrollTop);
					}
					if(scrollLeft) {
						self.$scroller.scrollLeft(scrollerLeft + scrollLeft);
					}
					// this.scrollLeft = 0;
					// this.scrollTop = 0;
				});
			$scroller.on('scroll.alopexgridevent',{self:self,lastTop:0,lastLeft:0}, function(e){
				var self = e.data.self;
				var bodytopComp = self.option.fixcolumnTopCompensate || 0;
				var vscrollTop = Number(self.$table.attr('data-vscroll-top')) || 0;
				var top = (-this.scrollTop-bodytopComp+vscrollTop);
				var left = -this.scrollLeft;
				var css = {"transform":""};
				var prop = 0;

				if(isIE<9) {
					if(top !== e.data.lastTop) {
						(css["top"] = top+'px');
						prop++;
					}
					if(left !== e.data.lastLeft) {
						(css["left"] = left+'px');
						prop++;
					}
				} else {
					css["top"] = "0px";
					css["left"] = "0px";
					css["transform"] = 'translateY('+top+'px) translateX('+left+'px)';
					prop++;
				}
				if(prop) {
					self.$table.css(css);
					self.$overridewrapper.prop({scrollLeft:0,scrollTop:0});
				}
				e.data.lastTop = top;
				e.data.lastLeft = left;
			});
		}

		if(self.option.useTabindexOnEditable === 'dynamic') {
			$document.on('click.alopexgridevent'+self.key,{self:self},function(e){
				var self = e.data.self;
				//if(!self.state.hasFixColumn) return;
				if($(e.target).closest('.alopexgrid').attr('data-alopexgrid') === self.key) {
					if(!self.state.__dynamicEditableTabindexPopulated) {
						self.state.__dynamicEditableTabindexPopulated = true;
						self._populateEditableTabindex();
					}
				} else {
					if(self.state.__dynamicEditableTabindexPopulated) {
						self.state.__dynamicEditableTabindexPopulated = false;
						self._populateEditableTabindex(false);
					}
				}
			});
		}

		//scroll got lost when back tabbing
		self.$wrapper.on('focus.alopexgridevent', 
			'input,select,textarea,td', {self:self}, function(e){
				var self = e.data.self;
				var $input = $(this);
				var $cell = $input.closest('.bodycell');
				if(!$cell.length) return;
				var later = (function(self, $cell){
					return function(){
						var inputpos = $cell.position();
						if(!$cell.hasClass('cell-fixcol')) {
							var leftOffset = self.state.hasFixColumn ? self.state.$fixcolwrap.width() : 0;
							var inputleft = inputpos.left;
							var scrollLeft = self.$scroller.scrollLeft();
							var diff = (inputleft - (scrollLeft+leftOffset));//behind scroll area
							if(diff < 0 && scrollLeft > 0) {
								self.$scroller.scrollLeft(_max(scrollLeft + diff,0));
							}
							if(diff >= self.$scroller.prop('clientWidth'))
								self.$scroller.scrollLeft(scrollLeft + diff);
						}

						var scrollTop = self.$scroller.scrollTop();
						var inputtop = inputpos.top;
						var tableScrollTop = (self.state.hasFixColumn && $cell.hasClass('cell-fixcol')) ? 
							(-self.state.$fixcoltable.position().top) : 
							(self._shouldScrollBeOverridden() ? -self.$table.position().top : scrollTop);
						if(inputtop - tableScrollTop < 0) {
							self.$scroller[0].scrollTop += (inputtop - tableScrollTop);
						}
					};
				})(self,$cell);
				setTimeout(later,0);
		});

		//*
		self.$scroller.off('.alopexgridvscroll'+self.key);
		$window.off('.alopexgridvscroll'+self.key);
		if(option.virtualScroll) {
			var $target = option.height ? self.$scroller : $window;
			_scrollHack($target,'.alopexgridvscroll'+self.key);
			$target.on('scroll.alopexgridvscroll'+self.key, {self:self,lastLeft:-1,lastTop:-1},function(e) {
				var self = e.data.self;
				var scrollLeft = this.scrollLeft;
				var scrollTop = this.scrollTop;
				//TODO time 뿐만 아니라 이동 가속도를 감지하여 가상스크롤 로직을 refresh한다.
				//천천히 움직이게 되면 계속 타이머가 클리어되서 중간중간 렌더링 되었어도 충분할 상황들이
				//버려지게 된다. 
				//단순구현 : 이벤트발생 1회에 50픽셀 미만으로 움직이면 타이머를 클리어하지 않는다.
				if(self.state._vscrollTimerTop && Math.abs(scrollTop-e.data.lastTop) > 60) {
					clearTimeout(self.state._vscrollTimerTop);
					self.state._vscrollTimerTop = null;
				}
				if(self.state._vscrollTimerLeft && Math.abs(scrollLeft-e.data.lastLeft) > 50) {
					clearTimeout(self.state._vscrollTimerLeft);
					self.state._vscrollTimerLeft = null;	
				}
				e.data.lastLeft = scrollLeft;
				e.data.lastTop = scrollTop;

				self.state._vscrollTimerLeft = setTimeout(function(){
					var scrollLeft = self.$scroller.scrollLeft();
					if(self.state._vspLastLeft === scrollLeft) return;
					self.state._vspLastLeft = scrollLeft;
					if(self._noData()) {
						return;
					}
					var hscroll = self._hscrollInfo();
					self.$tablebody.children().each(function(){
						return self._manipulateRowForVirtualHScroll(this, {hscroll:hscroll});
					});
					// if(isCellSelectionAvailable(self)) {
					// 	restoreFocusForCellSelection(self);
					// }
					self.state._vscrollTimerLeft = null;
				},self.option.virtualScrollDelay);
				self.state._vscrollTimerTop = setTimeout(function(){
					var scrollTop = self.option.height ? self.$scroller.scrollTop() : $window.scrollTop();
					if(self.state._vspLastTop === scrollTop) return;
					self.state._vspLastTop = scrollTop;
					if(self._noData()) {
						return;
					}
					var vscroll = self._vscrollInfo();
					var rowPaddingVal = $.isNumeric(self.option.rowPadding) ? self.option.rowPadding : self.option.paging.perPage;
					if(vscroll && !(self.option.rowPadding && self.state.data.length < rowPaddingVal)) {
						var $c = self.$tablebody.children('.bodyrow');
						var prevRenderedStart = self.state.vscrollRenderedStart;
						var prevRenderedEnd = self.state.vscrollRenderedEnd;
						self.state.vscrollRenderedStart = vscroll["startIndex"];
						self.state.vscrollRenderedEnd = vscroll["endIndex"];
						var hscroll = self._hscrollInfo();
						var isUp = vscroll["startIndex"] < prevRenderedStart; //위쪽으로 새로 생성되는 row가 있다.
						var isDown = prevRenderedStart < vscroll["startIndex"]; //위쪽으로 삭제되는 row가 있다. 맨 위의 row를 refresh한다.
						// var from = [Number($c.eq(0).attr('data-alopexgrid-dataindex'))
						// 	,Number($c.eq(-1).attr('data-alopexgrid-dataindex'))+1];
						var from = [prevRenderedStart, prevRenderedEnd+1]; 
						var to = [vscroll["startIndex"], vscroll['endIndex']+1];
						if(false && (from[1] < to[0] || to[1] <= from[0])) { //그려지는 범위에서 완전히 벗어남
							self._dataDraw();
							self.viewUpdate();
						} else {
							refreshVscrollBody(self.$tablebody, $c, null, self, vscroll, from, to, {"hscroll":hscroll});//to get full rowheight, render full row cells.
							self.$table.attr('data-vscroll-top', vscroll["paddingTopHeight"])
							//XXX totalHeight를 그냥 설정하면 실제 스크롤이 꼬여버림.
							self._tableSpacing(
								vscroll["paddingTopHeight"], 
								self._shouldScrollBeOverridden() ? self._renderedBodyHeight() : null, 
								vscroll["paddingBottomHeight"]);
							//TODO newtop can go wrong
							var newtop = self.option.height ? (-vscroll["scrollTop"]+vscroll["paddingTopHeight"])
									: vscroll["paddingTopHeight"];
							if(self._shouldScrollBeOverridden()) {
								(isIE<9) ? self.$table.css('top',newtop+"px") : self.$table.css('transform','translate(-'+self.$scroller.scrollLeft()+'px,'+newtop+'px)');
							}
							if(self.state.hasFixColumn) {
								if(option.floatingHeader===false) newtop += self.state.scrollerTopMargin;
								var $fbody = self.state.$fixcoltable.children('tbody');
								var $fc = $fbody.children('.bodyrow');
								refreshVscrollBody($fbody, $fc, self.$tablebody, self, vscroll, from, to,
									{"styleclass":"cloned-row","columnLimit":self.state.fixupto,"hscroll":hscroll});
								self.state.$fixcoltable ? self.state.$fixcoltable.attr('data-vscroll-top', vscroll["paddingTopHeight"]) : "";
								if(isIE<9) {
									var css = {'top':newtop+'px','transform':''};
									self.state.$fixcoltable ? self.state.$fixcoltable.css(css) : "";
									self.state.$fixednobody ? self.state.$fixednobody.css(css) : "";
								} else {
									var css = {'top':'0px','transform':'translateY('+newtop+'px)'};
									self.state.$fixcoltable ? self.state.$fixcoltable.css(css) : "";
									self.state.$fixednobody ? self.state.$fixednobody.css(css) : "";
								}
								self.$tablebody.children().each(setRowDataHeight).data('dataAlopexGridFixColumned',true);
								self.$tablebody.find('.cell-fixcol').each(function(idx,cell){
									cell.innerHTML = '&nbsp';
									cell.removeAttribute('id');
								});//.html('&nbsp;');//.removeAttr('id');
								// setTimeout(function(){
								// 	if(self.state.$fixcolwrap) {
								// 		self.state.$fixcolwrap.css('height', self.$scroller.prop('clientHeight')+"px");
								// 	}
								// },0);
							}
						}

						if(self.state.groupRowspanned) {
							self.$wrapper.find('.cell-rowspan-column').each(function(){
								var $cell = $(this);
								var $row = $cell.parent();
								var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
								//.cell-rowspan-column은 rowspan인 경우에만 사용되므로 점검하지 않는다.
								//if(_getMappingFromColumnIndex(self, columnIndex).rowspan) {
									var rowspan = parseInt($cell.attr('rowspan'));
									var renderedIndex = $row.attr('data-alopexgrid-renderedindex');
									var rowspanData = self._rowspanValueForCell(self._getRenderedDataFromRenderedIndex(renderedIndex),
										_getMappingFromColumnIndex(self, columnIndex));
									if(rowspanData.rowspanned) $cell.remove();
									if(rowspanData.rowspan !== rowspan) $cell.attr('rowspan', rowspanData.rowspan);
								//}
							});

							if(isDown) {
								// var $topmostRow = self.$tablebody.children().eq(0);
								// $topmostRow.replaceWith(
								// 	_convertAlopex.call(self, self._rowRender(self._getRenderedDataFromRenderedIndex(vscroll["startIndex"]), null, vscroll["startIndex"], {}))
								// );
							}	
						}
						// if(isCellSelectionAvailable(self)) {
						// 	restoreFocusForCellSelection(self);
						// }
					}
					if(!vscroll) {
						self.state.vscrollRenderedStart = 0;
						self.state.vscrollRenderedEnd = Math.max(self.state.rendered.length-1,0);
					}
					self.state._vscrollTimerTop = null;
				},self.option.virtualScrollDelay);
			});
		}

		var contextMenu = self.option.contextMenu;
		if(contextMenu && contextMenu.length) {
			$r.on('contextmenu.alopexgridevent',function(e){
				var data = self._getDataFromEvent(e);
				var $cell = self._getCellFromEvent(e);
				if(data) {
					data = $.extend(true, {}, data);
					data._index.column = parseInt($cell.attr('data-alopexgrid-columnindex'));
				}
				var pageX = e.pageX;
				var pageY = e.pageY;
				$('.alopexgrid-contextmenu-wrapper-'+self.key).remove();
				var $wrap = $('<div>');
				var $div = $('<div>').prop('id',_generateUniqueId()).appendTo($wrap);
				var id = _generateUniqueId();
				$wrap.css({'position':'absolute', 'left':pageX+'px', 'top':pageY+'px'});
				$wrap.prop('id', id);
				$wrap.addClass('alopexgrid-contextmenu-wrapper-'+self.key);

				var $dropdown = $('<ul data-type="dropdown">');
				function renderMenuItem(menuItem, contextMenuIndex, menuData, cell) {
					if(menuItem.use === false) return '';
					if($.isFunction(menuItem.use) && menuItem.use.call(self.$root, menuData, cell, self) === false) return '';
					if(menuItem.seperator===true) {
						return '<li class="af-group-header"><hr></li>';
					}
					var $item = $('<li>');
					var $a = $('<a>').appendTo($item);
					var title = menuItem.title;
					if($.isFunction(title)) {
						title = title.call(self.$root, menuData, cell, self);
					}
					$a.text(self.option.contextMenuTitleMapper ? self.option.contextMenuTitleMapper(title) : title);
					$a.attr('href','#');
					$a.on('click', {$grid:self.$root, gridInstance:self},function(ee){
						menuItem.processor.call(ee.data.$grid, menuData, cell, ee.data.gridInstance);
						ee.preventDefault();
					});
					return $item;
				}
				$.each(contextMenu, function(idx, menuItem) {
					$dropdown.append(renderMenuItem(menuItem, idx, data, $cell));
				});
				$dropdown.appendTo($wrap);
				$wrap.appendTo('body');
				$wrap.convert();
				$dropdown.open();
				e.preventDefault();
			});
		}
		//*/
	};
	AlopexGrid.prototype._populateEditableTabindex = function(enable){
		var self = this;
		self.state.dynamicTabindexEnabled = (enable!==false);
		self.$wrapper.find('input,select,textarea').prop('tabIndex',
			(enable===false) ? 0 : function(idx,oval){
				return (this.alopexgridTabIndex = this.alopexgridTabIndex || $(this).attr('data-tabindex'));
			}
		);
	};
	AlopexGrid.prototype._enableDragDrop = function(enable) {
		var self = this;
		var $r = self.$root;
		$r.off('.alopexgriddragevent');
		$(document).off('.alopexgriddragevent' + self.key);

		if (enable) {
			//$r.on('mousedown.alopexgriddragevent', '.table .table-body .row', dragStartHandler);
			$r.on('mousedown.alopexgriddragevent', '.bodyrow', {self:self}, dragStartHandler);

			$(document).on('mousemove.alopexgriddragevent' + self.key, {self:self}, dragProxyMoveHandler);
			$r.on('mousemove.alopexgriddragevent', {self:self}, dragMoveHandler);
			$r.on('mouseup.alopexgriddragevent', {self:self}, dragEndHandler);
			$(document).on('mouseup.alopexgriddragevent' + self.key, {self:self}, dragCancelHandler);

			$r.on('selectstart.alopexgriddragevent', function(e) {
				if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA") {
					return;
				}
				e.preventDefault();
			});
		}

		function dragStartHandler(e) {
			var self = e.data.self;
			if (AlopexGrid.dragObject || !self.option.useDragDrop || e.which !== 1) {
				return;
			}
			if (e.target.tagName == "INPUT" || e.target.tagName == "SELECT" || e.target.tagName == "TEXTAREA") {
				return;
			}
			var $row = e.target.tagName == "TR" ? $(e.target) : $(e.target).closest('.row');
			if ($row && $row.length) {
				if ($row.hasClass('emptyrow')) {
					return;
				}
				var dataIndex = Number($row.attr('data-alopexgrid-dataindex'));
				var data = self.dataGetByIndex({
					data: dataIndex
				});
				//$(document.body).append($proxy);
				AlopexGrid.dragObject = {
					enabled: false,
					$row: $row,
					key: self.key,
					data: data,
					$proxy: null,
					$indicator: null,
					startX: e.pageX,
					startY: e.pageY,
					startInstance: self
				};
			}
			//e.preventDefault();
		}
		//프록시만 이동시킨다.
		function dragProxyMoveHandler(e) {
			var self = e.data.self;
			if (!AlopexGrid.dragObject) {
				return;
			}
			if (AlopexGrid.dragObject.$proxy) {
				AlopexGrid.dragObject.$proxy.css({
					"left": (e.pageX + 5) + "px",
					"top": (e.pageY + 5) + "px"
				});
			}
			if (!AlopexGrid.dragObject.enabled && AlopexGrid.dragObject.key === self.key) {
				if ((Math.abs(e.pageY - AlopexGrid.dragObject.startY) > 25)
					|| (Math.abs(e.pageX - AlopexGrid.dragObject.startX) > 25)) {
					AlopexGrid.dragObject.enabled = true;
					var $proxy = $('<div class="alopexgrid-proxy">');
					$proxy.css({
						"position": "absolute",
						//            "width":"20px",
						//            "height":"20px",
						//            "background-color":"red",
						"left": (e.pageX + 5) + "px",
						"top": (e.pageY + 5) + "px",
						"z-index": "99999"
					});
					var clonetable = [];
					clonetable.push('<table class="table table-proxy" style="table-layout:fixed;width:',self.$table.width(),'px;">');
					clonetable.push('<colgroup>',self.$colgroup.html(),'</colgroup>');
					clonetable.push('<tbody class="table-body">');
					self.state.data[AlopexGrid.dragObject.data._index.data]._state.hovering = false;
					clonetable.push(self._rowRender(AlopexGrid.dragObject.data, AlopexGrid.dragObject.data._index.data, null, {
						"disableCellSpan": true
					}));
					clonetable.push('</tbody></table>');
					$proxy.html(clonetable.join(''));
					$proxy.find('.table').css({
						"border": "1px solid grey",
						"background-color": "white",
						"opacity": "0.9"
					});
					//$proxy.find('.table-body').css();
					$proxy.find('.cell').css({
						"border": "1px solid grey",
						"padding-left": "5px",
						"padding-right": "5px"
					});
					AlopexGrid.dragObject.$proxy = $proxy;
					$(document.body).append(AlopexGrid.dragObject.$proxy);
					$(document).on('selectstart.alopexgriddragevent_t' + self.key, function(e2) {
						if (e2.target.tagName == "INPUT" || e2.target.tagName == "TEXTAREA") {
							return;
						}
						e2.preventDefault();
					});
					self.$scroller.find('.row.hovering').removeClass('hovering');
					dragMoveHandler(e);
				} else {
					return;
				}
			}
			//e.preventDefault();
		}
		//실제 그리드 위에서 움직일 때의 indicator 조작. 
		function dragMoveHandler(e) {
			var self = e.data.self;
			if (!AlopexGrid.dragObject || !AlopexGrid.dragObject.enabled) {
				return;
			}
			if ($(e.target).hasClass("alopexgrid-indicator")) {
				return;
			}
			var $row = e.target.tagName == "TR" ? $(e.target) : $(e.target).closest('.bodyrow');
			var $nextrow = $row.next();
			var isbody = !!$(e.target).parentsUntil($r, '.table-body').length;
			var offset = $row.length && isbody ? $row.offset() : self.$tablebody.offset();
			var nextoffset = $nextrow.offset();
			var top = offset.top;
			var left = offset.left;
			var bottom = nextoffset ? nextoffset.top : (top + $row.height());
			var indicatorY = bottom;
			if ((top + bottom) / 2 > e.pageY) {
				indicatorY = top;
				AlopexGrid.dragObject.insertAfter = false;
			} else {
				AlopexGrid.dragObject.insertAfter = true;
			}
			if (!$row.length || !isbody) {
				AlopexGrid.dragObject.insertAfter = false;
			}
			AlopexGrid.dragObject.toindex = Number($row.attr('data-alopexgrid-dataindex')) || 0;
			if ($row.hasClass('emptyrow')) {
				AlopexGrid.dragObject.insertAfter = true;
				AlopexGrid.dragObject.toindex = -1;
			}
			if (!isbody) {
				AlopexGrid.dragObject.toindex = 0;
				if (e.pageY > (self.$root.offset().top + self.$root.height() / 2)) {
					//bottom side of table
					AlopexGrid.dragObject.toindex = -1;
					indicatorY = self.$tablebody.offset().top + self.$tablebody.height();
				}
			}
			if (!AlopexGrid.dragObject.$indicator) {
				var $indicator = $('<div class="alopexgrid-indicator">');
				$indicator.css({
					"position": "absolute",
					"left": "-10000px",
					"height": "0px",
					"z-index": "99998"
				});
				AlopexGrid.dragObject.$indicator = $indicator;
			}
			AlopexGrid.dragObject.$indicator.css({
				"top": (indicatorY - 1) + "px",
				"left": left + "px",
				"width": self.$scroller.innerWidth() + "px"
			}).appendTo(document.body);
			AlopexGrid.dragObject.lastY = indicatorY;
			AlopexGrid.dragObject.lastSelf = self;
		}
		function dragEndHandler(e, onlast) {
			var self = e.data.self;
			var wself = self;
			if (!AlopexGrid.dragObject || !AlopexGrid.dragObject.enabled) {
				dragCancelHandler(e);
				return;
			}
			if (onlast) {
				wself = AlopexGrid.dragObject.lastSelf;
			}
			//indicator위에 있을 경우 엄한 그리드에 데이터를 넣는 경우가 발생.
			if (AlopexGrid.dragObject.enabled && (onlast || AlopexGrid.dragObject.lastSelf.key === wself.key)) {
				var fromindex = Number(AlopexGrid.dragObject.$row.attr('data-alopexgrid-dataindex'));
				var toindex = AlopexGrid.dragObject.toindex;
				if (toindex < 0) {
					toindex = Number(wself.$tablebody.children('.row').not('.emptyrow').eq(-1).attr('data-alopexgrid-dataindex')) + 1;
				} else if (AlopexGrid.dragObject.insertAfter) {
					toindex++;
				}
				//Case1. 최초 시작한 그리드로 떨어진 경우 state에서의 위치만 변경한다(splice후 dataDraw 또는 단순 element 위치 변경)
				if (wself.key === AlopexGrid.dragObject.key || (onlast && wself.key === AlopexGrid.dragObject.startInstance.key)) {
					wself.sortClear();
					wself._dataMoveByDataindex(fromindex, toindex);
					$.each(wself.state.data, function(idx, item) {
						if (item && item._state) {
							item._state.hovering = false;
						}
					});
					// wself._dataDraw({
					// 	tableheader: {
					// 		display: 'none'
					// 	}
					// });
					// if (wself.state.hasFixColumn) {
					// 	//this.viewUpdate();
					// 	var viewoption = {};
					// 	if (wself.state.lastScrollLeft !== 0) {
					// 		viewoption.scrollLeft = 0;
					// 	}
					// 	wself.viewUpdate(viewoption);
					// }
					// wself.$scroller.scroll();
					wself._simpleRedraw(null,null);
					wself._needEditedRefresh();
				}
				//Case2. 다른 그리드로 옮긴 경우 자신에게서는 delete, 받은 그리드는 add를 한다.
				else {
					wself.sortClear();
					delete AlopexGrid.dragObject.data._state;
					delete AlopexGrid.dragObject.data._index;
					wself.dataAdd(AlopexGrid.dragObject.data, {
						_index: {
							data: toindex
						}
					});
					AlopexGrid.dragObject.startInstance.dataDelete({
						_index: {
							data: fromindex
						}
					});
					// wself._dataDraw({
					// 	tableheader: {
					// 		display: 'none'
					// 	}
					// });
					// if (wself.state.hasFixColumn) {
					// 	//this.viewUpdate();
					// 	var viewoption = {};
					// 	if (wself.state.lastScrollLeft !== 0) {
					// 		viewoption.scrollLeft = 0;
					// 	}
					// 	wself.viewUpdate(viewoption);
					// }
					// AlopexGrid.dragObject.startInstance._dataDraw({
					// 	tableheader: {
					// 		display: 'none'
					// 	}
					// });
					wself._simpleRedraw(null, null);
					AlopexGrid.dragObject.startInstance._simpleRedraw(null,null);
					AlopexGrid.dragObject.startInstance._needEditedRefresh();
				}
			}
			if (AlopexGrid.dragObject.$proxy) {
				AlopexGrid.dragObject.$proxy.remove();
			}
			if (AlopexGrid.dragObject.$indicator) {
				AlopexGrid.dragObject.$indicator.remove();
			}
			$(document.body).find('.alopexgrid-indicator').remove();
			delete AlopexGrid.dragObject;
			AlopexGrid.dragObject = null;
			$(document).off('.alopexgriddragevent_t' + self.key);
		}
		function dragCancelHandler(e) {
			var self = e.data.self;
			if (!AlopexGrid.dragObject) {
				return;
			}
			var $target = $(e.target);
			if ($target.hasClass('alopexgrid-indicator') || $target.hasClass('alopexgrid-proxy')) {
				//indicator에서 이벤트가 종료된 경우, 가장 마지막에 사용된 엘리먼트에 data를 drop한다.
				dragEndHandler(e, true);
				return;
			}
			if (AlopexGrid.dragObject.$proxy) {
				AlopexGrid.dragObject.$proxy.remove();
			}
			if (AlopexGrid.dragObject.$indicator) {
				AlopexGrid.dragObject.$indicator.remove();
			}
			$(document.body).find('.alopexgrid-indicator').remove();
			delete AlopexGrid.dragObject;
			AlopexGrid.dragObject = null;
			$(document).off('.alopexgriddragevent_t' + self.key);
		}
	};

	function setRowDataHeight(idx,row) {
		var $r = $(row);
		if($r.data('dataAlopexGridFixColumned')) return;
		var dataHeight = $r.data('dataHeight');
		if(dataHeight){
			$r.css('height',dataHeight);
			$r.removeData('dataHeight');
		}
	}
	AlopexGrid.prototype._getRowHeight = function($row) {
		var self = this;
		var restore = !$row.data('dataAlopexGridFixColumned');
		var rowspanned = !!self.state.columnRowspanned;
		if(restore) {
			restore = rowspanned ? $row.attr('style') : $row.css('height');
			rowspanned ? $row.removeAttr('style') : $row.css('height','');
		}
		var height = $row.outerHeight();
		//var height = parseInt($row.css('height'));
		if(restore) {
			rowspanned ? $row.attr('style', restore) : $row.css('height', restore);
		}
		return height+(self.option.rowHeightCompensate||0);
	}
	/**
	 * 가상스크롤을 적용하는 table body에 대한 refresh를 수행한다.
	 */
	function refreshVscrollBody($body, $children, $orgbody, self, vscroll, from, to, op) {
		//to[0]~min(from[0],to[1]) prepend
		//max(from[1],to[0])~to[1] append
		//from[0]~to[0] delete
		//to[1]~from[1] delete
		var $deleteme = $();
		if(to[0] > from[0]) { //앞부분 삭제 대상 존재
			var deleteto = to[0] - from[0];
			$deleteme = $deleteme.add($children.slice(0,deleteto));
		}
		if(from[1] > to[1]) { //뒷부분 삭제 대상 존재
			var deletefrom = to[1] - from[0];
			$deleteme = $deleteme.add($children.slice(deletefrom<0?0:deletefrom));
		}
		if($deleteme.length) {
			$deleteme.remove();
		}
		var $orgchildren = null;
		if($orgbody) {
			$orgchildren = $orgbody.children('.bodyrow');
		}
		var rowop = $.extend({},{"css":{}},op);
		var prepends = [];
		for(var i=to[0],l=_min(from[0],to[1]);i<l;i++) {
			if($orgbody) {
				var $orow = $orgchildren.eq(i-to[0]);
				var h = self._getRowHeight($orow)+"px";
				rowop["css"]["height"] = h;
				$orow.data("dataHeight",h);
				//$orow.data('dataAlopexGridFixColumned',true);
			}
			var data = self._getRenderedDataFromRenderedIndex(i);
			prepends.push(self._rowRender(data,//self.state.data[i],
				data._index.data,//self.state.data[i]._index.data,
				i,//self.state.data[i]._index.data,
				rowop
			));
		}
		if(prepends.length) {
			$body.prepend(_convertAlopex.call(self, prepends.join('')));
		}
		var appends = [];
		for(var i=_max(from[1],to[0]),l=to[1];i<l;i++) {
			if($orgbody) {
				var $orow = $orgchildren.eq(i-to[0]);
				var h = self._getRowHeight($orow)+"px";
				rowop["css"]["height"] = h;
				$orow.data("dataHeight",h);
				//$orow.data('dataAlopexGridFixColumned',true);
			}
			var data = self._getRenderedDataFromRenderedIndex(i);
			appends.push(self._rowRender(data,//self.state.data[i],
				data._index.data,//self.state.data[i]._index.data,
				i,//self.state.data[i]._index.data,
				rowop
			));
		}
		if(appends.length) {
			$body.append(_convertAlopex.call(self, appends.join('')));
		}
		if(self.state.groupRowspanned && to[0] > from[0]) {
		//앞부분에서 삭제가 되었으면서 그룹 rowspan이 되었다면 맨 위 row를 갱신해서
		//rowspan cell이 정상 렌더링 되도록 한다.
			var $topmostRow = $body.children().eq(0);
			$topmostRow.replaceWith(
				_convertAlopex.call(self, self._rowRender(self._getRenderedDataFromRenderedIndex(vscroll["startIndex"]), null, vscroll["startIndex"], {}))
			);
		}
	}

	/** Virtual Scroll
	 * 가상스크롤이 정상 동작하도록 관련 로직을 등록하고, 이벤트 발생에 따라 row의 추가, 전체높이제어가
	 * 가능하도록 처리한다. dataDraw, dataAdd와 연동하여 동작하도록...?
	 * vsp가 별도로 처리해야 할 업무는? dataDraw, dataAdd등에 연동해야 하는 부분은?
	 * updateOption쪽이 처리할 수 있는 부분은?
	 * dataDraw쪽이 가지는 로직, dataAdd가 가지는 로직, 중복구현되는 부분/재활용 가능한 부분?
	 * state.rendered 어레이에 대한 의존도, 무결성문제.
	 */
	AlopexGrid.prototype._calcRowHeight = function() {
		var self = this;
		self.state.rowHeight = (self.state.data.length && (self.state.rowHeight === undefined || !self.state.rowHeight))
			//? self.$tablebody.children().height() : self.state.rowHeight;
			? self._getRowHeight(self.$tablebody.children().eq(0)) : self.state.rowHeight;
		if(!self.state.rowHeight) {
			var rowstring = self._rowRender(self.state.emptyData, null, null,{"styleclass":"temprow1","disableCellSpan":true,"catchError":true});
			self.$tablebody.append(rowstring+rowstring);
			var $trow = self.$tablebody.find('.temprow1');
			var $tcell = $trow.children();
			self.state.rowHeight = self._getRowHeight($trow.eq(0));
			self.state.rowHeightBorderWidth = _max(
				_max(parseInt($trow.css('borderTopWidth')),parseInt($trow.css('borderBottomWidth'))),
				_max(parseInt($tcell.css('borderTopWidth')),parseInt($tcell.css('borderBottomWidth')))
			) || 0;
			$trow.remove();
		}
		return self.state.rowHeight;
	};
	AlopexGrid.prototype._calcCellWidth = function(){
		var self = this;
		var cname = 'temp'+_generateUniqueId();
		var rowstring = self._rowRender(self.state.emptyData, null, null,{"styleclass":cname,"disableCellSpan":true,"catchError":true});
		var $trow = $(rowstring);
		self.$tablebody.append($trow);
		var $tcell = $trow.children();
		var widthmap = {};
		$tcell.each(function(idx, cell) {
			var $cell = $(cell);
			var columnIndex = $cell.attr('data-alopexgrid-columnindex');
			if(_valid(columnIndex)) {
				widthmap[columnIndex] = ($cell.outerWidth()||0);
			}
		});
		$trow.remove();
		return widthmap;
	};
	AlopexGrid.prototype.getLayoutInfo = function(){
		//TODO 컬럼 레이아웃에 대한 실제 정보를 조합하여 리턴할 수 있다.
		//color, width, current visible columnMapping?
		var self = this;
		var info = {};
		info["height"] = self.option.height;
		info["width"] = self.option.width;
		info["columnMapping"] = $.extend(true, [], self.option.columnMapping);
		info["columnWidthMap"] = self._calcCellWidth();
		info["headerGroup"] = $.extend(true, [], self.option.headerGroup);
		var $wrap = $('<div></div>');
		var $table = null;
		$wrap.css('position','absolute').css('left','-99999px').css('top','-99999px');
		if(self.option.floatingHeader) {
			$table = self.$fixedheader.clone();
		} else {
			$table = self.$table.clone();
			$table.children('tbody').remove();
		}
		$table
			.css('position','')
			.css('top','')
			.css('left','')
			.css('transform','')
			.css('table-layout','')
			.css('display','');
		$wrap.append($table);
		$wrap.appendTo(self.$wrapper.children('fixed-items'));
		//TODO 색상추출
		$wrap.find('*')
			.removeAttr('class')
			.removeAttr('data-alopexgrid-columnindex')
			.removeAttr('data-alopexgrid-key');
		info["headerTableMarkup"] = $wrap.html();
		$wrap.remove();
		return info;
	};
	AlopexGrid.prototype.export = function(){
		var self = this;
		var obj = {};

		self.state.forceRenderAll = true;

		//TODO 옵션 어딘가에 사용된 함수들은 JSON string으로 전송될 수 없다.
		obj["option"] = $.extend(true, {}, self.option);

		obj["data"] = AlopexGrid.trimData(self.state.data);
		var beforeTrim = $.map(self.state.rendered, function(renderedKey, renderedIndex){
			return self._getRenderedDataFromRenderedIndex(renderedIndex);
		});
		obj["renderedData"] = AlopexGrid.trimData(beforeTrim);

		obj["headerMarkup"] = '<thead>'+self._headerRender()+'</thead>';//table tag with colgroup and thead
		obj["bodyMarkup"] = "";//table tag with colgroup and tbody
		obj["tableMarkup"] = '<table style="'+self.$table.attr('style')+'">';
		obj["colgroupMarkup"] = '<colgroup>';
		var cols = [];
		var cellWidthMap = self.state.columnWidthMap;//self._calcCellWidth();
		$.each(cellWidthMap, function(columnIndex, width){
			cols[columnIndex] = '<col style="width:'+width+'px;">'
		});

		obj["colgroupMarkup"] += (cols.join('')+'</colgroup>');

//var tt = new Date().getTime();
		var body = ['<tbody>'];
		for(var i=0;i<beforeTrim.length;i++) {
			//마크업 클라이언트 생성시 백여개 컬럼에 수천건 데이터가 되면 렌더링 시간이 어마어마하게 소모된다.
			body.push(self._rowRender(beforeTrim[i],null,i,{}));
		}
		body.push('</tbody>');
		obj["bodyMarkup"] = body.join('');
//console.error('bodyend',parseFloat((new Date().getTime()-tt)/1000).toFixed(2),'sec',
//	_addCommas(parseFloat(obj["bodyMarkup"].length/(1024*1024)).toFixed(2)),'MByte');

		obj["markup"] = obj["tableMarkup"] + obj["colgroupMarkup"] + obj["headerMarkup"] + obj["bodyMarkup"] + '</table>';

		obj["groupingLookupTable"] = self.state.groupRowspanned ? $.extend(true, {}, self.state.groupingLookupTable) : null;
		obj["groupingRowspanTable"] = self.state.groupRowspanned ? $.extend(true, {}, self.state.groupingRowspanTable) : null;

		self.state.forceRenderAll = false;

		return obj;
	};
	AlopexGrid.prototype.import = function(obj){
		if($.type(obj) === "string") {
			obj = JSON.parse(obj);
		}
		var option = $.extend(true, {}, obj.option);
		delete option.data;
		var data = $.extend(true, [], obj.data);
		this.updateOption(option);
		this.dataSet(data);
	};
	AlopexGrid.prototype._tableSpacing = function(top, middle, bottom) {
		var self = this;
		var spacing = 1300 * 1000;//IE는 1,342,177px이상의 값을 스타일로 쓸 수 없다.
		var prevtop = self.$tablespacertop.data('prev');
		var prevbottom = self.$tablespacerbottom.data('prev');
		top = top + (middle || 0);
		self.$tablespacertop.data('prev',top);
		self.$tablespacerbottom.data('prev',bottom);
		if(top === 0) {
			self.$tablespacertop.empty();
		} else if(prevtop !== top) {
			self.$tablespacertop.children().each(function(idx) {
				if(top >= 0) {
					this.style.height = (top-spacing>=0?spacing:top)+"px";
					top -= spacing;
				} else {
					//$(this).remove();
					self.$tablespacertop[0].removeChild(this);
				}
			});
			while(top >= 0) {
				$('<div>').css("height",(top-spacing >= 0 ? spacing : top)+"px").appendTo(self.$tablespacertop);
				top -= spacing;
			}
		}
		if(bottom === 0) {
			self.$tablespacerbottom.empty();
		} else if(prevbottom !== bottom) {
			self.$tablespacerbottom.children().each(function(idx) {
				if(bottom >= 0) {
					this.style.height = (bottom-spacing>=0?spacing:bottom)+"px";
					bottom -= spacing;
				} else {
					//$(this).remove();
					self.$tablespacerbottom[0].removeChild(this);
				}
			});
			while(bottom >= 0) {
				$('<div>').css("height",(bottom-spacing>=0?spacing:bottom)+"px").appendTo(self.$tablespacerbottom);
				bottom -= spacing;
			}
		}
	};
	AlopexGrid.prototype._vscrollInfo = function(){
		var self = this;
		var option = self.option;
		if(!option.virtualScroll) {
			return false;
		}
		self._calcRowHeight();
		if(!self.state.rowHeight) {
			return false;
		}

		var info = {};
		var buflen = self.option.virtualScrollPadding;
		var rendered = $.isArray(self.state.rendered);

		var startIndex = 0;
		var endIndex = self.state.rendered.length-1;
		
		info["totalLength"] = rendered ? self.state.rendered.length : 0;
		info["rowHeight"] = self.state.rowHeight;
		info["scrollerClientHeight"] = self.$scroller.prop('clientHeight');
		info["totalHeight"] = info["totalLength"] * info["rowHeight"] + 1;
		
		var MAX_END_INDEX = _max(info["totalLength"]-1,0);

		if(!option.height) {
			buflen += 5;
			var wheight = $window.height();
			var wscrolltop = $window.scrollTop();
			var rofftop = self.$root.offset().top;
			
			info["scrollTop"] = wscrolltop > rofftop ? _min(wscrolltop - rofftop, info["totalHeight"]) : 0;
			if(wscrolltop <= rofftop && rofftop <= wscrolltop+wheight) { //윈도우 안에 걸쳐있음
				info["visibleHeight"] = _min(wheight - (rofftop - wscrolltop),info["totalHeight"]);
			} else if(rofftop < wscrolltop && wscrolltop < rofftop+info["totalHeight"]) { //윈도우 위로 걸쳐있음.
				info["visibleHeight"] = _min(info["totalHeight"] - (wscrolltop - rofftop),wheight);
			} else {
				info["visibleHeight"] = 0;
			}
		} else {
			info["scrollTop"] = self.$scroller.prop('scrollTop');
			info["visibleHeight"] = info["scrollerClientHeight"];
		}

		startIndex = Math.floor(info["scrollTop"] / info["rowHeight"]);
		if(startIndex < 0) startIndex = 0;
		endIndex = Math.floor(startIndex + info["visibleHeight"]/info["rowHeight"]);
		startIndex -= buflen;
		endIndex += buflen;
		
		if(startIndex < 0) startIndex = 0;
		if(endIndex > MAX_END_INDEX) endIndex = MAX_END_INDEX;
		if(endIndex < startIndex) endIndex = startIndex;
		if(startIndex > MAX_END_INDEX) startIndex = MAX_END_INDEX;
		
		if(self.state.columnRowspanned) {
			for(var i=0,l=self.state.rowspanindex.length;i<l;i++) {
				if(self.state.rowspanindex[i]) {
					var mapping = _getMappingFromColumnIndex(self, i);
					if(!mapping || $.isPlainObject(mapping.rowspan)) continue;
					var key = mapping.key;
					//rowspan된만큼 범위를 상하로 확장.
					while(startIndex > 0 && self.state.data[self.state.rendered[startIndex]][key] === self.state.data[self.state.rendered[startIndex]-1][key]) {
						startIndex--;
					}
					while(endIndex < MAX_END_INDEX && self.state.data[self.state.rendered[endIndex]][key] === self.state.data[self.state.rendered[endIndex]+1][key]) {
						endIndex++;
					}
					break;
				}
			}
		}
		if(false && self.state.groupRowspanned) {
			//TODO 자신을 포함한 그룹rowspan중 최 상위 그룹으로 값을 결정하긴 하는데
			//이렇게 할 경우 최상위 그룹이 방대하게 묶여있는 경우 속도 저하를 피할 수가 없다.
			var groupBy = self.option.grouping.by;
			if(groupBy && groupBy[0] === true) {
				groupBy = groupBy.slice(1);
			}
			var topmostKey = groupBy[0];
			var lookupTableItem = self.state.groupingLookupTable[topmostKey];
			//lookupTable은 dataIndex 기준으로 작성되어 있다. 하지만 startIndex와 endIndex는
			//state.rendered 기준이므로 중간에 meta가 포함되어 있을 수 있다.
			//lookupTableItem : 최상위그룹 키값의 dataIndex기준 index가 저장되어 있다.
			//startIndex, endIndex : rendered의 index값이다.

			//startIndex 위치 데이터가 최상위 그룹의 메타라면 정지
			//아니라면 from까지 올림
			var startData = self._getRenderedDataFromRenderedIndex(startIndex);
			if(startData) {
				if(startData._meta && startData._groupKey === topmostKey) {

				} else {
					while(startData._meta && startIndex > 0) {
						var d = self._getRenderedDataFromRenderedIndex(startIndex-1);
						if(!d) break;
						startData = d;
						startIndex--;
					}
					var di = startData._index.data;
					var from = (lookupTableItem[di]||{})["from"];
					if(!_valid(from)) from = 0;
					startIndex = Math.max($.inArray(from, self.state.rendered),0);
				}	
			}

			//endIndex위치 데이터가 최상위 그룹의 메타라면 정리
			//아니라면 to까지 내림
			var endData = self._getRenderedDataFromRenderedIndex(endIndex);
			if(endData) {
				if(endData._meta && endData._groupKey === topmostKey) {

				} else {
					while(endData._meta && endIndex < self.state.rendered.length) {
						var d = self._getRenderedDataFromRenderedIndex(endIndex+1);
						if(!d) break;
						endData = d;
						endIndex++;
					}
					if(endIndex > self.state.rendered.length-1) {
						endIndex = Math.max(self.state.rendered.length-1,0);
					} else {
						var di = endData._index.data;
						//var offset = lookupTableItem[di]["to"] - di;
						var to = (lookupTableItem[di]||{})["to"];
						if(!_valid(to)) to = MAX_END_INDEX;
						//endIndex = Math.min(endIndex + offset, self.state.rendered.length-1);
						endIndex = Math.min($.inArray(to, self.state.rendered),MAX_END_INDEX)
					}
				}	
			}
		}

		info["startIndex"] = startIndex;
		info["endIndex"] = endIndex;
		info["startDataIndex"] = rendered ? self.state.rendered[startIndex] : null;
		info["endDataIndex"] = rendered ? self.state.rendered[endIndex] : null;
		info["renderLength"] = _max(endIndex - startIndex + 1,0);

		info["paddingTopLength"] = startIndex;
		info["paddingBottomLength"] = MAX_END_INDEX - endIndex;
		info["paddingTopHeight"] = startIndex * info["rowHeight"];
		info["paddingBottomHeight"] = info["paddingBottomLength"] * info["rowHeight"];

		if((!info["paddingTopLength"] && !info["paddingBottomLength"]) || info["totalLength"] < 50){
			info["need"] = false;
		}

		return info;
	};

	//현재 그려진 col width는 실제 col width값의 몇배인가를 확인.
	AlopexGrid.prototype._colRatio = function(force) {
		var $table = this.$table;
		var colsum = 0;
		var tablewidth = force ? $table.width() : Number(this.state.tableWidth);//$table.width();
		$(this.option.columnMapping).each(function(idx, mapping) {
			var width = null;
			if (mapping.columnIndex === null || mapping.columnIndex === undefined || mapping.hidden === true)
				return;
			if (typeof mapping.width == "string") {
				width = Number(mapping.width.split("px")[0]);
			} else if (typeof mapping.width == "number") {
				width = mapping.width;
			}
			if (width !== null) {
				colsum += width;
			} else {
				colsum = null;
				return false;
			}
		});
		var ratio = 1;
		if (!colsum) {
			ratio = 1;
		} else if (colsum < tablewidth) {
			ratio = tablewidth / colsum;
		}
		return ratio;
	};

	AlopexGrid.prototype.scrollOffset = function(){
		return this._scrollOffset();
	};
	AlopexGrid.prototype._scrollOffset = function(merge) {
		var self = this;
		var offset = merge ? merge : {};
		offset["scrollTop"] = this.option.scroll ? self.state.lastScrollTop : 0;//this.$scroller[0].scrollTop : 0;
		offset["scrollLeft"] = this.option.scroll ? self.state.lastScrollLeft : 0;//this.$scroller[0].scrollLeft : 0;
		return offset;
	};

	AlopexGrid.prototype._autoResizeSet = function(set) {
		var self = this;
		var $window = $(window);
		if (self.state.resizeTimeout !== null && self.state.resizeTimeout !== undefined) {
			clearTimeout(self.state.resizeTimeout);
			self.state.resizeTimeout = null;
		}
		$window.off(".alopexgridresize" + self.key);
		if (set === false || (self.option.width && self.option.height)) {//높이, 너비가 지정되어 있는 경우 필요 없다.
			return;
		}
		var resizeHandler = function() {
			if (self.state.resizeTimeout !== null && self.state.resizeTimeout !== undefined) {
				clearTimeout(self.state.resizeTimeout);
				self.state.resizeTimeout = null;
			}
			//IE에서 resize즉시 업데이트를 수행할 경우, 실제 크기와 맞지 않게 처리가 되는 케이스가 발생함.
			self.state.resizeTimeout = setTimeout(function() {
				if ($window.height() != self.lastWindowHeight || $window.width() != self.lastWindowWidth) {
					//IE8의 window resize 무한루프 버그
					//http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
					self.lastWindowHeight = $window.height();
					self.lastWindowWidth = $window.width();
					//self._dataDraw()
					self._showProgress(function() {
						var soffset = self._scrollOffset();
						self.viewUpdate(soffset);
					});
				}
				self.state.resizeTimeout = null;
			}, self.option.autoResizeDelay);
		};
		$window.on("resize.alopexgridresize" + self.key, resizeHandler);
	};
	AlopexGrid.prototype._updateColgroup = function() {
		var option = this.option;
		var $colgroup = this.$colgroup;
		var $colchild = $colgroup.children('col');
		var expectedWidth = 0;
		for ( var i in option.columnMapping) {
			var mapping = option.columnMapping[i];
			if (mapping.columnIndex === null || mapping.columnIndex === undefined || mapping.hidden===true)
				continue;
			if (mapping.width) {
				$colchild.filter('[data-alopexgrid-columnindex="'+mapping.columnIndex+'"]').css('width', mapping.width);
				expectedWidth += Number(mapping.width.split('px')[0]);
			}
		}
		if (expectedWidth) {
			this.state.tableWidth = expectedWidth;
		}
	};
	AlopexGrid.prototype._getGroupingRange = function(dataIndex, key) {
		var groupingLookupTable = this.state.groupingLookupTable;
		var groupingLookupList = groupingLookupTable[key];
		if(!groupingLookupList) return null;
		var groupingLookupItem = groupingLookupList[dataIndex];
		if(!groupingLookupItem) return null;
		return groupingLookupItem;
	};
	AlopexGrid.prototype._getGroupingRangeByMapping = function(dataIndex, mapping) {
		var key = mapping.key;
		if(mapping.rowspan && typeof mapping.rowspan.by === "string") key = mapping.rowspan.by;
		return this._getGroupingRange(dataIndex, key);
	};
	AlopexGrid.prototype._rowspanValueForCell = function(data, mapping, forceFullValue){
		var renderedIndex = data._index.rendered;
		var rowspanTable = this.state.groupingRowspanTable;
		var rowspanKey = null;//그룹을 따라갈 수 있게 한다. 이때에도 값을 분배하는가?
		if(mapping.rowspan === true) { //rowspan 세부설정은 컬럼단위로 지정하도록 한다.
			rowspanKey = mapping.key;
		} else if(mapping.rowspan && typeof mapping.rowspan.by === "string") {
			rowspanKey = mapping.rowspan.by;
		}
		var rowspanTableList = rowspanTable[rowspanKey];
		var rowspan = null;
		var rowspanned = false;
		//TODO 해당 컬럼매핑이 연결되어 있는 rowspan정보를 연결받는다. key기준은 자의적인 기준임.
		if(rowspanTableList) {
			var rowspanItem = rowspanTableList[renderedIndex];
			if(rowspanItem) {
				//해당 renderedIndex에 대한 rowspan정보가 있으므로 처리한다.
				var renderedStart = this.state.vscrollRenderedStart;
				var renderedEnd = this.state.vscrollRenderedEnd;

				renderedStart = _valid(renderedStart) ? renderedStart : 0;
				renderedEnd = _valid(renderedEnd) ? renderedEnd : Math.max(this.state.rendered.length-1, 0);

				if(this.state.forceRenderAll || forceFullValue) {
					renderedStart = 0;
					renderedEnd = Math.max(this.state.rendered.length-1,0);
				}

				var crossStart = rowspanItem["from"] < renderedStart;
				var crossEnd = renderedEnd < rowspanItem["to"];
				var from = Math.max(rowspanItem["from"],renderedIndex,renderedStart);
				var to = Math.min(rowspanItem["to"],renderedEnd);
				rowspan = to - from + 1;
				if(crossStart) {
					//rowspan = rowspanItem["to"] - renderedStart + 1;
					rowspanned = renderedStart < renderedIndex;
				} else if(crossEnd) {
					//rowspan = renderedEnd - rowspanItem["from"] + 1;
					rowspanned = rowspanItem["from"] < renderedIndex;
				} else {
					//rowspan = rowspanItem["to"] - renderedIndex + 1;
					rowspanned = rowspanItem["from"] < renderedIndex;
				}
			}	
		}
		return {
			"rowspan" : rowspan, //해당 셀의 rowspan값
			"rowspanned" : rowspanned, //rowspan되서 지워저야 하는가 여부
			"rowspanKey" : rowspanKey //셀이 rowspan된 기준이 되는 key값
		};
	};

	AlopexGrid.prototype._cellRender = function(data, mapping, option) {
		var self = this;
		var dataIndex = option && option.dataIndex !== undefined ? option.dataIndex : (data && data._index ? data._index.data : 0);
		var rowspanned = false;
		var rowspan = null;
		var disableWrap = false;
		if (mapping.rowspan && this.state.columnRowspanned && !(option && option["disableCellSpan"])) {
			var rindex = this.state.rowspanindex[Number(mapping.columnIndex)] || this.state.rowspanindex[Number(mapping.rowspan.by)];
			//data._index.data 위치의 데이터가 가 포함이 되는지를 비교.
			if (rindex) {
				//포함이 되는지를 검사한다.
				var result = _rowspanned(rindex, data._index.data);
				if (typeof result == "number") {//자기자신부터 일 경우 값을 직접 작성.
					var index = _rowspanned(rindex, data._index.data, true);
					if (Number(index.to) > Number(this.state.rendered[this.state.rendered.length - 1])) {
						//span이 그려진 rows밖으로 삐져나갈 경우 rowpadding에 의해 망가질 수 있음. 정확히 맞도록 제어.
						result = Number(this.state.rendered[this.state.rendered.length - 1]) - Number(index.from) + 1;
					}
					//rowspan = ' rowspan="'+result+'"';
					rowspan = result;
				} else if (result) {//앞 데이터가 렌더링 대상인가/중간부터 렌더링 되었는가/중간부터 렌더링 해야 하는가.
					var index = _rowspanned(rindex, data._index.data, true);
					var from = index.from;
					var to = index.to;
					//from이 this.state.rendered[]에 포함되어 있을경우 rowspanned = true
					//from이 없을 경우 from~to-1사이에 최초로 등장하는 셀인경우 rowspan값을 짧게 해서 생성
					//from이 없을 경우 최초 등장셀이 아닐 시 rowspanned = true
					for ( var i in this.state.rendered) {
						if (Number(this.state.rendered[i]) === Number(from)) {
							rowspanned = true;
							break;
						}
					}
					if (!rowspanned) {
						//from10 to 16(10에서 15)인데 rendered는 12부터 시작하는 경우, 12부터 16까지 해당하는 rowspan이 일어나야 한다.
						//16-10에서, 16-12로 rowspan size가 변경됨. 
						if (Number(this.state.rendered[0]) === Number(data._index.data)) {
							//rowspan = ' rowspan="' + (to - Number(data._index.data)) + '"';
							rowspan = (to - Number(data._index.data));
						} else {
							rowspanned = true;
						}
					}
				}
			}
		}
		if(mapping.rowspan && self.state.groupRowspanned && !(option && option["disableCellSpan"])) {
			var result = self._rowspanValueForCell(data, mapping);
			rowspan = result.rowspan;
			rowspanned = result.rowspanned;
		}
		if (rowspanned) {
			if(self.state.forceRenderAll) {
				rowspan = null;
				rowspanned = false;
			} else {
				return '';	
			}
		}
		var orgdata = data;
		if(data._meta && rowspan && !rowspanned) {
			var ndidx = data._groupIndexes[0]
			data = self.state.data[ndidx];
		}

		var cell = {
			tag: "td",
			attr: {
				"styleclass": "cell bodycell"//,
				//"id":cellid
			}
		};
		if (option && option.styleclass) {
			cell.attr.styleclass += (" " + option.styleclass);
		}
		if(mapping.columnIndex === self.state.maxColumnIndex) {
			cell.attr.styleclass += " lastcell lastcolumn";
		}
		if(option && option.pinned) {
			cell.attr.styleclass += " pinnedcell";
		}
		if(self.option.highlightLastAction && data._index.id === self.state.lastActionRowId && mapping.columnIndex === self.state.lastActionColumnIndex) {
			cell.attr.styleclass += ' '+self.option.lastActionCellClass;
		}
		if (mapping.scope) {
			cell.attr.scope = 'row';
		}
		if (mapping.styleclass && !data._meta) {
			var cl = mapping.styleclass;
			if($.isFunction(cl)) {
				cl = cl(_getCurrentValue(data, mapping.key), data, mapping) || "";
			}
			if(cl) {
				cell.attr.styleclass += (" " + cl);
			}
		}
		if (mapping.selectorColumn) {
			cell.attr.styleclass += " selector-column";
		}
		if (this.state.fixupto >= 0 && Number(mapping.columnIndex) <= this.state.fixupto) {
			cell.attr.styleclass += (' cell-fixcol');
		}
		if (mapping.align && (!data._meta || mapping.groupingColumn)) {
			cell.attr.styleclass += (' align-' + mapping.align);
		}
		if (mapping.columnIndex !== undefined) {
			cell.attr.styleclass += (' ' + (Number(mapping.columnIndex) % 2 ? 'cell-odd' : 'cell-even'));
		}
		if (mapping.highlight !== undefined && !data._meta) {
			var customclass = false;
			if ((typeof mapping.highlight == "function" && !!(customclass = mapping.highlight(_getCurrentValue(data,mapping.key), data, mapping))) || mapping.highlight === true) {
				cell.attr.styleclass += (' cell-highlight');
			}
			if (typeof customclass == "string") {
				cell.attr.styleclass += (' ' + customclass);
			}
			if(typeof mapping.highlight === "string") {
				cell.attr.styleclass += (' ' + mapping.highlight);
			}
		}
		if(!data._meta && mapping.key && data._original && data._original[mapping.key] !== _getCurrentValue(data,mapping.key)) {
			cell.attr.styleclass += ' cell-edited';
		}
		if ($.isPlainObject(mapping.attr)) {
			for ( var prop in mapping.attr) {
				var aval = mapping.attr[prop];
				if($.isFunction(aval)) {
					aval = aval(_getCurrentValue(data,mapping.key), data, mapping);
				}
				cell.attr[prop] = (cell.attr[prop] ? (cell.attr["prop"] + ' ') : "") + aval;
			}
		}
		if (option && typeof option.attr == "object") {
			for ( var prop in option.attr) {
				cell.attr[prop] = option.attr[prop];
			}
		}
		if (rowspan) {
			if (rowspan > this.state.rendered.length) {
				rowspan = this.state.rendered.length;
			}
			if (rowspan > 0) {
				cell.attr.styleclass += " cell-rowspan-column";
				if (mapping.scope) {
					cell.attr.scope = 'rowgroup';
				}
			}
			if(rowspan > 1) {
				cell.attr["rowspan"] = rowspan;
				cell.attr.styleclass += " cell-rowspan";
			}
		}
		if(!self.state.forceRenderAll) {
			var cellid = self._cellIdFromData(data, mapping.columnIndex);
			cell.attr["id"] = cellid;
			if(self.option.enableTabFocus) {
				cell.attr["tabindex"] = "0";
				_addEventAttribute(cell, 'onkeydown', "AlopexGrid.run('" + self.key + "','_cellFocusMove',this,event,null,'"+data._index.id+"');");
			}
			// if(self.option.cellSelectable) {
			// 	cell.attr["tabindex"] = "0";
			// }
			cell.attr["data-alopexgrid-columnindex"] = mapping.columnIndex;//mapping.columnIndex;
			if(mapping.key) {
				cell.attr["data-alopexgrid-key"] = mapping.key;
			}
			if(!data._meta && data._index.data !== undefined) {
				cell.attr["data-alopexgrid-dataindex"] = parseInt(data._index.data);
				cell.attr["data-alopexgrid-dataid"] = data._index.id;
			}
			if(data._index.rendered !== undefined) {
				cell.attr["data-alopexgrid-renderedindex"] = data._index.rendered;
			}
			if(!self.option.disableCellTitle && mapping && mapping.key && data && mapping.tooltip !== false) {
				//td.cell[title] functionality
				var value = data[mapping.key];
				var title = value;
				if($.isFunction(mapping.tooltip)) {
					title = mapping.tooltip(value, data, mapping) || "";
				} else if(typeof mapping.tooltip === "string") {
					title = mapping.tooltip;
				} else if($.isPlainObject(mapping.tooltip)) {
				}
				cell.attr["title"] = AlopexGrid.escapeHTML(title || "");
			}
			if(self.state.cellSelection) {
				if(self.state.cellSelection.focusColumnIndex === mapping.columnIndex 
					&& self.state.cellSelection.focusRenderedIndex === orgdata._index.rendered) {
					cell.attr["styleclass"] += ' cell-selected-focus';
				} else if(self.state.cellSelection.focusRowspanInfo 
					&& self.state.cellSelection.focusRowspanInfo.renderedIndexMap[orgdata._index.rendered]
					&& self.state.cellSelection.focusColumnIndex === mapping.columnIndex ) {
					cell.attr["styleclass"] += ' cell-selected-focus';
				}
				if(self.state.cellSelection.columnIndexMap[mapping.columnIndex] 
					&& self.state.cellSelection.renderedIndexMap[orgdata._index.rendered]) {
					cell.attr["styleclass"] += ' cell-selected'
					if(self.state.cellSelection.leftBoundaryColumnIndex === mapping.columnIndex) {
						cell.attr["styleclass"] += ' cell-selected-leftline';
					}
					if(self.state.cellSelection.rightBoundaryColumnIndex === mapping.columnIndex) {
						cell.attr["styleclass"] += ' cell-selected-rightline';
					}
					if(self.state.cellSelection.topBoundaryRenderedIndex === orgdata._index.rendered) {
						cell.attr["styleclass"] += ' cell-selected-topline';
					}
					if(self.state.cellSelection.bottomBoundaryRenderedIndex === orgdata._index.rendered) {
						cell.attr["styleclass"] += ' cell-selected-bottomline';
					}
				}
			}
		} else {
			disableWrap = true;
		}

		var content = null;
		var multiTemp = null;
		var editableRendered = false;
		if (mapping.rowindexColumn) {
			//TODO 기존에 rowspan에 반응하여 그룹을 묶어주던 numberingColumn과는 달리
			//행 인덱스를 표현해주는 역할을 할 수 있다. 행단위 선택, 높이조절 메커니즘이 여기에 구현될 것이다.
			var val = _valid(data._index.rendered) ? data._index.rendered : "";
			if(option && option.pinned) val = "";
			content = {
				tag : "div",
				attr : {
					styleclass : "rowindex-column-wrapper"
				},
				child : val
			};
		} else if (data._meta && !mapping.groupingColumn) {
			cell.attr["styleclass"] += ' summarycell';
			cell.attr["styleclass"] += ' align-'+(mapping.summaryAlign || 'right');
			if(data.hasOwnProperty(mapping.columnIndex)) {
				content = '<span>'+(data[mapping.columnIndex] || "")+'</span>';
			}
			if(data._groupKey === mapping.key) {
				content = '<span>'+data['_groupValue']+'</span>';
			}
			if(mapping.summaryStyleclass) {
				var addclass = false;
				if($.type(mapping.summaryStyleclass)==="string") {
					addClass = (mapping.summaryStyleclass||'');
				} else if($.isFunction(mapping.summaryStyleclass)) {
					addClass = (mapping.summaryStyleclass(data["_originalValueMap"][mapping.columnIndex], data)||'');
				}
				if(addClass) {
					cell.attr["styleclass"] += (' ' + addClass);
				}

			}
			disableWrap = true;
		} else if (mapping.groupingColumn && !self.state.forceRenderAll) {
			cell.attr["styleclass"] += ' grouping-column';
			if(self.option.grouping && self.option.grouping.useGrouping && self.option.grouping.useSummary) {
				//TODO useSummary:false 일 때에도 작동할 방안이 필요하다. fold/unfold 기준 정립 필요.
				var groupBy = self.option.grouping.by;
				if(groupBy[0]===true) {
					groupBy = groupBy.slice(1);
				}
				var bymap = {};
				for(var g=0;g<groupBy.length;g++) {
					bymap[groupBy[g]] = g;
				}
				content = [];
				var lookupTable = self.state.groupingLookupTable;
				for(var g=0;g<groupBy.length;g++) {
					var groupKey = groupBy[g];
					var icon = {
						tag : 'div',
						attr : {
							"styleclass" : "alopexgrid-group-icon"
						}
					};
					var fold = false;
					var unfold = false;
					var folded = self._isDataFolded(data);
					var iconData = data;
					if(iconData._meta && folded === "unfold" && bymap[iconData._groupKey] > bymap[groupKey]) {
						iconData = self._getActualDataByIndex({data:iconData._groupIndexes[0]});
					}
					if(iconData._meta) {
						//fold되어 있어서 meta가 최 상위에 위치한 경우 
						//자신과 동일한 시작점을 공유하는 그룹들은 group-start를 가져야 한다. 
						//현재 구현은 iconData가 반드시 있다는 가정이 깔려있다보니....
						if(bymap[iconData._groupKey] < bymap[groupKey]) {
							//empty icon
						} else if(bymap[iconData._groupKey] > bymap[groupKey]) {
							icon.attr["styleclass"] += " alopexgrid-group-line";fold=true;
						} else {
							//Fold, Unfold icon 표시를 위한 구분은?
							
							if(folded==="unfold"){
								icon.attr["styleclass"] += " alopexgrid-group-unfold";
								unfold = true;
							} else {
								icon.attr["styleclass"] += " alopexgrid-group-fold";
								fold = true;
							}
						}
						icon.attr["title"] = _escapeHTML(iconData._groupValues.join(', '));
					} else if(iconData._index && iconData._index.id) {
						var lookupTableItem = lookupTable[groupBy[g]];
						var lookupItem = lookupTableItem[iconData._index.data];
						folded = self._isDataFolded(iconData);
						if(folded==="unfold") {
							//useSummary:false일 때 가장 첫번째 데이터가 그룹에서 생존해 있게 된다. 
							//이 행을 이용하여 그룹 fold/unfold를 하게 된다.
							icon.attr["styleclass"] += " alopexgrid-group-unfold";
							unfold = true;
						} else if(iconData._index.data === lookupItem["from"]) {
							icon.attr["styleclass"] += " alopexgrid-group-start";
						} else if(iconData._index.data === lookupItem["to"]) {
							icon.attr["styleclass"] += " alopexgrid-group-line";fold=true;
						} else if(!self.option.grouping.useSummary && iconData._index.data === lookupItem["to"]) {
							icon.attr["styleclass"] += " alopexgrid-group-fold";
							fold = true;
						} else {
							icon.attr["styleclass"] += " alopexgrid-group-line";fold=true;
						}
						var title = [];
						for(var h=0;h<=g;h++) {
							title.push(iconData[groupBy[h]]);
						}
						icon.attr["title"] = _escapeHTML(title.join(', '));
					}
					var groupValues = [];
					if(fold || unfold) {
						if(iconData._meta) {
							groupValues = groupValues.concat(iconData["_groupValues"]);
						} else {
							for(var h=0;h<=g;h++) {
								groupValues.push(iconData[groupBy[h]]);
							}
						}
					}
					if(fold) {
						var onclick = "AlopexGrid.run('" + this.key + "','foldGroup',['"+groupValues.join("','")+"']);";
						icon.attr["onclick"] = onclick;
						icon.attr["styleclass"] += ' alopexgrid-group-action-fold';
					}
					if(unfold) {
						var onclick = "AlopexGrid.run('" + this.key + "','unfoldGroup',['"+groupValues.join("','")+"']);";
						icon.attr["onclick"] = onclick;
						icon.attr["styleclass"] += ' alopexgrid-group-action-unfold';
					}
					content.push(icon);
				}
			}
		} else if (mapping.numberingColumn) {
			var number = (Number(dataIndex) + 1);
			if (this.state.columnRowspanned && mapping.rowspan) {
				var rowspanindex = this.state.rowspanindex[mapping.columnIndex] || this.state.rowspanindex[mapping.rowspan.by];
				if (mapping.rowspan && this.state.columnRowspanned && this.state.rowspanindex.length && rowspanindex) {
					var rindex = _rowspanned(rowspanindex, dataIndex, true);
					number = rindex.index;
				}
			}
			if(cell.attr["styleclass"].indexOf('align-') < 0) {
				cell.attr["styleclass"] += " align-center";
			}
			content = {
				tag: "div",
				attr: {
					styleclass: "numbering-column-wrapper",
					style: "text-align:center;"
				},
				child: number || ""
			};
		} else if (mapping.selectorColumn && !data._meta) {
			if(cell.attr["styleclass"].indexOf('align-') < 0) {
				cell.attr["styleclass"] += " align-center";
			}
			content = {
				tag: "div",
				attr: {
					styleclass: "selector-column-wrapper",
					style: "text-align:center;"
				},
				child: {
					tag: "input",
					attr: {
						type: "checkbox",
						styleclass: "selector-checkbox",
						name: _generateUniqueId()
					}
				}
			};
			if (data._state && data._state.selected) {
				content.child.attr.checked = "checked";
			}
			
			var orgtabindex = self.option.tabindexBase + (data._index.data * self.option.columnMapping.length + mapping.columnIndex);
			content.child.attr['data-tabindex'] = orgtabindex;
			if(self.option.useTabindexOnEditable) {
				var tabindex = (self.option.useTabindexOnEditable === "dynamic") 
					? "-1" : orgtabindex;
				content.child.attr.tabindex = self.state.dynamicTabindexEnabled ? orgtabindex : tabindex;
			}
			if(dataChangeCallback(self, "select", [data, data._state.selected]) === false || (option && option.disableSelect) 
				|| (self.state.testRowAllowSelect && self.option.rowOption.allowSelect(data)===false)) {
				content.child.attr.disabled = "disabled";
				delete content.child.attr.checked;
			}
		} else if (
			(
				data._state && data._state.editing && mapping.editable
				&& !(typeof mapping.allowEdit == "function" && !self._evaluateAllowEdit(data, mapping))
			) ||
			( mapping.editable && self._isEditingCell(data._index.rendered, mapping.columnIndex) )

			) {
			editableRendered = true;
			var renderer = mapping.editable === true ? {type: "text"} : mapping.editable;
			cell.attr.styleclass += " editingcell";
			if(self.option.directEdit && mapping.editable === true) {
				content = _escapeHTML(_getCurrentValue(data, mapping.key));
				cell.attr["contentEditable"] = "true";
			} else {
				content = _renderValue.call(self, renderer, 
					self.state.editingCellInfo ? self.state.editingCellInfo["value"] : _getCurrentValue(data,mapping.key)
					, data, mapping);
			}
		} else if (($.isFunction(mapping.multi) && $.isArray(multiTemp=mapping.multi.call(self, value, data, mapping))) 
				|| $.isArray(mapping.multi)) {
			var newtable = {tag:"table",attr:{styleclass:"table inside"},child:{tag:"tbody",attr:{styleclass:"table-body"},child:[]}};
			var newbody = newtable.child.child;
			var multiList = multiTemp || mapping.multi;
			var multirowOption = null;
			if(self.option.rowOption && $.isPlainObject(self.option.rowOption.multi)) {
				multirowOption = self.option.rowOption.multi;
			}
			for(var mi in multiList) {
				var multiMapping = multiList[mi];
				var multirow = {tag:"tr",
					attr:{
						"styleclass":"row bodyrow multirow "+data._index.id,
						"data-alopexgrid-dataid":data._index.id,
						"data-alopexgrid-dataindex":data._index.data
					},
					child : self._cellRender(data, $.extend({},multiList[mi],{columnIndex:mapping.columnIndex}), option)
				};
				if(multirowOption) {
					if(multirowOption.styleclass) {
						var s = multirowOption.styleclass;
						s = $.isFunction(s) ? s(data, multiMapping, multirowOption) : s;
						multirow.attr['styleclass'] += (s ? (' '+s) : '');
					}
					if(multirowOption.highlight) {
						var h = multirowOption.highlight;
						var hval = ($.isFunction(h) ? h(data, multiMapping, multirowOption) : h) || false;
						if(hval) {
							multirow.attr['styleclass'] += ' multirow-highlight';
							if(typeof hval === "string") {
								multirow.attr['styleclass'] += (' ' + hval);
							}
						}
					}
				}
				newbody.push(multirow);
			}
			cell.attr.styleclass += ' multi';
			content = newtable;
		} else {
			var renderer = mapping.render;
			var val = data[mapping.key];
			if(renderer === "editable" && mapping.editable) {
				var editable = mapping.editable === true ? {type:"text"} : mapping.editable;
				renderer = editable;//$.extend({}, mapping.editable);
				val = self.state.editingCellInfo ? self.state.editingCellInfo["value"] : _getCurrentValue(data,mapping.key);
			}
			if(self.option.readonlyRender && $.isPlainObject(renderer)) {
				renderer.readonly = true;
			}
			var result = "&nbsp;";
			//var val = data[mapping.key];
			result = mapping.render ? _renderValue.call(self, renderer, val, data, mapping) :
				((data.hasOwnProperty(mapping.key) && val !== undefined) ? (self.option.disableValueEscape ? val : _escapeHTML(val)) : '&nbsp;');
			//in normal rendering mode without mapping.render option, escape value string.
			content = result;
		}

		if (editableRendered && !data._state.deleted) {
			//TODO input/select등에서 직접 수정되는것도 반영할 수 있도록 해야 한다.
			//"string".replace(/(<input |<select |<textarea )/g, '$1onclick="alert();" ')
			var event = "AlopexGrid.run('" + this.key + "','_cellEditUpdate',this,'" + data._index.id + "'," + (mapping.columnIndex) + ",event);";
			if(self.option.directEdit && mapping.editable === true) {
				cell.attr["onkeyup"] = event;
			} else {
				var total = "$1";
				$.each([' onkeyup', ' onclick', ' onchange'], function(i, evt) {
					total += (evt + '="' + event + '"');
				});
				if (typeof content === "string") {
					content = content.replace(/(<input|<select|<textarea)/g, total);
				}
			}
			
			
			var orgtabindex = self.option.tabindexBase + (data._index.data * self.option.columnMapping.length + mapping.columnIndex);
			var tabindex = (self.option.useTabindexOnEditable === "dynamic") ? "0" : orgtabindex;
			var tabindexattr = '$1 data-tabindex="'+orgtabindex+'"';
			if(self.option.useTabindexOnEditable) {
				tabindexattr +=  'tabindex="'+(self.state.dynamicTabindexEnabled ? orgtabindex : tabindex)+'"'
			}
			if(typeof content === "string") {
				content = content.replace(/(<input|<select|<textarea)/g, tabindexattr);
			}
		}

		if(typeof content !== "number" && !content) {
			content = '&nbsp;';
		}
		var doellipsis = self.option.ellipsisText && !cell.attr["contentEditable"] ? "text-overflow:ellipsis;":"";
		if (mapping.align && self.option.wrapCellOnAlign && !disableWrap) {
			//항상 cell data를 cell-wrapper로 감싸도록 한다.
			//<div class="cell-wrapper">
			cell.child = {
				tag: "div",
				attr: {
					"styleclass": "cell-wrapper",
					"style" : doellipsis
				},
				child: content
			};
		} else {
			cell.child = content;
			cell.attr.style = (cell.attr.style || "") + doellipsis;
		}

		if(mapping && mapping.colspan) {
			var colspanval = Number($.isNumeric(mapping.colspan) ? mapping.colspan :
				($.isFunction(mapping.colspan) ? mapping.colspan(data[mapping.key], data, mapping) : null));
			if(colspanval > 1) {
				cell.attr["colspan"] = String(colspanval);
			}
		}
		if(self.state.forceRenderAll) {
			delete cell.attr["styleclass"];
			delete cell.attr["style"];
		}
		return _generateHTML(cell);
	};
	function _getCurrentData(self, data) {
		return self.option.renderInternallyMerged ? __inner(data) : data;
		function __inner(data) {
			if (data._state && data._state.recent) {
				var recent = data._state.recent;
				data = $.extend({}, data, recent);
			}
			return data;
		}
	}
	function _getCurrentValue(data, key) {
		return (data._state.recent ? data._state.recent[key] : data[key]) || "";
	}
	AlopexGrid.prototype._hscrollInfo = function(){
		var self = this;
		if(!self.option.virtualScroll) return false;
		var colWidthMap = $.map(self.state.columnWidthMap, function(value,key){
			return {columnIndex : key, width : value};
		}).sort(function(a,b){return a.columnIndex - b.columnIndex});
		var clientWidth = self.$scroller.prop('clientWidth');
		var scrollLeft = self.$scroller.scrollLeft();
		var viewportLeft = [];//왼쪽끝에 colspan으로 묶일 요소들
		var leftMap = {};
		var viewportIn = [];//그려져 있어야 할 요소들
		var inMap = {};
		var viewportRight = [];//오른쪽 끝에 colspan으로 묶일 요소들
		var rightMap = {};
		var accumulatedWidth = 0;
		var bufferWidth = self.option.horizontalVirtualScrollBufferWidth || 100;
		$.each(colWidthMap, function(idx, widthMap){
			var outside = false;
			var columnIndex = parseInt(widthMap.columnIndex);
			if(accumulatedWidth > (scrollLeft+clientWidth+bufferWidth)) {
				viewportRight.push(columnIndex);
				rightMap[columnIndex] = true;
				outside = true;
			}
			accumulatedWidth += widthMap.width;
			if(accumulatedWidth < (scrollLeft - bufferWidth)) {
				viewportLeft.push(columnIndex);
				leftMap[columnIndex] = true;
				outside = true;
			}
			if(!outside) {
				viewportIn.push(columnIndex);
				inMap[columnIndex] = true;
			}
		});
		var result = {
			"leftList" : viewportLeft,
			"inList" : viewportIn,
			"rightList" : viewportRight,
			"leftMap" : leftMap,
			"inMap" : inMap,
			"rightMap" : rightMap
		};
		return result;
	};
	AlopexGrid.prototype._manipulateRowForVirtualHScroll = function(row, renderop){
		var self = this;
		if(!self.option.virtualScroll) return;
		var $row = $(row);
		var renderedIndex = parseInt($row.attr('data-alopexgrid-renderedindex'));
		var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
		var hscroll = renderop.hscroll;
		var inAndExistMap = {};
		var inAndExistList = [];
		var hasLeft = hscroll["leftList"].length;
		var hasRight = hscroll["rightList"].length;
		var needLeftColspan = !!hasLeft;
		var needRightColspan = !!hasRight;
		var $leftColspan = null;
		var $rightColspan = null;
		var noNeed = false;
		//data를 기준으로 렌더링을 수행한다.
		$row.children().each(function(idx, cell) {
			var $cell = $(cell);
			var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
			if($cell.hasClass('cell-vscroll-left-colspan')) {
				if(hasLeft) {
					if($cell.attr('colspan') === String(hasLeft)) {
						noNeed = true;
						return false;
					}
					$leftColspan = $cell.attr('colspan', hasLeft);
					needLeftColspan = false;
				} else {
					$cell.remove();
				}
			} else if($cell.hasClass('cell-vscroll-right-colspan')) {
				if(hasRight) {
					if($cell.attr('colspan') === String(hasRight)) {
						noNeed = true;
						return false;
					}
					$rightColspan = $cell.attr('colspan', hasRight);
					needRightColspan = false;
				} else {
					$cell.remove();
				}
			} else if(!hscroll["inMap"][columnIndex])  {
				$cell.remove();
			} else {
				inAndExistMap[columnIndex] = true;//inMap에 있는데 여기에 들어가있지 않다면 렌더링해야 되는 셀인거다.
				inAndExistList.push(columnIndex);
			}
		});
		if(noNeed) return false;
		if($leftColspan) $leftColspan.detach();
		if($rightColspan) $rightColspan.detach();
		var prepends = [];
		var appends = [];
		var renderFrom = inAndExistList[0];
		var renderTo = inAndExistList.pop();
		for(var i=0;i<self.option.columnMapping.length;i++) {
			var mapping = self.option.columnMapping[i];
			if(!mapping || isColumnHidden(mapping)) continue;
			if(!inAndExistMap[mapping.columnIndex] && hscroll["inMap"][mapping.columnIndex]) {
				if(mapping.columnIndex < renderFrom || renderFrom === undefined)
					prepends.push(self._cellRender(data, mapping));
				else if(mapping.columnIndex > renderTo || renderTo === undefined) {
					appends.push(self._cellRender(data, mapping));
				}
			}
		}
		$row.append(appends.join('')).prepend(prepends.join('')).prepend($leftColspan).append($rightColspan);
		if(hasLeft && needLeftColspan) {
			$row.prepend('<td class="cell bodycell cell-vscroll-left-colspan"'
				+' colspan="'+hasLeft+'"'
				+'></td>');
		}
		if(hasRight && needRightColspan) {
			$row.append('<td class="cell bodycell cell-vscroll-right-colspan"'
				+' colspan="'+hasRight+'"'
				+'></td>');
		}
	};
	AlopexGrid.prototype._rowRender = function(data, dataIndex, renderedIndex, option) {
		var self = this;
		if (!data) {
			return;
		}
		data = _getCurrentData(self, data);
		if ((dataIndex === undefined || dataIndex === null) && data._index && data._index.data !== undefined) {
			dataIndex = Number(data._index.data);
		}
		// if ((rowIndex === undefined || rowIndex === null) && (rowIndex = $.inArray(data._index.data, self.state.rendered))>=0) {
		// 	//rowIndex = Number(data._index.row);
		// }
		var columnLimit = (option && option.columnLimit !== undefined) ? option.columnLimit : null;
		var row = {
			tag: "tr",
			attr: {
				"styleclass": "row bodyrow"//,
				//"data-alopexgrid-dataindex": dataIndex,
				//"data-alopexgrid-dataid": data._index.id
			},
			child: []
		};

		if(!$.isEmptyObject(self.option.rowOption)) {
			var rop = self.option.rowOption;
			if(rop.highlight) {
				var customclass = false;
				if ((typeof rop.highlight == "function" && !!(customclass = rop.highlight(data, rop))) || rop.highlight === true) {
					row.attr.styleclass += (' row-highlight');
				}
				if (typeof customclass == "string") {
					row.attr.styleclass += (' ' + customclass);
				}
				if(typeof rop.highlight === "string") {
					cell.attr.styleclass += (' ' + rop.highlight);
				}
			}
			if (rop.styleclass) {
				var cl = rop.styleclass;
				if($.isFunction(cl)) {
					cl = cl(data, rop) || "";
				}
				if(cl) {
					row.attr.styleclass += (" " + cl);
				}
			}
			if ($.isPlainObject(rop.attr)) {
				$.extend(row.attr, rop.attr);
			}
			if($.isFunction(rop.allowEdit)) {
				if(row.allowEdit(data, rop) === false) {
					data._state.editing = false;
				}
			}
		}
		if(!self.state.forceRenderAll) {			
			if(data._index.data >= 0) {
				row.attr["data-alopexgrid-dataindex"] = data._index.data;
			}
			if(renderedIndex >= 0) {
				row.attr["data-alopexgrid-renderedindex"] = data._index.rendered;
			}
			if(data._index.id) {
				row.attr["data-alopexgrid-dataid"] = data._index.id;
				row.attr["styleclass"] += (' '+data._index.id);
			}
			if (self.option && self.option.useClassHovering && !(option && option.pinned)) {
				_addEventAttribute(row, 'onmouseleave', "AlopexGrid.run('" + self.key + "','_hoverLeave',this,event);");
				_addEventAttribute(row, 'onmouseenter', "AlopexGrid.run('" + self.key + "','_hoverEnter',this,event);");
			}
			if (!(option && option.disableSelect) && (self.option.rowClickSelect || self.state.hasSelectorColumn)) {
				if(isAlopexMobile) {
					_addEventAttribute(row, 'data-gridtap', "AlopexGrid.run('" + self.key + "','rowSelect',this,'toggle',event);");
				} else {
					_addEventAttribute(row, 'onclick', "AlopexGrid.run('" + self.key + "','rowSelect',this,'toggle',event);");
				}
			}
			if (self.state.hasAllowEdit && data._state.editing) {
				var evt = "AlopexGrid.run('" + self.key + "','_allowEditProcess',this);";
				_addEventAttribute(row, 'onclick', evt);
				_addEventAttribute(row, 'onchange', evt);
				_addEventAttribute(row, 'onkeyup', evt);
			}
			if(!self.option.disableFocusedState) {
				_addEventAttribute(row, 'onclick', "AlopexGrid.run('" + self.key + "','_rowFocus',this);");
			}

		}
		if(data._meta) {
			var depth = data._parentKeys ? data._parentKeys.length : 0;
			row.attr["styleclass"] += ' summaryrow summary-depth-'+depth;
		}
		$.each(["selected", "editing", "edited","deleted","added","focused"], function(idx, st) {
			if (data._state && data._state[st]) {
				row.attr.styleclass += (' ' + st);
			}
		});
		if (typeof renderedIndex == "number") {
			if(!(option && option.disableOddEven)) {
				var even = renderedIndex % 2; //zero-base index
				if (self.state.columnRowspanned) {
					var rindex = _rowspanWidestIndex(this.state.rowspanindex, dataIndex);
					if (!rindex) {
						rindex = {
							index: 0
						};
					}
					even = (rindex.index) % 2;
				}
				row.attr.styleclass += even ? ' row-even' : ' row-odd';
			}
		}
		if (option && option.styleclass) {
			var cs = [];
			if (typeof option.styleclass == "string") {
				cs.push(option.styleclass);
			} else if($.isArray(option.styleclass)) {
				cs = cs.concat(option.styleclass)
			}
			row.attr.styleclass += (' ' + cs.join(' '));
		}
		if(self.option.highlightLastAction && data._index.id === self.state.lastActionRowId) {
			row.attr.styleclass += ' ' + self.option.lastActionRowClass;
		}
		if(option && option.pinned) {
			row.attr.styleclass += " pinnedrow";
		}
		if (option && typeof option.css == "object") {
			row.attr.style = "";
			for ( var prop in option.css) {
				row.attr.style += (prop + ':' + option.css[prop] + ';');
			}
		}
		
		var doHscroll = (columnLimit === null && option && option.hscroll && !self.state.forceRenderAll);
		var lastcolumn = -1;
		for ( var idx in this.option.columnMapping) {
			var mapping = this.option.columnMapping[idx];
			if (!mapping.hasOwnProperty('columnIndex')) {
				continue;
			}
			var columnIndex = mapping.columnIndex;
			if (mapping.columnIndex === null || mapping.columnIndex === undefined  || mapping.hidden === true) {
				continue;
			}
			columnIndex = Number(columnIndex);
			if(isNaN(columnIndex)) {
				continue;
			}
			if (typeof columnLimit == "number" && columnIndex > columnLimit) {
				//고정컬럼과 같은 렌더링 상황에서 최대 렌더링되는 컬럼을 제한.
				continue;
			}
			if(option && typeof option.emptyTo == "number" && columnIndex <= option.emptyTo) {
				//특정 컬럼을 비우고서 렌더링 할 때.
				var lastcell = "";
				if(columnIndex === self.state.maxColumnIndex) {
					lastcell = " lastcell";
				}
				row.child.push('<td class="cell bodycell'+lastcell+
					' cell-fixcol emptied" data-alopexgrid-columnindex="'+mapping.columnIndex+'">&nbsp;</td>');
				continue;
			}
			//고정컬럼에서는 가로방향 가로스크롤을 적용하지 않는다.
			if(doHscroll && !option.hscroll["inMap"][mapping.columnIndex]) continue;

			var allowed = "";
			if (typeof mapping.allowEdit == "function") {
				allowed = !!self._evaluateAllowEdit(data, mapping) ? "allow-valid" : "allow-invalid";
			} else {
				allowed = "";
			}
			var celloption = {}//$.extend({},option);
			celloption.dataIndex = dataIndex;
			celloption.styleclass = allowed;
			celloption.disableCellSpan = option.disableCellSpan;
			celloption.pinned = option.pinned;
			celloption.attr = option.attr;
			celloption.disableSelect = option.disableSelect;
			var cellrender = "";
			if(option && option["catchError"] === true) {
				var e;
				try {
					cellrender = this._cellRender(data, mapping, celloption);
				} catch(e) {
					console && console.error ? console.error(e) : 0;
				}
			} else {
				cellrender = this._cellRender(data, mapping, celloption);
			}
			row.child.push(cellrender);
//			lastcolumn = columnIndex;
		}
		if(doHscroll && option.hscroll["leftList"].length) {
			//TODO 이 위치가 적절한가?
			row.child.unshift('<td class="cell bodycell cell-vscroll-left-colspan" colspan="'+
				option.hscroll["leftList"].length
				+'"></td>');
		}
		if(doHscroll && option.hscroll["rightList"].length) {
			//TODO 이 위치가 적절한가?
			row.child.push('<td class="cell bodycell cell-vscroll-right-colspan" colspan="'+
				option.hscroll["rightList"].length
				+'"></td>');
		}

		var removalCount = 0;
		for(var i=0;i<row.child.length;i++) {
			//셀들은 자신의 mapping.colspan값만 고려하고 렌더링하다보니 옆의 셀들이 삭제가 되지 않는다. 이부분을 처리.
			var cell = row.child[i];
			if(removalCount > 0) {
				row.child[i] = "";
				removalCount--;
			} else if(cell && cell.indexOf('colspan=') >= 0 && cell.indexOf('cell-vscroll-left-colspan')<0) {
				removalCount = Number($(cell).attr('colspan'))-1;
			}
		}
		if(option && option.returnRaw) {
			return row;
		}
		return _generateHTML(row);
	};
	AlopexGrid.prototype._redrawRow = function($row, data) {
		var self = this;
		//$row.hasClass('cloned-row')
		var dataIndex = null;
		if(!data) {
			dataIndex = $row.attr('data-alopexgrid-dataindex');
			if(!_valid(dataIndex)) {
				return;
			}
			dataIndex = Number(dataIndex);
			if(isNaN(dataIndex)) {
				return;
			}
			data = self.state.data[dataIndex];
		} else {
			dataIndex = Number(data._index.data);
		}
		var $fixcolrow = null;
		if(self.state.hasFixColumn) {
			if($row.hasClass('cloned-row')) {
				$fixcolrow = $row;
				$row = self.$tablebody.children('[data-alopexgrid-dataindex="'+dataIndex+'"]');
			} else {
				$fixcolrow = self.state.$fixcolbody.children('[data-alopexgrid-dataindex="'+dataIndex+'"]');
			}
		}
		var rowIndex = typeof data._index.row === "number" ? data._index.row :
			$.inArray(dataIndex, self.state.rendered);
		var $newrow = $(_convertAlopex.call(self, self._rowRender(data, dataIndex, rowIndex, {})));
		var fi = self._focusInfo();
		$row.replaceWith($newrow);
		if($fixcolrow) {
			var height = self._getRowHeight($newrow) + "px";
			$fixcolrow.replaceWith(
				_convertAlopex.call(self,
					self._rowRender(data, dataIndex, rowIndex,
						{columnLimit:self.state.fixupto,"css":{"height":height},
							"styleclass" : "cloned-row"})
				)
			);
			$newrow.children('.cell-fixcol').html('&nbsp;');
			$newrow.css("height",height);
		}
		if(data._state.editing && !data._state._editableStarted) {
			self._refreshEditableCell(dataIndex, $newrow);
		}
		self._focusRestore(fi);
	};
	function _getMappingFromColumnIndex(self, columnIndex) {
		var rmap = null;
		return self.state.columnIndexToMapping[columnIndex] || null;
		// $.each(columnMapping, function(i,mapping) {
		// 	if(mapping.columnIndex === null || mapping.columnIndex === undefined) return;
		// 	if(Number(columnIndex) === Number(mapping.columnIndex)) {
		// 		rmap = mapping;
		// 		return false;
		// 	}
		// });
		// return rmap;
	}
	function _getColumnKeyFromColumnIndex(self, columnIndex) {
		var key = null;
		return self.state.columnIndexToKeyMap[columnIndex];
		// $.each(columnMapping, function(i,mapping) {
		// 	if(mapping.columnIndex === null || mapping.columnIndex === undefined) return;
		// 	if(Number(columnIndex) === Number(mapping.columnIndex)) {
		// 		key = mapping.key || null;
		// 	}
		// });
		// return key;
	}
	function createSortingHandle(){
		return {
			tag: "div",
			attr: {
				styleclass: "sorting-handle"
			}
		};
	}
	function createResizingHandle(self, mapping){
		var handle = {
			tag: "div",
			attr: {
				styleclass: "resizing-handle",
				"data-alopexgrid-resizingcolumnindex" : mapping.columnIndex
			}
		};
		_addEventAttribute(handle, 'onmousedown', 
			"AlopexGrid.run('" + self.key + "','_columnResizeStart',event," 
				+ mapping.columnIndex + ");"
		);
		return handle;
	}

	AlopexGrid.prototype._headerRender = function(viewoption) {
		var self = this;
		var option = self.option;
		var headerMap = {child:[]};
		if(option.header) {

			var headerStacks = [];
			$.each(option.columnMapping, function(idx, mapping) {
				if(!_valid(mapping.columnIndex) || mapping.hidden===true) return;
				headerStacks[mapping.columnIndex] = [{colspan:1,rowspan:null,mapping:mapping}];
			});

			var headerGroup = null;
			if($.isArray(option.headerGroup)) {
				headerGroup = [];
				//컬럼이 감춰진경우 인덱스값을 보정
				$.each(option.headerGroup, function(idx, hg) {
					var g = $.extend({}, hg);
					var valid = false;
					//isColumnHidden(columnMapping, columnIndex)
					if (g.hasOwnProperty('fromIndex') && g.hasOwnProperty('toIndex')) {
						valid = true;
					} else if (g.hasOwnProperty('hideSubTitle')) {
						valid = true;
					}
					if (valid) {
						g._id = _generateUniqueId();
						headerGroup.push(g);
					}
				});

				function groupLength(mapping) {
					return mapping.toIndex - mapping.fromIndex +1;
				}
				if(self.option.headerGroupWiderFirst) {
					headerGroup.sort(function(f,l) {//put short ones in front.
						if(groupLength(f) > groupLength(l)) return 1;
						if(groupLength(f) < groupLength(l)) return -1;
						return 0;
					});
				} else {
					headerGroup.reverse();//stack headergroups in order.
				}
				var globalHideSubTitle = false;
				$.each(headerGroup, function(idx,group){
					if($.isPlainObject(group) && group.hideSubTitle === true
						&& !group.hasOwnProperty('fromIndex') && !group.hasOwnProperty('toIndex') ){
						//if headerGroup object was provided with only hideSubTitle property, all headerGroups
						//are affected as hideSubTitle:true
						globalHideSubTitle = true;
					}
				});
				$.each(headerGroup, function(idx,group){
					if(!$.isPlainObject(group)
						|| !group.hasOwnProperty('fromIndex')
						|| !group.hasOwnProperty('toIndex')) return;
					var hideSubTitle = globalHideSubTitle || group.hideSubTitle;
					var colspan = groupLength(group);
					if(colspan > 0) {
						if(!hideSubTitle) { //reserve for new row space
							for(var ci = group.fromIndex;ci<=group.toIndex;ci++) {
								if(!headerStacks[ci]) continue;
								headerStacks[ci].unshift(null);
							}
						} else {
							//clear cells under this group
							for(var ci = group.fromIndex;ci<=group.toIndex;ci++) {
								if(!headerStacks[ci]) continue;
								headerStacks[ci] = [];
							}
						}
						var actualColspan = 0;
						for(var ci=group.toIndex;ci>=group.fromIndex;ci--) {
							if(!headerStacks[ci]) continue;
							actualColspan++;
							if(ci === group.fromIndex) {
								headerStacks[ci][0] = {colspan:actualColspan,rowspan:null,mapping:group};
								fst = false;
							} else {
								headerStacks[ci][0] = null;
							}
						}
					}
				});
			}

			var rowcount = 0;
			for(var i=0;i<headerStacks.length;i++){
				if(!headerStacks[i]) continue;
				rowcount = _max(rowcount, headerStacks[i].length);
			}
			//ci = columnIndex, ri = row depth
			for(var ci=0;ci<headerStacks.length;ci++) {
				var headerStack = headerStacks[ci];
				if(!headerStack) continue;
				for(var ri=0;ri<headerStack.length;ri++) {
					var item = headerStack[ri];
					if(item && item.mapping && headerStack[ri+1] === undefined) {
						item.rowspan = rowcount - ri;
					}
				}
			}

			for(var i=0;i<rowcount;i++) {
				headerMap.child.push({tag:"tr",attr:{styleclass:"row header headerrow"},child:[]});
			}
			//resizing for headerGroup
			if(self.option.enableHeaderGroupResizing) {
				for(var ci=0;ci<headerStacks.length;ci++){
					var headerStack = headerStacks[ci];
					if(!headerStack) continue;
					for(var ri=headerStack.length-1;ri>=0;ri--) {
						var item = headerStack[ri];
						if(!item || !item.mapping) continue;
						var mapping = item.mapping;
						var isGroup = (mapping.hasOwnProperty('hideSubTitle') || mapping.hasOwnProperty('fromIndex'));
						if(isGroup) {
							var resizing = [];
							var fromIndex = mapping.fromIndex;
							var toIndex = mapping.toIndex;
							$.each(self.option.columnMapping, function(idx,m) {
								var ci = m.columnIndex
								if(!isColumnHidden(m) && fromIndex<=ci && ci<=toIndex && m.resizing) {
									resizing.push(m.columnIndex);
								}
							});
							if(resizing.length) {
								mapping.resizing = resizing;
							}
						}
						if(item.colspan > 1) { //to select actual last cell in row. 
							ci += (item.colspan - 1);
						}
						break;
					}
				}
			}

			//Cell Creating Routine
			//ci - columnIndex, ri - row depth(row index)
			for(var ci=0;ci<headerStacks.length;ci++){
				var headerStack = headerStacks[ci];
				if(!headerStack) continue;
				for(var ri=0;ri<headerStack.length;ri++) {
					var item = headerStack[ri];
					if(!item || !item.mapping) continue;
					var mapping = item.mapping;
					var isGroup = (mapping.hasOwnProperty('hideSubTitle') || mapping.hasOwnProperty('fromIndex'));
					var columnIndex = mapping.columnIndex;
					var cell = {
						tag : "th", attr:($.extend({}, mapping.titleattr)),child:[]
					};
					cell.attr["styleclass"] = (cell.attr["styleclass"] || "") + " cell header headercell";
					if(typeof mapping["styleclass"] === "string") {
						cell.attr["styleclass"] += (" " + mapping["styleclass"]);
					}
					if(typeof mapping["headerStyeclass"] === "string") {
						cell.attr["styleclass"] += (" " + mapping["headerStyleclass"]);	
					}
					if(item.colspan > 1) {
						cell.attr["colspan"] = item.colspan;
					}
					if(item.rowspan > 1) {
						cell.attr["rowspan"] = item.rowspan;
					}
					if(_valid(mapping.columnIndex)) {
						cell.attr["data-alopexgrid-columnindex"] = mapping.columnIndex;//mapping.columnIndex;
					}
					if(_valid(mapping.key)) {
						cell.attr["data-alopexgrid-key"] = mapping.key;
					}
					if(((mapping.columnIndex || mapping.fromIndex) + item.colspan) > self.state.maxColumnIndex) {
						cell.attr["styleclass"] += " lastcolumn lastcell";
					}
					if(mapping.selectorColumn && !(typeof mapping.title === "string" && self.option.allowSelectorColumnTitle)) {
						var input = {tag:"input",attr:{type:"checkbox",name:_generateUniqueId()}};
						if (option.rowClickSelect === "only" || option.rowSingleSelect) {
							input.attr["disabled"] = "disabled";
						} else {
							_addEventAttribute(cell, 'onclick', "AlopexGrid.run('" + self.key + "','_rowSelectAll',event,this);");
						}
						if (self.state.selectAll) {
							input.attr["checked"] = "checked";
						}
						cell.child = input;
						_addClassAttribute(cell, 'selector-column');
					} else {
						cell.child.push(mapping.title || '&nbsp;');
					}
					if(isGroup) { 
						_addClassAttribute(cell, 'header-group');
					}
					if($.isArray(headerGroup)) {
						for ( var hi in headerGroup) {
							var hg = headerGroup[hi];
							var groupfidx = Number(hg.fromIndex);
							var grouptidx = Number(hg.toIndex);
							var mappingfidx = Number(mapping.columnIndex);
							var mappingtidx = Number(mapping.columnIndex);
							if(isGroup && hg._id !== mapping._id) {
								mappingfidx = Number(mapping.fromIndex);
								mappingtidx = Number(mapping.toIndex);
							}
							if (groupfidx <= mappingfidx && mappingtidx <= grouptidx) {
								_addClassAttribute(cell, 'header-group-sub');
								if(groupfidx === mappingfidx) {
									_addClassAttribute(cell, 'header-group-sub-first');
								}
								if(grouptidx === mappingtidx) {
									_addClassAttribute(cell, 'header-group-sub-last');
								}
							}
							if(mappingtidx === (groupfidx-1)) {
								_addClassAttribute(cell, 'header-before-group');
							}
						}
					}
					if(item.rowspan > 1) {
						_addClassAttribute(cell, 'header-group-rowspan');
						if(item.rowspan === rowcount) {
							_addClassAttribute(cell, 'header-group-rowspan-all');
						}
					}
					if (mapping.rowspan) {
						_addClassAttribute(cell, 'header-rowspan');
						if (mapping.rowspan == "always") {
							_addClassAttribute(cell, 'header-rowspan-always');
						}
						if (mapping.rowspan.by !== undefined) {
							_addClassAttribute(cell, 'header-rowspan-by');
						}
					}
					var sorting = mapping.sorting;
					var resizing = _readMappingProp(mapping, 'resizing');
					if((sorting || resizing) && !self.state.forceRenderAll) {
						var wrap = {
							tag: "div",
							attr: {
								styleclass: "relative-wrap"
							},
							child: [cell.child]
						};
						if (sorting && mapping.key) {
							_addClassAttribute(cell, 'sorting');
							var handle = null;
							if(option.hideSortingHandle!==true) {
								handle = createSortingHandle();
								wrap.child.push(handle);
							}
							//TODO state.sortingColumn은 1차소팅 정보, 
							//multi level 정렬을 하는 경우 sorting handle에 숫자를 써주도록 한다.
							//multi level 정렬정보를 담는 저장소를 참조해야 한다.
							if (self.state.sortingColumn !== undefined) {
								if (Number(mapping.columnIndex) === Number(self.state.sortingColumn)) {
									var dir = self.state.sortingDirection || "asc";
									_addClassAttribute(cell, dir);
									if(self.state.sortingMulti && self.state.sortingMulti.length && handle) {
										handle.child = "1";
									}
								}
								if(self.state.sortingMulti) {
									$.each(self.state.sortingMulti, function(sortingOrder,sortingMultiItem){
										if(sortingMultiItem.sortingColumn === Number(mapping.columnIndex) ||
											sortingMultiItem.sortingKey === mapping.key) {
											_addClassAttribute(cell, sortingMultiItem.sortingDirection || "asc");
										handle.child = parseInt(sortingOrder+2);
										}
									});
								}
							}
							if(!self.option.disableHeaderClickSorting) {
								_addEventAttribute(cell, 'onclick', 
									"AlopexGrid.run('" + self.key + "','_sortToggle'," 
									+ columnIndex + ",null,event);");		
							}
						}
						if (resizing) {
							if($.isArray(resizing)) {
								var widthmap = self.state.columnWidthMap = self._calcCellWidth();
								var $trow = $('<tr class="row header headerrow temprow2"><th class="cell header headercell">'
									+'<div class="relative-wrap">&nbsp;</div></th></tr>');
								self.$tableheader.append($trow);
								var compensate = parseInt($trow.children().css('padding-right')) || 0;
								$trow.remove();
								var offset = -compensate;
								var sumof = [];
								for(var rci = mapping.toIndex; rci>=mapping.fromIndex; rci--) {
									var handle = createResizingHandle(self, {columnIndex:rci});
									handle.attr.style = handle.attr.style || "";
									if(rci !== mapping.toIndex) {
										handle.attr.style += "right:"+offset+"px;";
										handle.attr["data-alopexgrid-resizingsumof"] = sumof.join(',');
										handle.attr["data-alopexgrid-resizingcompensate"] = String(compensate);
									}
									sumof.push(rci);
									offset += widthmap[rci];
									if($.inArray(rci, resizing)>=0){
										wrap.child.push(handle);	
									}
								}
							} else {
								wrap.child.push(createResizingHandle(self, columnIndex));
							}
							_addClassAttribute(cell, 'resizing');
						}
						cell.child = wrap;
					}
					headerMap.child[ri].child[ci] = cell;
				}
			}
		}
		if(self.option.filteringHeader) {
			headerMap.child.push(self._filterRowRender());
		}
		if(self._hasFooter("top")) {
			headerMap.child.push(self._footerRowRender());
		}
		if(self._hasPinnedData()) {
			headerMap.child = headerMap.child.concat(self._pinnedRender());
		}
		var lastrow = headerMap.child[headerMap.child.length-1];
		if($.isPlainObject(lastrow)) {
			lastrow.attr = lastrow.attr || {};
			lastrow.attr.styleclass += " lastrow";
		}
		return _generateHTML(headerMap);
	};

	var _filterFunction = {
		'lt' : function(data, key, value) {
			return (Number(data[key]) < Number(value));
		},
		'lte' : function(data, key, value) {
			return (Number(data[key]) <= Number(value));
		},
		'gt' : function(data, key, value) {
			return (Number(data[key]) > Number(value));
		},
		'gte' : function(data, key, value) {
			return (Number(data[key]) >= Number(value));
		},
		'equal' : function(data, key, value) {
			return (String(data[key]) === String(value));
		},
		'notequal' : function(data, key, value) {
			return (String(data[key]) !== String(value));
		},
		'contain' : function(data, key, value) {
			return (String(data[key]).indexOf(String(value)) >= 0);
		},
		'notcontain' : function(data, key, value) {
			return (String(data[key]).indexOf(String(value)) < 0);
		},
	};
	//filterData에 사용 가능한 형태.
	//lt,lte,gt,gte,equal,notequal,contain,notcontain
	//self.state.filter[columnIndex 3] = {type:'lt',value:'100',key:'USR_CODE'}
	//--> function(data) { return data[key] < value; }
	//실제 필터링시에만 사용. 렌더링에는 활용하지 않음.
	AlopexGrid.prototype._filterDataToFunction = function(filterData) {
		var self = this;
		var type = filterData.type;
		var key = filterData.key;
		var value = filterData.value;
		return function(data){
			return _filterFunction[type](data, key, value);
		};
	};
	//filtering cell의 select와 textinput을 생성한다.
	AlopexGrid.prototype._drawFilterUnit = function(filterData) {
		var self = this;
		var markup = [];
		var type = filterData.type || "";
		var value = filterData.value || "";
		var key = filterData.key;
		markup.push('<input type="hidden" class="alopexgrid-filter-key" name="alopexgrid-filter-key" value="',key,'"/>');
		markup.push('<input class="alopexgrid-filter-value" name="alopexgrid-filter-value" value="',value,'"/>');
//		markup.push('<select class="alopexgrid-filter-type" name="alopexgrid-filter-type">')
//		$.each(self.option.filterTypeNameMap, function(presetType, name){
//			markup.push('<option value="',presetType,'"')
//			markup.push((presetType===type) ? ' selected="selected"' :'','>',name,'</option>');
//		});
//		markup.push('</select>');
		markup.push('<button class="alopexgrid-filter-submit" type="button"');
		var eventhandler = ["AlopexGrid.run('",self.key,"','_parseFilterHeader',event);"].join('');
		//markup.push(' onclick="',eventhandler,'"');
		markup.push('>&nbsp;</button>');
		if(!self.state.forceRenderAll) {
			markup.push('<ul data-type="dropdown">');
			$.each(self.option.filterTypeNameMap, function(presetType, name){
			  markup.push('<li><a');
			  markup.push(' value="',presetType,'"');
			  markup.push(' onclick="',eventhandler,'"');
			  markup.push('>',name,'</a></li>');
			});
			markup.push('</ul>');	
		}
		return markup.join('');
	};
	//filtering cell의 select와 textinput으로부터 filterData를 생성한다. 
	//filterData가 없다면 null을 리턴한다.
	AlopexGrid.prototype._parseFilterUnit = function(unit, e) {
		var self = this;
		var filterData = {};
		var $unit = $(unit);
		var targetEl = e.target? e.target:e.currentTarget;
		//filterData.type = $unit.find('.alopexgrid-filter-type').val();
		filterData.type = $(targetEl).attr('value');
		filterData.key = $unit.find('.alopexgrid-filter-key').val();
		filterData.value = $unit.find('.alopexgrid-filter-value').val();
		if(filterData.value === "" || filterData.value === undefined || filterData.value === null) {
			return null;
		}
		return filterData;
	};
	AlopexGrid.prototype._parseFilterHeader = function(e) {
		var self = this;
		self._showProgress(function(){
			var $filterunits = self.$wrapper.find('.filter-cell-unit');
			var filterDataList = $filterunits.map(function(idx, filterUnit){
				var filterData = self._parseFilterUnit(filterUnit,e);
				filterData ? (filterData.columnIndex = $(filterUnit).attr('data-alopexgrid-columnindex')) : +0;
				return filterData || undefined;
			});
			self.clearFilter(true);
			filterDataList.each(function(idx, filterData){
				self.setFilter(filterData.columnIndex, filterData, true);
			});
			self._simpleRedraw();
			self.pageInfo();
		},10);
	};
	AlopexGrid.prototype._filterCellRender = function(mapping){
		var self = this;
		var columnIndex = mapping.columnIndex;
		var filterCell = { 
			tag : "td", 
			child : "&nbsp;", 
			attr : {
				styleclass:"cell filtercell"+(columnIndex===self.state.maxColumnIndex?" lastcell":"")//,
				//'data-alopexgrid-columnindex':columnIndex
			}
		};
		if(!self.state.forceRenderAll) {
			filterCell.attr['data-alopexgrid-columnindex'] = columnIndex;
		}
		if(mapping.key) {
			var filterData = (self.state.filter ? self.state.filter[columnIndex] : null) || {key:mapping.key};
			var filterUI = {
				tag : 'div',
				child : self._drawFilterUnit(filterData),
				attr : {
					styleclass:"filter-cell-unit"//,
					//'data-alopexgrid-columnindex':columnIndex		
				}
			};
			if(!self.state.forceRenderAll) {
				filterUI.attr['data-alopexgrid-columnindex'] = columnIndex;
			}
			// var eventhandler = ["AlopexGrid.run('",self.key,"','_headerFilterChange',this,event);"].join('');
			// _addEventAttribute(filterCell, 'onclick', eventhandler);
			// _addEventAttribute(filterCell, 'onkeyup', eventhandler);
			// _addEventAttribute(filterCell, 'onchange', eventhandler);
			filterCell.child = filterUI;
		}
		return filterCell;
	};
	AlopexGrid.prototype._filterRowRender = function(){
		var self = this;
		if(!self.option.filteringHeader) return null;
		var filterRow = {
			tag : 'tr',
			attr : {
				styleclass : 'row filterrow'
			},
			child:[]
		};
		for(var i=0;i<self.option.columnMapping.length;i++) {
			var mapping = self.option.columnMapping[i];
			if(!isMappingVisible(mapping)) continue;
			var columnIndex = mapping.columnIndex;
			filterRow.child[columnIndex] = self._filterCellRender(mapping);
		}
		return filterRow;
	};
	AlopexGrid.prototype._needEditedRefresh = function(){
		var self = this;
		self._footerRefresh();
		self._pinnedRefresh();
	};

	AlopexGrid.prototype._hasFooter = function(position) {
		var self = this;
		var option = self.option;
		if($.isPlainObject(option.footer) && $.isArray(option.footer.footerMapping)
				&& option.footer.footerMapping.length) {
			if(position && option.footer.position && option.footer.position !== position) {
				return false;
			}
			return true;
		}
		return false;
	};

	AlopexGrid.prototype._footerRowRender = function(columnLimit){
		var self = this;
		var option = self.option;
		if(self._hasFooter()) {
			option.footer.data = {};
			var footerRow = { tag: "tr", attr: { styleclass: "row footerrow" }, child : [] };
			for (var i = 0; i <= self.state.maxColumnIndex; i++) {
				if(!isMappingVisible(self.option.columnMapping[i])) continue;
				footerRow.child[i] = { tag : "td", child : "&nbsp;"
					, attr : {styleclass:"cell footercell"+(i===self.state.maxColumnIndex?" lastcell":"")}};
			}
			for(var i=0,l=option.footer.footerMapping.length; i<l; i++) {
				var mapping = option.footer.footerMapping[i];
				var value = self._footerValueByMapping(mapping);
				if(mapping.columnIndex === null || mapping.columnIndex === undefined) {
					continue;
				}
				if(self.isColumnHidden(mapping.columnIndex)) continue;
				var bodymapping = _getMappingFromColumnIndex(self, mapping.columnIndex);
				var footerCell = footerRow.child[bodymapping.columnIndex];
				footerCell.attr["data-alopexgrid-columnindex"] = mapping.columnIndex;//mapping.columnIndex;
				footerCell.attr["styleclass"] += (" alopex-columnindex-"+mapping.columnIndex);
				if(mapping.align) {
					footerCell.attr.styleclass += " align-"+mapping.align;
				}
				if(mapping.styleclass) {
					var classString = mapping.styleclass;
					if($.isFunction(classString)) {
						classString = classString(value, $.extend({}, self.state.footerData), mapping);
					}
					if(classString && typeof classString === "string") {
						footerCell.attr["styleclass"] += (' ' + classString);
					}
				}
				if(mapping.colspan) {
					var colspanValue = mapping.colspan;
					footerCell.attr["colspan"] = colspanValue;
				}
				footerCell.child = value;
			}
			for(var i=0;i<footerRow.child.length;i++) {
				var footerCell = footerRow.child[i];
				if(!footerCell) continue;
				if(footerCell.attr.colspan) {
					for(var j=i+1;j<i+Number(footerCell.attr.colspan);j++) {
						footerRow.child[j] = null;
					}
				}
			}
			return footerRow;
		}
		return null;
	};

	AlopexGrid.prototype._footerRefresh = function(){
		var self = this;
		var option = self.option;
		if(self._hasFooter()) {
			var $footerrows = self.$root.find('.footerrow');
			for(var i=0,l=option.footer.footerMapping.length; i<l;i++) {
				var footerMap = option.footer.footerMapping[i];
				var columnIndex = footerMap.columnIndex;
				var value = self._footerValueByMapping(footerMap);
				if(columnIndex === null || columnIndex === undefined) continue;
				$footerrows.find('.alopex-columnindex-'+columnIndex)
					.html(value);
			}
		}
	};
	
	function _addCommas(x) {
		var parts = String(x).split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	//TODO filter되었을 때의 footer 대상 데이터는?
	var _footerRenderer = {
		"sum" : function(param){
			var self = this;
			var key = _footerParamToKey(self, param);
			var sum = 0;
			var precision = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var value = self.state.data[i][key];
				if(!isNaN(Number(value))) {
					sum += Number(value);
					precision = _max(precision, (String(value).split(".")[1]||"").length);
				}
			}
			return _addCommas(parseFloat(sum).toFixed(precision));
		},
		"average" : function(param){
			var self = this;
			var key = _footerParamToKey(self, param);
			var sum = 0;
			var count = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var value = self.state.data[i][key];
				if(!isNaN(Number(value))) {
					sum += Number(value);
					count++;
				}
			}
			return _addCommas(!count ? 0 : Math.round(sum/count*10)/10);
		},
		"stdev" : function(param) {
			var self = this;
			var key = _footerParamToKey(self, param);
			var integral = 0;
			var sum = 0;
			var count = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var value = self.state.data[i][key];
				if(!isNaN(Number(value))) {
					sum += Number(value);
					integral += (Number(value)*Number(value));
					count++;
				}
			}
			return _addCommas(!count ? 0 : Math.round(Math.sqrt( (integral/count) - (sum/count)*(sum/count) )*10)/10);
		},
		"count" : function(param){
			var self = this;
			var key = _footerParamToKey(self, param);
			var count = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var value = self.state.data[i][key];
				if(_valid(value) && value) count++;
			}
			return _addCommas(count);
		},
		"countif" : function(param,value){
			var self = this;
			var key = _footerParamToKey(self, param);
			var count = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var datavalue = self.state.data[i][key];
				if(datavalue !== undefined && datavalue !== null && datavalue === value) count++;
			}
			return _addCommas(count);
		},
		"min" : function(param) {
			var self = this;
			var key = _footerParamToKey(self, param);
			var min = undefined;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var datavalue = self.state.data[i][key];
				if(min === undefined || Number(datavalue) < Number(min)) {
					min = Number(datavalue);
				}
			}
			return _addCommas(min);
		},
		"max" : function(param) {
			var self = this;
			var key = _footerParamToKey(self, param);
			var max = 0;
			for(var i=0,l=self.state.data.length;i<l;i++) {
				var datavalue = self.state.data[i][key];
				if(Number(datavalue) > Number(max)) {
					max = Number(datavalue);
				}
			}
			return _addCommas(max);
		},
		"key" : function(key) {
			var self = this;
			self.state.footerData = self.state.footerData || {};
			var value = self.state.footerData[key];
			return _valid(value) ? value : "";
		}
	};
	function _footerParamToColumnIndex(cstr) {
		return Number(cstr.split("c").pop());
	}
	function _footerParamToKey(self,cstr) {
		var key = null;
		var ci = Number(cstr);
		if(isNaN(ci)) {
			if(cstr.charAt(0) == "c") {
				ci = Number(cstr.split("c").pop());
				key = _getColumnKeyFromColumnIndex(self, ci);
			}
			if(key === null) {
				key = cstr;
			}
		} else {
			key = _getColumnKeyFromColumnIndex(self, ci);
		}
		return key;
	}

	AlopexGrid.prototype._footerValueByMapping = function(footerMap) {
		//columnIndex:footer가 표시될컬럼위치, render : 계산할내용, title : 이게 우선. value는 무조건 title
		if(typeof footerMap.title === "string") {
			//무조건 타이틀이 우선
			return footerMap.title;
		}
		var self = this;
		var result = [];

		if(footerMap.render) {
			var render = footerMap.render;
			if(typeof render === "string") render = [render];
			for(var i=0,l=render.length;i<l;i++) {
				var func = render[i];
				if($.isFunction(func)) {
					result.push(func($.extend(true, [], self.state.data)));
				} else {
					var method = (func.match(/((^\w+)[(].+[)])/i) || [null]).pop();
					var param = (func.match(/[^(]*\(([^)]*)\)/) || ['',null])[1];
					var params = param ? param.split(/\W+/) : null;

					if(!method) {
						result.push(func);
					} else if($.isFunction(_footerRenderer[method])) {
						result.push(_footerRenderer[method].apply(self, params));
					}	
				}
			}
		}
		var value = result.join('');
		if(footerMap.key) {
			self.state.footerData[footerMap.key] = value;
		}
		return (!value || !value.length) ? "&nbsp;" : value;
	};
	AlopexGrid.prototype._footerData = function(key, value) {
		this.state.footerData = this.state.footerData  || {};
		if(value === null || value === undefined) {
			delete this.state.footerData[key];
		} else {
			this.state.footerData[key] = value;
		}
	};
	AlopexGrid.prototype.footerData = function() {
		var self = this;
		var args = $.makeArray(arguments);
		self.state.footerData = self.state.footerData || {};
		var dataChanged = false;
		if($.isPlainObject(args[0])) {
			for(var prop in args[0]) {
				if(args[0].hasOwnProperty(prop)) {
					self._footerData(prop, args[0][prop]);
					dataChanged = true;
				}
			}
		} else if(typeof args[0] === "string") {
			var key = args[0];
			var value = args[1];
			if(args.length < 2) {
				value = self.state.footerData[key];
				return _valid(value) ? value : null;
			} else {
				self._footerData(key, value);
				dataChanged = true;
			}
		}
		if(dataChanged) {
			self._needEditedRefresh();
		}
		if(!args.length) {
			return $.extend({},self.state.footerData);
		}
	};

	AlopexGrid.prototype.sortClear = function() {
		var self = this;
		self.$wrapper.find('.headercell.sorting').removeClass("asc desc");
		self.state.sortingColumn = undefined;
		self.state.sortingDirection = undefined;
		self.state.sortingMulti = undefined;

		self._showProgress(function(done){
			var tret = null;
			var params = null;
			if(self.option.on && $.isFunction(self.option.on.sortClear)) {
				params = getParamNames(self.option.on.sortClear);
				tret = self.option.on.sortClear.call(
					self,
					self.option.pager ? $.extend({},self.option.paging) : null,
					done);
			}
			if(tret === false) {
				if(!params || (params && params.length<2)) {
					done();
				}
				return;
			}
			if (self.state.columnRowspanned) {
				for ( var i in self.option.columnMapping) {
					var mapping = self.option.columnMapping[i];
					if (mapping.rowspan === "asc" || mapping.rowspan === "desc") {
						self._dataDraw({
							tableheader: {
								display: 'none'
							}
						});
						break;
					}
				}
			}
			if(!params || (params && params.length<2)) {
				done();
			}
		}, 0, true);
	};

	function _isEmptyQuery(query) {
		return (!query || $.isEmptyObject(query));
	}

	AlopexGrid.prototype._noData = function() {
		if (!this.state.data || !this.state.data.length) {
			return true;
		}
		return false;
	};

	//data arrange. sort, subsum, tree items, etc
	AlopexGrid.prototype._dataArrange = function(targetList, columnIndexKey, direction, filterMethod){
		var self = this;
		self.state.data = self.state.data || [];
		var isCustomList = !!targetList;
		var sortingColumnIndex = -1;
		var sortingKey = null;//TODO self.state.sortingColumn 속성 처리에 대한 문제. key값 기준으로 정렬할 때에는?
		var sortingDirection = (isCustomList ? direction : self.state.sortingDirection);
		var sortingType = "string";
		var targetMapping = null;

		var hasRowspan = false; //self.state.columnRowspanned
		var rowspanAlways = false;
		var rowspanAlwaysMapping = null;

		targetList = targetList || self.state.data;

		$.each(self.option.columnMapping, function(idx, mapping) {
			//if(isMappingVisible(mapping) && mapping.rowspan)
			if(mapping.rowspan) {
				hasRowspan = true;
				//Doesn't perform rowspan Always packing when custom list is provided.
				rowspanAlways = !isCustomList && (mapping.rowspan === "always");
				if(rowspanAlways) {
					rowspanAlwaysMapping = mapping;
				}
			}
		});

		//determine sortingKey and sortingType for sure.
		if(isCustomList || _valid(self.state.sortingColumn)) {
			var mapping = self.columnInfo(isCustomList ? columnIndexKey : self.state.sortingColumn);
			if (mapping) {
				sortingColumnIndex = Number(mapping.columnIndex);
				sortingKey = mapping.key;
				if(mapping.sorting === "number") {
					sortingType = "number";
				}
				targetMapping = mapping;
			}
		}

		if(self.option.autoSortingType && targetMapping.sorting === true) {
			var allNumber = true;
			$.each(targetList, function(idx, data){
				if(data[sortingKey] !== undefined && !$.isNumeric(data[sortingKey])) {
					allNumber = false;
					return false;
				}
			});
			if(allNumber) {
				sortingType = "number";
			}
		}

		var sortingTypeFilter = (sortingType === "number") ? Number : String;

		if(sortingKey) {
			//XXX rowspan:"always", string/number sorting
			var order = sortingDirection === "desc"? -1 : 1;
			var formerAndLatter = -1 * order;
			var latterAndFormer = 1 * order;
			if(rowspanAlways) {
				_rowspanPack(targetList, rowspanAlwaysMapping);
				_generateDataIndex(targetList);
				targetList.sort(function(former, latter){
					//always컬럼 값이 같을때엔 실제 sortingKey 기준으로 정렬을.
					//rowspanAlways컬럼의 값이 다를때엔 순서 보장으로..
					var fval = sortingTypeFilter(former[sortingKey]);
					var lval = sortingTypeFilter(latter[sortingKey]);
					var rfval = former[rowspanAlwaysMapping.key];
					var rlval = latter[rowspanAlwaysMapping.key];
					if(rfval === rlval) {
						if(fval < lval) {
							return formerAndLatter;
						} else if(fval > lval) {
							return latterAndFormer;
						} else {
							return former._index.data - latter._index.data;
						}
					} else {
						return former._index.data - latter._index.data;
					}
				});
			} else {
				targetList.sort(function(former, latter){
					//-1 : former , latter
					//1 : latter, former
					var fval = sortingTypeFilter(former[sortingKey]);
					var lval = sortingTypeFilter(latter[sortingKey]);
					if(fval < lval) {
						return formerAndLatter;
					} else if(fval > lval){
						return latterAndFormer;
					} else {
						//sort stability
						return former._index.data - latter._index.data;
					}
				});
			}
		}

		if(hasRowspan) {
			//TODO generate rowspan index...
		}

		if(!isCustomList) {
			self._generateDataIndex(targetList);
			self.state.columnRowspanned = hasRowspan;
		}
		return targetList;
	};
	AlopexGrid.prototype._sortInternalData = function(_list, _col, _dir, _filter) {
		var self = this;
		var option = this.option;
		this.state.data = this.state.data || [];
		var vdata = ($.isArray(_list)) ? $.extend(true, [], _list) : this.state.data;
		var sortingColumn = (_col !== undefined) ? _col : Number(this.state.sortingColumn);
		var sortingMapping = null;
		var dir = _dir ? _dir : this.state.sortingDirection;
		var sorted = false;
		var hasRowspan = false;
		var rowspanAlwaysColumn = null;
		var rowspanAlways = false;
		var rowspanMapping = [];
		var collen = 0;//for rowspanindex.

		self.state.groupRowspanned = false;
		self.state.columnRowspanned = false;
		delete self.state.rowspanindex;
		self.state.rowspanindex = null;

		for ( var i in option.columnMapping) {
			var mapping = option.columnMapping[i];
			if (!isNaN(Number(mapping.columnIndex)) && mapping.key) {
				collen++;
			}
			if (sortingColumn === Number(mapping.columnIndex)) {
				sortingMapping = mapping;
			}
			if (mapping.rowspan === "always") {
				rowspanAlways = mapping;
				rowspanAlwaysColumn = Number(mapping.columnIndex);
			}
			if (mapping.rowspan) {
				hasRowspan = true;
			}
			if (mapping.rowspan === true || mapping.rowspan === "always") {
				rowspanMapping.push(mapping);
			}
		}
		var useSortingMulti = $.isArray(self.state.sortingMulti) && self.state.sortingMulti.length;
		//rowspanalways가 없으면 일반 정렬수행
		function sortfunc(array, key, filt, dir, begin, end) {
			var order = dir === "asc" ? 1 : (dir === "desc" ? -1 : 0);
			if (order === 0) { //sort() is not stable over browsers
				return false;
			}
			var partial = !!(begin || end);
			begin = begin || 0;
			end = end || array.length;
			var workingfilter = filt || "string";
			if(filt === true) workingfilter = "string";
			var detected = typeof filt === "string" ? true : false;
			//vdata.sort(function(former,latter) {//오름차순정렬은 order=1
			var comparison = function(former, latter) {
				var fv = former[key];
				var lv = latter[key];
				if($.isFunction(workingfilter)) {
					var ret = workingfilter(fv, lv) || 0;
					return ret * order;
				}
				if(self.option.autoSortingType && !detected) {
					var fvnum = $.isNumeric(fv);
					var lvnum = $.isNumeric(lv);
					if(fvnum && lvnum) {
						workingfilter = "number";
						detected = true;
					} else if(fvnum && !lv) {
						workingfilter = "number";
						detected = true;
					} else if(!fv && lvnum) {
						workingfilter = "number";
						detected = true;
					} else if(fv && lv && !fvnum && !lvnum){
						workingfilter = "string";
						detected = true;
					}
				}
				var filter = workingfilter == "number" ? Number : String;

				if (fv === undefined || fv === null) {
					fv = workingfilter === "number" ? Number.NEGATIVE_INFINITY : "";
				}
				if (lv === undefined || lv === null) {
					lv = workingfilter === "number" ? Number.NEGATIVE_INFINITY : "";
				}
				if(typeof workingfilter === "string") {
					fv = filter(fv);
					lv = filter(lv);
				}
				//if (workingfilter !== "number") {
//                if(typeof fv === "string") {
//					fv = fv.toLowerCase();
//                }
//                if(typeof lv === "string") {
//					lv = lv.toLowerCase();
//				}
				var ret = 0;
				if (fv < lv) {
					return -1 * order;
				}
				else if (fv > lv) {
					return 1 * order;
				}
				if(useSortingMulti) {
					var cur = 0;
					//TODO option.multiSorting으로 할 것인지. 또는 사용자 옵션 파싱해서 따로 쓸 것인지.
					//API로 호출하는 경우? 그리고 sortClear가 되는 경우.
					var curEnd = self.state.sortingMulti.length;
					while(cur < curEnd) {
						var criteria = self.state.sortingMulti[cur];
						var suborder = (criteria.sortingDirection ==="desc") ? -1 : 1;
						var subkey = self.state.columnIndexToKeyMap[criteria.sortingColumn] || criteria.sortingKey;
						var subfilt = criteria.sortingType || (self.state.columnIndexToMapping[criteria.sortingColumn] || {}).sorting || "string";
						var subfilter = String;
						if(subfilt === "number") {
							subfilter = Number;
						}
						if(!subkey) break;
						var sfv = subfilter(former[subkey]);
						var slv = subfilter(latter[subkey]);
						if(sfv === slv) {
							cur++;
							continue;
						}
						if(sfv < slv) {
							return -1 * suborder;
						}
						if(sfv > slv) {
							return 1 * suborder;
						}
						return 0;
					}
				}
				return (former._index.data - latter._index.data) || 0;
			};
			if(self.option.useNativeSorting) {
				var part = partial ? array.splice(begin, end-begin) : array;
				part.sort(comparison);
				if(partial) {
					part.unshift(begin, 0);
					array.splice.apply(array, part);	
				}
			} else {
				_sort(array, comparison, begin, end);
			}
			return true;
		}
		//동적바인딩 적용시 정렬을 하지 않는다.
		if (!rowspanAlways && dir && sortingColumn !== undefined &&
				(!this.state.dynamicBinding || self.option.clientSortingOnDynamicDataSet)
			) {
			for ( var i in option.columnMapping) {
				var mapping = option.columnMapping[i];
				var sorting = mapping.sorting;
				if ((sorting || _list) && Number(mapping.columnIndex) === sortingColumn) {
					sortfunc(vdata, mapping.key, _filter || sorting, dir);
					sorted = true;
				}
			}
		}
		//rowspan을 반드시 실시하는 컬럼이 있을 경우 이에 따라 묶음수행. _rowspanPack은 필요에 따라 호출한다.
		//_rowspanPack(vdata, mapping)
		if (rowspanAlways && sortingColumn !== undefined) {
			//always가 정렬로 선택된 컬럼이거나. 또는 by가 지정하는 컬럼이 정렬로 선택되었는데
			//by가 지정하는 컬럼이 always인 경우는 always항목에 준하여 sorting을 수행해야 한다.
			if (rowspanAlwaysColumn === sortingColumn
			//|| rowspanAlwaysColumn === (sortingMapping.rowspan ? sortingMapping.rowspan.by : false)
				) {
				//이때엔 세부정렬 기준이 있을시 이에 의거한 정렬을 우선 수행 후.
				//rowspan always의 정렬을 수행한다.
				var submap = false;
				for ( var i in option.columnMapping) {
					var mapping = option.columnMapping[i];
					if (mapping.key && (mapping.rowspan == "asc" || mapping.rowspan == "desc")) {
						submap = mapping;
						break;
					}
				}
				if (submap) {
					//세부기준에 의거한 sorting을 수행한다.
					sortfunc(vdata, submap.key, null, submap.rowspan);
				}
				//always항목에 의거한 sorting을 수행한다.
				sortfunc(vdata, rowspanAlways.key, null, dir);
				if (rowspanAlwaysColumn === (sortingMapping.rowspan ? sortingMapping.rowspan.by : false)) {
					//TODO always에 의거하여 packing을 실시한 뒤, by를 가지는 sortingColumn의 값들을 기준으로
					//pack된 값들을 정렬해야 한다.
					sortfunc(vdata, sortingMapping.key, null, dir);
					_rowspanPack(vdata, rowspanAlways);
				}
			} else {
				//이때는 rowspanalways항은 있는대로 놔두긴 하지만
				//대신 _rowspanPack을 수행하여 묶어내고.
				//이들에 대해 묶이는 아이템들에 대해 일일이 부분정렬을 sortingColumn에 의하여 정렬한다.
				//_sort(vdata, comparision, begin, end)
				_rowspanPack(vdata, rowspanAlways);

				//rowspan=asc|desc처리. 이 처리는 사용자 지정된 sortingColumn보다 먼저 일어나야 한다.
				for ( var i in option.columnMapping) {
					var mapping = option.columnMapping[i];
					if (mapping.rowspan === "asc" || mapping.rowspan === "desc") {
						var begin = 0;
						var end = vdata.length;
						var sortingkey = mapping.key;
						while (begin < end) {
							var from = begin;
							var to = begin + 1;
							//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
							while (to < end && vdata[from][rowspanAlways.key] === vdata[to][rowspanAlways.key]) {
								to++;
							}
							sortfunc(vdata, sortingkey, null, mapping.rowspan, from, to);
							begin = to;
						}
					}
				}

				var begin = 0;
				var end = vdata.length;
				var sortingkey = null;
				for ( var i in option.columnMapping) {
					if (Number(option.columnMapping[i].columnIndex) === Number(sortingColumn)) {
						sortingkey = option.columnMapping[i].key;
					}
				}
				while (begin < end) {
					var from = begin;
					var to = begin + 1;
					//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
					while (to < end && vdata[from][rowspanAlways.key] === vdata[to][rowspanAlways.key]) {
						to++;
					}
					sortfunc(vdata, sortingkey, null, dir, from, to);
					begin = to;
				}
			}
		} else if (rowspanAlways && (sortingColumn === undefined || sortingColumn === null)) {
			_rowspanPack(vdata, rowspanAlways);
		}

		if(self.option.grouping) {
			//TODO n단 grouping을 실시할 수 있도록. 아래 구현은 1차원 grouping
			//실제는 grouping 대상 key에 대해 우선순위를 정해서
			//상위부터 묶고, 다시 하위에서 묶는 방식으로 적용해야 함.
			if(self.option.grouping.by && self.option.grouping.useGrouping) {
				if(_list===undefined) {
					self._generateDataIndex(vdata);
				}

				var groupBy = self.option.grouping.by;
				groupBy = $.isArray(groupBy) ? groupBy : [groupBy];
				if(groupBy[0]===true) {
					groupBy = groupBy.slice(1);
				}
				//_rowspanPack(vdata, {rowspan:"always",key:self.option.grouping.by});
				var groupOccurrenceMap = {};
				var groupOccurrenceOrder = {};
				$.each(groupBy, function(idx, groupname){
					var groups = vdata.map(function(data){return data[groupname];});

					groupOccurrenceMap[groupname] = groups.filter(function(value,index,thisArg){
						return thisArg.indexOf(value) === index;
					});
					groupOccurrenceOrder[groupname] = {};
					$.each(groupOccurrenceMap[groupname], function(idx,v){
						groupOccurrenceOrder[groupname][v] = idx;
					});
				});
				//groupOccurrenceMap의 array는 출현순서대로 array가 구성된다.
				//이 순서대로 vdata의 데이터들을 splice해서 묶으면 될 것? n단그룹에서 문제가 됨.
				var bylen = groupBy.length;
				vdata.sort(function(former,latter){
					for(var i=0;i<bylen;i++) {
						var compareKeyName = groupBy[i];
						var formerVal = former[compareKeyName];
						var latterVal = latter[compareKeyName];
						var fo = groupOccurrenceOrder[compareKeyName][formerVal];
						var lo = groupOccurrenceOrder[compareKeyName][latterVal];
						if(fo < lo) {
							return -1;
						}
						if(fo > lo) {
							return 1;
						}
					}
					//끝까지 값이 같으면 원래 순서대로 앞뒤를 정한다.
					return former._index.data - latter._index.data;
				});

				//if(self.option.grouping.useGroupRowspan) {
				if(true) {
					//데이터들이 자신의 dataIndex와 key/columnIndex값 만으로 lookup을 할 수 있는
					//lookup table을 만든다.

					//self.state.groupRowspanned = true;
					self.state.groupRowspanned = !!self.option.grouping.useGroupRowspan;
					self.state.groupingLookupTable = {};

					var groupByLength = groupBy.length;
					var lookupTable = self.state.groupingLookupTable;
					var lookupStack = [];
					for(var i=0;i<groupByLength;i++) {
						lookupTable[groupBy[i]] = [];
					}

					for(var i=0,l=vdata.length;i<l;i++) {
						var data = vdata[i];
						var nextData = vdata[i+1];
						var currentStack = [];
						var nextStack = [];
					
						for(var j=0;j<groupByLength;j++) {
							var key = groupBy[j];
							currentStack.push(key===true?undefined:data[key]);
							nextStack.push(nextData ? nextData[key] : null);
							if(!lookupStack[j]) {
								lookupStack[j] = {
									"from":i,
									"value":data[key],
									"childGroup":[],
									"childGroupValue":[],
									"childGroupEndIndex":[]
								};
							}
							lookupTable[key][i] = lookupStack[j];
						}

						for(var j=groupByLength-1;j>=0;j--) {
							var groupChanged = false;
							for(k=j;k>=0;k--) {
								if(currentStack[k] !== nextStack[k]) {
									groupChanged = true;
									break;
								}
							}
							var under = [];
							var underValue = [];
							var key = groupBy[j];
							for(k=j-1;k>=0;k--){
								under.push(groupBy[k]);
								underValue.push(data[groupBy[k]]);
							}
							if(groupChanged) {
								//lookupStack에 to를 기록하고 지워버린다. 다음 iteration에서 lookupStack을 다시 
								//{from:i} 부터 채워넣는다.
								lookupStack[j]["to"] = i;
								lookupStack[j]["under"] = under;
								lookupStack[j]["underValue"] = underValue;
								lookupStack[j] = null;
								for(k=j-1;k>=0;k--) {
									lookupStack[k]["childGroup"].push(key);
									lookupStack[k]["childGroupValue"].push(data[key]);
									lookupStack[k]["childGroupEndIndex"].push(i);
								}
							}
						}
					}
				}
			}
		}

		for (var i = vdata.length; i >= 0; i--) {
			if (!vdata[i]) {
				vdata.splice(i, 1);
			}
		}

		if(_list===undefined) {
			self._generateDataIndex(vdata);
		}

		//state.rowspanindex를 작성하고 state.columnRowspanned를 true로 설정한다.
		if(self.option.grouping && self.option.grouping.useGrouping &&
			self.option.grouping.by && _list === undefined) {
			//no rowspan by columnMapping. grouping을 쓸 때엔 일반 rowspan을 완전 비활성 시킨다.
		} else if (hasRowspan && _list === undefined) {
			var ri = [];
			for (var i = 0; i < collen; i++) {
				ri.push(undefined);
			}
			var index = 1;
			$.each(rowspanMapping, function(idx, mapping) {
				var begin = 0;
				var end = vdata.length;
				ri[Number(mapping.columnIndex)] = [];
				var ritem = ri[Number(mapping.columnIndex)];
				var summary = [];
				while (begin < end) {
					var from = begin;
					var to = begin + 1;
					//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
					while (to < end && vdata[from][mapping.key] === vdata[to][mapping.key]) {
						to++;
					}
					var item = {
						from: from,
						to: to,
						index: index++
					};
					for (var i = from; i < to; i++) {
						summary[i] = item;
					}
					ritem.push(item);
					begin = to;
				}
				ritem.push(summary);//console.log(summary)
			});
			for ( var i in option.columnMapping) {
				var mapping = option.columnMapping[i];
				if (mapping.rowspan && typeof mapping.rowspan.by == "number") {
					if (mapping.rowspan.under) {
						//under : true
						var by = ri[mapping.rowspan.by];
						by = by[by.length - 1];
						var begin = 0;
						var end = vdata.length;
						ri[Number(mapping.columnIndex)] = [];
						var ritem = ri[Number(mapping.columnIndex)];
						var summary = [];
						while (begin < end) {
							var from = begin;
							var to = begin + 1;
							//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
							while (to < end && vdata[from][mapping.key] === vdata[to][mapping.key]) {
								//console.log(' loop', from, to, by[from])
								if (to + 1 > by[from].to) {
									break;
								}
								to++;
							}
							//console.log('merge', from, to)
							var item = {
								from: from,
								to: to,
								index: index++
							};
							for (var i = from; i < to; i++) {
								summary[i] = item;
							}
							ritem.push(item);
							begin = to;
						}
						ritem.push(summary);//console.log(summary)

					} else {
						ri[mapping.columnIndex] = ri[mapping.rowspan.by];
					}
				}
			}
			delete this.state.rowspanindex;
			var valid = false;
			for ( var i in ri) {
				if (ri[i]) {
					valid = true;
				}
			}
			if (valid) {
				this.state.rowspanindex = ri;
				this.state.columnRowspanned = true;
			} else {
				this.state.rowspanindex = undefined;
				this.state.columnRowspanned = false;
			}
		} else {
			this.state.rowspanindex = undefined;
			this.state.columnRowspanned = false;
		}

		if (_list !== undefined) {
			return vdata;
		}
//		$.each(vdata, function(idx, item) {
//			item._index = $.extend({}, item._index);
//			item._index.data = idx;
//		});
		return sorted;
	};
	AlopexGrid.prototype._dataMoveByDataindex = function(old_dataindex, new_dataindex) {
		if (!this.state.data || !this.state.data.length) {
			return;
		}
		var list = this.state.data;
		list.splice(new_dataindex + (new_dataindex > old_dataindex ? -1 : 0), 0, list.splice(old_dataindex, 1)[0]);
	};
	function _dataSlice(self, list, remove) {
		if(!list) return null;
		var sliced = [];
		if(!$.isArray(list)) list = [list];
		var idlist = $.map(list, function(data) {
			if(!data || !data._index) return;
			return data._index.id
		});
		$.each(self.state.data, function(idx,data){
			if($.inArray(data._index.id, idlist)>=0) {
				sliced.push(data);
			}
		});
		if(remove) {
			var i = self.state.data.length;
			while(i--){
				var data = self.state.data[i];
				if($.inArray(data._index.id, idlist)>=0) {
					self.state.data.splice(i,1);
				}
			}
		}
		return sliced;
	}
	AlopexGrid.prototype.dataMove = function(fromquery, toquery, after) {
		var self = this;
		if(self._noData()) return;
		if(_isEmptyQuery(fromquery)) return;
		if(_isEmptyQuery(toquery)) return;
		var fromlist = self.dataGet(fromquery);
		var tolist = self.dataGet(toquery);
		if(!fromlist || !tolist || !fromlist.length || !tolist.length) return;
		if(!tolist[0] || !tolist[0]._index) return;
		var toindex = tolist[0]._index.data;
		if(!_valid(toindex)) return;
		//do actual modification
		var fromdatalist = _dataSlice(self, fromlist, true);
		$.each(self.state.data, function(idx, data){
			if(data && data._index && toindex <= data._index.data) {
				var comp = 0;
				//inc only if data exists
				if(after === true && toindex === data._index.data) comp++;
				toindex = idx + comp;
				return false;
			}
		});
		if(toindex >= 0) {
			self.state.data.splice.apply(self.state.data, [toindex, 0].concat(fromdatalist) );
		} else {
			//problem
		}
		self.sortClear();
		self._simpleRedraw(null, null);
	};
	function _positionToPercentage(position) {
		var map = {"top":0,"middle":50,"bottom":100};
		var percentage = null;
		if(map.hasOwnProperty(position)) {
			percentage = map[position];
		} else if(typeof position == "string" && position.indexOf('%') >= 0) {
			percentage = Number(position.split('%')[0]);
		} else if(!isNaN(Number(position))) {
			percentage = Number(position);
		}
		return percentage;
	}
	AlopexGrid.prototype.dataScroll = function(query, position, callback, norecursive) {
		var self = this;
		if($.isFunction(position)) {
			callback = position;
			position = null;
		}
		var vscroll = self._vscrollInfo(); 
		var vscrollDelay = vscroll ? (self.option.virtualScrollDelay+10) : 0;
		if(typeof query === "string" || $.isNumeric(query)) {
			var toppos = 0;
			var wheight = 0;
			var $scrolltarget = self.$scroller;
			var percentage = _positionToPercentage(query);
			var scrollHeight = self.$scroller.prop('scrollHeight');
			var targetheight = scrollHeight - self.$scroller.prop('clientHeight');
			if(!self.option.height) {
				$scrolltarget = $window;
				targetheight = self.$scroller.height();
				wheight = -$window.height();
				toppos = self.$scroller.offset().top;
			}
			if($.isFunction(callback)) {
				$scrolltarget.one('__dataScroll.alopexgridDataScroll', function(){
					!vscrollDelay ? (callback(null)) : 
						setTimeout((function(c){return function(){c(null);};})(callback), vscrollDelay);
				});
			}
			var pos = percentage >= 100 ? scrollHeight : Math.floor(toppos + wheight*(percentage/100) + targetheight*(percentage/100));
			$scrolltarget.scrollTop(pos).trigger('__dataScroll');
			return;
		}
		if(self._noData()) return;
		if(_isEmptyQuery(query)) return;
		var data = self.dataGet(query);
		if(!data || !data.length) return;
		data = data[0];
		if(!data || !data._index) return;
		position = ($.isPlainObject(position) ? position["position"] : position) || "top";
		
		var renderedAt = $.inArray(data._index.data, self.state.rendered);
		if(renderedAt>=0) {
			var $rows = self.$tablebody.children();
			var needDelay = vscroll && vscrollDelay &&
				(data._index.data < $rows.eq(0).attr('data-alopexgrid-dataindex') || $rows.eq(-1).attr('data-alopexgrid-dataindex') < data._index.data);
			var toppos = null;
			var $scrolltarget = self.$scroller;
			self._calcRowHeight();
			if(vscroll) {
				toppos = self.state.rowHeight * renderedAt;
			} else {
				var $children = self.$tablebody.children();
				toppos = $children.eq(renderedAt).offset().top - $children.eq(0).offset().top;
			}
			if(!self.option.height) {
				toppos += self.$scroller.offset().top;
				$scrolltarget = $window;
			}
			if(position !== "top") {
				var percentage = _positionToPercentage(position);
				var comp = 0;
				percentage = percentage / 100;
				comp = Math.floor((self.$scroller.prop('clientHeight') - self.state.rowHeight) * percentage);
				toppos -= comp;
			}
			if($.isFunction(callback)) {
				$scrolltarget.one('__dataScroll.alopexgridDataScroll', function(){
					!needDelay ? (callback(data)) :
						setTimeout((function(c,d){return function(){c(d);};})(callback,data), vscrollDelay);
				});
			}
			$scrolltarget.scrollTop(toppos).trigger('__dataScroll');
		} else if(norecursive !== true && self.option.pager) {
			//set to appropriate page and do it again
			self.pageSet(_inPage(self, data), true);
			self.dataScroll(data, position, callback, true);
		} else {
			//problem
		}
	};
	AlopexGrid.prototype._dataSetState = function(query, state, norender) {
		var self = this;
		var data = self.dataGetByIndex(query._index);
		if (!data) {
			return;
		}
		var rec = null;
		if(state.deleted === true || data._state.deleted) {
			state.editing = false;
		}
		if($.isFunction(self.option.rowOption.allowEdit) && self.option.rowOption.allowEdit(data)===false) {
			state.editing = false;
		}
		if (!data._state.editing && state.editing) {
			rec = AlopexGrid.trimData(data);
		}
		data = $.extend(true, data, {
			_state: state || {}
		});
		if (!self.state.data[data._index.data]) {
			return;
		}

		if (rec) {
			self.state.data[data._index.data]._state.recent = rec;
			data._state.recent = rec;
		}

		this.state.data[data._index.data]._state = data._state;
		if (!data._state.editing) {
			_deleteRecent(this.state.data[data._index.data]);
		}
		if (data._state && data._state.recent) {
			data = $.extend(true, {}, data, data._state.recent);
		}

		if(norender !== true) {
			this.refreshRow({_index:{data:data._index.data}});
		}
	};

	//AlopexGrid.prototype.setFilter = function(filter) {...}
	AlopexGrid.prototype.setFilter = function(filterName, filter, norender) {
		var self = this;
		if(!filter) {
			filter = filterName;
			filterName = _generateUniqueId();
		}
		if(!_valid(filterName)) filterName = _generateUniqueId();
		self.state.filter = $.extend({},self.state.filter);
		self.state.filter[filterName] = filter;
		if(norender !== true) {
			self._showProgress(function(){
				self._simpleRedraw();
			});
		}
		return filterName;
	};
	AlopexGrid.prototype.deleteFilter = function(filterName, norender) {
		var self = this;
		if(filterName && self.state.filter && self.state.filter[filterName]) {
			delete self.state.filter[filterName];
			if($.isEmptyObject(self.state.filter)) {
				delete self.state.filter;
			}
			if(!norender) {
				self._showProgress(function(){
					self._simpleRedraw();
				});	
			}
			return true;
		}
		self.pageInfo();
		return false;
	};
	AlopexGrid.prototype.clearFilter = function(norender) {
		var self = this;
		if(self.state.filter) {
			delete self.state.filter;
			if(norender !== true) {
				self._showProgress(function(){
					self._simpleRedraw();
				});
			}	
		}
	};

	AlopexGrid.prototype.showSortDialog = function(){

	};

	AlopexGrid.prototype._isDataFolded = function(data) {
		var self = this;
		self.state.folded = self.state.folded || [];
		//return true; 아예 지워버려서 그려질 필요도 없음
		//return "unfold"; unfold용 데이터임.
		//TODO useSummary:false일 떄 동작하는 방안은?

		if(data._meta) {
			var dataValues = data["_groupValues"];
			var upperExist = false;
			var sameExist = false;
			//상위그룹에서 제거되었으면 그때에만 완전 지움. return true;
			//그리고나서
			//그룹과 완전히 일치하면 return unfold를 함.
			$.each(self.state.folded, function(idx,foldItem){
				if(foldItem.length > dataValues.length) return;//깊은단계는 무시.
				if(foldItem.length === dataValues.length) {
					//완전히 일치하는가?
					var yes = true;
					for(var j=0;j<foldItem.length;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) sameExist = true;
				}
				if(foldItem.length < dataValues.length) {
					//상위에서 일치한것이 있었는가? 
					var yes = true;
					for(var j=0;j<foldItem.length;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) upperExist = true;
				}
			});
			if(upperExist) return true;
			if(sameExist) return "unfold"
		} else {
			var dataValues = [];
			var groupBy = self.option.grouping.by;
			if(groupBy[0]===true) groupBy = groupBy.slice(1);
			for(var j=0;j<groupBy.length;j++) {
				dataValues.push(data[groupBy[j]]);
			}
			//상위그룹이 하나라도 해당되면 완전 지움. return true;
			//단 state.folded의 그룹들이 데이터에 딱 맞아야 함.
			var upperExist = false;
			var exactExist = false;
			$.each(self.state.folded, function(idx,foldItem){
				if(foldItem.length <= dataValues.length) {
					//상위에서 일치한것이 있었는가? 상위에서 일치했다면
					//fold고 unfold고 그냥 안그리는것이다. return true;
					var yes = true;
					for(var j=0;j<foldItem.length;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) {
						if(foldItem.length < dataValues.length) {
							upperExist = true;
						} else {
							exactExist = true;
						}
					}
				}
			});
			if(self.option.grouping && self.option.grouping.by && self.option.grouping.by.length && 
				self.option.grouping.useGrouping && !self.option.grouping.useSummary) {
				//fold되어 있고 정확히 일치하는 그룹이 있을 때 이것이 최 상위 데이터라면 unfold이다.
				if(!upperExist && exactExist) {
				}
			}
			if(upperExist || exactExist) return true;
		}

		return false;
	};
	AlopexGrid.prototype.foldGroup = function(groupByValues) {
		var self = this;
		self.state.folded = self.state.folded || [];
		if(!groupByValues) return;
		if(!self.option.grouping || !self.option.grouping.useGrouping) return;
		if(!$.isArray(groupByValues) || !groupByValues.length) {
			return;
		}
		var exist = false;
		$.each(self.state.folded, function(idx, foldItem){
			var same = true;
			for(var i=0;i<groupByValues.length||i<foldItem.length;i++) {
				if(groupByValues[i] !== foldItem[i]) {
					same = false;
					break;
				}
			}
			if(same) {
				exist = true;
				return false;
			}
		});
		if(!exist) {
			self.state.folded.push($.extend(true, [], groupByValues));
		}
		self._showProgress(function(){
			self._simpleRedraw();
		},0);
	};
	AlopexGrid.prototype.unfoldGroup = function(groupByValues) {
		var self = this;
		self.state.folded = self.state.folded || [];
		if(!groupByValues || !$.isArray(groupByValues) || !groupByValues.length) {
			return;
		}
		if(!self.option.grouping || !self.option.grouping.useGrouping) return;
		var exist = false;
		$.each(self.state.folded, function(idx, foldItem){
			var same = true;
			for(var i=0;i<groupByValues.length||i<foldItem.length;i++) {
				if(groupByValues[i] !== foldItem[i]) {
					same = false;
					break;
				}
			}
			if(same) {
				exist = idx;
				return false;
			}
		});
		if(exist !== false) {
			self.state.folded.splice(exist,1);
		}
		self._showProgress(function(){
			self._simpleRedraw();
		},0);
	};

	AlopexGrid.prototype._generateDataIndex = function(datalist) {
		var self = this;
		var dlist = datalist || self.state.data;
		delete self.state.dataIdToIndexMap;
		self.state.dataIdToIndexMap = {};
		$.each(dlist, function(dataIndex, data){
			data._index.data = dataIndex;
			self.state.dataIdToIndexMap[data._index.id] = dataIndex;
		});
	};
	AlopexGrid.prototype._generateRenderedList = function() {
		var self = this;
		//var drawnIndex = self._pageDrawnIndex();
		//pageDrawnIndex에서 state._paddingDataLength를 사용하려 헀던것 처럼
		//이 로직에서도 동적데이터 바인딩을 함께 고려하여야 한다.
		//var startIndex = drawnIndex.start;
		//var endIndex = drawnIndex.end;
		if($.isPlainObject(self.state.filter)) {
			self.state.filteredDataIndexList = [];
			$.each(self.state.data, function(dataIndex,data) {
				var failed = false;
				$.each(self.state.filter, function(filterName,filter){
					if($.isPlainObject(filter)) {
						filter = self._filterDataToFunction(filter);
					}
					if($.isFunction(filter)) {
						if(filter(data) !== true) {
							failed = true;
							return false;
						}	
					}
				});
				if(failed) return;
				self.state.filteredDataIndexList.push(data._index.data);
			});
		} else {
			delete self.state.filteredDataIndexList;
		}
		var isFiltered = $.isArray(self.state.filteredDataIndexList);
		var vdata = isFiltered ? 
			$.map(self.state.filteredDataIndexList, function(dataIndex){
				return self.state.data[dataIndex];
			}) 
			: self.state.data;
		var startDataIndex = 0;
		var endDataIndex = _max(vdata.length-1,0);
		var renderedMaxIndex = Number.POSITIVE_INFINITY;
		if (self.option.pager && self.option.paging && self.option.paging.perPage ){
			//&& !self.state.dynamicBinding) {
			endDataIndex = _min(self.option.paging.perPage-1, endDataIndex);
			renderedMaxIndex = self.option.paging.perPage;
			if(!self.state.dynamicBinding) {
				var plus = (self.option.paging.current-1) * self.option.paging.perPage;
				startDataIndex += plus;
				endDataIndex += plus;
			}
			if(endDataIndex > _max(vdata.length-1,0)) {
				endDataIndex = _max(vdata.length-1,0);
			}
		}
		var prev = self.state.rendered;
		delete self.state.rendered;
		this.state.rendered = [];
		//TODO 일차원적으로 순차 배열이 아닌, 필터링등이 가능한 체계 필요.
		//paging start-end 는 하나의 기준일 뿐. 그리고 만일 가짜데이터의 삽입이 허용된다면
		//pageDrawnIndex()의 사용은 필요 없거나 그 구현이 많이 바뀌어야 할 것이다. subsum으로 인해
		//데이터만 그려졌을 때에 비해 밀릴수가 있다.
		// var dataPosition = startDataIndex;
		// var dataMaxPosition = self.state.data.length-1;
		// var renderedPosition = 0;
		// while(renderedPosition <= renderedMaxIndex && dataPosition <= dataMaxPosition) {
		// 	self.state.rendered.push(Number(dataPosition++));
		// 	renderedPosition++;
		// }

		//filtered data를 paging 반영하여 입력?
		//이를 위해서는 state.filteredDataIndexList = [dataIndex array]
		for (var i = startDataIndex; i <= endDataIndex; i++) {
			//self.state.rendered.push(Number(isFiltered ? self.state.filteredDataIndexList[i] : i));
			var d = vdata[i];
			if(!d) continue;
			if(self.option.hidePinnedData && self.state.pinnedDataIdMap && self.state.pinnedDataIdMap[d._index.id]) continue;
			self.state.rendered.push(d._index.data);
		}

		//group되어 있을 때 sub summary 생성하여 rendered에 삽입
		delete self.state.metaData;
//		delete self.state.groupingTree;
//		delete self.state.renderedGroupingTree;
		if(self.state.rendered.length 
		&& $.isPlainObject(self.option.grouping) 
		&& self.option.grouping.by && self.option.grouping.by.length
		&& self.option.grouping.useGrouping
		&& self.option.grouping.useSummary) {
			self.state.metaData = {};//refresh meta data pool
//			self.state.groupingTree = {};
//			self.state.renderedGroupingTree = {};

			var groupBy = self.option.grouping.by;
			groupBy = $.isArray(groupBy) ? groupBy : [groupBy];
			var groupByLength = groupBy.length;
			var summaryStack = [];
			for(var i=0;i<groupByLength;i++) {
				summaryStack.push(null);
			}

			var summaryMapping = [];
			$.each(self.option.columnMapping, function(ii,mapping){
				if(mapping.summary) {
					summaryMapping.push(mapping);
				}
			});
			var summaryMappingLength = summaryMapping.length;

			for(var i=0,l=vdata.length;i<l;i++) {
				var data = vdata[i];
				var nextData = vdata[i+1];
				var currentStack = [];
				var nextStack = [];
			
				for(var j=0;j<groupByLength;j++) {
					var key = groupBy[j];
					currentStack.push(key===true?undefined:data[key]);
					nextStack.push(nextData ? nextData[key] : null);
					summaryStack[j] = summaryStack[j] || {"__indexes":[]};
				}

				//currentStack기준으로 summary를 작성하기 시작한다.
				//없으면 만들고서 작성한다. 있으면 거기에 summaryStack하에 level에 따라 통계를 업데이트한다
				for(var idx1=0 ; idx1<groupByLength ; idx1++) {
					summaryStack[idx1]["__indexes"].push(data._index.data);
					for(var idx2=0 ; idx2<summaryMappingLength ; idx2++) {
						var mapping = summaryMapping[idx2];
						//columnMapping.summary에 명시된 내요엥 대해 연산을 하고
						//연산 결과(중간값)를 summaryStack에 저장한다.

						var stack = summaryStack[idx1][mapping.columnIndex] = 
							summaryStack[idx1][mapping.columnIndex] || {type:mapping.summary};

						if(mapping.summary === 'sum') {
							stack.sum = (stack.sum||0) + parseFloat(data[mapping.key]);
							stack.precision = Math.max(
								stack.precision || 0, 
								(String(data[mapping.key]).split('.')[1] || "").length
							);
							stack.value = parseFloat(stack.sum).toFixed(stack.precision);
						} else if(mapping.summary === 'count') {
							stack.value = (stack.value || 0) + 1;
						} else if(mapping.summary === 'average') {
							stack.sum = (stack.sum||0) + parseFloat(data[mapping.key]);
							stack.count = (stack.count || 0) + 1;
							stack.value = parseFloat(stack.sum/stack.count).toFixed(1);
						}// 이건 공통처리. column의 설정이 아님.
						// else if(mapping.summary === 'groupName' && mapping.key === groupKey) {
						//	//commit시점에만 의미 있을 것.
						//	stack.value = data[groupKey];
						//}
					}
				}

				//nextStack과 비교하여 값이 바뀌면 meta data를 생성하고 state.rendered에 넣는다.
				//최하위level부터 진행한다. 최하위 level의 commit조건은 자신포함상위에서 바뀐게 
				//하나라도 있다면 commit한다. 자신 level의 값은 같아도 상위에서 값이 갈렸다면
				//이것은 별도의 그룹으로 보아야 하기 때문.
				var pushed = 0;
				for(var j=groupByLength-1;j>=0;j--) {
					var groupChanged = false;
					for(var k=j;k>=0;k--) {
						if(currentStack[k] !== nextStack[k]) {
							groupChanged = true;
							break;
						}
					}
					var under = [];
					for(var k=j-1;k>=0;k--){
						under.unshift(groupBy[k]);
					}
					if(groupChanged) {
						var metaData = {"_parentKeys":under,"_originalValueMap":{}};
						
						for(var key in summaryStack[j]) {
							var summary = summaryStack[j][key];
							if(!$.isPlainObject(summary)) continue;
							var name = self.option.grouping.summaryRender[summary.type];
							var val = _valid(summary.value) ? summary.value : null;
							if(!isNaN(Number(val))) {
								val = _addCommas(val);
							}
							//metaData[key] = (name ? name + ' : ' : '') + (summary.value||'');
							metaData[key] = ($.isFunction(name) ? name(val) : val) || val;
							metaData["_originalValueMap"][key] = summary.value;
						}

						metaData["_groupIndexes"] = summaryStack[j]["__indexes"];
						var metaKey = _generateUniqueId();
						metaData['_index'] = {"id":metaKey};
						metaData['_state'] = {};
						metaData['_meta'] = true;
						metaData['_groupValue'] = 
							(self.option.grouping.summaryRender.groupName ? 
								self.option.grouping.summaryRender.groupName(currentStack[j]) : currentStack[j])
								|| currentStack[j];
						metaData['_groupValues'] = [];
						for(var k=0;k<=j;k++) {
							metaData['_groupValues'].push(currentStack[k]);
						}
						metaData['_groupKey'] = groupBy[j];

						var renderedIndex = $.inArray(data._index.data, self.state.rendered);
						if(renderedIndex >= 0) {
							self.state.metaData[metaKey] = metaData;
							self.state.rendered.splice(renderedIndex+1+pushed,0,metaKey);
							pushed++;
						}
						summaryStack[j] = null;
					}
				}
			}
		}
		if(true) {
			var grStack = [];//현재 렌더링된 기준의 그룹정보를 생성할 때 사용한다.
			var groupBy = self.option.grouping.by;
			groupBy = $.isArray(groupBy) ? groupBy : [groupBy];
			var groupByLength = groupBy.length;
			var groupingRowspanTable = {};

			for(var i=0;i<groupByLength;i++) {
				groupingRowspanTable[groupBy[i]] = [];
				//grStack[i] = [];
			}
			if(self.state.folded && self.state.folded.length) {
				//TODO folded 어레이 사용 최적 구현 필요.
				for(var i=self.state.rendered.length-1;i>=0;i--) {
					var data = self._getRenderedDataFromRenderedIndex(i);
					var folded = self._isDataFolded(data);
					//TODO useSummary:false일 때 최상위 데이터 하나를 unfold로 취급해야 함.
					if(folded===true) {
						self.state.rendered.splice(i,1);
					}
				}	
			}
			delete self.state.renderedIndexMapById;
			self.state.renderedIndexMapById = {};
			$.each(self.state.rendered, function(renderedIndex, renderedKey){
				var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
				data._index.rendered = renderedIndex;
				self.state.renderedIndexMapById[data._index.id] = renderedIndex;
				//자신이 렌더링에서 몇번째 순위인지 인식하게 한다. rowspan등에서 활용할 수 있다.
				if(self.state.groupRowspanned) {
					for(var j=0;j<groupByLength;j++) {
						//grStack[j] = grStack[j] || {"from":renderedIndex};
						if(!grStack[j]) {
							if(data._meta) {
								// if(data["_groupKey"] === groupBy[j]) {
								// 	//fold되었을 경우 여기에 해당???? fold되었을 경우 자신 그룹의 데이터들이
								// 	//보이지 않거나 하나도 없을 것이므로 rowspan될 데이터가 없다.
								// 	//summary는 상위 그룹 데이터만 참조하여 rowspan을 하면 되므로
								// 	//index를 여기에는 작성하지 않는다.
								// 	//grStack[j] = {"from":renderedIndex};
								// }
								if($.inArray(groupBy[j],data._parentKeys)>=0) {
									grStack[j] = {"from":renderedIndex,"renderedIndexMap":{}};
								}
							} else {
								grStack[j] = {"from":renderedIndex,"renderedIndexMap":{}};
							}
						}
						groupingRowspanTable[groupBy[j]][renderedIndex] = grStack[j]; //rendered index 기준으로 stack을 사용한다.

						if(grStack[j]) {
							grStack[j]["renderedIndexMap"][renderedIndex] = true;
							var commit = false;
							var nextData = self._getRenderedDataFromRenderedIndex(renderedIndex+1);
							if(nextData && !data._meta && !nextData._meta && data[groupBy[j]] !== nextData[groupBy[j]]) {
								commit = true;
							}
							if ( nextData && nextData._meta && (nextData['_groupKey'] === groupBy[j]) ) {
								commit = true;
							}
							if(!nextData) {
								commit = true;
							}
							if(commit) {
								grStack[j]["to"] = renderedIndex;
								grStack[j] = null;
							}
						}
					}
				}
			});	

			//가상스크롤이 있는 경우 self.state.vscrollRenderedStart와 vscrollRenderedEnd를 이용하여
			//자신이 걸쳐있는지 아닌지를 판별할 수 있다. 이 값을 기준으로 cell render는 자신이 rowspan되었는지
			//rowspan을 하는 주체라면 몇의 값을 가져야 하는지를 추출할 수 있다.
			self.state.groupingRowspanTable = self.state.groupRowspanned ? groupingRowspanTable : null;
		}

		return {previous : prev, current : self.state.rendered};//변화량 측정방법을 어떻게 제공하는가? 아니면 그냥 무조건 refresh?

		var self = this;
		delete self.state.rendered;
		self.state.rendered = [];
	};
	AlopexGrid.prototype._getDataFromEvent = function(e){
		var $cell = $(e.target).closest('.bodycell');
		if($cell.length) {
			return this._getRenderedDataFromRenderedIndex(parseInt($cell.attr('data-alopexgrid-renderedindex')));
		}
		return null
	};
	AlopexGrid.prototype._getCellFromEvent = function(e) {
		return $(e.target).closest('.cell');
	};
	//원래의 rendered와 비교하여 무엇이 바뀌었는지를 파악할 떄 사용한다.
	AlopexGrid.prototype._renderedToDataIdList = function(){
		var self = this;
		var datalist = self.state.data;
		return $.map(self.state.rendered, function(renderedIndex, dataIndex) {
			return self._getRenderedDataFromRenderedIndex(renderedIndex)._index.id || dataIndex;
		});
	};
	AlopexGrid.prototype._getRenderedDataFromRenderedIndex = function(renderedIndex) {
		var self = this;
		var dataIndex = self.state.rendered[renderedIndex];
		var indexType = $.type(dataIndex);
		if(indexType==="number") {
			return self.state.data[dataIndex];
		} else if(indexType==="string") {
			//TODO rendered array에 dataIndex가 아닌 다른 값이 들어있다면 이것을 반영해서
			//데이터를 리턴해야 한다. 예를들어 부분합과 같은 non-data object.
			return self.state.metaData[dataIndex];
		}
		return null;//self.state.emptyData;
	};
	AlopexGrid.prototype._dataDraw = function(viewoption) {
		var self = this;
		if (!this.state.data) {
			this.state.data = [];
		}
		//scrollpanel의 innerhtml로 테이블을 생성, IE에서의 속도향상을 꾀함.
		var option = self.option;
		var $table = self.$table;
		var $scrollpanel = self.$scrollpanel;
		var expectedWidth = 0;
		self._closeTooltip();
		var table = ['<table class="table"'];
		table.push(' style="width:100%;table-layout:fixed;');
		table.push('"');
		if ($.isPlainObject(option.attr)) {
			$.each(option.attr, function(key, value) {
				table.push(' ', key, '="', value, '"');
			});
		}
		table.push('>');
		if (option.caption) {
			table.push('<caption style="position:absolute;display:none;">', option.caption, '</caption>');
		}
		table.push('<colgroup>');
		for ( var i in option.columnMapping) {
			var mapping = option.columnMapping[i];
			if (mapping.columnIndex !== undefined && mapping.columnIndex !== null && mapping.hidden !== true) {
				table.push('<col data-alopexgrid-columnindex="',mapping.columnIndex,'"');
				if (mapping.width) {
					table.push(' style="width:', mapping.width, ';"');
					if (expectedWidth >= 0) {
						expectedWidth += Number(String(mapping.width).split('px')[0]);
					}
				} else {
					expectedWidth = -1;
				}
				table.push('>');
			}
		}
		table.push('</colgroup>');
		self.state.tableWidth = expectedWidth;

		table.push('<thead class="table-header"');
		if (viewoption && viewoption.tableheader && viewoption.tableheader.display) {
			table.push(' style="display:', viewoption.tableheader.display, ';"');
		}
		table.push('>', self._headerRender(viewoption ? viewoption.tableheader : null), '</thead>');

		//============================
		table.push('<tbody class="table-body">');
		var sorted = self._sortInternalData();
		var vdata = self.state.data && self.state.data.length ? self.state.data : [];
		this.state.sorted = sorted;
		self._generateRenderedList();
		var vscroll = null;
		var drawn = 0;
		var collen = 0;
		for ( var j in self.option.columnMapping) {
			var mapping = self.option.columnMapping[j];
			var ci = mapping.columnIndex;
			if (ci !== undefined && ci !== null && mapping.hidden !== true) {
				collen++;
			}
		}
		if (!self.state.rendered.length|| !vdata || !vdata.length) {
			if (self.option.message && self.option.message.nodata) {
				table.push('<tr class="row emptyrow"><td class="cell cell-nodata" colspan="', collen, '">','<div class="cell-wrapper">');
				table.push(self.option.message.nodata);
				table.push('</div></td></tr>');
				drawn++;
			} else if (!self.option.rowPadding) {
				table.push('<tr class="emptyrow">');
				for (var i = 0; i < collen; i++) {
					table.push('<td></td>');
				}
				table.push('</tr>');
			}
			self._tableSpacing(0,null,0);
		} else {
			// delete self.state.rendered;
			// this.state.rendered = [];
			// for (var i = startIndex; i < endIndex; i++) {
			// 	self.state.rendered.push(Number(i));
			// }
			vscroll = self._vscrollInfo();
			var renderedStart = 0, renderedEnd = self.state.rendered.length-1;
			var renderop = null;
			if(vscroll) {
				// startIndex = self.state.rendered[vscroll["startIndex"]];
				// endIndex = self.state.rendered[vscroll["endIndex"]]+1;
				// //self.$scrollpanel.css('height', vscroll["totalHeight"]+"px");
				self.state.vscrollRenderedStart = renderedStart = vscroll["startIndex"];
				self.state.vscrollRenderedEnd = renderedEnd = vscroll["endIndex"];
				renderop = {
					hscroll : self._hscrollInfo()
				};
			} else {
				self._tableSpacing(0,null,0);
				delete self.state.vscrollRenderedStart;
				delete self.state.vscrollRenderedEnd;
			}
			for (var i = renderedStart; i <= renderedEnd; i++) {
				var data = self._getRenderedDataFromRenderedIndex(i);
				if(!data) continue;
				//var dataIndex = self.state.rendered[i];//TODO 구현 추가에 따라 dataIndex가 non-data를 지시할 수 있다.
				var dataIndex = data._index.data;
				// if (data._state && data._state.recent) {
				// 	var recent = data._state.recent;
				// 	data = $.extend({}, data, recent);
				// 	//data._index = $.extend({},recent._index);
				// 	//data._state = $.extend({},recent._state);
				// }
				if (this.state.columnRowspanned) {
					var from = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
					if (from && Number(from.from) !== Number(i) && vdata[from.from]._state.selected) {
						//spanrow가 선택된 상태에서 데이터가 추가되었을 경우 동일하게 선택 상태로 만든다.
						data._state.selected = true;
					}
				}
				var rendered = self._rowRender(data, dataIndex, i, renderop);
				table.push(rendered);
				drawn++;
			}
		}
		if (self.option.rowPadding) {
			var till = 0;
			if (typeof self.option.rowPadding == "number") {
				till = Number(self.option.rowPadding);
			} else {
				till = (self.option.paging ? Number(self.option.paging.perPage) : 0) || 0;
			}
			if (till > 0) {
				self._calcRowHeight();
				for (var i = drawn; i < till; i++) {
					table.push('<tr class="row emptyrow" style="height:'+self.state.rowHeight+'px">');
					for (var j = 0; j < collen; j++) {
						table.push('<td class="cell"><div class="cell-wrapper">&nbsp;</div></td>')
					}
					table.push('</tr>');
				}
			}
		}
		table.push('</tbody>');

		//=====================-=-=-=-=-==-

		table.push('</table>');
		var joined = table.join('');
		var $converted = $(_convertAlopex.call(self, joined));
		// if(self.option.virtualScroll) {
		// 	var clientWidth = self.$scroller.prop('clientWidth');
		// 	var scrollLeft = self.$scroller.scrollLeft();
		// 	$converted.children('tbody').children().each(function(){
		// 		self._manipulateRowForVirtualHScroll(this, clientWidth, scrollLeft);
		// 	});
		// }
		// self.$table.replaceWith(_convertAlopex.call(self, joined));
		// self.$table = $scrollpanel.children('table');
		self._locateMainTable().replaceWith($converted);
		self.$table = self._locateMainTable();
		self.$tableheader = self.$table.children('thead');
		self.$tablebody = self.$table.children('tbody');
		self.$colgroup = self.$table.children('colgroup');
		if(vscroll) {
			//XXX totalHeight는 실제 테이블 너비를 반영하는편이 안전함.
			self._tableSpacing(vscroll["paddingTopHeight"], self._shouldScrollBeOverridden() ? self._renderedBodyHeight():null, vscroll["paddingBottomHeight"]);
		}
		clearSelection();
		self._needEditedRefresh();
	};

	function isMappingVisible(mapping) {
		return _valid(mapping.columnIndex) && mapping.hidden !== true;
	}
	function isColumnHidden(columnMapping, columnIndexKey) {
		for (var i = 0, l = columnMapping.length; i < l; i++) {
			var mapping = columnMapping[i];
			if(Number(mapping.columnIndex) === Number(columnIndexKey)
				|| (typeof mapping.key === "string" && mapping.key === columnIndexKey)) {
				return !!mapping.hidden;
			}
		}
		return false;
	}
	function getColumnIndexByKey(columnMapping, key) {
		for(var i=0,l=columnMapping.length;i<l;i++) {
			var mapping = columnMapping[i];
			var ci = mapping.columnIndex;
			if(_valid(ci) && mapping.key === key) {
				return ci;
			}
		}
		return null;
	}
	AlopexGrid.prototype.columnInfo = function(columnIK) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		var columnIndex = columnIK;
		var columnKey = columnIK;
		var info = null;
		$.each(columnMapping, function(idx,mapping) {
			var ci = Number(columnIndex);
			if(ci === Number(mapping.columnIndex)
				|| (typeof mapping.key === "string" && mapping.key === columnKey)
				|| columnIK === mapping) {
				info = $.extend(true, {}, mapping);
				return false;
			}
		});
		return info;
	};
	AlopexGrid.prototype.columnGet = function() {
		var self = this;
		var columnMapping = self.option.columnMapping;
		var cqueries = $.makeArray(arguments);
		var ret = [];
		$.each(columnMapping, function(idx, mapping) {
			var oci = Number(mapping.columnIndex);
			var passed = true;
			$.each(cqueries, function(jdx,cquery) {
				if(!$.isPlainObject(cquery)) return;
				for(var prop in cquery) {
					if(prop === "columnIndex") {
						if(oci !== cquery[prop]) {
							passed = false;
						}
					} else if(prop === "hidden") {
						if(isColumnHidden(columnMapping, oci) !== cquery[prop]) {
							passed = false;
						}
					} else if(cquery[prop] !== mapping[prop]) {
						passed = false;
					}
				}
			});
			if(passed) {
				var cinfo = self.columnInfo(mapping);
				ret.push(cinfo);
			}
		});
		return ret;
	};
	AlopexGrid.prototype.isColumnHidden = function(columnIK) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		return isColumnHidden(columnMapping, columnIK);
	};
	AlopexGrid.prototype.hideCol = function(ci, noupdate) {
		//columnIndex는 original columnIndex기준으로 입력이 됨을 가정.
		var self = this;
		return self.showCol(ci, noupdate, true);
	};
	AlopexGrid.prototype.showCol = function(ci, noupdate, hidden) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		var allshow = true;
		if(ci === true) {
			$.each(columnMapping, function(idx,mapping) {
				hidden ? self.hideCol(mapping.key, true) : self.showCol(mapping.key, true);
			});
			self.updateOption();
			return;
		}
		if(typeof ci === "string") {
			ci = ci.split(',');
		} else if (!$.isArray(ci)) {
			ci = [ci];
		}
		$.each(self.option.columnMapping, function(idx,mapping){
			if(_valid(mapping.columnIndex) &&
				($.inArray(mapping.columnIndex, ci) >= 0
					|| $.inArray(mapping.key, ci) >= 0
					)
				){
				mapping.hidden = hidden || false;
			}
		});
		if (noupdate !== true) {
			self.updateOption();
		}
		return;
	};

	function dataChangeCallback(self, type, args) {
		if(self.option.on && self.option.on.data && self.option.on.data[type]) {
			var cb = $.isFunction(self.option.on.data[type]) ? [self.option.on.data[type]] : self.option.on.data[type];
			//var _args = [self.$root].concat(args);
			for(var i in cb) {
				if($.isFunction(cb[i]) && cb[i].apply(self.$root, args) === false) {
					return false;
				}
			}
		}
	}
	function viewUpdateForRowBasedHeight(self,before) {
		if(typeof self.state.userHeight === "string" && self.state.userHeight.toLowerCase().indexOf("row")>=0
			&& self.state.userHeightRowCount) {
			if((before > self.state.userHeightRowCount) !== (self.state.data.length > self.state.userHeightRowCount)) {
				self.viewUpdate();
			}
		}
	}

	AlopexGrid.prototype.dataAdd = function(data, query) {
		var self = this;
		if(dataChangeCallback(self, "add", [data, query]) === false) {
			return false;
		}
		if (!data) {
			return;
		}
		if (!self.state.data) {
			self.state.data = [];
		}
		delete self.state.editingCellInfo;
		var items = $.isArray(data) ? data : [data];
		if (!items.length) {
			return;
		}
		if(self.option.dataLengthLimit && (self.state.data.length + items.length) > self.option.dataLengthLimit) {
			var msg = self.option.message.dataLengthLimit || "Exceed Limit.";
			if($.isFunction(msg)) {
				msg = msg(self.state.data.length + items.length);
			}
			alert(msg);
			return;
		}
		if (query && query._index && query._index.row !== undefined) {
			//TODO 보이는 기준으로 삽입. state.rendered의 array index를 기준으로 위치를 계산한다.
		}
		var beforeDataLength = self.state.data.length;
		var hasDefaultState = !$.isEmptyObject(self.option.defaultState.dataAdd) && self.option.defaultState.dataAdd;
		var defaultState = self.option.defaultState.dataAdd;
		var doAllowEditTest = $.isFunction(self.option.rowOption.allowEdit);
		for(var i=0,l=items.length;i<l;i++) {
			var item = items[i];
			// item._state = $.extend({
			// 	edited: false,
			// 	editing: false,
			// 	selected: false,
			// 	added: true,
			// 	deleted : false
			// }, self.option.defaultState.dataAdd, self.option.extendStateOnAdd ? item._state : null);
			var prevState = item._state;
			item._state = {
				edited: false,
				editing: false,
				selected: false,
				added:true,
				deleted : false
			};
			if(hasDefaultState) {
				typeof defaultState.edited === "boolean" ? (item._state.edited = defaultState.edited) : 0;
				typeof defaultState.editing === "boolean" ? (item._state.editing = defaultState.editing) : 0;
				typeof defaultState.selected === "boolean" ? (item._state.selected = defaultState.selected) : 0;
				typeof defaultState.added === "boolean" ? (item._state.added = defaultState.added) : 0;
				typeof defaultState.deleted === "boolean" ? (item._state.deleted = defaultState.deleted) : 0;
			}
			if(self.option.extendStateOnAdd && prevState) {
				typeof prevState.edited === "boolean" ? (item._state.edited = prevState.edited) : 0;
				typeof prevState.editing === "boolean" ? (item._state.editing = prevState.editing) : 0;
				typeof prevState.selected === "boolean" ? (item._state.selected = prevState.selected) : 0;
				typeof prevState.added === "boolean" ? (item._state.added = prevState.added) : 0;
				typeof prevState.deleted === "boolean" ? (item._state.deleted = prevState.deleted) : 0;
			}
			item._index = item._index || {};
			item._index.id = _generateUniqueId();
			self.state.dataFilltrimmer ? self.state.dataFilltrimmer(item) : 0;
			self.state.dataCompositor ? self.state.dataCompositor(item) : 0;
			if(doAllowEditTest) {
				if(self.option.rowOption.allowEdit(item) === false) {
					item._state.editing = false;
				}
			}
			self.option.setOriginalFromStart ? (item._original = AlopexGrid.trimObject(item)) : 0;
			if (query && query._index && query._index.data !== undefined) {
				self.state.data.splice(Number(query._index.data)+i, 0, item);
			} else if (query && query._index && query._index.row !== undefined) {
				var nidx = self.state.rendered[query._index.row];
				self.state.data.splice(Number(nidx)+i, 0, item);
			} else {
				self.state.data.push(item);
			}
		}
		//데이터 삽입 후 데이터 리스트 정리. _state, _index.data 등이 생성되며, 
		//items 변수를 통해서 삽입된 데이터들의 _index.data를 읽을 수 있다.
		//어떤 길이를 가지던 items[0]._index.data 의 인덱스 부터 items.length개 만큼 렌더링이 될 수 있으며(안해도 될 수도 있다)
		//dataAdd이전에 생성된 state.rendered array와 option.paging의 내용을 토대로.
		//add된 데이터는 무조건 그려야 된다는 가정 하에, 필요 data를 table-body에 append/replace하고. 
		//현재의 페이징 정보에 따라 table-body의 초과 row들을 제거한다. 
		self.state.dynamicBinding ? "" : self.sortClear();
		var renderedPrev = self.state.rendered;
		self._sortInternalData();
		self.pageInfo();
		self._generateRenderedList();
		if(self.state.renderingSuppressed) {
			setTimeout(function(){dataChangeCallback(self, "changed",["add"]);},0);
			return;
		}
		var rendered = self.state.rendered;
		var drawnIndex = self._pageDrawnIndex();//TODO dataAdd에서의 pageDrawnIndex()
		var addedFrom = Number(items[0]._index.data);

		//변경된 items들의 index를 확인한다. _index.data에 명시되어 있음. 
		//이것을, state.rendered array의 내용과 비교해야 함.
		//items와는 별개로, 계산된 결과물은 dataIndex를 기반으로 렌더링 할 수 있도록 해야 함. 
		//이전페이지 위치로 dataAdd한 결과로 밀려나온 items외의 데이터들을 렌더링할 근거가 됨.
		//rowspan이 있는 경우, items가 묶여버린 상황에서는 span된 row들 전체가 고정컬럼/일반바디에서
		//redraw가 되어야 한다.

		//붙여지기 시작한 위치가 페이지 앞일 경우 늘어난 만큼 state.data로부터 append후 넘치는것 삭제
		//붙여지기 시작한 위치가 현제 페이지일 경우, items로부터 해당 위치에 append후 넘치는 것 삭제
		//붙여지기 시작한 위치가 뒤 페이지인 경우, pageInfo만 새로 돌림. 
		//append위치에 이미 row가 있을경우 그대로 append()
		//.row.emptyrow인 경우 replaceWith()
		//rowpadding 안짝이면 지우지 않음
		//현재 페이징 정보를 초과한 row는 삭제
		if(self.option.grouping && self.option.grouping.by && self.option.grouping.useGrouping) {
			self._simpleRedraw(null,null);
			return;
		}
		if (self.state.columnRowspanned && self.state.rowspanindex && self.state.rowspanindex.length) {
			//rowspan되어 있는 경우..?
			var lteCurrent = false;
			$.each(items, function(idx, item) {
				//하나라도 현재 페이지의 앞에 추가된 데이터가 존재한다면 데이터를 다시 그리도록 한다.
				if (Number(item._index.data) < Number(drawnIndex.end)) {
					lteCurrent = true;
					return false;
				}
			});
			if (lteCurrent) {
				self._simpleRedraw(null,null);
			}
			return;
		}

		var updateBody = false;
		if (addedFrom < drawnIndex.start) {
			//console.log('before the page');
			//현재 페이지에서 밀어내기를 시전한다.
			addedFrom = self.state.rendered && self.state.rendered.length ? self.state.rendered[0] : 0;
			updateBody = true;
			//pageInfo() 정보에 따라 state.rendered를 업데이트 한다
		} else if (drawnIndex.start <= addedFrom && addedFrom < drawnIndex.end) {
			//console.log('in the page')

			//현재 페이지에서 들어가야 할 위치를 찾아서 밀어내기를 시전한다.
			//.emptyrow는 밀어내기를 하지 않고 replaceWith를 한다.
			updateBody = true;
		} else {
			//console.log('after the page')
			//pageInfo()했으니 그냥 끝. 
		}
		self._generateRenderedList();
		var vscroll = self._vscrollInfo();
		//if(updateBody && (items.length > 100 || items.length > self.state.rendered.length/2)) {
		if (updateBody && (items.length > 100 || (self.state.rendered && self.state.rendered.length < 0) || beforeDataLength < 1)) {
			//단순히 너무 많은 경우, 또는 현재 화면에 그려진 데이터의 절반을 넘는 경우, 또는 그냥 데이터가 몇개 없는 경우는 다시 그리도록 한다.
			//20140304 데이터가 몇개 없더라도 렌더링 과정에서 통신이 개입하게 되면 부하로 작용할 수 있으므로 기존에 <20으로 되어있던것을 <0으로 바꿔서 무효화 시킨다.
			self._simpleRedraw(null, {scrollLeft:0});
			self.$scroller.trigger('scroll');
			//var left = self.$scroller.prop('scrollLeft');
		} else if(updateBody && vscroll) {
			self._simpleRedraw(null, {scrollLeft:0});
			self.$scroller.trigger('scroll');
		} else if (updateBody) {
			//console.log('require update body from dataindex ',addedFrom);
			if (self.state.data && self.state.data.length) {
				$.each(self.state.data, function(idx, data) {
					if (data && data._state) {
						data._state.hovering = false;
					}
				});
			}
			var deleteAfter = _max(self.option.rowPadding, self.state.rendered.length);
			//console.log('new rendered',self.state.rendered,'delete after',deleteAfter)
			var addEnd = false;
			var processed = 0;
			var rows = [];
			//console.log('rendered start', self.state.rendered[0], 'addedFrom',addedFrom)
			var over = self.state.rendered && self.state.rendered.length ? self.state.rendered[self.state.rendered.length - 1] : -1;
			var addLength = 0;
			for (var i = addedFrom, len = addedFrom + items.length; i < len; i++) {
				if (over >= 0 && i > over) {
					continue;
				}
				//console.log('render ',i)
				rows.push(self._rowRender(self.state.data[i], i, $.inArray(i, self.state.rendered)));
				addLength++;
			}
			var drawnIndex = self._pageDrawnIndex();//TODO dataAdd에서의 pageDrawnIndex사용? 
			var $generatedRows = $(_convertAlopex.call(self, rows.join('')));
			var removed = 0;
			var updateEvenOdd = items.length % 2 ? true : false;
			function rowAdder(idx, row) {
				var dataIndex = row.getAttribute('data-alopexgrid-dataindex');
				if (!addEnd) {
					//items.length만큼 add가 끝나지 않은 상태라면 자기 위치를 계속 찾아야 한다.
					if (dataIndex !== null && dataIndex !== undefined && Number(dataIndex) === (addedFrom - 1)) {
						//console.log('insert after here!!',dataIndex);
						$(row).after($generatedRows);
						processed += addLength;
						addEnd = true;
					} else if (dataIndex !== null && dataIndex !== undefined && Number(dataIndex) === addedFrom) {
						//console.log('insert before here!!',dataIndex)
						//앞에 넣는경우 홀짝과 data attribute처리가 순서 맞지 않음. 뒤에서 한 작업을 여기서 반복해야 하는 문제. 
						var $row = $(row);
						$row.before($generatedRows);
						processed += addLength;
						var newIndex = Number(dataIndex) + addLength;
						if (newIndex < drawnIndex.end) {
							if (updateEvenOdd && addLength % 2) {
								$row[processed % 2 ? 'addClass' : 'removeClass']('row-odd');
								$row[processed % 2 ? 'removeClass' : 'addClass']('row-even');
							}
							row.setAttribute('data-alopexgrid-dataindex', newIndex);
						} else {
							$row.remove();
						}
						addEnd = true;
					} else {
						//그 어디에도 해당하지 않음. 맞는 위치를 찾을때까지 계속 전진.
						processed++;
					}
				} else {
					//이미 추가가 끝난 상태라면 row들의 dataIndex를 업데이트 해야 한다. items.length만큼 증가시킨다.
					//또는 rendered범위를 넘어간 경우 삭제한다.
					if (deleteAfter - addLength <= idx) {
						//console.log('remove this row',idx);
						$(row).remove();
						removed++;
					} else if (dataIndex !== null && dataIndex !== undefined) {
						var newIndex = Number(dataIndex) + addLength;
						if (newIndex < drawnIndex.end) {
							//console.log('update dataindex this row',idx);
							row.setAttribute('data-alopexgrid-dataindex', newIndex);
							processed++;
						} else {
							//console.log('remove this, not update',idx)
							deleteAfter++;//삭제해야 할 row가 하나 더 생겼으므로 원래 삭제하려고 했던 시점을 연기시킨다.
							$(row).remove();
						}
					} else {
						//console.log('nothing with this row',idx)
						processed++;
					}
					if (updateEvenOdd && dataIndex !== null && dataIndex !== undefined) {
						if (processed % 2) {
							$(row).removeClass('row-even').addClass('row-odd');
						} else {
							$(row).addClass('row-even').removeClass('row-odd');
						}
					}
				}
			}
			;

			self.$tablebody.children('.row').each(rowAdder);
			//      if(self.state.hasFixColumn) {
			//        self.state.$fixcoltable.children('.table-body').children('.row').each(rowAdder);
			//      }

			if (!addEnd) {
				//loop를 돌고도 end가 나지 않았다면 row가 없는케이스. 이때는 생으로 만들어서 붙여야 한다.
				//console.log('no $generatedRows! append to begining')
				if (addLength) {
					self.$tablebody.children('.row').each(function(idx, row) {
						if (idx < addLength) {
							$(row).remove();
						}
					});
				}
				self.$tablebody.prepend($generatedRows);
			}
			if (self.state.hasFixColumn) {
				//고정컬럼도 같은 메커니즘을 적용할 수 있는가? 
				//self.viewUpdate();
				var compensated = false;
				var fixcol = false;
				if (!self.option.height) {
					fixcol = true;
					self._fixColumnLoad();
				} else {
					if (!self.state.hasVerticalScrollBar) {//없다가 있을 수가 있으므로.
						compensated = true;
						fixcol = true;
						self.viewUpdate({
							scrollLeft: 0
						});
					}
				}
				if (!fixcol) {
					self._fixColumnLoad();
				}
				if (!compensated) {
					if (self.state.lastScrollLeft !== 0) {
						self.$scroller.prop('scrollLeft', 0);
					}
				}
			}
		}
		self._refreshEditableCellAll();
		self._needEditedRefresh();
		clearSelection();
		viewUpdateForRowBasedHeight(self,beforeDataLength);
		setTimeout(function(){dataChangeCallback(self, "changed",["add"]);},0);
		return;
	};

	AlopexGrid.prototype._scrollerReset = function() {
		var self = this;
		//데이터 초기화시에 문제발생소지.
		delete self.state.lastScrollTop;
		delete self.state.lastScrollLeft;
		delete self.state.scrollerScrollHeight;
		self.$scroller.prop("scrollTop", 0).prop("scrollLeft", 0);
	};
	AlopexGrid.prototype.dataSet = function(dataList, _dataonly) {
		var self = this;
		if(dataChangeCallback(self, "set", [dataList]) === false) {
			return false;
		}
		self.clearFilter(true);
		delete self.state.editingCellInfo;
		self.state.data = [];
		self.state.deletedData = [];
		if (!dataList) {
			self.dataEmpty();
			return;
		}
		if (!$.isArray(dataList)) {
			if (typeof dataList == "object") {
				dataList = [dataList];
			} else {
				self.dataEmpty();
				return;
			}
		}
		if(self.option.dataLengthLimit && (self.state.data.length + items.length) > self.option.dataLengthLimit) {
			var msg = self.option.message.dataLengthLimit || "Exceed Limit.";
			if($.isFunction(msg)) {
				msg = msg(self.state.data.length + items.length);
			}
			alert(msg);
			return;
		}

		var hasDefaultState = !$.isEmptyObject(self.option.defaultState.dataSet) && self.option.defaultState.dataSet;
		var defaultState = self.option.defaultState.dataSet;
		var doAllowEditTest = $.isFunction(self.option.rowOption.allowEdit);
		for (var i = 0; i < dataList.length; i++) {
			var item = dataList[i];
			// item.state = $.extend({
			// 	edited: false,
			// 	editing: false,
			// 	selected: false,
			// 	added:false,
			// 	deleted : false
			// }, self.option.defaultState.dataSet, self.option.extendStateOnSet ? item._state : null);
			var prevState = item._state;
			item._state = {
				edited: false,
				editing: false,
				selected: false,
				added:false,
				deleted : false
			};
			if(hasDefaultState) {
				typeof defaultState.edited === "boolean" ? (item._state.edited = defaultState.edited) : 0;
				typeof defaultState.editing === "boolean" ? (item._state.editing = defaultState.editing) : 0;
				typeof defaultState.selected === "boolean" ? (item._state.selected = defaultState.selected) : 0;
				typeof defaultState.added === "boolean" ? (item._state.added = defaultState.added) : 0;
				typeof defaultState.deleted === "boolean" ? (item._state.deleted = defaultState.deleted) : 0;
			}
			if(self.option.extendStateOnSet && prevState) {
				typeof prevState.edited === "boolean" ? (item._state.edited = prevState.edited) : 0;
				typeof prevState.editing === "boolean" ? (item._state.editing = prevState.editing) : 0;
				typeof prevState.selected === "boolean" ? (item._state.selected = prevState.selected) : 0;
				typeof prevState.added === "boolean" ? (item._state.added = prevState.added) : 0;
				typeof prevState.deleted === "boolean" ? (item._state.deleted = prevState.deleted) : 0;
			}
			item._index = item._index || {};
			item._index.id = _generateUniqueId();
			item._index.data = i;
			self.state.dataFilltrimmer ? self.state.dataFilltrimmer(item) : 0;
			self.state.dataCompositor ? self.state.dataCompositor(item) : 0;
			if(doAllowEditTest) {
				if(self.option.rowOption.allowEdit(item) === false) {
					item._state.editing = false;
				}
			}
			self.option.setOriginalFromStart ? (item._original = AlopexGrid.trimObject(item)) : 0;
			self.state.data.push(item);
		}

		delete self.state.sortingColumn;
		delete self.state.sortingDirection;

		if ($.isPlainObject(_dataonly)) {
			//동적 데이터 처리 로직
			var dynamicOption = $.extend({},_dataonly);
			if(_valid(dynamicOption["dataLength"]) && _valid(dynamicOption['current'])) {
				var pobj = {};
				pobj["current"] = Number(dynamicOption["current"]);
				pobj["dataLength"] = Number(dynamicOption["dataLength"]);
				pobj["perPage"] = Number(dynamicOption["perPage"] || self.state.data.length);
				pobj["total"] = Number(
					pobj["dataLength"] && pobj["perPage"] ? 
						(((pobj["dataLength"]/pobj["perPage"])|0) + (pobj["dataLength"]%pobj["perPage"]?1:0))
						: dynamicOption["total"]
					);
				self.state._paddingDataLength = self.option.pager ? (pobj.perPage * (pobj.current - 1) || 0) : 0;
				self.option.paging.customPaging = pobj;
			}
			//TODO 동적바인딩에서 multi level sorting 정보를 넘길 수 있도록 한다. 
			if(_valid(dynamicOption["sortingColumn"]) || _valid(dynamicOption["sortingKey"])) {
				self.state.sortingColumn = Number(dynamicOption["sortingColumn"]);
				if(!_valid(dynamicOption["sortingColumn"])) {
					for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
						var m = self.option.columnMapping[i];
						var ci = m.columnIndex;
						if(ci !== undefined && ci !== null && m.key === dynamicOption["sortingKey"]) {
							self.state.sortingColumn = Number(ci);
							break;
						}
					}
				}
				self.state.sortingDirection = dynamicOption["sortingDirection"] || "asc";
			}
			self.state.dynamicBinding = true;
		} else {
			if (self.option.paging && self.option.paging.customPaging) {
				delete self.option.paging.customPaging;
			}

			if(self.option.defaultSortingOnDataSet) {
				self._processDefaultSorting();
			}
			self.state.dynamicBinding = false;
			self.state._paddingDataLength = 0;
		}

		self._scrollerReset();
		if(self.state.renderingSuppressed) {
			setTimeout(function(){dataChangeCallback(self, "changed",["set"]);},0);
			return;
		}
		if (_dataonly !== true) {
			self.$tablebody.empty();
			self.$scroller.prop('scrollLeft',0).prop('scrollTop',0);
			self._simpleRedraw(null,{scrollLeft:0,scrollTop:0});
		}
		self._refreshEditableCellAll();
		setTimeout(function(){dataChangeCallback(self, "changed",["set"]);},0);
		//this.updateOption();
	};
	AlopexGrid.prototype.clear = function(flushCallback) {
		this.dataFlush(flushCallback);
		this.dataEmpty();
	};
	AlopexGrid.prototype.dataEmpty = function(data) {
		var self = this;
		if(dataChangeCallback(self, "empty", [])===false) {
			return false;
		}
		self.clearFilter(true);
		this.state.data = [];
		this.state.deletedData = [];
		this.state.rendered = [];
		var self = this;
		self._scrollerReset();
		self._tableSpacing(0,null,0);
		self._simpleRedraw(null,{scrollLeft:0,scrollTop:0});
		setTimeout(function(){dataChangeCallback(self, "changed",["empty"]);},0);
		//this.updateOption();
	};
	AlopexGrid.prototype._getActualDataByIndex = function(_index) {
		var self = this;
		if(_index.hasOwnProperty('data')) {
			return self.state.data[_index.data];
		}
		if(_index.hasOwnProperty('row')) {
			return self.state.data[self.state.rendered[_index.row]];
		}
		if(_index.id) {
			return self.state.data[self.state.dataIdToIndexMap[_index.id]];
		}
		return null;
	};
	AlopexGrid.prototype.dataGetByIndex = function(index, getrecent) {
		//index.row : 현재 페이지에서의 row index
		//index.data : state.data에서의 index
		//index.element : 데이터를 가져오고자 하는 row 또는 row를 구성하는 element
		if (this._noData() || !index) {
			return null;
		}
		var self = this;
		if(index && typeof index._index === "object") {
			index = index._index;
		}
		if (index.id) {
			var data = null;
			$.each(this.state.data, function(idx, d) {
				if (_isUserReadableData(d) && d._index && d._index.id === index.id) {
					self.state.dataCompositor ? self.state.dataCompositor(d) : 0;
					data = $.extend(true, {}, d, getrecent===true?AlopexGrid.trimData(d._state.recent):null);
					return false;
				}
			});
			return data;
		}
//		if(index.hasOwnProperty('row')) {
//			var dataIndex = self.state.rendered[index.row];
//			var d = $.extend(true, {_index:{row:index.row,data:dataIndex}}, self.state.data[dataIndex])
//			if(dataIndex !== undefined && self.state.data[dataIndex]) {
//				return d;
//			}
//			return null;
//		}
		var dataIndex = typeof index.data == "number" || !isNaN(Number(index.data)) ? Number(index.data) : null;
		if(dataIndex === null && index.hasOwnProperty('row')) {
			dataIndex = self.state.rendered[index.row];
			dataIndex = _valid(dataIndex) ? Number(dataIndex) : null;
		}
		if(dataIndex === null && index.element) {
			var $row = $(index.element).eq(0);
			if(!$row.hasClass('bodyrow')) {
				$row = $row.parentsUntil(self.$scroller, '.bodyrow').eq(0);
			}
			var di = $row.attr('data-alopexgrid-dataindex');
			if(_valid(di)) {
				dataIndex = Number(di);
			}
		}
		if(dataIndex === null) {
			return null;
		}
		if(!_isUserReadableData(self.state.data[dataIndex])) return null;
		self.state.dataCompositor ? self.state.dataCompositor(self.state.data[dataIndex]) : 0;
		var data = $.extend(true,{_index:{},_state:{}}, this.state.data[dataIndex],
				getrecent===true?AlopexGrid.trimData(this.state.data[dataIndex]._state.recent):null);
		var rowIndex = $.inArray(dataIndex, self.state.rendered);
		if(rowIndex >= 0) {
			data._index["row"] = Number(rowIndex);
		}
		data._index["data"] = Number(dataIndex);
		//if(index.element !== undefined || index.row !== undefined) {
		if (index.element !== undefined) {
			var colidx = index.element.getAttribute('data-alopexgrid-columnindex');
			if (colidx === undefined || colidx === null) {
				var $indexelem = $(index.element);
				colidx = $indexelem.parentsUntil(self.$scroller, '.cell').eq(0).attr('data-alopexgrid-columnindex');
			}
			$.each(self.option.columnMapping, function(idx, mapping) {
				if (Number(mapping.columnIndex) === Number(colidx)) {
					data._index["column"] = Number(mapping.columnIndex);
					data._key = mapping.key;
					return false;
				}
			});
		}
		return data;
	};

	var _KeyUnreadable = "__unreadable__";
	function _isUserReadableData(data) {
		if(!data || (data && data[_KeyUnreadable]) || (data && !data._state)) return false;
		return true;
	}
	function _setDataUnreadable(data,unset) {
		if(!data) return;
		data[_KeyUnreadable] = (unset===false)?false:true;
	}
	function _dataMeetsQuery(self, datalist, dataIndex, query, getrecent) {
		query = query || {};
		//query의 조건이 하나라도 맞지 않으면 false처리한다.
		var data = datalist[dataIndex];
		if(!_isUserReadableData(data)) {
			return false;
		}
		if(getrecent) {
			data = $.extend({}, data, data._state.recent);
		}
		if(query._index) {
			if(query._index.hasOwnProperty('id')){
				if(query._index.id === data._index.id) return true;
				return false;
			}
			if(query._index.hasOwnProperty('data')){
				if(query._index.data === dataIndex) return true;
				return false;
			}
			if(query._index.hasOwnProperty('row')){
				if(self.state.rendered[query._index.row] === data._index.data) return true;
				return false;
			}
			if(query._index.hasOwnProperty('rendered')) {
				if(self.state.renderedIndexMapById[data._index.id] === parseInt(query._index.rendered)) return true;
				return false;
			}
		}
		if(query.nodeType || query.jquery) {
			var $row = query.jquery ? query : $(query);
			if(!$row.hasClass('bodyrow')) {
				$row = $row.parentsUntil(self.$scroller, '.bodyrow').eq(0);
			}
			var di = $row.attr('data-alopexgrid-dataindex');
			if(!_valid(di) || Number(dataIndex) !== Number(di)) {
				return false;
			}
		}
		if($.isPlainObject(query._state)) {
			for(var prop in query._state) {
				if(query._state[prop] !== data._state[prop]) {
					return false;
				}
			}
		}
		var trimmedquery = AlopexGrid.trimData(query);
		if(!$.isEmptyObject(trimmedquery)) {
			var failed = false;
			$.each(trimmedquery, function(key, val){
				if(data[key] !== val) {
					failed = true;
					return false;
				}
			});
			if(failed) return false;
		}
		return true;
	}
	AlopexGrid.prototype.dataGet = function(query) {
		//query._state.added/selected/deleted
		var self = this;
		var ret = [];
		var queries = $.makeArray($.isArray(query) ? query : arguments);
		if($.isArray(query) && arguments[1]===true) {
			queries.push(true);
		}
		var getrecent = arguments[arguments.length-1] === true;
		if(getrecent) {
			while ($.inArray(true, queries) > -1) {
				queries.splice( $.inArray(true, queries), 1 );
			}
		}
		if(!self.option.leaveDeleted && queries.length) {
			//self.state.deletedData에 삭제데이터가 관리되는 경우
			var qcopied = [];
			for(var i=0,l=queries.length;i<l;i++) {
				if(queries[i] && queries[i]._state && queries[i]._state.deleted) {
					qcopied.push(queries[i]);
				}
			}
			if(qcopied.length) {
				var deleted = self.state.deletedData || [];
				for(var i=0,l=deleted.length;i<l;i++) {
					var d = deleted[i];
					var meets = false;
					for(var j=0,k=qcopied.length;j<k;j++) {
						if(_dataMeetsQuery(self, deleted, i, qcopied[j])) {
							//하나라도 해당될경우(or조건)
							meets = true;
						}
					}
					if(meets) {
						ret.push(d);
					}
				}
			}
		}
		if(!queries.length) {
			queries.push({});
		}
		for(var i=0,l=self.state.data.length; i<l;i++) {
			var meets = false;
			for(var j=0,k=queries.length;j<k;j++) {
				if(self.state.data[i]._state.meta) continue;
				if( _dataMeetsQuery(self, self.state.data, i, queries[j],getrecent) ) {
					meets = true;
					break;
				}
				if(queries[j] && queries[j]._index && queries[j]._index.hasOwnProperty('row')) {
					if(self.state.rendered[queries[j]._index.row] == i) {
						meets = true;
						break;
					}
				}
			}
			if(meets) {
				var d = self.dataGetByIndex({
					data: i
				},getrecent);
				ret.push(d);
			}
		}
		if (queries.length === 1 && query &&
			query.sorting && typeof query.sorting === "object" && query.sorting.hasOwnProperty('columnIndex')) {
			var cindex = Number(query.sorting.columnIndex);
			var dir = query.sorting.order || 'asc';
			var filt = query.sorting.type;
			ret = self._sortInternalData(ret, cindex, dir, filt);
		}
		return ret;
	};
	AlopexGrid.prototype.dataEdit = function(data, queries, op) {
		var self = this;
		data = data || {};
		if(dataChangeCallback(self, "edit", [data, queries]) === false) {
			return false;
		}
		if (this._noData()) {
			return;
		}
		if (!$.isArray(queries)) {
			queries = [queries];
		}
		var trimmedData = AlopexGrid.trimData(data);
		//* TODO dataEdit 로직 최적화 재구현
		var editedIndex = [];
		$.each(queries, function(idx,query) {
			var datalist = self.dataGet(query);
			if(!$.isArray(datalist) || !datalist.length) {
				return;
			}
			$.each(datalist, function(didx,targetData){
				var dataIndex = targetData._index.data;
				var prevData = targetData;
				var trimmedPrev = AlopexGrid.trimObject(prevData);
				var original = targetData._original;
				var newData = $.extend(true,
					{ _index:{},_state:{} },
					{ _index : prevData._index, _state : prevData._state },
					{ _index : data._index || {},
						_state : data._state || {}},
					!targetData._state.edited ? {_original : trimmedPrev} : { _original : original },
					//prevData, data
					trimmedPrev,trimmedData
				);
				if (prevData._state.editing && $.isPlainObject(prevData._state.recent)) {
					newData._state.recent = $.extend({},
						//prevData, 
						trimmedPrev,
						AlopexGrid.trimObject(prevData._state.recent),
						//data
						trimmedData
					);
				}
				var trimmedNew = AlopexGrid.trimObject(newData);
				if($.isFunction(self.option.valueFilter)) {
					for(var prop in trimmedNew) {
						var filtered = self.option.valueFilter(trimmedNew[prop],newData);
						if(filtered === false) {
							//forbid invalid value
							return ($.isFunction(self.option.message.valueFilter)
								? self.option.message.valueFilter(trimmedNew[prop],newData) : self.option.message.valueFilter)
								|| false;
						} else if(typeof filtered == "string" || typeof filtered == "number") {
							newData[prop] = String(filtered);
						}
					}
				}
				var diffkey = [];
				for(var prop in trimmedPrev) {
					if(trimmedPrev[prop] !== trimmedNew[prop]) {
						diffkey.push(prop);
					}
				}
				for(var prop in trimmedNew) {
					if(trimmedNew[prop] !== trimmedPrev[prop] && $.inArray(prop, diffkey) < 0) {
						diffkey.push(prop);
					}
				}
				var diffmap = $.map(diffkey, function(key, idx) {
					var mapped = {"key":key};
					var ci = getColumnIndexByKey(self.option.columnMapping, key);
					if(_valid(ci)) {
						mapped["column"] = ci;
					}
					return mapped;
				});
				newData["_prev"] = prevData;
				newData["_edited"] = diffmap;
				if(self.option.fullCompareForEditedState) {
					newData._state.edited = false;
					if(newData._original) {
						$.each(newData._original, function(k,v){
							if(v !== newData[k]) {
								newData._state.edited = true;
								return false;
							}
						});
					}
				} else if(diffkey.length || self.option.forceEditedOnEdit) {//set edited state only if there is change
					newData._state.edited = true;
				}
				self.state.dataCompositor ? self.state.dataCompositor(newData) : 0;
				self.state.data[dataIndex] = newData;
				editedIndex.push(Number(dataIndex));

				if (self.option && self.option.on && self.option.on["edit"]) {
					var cb = self.option.on["edit"];
					if ($.isFunction(cb)) {
						cb = [cb];
					}
					$.each(cb, function(idx, callback) {
						callback.call(self, newData);
					});
				}

				delete newData["_prev"];
				//delete newData["_edited"];
			});
		});

		if (self.option.flushOnEdit) {
			self.dataFlush();
		}
		if(editedIndex.length) {
			setTimeout(function(){dataChangeCallback(self, "changed",["edit"]);},0);
		}
		if(op && op.norender===true) return;
		if(self.state.renderingSuppressed) return;
		if (editedIndex.length>30) {
			self._dataDraw({
				tableheader: {
					display: 'none'
				}
			});
			if (self.state.hasFixColumn) {
				self._fixColumnLoad();
				self.$scroller.trigger('scroll');
			}
		} else {
			var hasrow = false;
			for(var i=0;i<editedIndex.length;i++) {
				var dataIndex = editedIndex[i];
				if($.inArray(dataIndex, self.state.rendered) >= 0) {
					hasrow = true;
					break;
				}
			}
			if(hasrow) {
				var $rows = self.$tablebody.children();
				$rows.each(function(idx, row) {
					var dataIndex = row.getAttribute('data-alopexgrid-dataindex');
					if(_valid(dataIndex) && $.inArray(Number(dataIndex),editedIndex) >= 0) {
						self._redrawRow($(row), self.state.data[dataIndex]);
					}
				});
			}
		}

		if(editedIndex.length) {
			self._needEditedRefresh();
		}
		return;

	};
	//TODO nocommit대신 flush option으로 처리 
	AlopexGrid.prototype.dataFlush = function(callback, fop) {
		var self = this;
		var option = this.option;
		if (typeof callback == "object") {
			fop = callback;
		}
		fop = fop || {};
		if (typeof option.flushCallback == "function" || typeof callback == "function") {
			var dirties = this.dataGet({ _state: { edited: true } }, { _state: { added:true } });
			var deleted = this.dataGet({ _state: { deleted: true } });
			if (typeof option.flushCallback == "function")
				option.flushCallback.call(this, dirties, deleted);
			if (typeof callback == "function")
				callback.call(this, dirties, deleted);
		}
		if (fop.noCommit === true) {
			return;
		}
		$.each(this.state.data, function(idx, data) {
			var changed = false;
			if (data._state && (data._state.edited || data._state.added) && !fop.leaveEdited) {
				data._state.added = false;
				data._state.edited = false;
				changed = true;
			}
			if(changed) {
				self.state.dataCompositor ? self.state.dataCompositor(data) : 0;
				data._original = AlopexGrid.trimData(data);
			}
		});
		if (!fop.leaveDeleted) {
			if(self.option.leaveDeleted) {
				self.dataDelete({_state:{deleted:true}},null,true);
			}
			this.state.deletedData = [];
		}
		if ((!fop.leaveEdited) && (!fop.noredraw)) {
			self._simpleRedraw();
		}
	};
	function _deleteRecent(data) {
		delete data._state.recent;
		delete data._state._editableStarted;
		delete data._state._beforeEditing;
	}
	AlopexGrid.prototype.dataRestore = function(query) {
		var self = this;
		var datalist = self.dataGet(query);
		if(!datalist || !datalist.length) return;
		var refreshall = _isEmptyQuery(query);
		var count = 0;
		$.each(datalist, function(idx, targetData){
			var data = self.state.data[targetData._index.data];
			if(data._original) {
				$.extend(data, data._original);
			}
			if(data._state.edited) count++;
			_deleteRecent(data);
			data._state.edited = false;
			if(!refreshall) {
				self.refreshRow(targetData);
			}
		});
		if(refreshall && count) {
			self._simpleRedraw();
		}
	};
	/**
	 * undelete : option.leaveDeleted=true일 때, 삭제처리된 데이터를 복원시킬떄 사용
	 * deletefromdata : state.deletedData로 삭제 데이터를 이동시킴. dataFlush에서 사용.
	 */
	AlopexGrid.prototype.dataDelete = function(query, undelete, deletefromdata) {
		var self = this;
		if(dataChangeCallback(self, undelete===true?"undelete":"delete", [query]) === false) {
			return false;
		}
		if (self._noData()) {
			return;
		}
		var datalist = self.dataGet(query);
		var indexes = [];
		$.each(datalist, function(idx, data) {
			indexes.push(data._index.data);
		});
		var dellist = [];
		//IE8 sort 이슈 http://www.zachleat.com/web/array-sort/
		indexes.sort(function(m1, p1) {
			var m = Number('' + m1), p = Number('' + p1);
			if (m < p)
				return 1;
			if (m > p)
				return -1;
			return 0;
		});
		if(self.option.leaveDeleted && deletefromdata !== true) {
			//비삭제모드
			$.each(indexes, function(idx, index) {
				//undelete 기능. deleteit이 false인경우 삭제를 복원한다.
//				self.state.data[index]._state.deleted = (deleteit===false)? false : true;
//				self.state.data[index]._state.selected = false;
//				self.state.data[index]._state.editing = false;
				if(self.state.data[index] && self.state.data[index]._state &&
					!self.state.data[index]._state.added) {
					self._dataSetState({_index:{data:index}}, {deleted:(undelete===true)? false : true}, true);
					self.state.dataCompositor ? self.state.dataCompositor(self.state.data[index]) : 0;
					dellist.push(self.state.data[index]);
				} else {
					//added후 삭제되는 데이터는 관리하지 않는다.
					delete self.state.dataIdToIndexMap[self.state.data[index]._index.id];
					self.state.data.splice(index,1);
				}
			});
		} else {
			if(undelete === true) {
				for(var i=self.state.deletedData.length-1;i>=0;i--) {
					if(_dataMeetsQuery(self, self.state.deletedData, i, query)) {
						var rdata = self.state.deletedData[i];
						rdata._state.deleted = false;
						self.state.data.splice(rdata._index.data, 0, rdata);
						self.state.deletedData.splice(i,1);
					}
				}
			} else {
				$.each(indexes, function(idx, index) {
					delete self.state.dataIdToIndexMap[self.state.data[index]._index.id];
					var deleted = self.state.data.splice(index, 1)[0];
					deleted._state.deleted = true;
					self.state.deletedData = self.state.deletedData || [];
					if(deleted && deleted._state && !deleted._state.added) {
						//added후 삭제되는 데이터는 관리할 필요가 없음
						self.state.dataCompositor ? self.state.dataCompositor(deleted) : 0;
						deleted._state.selected = false;
						deleted._state.editing = false;
						deleted._state.focused = false;
						self.state.deletedData.push(deleted);
						dellist.push(deleted);
					}
				});
			}
		}
		if (self.option.on && this.option.on.del && undelete !== true) {
			self.option.on.del(dellist);
		}
		if (self.option.flushOnEdit) {
			self.dataFlush({
				noredraw: true
			});
		}
		self._closeTooltip();
		self.pageInfo();
		self._dataDraw();
		self.viewUpdate();
		if(self.state.hasVerticalScrollBar && self.$scroller.prop('scrollHeight') <= self.$scroller.prop('clientHeight')) {
			//if hor/ver scrollbar meets the situation where both should be disappeared, 
			//horizontal scrollbar prohibits verticalScrollbar area from disappearing.
			//in that case, view Update one more time.
			self.viewUpdate();
		}
		self._needEditedRefresh();
		setTimeout(function(){dataChangeCallback(self, "changed",[undelete===true?"undelete":"delete"]);},0);
	};
	AlopexGrid.prototype.dataUndelete = function(query) {
		return this.dataDelete(query, true);
	};

	AlopexGrid.prototype.dataFilter = function(){
		var self = this;
	};


	function _queryMapper(d){ if($.isPlainObject(d) || $.isArray(d)) { return d; } }
	function _editingMapper(d){ if($.type(d)==="boolean" || d===null) return d; }
	function _appendMapper(d){ if($.type(d)==="string") return d; }
	function _unpinFromStateByIdx(self, idxlist) {
		for(var i = self.state.pinnedDataIdList.length-1; i>=0; i--) {
			if($.inArray(i, idxlist) >= 0) {
				var id = self.state.pinnedDataIdList[i];
				delete self.state.pinnedDataStateMapById[id];
				self.state.pinnedDataIdList.splice(i, 1);
			}
		}
	}

	AlopexGrid.prototype._pinnedRender = function(){
		var self = this;
		var rows = [];
		if(self._hasPinnedData()) {
			var removeme = [];
			$.each(self.state.pinnedDataIdList, function(idx, dataid){
				var rendered = self._pinnedRowRender({_index:{id:dataid}}, idx);
				if(rendered) {
					rows.push( rendered );
				} else {
					removeme.push(idx);
				}
			});
			_unpinFromStateByIdx(self, removeme);
		}
		return rows;
	};
	AlopexGrid.prototype._pinnedRowRender = function(query, pinnedIndex){
		var self = this;
		var data = self.dataGetByIndex(query._index);
		if(!data) {
			return null;
		}
		$.extend(data._state, self.state.pinnedDataStateMapById[data._index.id], {selected:false});
		var row = self._rowRender(data, data._index.data, pinnedIndex,
			{"disableOddEven":true, "disableSelect":true, "pinned":true,"returnRaw":true,"disableCellSpan":true});
		return row;
	};
	AlopexGrid.prototype._pinnedRefresh = function(id){
		var self = this;
		if(!self._hasPinnedData()) return;
		var $rows = self.$root.find('.pinnedrow');
		if(!$rows.length) return;
		$rows.each(function(){
			var $row = $(this);
			var dataid = $row.attr('data-alopexgrid-dataid');
			if(dataid && !(id && id !== dataid))
				$row.replaceWith(_generateHTML(self._pinnedRowRender({_index:{id:dataid}})));
		});
	};
	AlopexGrid.prototype._hasPinnedData = function(dataid){
		var self = this;
		if($.type(dataid) === "string") {
			return $.inArray(dataid, self.state.pinnedDataIdList) >= 0;
		}
		return $.isArray(self.state.pinnedDataIdList) && self.state.pinnedDataIdList.length;
	};

	//현재 렌더링된 row의 index기준으로 pin을 한다. above 옵션을 통해 엑셀의 틀고정 기능을 만들 수 있다.
	AlopexGrid.prototype.rowPin = function(renderedIndex, includeAbove) {
		// var self = this;
		// var query = [];
		// var from = includeAbove ? 0 : renderedIndex;
		// var to = renderedIndex;
		// if(!_valid(renderedIndex) || (to-from+1)<=0) return;
		// for(var i=from;i<=to;i++) {
		// 	var data = self._getRenderedDataFromRenderedIndex(i);
		// 	query.push({_index:{id:data._index.id}});
		// }
		// var append = "add";
		// if($.isArray(query) || ($.isPlainObject(query) && !$.isEmptyObject(query))) {
		// 	var pinlist = self.dataGet(query);
		// 	if(!pinlist || !pinlist.length) {
		// 		return;
		// 	}
		// 	pinlist = $.map(pinlist, function(pd){return pd._index.id});
		// 	self.state.pinnedDataIdList = (append === "add") ? (self.state.pinnedDataIdList || []) : [];
		// 	self.state.pinnedDataIdMap = (append === "add") ? (self.state.pinnedDataIdMap || {}) : {};
		// 	var added = [];
		// 	$.each(pinlist, function(idx,pid) {
		// 		if($.inArray(pid, self.state.pinnedDataIdList)<0) {
		// 			added.push(pid);
		// 			self.state.pinnedDataIdMap[pid] = true;
		// 			var stateobj = {};
		// 			delete stateobj[pid];
		// 			self.state.pinnedDataStateMapById = $.extend({}, self.state.pinnedDataStateMapById, stateobj);
		// 		}
		// 	});
		// 	if(!added.length) {
		// 		return;
		// 	}
		// 	self.state.pinnedDataIdList = self.state.pinnedDataIdList.concat(added);
		// }
		// console.log('ASD')
		// $.each(query, function(idx, q) {
		// 	self.rowElementGet(q).remove();
		// });
		// console.log('ASD1')
		// self._sortInternalData();
		// self.pageInfo();
		// self._generateRenderedList();
		// console.log('ASD2');
		// self.viewUpdate();
		// console.log("ASD3")
		// return;


		var self = this;
		var from = includeAbove ? 0 : renderedIndex;
		var to = renderedIndex;
		if(!_valid(renderedIndex) || (to-from+1)<=0) return;
		var query = [];
		for(var i=from;i<=to;i++) {
			var data = self._getRenderedDataFromRenderedIndex(i);
			query.push({_index:{id:data._index.id}});
		}
		return self.addPin(query);
	};
	AlopexGrid.prototype.addPin = function(query, editing, append) {
		var self = this;
		var args = $.makeArray(arguments);
		query = $.map(args, _queryMapper);
		editing = $.map(args, _editingMapper)[0];
		append = "add";
		return self.dataPin(query, editing, append);
	};
	AlopexGrid.prototype.dataPin = function(query, editing, append) {
		var self = this;
		var args = $.makeArray(arguments);
		query = $.map(args, _queryMapper);
		editing = $.map(args, _editingMapper)[0];
		append = $.map(args, _appendMapper)[0];
		if($.type(editing) !== "boolean" && editing !== null) {
			//editing = false;//default is non-editing data.
		}
		if($.isArray(query) || ($.isPlainObject(query) && !$.isEmptyObject(query))) {
			var pinlist = self.dataGet(query);
			if(!pinlist || !pinlist.length) {
				return;
			}
			pinlist = $.map(pinlist, function(pd){return pd._index.id});
			self.state.pinnedDataIdList = (append === "add") ? (self.state.pinnedDataIdList || []) : [];
			self.state.pinnedDataIdMap = (append === "add") ? (self.state.pinnedDataIdMap || {}) : {};
			var added = [];
			$.each(pinlist, function(idx,pid) {
				if($.inArray(pid, self.state.pinnedDataIdList)<0) {
					added.push(pid);
					self.state.pinnedDataIdMap[pid] = true;
					var stateobj = {};
					if($.type(editing)==="boolean") {
						stateobj[pid] = {editing:editing};
					} else {
						delete stateobj[pid];
					}
					self.state.pinnedDataStateMapById = $.extend({}, self.state.pinnedDataStateMapById, stateobj);
				}
			});
			if(!added.length) {
				return;
			}
			self.state.pinnedDataIdList = self.state.pinnedDataIdList.concat(added);
			delete self.state.scrollerScrollHeight;
			delete self.state.scrollerClientHeight;
			delete self.state.tableheaderHeight;
			delete self.state.scrollerTopMargin;
			delete self.state.scrollerCss;
			//self._simpleRedraw(null, null);
			self.updateOption();
		}
	};
	AlopexGrid.prototype.dataUnpin = function(query) {
		var self = this;
		if(!self._hasPinnedData()) return;
		if($.isPlainObject(query) && !$.isEmptyObject(query)) {
			var unpinlist = self.dataGet(query);
			if(!unpinlist || !unpinlist.length) {
				return;
			}
			unpinlist = $.map(unpinlist, function(upd){return upd._index.id});
			var unpinned = [];
			$.each(unpinlist, function(idx, upid){
				var aidx = $.inArray(upid, self.state.pinnedDataIdList);
				if(aidx >= 0) {
					unpinned.push(aidx);
				}
			});
			if(!unpinned.length) {
				return;
			}
			_unpinFromStateByIdx(self, unpinned);
		} else {
			self.state.pinnedDataIdList = false;
			self.state.pinnedDataIdMap = false;
		}
		delete self.state.scrollerScrollHeight;
		delete self.state.scrollerClientHeight;
		delete self.state.tableheaderHeight;
		delete self.state.scrollerTopMargin;
		delete self.state.scrollerCss;
		//self._simpleRedraw(null, null);
		self.updateOption();
	};

	AlopexGrid.prototype._findClonePair = function(elem) {
		var self = this;
		if(!self.state.hasFixColumn) {
			return elem;
		}
		var $elem = $(elem);
		var $target = $();
		var $row = $elem.attr('data-alopexgrid-dataid') ? $elem : $elem.closest('.row');
		var $cell = $elem.attr('data-alopexgrid-columnindex') ? $elem : $elem.closest('.cell');
		var wasOnFixcol = $row.hasClass('cloned-row');
		var rowidx = $row.index();
		if(rowidx < 0) {
			return $target;
		}
		var colidx = $cell.index();
		var $body = wasOnFixcol ? self.$tablebody : self.state.$fixcolbody;//to opposite
		if(rowidx >= 0) {
			$target = $body.children().eq(rowidx);
		}
		if(colidx >= 0) {
			$target = $target.children().eq(colidx);
		}
		return $target;
	};
	AlopexGrid.prototype._fixColumnLoad = function(viewoption) {
		var self = this;
		var option = this.option;

		var $scroller = this.$scroller;

		if (!self.state.viewUpdating) {
			if (!option.height) {
				delete self.state.scrollerClientHeight;
			}
		}

		var fixupto = self.state.fixupto;
		var _count = -1;
		var twidth = 0;

		var colgrouphtml = '<colgroup>';
		var stopit = false;
		if(self.option.calculateFixedColumnWidthOldWay) {
			$.each(option.columnMapping, function(idx, mapping) {
				if (!isMappingVisible(mapping)) {
					return;
				}
				if (mapping.fixed) {
					if (!mapping.hasOwnProperty('width')) {
						stopit = true;
						return false;
					}
					twidth += Number(mapping.width.split("px")[0]);
					_count++;
					colgrouphtml += '<col data-alopexgrid-columnindex="'+mapping.columnIndex+'" style="width:' + (mapping.width) + ';">';
				}
			});
		} else {
			var widthmap = self.state.columnWidthMap = self._calcCellWidth();
			$.each(option.columnMapping, function(idx,mapping){
				if (!isMappingVisible(mapping)) {
					return;
				}
				if(mapping.fixed) {
					var currentWidth = widthmap[mapping.columnIndex];
					twidth += currentWidth;
					_count++;
					colgrouphtml += '<col data-alopexgrid-columnindex="'+mapping.columnIndex+'" style="width:' + currentWidth + 'px;">';	
				}
			});
		}
		colgrouphtml += '</colgroup>';
		if (stopit) {
			return;
		}

		if (fixupto >= 0 && self.state.hasHorizontalScrollBar) {
			var $table = self.$table;
			var $tableheader = self.$tableheader;
			var tableheaderHeight = Number(this.state.tableheaderHeight || $tableheader.height());//$tableheader.height();
			var ratio = this._colRatio();
			var drawn = 0;
			var collen = 0;
			var nowrapdiv = false;
			var width = (twidth * ratio + (ratio > 1.01 ? 2 : 0)) | 0;
			for ( var j in this.option.columnMapping) {
				var mapping = self.option.columnMapping[j];
				if (isMappingVisible(mapping)) {
					collen++;
				}
			}
			//헤더복제. 복제된 테이블은 .cloned.fixed-column을 가진다.
			var $h = null;
			$h = $('<table class="table cloned fixed-column fixed-header fixcol" '
				+ 'style="' + $table.attr('style') + ';position:absolute;top:0px;left:0px;">');
			if (isChrome && option.compensate1px) {
				$h.css("top", "-1px");
			}
			$h.css({"margin-top":"","margin-bottom":""});//vscroll
			$h.append(self.$colgroup.clone());
			$h.append($('<thead class="table-header"></thead>').append(_convertAlopex.call(self, this._headerRender())));

			$h.css({
				"width": width + "px"
			});
			var $wrapheader = $('<div class="fixed-header-div fixcol">').append($h);
			var wrapperHeight = tableheaderHeight;
			wrapperHeight += 2;
			$wrapheader.css({
				"position": "absolute",
				"top": "0px",
				"left": "0px",
				"overflow": "hidden",
				"width": (width + 2) + 'px',
				"height": wrapperHeight + 'px'
			});
			var $rows = this.$tablebody.children('.bodyrow');
			var bodytopComp = self.option.fixcolumnTopCompensate || 0;//헤더높이가 정확히 맞지 않는 경우 compensate TODO 고정헤더 등 전체 영역에 적용 가능?
			var vscroll = self._vscrollInfo();
			var scrollerClientHeight = $scroller.prop('clientHeight');

			var wrapdiv = ['<div class="fixed-body-div fixcol" '];
			var scrollerBorder = (parseInt($scroller.css('borderTopWidth')) || 0)
				+ (parseInt($scroller.css('borderBottomWidth')) || 0);
			wrapdiv.push('style="height:', scrollerClientHeight - bodytopComp - (option.floatingHeader?0:0) + scrollerBorder, "px;", "overflow:hidden;position:absolute;");
			wrapdiv.push('top:', (option.floatingHeader?this.state.scrollerTopMargin:0) + bodytopComp, 'px;left:0px;width:', ((twidth * ratio) | 0) + 1, 'px;"></div>');

			var body = [];
			body.push('<table class="table cloned fixed-column fixed-body"');
			body.push(' style="width:', (twidth * ratio + (ratio > 1.01 ? 2 : 1)), 'px;');
			body.push('background-color:white;');

			var toppx = -(viewoption && viewoption.scrollTop ? viewoption.scrollTop : 0) - bodytopComp;
			if(self.option.floatingHeader===false) {
				toppx += self.state.scrollerTopMargin;
			}
			var renderedStart = 0,renderedEnd = self.state.rendered.length-1;
			if(vscroll) {
				toppx += vscroll["paddingTopHeight"];
				// startIndex = self.state.rendered[vscroll["startIndex"]];
				// endIndex = self.state.rendered[vscroll["endIndex"]]+1;
				renderedStart = vscroll["startIndex"];
				renderedEnd = vscroll["endIndex"];
			}
			(isIE<9) ? (body.push('top:',toppx, 'px;')) : (body.push('top:0px;translateY:(',toppx,'px);'));
			body.push('table-layout:fixed;position:absolute;" ');
			if(vscroll) {
				body.push('data-vscroll-top="',vscroll["paddingTopHeight"],'"');
			}
			body.push('>');
			body.push(colgrouphtml);
			body.push('<tbody class="table-body">');

			var nodata = false;
			if (!self.state.rendered.length || !this.state.data || !this.state.data.length) {
				if (!this.option.rowPadding) {
					body.push('<tr class="emptyrow">');
					for (var j = 0; j < collen; j++) {
						body.push('<td></td>');
					}
					body.push('</tr>');
				}
				nodata = true;

			} else {
				var pheight = 1000;
				var rowIdMap = {};
				$rows.each(function(idx,row){
					var dataid = $(row).attr('data-alopexgrid-dataid');
					if(dataid) rowIdMap[dataid] = idx;
				});
				for (var i = renderedStart; i <= renderedEnd; i++) {
					var dataIndex = self.state.rendered[i];//TODO dataIndex가 다른것을 지시할 경우에는?? 
					var data = self._getRenderedDataFromRenderedIndex(i);
					var renderop = {
						columnLimit: fixupto
					};
					renderop.css = {};

					var $row = $rows.eq(rowIdMap[data._index.id]);//$rows.eq(drawn);
					var already = $row.data('dataAlopexGridFixColumned');
					var h = already ? parseInt($row.css('height')) : (self._getRowHeight($row, true) || (vscroll ? vscroll["rowHeight"] : null));
					renderop.css["height"] = h + "px";
					$row.data('dataHeight', h+'px');

					renderop.styleclass = data._state.hovering ? "hovering" : "";
					renderop.styleclass += ' cloned-row';
					var rendered = this._rowRender(data, i, drawn, renderop);
					body.push(rendered);
					drawn++;
				}
				//refreshed row or fresh-drawn row wouldn't have dataAlopexGridFixColumned data.
				$rows.each(setRowDataHeight).data('dataAlopexGridFixColumned',true);
				this.$tablebody.find('.cell-fixcol').each(function(idx,cell){
					cell.innerHTML = '&nbsp';
					cell.removeAttribute('id');
				});//.html('&nbsp;');//.removeAttr('id');
			}
			if (this.option.rowPadding) {
				var till = 0;
				if (typeof this.option.rowPadding == "number") {
					till = this.option.rowPadding;
				} else {
					till = (self.option.paging ? self.option.perPage : 0) || 0;
				}
				if (till > 0) {
					self._calcRowHeight();
					for (var i = drawn; i < till; i++) {
						body.push('<tr class="row emptyrow" style="height:'+self.state.rowHeight+'px">');
						for (var j = 0; j <= collen; j++) {
							body.push('<td class="cell">&nbsp;</td>');
						}
						body.push('</tr>');
					}
				}
			}
			body.push('</tbody></table>');
			self.$wrapper.find('.cloned.fixed-column').remove();
			//self.$wrapper.find('.fixed-body-div,.fixed-header-div').remove();
			self.$wrapper.children('.fixcol').remove();

			var $wrapdiv = null;
			var $b = null;
			if (!nowrapdiv) {
				$wrapdiv = $(wrapdiv.join(''));
				self.$wrapper.append($wrapdiv);
				$wrapdiv.html(_convertAlopex.call(self, body.join('')));
				$b = $wrapdiv.children('.table');
			}
			if ($h && $h.length) {
				self.$wrapper.append($wrapheader);
			}
			
			$n = null;
			if (nodata) {
				if (this.option.message && this.option.message.nodata) {
					self._calcRowHeight();
					var height = self.state.rowHeight || self._getRowHeight($rows.eq(0));
					var width = $scroller.prop('clientWidth');
					var nobody = ['<div class="fixed-body-div" '];
					nobody.push('style="overflow:visible;position:absolute;');
					nobody.push('top:', (self.state.scrollerTopMargin), 'px;left:0px;');
					nobody.push('width:', width, 'px;');
					if(height) {
						nobody.push('height:', height, 'px;');
					}
					nobody.push('"><table class="table cloned fixed-column fixed-body table-nodata"');
					nobody.push(' style="width:', width + 1, 'px;');
					if(height) {
						nobody.push('height:', height, 'px;');
					}
					nobody.push('top:0px;left:0px;');
					nobody.push('table-layout:fixed;position:absolute;">');
					nobody.push('<tbody class="table-body"><tr class="row emptyrow"><td class="cell">');
					nobody.push(this.option.message.nodata);
					nobody.push('</td></tr></tbody></table></div>');
					self.$wrapper.append(nobody.join(''));
					this.$tablebody.children('.row.emptyrow').children('.cell.cell-nodata').html('&nbsp;');
					$n = self.$wrapper.children('.fixed-body-div.fixcol').children('.table-nodata');
				}
			}

			$scroller.off('.alopexgridfixcolumn'+self.key);
			self.$wrapper.off('.alopexgridfixcolumn'+self.key);
			$wrapdiv.off('.alopexgridfixcolumn'+self.key);
			$window.off('.alopexgridfixcolumn'+self.key);
			if (self.state.hasHorizontalScrollBar || self.state.hasVerticalScrollBar || (vscroll && !self.option.height)) {
				var lastleft = -1;
				var lasttop = -1;
				_scrollHack($scroller, '.alopexgridfixcolumn'+self.key);
				$scroller.on('scroll.alopexgridfixcolumn'+self.key, function(e) {
					if (self.state.hasHorizontalScrollBar && $h && $h.length) {
						var left = 0;
						if (lastleft !== left) {
							$h.css({
								"left": "0px"
							});
							lastleft = 0;
						}
					}
					//$b - wrapdiv내의 .table
					if (self.state.hasVerticalScrollBar && $b && $b.length) {
						var scrollTop = this.scrollTop;
						//$wrapdiv.scrollTop(scrollTop);
						var top = ((-scrollTop) - bodytopComp);// + "px";
						var datamt = $b.attr('data-vscroll-top');//vscroll
						top += datamt ? Number(datamt) : 0;
						$n ? (isIE<9 ? $n.css("top", top+"px") : $n.css('transform','translateY('+top+'px)')) : "";
						if(option.floatingHeader===false) top += self.state.scrollerTopMargin;
						(isIE<9)?$b.css("top", top+"px") : $b.css('transform', 'translateY('+top+'px)');
						if(option.floatingHeader === false) {
							$wrapheader.css("top",(-scrollTop)+"px");
						}
						//IE - scrollTop을 다시 써주지 않으면 실제 scrollTop위치와 맞지 않는 위치에 content를 렌더링하는 문제.
						if(!self._shouldScrollBeOverridden() && isIE){
							$scroller.prop('scrollTop', scrollTop);
						}
					}
				});
				
				//transfer scroll from fixcolumn wrap div to original scroller
				$wrapdiv.on('scroll.alopexgridfixcolumn'+self.key, {self:self}, function(e){
					var self = e.data.self;
					var scrollTop = this.scrollTop;
					// self.$scroller.scrollTop(scrollTop);
					// e.stopPropagation();
					// return;
					if(scrollTop) {
						this.scrollTop = 0;
						self.$scroller[0].scrollTop += scrollTop;
					}
				});
              	var $wheelTarget = $wrapdiv;
				$wheelTarget.on(wheelEventName+'.alopexgridfixcolumn'+self.key, {self:self},_wheelScrollOverrideHandler);
			}
			if (option.scroll) {
				//스크롤 위치를 복원한다. 
				var top = ((-self.state.lastScrollTop || 0) - bodytopComp);
				var datamt = $b.attr('data-vscroll-top');//vscroll
				top += datamt ? Number(datamt) : 0;
				$n ? (isIE<9 ? $n.css("top", top+"px") : $n.css('transform','translateY('+top+'px)')) : "";
				if(option.floatingHeader===false) top += self.state.scrollerTopMargin;
				(isIE<9)?$b.css("top", top+"px") : $b.css('transform', 'translateY('+top+'px)');
			}
			$.extend(this.state, {
				hasFixColumn: true,
				$fixheaderwrap : $wrapheader,
				$fixcolwrap : $wrapdiv,
				$fixcoltable: $b,
				$fixcolbody : $b.children('.table-body'),
				$fixednobody : $n
			});
			// if(self.state.columnRowspanned) {
			// 	var $clonedRows = self.state.$fixcolbody.children();
			// 	$clonedRows.data('dataAlopexGridFixColumned',true);
			// 	self.$tablebody.children().each(function(idx, row) {
			// 		var $row = $(row);
			// 		var dataid = $row.attr('data-alopexgrid-dataid');
			// 		var $clonedRow = $clonedRows.filter('[data-alopexgrid-dataid="'+dataid+'"]');
			// 		var a = self._getRowHeight($row);
			// 		var b = self._getRowHeight($clonedRow);
			// 		var mh = _max(a,b);
			// 		$row.css('height',mh+'px');
			// 		$clonedRow.css('height',mh+'px');
			// 	});
			// }
		} else {
			if (this.state.hasFixColumn) {
				//고정컬럼이 있다가 없애는 상황에서만 데이터를 새로 그리도록 한다.
				this.state.hasFixColumn = false;
				this._dataDraw({
					tableheader: {
						display: "none"
					}
				});
			}
			$scroller.children('.fixcol').remove();
			self.state.$fixheaderwrap ? self.state.$fixheaderwrap.remove() : null;
			self.state.$fixcolwrap ? self.state.$fixcolwrap.remove() : null;
			$.extend(this.state, {
				hasFixColumn: false,
				$fixheaderwrap : null,
				$fixcolwrap : null,
				$fixcoltable: null,
				$fixcolbody : null
			});
		}
	};

	AlopexGrid.prototype._rowFocus = function(query) {
		var self = this;
		self.state.focusedDataId = self.state.focusedDataId || [];
		var data = null;
		if(query && query.nodeType && query.tagName == 'TR') {
			data = self._getActualDataByIndex({id:query.getAttribute('data-alopexgrid-dataid')});
		} else if(query && query.index) {
			data = self._getActualDataByIndex(query.index);
		}
		if(data && !data._state.focused) {
			$.each(self.state.focusedDataId, function(i,dataid){
				var pdata = self._getActualDataByIndex({id:dataid});
				if(pdata) {
					pdata._state.focused = false;
					self.rowElementGet({_index:{id:dataid}}).removeClass('focused');
				}
			});
			data._state.focused = true;
			self.state.focusedDataId.push(data._index.id);
			self.rowElementGet({_index:data._index}).addClass('focused');
		}
	};
	AlopexGrid.prototype._rowSelectAll = function(e, cell) {
		var self = this;
		if (!self.state.data || !self.state.data.length || !self.state.rendered || !self.state.rendered.length) {
			return;
		}
		if(self.option.rowSingleSelect || self.option.rowClickSelect === "only") {
			return;
		}
		var invertLater = false;
		if(e) {
			e = $.event.fix(e);
			if (!$(cell || e.currentTarget).hasClass('selector-column')) {
				return;
			}
			if(e.target.tagName !== 'INPUT') {
				invertLater = true;
			}
		}
		var $target = $(cell || e.target);
		//IE8 cannot reproduce e.currentTarget using event object.
		var $cell = (cell || e.currentTarget) ? $(cell || e.currentTarget) : $target.parentsUntil(self.$scroller, '.cell').eq(0);
		var $input = $cell.find('input');
		var selected = $input.prop('checked');
		if(invertLater) selected = !selected;
		for ( var idx in self.state.rendered) {
			//var dataIndex = Number(self.state.rendered[idx]);
			//var data = self.state.data[dataIndex];
			var data = self._getRenderedDataFromRenderedIndex(idx);
			if(data._meta) continue;
			if(dataChangeCallback(self, "select", [data, selected]) === false
				|| (self.state.testRowAllowSelect && self.option.rowOption.allowSelect(data)===false)) {
				data._state.selected = false;
			} else {
				data._state.selected = selected;
			}
//			if(data._state.deleted) {
//				data._state.selected = false;
//			}
		}
		self.state.selectAll = selected;
		self._dataDraw();
		self.viewUpdate();
		delete self.state.selectAll;
		if(self.option.on && self.option.on.data && self.option.on.data.selected) {
			dataChangeCallback(self, "selected", [$.map(self.state.rendered, function(di){return $.extend(true,{},self.state.data[di]);}), selected]);
		}
	};
	AlopexGrid.prototype._rowSelect = function($row, selected) {
		var self = this;
		$row[selected ? "addClass" : "removeClass"]("selected");
		$row.find('.selector-column input').prop("checked", selected);
		if (self.state.hasFixColumn && self.state.fixupto >= 0) {
			var $clone = this._findClonePair($row);
			$clone.find('.selector-column input').prop("checked", selected);
			$clone[selected ? "addClass" : "removeClass"]("selected");
			$clone[$row.hasClass("hovering") ? "addClass" : "removeClass"]("hovering");
		}
	};
	AlopexGrid.prototype.rowSelect = function(query, selected, e) {
		var self = this;
		var option = self.option;
		if (self._noData()) {
			return;
		}
		if (e) {
			e = $.event.fix(e);
		}
		if (e) {
			var $target = $(e.target);
			if(option.rowClickSelect) {
				if (e.target.tagName === "INPUT" && !$target.hasClass("selector-checkbox")) {
					return;
				}
				if(e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") {
					return;
				}
			} else {
				if(self.option.limitSelectorColumnClickArea) {
					if(!$target.hasClass('selector-checkbox')) {
						return false;
					}
				} else {
					if(!($target.hasClass('selector-checkbox')
						|| $target.hasClass('selector-column')
						|| $target.hasClass('selector-column-wrapper')
						)) {
						return;
					}
				}
			}
			if($target.hasClass("selector-checkbox") && isAlopexMobile) {
				$target.one('click', function(ee){ee.preventDefault();});
			}
		}
		var datalist = (query.nodeType && query.tagName === 'TR') ?
			[self.state.data[query.getAttribute('data-alopexgrid-dataindex')]]
			: self.dataGet(query);
		var $rows = self.$tablebody.children();
		var changedlist = [];
		var processed = [];
		for(var i=0,l=datalist.length;i<l;i++) {
			if(!datalist[i]) continue;
			var dataIndex = datalist[i]._index.data;
			var actualdata = self.state.data[dataIndex];
			if(!_isUserReadableData(actualdata)) {
				continue;
			}
			dataIndex = Number(dataIndex);
			var prev = !!actualdata._state.selected;
			var chosen = (selected == "toggle") ? !actualdata._state.selected : !!selected;

			if(prev !== chosen) {
				changedlist.push(dataIndex);
			}
			if(dataChangeCallback(self, "select", [actualdata, chosen]) === false
				|| (self.state.testRowAllowSelect && self.option.rowOption.allowSelect(data)===false)) {
				chosen = false;
			}
			if(self.state.columnRowspanned && self.option.rowspanGroupSelect) {
				var rowspanindex = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
				var rfrom = rowspanindex.from;
				var rto = rowspanindex.to;
				for(var j=rfrom;j<rto;j++) {
					self.state.data[j]._state.selected = chosen;
					processed.push(j);
				}
			} else {
				actualdata._state.selected = chosen;
				processed.push(dataIndex);
			}
			self.state.dataCompositor ? self.state.dataCompositor(actualdata) : 0;
		}
		if (option.rowClickSelect === "only" || option.rowSingleSelect) {
			$.each(self.state.data, function(i,d) {
				if(!!d._state.selected !== false && $.inArray(i,processed)<0) {
					changedlist.push(Number(i));
					d._state.selected = false;
					self.state.dataCompositor ? self.state.dataCompositor(d) : 0;
				}
			});
		}

		if(changedlist.length > 50) {
			self._simpleRedraw(null, {});
		} else {
			for(var i=0,l=changedlist.length;i<l;i++) {
				var dataIndex = changedlist[i];
				var cdata = self.state.data[dataIndex];
				var sel = cdata._state.selected;
				if(self.state.columnRowspanned && self.option.rowspanGroupSelect) {
					var rowspanindex = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
					var rfrom = rowspanindex.from;
					var rto = rowspanindex.to;
					for(var j=rfrom;j<rto;j++) {
						self._rowSelect($rows.filter('[data-alopexgrid-dataindex="'+j+'"]'),sel);
					}
				} else {
					self._rowSelect($rows.filter('[data-alopexgrid-dataindex="'+dataIndex+'"]'),sel);
				}
			}
		}
		if(self.option.on && self.option.on.data && self.option.on.data.selected) {
			dataChangeCallback(self, "selected", [$.map(changedlist, function(di){return $.extend(true,{},self.state.data[di]);}), selected]);
		}
	};
	function isCellEmptied(cell) {
		cell = cell.jquery ? cell[0] : cell;
		return String(cell.className).indexOf("emptied") >= 0;
	}
	//조건과 상관없이 현재 화면에 그려진/수정된 데이터를 가져온다.(편집용)
	//빈값이 들어온 컬럼에 대해 값을 추출하는 용도로 사용한다. 초기 편집시 발동을 의도.
	//.children사용시 .row 또는 .cell을 사용했다가 지워버림.
	AlopexGrid.prototype._refreshEditableCellAll = function(){
		var self = this;
		if(self.option.parseNullValueCell) {
			$.each(self.state.data, function(idx,d) {
				if(d._state.editing && !d._state._editableStarted) {
					self._refreshEditableCell(d._index.data, null, true);
				}
			});
		}
	};
	AlopexGrid.prototype._refreshEditableCell = function(dataIdIndex,$row,generateRow){
		if(!this.option.parseNullValueCell) {
			return;
		}
		var self = this;
		var data = null;
		if(typeof dataIdIndex === "string") {
			for(var i in self.state.data) {
				if(self.state.data[i]._index && self.state.data[i]._index.id === dataIdIndex) {
					data = self.state.data[i];
					break;
				}
			}
		} else if(typeof dataIdIndex === "number") {
			data = self.state.data[dataIdIndex];
		}
		if(!data || data._state._editableStarted || !data._state.editing) return null;
		var $clonerow = null;
		var $cells = $();
		var rendered = false;
		if(!$row) {
			if($.inArray(data._index.data, self.state.rendered)>=0) {
				//$row = self.$tablebody.children('[data-alopexgrid-dataid="'+data._index.id+'"]');
				$row = self.$tablebody.children('.'+data._index.id);
				rendered = true;
			}
			if(generateRow && (!$row || !$row.length)) {
				$row = $(self._rowRender(data, null, null, {}));
			}
		} else {
			rendered = true;
		}
		if(!$row) return null;
		$cells = $cells.add($row.children());
		if(rendered && self.state.hasFixColumn) {
			//$clonerow = self.state.$fixcolbody.children('[data-alopexgrid-dataid="'+data._index.id+'"]');
			$clonerow = self.state.$fixcolbody.children('.'+data._index.id);
			$cells = $cells.not('.cell-fixcol').add($clonerow.children());
		}
		if(!$cells.length) {
			return null;
		} else {
			$cells.each(function(idx,cell){
				var key = cell.getAttribute('data-alopexgrid-key');
				if(key) {
					var mapping = _getMappingByQuery(self.option.columnMapping, {key:key}, self, data);
					if(mapping) {
						self._cellEditUpdate(cell, data._index.id, mapping);
					}
				}
			});
		}
		data._state._editableStarted = true;
	};
	AlopexGrid.prototype._getRecentData = function(dataIdIndex) {
		var self = this;
		var data = null;
		if(typeof dataIdIndex === "string") {
			for(var i in self.state.data) {
				if(self.state.data[i]._index && self.state.data[i]._index.id === dataIdIndex) {
					data = self.state.data[i];
					break;
				}
			}
		} else if(typeof dataIdIndex === "number") {
			data = self.state.data[dataIdIndex];
		}
		if(!data) return null;
		var recentdata = $.extend(true, {_index:data._index,_state:data._state},
			AlopexGrid.trimData(data), AlopexGrid.trimData(data._state.recent));
		return recentdata;
	};

	//row에 대한 편집모드 시작 및 종료. query는 이 API를 호출하는 이벤트 핸들러 등에서 조합하여 넘긴다.
	//편집기능의 범위는 현재 페이지다.
	AlopexGrid.prototype.startEdit = function(query, cancel, cancelKeepEditing) {
		var self = this;
		if (this._noData()) {
			return;
		}
		//* 재구현코드
		var datalist = self.dataGet(query);
		if(!datalist || !datalist.length) {
			return;
		}
		var startedIndex = [];
		for(var i=0,l=datalist.length;i<l;i++) {
			var data = datalist[i];
			if(!data) continue;
			if(data._state.deleted) continue;
			if((data._state.editing && cancel!==true) || (!data._state.editing && cancel === true)) continue;
			if($.isFunction(self.option.rowOption.allowEdit) && self.option.rowOption.allowEdit(data)===false) {
				continue;
			}
			var dataIndex = data._index.data;
			var toeditIndex = [];
			if(self.state.columnRowspanned && self.option.rowspanGroupEdit) {
				var rowspanindex = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
				if(!rowspanindex) {
					toeditIndex.push(Number(dataIndex));
				} else {
					var from = rowspanindex.from;
					var to = rowspanindex.to;
					for(var j=from;j<to;j++) {
						toeditIndex.push(Number(j));
					}
				}
			} else {
				toeditIndex.push(Number(dataIndex));
			}
			for(var j=0,k=toeditIndex.length;j<k;j++) {
				startedIndex.push(Number(toeditIndex[j]));
				if(cancel===true) {
					if(self.option.mergeEditingImmediately) {
						$.extend(self.state.data[dataIndex], self.state.data[dataIndex]._state._beforeEditing);
					}
					_deleteRecent(self.state.data[dataIndex]);
				}
				self._dataSetState({_index:{data:toeditIndex[j]}}, {editing:cancelKeepEditing===true?true:(cancel===true?false:true)}, true);
			}
		}
		var rowrendered = 0;
		for(var i=0,l=startedIndex.length;i<l;i++) {
			if($.inArray(startedIndex[i], self.state.rendered) >= 0) {
				rowrendered++;
			}
		}
		if(rowrendered) {
			if(rowrendered > 30) {
				self._simpleRedraw(null, null);
			} else {
				self.$tablebody.children().each(function(idx,row) {
					var dataIndex = row.getAttribute('data-alopexgrid-dataindex');
					if(_valid(dataIndex) && $.inArray(Number(dataIndex),startedIndex) >= 0) {
						self._redrawRow($(row), self.state.data[dataIndex]);
					}
				});
			}
		}
		if(startedIndex.length){
			self._refreshEditableCellAll();
		}
		self._needEditedRefresh();
		return;
	};
	//short hand for dataInvalid and dataScroll
	AlopexGrid.prototype.dataInvalidFocus = function(query) {
		var self = this;
		var inval = self.dataInvalid();
		if(!inval) return null;
		var column = inval._invalid && inval._invalid[0] ? inval._invalid[0].column : null;
		self.dataScroll(inval, function(){
			var $cell = self._elementGet(inval, column);
			var $inputs = $cell.find('input,select,textarea');
			$inputs.trigger('change');
			setTimeout(function(){
				$inputs.add($cell).eq(0).focus();
			},1);
		});
		return inval;
	};
	AlopexGrid.prototype.dataInvalid = function(query) {
		var self = this;
		return self.endEdit(query, undefined, true);
	};
	AlopexGrid.prototype._endEditAllIfEditingExist = function() {
		var self = this;
		$.each(self.state.data, function(idx, data) {
			if (data._state.editing) {
				self.endEdit();
				return false;
			}
		});
	};
	AlopexGrid.prototype.endEdit = function(query, keepEditing, validateonly) {
		var self = this;
		if(self.$tablebody.is(':hidden')) {
			return;
		}
		if (self._noData()) {
			return;
		}
		if(query === true) {
			query = undefined;
			keepEditing = true;
		}
		if($.isArray(query) && !query.length) {
			return;
		}
		var invalidMessages = [];
		var endedIndex = [];
		//* endEdit 로직 최적화 및 $rows 사용 최소화
		var datalist = self.dataGet(query, true);//getrecent:true
		if(datalist.length) {
			var invalidInfo = [];
			var doValidCheck = !!self.option.valueFilter;
			for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
				if(self.option.columnMapping[i].valid || self.option.columnMapping[i].validate) {
					doValidCheck = true;
					break;
				}
			}
			var toendIndex = [];
			for(var i=0,l=datalist.length;i<l;i++) {
				var data = datalist[i];
				if(!data) continue;
				if(data._state.deleted) continue;
				if(!data._state.editing) continue;
				var dataIndex = data._index.data;
				if(self.state.columnRowspanned && self.option.rowspanGroupEdit) {
					var rowspanindex = _rowspanWidestIndex(self.state.rowspanindex, dataIndex);
					if(!rowspanindex) {
						toendIndex.push(Number(dataIndex));
					} else {
						var from = rowspanindex.from;
						var to = rowspanindex.to;
						for(var j=from;j<to;j++) {
							toendIndex.push(Number(j));
						}
					}
				} else {
					toendIndex.push(Number(dataIndex));
				}
			}
			var $rows = self.$tablebody.children('.bodyrow');
			var $clonedrows = self.state.hasFixColumn ? self.state.$fixcolbody.children('.bodyrow') : $();
			var rowfrom = Number($rows.eq(0).attr('data-alopexgrid-dataindex'));
			var rowto = Number($rows.eq(-1).attr('data-alopexgrid-dataindex'));
			for(var i=0,l=toendIndex.length;i<l;i++) {
				var dataIndex = toendIndex[i];
				var data = self.state.data[dataIndex];
				if(!data || !data._state.editing) {
					continue;
				}
				var $row = dataIndex>=rowfrom && dataIndex<=rowto ? $rows.eq(dataIndex-rowfrom) : $();
				var $clonedrow = dataIndex>=rowfrom && dataIndex<=rowto ? $clonedrows.eq(dataIndex-rowfrom) : $();
				if(doValidCheck) {
					var invalid = false;
					var $cells = $row.children();
					var $clonedcells = $clonedrow.children();
					for(var j in self.option.columnMapping) {
						var cellInvalid = false;
						var mapping = self.option.columnMapping[j];
						if(!_valid(mapping.columnIndex)) {
							continue;
						}
						if(!mapping.editable) {
							continue;
						}
						var $cell = $cells.filter('[data-alopexgrid-columnindex="'+mapping.columnIndex+'"]');
						if($cell.hasClass('cell-fixcol')) {
							$cell = $clonedcells.filter('[data-alopexgrid-columnindex="'+mapping.columnIndex+'"]');
							//$cell = self._findClonePair($cell);
						}
						var errMessage = [];
						var value = (data._state.recent?data._state.recent[mapping.key]:null)
							||data[mapping.key];
						if (mapping && !_isColumnValid.call(self, mapping, $cell, value, data)) {
							//valid:['allowed','value','array']
							//valid:function(cell,value,data){return (boolean)valid; }
							invalid = true;
							cellInvalid = true;
							if (typeof mapping.invalid == "function") {
								errMessage.push(mapping.invalid($cell, value, data));
							} else if (typeof mapping.invalid === "string") {
								errMessage.push(mapping.invalid);
							} else {
								errMessage.push(null);
							}
						}
						if($.isFunction(self.option.valueFilter)) {
							var filtered = self.option.valueFilter(value, data);
							if(filtered === false) {
								invalid = true;
								cellInvalid = true;
								errMessage.push( ($.isFunction(self.option.message.valueFilter)
									? self.option.message.valueFilter(value, data) : self.option.message.valueFilter
									) || null);
							} else if(typeof filtered == "string" || typeof filtered == "number") {
								if(data._state.recent && data._state.recent.hasOwnProperty(mapping.key)) {
									data._state.recent[mapping.key] = filtered;
								}
							}
						}
						if(mapping.validate && processMappingValidate(mapping)
							&& (mapping.validate.allowInvalid !== true)) {
							var $vcell = $cell;
							if(!$vcell || !$vcell.length) {
								//generate unrendered cell
								$vcell = $(self._cellRender(_getCurrentData(self, data), mapping));
							}
							var $input = getValidatoredInput.call(self, $vcell, mapping);
							if ($input) {
								var errorMessage = $input.getErrorMessage() || [];
								var valid = !($.isArray(errorMessage) && errorMessage.length);
								if (!valid) {
									invalid = true;
									cellInvalid = true;
									errMessage = errMessage.concat(errorMessage);
									processValidateChange.call(self, mapping, valid, errorMessage, $vcell, $input.val());
								}
							}
						}
						$cell[cellInvalid ? "addClass" : "removeClass"]("invalid");
						if(cellInvalid) {
							invalidMessages = invalidMessages.concat(errMessage);
							invalidInfo.push({
								"column":mapping.columnIndex,
								"mapping":mapping,
								"errorMessage":errMessage
							});
						}
					}
					if(invalid && validateonly === true) {
						var returnData = $.extend(true,{},data, (data._state.editing && self.option.getEditingDataOnEvent) ? data._state.recent : null);
						returnData["_invalid"] = invalidInfo;
						return returnData;
					}
					if(invalidMessages.length) {
						if (self.option.on && self.option.on.invalidEdit) {
							var cb = self.option.on.invalidEdit;
							if ($.isFunction(cb)) {
								cb = [cb];
							}
							$.each(cb, function(idx, callback) {
								callback(data, $row, invalidMessages);
							});
						}
						break;
					}
				}
				if(validateonly === true) {
					//validate only -> no process on editing=false
					continue;
				}
				var editingState = (keepEditing === true) ? true : false;
				data._state.editing = editingState;
				self.dataEdit(data._state.recent, {_index:{data:dataIndex}},{norender:true});
				_deleteRecent(data);
				self._dataSetState(data, {editing:editingState},true);
				endedIndex.push(dataIndex);
				if (self.option.on && self.option.on.endEdit) {
					var cb = self.option.on.endEdit;
					if ($.isFunction(cb)) {
						cb = [cb];
					}
					$.each(cb, function(idx, callback) {
						var cdata = callback(data, $row);
						if (typeof cdata == "object") {
							$.extend(data, cdata);
						}
					});
				}
			}
			if(self.state.columnRowspanned || self.state.sorted) {
				//end result may cause rows order to be shuffled.
				self._simpleRedraw(null, null);
			} else if(endedIndex.length){
				if(!query && endedIndex.length > self.state.rendered.length/2) {
					self._simpleRedraw(null,null);
				} else {
					$.each(endedIndex, function(idx,dataIndex){
						if(dataIndex>=rowfrom && dataIndex<=rowto) {
							self._redrawRow($rows.eq(dataIndex-rowfrom), self.state.data[dataIndex]);
						}
					});
				}
			}
		}
		if(validateonly === true) return null;
		if(invalidMessages.length) {
			if(endedIndex.length) self._needEditedRefresh();
			return false;
		}
		self._closeTooltip();
		self._needEditedRefresh();
		return;
	};
	AlopexGrid.prototype.cancelEdit = function(query, keepEditing) {
		//수정된 데이터를 state.data에 반영하지 않고 종료.
		var self = this;
		if (self._noData()) {
			return;
		}
		if(query === true) {
			query = undefined;
			keepEditing = true;
		}
		self.startEdit(query, true, keepEditing);
		self._closeTooltip();
		return ;
	};

	AlopexGrid.prototype._cellIdFromData = function(data, columnIndex) {
		return [this.key, data._index.rendered, columnIndex].join('-');
	};
	AlopexGrid.prototype._cellIdFromRendered = function(renderedIndex, columnIndex) {
		return [this.key, renderedIndex, columnIndex].join('-');
	};
	AlopexGrid.prototype._isEditingCell = function(renderedIndex, columnIndex) {
		if(this.state.editingCellInfo) {
			if(this.state.editingCellInfo["renderedIndex"] === renderedIndex
				&& this.state.editingCellInfo["columnIndex"] === columnIndex) {
				return true;
			}
		}
		return false;
	};
	AlopexGrid.prototype._focusEditCell = function(renderedIndex, columnIndex) {
		var self = this;
		var $cell = $('#'+self._cellIdFromRendered(renderedIndex, columnIndex));
		var $inputs = $cell.find('input,select,textarea');
		if($inputs.length) {
			if(!$inputs.filter(document.activeElement).length){
				($inputs[0] !== document.activeElement) ? $inputs.focus() : "";
			}
		} else if($cell.attr("tabindex")>=0){
			($cell[0] !== document.activeElement) ? $cell.focus() : "";
		} else {
			var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
			var mapping = _getMappingFromColumnIndex(self, columnIndex);
			var groupItem = self._getGroupingRangeByMapping(data._index.data, mapping);
			if(groupItem) {
				var groupStartDataIndex = groupItem["from"];
				var renderedIndex = data._index.rendered;
				var renderedFrom = self.state.vscrollRenderedStart || 0;
				var targetRenderedIndex = Math.max(renderedIndex, renderedFrom);
				$cell = $('#'+self._cellIdFromRendered(targetRenderedIndex, columnIndex));
				$inputs = $cell.find('input,select,textarea');
				if($inputs.length) {
					if(!$inputs.filter(document.activeElement).length){
						$inputs.focus();
					}
				} else if($cell.attr("tabindex")>=0){
					$cell.focus();
				}
			}
		}
		return $cell;
	};
	AlopexGrid.prototype._startCellEdit = function(renderedIndex, columnIndex){
		var self = this;
		var rowRenderedFrom = self.state.vscrollRenderedStart || 0;
		var rowRenderedTo = self.state.vscrollRenderedEnd || Math.max(0, self.state.rendered.length);
		var isRowRendered = rowRenderedFrom <= renderedIndex && renderedIndex <= rowRenderedTo;
		var editStarted = false;
		var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		if(!data || isColumnHidden(mapping)) {
			return false;
		}

		var prevInfo = self.state.editingCellInfo;
		if(!self._isEditingCell(renderedIndex, columnIndex)) {
			self._endCellEdit();
		}

		var value = data[mapping.key];
		if(!_valid(value)) value = "";
		self.state.editingCellInfo = {
			"renderedIndex" : parseInt(renderedIndex), 
			"columnIndex" : parseInt(columnIndex),
			"columnMapping" : mapping,
			"value" : value
		};

		var $cell = $('#'+self._cellIdFromData(data, columnIndex));
		if($cell.length) {
			var $replacementCell = $(_convertAlopex.call(self, self._cellRender(data, mapping)));
			$cell.replaceWith($replacementCell);	
			return $replacementCell;
		}
		return null;
	};
	AlopexGrid.prototype._endCellEdit = function(cancel){
		var self = this;

		if(self.state.editingCellInfo) {
			var info = self.state.editingCellInfo;
			var data = self._getRenderedDataFromRenderedIndex(info["renderedIndex"]);
			var mapping = _getMappingFromColumnIndex(self, info["columnIndex"]);
			var prevData = null;
			var newData = null;
			if(cancel !== true) {
				var valueChanged = (data[mapping.key] !== info["value"]);
				var hasFunctionRefreshBy = false;
				var hasRefreshBy = false;
				for(var i=0;i<self.option.columnMapping.length;i++) {
					var targetmapping = self.option.columnMapping[i];
					if(!isColumnHidden(targetmapping)){
						continue;
					} 
					if($.isFunction(targetmapping.refreshBy)) {
						hasFunctionRefreshBy = true;
					}
					if(targetmapping.refreshBy) {
						hasRefreshBy = true;
					}
				}
				var prevValue = data[mapping.key];
				if(!data._original) {
					data._original = AlopexGrid.trimObject(data);
				}
				data[mapping.key] = info["value"];//merge
				var newValue = data[mapping.key];

				if(valueChanged) {
					if(self.option.fullCompareForEditedState) {
						data._state.edited = false;
						if(data._original) {
							$.each(data._original, function(k,v){
								if(v !== data[k]) {
									data._state.edited = true;
									return false;
								}
							});
						}
					} else {
						data._state.edited = true;	
					}
					var $row = self.rowElementGet({_index:{id:data._index.id}});
					$.each(["selected", "editing", "edited","deleted","added","focused"], function(idx, stateName) {
						$row[data._state[stateName] ? "addClass" : "removeClass"](stateName);
					});
				}

				if(hasRefreshBy && valueChanged) {
					if(hasFunctionRefreshBy) {
						prevData = $.extend({}, data, AlopexGrid.trimObject(data));
						newData = $.extend({}, data, AlopexGrid.trimObject(data));
						prevData[mapping.key] = prevValue;
					}
					for(var i=0;i<self.option.columnMapping.length;i++) {
						var targetmapping = self.option.columnMapping[i];
						if(targetmapping.hasOwnProperty('refreshBy')) {
							var doit = false;
							var cond = targetmapping.refreshBy;
							if(cond === true) {
								doit = true;
							}
							else if(typeof cond === "string" && cond === mapping.key) {
								doit = true;
							}
							else if($.isArray(cond)
								&& ($.inArray(mapping.key, cond)>=0
									|| $.inArray(Number(mapping.columnIndex), cond)>=0)
								) {
								doit = true;
							}
							else if($.isFunction(cond)) {
								var op = {};
								op["prevData"] = prevData;
								op["newData"] = newData;
								op["_key"] = targetmapping.key;
								op["_column"] = targetmapping.columnIndex;
								op["_index"] = $.extend({}, data._index);
								op["mapping"] = targetmapping;
								op["done"] = function() {
									var $cell = self.refreshCell({_index:{data:this._index.data}}, this._column);
									$.isFunction(this["_done"]) ? this["_done"]() : null;
									$cell ? $cell.find('input,select,textarea').trigger('change') : null;
									this.complete = true;
								};

								var res = cond.call(op, prevData, newData, targetmapping,
									(function(worker){
										return function(){worker.done();};
									})(op));
								if(res === true) {
									doit = true;
								} else if(res === "async") {
									(function(worker){
										if(!worker.complete) {
											self._showProgress(function(done){
												worker["_done"] = done;
											},0,true);
										}
									})(op);
								}
							}
							if(doit) {
								self.refreshCell({_index:{data:dataIndex}}, targetmapping.columnIndex);
								//refreshed.push(targetmapping.columnIndex);
								//$cell ? $cell.find('input,select,textarea').trigger('change') : null;
							}
						}
					}//for
				}//if(hasRefreshBy)

				if(self.state.groupRowspanned && self.option.rowspanGroupEdit) {
					// var lookupTable = self.state.groupingLookupTable;
					// var key = mapping.key;
					// var lookupTableItem = lookupTable[key] || {};
					// var lookupItem = lookupTableItem[dataIndex];
					//TODO 현재 셀이 rowspan을 하고 있는 범위의 key를 추출해야 한다.
					var lookupItem = self._getGroupingRangeByMapping(data._index.data, mapping);
					if(lookupItem) {
						for(var i=lookupItem.from; i<=lookupItem.to;i++) {
							var groupChanged = (self.state.data[i][mapping.key]!==newValue);
							self.state.data[i][mapping.key] = newValue;
							if(groupChanged) {
								if(self.option.fullCompareForEditedState) {
									self.state.data[i]._state.edited = false;
									if(self.state.data[i]._original) {
										$.each(self.state.data[i]._original, function(k,v){
											if(v !== self.state.data[i][k]) {
												self.state.data[i]._state.edited = true;
												return false;
											}
										});
									}
								} else {
									self.state.data[i]._state.edited = true;	
								}
								if(self.state.data[i]._index.id !== data._index.id){
									self.refreshRow({_index:{id:self.state.data[i]._index.id}});
								}
							}
						}
					}
				}
			}
			delete self.state.editingCellInfo;
			var $cell = $('#'+self._cellIdFromData(data, mapping.columnIndex));
			if($cell.length) {
				var $replacementCell = $(_convertAlopex.call(self, self._cellRender(data, mapping)));
				$cell.replaceWith($replacementCell);
			}
			return true;
		} else {
			return null;
		}
	};
	AlopexGrid.prototype._cancelCellEdit = function(){
		return this._endCellEdit(true);
	};

	//focus cell 외의 셀들이 셀렉션에 포함되어 있는가 여부
	function isCellSelectionAvailable(self) {
		return (!!self.state.cellSelection) && 
			(
				(self.state.cellSelection.rightBoundaryColumnIndex - self.state.cellSelection.leftBoundaryColumnIndex)
				||
				(self.state.cellSelection.bottomBoundaryRenderedIndex - self.state.cellSelection.topBoundaryRenderedIndex)
			);
	}
	function clearCellSelection(self) {
		delete self.state.cellSelection;
	}
	function correctRenderedIndex(self, renderedIndex) {
		return Math.min(Math.max(self.state.rendered.length-1,0),renderedIndex);
	}
	function correctColumnIndex(self, columnIndex) {
		return Math.min(Math.max(0,columnIndex),self.state.maxColumnIndex);
	}
	function startCellSelection(self, renderedIndex, columnIndex) {
		delete self.state.cellSelection;
		self.state.cellSelection = {};

		self.state.cellSelection.renderedIndexMap = {};
		self.state.cellSelection.columnIndexMap = {};

		self.state.cellSelection.focusRenderedIndex = correctRenderedIndex(self, renderedIndex);
		self.state.cellSelection.focusColumnIndex = correctColumnIndex(self, columnIndex);

		self.state.cellSelection.focusRowspanInfo = 
			getRowspanInfoForCell(self, correctRenderedIndex(self, renderedIndex), correctColumnIndex(self, columnIndex));

		self.state.cellSelection.renderedIndexMap[renderedIndex] = true;
		self.state.cellSelection.columnIndexMap[columnIndex] = true;

		self.state.cellSelection.rightBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.leftBoundaryColumnIndex  = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.bottomBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;
		self.state.cellSelection.topBoundaryRenderedIndex    = self.state.cellSelection.focusRenderedIndex;
	}
	var __cellSelectedClassNames = 
		[
		 'cell-selected',
		 'cell-selected-topline',
		 'cell-selected-bottomline',
		 'cell-selected-leftline',
		 'cell-selected-rightline',
		 'cell-selected-focus'
		].join(' ');
	function removeCellSelectionClasses(self) {
		self.$wrapper.find('.cell-selected')
			.removeClass(__cellSelectedClassNames);
	}
	function calculateCurrentCellSelectionMinMax(self) {
		self.state.cellSelection.rightBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.leftBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.topBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;
		self.state.cellSelection.bottomBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;

		$.each(self.state.cellSelection.columnIndexMap, function(columnIndex, en1){
			$.each(self.state.cellSelection.renderedIndexMap, function(renderedIndex, en2){
				var ci = parseInt(columnIndex);
				var ri = parseInt(renderedIndex);
				self.state.cellSelection.rightBoundaryColumnIndex = Math.max(self.state.cellSelection.rightBoundaryColumnIndex, ci);
				self.state.cellSelection.leftBoundaryColumnIndex = Math.min(self.state.cellSelection.leftBoundaryColumnIndex, ci);
				self.state.cellSelection.bottomBoundaryRenderedIndex = Math.max(self.state.cellSelection.bottomBoundaryRenderedIndex, ri);
				self.state.cellSelection.topBoundaryRenderedIndex = Math.min(self.state.cellSelection.topBoundaryRenderedIndex, ri);
			});
		});
	}
	function isPositionInCellSelection(self, renderedIndex, columnIndex) {
		return self.state.cellSelection.columnIndexMap[columnIndex] && self.state.cellSelection.renderedIndexMap[renderedIndex];
	}
	function addCellSelectionClasses(self) {
		$.each(self.state.cellSelection.columnIndexMap, function(columnIndex, en1){
			$.each(self.state.cellSelection.renderedIndexMap, function(renderedIndex, en2){
				var ci = parseInt(columnIndex);
				var ri = parseInt(renderedIndex);
				var $c = $('#'+self._cellIdFromRendered(ri,ci));
				$c.addClass('cell-selected');
				if(ci===self.state.cellSelection.focusColumnIndex
					&& ri===self.state.cellSelection.focusRenderedIndex) {
					$c.addClass('cell-selected-focus');
				}
				else if(self.state.cellSelection.focusRowspanInfo 
					&& self.state.cellSelection.focusRowspanInfo.renderedIndexMap[ri]
					&& self.state.cellSelection.focusColumnIndex === ci ) {
					$c.addClass('cell-selected-focus');
				}


				if(ci===self.state.cellSelection.leftBoundaryColumnIndex) {
					$c.addClass('cell-selected-leftline');
				}
				if(ci===self.state.cellSelection.rightBoundaryColumnIndex) {
					$c.addClass('cell-selected-rightline');
				}
				if(ri===self.state.cellSelection.topBoundaryRenderedIndex) {
					$c.addClass('cell-selected-topline');
				}
				if(ri===self.state.cellSelection.bottomBoundaryRenderedIndex) {
					$c.addClass('cell-selected-bottomline');
				}
			});
		});
	}
	function getRowspanInfoForCell(self, renderedIndex, columnIndex) {
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		if(!mapping) return null;
		var rowspanTable = self.state.groupingRowspanTable;
		var rowspanKey = null;//그룹을 따라갈 수 있게 한다. 이때에도 값을 분배하는가?
		if(mapping.rowspan === true) { //rowspan 세부설정은 컬럼단위로 지정하도록 한다.
			rowspanKey = mapping.key;
		} else if(mapping.rowspan && typeof mapping.rowspan.by === "string") {
			rowspanKey = mapping.rowspan.by;
		}
		var rowspanTableList = rowspanTable[rowspanKey];
		var rowspan = null;
		var rowspanned = false;
		//TODO 해당 컬럼매핑이 연결되어 있는 rowspan정보를 연결받는다. key기준은 자의적인 기준임.
		if(rowspanTableList) {
			var rowspanItem = rowspanTableList[renderedIndex];
			return rowspanItem;
		}
		return null;
	}
	function getRowspanValueForCell(self, renderedIndex, columnIndex) {
		var info = getRowspanInfoForCell(self, renderedIndex, columnIndex);
		if(info) {
			return Math.max(info["to"]-info["from"]+1,0);
		}
		return 1;
	}
	function determineFinalCellSelectionRange(self) {
		var rfrom = self.state.cellSelection.topBoundaryRenderedIndex;
		var rto = self.state.cellSelection.bottomBoundaryRenderedIndex;
		var cfrom = self.state.cellSelection.leftBoundaryColumnIndex;
		var cto = self.state.cellSelection.rightBoundaryColumnIndex;
		for(var r=rfrom;r<=rto;r++) {
			for(var c=cfrom;c<=cto;c++) {
				expandCellSelectionByPosition(self, r, c);
			}
		}
	}
	function expandCellSelectionByPosition(self, renderedIndex, columnIndex) {
		var dataIndex = self.state.rendered[renderedIndex];
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		var colspan = mapping.colspan ? 0 : parseInt(
				$('#'+self._cellIdFromRendered(renderedIndex, columnIndex))
					.attr('colspan')
			);
		self.state.cellSelection.renderedIndexMap[renderedIndex] = true;
		self.state.cellSelection.columnIndexMap[columnIndex] = true;

		var groupRange = mapping.rowspan ? self._getGroupingRangeByMapping(dataIndex, mapping) : false;
		if(groupRange) {
			var fromRendered = self.state.data[groupRange["from"]]._index.rendered;
			var toRendered = self.state.data[groupRange["to"]]._index.rendered;
			var from = Math.min(toRendered,fromRendered);
			var to = Math.max(toRendered,fromRendered);
			for(var r=from;r<=to;r++) {
				self.state.cellSelection.renderedIndexMap[r] = true;
			}
		}
		if(colspan>1) {
			var from = Math.min(columnIndex, (columnIndex+colspan-1));
			var to = Math.max(columnIndex, (columnIndex+colspan-1));
			for(var c=from;c<=to;c++) {
				self.state.cellSelection.columnIndexMap[c] = true;
			}
		}
	}
	//실제 렌더링된 셀을 찾아서 포커스를 주고자 할 떄 사용. focusColumnIndex는 이동하고 있는데
	//그 중간에 rowspan cell이 있다면 그에 대응해야 한다. 
	function locateCellForPosition(self, renderedIndex, columnIndex) {
		var $cell = $('#'+self._cellIdFromRendered(renderedIndex, columnIndex));
		if($cell.length) return $cell;
		if(self.state.groupRowspanned) {
			var mapping = _getMappingFromColumnIndex(self, columnIndex);
			if(mapping.rowspan) {

			}
		}
	}
	//현재 focusColumnIndex, focusRenderedIndex 정보에 의해 자신이 focus 대상 셀인지 테스트
	//_cellRender에서 렌더링하는 셀이 cell-selected-focus 클래스를 가져야 하는지를 테스트한다.
	function doesCellHasFocus(self, renderedIndex, columnIndex) {

	}
	function restoreCurrentFocusForCellSelection(self) {
		focusCorespondingCell(self, self.state.cellSelection.focusRenderedIndex,self.state.cellSelection.focusColumnIndex);
	}
	function focusCorespondingCell(self, renderedIndex, columnIndex) {
		self._focusEditCell(renderedIndex, columnIndex);
	}
	function setFocusFixture(self, renderedIndex, columnIndex) {
		self.$focusfixture.prop({"renderedIndex":renderedIndex,"columnIndex":columnIndex}).focus();
	}
	function moveCellFocusByIndex(self, renderedIndex, columnIndex) {
		if(!self.state.cellSelection) return;
		renderedIndex = correctRenderedIndex(self, renderedIndex);
		columnIndex = correctColumnIndex(self, columnIndex);
		self.state.cellSelection.focusRenderedIndex = renderedIndex;
		self.state.cellSelection.focusColumnIndex = columnIndex;
		expandCellSelectionByPosition(self, renderedIndex, columnIndex);
		calculateCurrentCellSelectionMinMax(self);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);

		setTimeout(function(){setFocusFixture(self, renderedIndex, columnIndex);},0);
	}
	function setInitialFocusOnCellByIndex(self, renderedIndex, columnIndex) {
		renderedIndex = correctRenderedIndex(self, renderedIndex);
		columnIndex = correctColumnIndex(self, columnIndex);
		startCellSelection(self, renderedIndex, columnIndex);
		expandCellSelectionByPosition(self, renderedIndex, columnIndex);
		calculateCurrentCellSelectionMinMax(self);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);

		setTimeout(function(){setFocusFixture(self, renderedIndex, columnIndex);},0);
	}
	function changeCellFocusByIncrement(self, renderedInc, columnInc) {
		if(!self.state.cellSelection) return;
		var renderedIndex = self.state.cellSelection.focusRenderedIndex;
		var columnIndex = self.state.cellSelection.focusColumnIndex;
		var toRendered = renderedIndex+renderedInc;
		var toColumn = columnIndex+columnInc;
		
		if(isCellSelectionAvailable(self)) {
			//selection 안에서 움직여야 한다.
			if(renderedInc) {
				if(toRendered > self.state.cellSelection.bottomBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.topBoundaryRenderedIndex;
					toColumn++;
				}else if(toRendered < self.state.cellSelection.topBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.bottomBoundaryRenderedIndex;
					toColumn--;
				}

				if(toColumn > self.state.cellSelection.rightBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.leftBoundaryColumnIndex;
				} else if(toColumn < self.state.cellSelection.leftBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.rightBoundaryColumnIndex;
				}	
			} else if(columnInc) {
				if(toColumn > self.state.cellSelection.rightBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.leftBoundaryColumnIndex;
					toRendered++;
				} else if(toColumn < self.state.cellSelection.leftBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.rightBoundaryColumnIndex;
					toRendered--;
				}

				if(toRendered > self.state.cellSelection.bottomBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.topBoundaryRenderedIndex;
				}else if(toRendered < self.state.cellSelection.topBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.bottomBoundaryRenderedIndex;
				}
			}

			moveCellFocusByIndex(self, toRendered, toColumn);
		} else {
			setInitialFocusOnCellByIndex(self, toRendered, toColumn);	
		}
	}
	function extendCellSelectionByDirection(self, left, right, up, down) {
		//현재 셀렉션에서 포커스지점과 전체 범위를 고려하여 선택범위를 늘이거나 줄인다.
		//각 방향은 키보드를 눌렀을때를 가정한다.
		if(left) {
			//focusColumnIndex 보다 rightboundary가 오른쪽에 있다면 오른쪽을 줄이고
			//아니면 왼쪽을 늘린다.
			if(self.state.cellSelection.focusColumnIndex < self.state.cellSelection.rightBoundaryColumnIndex) {
				delete self.state.cellSelection.columnIndexMap[self.state.cellSelection.rightBoundaryColumnIndex];
			} else {
				var extendColumnIndex = Math.max(self.state.cellSelection.leftBoundaryColumnIndex-1,0);
				self.state.cellSelection.columnIndexMap[extendColumnIndex] = true;
			}
		} else if(right) {
			if(self.state.cellSelection.focusColumnIndex > self.state.cellSelection.leftBoundaryColumnIndex) {
				delete self.state.cellSelection.columnIndexMap[self.state.cellSelection.leftBoundaryColumnIndex];
			} else {
				var extendColumnIndex = Math.min(self.state.cellSelection.rightBoundaryColumnIndex+1,self.state.maxColumnIndex);
				self.state.cellSelection.columnIndexMap[extendColumnIndex] = true;
			}
		} else if(up) {
			if(self.state.cellSelection.focusRenderedIndex < self.state.cellSelection.bottomBoundaryRenderedIndex) {
				delete self.state.cellSelection.renderedIndexMap[self.state.cellSelection.bottomBoundaryRenderedIndex];
			} else {
				var extendRenderedIndex = Math.max(self.state.cellSelection.topBoundaryRenderedIndex-1,0);
				self.state.cellSelection.renderedIndexMap[extendRenderedIndex] = true;
			}
		} else if(down) {
			if(self.state.cellSelection.focusRenderedIndex > self.state.cellSelection.topBoundaryRenderedIndex) {
				delete self.state.cellSelection.renderedIndexMap[self.state.cellSelection.topBoundaryRenderedIndex];
			} else {
				var extendRenderedIndex = Math.min(self.state.cellSelection.bottomBoundaryRenderedIndex+1,Math.max(self.state.rendered.length-1,0));
				self.state.cellSelection.renderedIndexMap[extendRenderedIndex] = true;
			}
		}

		//줄이거나 늘리는 작업이 완료되면 범위를 정리함. 
		calculateCurrentCellSelectionMinMax(self);
		determineFinalCellSelectionRange(self);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);
	}

	AlopexGrid.prototype._startCellSelectEngine = function(start) {
		var eventNamespace = '.alopexgridCellSelectEngine';
		var enterNamespace = '.alopexgridCellSelectEngineMouseenter';
		this.$wrapper.off(eventNamespace);
		this.$wrapper.off(enterNamespace);
		this.$focusfixture.off(eventNamespace);
		if(start) {
			//(pageup 33) (pagedown 34) (home 36) (end 35)
			//(left 37) (right 39) (up 38) (down 40) 
			//(tab 9) (enter 13) (esc 27) (F12 113)
			this.$root.addClass('text-selection-disabled');
			// this.$focusfixture.on('blur'+eventNamespace,{self:this},function(e){
			// 	if(isCellSelectionAvailable(e.data.self)) {
			// 		clearCellSelection(e.data.self);
			// 		removeCellSelectionClasses(e.data.self);
			// 	}
			// });
			this.$focusfixture.on('keydown'+eventNamespace, {self:this},function(e){
//TODO 헤더 클릭이라던가 외부 클릭, 헤더클릭 다이얼로그 등 외부 동작에 대해 focus를 훔치는 로직이 개입될 여지가 많음
				var self = e.data.self;
				var el = this;
				var shift = e.shiftKey;
				var alt = e.altKey;
				var meta = e.metaKey;
				var ctrl = e.ctrlKey;
				var keyCode = e.keyCode;
				var expectedChar = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode);
				var renderedIndex = this.renderedIndex;
				var columnIndex = this.columnIndex;
				var isEditing = self._isEditingCell(renderedIndex, columnIndex);

				// console.log('FIXTURE',
				// 	e.type,this.value,
				// 	e.keyCode,
				// 	e.shiftKey?'shift':'',
				// 	e.altKey?'alt':'',
				// 	String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode),
				// 	(this.renderedIndex+'/'+this.columnIndex)
				// );
//TODO scroll 대응, 키 입력시 영역확장축소로직 대응
				
				if(keyCode === 13) {//enter
					//setInitialFocusOnCellByIndex는 마우스다운에 의해 최초 포커스를 설정하는 과정을 내포하고 있으므로
					//키보드에 의한 이동에 대응하는 함수가 필요하다.
					if(isEditing) {
						self._endCellEdit();
					}
					changeCellFocusByIncrement(self, (shift ? -1 : 1),0);
				} else if(keyCode === 9) {//tab
					if(isEditing) {
						self._endCellEdit();
					}
					changeCellFocusByIncrement(self, 0, (shift ? -1 : 1));
					e.preventDefault();
				} else if(keyCode === 113) {//F12
					if(!isEditing) {
						self._startCellEdit(renderedIndex, columnIndex);
						locateCellForPosition(self, renderedIndex, columnIndex).find('input,select,textarea').focus();
					}
				} else if(keyCode === 39) {//right
					if(!isEditing) {
						if(shift) {
							//확장축소모드
							extendCellSelectionByDirection(self, false, true, false, false);
						} else {
							setInitialFocusOnCellByIndex(self, renderedIndex, columnIndex+1);
						}
					}
				} else if(keyCode === 37) {//left
					if(!isEditing) {
						if(shift){
							//확장축소모드
							extendCellSelectionByDirection(self, true, false, false, false);
						} else {
							setInitialFocusOnCellByIndex(self, renderedIndex, Math.max(columnIndex-1,0));
						}
					}
				} else if(keyCode === 38) {//up
					if(!isEditing) {
						//TODO rowspan 되어 있을 때엔 그만큼 점프해야 한다.
						var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
						if(rowspanInfo) {
							renderedIndex = rowspanInfo["from"];
						}
						if(shift) {
							//확장축소모드 
							extendCellSelectionByDirection(self, false, false, true, false);
						} else {
							setInitialFocusOnCellByIndex(self, Math.max(renderedIndex-1,0), columnIndex);
						}
					}
				} else if(keyCode === 40) {//down
					if(!isEditing) {
						//TODO rowspan 되어 있을 때엔 그만큼 점프해야 한다.
						var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
						if(rowspanInfo) {
							renderedIndex = rowspanInfo["to"];
						}
						if(shift) {
							//확장축소모드
							extendCellSelectionByDirection(self, false, false, false, true);
						} else {
							setInitialFocusOnCellByIndex(self, renderedIndex+1, columnIndex);
						}
					}
				} else if(ctrl && expectedChar.toUpperCase()==="C") {
					console.log('copy');
				} else if(ctrl && expectedChar.toUpperCase()==="V") {
					console.log('paste');
				}
				setTimeout(function(){
					//console.log('GOT VALUE',el.value,', clear!');
					var val = el.value;
					var fri = self.state.cellSelection.focusRenderedIndex;
					var fci = self.state.cellSelection.focusColumnIndex;
					if(val && !self._isEditingCell(fri, fci)) {
						self._startCellEdit(fri,fci);
						var $cell = locateCellForPosition(self, fri, fci);
						$cell.find('input,select,textarea').focus().val(val);
					}
					el.value = "";
				},5);
			});
			this.$root.on('mousedown'+eventNamespace, {self:this}, function(e){
				var self = e.data.self;
				//TODO 선택이 반드시 해제되어야 하는 조건(또는 해제되지 않을 땐 포커스를 $focusfixture로 어떻게 복원하는가)
				if(!$(e.target).closest('.scroller').length) {
					clearCellSelection(self);
					removeCellSelectionClasses(self);
				}
			});
			this.$wrapper.on('mousedown'+eventNamespace, '.bodycell', {self:this}, function(e){
				var self = e.data.self;
				var $cell = $(this);
				if($cell.hasClass('editingcell')) {
					return;
				}
				//이 값은 현재 렌더링 된 기준에서의 renderedIndex일 뿐
				//실제 셀의 rowspan이 시작된 값을 의미하지 않는다. 따라서 getRowspanInfoForCell로 한번 더 조사한다.
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
				if(rowspanInfo) {
					renderedIndex = rowspanInfo["from"];
				}
				self._endCellEdit();
				//self._focusEditCell(renderedIndex, columnIndex);
				
				setInitialFocusOnCellByIndex(self, renderedIndex, columnIndex);

				self.$wrapper.on('mouseenter'+enterNamespace, '.bodycell', {self:self}, function(e2){
					var self = e.data.self;
					var fromColumnIndex = self.state.cellSelection.focusColumnIndex;
					var fromRenderedIndex = self.state.cellSelection.focusRenderedIndex;
					var $cell = $(this);
					var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
					var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
					var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
					if(rowspanInfo) {
						renderedIndex = rowspanInfo["from"];
					}
					startCellSelection(self, fromRenderedIndex, fromColumnIndex);
					//determineFinalCellSelectionRange(self);
					var rfrom = Math.min(fromRenderedIndex,renderedIndex);
					var rto = Math.max(fromRenderedIndex,renderedIndex);
					var cfrom = Math.min(fromColumnIndex,columnIndex);
					var cto = Math.max(fromColumnIndex,columnIndex);
					for(var r=rfrom;r<=rto;r++) {
						for(var c=cfrom;c<=cto;c++) {
							expandCellSelectionByPosition(self, r, c);
						}
					}
					calculateCurrentCellSelectionMinMax(self);
					removeCellSelectionClasses(self);
					addCellSelectionClasses(self);
				});
			});
			this.$wrapper.on('mouseup'+eventNamespace, {self:this}, function(e){
				e.data.self.$wrapper.off(enterNamespace);
			});
			this.$wrapper.on('keydown'+eventNamespace, '.bodycell', {self:this}, function(e){
				//상,하,좌,우,pageup,pagedown,home,end - 포커스 상하좌우이동
				//shift상하좌우 - 셀렉션 확장
				//엔터,탭 - 셀렉션이 있을땐 셀렉션 안에서 이동, 셀렉션 없을땐 포커스 상하좌우이동
				//shift엔터,탭 - 위와 반대방향으로.
			});
		} else {
			this.$root.removeClass('text-selection-disabled');
		}
	};

	AlopexGrid.prototype._initTooltip = function(){
		var self = this;
		self.$tooltip = self.$root.find('[data-type="tooltip"]');
		//if(self.option.outerValidateTooltip) {
		//}
		self.$scroller.off('.alopexgridvalidatetooltip').on('scroll.alopexgridvalidatetooltip click.alopexgridvalidatetooltip', function(){
			self._closeTooltip(true);
		});
	};
	AlopexGrid.prototype._showTooltip = function(elem, message, position){
		var self = this;
		var dataPosition = "auto";
		var $elem = $(elem);
		var elemPosition = $elem.position();
		if(elemPosition.top + self.state.rowHeight*3 > self.$scroller.prop('clientHeight')+self.$scroller.prop('scrollTop')) {
			dataPosition = "top";
		}
		self.$tooltip.attr("data-base", "#" + elem.id)
			.attr("data-position", dataPosition)
			.html(message);
		if(!message.length || $.trim(String(message)) === "") {
			self._closeTooltip();
			return;
		}
		self.$tooltip.open();
		self.$tooltip.show();
		self.state.isTooltipOpen = true;
	};
	AlopexGrid.prototype._closeTooltip = function(closeonly) {
		var self = this;
		if(self.state.isTooltipOpen !== true) return;
		$.isFunction(self.$tooltip.close) ? self.$tooltip.close().hide() : "";
		self.state.isTooltipOpen = false;
		if(closeonly !== true) {
			clearTimeout(_tooltipTimer);
			_tooltipTimer = null;
		}
	};
	AlopexGrid.prototype._pageDrawnIndex = function() {
		var option = this.option;
		var data = this.state.data;
		var startIndex = 0;
		var endIndex = data && data.length ? data.length : -1;
		var result = {};
		if (option.pager && option.paging && option.paging.perPage) {
			//아래 3개의 변수는 page 관련 API에 의해 자동으로 정리되서 dataDraw로 넘겨짐.
			var total = option.paging.total;//1base
			var current = option.paging.current;//1base. default 1. user setting value(API)
			var perPage = Number(option.paging.perPage);//user setting value
			startIndex = perPage * (current - 1);
			endIndex = endIndex < 0 || total <= 0 ? -1 : startIndex + perPage;
			if (data && endIndex > data.length+this.state._paddingDataLength) {
				endIndex = data.length+this.state._paddingDataLength;
			}
			result.total = total;
			result.current = current;
			result.perPage = perPage;
		}
		result.start = startIndex;
		result.end = endIndex;
		result.rowPadding = 0;
		if (this.option.rowPadding) {
			var till = 0;
			if (typeof this.option.rowPadding == "number") {
				till = Number(this.option.rowPadding);
			} else {
				till = Number(result.perPage);
			}
			if (till > 0) {
				result.rowPadding = till - (endIndex - startIndex);
			}
			if (result.rowPadding < 0) {
				result.rowPadding = 0;
			}
		}
		if(this.state._paddingDataLength) {
			var m = this.state._paddingDataLength;
			result.start -= m;
			result.end -= m;
		}
		return result;
	};
	AlopexGrid.prototype.sortingInfo = function() {
		var self = this;
		var info = {"sortingKey":null};
		info["sortingColumn"] = _valid(self.state.sortingColumn) ? Number(self.state.sortingColumn) : null;
		for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
			var mapping = self.option.columnMapping[i];
			if(_valid(mapping.columnIndex) && Number(mapping.columnIndex) === Number(self.state.sortingColumn)) {
				info["sortingKey"] = mapping.key;
				break;
			}
		}
		info["sortingDirection"] = self.state.sortingDirection || null;
		info["sorted"] = _valid(self.state.sortingColumn);
		return info;
	};
	AlopexGrid.prototype.pageInfo = function() {
		var self = this;
		var option = self.option;
		var paging = option.paging = option.paging || {};
		var isFiltered = $.isArray(self.state.filteredDataIndexList);
		var data = isFiltered ? self.state.filteredDataIndexList : self.state.data;

		//가상페이징 - 현재 페이지 값은 서버통신하는 콜백에 넘겨져서 필요한 서버요청을 할 수 있도록 지원해야 한다.
		if (paging.customPaging) {
			$.extend(paging, paging.customPaging);
		}

		//pager의 left/right 영역 설정. 필요시 perPage값 임의 설정.
		if (option.pager && option.paging) {
			var $p = self.$pager;
			//var $left = self.$pagerleft;
			var $right = self.$pagerright;

			var righthtml = [];
			if ($.isFunction(paging.pagerSelect)) {
				righthtml.push(paging.pagerSelect(paging));
			} else if (typeof paging.pagerSelect === "string") {
				righthtml.push(paging.pagerSelect);
			} else if (paging.pagerSelect) {
				var perPageList = [];
				if ($.isArray(paging.pagerSelect)) {
					perPageList = perPageList.concat(paging.pagerSelect);
				} else {
					perPageList.push(10, 20, 30, 50, 100);
				}
				if (self.state.userSetPerPage) {
					perPageList = perPageList.concat(self.state.userSetPerPage);
				}
				for (var i = 0, l = perPageList.length; i < l; i++) {
					perPageList[i] = Number(perPageList[i]);
				}
				if (paging.perPage && $(perPageList).index(Number(paging.perPage)) === -1) {
					perPageList.push(Number(paging.perPage));
					self.state.userSetPerPage = self.state.userSetPerPage || [];
					self.state.userSetPerPage.push(Number(paging.perPage));
				}
				if (typeof paging.perPage !== "number" && isNaN(Number(paging.perPage))) {
					paging.perPage = Number(perPageList[0]);
				} else if (paging.hasOwnProperty('perPage') && !isNaN(Number(paging.perPage))) {
					paging.perPage = Number(paging.perPage);
				}
				perPageList.sort(function(a, b) {
					return a - b;
				});
				righthtml.push('<select class="perPage">');
				$.each(perPageList, function(idx, count) {
					righthtml.push('<option value="', count, '"');
					if (Number(count) === Number(paging.perPage)) {
						righthtml.push(' selected="selected"');
					}
					righthtml.push(">", String(count), '</option>');
				});
				righthtml.push('</select>');
			}
			$right.html(righthtml.join(''));

			$p.off(".alopexgridpager");
			$p.on('change.alopexgridpager', ".perPage", function() {
				if (paging.customPaging) {
					if (option.on && $.isFunction(option.on.perPageChange)) {
						option.on.perPageChange.call(self, $(this).children("option:selected").val());
					}
				} else {
					var p = Number($(this).children("option:selected").val());
					if (isNaN(p))
						return;
					self.updateOption({
						pager: true,
						paging: {
							perPage: p
						}
					});
				}
			});
		}

		//TODO 가상페이징 - 서버에서 페이지 번호에 따라 데이터를 부분부분 가져와야 할 경우 total은 계산되는것이 아닌, 설정되어야 하는 값이다.
		paging.dataLength = data && data.length ? data.length : 0;
		paging.total = paging.perPage ? (paging.dataLength ? ((data.length / Number(paging.perPage)) | 0) + (paging.dataLength % Number(paging.perPage) ? 1 : 0) : 0) : (paging.dataLength ? 1 : 0);
		paging.enabled = !!option.pager;
		paging.pageDataLength = self.state.rendered.length;
		if (paging.customPaging) {
			$.extend(paging, paging.customPaging);
		}

		if (paging.current === undefined) {
			paging.current = 1;
		}
		if (paging.current < 1) {
			paging.current = 1;
		}
		if (paging.current > paging.total) {
			paging.current = paging.total;
		}

		if (option.pager && option.paging) {
			var $p = self.$pager;
			var $left = self.$pagerleft;
			var $right = self.$pagerright;

			var lefthtml = [];
			if ($.isFunction(paging.pagerTotal)) {
				lefthtml.push(paging.pagerTotal(paging));
			} else if (typeof paging.pagerTotal === "string") {
				lefthtml.push(paging.pagerTotal);
			} else if (paging.pagerTotal) {
				var msg = '<span>총 조회건수 : '+ paging.dataLength+ '</span>';
				if(option.message && option.message.pagerTotal) {
					var optionmsg = option.message.pagerTotal;
					if(typeof optionmsg === "string") {
						msg = optionmsg
					} else if ($.isFunction(optionmsg)) {
						msg = optionmsg.call(self.$root, paging);
					}
				}
				lefthtml.push(msg);
			}
			$left.html(lefthtml.join(''));
		}

		//pager update
		if (option.pager) {
			var $p = self.$pager;
			$p.find('.pagination.first-page').html("<a>").find('a').attr("href", "#page" + 1).html(option.paging.first || "");
			$p.find('.pagination.prev-page').html("<a>").find('a').attr("href", "#page" + (paging.current <= 1 ? 1 : Number(paging.current) - 1)).html(option.paging.prev || "");
			$p.find('.pagination.next-page').html("<a>").find('a').attr("href", "#page" + (paging.current >= paging.total ? paging.total : Number(paging.current) + 1)).html(option.paging.next || "");
			$p.find('.pagination.last-page').html("<a>").find('a').attr("href", "#page" + paging.total).html(option.paging.last || "");
			$p.find('.pagination.page-list').empty();

			var startidx = 1;
			var endidx = paging.total;
			var perpager = Number(paging.pagerCount) || 5;
			if (self.option.currentPageInCenter && endidx - startidx >= perpager) {
				startidx = paging.current - ((perpager / 2) | 0);
				endidx = startidx + perpager - 1;
				if (startidx < 1) {
					startidx = 1;
					endidx = startidx + perpager - 1;
				}
				if (endidx > paging.total) {
					endidx = paging.total;
					startidx = paging.total - perpager + 1;
				}
			} else {
				endidx = _min(endidx, perpager);
				while(endidx < paging.current) {
					startidx += perpager;
					endidx += perpager;
				}
				if(endidx > paging.total) {
					endidx = paging.total;
				}
			}
			for (var i = startidx; i <= endidx; i++) {
				var li = $('<li>');
				li.html('<a href="#">' + i + '</a>').find('a').data('alopexgridpage', i).attr("href", "#page" + i);
				if (paging.current == i) {
					li.addClass("current");
				}
				$p.find('.pagination.page-list').append(li);
			}

			$p.on('click.alopexgridpager', ".pagination.first-page a", function(pe) {
				var topage = 1;
				if (option.on && $.isFunction(option.on.pageSet)) {
					if (option.on.pageSet.call(self,
						topage,
						paging.perPage ,
						$.extend({},option.paging,{current:topage})) === false) {
						return false;
					}
				}
				self.pageSet(topage, undefined, true);
				return false;
				//pe.preventDefault();
			}).on('click.alopexgridpager', ".pagination.prev-page a", function(pe) {
				var topage = (paging.current <= 1 ? 1 : Number(paging.current) - 1);
				if (option.on && $.isFunction(option.on.pageSet)) {
					if (option.on.pageSet.call(self,
						topage,
						paging.perPage ,
						$.extend({},option.paging,{current:topage})) === false) {
						return false;
					}
				}
				self.pageSet(topage, undefined, true);
				return false;
				//pe.preventDefault();
			}).on('click.alopexgridpager', ".pagination.page-list li a", function(pe) {
				var topage = $(this).data('alopexgridpage');
				if (option.on && $.isFunction(option.on.pageSet)) {
					if (option.on.pageSet.call(self,
						topage,
						paging.perPage ,
						$.extend({},option.paging,{current:topage})) === false) {
						return false;
					}
				}
				self.pageSet(topage, undefined, true);
				return false;
				//pe.preventDefault();
			}).on('click.alopexgridpager', ".pagination.next-page a", function(pe) {
				var topage = paging.current >= paging.total ? paging.total : Number(paging.current) + 1;
				if (option.on && $.isFunction(option.on.pageSet)) {
					if (option.on.pageSet.call(self,
						topage,
						paging.perPage ,
						$.extend({},option.paging,{current:topage})) === false) {
						return false;
					}
				}
				self.pageSet(topage, undefined, true);
				return false;
				//pe.preventDefault();
			}).on('click.alopexgridpager', ".pagination.last-page a", function(pe) {
				var topage = paging.total;
				if (option.on && $.isFunction(option.on.pageSet)) {
					if (option.on.pageSet.call(self,
						topage,
						paging.perPage ,
						$.extend({},option.paging,{current:topage})) === false) {
						return false;
					}
				}
				self.pageSet(topage, undefined, true);
				return false;
				//pe.preventDefault();
			}).on('mouseover.alopexgridpager','div.pagination,li',function(){
				$(this).addClass('hovering');
			}).on('mouseout.alopexgridpager','div.pagination,li',function(){
				$(this).removeClass('hovering');
			});
		}
		return paging;
	};
	function _inPage(self, data) {
		if(!data || !data._index) return false;
		if(!self.option.pager) return 1;
		var paging = self.pageInfo();
		if(!paging.enabled) return;
		var totallen = paging.dataLength;
		var perpage = paging.perPage;
		var dataindex = data._index.data;
		return Math.floor(dataindex / perpage) + 1;
	}
	AlopexGrid.prototype.pageSet = function(data, sync, noOnPageSet) {
		var self = this;
		var page = data;
		var prevcurr = Number(self.option.paging.current);
		//var so = self._scrollOffset();
		self.option.paging.current = Number(page);
		self._closeTooltip();
		if ($.isFunction(self.option.paging.pageSet)) {
			self._showProgress(function(done) {
				self.option.paging.pageSet(page, function(list, pobj) {
					self.dataSet(list, pobj);
					done();
				}, function() {
					done();
				});
			}, 0, true);
			return;
		}
		if (noOnPageSet !== true && self.option.on && $.isFunction(self.option.on.pageSet)) {
			if (self.option.on.pageSet.call(self,
				page,
				((self.option.paging || {}).perPage) ,
				$.extend({},self.option.paging,{current:page})) === false) {
				return false;
			}
		}

		if(sync) {
			self.pageInfo();
			self.updateOption();
			if (self.option.paging.current !== prevcurr) {
				self.$scroller[0].scrollTop = 0;
				self.$scroller[0].scrollLeft = 0;
			}
		} else {
			self._showProgress((function(prev){
				return function(done){
					self.pageInfo();
					self.updateOption();
					if (self.option.paging.current !== prev) {
						self.$scroller[0].scrollTop = 0;
						self.$scroller[0].scrollLeft = 0;
					}
					done();
				};
			})(prevcurr), 0, true);
		}
	};
	AlopexGrid.prototype._showProgress = function(callback, delay, async) {
		var self = this;
		if (delay === null || delay === undefined) {
			delay = self.option.progressDelay;
		}
		var $div = self.$root.children('div.progress');
		if (!$div.length) {
			$div = $('<div>');
		}
		var $background = self.$root.children('div.modal');
		if (!$background.length) {
			$background = $('<div>');
		}
		var text = self.option.progressText || 'loading...';
		$div.addClass('progress');
		$div.css($.extend({
			//      "position":"absolute",
			//      "margin-left":"-50px",
			//      "margin-top":"-15px",
			//      "width":"100px",
			//      "height":"30px",
			//      "top":"50%",
			//      "left":"50%",
			//      "background-color":"white",
			//      "border":"2px solid grey",
			//      "text-align":"center",
			//      "vertical-align":"middle"
		}, self.option.progressCss || {})).html(text);
		$background.addClass('modal').css($.extend({
			//        "position":"absolute",
			//        "width":"100%",
			//        "height":"100%",
			//        "top":"0px",
			//        "left":"0px"
		}, self.option.modalCss || {}));
		$background.appendTo(self.$root);
		$div.appendTo(self.$root);
		self.state.progressStack++;

		var setfunc = function() {
			function reduceProgress() {
				self.state.progressStack--;
				if (self.state.progressStack <= 0) {
					self.state.progressStack = 0;
					self.$root.children('.progress').remove();
					$div.remove();
					$background.remove();
				}
			}
			if (async) {
				callback(reduceProgress);
				return;
			}
			callback();
			reduceProgress();
		};
		if (delay === null || delay === undefined) {
			setfunc();
		} else {
			setTimeout(setfunc, delay);
		}
	};

	AlopexGrid.prototype.suppressRender = function(jobFunc) {
		var self = this;
		if($.type(jobFunc)==="boolean") {
			self.state.renderingSuppressed = jobFunc;
		} else if($.isFunction(jobFunc)){
			self.state.renderingSuppressed = true;
			jobFunc();
			self.state.renderingSuppressed = false;	
		}
	};

	function _instance(elem) {
		//return elem[AlopexGrid.KEY_NAME];
		return $(elem).data(AlopexGrid.KEY_NAME);
	}

	$.fn.alopexGrid = function(option, param, param2) {
		if (!this.length) {
			return this;
		}
		if (typeof option == "string") {
			if (!AlopexGrid.prototype[option]) {
				throw new Error("[AlopexGrid] AlopexGrid has no method [" + option + "]");
			}
			var ret = undefined;
			var jqobj = undefined;
			var args = $.makeArray(arguments).slice(1);
			jqobj = this.each(function(idx, elem) {
				var instance = _instance(this);
				if (!instance) {
					instance = new AlopexGrid(this);
				}
				//instance._showProgress(function() {
				//ret = instance[option](param, param2);
				ret = instance[option].apply(instance, args);
				//});
				if (ret !== undefined) {
					return false;
				}
			});
			if (ret !== undefined) {
				return ret; //getter
			}
			return jqobj;//jquery method chain
		} else {
			return this.each(function(idx, elem) {
				var instance = _instance(this);
				if (!instance) {
					instance = new AlopexGrid(this, option);
				}
				instance.updateOption(option);
			});
		}
	};
	function commonoption(option) {
		if ($.isPlainObject(option)) {
			AlopexGrid.commonOption = AlopexGrid.commonOption || {};
			AlopexGrid.commonOption = $.extend({}, AlopexGrid.commonOption, option);
		}
	}
	if ($.alopex) {
		$.alopex.alopexGrid = commonoption;
		if ($.isFunction($.alopex.registerSetup)) {
			$.alopex.registerSetup('grid', commonoption);
		}
	}
	$.alopexGrid = commonoption;
})(jQuery);
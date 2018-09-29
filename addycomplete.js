/** Neat Complete v1.4.0 (c) 2017 Abletech Ltd. https://github.com/AbleTech/neat-complete/blob/develop/LICENSE.md */
(function () { var t = [].slice, e = function (t, e) { return function () { return t.apply(e, arguments) } }, i = function (t, e) { function i() { this.constructor = t } for (var n in e) s.call(e, n) && (t[n] = e[n]); return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t }, s = {}.hasOwnProperty; !function (t, e) { "function" == typeof define && define.amd ? define(function () { return e(t) }) : t.NeatComplete = e(t) }(this, function (s) { var n; return n = {}, n.addDomEvent = function (t, e, i) { var s; return t.addEventListener ? t.addEventListener(e, i, !1) : (s = function () { return i.apply(t, arguments) }, t.attachEvent("on" + e, s)) }, n.removeDomEvent = function (t, e, i) { t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, null) }, Array.prototype.indexOf || (Array.prototype.indexOf = function (t) { var e, i, s, n; if (null == this) throw new TypeError; if (n = Object(this), 0 === (i = n.length >>> 0)) return -1; if (s = 0, arguments.length > 0 && (s = Number(arguments[1]), s !== s ? s = 0 : 0 !== s && Infinity !== s && -Infinity !== s && (s = (s > 0 || -1) * Math.floor(Math.abs(s)))), s >= i) return -1; for (e = s >= 0 ? s : Math.max(i - Math.abs(s), 0) ; e < i;) { if (e in n && n[e] === t) return e; e++ } return -1 }), n.Dispatch = function () { function e() { } return e.prototype.setOption = function (t, e) { return this.options[t] = e, this }, e.prototype.getOption = function (t) { return this.options[t] }, e.prototype.on = function (t, e) { var i; return null == this.subs && (this.subs = {}), null == (i = this.subs)[t] && (i[t] = []), this.subs[t].push(e), this }, e.prototype.trigger = function () { var e, i, s, n, o, r, h; if (s = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], null != (null != (r = this.subs) ? r[s] : void 0)) for (h = this.subs[s], n = 0, o = h.length; n < o; n++) i = h[n], i.apply(this, e); return this }, e }(), n.Widget = function (t) { function s(t, i) { this.element = t, this.options = null != i ? i : {}, this._onPaste = e(this._onPaste, this), this._onBlur = e(this._onBlur, this), this._onKeyDown = e(this._onKeyDown, this), this._onKeyPress = e(this._onKeyPress, this), this._onFocus = e(this._onFocus, this), this.enabled = !0, this.searchQueued = !1, this.element.setAttribute("autocomplete", "off"), this.services = [], this._applyDefaults(), null == this.getOption("container") && this.setOption("container", window.document.body), this._addListeners(), this.output = document.createElement("ul"), this.output.className = this.options.list_class, this._applyStyle("display", "none"), this._applyStyle("position", this.options.position), this.options.container.appendChild(this.output) } return i(s, t), s.prototype.defaults = { max_results: 10, list_class: "nc_list", item_class: "nc_item", hover_class: "nc_hover", footer_class: "nc_footer", empty_class: "nc_empty", error_class: "nc_error", position: "absolute", timeout: 400, ignore_returns: !0 }, s.prototype.addService = function (t, e, i) { var s; return null == i && (i = {}), this.services.push(s = new n.Service(this, t, e, i)), s }, s.prototype.disable = function () { return this.enabled = !1, this }, s.prototype.enable = function () { return this.enabled = !0, this }, s.prototype.destroy = function () { document.body.removeChild(this.output), this.element.removeAttribute("autocomplete") }, s.prototype._applyDefaults = function () { var t, e, i, s; e = this.defaults, i = []; for (t in e) s = e[t], null == this.getOption(t) ? i.push(this.setOption(t, s)) : i.push(void 0); return i }, s.prototype._addListeners = function () { return n.addDomEvent(this.element, "focus", this._onFocus), n.addDomEvent(this.element, "keypress", this._onKeyPress), n.addDomEvent(this.element, "keydown", this._onKeyDown), n.addDomEvent(this.element, "blur", this._onBlur), n.addDomEvent(this.element, "paste", this._onPaste) }, s.prototype._removeListeners = function () { return n.removeDomEvent(this.element, "focus", this._onFocus), n.removeDomEvent(this.element, "keypress", this._onKeyPress), n.removeDomEvent(this.element, "keydown", this._onKeyDown), n.removeDomEvent(this.element, "blur", this._onBlur), n.removeDomEvent(this.element, "paste", this._onPaste) }, s.prototype._onFocus = function (t) { return this.focused = !0 }, s.prototype._onKeyPress = function (t) { var e, i, s; if (i = t.which || t.keyCode, this.visible && 13 === i) return null != (s = this.highlighted) && s.selectItem(), e = this.getOption("ignore_returns"), e && t.preventDefault ? t.preventDefault() : e && (t.returnValue = !1), this.highlighted = null }, s.prototype._onKeyDown = function (t) { var e; switch (t.which || t.keyCode) { case 38: return this.visible && this._moveHighlight(-1), !1; case 40: return this.visible && this._moveHighlight(1), !1; case 9: if (this.visible) return null != (e = this.highlighted) ? e.selectItem() : void 0; break; case 27: return this._hideResults(); case 37: case 39: case 13: break; default: return this._getSuggestionsWithTimeout() } }, s.prototype._onBlur = function (t) { if (!this.mouseDownOnSelect) return this.focused = !1, this._hideResults() }, s.prototype._onPaste = function (t) { return this._getSuggestionsWithTimeout() }, s.prototype._moveHighlight = function (t) { var e, i, s; return e = null != this.highlighted ? this.results.indexOf(this.highlighted) : -1, null != (i = this.highlighted) && i.unhighlight(), e += t, e < -1 ? e = this.results.length - 1 : e >= this.results.length && (e = -1), null != (s = this.results[e]) && s.highlight(), this.element.value = null != this.highlighted ? this.highlighted.value : this._val }, s.prototype._getSuggestionsWithTimeout = function () { return null != this._timeout && clearTimeout(this._timeout), this._timeout = setTimeout(function (t) { return function () { return t._getSuggestions() } }(this), this.options.timeout) }, s.prototype._getSuggestions = function () { var t, e, i, s, n; if (this.enabled) { if (!this._servicesReady()) return void (this.searchQueued = !0); if (this._val = this.element.value, this.error_content = null, "" !== this._val) { for (i = this.services, s = [], t = 0, e = i.length; t < e; t++) n = i[t], s.push(n.search(this._val)); return s } return this._hideResults() } }, s.prototype._applyStyle = function (t, e) { return this.output.style[t] = e }, s.prototype._getPosition = function () { var t, e; for (e = this.element, t = { top: e.offsetTop + e.offsetHeight, left: e.offsetLeft }; e = e.offsetParent;) t.top += e.offsetTop, t.left += e.offsetLeft; return t }, s.prototype._hideResults = function () { var t, e, i, s, n; for (this.visible = !1, this._applyStyle("display", "none"), this.results = [], i = this.services, s = [], t = 0, e = i.length; t < e; t++) n = i[t], s.push(n.results = []); return s }, s.prototype._displayResults = function () { var t; return this.visible = !0, t = this._getPosition(), this.options.container === document.body && (this._applyStyle("left", t.left + "px"), this._applyStyle("top", t.top + "px")), this._applyStyle("display", "block") }, s.prototype._renderItem = function (t, e) { var i; return i = document.createElement("li"), i.innerHTML = t, null != e && (i.className = e), n.addDomEvent(i, "mousedown", function (t) { return function () { return t.mouseDownOnSelect = !0 } }(this)), n.addDomEvent(i, "mouseup", function (t) { return function () { return t.mouseDownOnSelect = !1 } }(this)), i }, s.prototype._renderFooter = function () { return this._renderItem(this.options.footer_content, this.options.footer_class) }, s.prototype._renderEmpty = function () { return this._renderItem(this.options.empty_content, this.options.empty_class) }, s.prototype._servicesReady = function () { var t, e, i, s, n; for (n = [], i = this.services, t = 0, e = i.length; t < e; t++) s = i[t], n.push(s.ready()); return n.indexOf(!1) < 0 }, s.prototype.showResults = function () { var t, e, i, s, n, o, r, h, u; if (this._servicesReady()) { for (this.searchQueued && (this._getSuggestions(), this.searchQueued = !1), this.results = [], this.output.innerHTML = "", o = this.services, e = 0, s = o.length; e < s; e++) u = o[e], this.results = this.results.concat(u.results); if (this.results.length) { for (this.results = this.results.sort(function (t, e) { return e.score - t.score }), this.results = this.results.slice(0, +(this.getOption("max_results") - 1) + 1 || 9e9), r = this.results, i = 0, n = r.length; i < n; i++) h = r[i], this.output.appendChild(h.render()); null != this.options.footer_content && "" !== (t = this._renderFooter()) && this.output.appendChild(t), this._displayResults() } else this.error_content ? (this.output.appendChild(this._renderItem(this.error_content, this.options.error_class)), this._displayResults()) : (null != this.options.empty_content ? (this.output.appendChild(this._renderEmpty()), this._displayResults()) : this._hideResults(), this.trigger("results:empty")); this.trigger("results:update") } }, s.prototype.selectHighlighted = function () { this.element.value = this.highlighted.value, this._hideResults(), this.trigger("result:select", this.highlighted.value, this.highlighted.data) }, s }(n.Dispatch), n.Service = function (t) { function s(t, i, s, n) { this.widget = t, this.name = i, this.search_fn = s, this.options = null != n ? n : {}, this._response = e(this._response, this), this.ready = e(this.ready, this), this.results = [], this._ready = !0, this.response = function (t) { return function (e, i) { return t._response.apply(t, arguments) } }(this) } return i(s, t), s.prototype.ready = function () { return this._ready }, s.prototype.search = function (t) { return this.last_query = t, this._ready = !1, this.search_fn(t, this.response) }, s.prototype._response = function (t, e) { var i, s, o; if (this.results = [], this.last_query === t) { for (this.results = [], s = 0, o = e.length; s < o; s++) i = e[s], this.results.push(new n._Result(this, i)); return this._ready = !0, this.widget.showResults() } }, s }(n.Dispatch), n._Result = function () { function t(t, e) { var i, s, n, o; this.service = t, this.options = e, this.widget = this.service.widget, this.renderer = this.service.options.renderer || this.widget.options.renderer, this.value = null != (i = this.options) ? i.value : void 0, this.score = (null != (s = this.options) ? s.score : void 0) || 0, this.identifier = null != (n = this.options) ? n.identifier : void 0, this.data = (null != (o = this.options) ? o.data : void 0) || {} } return t.prototype.render = function () { return this.li = document.createElement("li"), this.li.innerHTML = null != this.renderer ? this.renderer(this.value, this.data) : this.value, this.li.className = this.widget.options.item_class, this.addEvents(), this.li }, t.prototype.addEvents = function () { return n.addDomEvent(this.li, "click", function (t) { return function (e) { return t.selectItem(), e.preventDefault ? e.preventDefault() : e.returnValue = !1 } }(this)), n.addDomEvent(this.li, "mouseover", function (t) { return function () { return t.highlight() } }(this)), n.addDomEvent(this.li, "mouseout", function (t) { return function () { return t.unhighlight() } }(this)), n.addDomEvent(this.li, "mousedown", function (t) { return function () { return t.widget.mouseDownOnSelect = !0 } }(this)), n.addDomEvent(this.li, "mouseup", function (t) { return function () { return t.widget.mouseDownOnSelect = !1 } }(this)) }, t.prototype.selectItem = function () { return this.service.trigger("result:select", this.value, this.data), this.widget.highlighted = this, this.widget.selectHighlighted() }, t.prototype.highlight = function () { var t; return null != (t = this.widget.highlighted) && t.unhighlight(), this.li.className = this.li.className + " " + this.widget.options.hover_class, this.widget.highlighted = this }, t.prototype.unhighlight = function () { return this.widget.highlighted = null, this.li.className = this.li.className.replace(new RegExp(this.widget.options.hover_class, "gi"), "") }, t }(), n }) }).call(this);
/*! Reqwest! A general purpose XHR connection manager license MIT (c) Dustin Diaz 2015 https://github.com/ded/reqwest */
!function (e, t, n) { typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : t[e] = n() }("reqwest", this, function () { function succeed(e) { var t = protocolRe.exec(e.url); return t = t && t[1] || context.location.protocol, httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response } function handleReadyState(e, t, n) { return function () { if (e._aborted) return n(e.request); if (e._timedOut) return n(e.request, "Request is aborted: timeout"); e.request && e.request[readyState] == 4 && (e.request.onreadystatechange = noop, succeed(e) ? t(e.request) : n(e.request)) } } function setHeaders(e, t) { var n = t.headers || {}, r; n.Accept = n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"]; var i = typeof FormData != "undefined" && t.data instanceof FormData; !t.crossOrigin && !n[requestedWith] && (n[requestedWith] = defaultHeaders.requestedWith), !n[contentType] && !i && (n[contentType] = t.contentType || defaultHeaders.contentType); for (r in n) n.hasOwnProperty(r) && "setRequestHeader" in e && e.setRequestHeader(r, n[r]) } function setCredentials(e, t) { typeof t.withCredentials != "undefined" && typeof e.withCredentials != "undefined" && (e.withCredentials = !!t.withCredentials) } function generalCallback(e) { lastValue = e } function urlappend(e, t) { return e + (/\?/.test(e) ? "&" : "?") + t } function handleJsonp(e, t, n, r) { var i = uniqid++, s = e.jsonpCallback || "callback", o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i), u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"), a = r.match(u), f = doc.createElement("script"), l = 0, c = navigator.userAgent.indexOf("MSIE 10.0") !== -1; return a ? a[3] === "?" ? r = r.replace(u, "$1=" + o) : o = a[3] : r = urlappend(r, s + "=" + o), context[o] = generalCallback, f.type = "text/javascript", f.src = r, f.async = !0, typeof f.onreadystatechange != "undefined" && !c && (f.htmlFor = f.id = "_reqwest_" + i), f.onload = f.onreadystatechange = function () { if (f[readyState] && f[readyState] !== "complete" && f[readyState] !== "loaded" || l) return !1; f.onload = f.onreadystatechange = null, f.onclick && f.onclick(), t(lastValue), lastValue = undefined, head.removeChild(f), l = 1 }, head.appendChild(f), { abort: function () { f.onload = f.onreadystatechange = null, n({}, "Request is aborted: timeout", {}), lastValue = undefined, head.removeChild(f), l = 1 } } } function getRequest(e, t) { var n = this.o, r = (n.method || "GET").toUpperCase(), i = typeof n == "string" ? n : n.url, s = n.processData !== !1 && n.data && typeof n.data != "string" ? reqwest.toQueryString(n.data) : n.data || null, o, u = !1; return (n["type"] == "jsonp" || r == "GET") && s && (i = urlappend(i, s), s = null), n["type"] == "jsonp" ? handleJsonp(n, e, t, i) : (o = n.xhr && n.xhr(n) || xhr(n), o.open(r, i, n.async === !1 ? !1 : !0), setHeaders(o, n), setCredentials(o, n), context[xDomainRequest] && o instanceof context[xDomainRequest] ? (o.onload = e, o.onerror = t, o.onprogress = function () { }, u = !0) : o.onreadystatechange = handleReadyState(this, e, t), n.before && n.before(o), u ? setTimeout(function () { o.send(s) }, 200) : o.send(s), o) } function Reqwest(e, t) { this.o = e, this.fn = t, init.apply(this, arguments) } function setType(e) { if (e === null) return undefined; if (e.match("json")) return "json"; if (e.match("javascript")) return "js"; if (e.match("text")) return "html"; if (e.match("xml")) return "xml" } function init(o, fn) { function complete(e) { o.timeout && clearTimeout(self.timeout), self.timeout = null; while (self._completeHandlers.length > 0) self._completeHandlers.shift()(e) } function success(resp) { var type = o.type || resp && setType(resp.getResponseHeader("Content-Type")); resp = type !== "jsonp" ? self.request : resp; var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse; try { resp.responseText = r } catch (e) { } if (r) switch (type) { case "json": try { resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")") } catch (err) { return error(resp, "Could not parse JSON in response", err) } break; case "js": resp = eval(r); break; case "html": resp = r; break; case "xml": resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML } self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); while (self._fulfillmentHandlers.length > 0) resp = self._fulfillmentHandlers.shift()(resp); complete(resp) } function timedOut() { self._timedOut = !0, self.request.abort() } function error(e, t, n) { e = self.request, self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0; while (self._errorHandlers.length > 0) self._errorHandlers.shift()(e, t, n); complete(e) } this.url = typeof o == "string" ? o : o.url, this.timeout = null, this._fulfilled = !1, this._successHandler = function () { }, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {}; var self = this; fn = fn || function () { }, o.timeout && (this.timeout = setTimeout(function () { timedOut() }, o.timeout)), o.success && (this._successHandler = function () { o.success.apply(o, arguments) }), o.error && this._errorHandlers.push(function () { o.error.apply(o, arguments) }), o.complete && this._completeHandlers.push(function () { o.complete.apply(o, arguments) }), this.request = getRequest.call(this, success, error) } function reqwest(e, t) { return new Reqwest(e, t) } function normalize(e) { return e ? e.replace(/\r?\n/g, "\r\n") : "" } function serial(e, t) { var n = e.name, r = e.tagName.toLowerCase(), i = function (e) { e && !e.disabled && t(n, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text)) }, s, o, u, a; if (e.disabled || !n) return; switch (r) { case "input": /reset|button|image|file/i.test(e.type) || (s = /checkbox/i.test(e.type), o = /radio/i.test(e.type), u = e.value, (!s && !o || e.checked) && t(n, normalize(s && u === "" ? "on" : u))); break; case "textarea": t(n, normalize(e.value)); break; case "select": if (e.type.toLowerCase() === "select-one") i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null); else for (a = 0; e.length && a < e.length; a++) e.options[a].selected && i(e.options[a]) } } function eachFormElement() { var e = this, t, n, r = function (t, n) { var r, i, s; for (r = 0; r < n.length; r++) { s = t[byTag](n[r]); for (i = 0; i < s.length; i++) serial(s[i], e) } }; for (n = 0; n < arguments.length; n++) t = arguments[n], /input|select|textarea/i.test(t.tagName) && serial(t, e), r(t, ["input", "select", "textarea"]) } function serializeQueryString() { return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments)) } function serializeHash() { var e = {}; return eachFormElement.apply(function (t, n) { t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n }, arguments), e } function buildParams(e, t, n, r) { var i, s, o, u = /\[\]$/; if (isArray(t)) for (s = 0; t && s < t.length; s++) o = t[s], n || u.test(e) ? r(e, o) : buildParams(e + "[" + (typeof o == "object" ? s : "") + "]", o, n, r); else if (t && t.toString() === "[object Object]") for (i in t) buildParams(e + "[" + i + "]", t[i], n, r); else r(e, t) } var context = this; if ("window" in context) var doc = document, byTag = "getElementsByTagName", head = doc[byTag]("head")[0]; else { var XHR2; try { XHR2 = require("xhr2") } catch (ex) { throw new Error("Peer dependency `xhr2` required! Please npm install xhr2") } } var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +(new Date), lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function () { }, isArray = typeof Array.isArray == "function" ? Array.isArray : function (e) { return e instanceof Array }, defaultHeaders = { contentType: "application/x-www-form-urlencoded", requestedWith: xmlHttpRequest, accept: { "*": "text/javascript, text/html, application/xml, text/xml, */*", xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", js: "application/javascript, text/javascript" } }, xhr = function (e) { if (e.crossOrigin === !0) { var t = context[xmlHttpRequest] ? new XMLHttpRequest : null; if (t && "withCredentials" in t) return t; if (context[xDomainRequest]) return new XDomainRequest; throw new Error("Browser does not support cross-origin requests") } return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP") }, globalSetupOptions = { dataFilter: function (e) { return e } }; return Reqwest.prototype = { abort: function () { this._aborted = !0, this.request.abort() }, retry: function () { init.call(this, this.o, this.fn) }, then: function (e, t) { return e = e || function () { }, t = t || function () { }, this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this }, always: function (e) { return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this }, fail: function (e) { return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this }, "catch": function (e) { return this.fail(e) } }, reqwest.serializeArray = function () { var e = []; return eachFormElement.apply(function (t, n) { e.push({ name: t, value: n }) }, arguments), e }, reqwest.serialize = function () { if (arguments.length === 0) return ""; var e, t, n = Array.prototype.slice.call(arguments, 0); return e = n.pop(), e && e.nodeType && n.push(e) && (e = null), e && (e = e.type), e == "map" ? t = serializeHash : e == "array" ? t = reqwest.serializeArray : t = serializeQueryString, t.apply(null, n) }, reqwest.toQueryString = function (e, t) { var n, r, i = t || !1, s = [], o = encodeURIComponent, u = function (e, t) { t = "function" == typeof t ? t() : t == null ? "" : t, s[s.length] = o(e) + "=" + o(t) }; if (isArray(e)) for (r = 0; e && r < e.length; r++) u(e[r].name, e[r].value); else for (n in e) e.hasOwnProperty(n) && buildParams(n, e[n], i, u); return s.join("&").replace(/%20/g, "+") }, reqwest.getcallbackPrefix = function () { return callbackPrefix }, reqwest.compat = function (e, t) { return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t) }, reqwest.ajaxSetup = function (e) { e = e || {}; for (var t in e) globalSetupOptions[t] = e[t] }, reqwest })
// AddyComplete v2.1.0.4 - https://www.addy.co.nz
function AddyUrlSettingFactory(e) { function o(e) { e = e.replace(/[\[\]]/g, "\\$&"); var o = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t); return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null } this.createOptions = function () { var e = {}; return e.excludePostBox = o("excludePostBox") || !1, e.exRural = o("excludeRural") || !1, e.exUndeliver = o("excludeUndeliver") || !1, e.exSpelling = o("excludeSpelling") || !1, e.exWord = o("excludeWord") || !1, e.exIp = o("excludeIp") || !1, e.exPostcodes = o("excludePostcodes") || "", e.inPostcode = o("includePostcode") || "", e.exRegion = o("excludeRegion") || "", e.inRegion = o("includeRegion") || "", e.exTerritory = o("excludeTerritory") || "", e.inTerritory = o("includeTerritory") || "", e.tag = o("tag") || "", e.uniqueId = o("uniqueid") || "", e.maxItems = o("maxItems") || 10, e.enableLocation = !!o("enableLocation") && navigator.geolocation, e }, this.getKey = function () { var e = o("key"); return e && "" == e && console.warn("The API key is missing"), e }, this.createCallback = function () { var e = o("callback"); return e && "function" == typeof window[e] ? e : null }, this.getLoadCssEnabled = function () { var e = o("loadcss"); return e && "true" === e }, this.createGuid = function () { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) { var o = 16 * Math.random() | 0; return ("x" == e ? o : 3 & o | 8).toString(16) }) }; var t = function () { var o = document.getElementsByTagName("script"); e = e.toLowerCase(); for (var t = 0; t < o.length; t++) if (o[t].src && -1 !== o[t].src.toLowerCase().indexOf(e)) return o[t].src; return console.warn("Script source not found. Name: ", e), "" }() } var addySettingsFactory = new AddyUrlSettingFactory("addycomplete"); function AddyComplete(e, o) { if (e) { var t = this; t.urlBase = "https://www.addy.co.nz/", t.searchSuffix = "", t.requestSuffix = "", t.fields = o || {}, t.mode = "address", t.options = addySettingsFactory.createOptions(), t.key = addySettingsFactory.getKey(); var i = addySettingsFactory.createGuid(), n = e.placeholder; t.makeRequest = function (e, o, n) { reqwest({ url: t.urlBase + e + "?key=" + t.key + t.requestSuffix + "&v=neat_2_1_0_4&session=" + i + o, type: "jsonp", success: function (e) { n(e) }, error: function (e) { console.log("Request failed", e) } }) }, t.widget = new NeatComplete.Widget(e, { empty_content: "<b>Address not found.</b> Please verify the spelling.<br />For brand new addresses, please type it in manually.", location_content: "Addresses near me", location_unavailable: "Location information unavailable. Please type in your address.", location_not_found: "No nearby addresses found. Please type in your address.", location_loading: "Loading your location...", max_results: t.options.maxItems }); var s = null, r = t.widget.addService("addy", function (e, o) { if (e.length < 3) return o(e, new Array), void t.widget._hideResults(); try { s = new RegExp("(" + (i = e, i.replace(/\\/gi, "/").replace(/[^0-9a-z' /]/gi, "").trim()).split(" ").join("|") + ")", "gi") } catch (e) { s = null } var i; "address" === t.mode ? t.makeRequest("api/search", t.searchSuffix + "&s=" + e, function (t) { var i = new Array; if (t) for (var n = 0; n < t.addresses.length; n++) i.push({ value: t.addresses[n].a, data: t.addresses[n] }); o(e, i) }) : t.makeRequest("api/postcode", "&max=" + t.getMaxResults() + "&s=" + e, function (t) { var i = new Array; if (t) for (var n = 0; n < t.postcodes.length; n++) { var s = t.postcodes[n]; i.push({ value: s.suburb + ("" === s.suburb ? "" : ", ") + s.city + ("" === s.city ? "" : ", ") + s.postcode, data: s }) } o(e, i) }) }, { renderer: function (e, o) { var i = t.widget.getOption("highlight_class"); return null === s ? e : e.replace(s, '<span class="' + (void 0 === i ? "nc_highlight" : i) + '">$1</span>') } }); t.setOption = function (e, o) { e && "exclude_postbox" === e ? t.options.excludePostBox = o : t.widget.setOption(e, o), d() }, t.setExcludeRural = function (e) { t.options.exRural = e, d() }, t.setExcludePostbox = function (e) { t.options.excludePostBox = e, d() }, t.setExcludeUndeliverable = function (e) { t.options.exUndeliver = e, d() }, t.setExcludeSpelling = function (e) { t.options.exSpelling = e, d() }, t.setExcludeWordRemoval = function (e) { t.options.exWord = e, d() }, t.setExcludeIpOrder = function (e) { t.options.exIp = e, d() }, t.setExcludePostcodes = function (e) { t.options.exPostcodes = Array.isArray(e) ? e.join("-") : e, d() }, t.setIncludePostcodes = function (e) { t.options.inPostcode = Array.isArray(e) ? e.join("-") : e, d() }, t.setExcludeRegions = function (e) { t.options.exRegion = Array.isArray(e) ? e.join("-") : e, d() }, t.setIncludeRegions = function (e) { t.options.inRegion = Array.isArray(e) ? e.join("-") : e, d() }, t.setExcludeTerritories = function (e) { t.options.exTerritory = Array.isArray(e) ? e.join("-") : e, d() }, t.setIncludeTerritories = function (e) { t.options.inTerritory = Array.isArray(e) ? e.join("-") : e, d() }, t.setTag = function (e) { t.options.tag = e, d() }, t.setUniqueId = function (e) { t.options.uniqueId = e, d() }, t.getOption = function (e) { return t.widget.getOption(e) }, t.getMaxResults = function () { return t.widget.getOption("max_results") }, t.enableLocation = function () { t.options.enableLocation = !0 }, t.disableLocation = function () { t.options.enableLocation = !1 }, t.enable = function () { t.widget.enable() }, t.disable = function () { t.widget.disable() }, t.setPostcodeMode = function (e) { t.mode = "postcode", t.setOption("empty_content", "Postcode not found. Please verify the spelling.") }; NeatComplete.addDomEvent(e, "focus", function (o) { t.options.enableLocation && "" === e.value && r._response(r.last_query, [{ value: t.getOption("location_content"), data: { id: "location" } }]) }), t._onLocationResultsEmpty = function (e) { var o = t.widget.getOption("empty_content"); t.options.enableLocation = !1, t.setOption("empty_content", e), setTimeout(function () { t.setOption("empty_content", o) }, 2e3) }, t.handleLocationError = function (o) { t.makeRequest("api/errorlog", "&message=GeoFailCode:" + o.code + ":" + o.message, function (e) { }), t._onLocationResultsEmpty(t.getOption("location_unavailable")), r._response(r.last_query, []), e.placeholder = n }, t.reverseGeocode = function (o) { t.makeRequest("api/geocode", "&x=" + o.coords.longitude + "&y=" + o.coords.latitude + "&limit=" + t.getMaxResults(), function (o) { var i = new Array; if (o) for (var s = 0; s < o.addresses.length; s++) i.push({ value: o.addresses[s].displayname, data: o.addresses[s] }); 0 === i.length && t._onLocationResultsEmpty(t.getOption("location_not_found")), e.placeholder = n, r._response(r.last_query, i) }.bind(this)) }, t.addressSelected = function (e) { }, t.postcodeSelected = function (e) { }, t.assignAddressFields = function (e) { t.fields.address && (t.fields.address.value = e.displayline), t.fields.suburb && (t.fields.suburb.value = "" === e.suburb ? "" === e.mailtown ? e.city : e.mailtown : e.suburb), t.fields.city && (t.fields.city.value = "" === e.mailtown ? e.city : e.mailtown), t.fields.territory && (t.fields.territory.value = e.territory), t.fields.x && (t.fields.x.value = e.x), t.fields.y && (t.fields.y.value = e.y), t.fields.dpid && (t.fields.dpid.value = e.dpid), t.fields.id && (t.fields.id.value = e.id), t.fields.postcode && (t.fields.postcode.value = e.postcode), t.fields.line1 && (t.fields.line1.value = e.address1), t.fields.line2 && (t.fields.line2.value = e.address2), t.fields.line3 && (t.fields.line3.value = e.address3), t.fields.line4 && (t.fields.line4.value = e.address4), t.fields.city || !t.fields.suburb || "" !== e.suburb || "" === e.city && "" === e.mailtown || (t.fields.suburb.value = "" === e.mailtown ? e.city : e.mailtown), t.fields.address1 && t.fields.address2 ? (e.address4 || 0 === e.address2.indexOf("RD ") ? (t.fields.address1.value = e.address1, t.fields.address2.value = e.address2) : (t.fields.address1.value = e.displayline, t.fields.address2.value = ""), !t.fields.suburb && e.suburb && "" !== e.suburb && ("" !== t.fields.address2.value && (t.fields.address1.value += ", " + t.fields.address2.value), t.fields.address2.value = e.suburb)) : t.fields.address1 && !t.fields.address2 && (t.fields.address1.value = e.displayline) }, t.assignRegion = function (e) { var o = t.fields.region; if (o) if (o.options) { e.region = e.region.toUpperCase(); for (var i = [e.region, e.region.replace("'", ""), e.region.replace("-", " - "), e.region.replace("-", " / "), e.region.replace("-", "/")], n = 0; n < o.options.length; n++) if (i.indexOf(o.options[n].text.toUpperCase()) > -1 || i.indexOf(o.options[n].value.toUpperCase()) > -1) { o.selectedIndex = n; break } } else o.value = e.region }, t.loadAddress = function (e) { t.makeRequest("api/address/" + e, "", function (e) { e && (t.assignAddressFields(e), t.assignRegion(e), t.addressSelected(e)) }.bind(this)) }, t.loadLocation = function () { e.value = "", e.placeholder = t.getOption("location_loading"), navigator.geolocation.getCurrentPosition(t.reverseGeocode, t.handleLocationError) }, t.widget.on("result:select", function (e, o) { "address" === t.mode ? "location" === o.id ? t.loadLocation() : t.loadAddress(o.id) : t.postcodeSelected(o) }), t.checkDemo = function () { return !(!t.key || "demo-api-key" !== t.key.toLowerCase()) && (t.setOption("footer_content", '<b>Demo Mode:</b> Create a free account at <a href="https://www.addy.co.nz/" class="link-active">addy.co.nz</a>'), !0) }, t.checkDemo(), d() } else console.warn("Input field is missing"); function d() { t.searchSuffix = "&max=" + t.getMaxResults(), t.options.excludePostBox && (t.searchSuffix += "&expostbox=true"), t.options.exUndeliver && (t.searchSuffix += "&exundeliver=true"), t.options.exRural && (t.searchSuffix += "&exrural=true"), t.options.exSpelling && (t.searchSuffix += "&exspelling=true"), t.options.exWord && (t.searchSuffix += "&exword=true"), t.options.exIp && (t.searchSuffix += "&exip=true"), t.options.exPostcodes && "" !== t.options.exPostcodes && (t.searchSuffix += "&expostcode=" + t.options.exPostcodes), t.options.inPostcode && "" !== t.options.inPostcode && (t.searchSuffix += "&inpostcode=" + t.options.inPostcode), t.options.exRegion && "" !== t.options.exRegion && (t.searchSuffix += "&exregion=" + t.options.exRegion), t.options.inRegion && "" !== t.options.inRegion && (t.searchSuffix += "&inregion=" + t.options.inRegion), t.options.exTerritory && "" !== t.options.exTerritory && (t.searchSuffix += "&exterritory=" + t.options.exTerritory), t.options.inTerritory && "" !== t.options.inTerritory && (t.searchSuffix += "&interritory=" + t.options.inTerritory), t.requestSuffix = "", t.options.tag && "" !== t.options.tag && (t.requestSuffix += "&tag=" + t.options.tag), t.options.uniqueId && "" !== t.options.uniqueId && (t.requestSuffix += "&uniqueid=" + t.options.uniqueId) } } function initAddyByCss() { var e = ["", "2-", "3-", "4-"], o = "addy-"; function t(e) { var t = document.getElementsByClassName(o + e); return 1 === t.length ? t[0] : null } for (var i = 0; i < e.length; i++) { var n = t(e[i] + "line1"); if (null !== n) new AddyComplete(n, { address1: n, address2: t(e[i] + "line2"), suburb: t(e[i] + "suburb"), city: t(e[i] + "city"), region: t(e[i] + "region"), territory: t(e[i] + "territory"), postcode: t(e[i] + "postcode"), dpid: t(e[i] + "dpid"), id: t(e[i] + "id"), x: t(e[i] + "x"), y: t(e[i] + "y") }) } } function callAddyInit() { var e = addySettingsFactory.createCallback(), o = !1; if (e ? (window[e](), o = !0) : "function" == typeof initAddy && (initAddy(), o = !0), o || initAddyByCss(), addySettingsFactory.getLoadCssEnabled()) { var t = document.createElement("link"); t.setAttribute("rel", "stylesheet"), t.setAttribute("type", "text/css"), t.setAttribute("href", "https://cdn.addy.co.nz/neatcomplete/2.1.0/addycomplete.min.css"), document.getElementsByTagName("head")[0].appendChild(t) } } callAddyInit();

// bigcommerce Plug-in
function initAddyBigCommerce() {

    var _controls = [];

    var _formConfigs = [
        {
            idFields: ["#CheckoutStepBillingAddress", "#CreateAccountForm", "#AddressEditForm"],
            countryField: "FormField_11",
            countryValue: "New Zealand",
            fields: {
                address1: "FormField_8",
                suburb: "FormField_9",
                city: "FormField_10",
                region: "FormField_12",
                postcode: "FormField_13"
            }
        },
        {
            idFields: ["#CheckoutStepShippingAddress"],
            countryField: "FormField_21",
            countryValue: "New Zealand",
            fields: {
                address1: "FormField_18",
                suburb: "FormField_19",
                city: "FormField_20",
                region: "FormField_22",
                postcode: "FormField_23"
            }
        },
        {
            idFields: ["#CheckoutStepShippingAddress"],
            countryField: "FormField_23",
            countryValue: "New Zealand",
            fields: {
                address1: "FormField_20",
                suburb: "FormField_21",
                city: "FormField_22",
                region: "FormField_24",
                postcode: "FormField_25"
            }
        },
        {
            idFields: ["#micro-app-ng-checkout"],
            countryField: "countryCodeInput",
            countryValue: "string:NZ",
            fields: {
                address1: "addressLine1Input",
                suburb: "addressLine2Input",
                city: "cityInput",
                region: "provinceInput",
                postcode: "postCodeInput"
            }
        },
        {
            idFields: ["form[data-create-account-form]", "form[data-address-form]"],
            countryField: "FormField_11_select",
            countryValue: "New Zealand",
            fields: {
                address1: "FormField_8_input",
                suburb: "FormField_9_input",
                city: "FormField_10_input",
                region: "FormField_12_input",
                postcode: "FormField_13_input"
            }
        }
    ];

    function mutationCallback(mutations) {
        if (!containsAutocompleteMutations(mutations)) {
            setObserveTimeout();
        }
    }

    function mutationEventCallback(event) {
        if (!containsAutocompleteEvent(event)) {
            setObserveTimeout();
        }
    }

    function setObserveTimeout() {
        if (this.observeTimeout) {
            clearTimeout(this.observeTimeout);
        }
        this.observeTimeout = setTimeout(attachForm, 600);
    }

    function containsAutocompleteMutations(mutations) {
        for (var index = 0; index < mutations.length; index++) {
            var mutation = mutations[index];

            if (mutation.addedNodes) {
                for (var nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
                    if (mutation.addedNodes[nodeIndex].className === "nc_list") {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function containsAutocompleteEvent(event) {
        return event.target.className && event.target.className === "nc_list" ||
               event.relatedNode && event.relatedNode.className && event.relatedNode.className === "nc_list";
    }

    function observeChanges() {
        if (window.MutationObserver) {
            var observer = new MutationObserver(mutationCallback.bind(this));
            observer.observe(document.body, { childList: true, subtree: true });
        } else if (window.addEventListener) {
            document.body.addEventListener('DOMNodeRemoved', mutationEventCallback.bind(this), false);
            document.body.addEventListener('DOMNodeInserted', mutationEventCallback.bind(this), false);
        }
    }

    function attachForm() {
        for (var configIndex = 0; configIndex < _formConfigs.length; configIndex++) {
            var config = _formConfigs[configIndex];

            for (var fieldIndex = 0; fieldIndex < config.idFields.length; fieldIndex++) {
                var fieldName = config.idFields[fieldIndex];
                var controlId = fieldName + configIndex;
                var countryControl = document.getElementById(config.countryField);
                var formActive = isFormActive(fieldName);

                var countryInitialised = initialiseCountry(countryControl, config.countryValue);
                var countryActive = formActive && (countryInitialised || isCountryActive(countryControl, config.countryValue));
                var control = getControl(controlId, config.fields.address1);

                if (countryInitialised && control) {
                    // need to re-attach
                    detatchControl(control);
                    attachControl(controlId, config.fields);
                } else if (formActive && countryActive && !control) {
                    attachControl(controlId, config.fields);
                } else if ((!formActive || !countryActive) && control) {
                    detatchControl(control);
                }
            }
        }
    }

    function initialiseCountry(control, value) {
        if (!control || control.value !== "" || !control.options) return false;

        for (var i = 0; i < control.options.length; i++) {
            if (control.options[i].value === value) {
                control.value = value;
                dispatchEvent(control);
                return true;
            }
        }
        return false;
    }

    function isCountryActive(control, value) {
        return control && control.value === value;
    }
    
    function isFormActive(field) {
        return document.querySelector(field) !== null;
    }

    function getControl(controlId, address1) {
        for (var controlIndex = 0; controlIndex < _controls.length; controlIndex++) {
            if (controlId === _controls[controlIndex].controlId && _controls[controlIndex].fields.address1.id === address1) {
                return _controls[controlIndex];
            }
        }

        return undefined;
    }

    function detatchControl(control) {
        control.widget.disable();
        control.widget.destroy();

        var index = _controls.indexOf(control);
        if (index > -1) {
            _controls.splice(index, 1);
        }
    }

    function attachControl(controlId, fields) {
        var address1 = document.getElementById(fields.address1);
        if (!address1) return;

        var control = new AddyComplete(address1);
        control.fields = {
            address1: address1,
            suburb: document.getElementById(fields.suburb),
            city: document.getElementById(fields.city),
            region: document.getElementById(fields.region),
            postcode: document.getElementById(fields.postcode)
        }
        control.addressSelected = addressSelected;
        control.controlId = controlId;
        _controls.push(control);
    }

    function addressSelected(address) {
        dispatchEvent(this.fields.address1);
        dispatchEvent(this.fields.suburb);
        dispatchEvent(this.fields.city);
        dispatchEvent(this.fields.region);
        dispatchEvent(this.fields.postcode);
    }

    function dispatchEvent(control) {
        if (!control) return;
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        control.dispatchEvent(event);
    }

    function attachCss() {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://cdn.addy.co.nz/neatcomplete/2.1.0/addycomplete.min.css");
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    attachCss();
    attachForm();
    observeChanges();
}

initAddyBigCommerce();

// Browser Debugging Only:
//# sourceURL=addycomplete.js
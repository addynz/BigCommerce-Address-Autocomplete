﻿// Awesomplete - Lea Verou - MIT license
!function () { function t(t) { var e = Array.isArray(t) ? { label: t[0], value: t[1] } : "object" == typeof t && "label" in t && "value" in t ? t : { label: t, value: t }; this.label = e.label || e.value, this.value = e.value } function e(t, e, i) { for (var n in e) { var s = e[n], r = t.input.getAttribute("data-" + n.toLowerCase()); "number" == typeof s ? t[n] = parseInt(r) : !1 === s ? t[n] = null !== r : s instanceof Function ? t[n] = null : t[n] = r, t[n] || 0 === t[n] || (t[n] = n in i ? i[n] : s) } } function i(t, e) { return "string" == typeof t ? (e || document).querySelector(t) : t || null } function n(t, e) { return o.call((e || document).querySelectorAll(t)) } function s() { n("input.awesomplete").forEach(function (t) { new r(t) }) } var r = function (t, n) { var s = this; this.isOpened = !1, this.input = i(t), this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("aria-autocomplete", "list"), n = n || {}, e(this, { minChars: 2, maxItems: 10, autoFirst: !1, data: r.DATA, filter: r.FILTER_CONTAINS, sort: !1 !== n.sort && r.SORT_BYLENGTH, item: r.ITEM, replace: r.REPLACE }, n), this.index = -1, this.container = i.create("div", { className: "awesomplete", around: t }), this.ul = i.create("ul", { hidden: "hidden", inside: this.container }), this.status = i.create("span", { className: "visually-hidden", role: "status", "aria-live": "assertive", "aria-relevant": "additions", inside: this.container }), this._events = { input: { input: this.evaluate.bind(this), blur: this.close.bind(this, { reason: "blur" }), keydown: function (t) { var e = t.keyCode; s.opened && (13 === e && s.selected ? (t.preventDefault(), s.select()) : 27 === e ? s.close({ reason: "esc" }) : 38 !== e && 40 !== e || (t.preventDefault(), s[38 === e ? "previous" : "next"]())) } }, form: { submit: this.close.bind(this, { reason: "submit" }) }, ul: { mousedown: function (t) { var e = t.target; if (e !== this) { for (; e && !/li/i.test(e.nodeName) ;) e = e.parentNode; e && 0 === t.button && (t.preventDefault(), s.select(e, t.target)) } } } }, i.bind(this.input, this._events.input), i.bind(this.input.form, this._events.form), i.bind(this.ul, this._events.ul), this.input.hasAttribute("list") ? (this.list = "#" + this.input.getAttribute("list"), this.input.removeAttribute("list")) : this.list = this.input.getAttribute("data-list") || n.list || [], r.all.push(this) }; r.prototype = { set list(t) { if (Array.isArray(t)) this._list = t; else if ("string" == typeof t && t.indexOf(",") > -1) this._list = t.split(/\s*,\s*/); else if ((t = i(t)) && t.children) { var e = []; o.apply(t.children).forEach(function (t) { if (!t.disabled) { var i = t.textContent.trim(), n = t.value || i, s = t.label || i; "" !== n && e.push({ label: s, value: n }) } }), this._list = e } document.activeElement === this.input && this.evaluate() }, get selected() { return this.index > -1 }, get opened() { return this.isOpened }, close: function (t) { this.opened && (this.ul.setAttribute("hidden", ""), this.isOpened = !1, this.index = -1, i.fire(this.input, "awesomplete-close", t || {})) }, open: function () { this.ul.removeAttribute("hidden"), this.isOpened = !0, this.autoFirst && -1 === this.index && this.goto(0), i.fire(this.input, "awesomplete-open") }, destroy: function () { i.unbind(this.input, this._events.input), i.unbind(this.input.form, this._events.form); var t = this.container.parentNode; t.insertBefore(this.input, this.container), t.removeChild(this.container), this.input.removeAttribute("autocomplete"), this.input.removeAttribute("aria-autocomplete"); var e = r.all.indexOf(this); -1 !== e && r.all.splice(e, 1) }, next: function () { var t = this.ul.children.length; this.goto(this.index < t - 1 ? this.index + 1 : t ? 0 : -1) }, previous: function () { var t = this.ul.children.length, e = this.index - 1; this.goto(this.selected && -1 !== e ? e : t - 1) }, goto: function (t) { var e = this.ul.children; this.selected && e[this.index].setAttribute("aria-selected", "false"), this.index = t, t > -1 && e.length > 0 && (e[t].setAttribute("aria-selected", "true"), this.status.textContent = e[t].textContent, this.ul.scrollTop = e[t].offsetTop - this.ul.clientHeight + e[t].clientHeight, i.fire(this.input, "awesomplete-highlight", { text: this.suggestions[this.index] })) }, select: function (t, e) { if (t ? this.index = i.siblingIndex(t) : t = this.ul.children[this.index], t) { var n = this.suggestions[this.index]; i.fire(this.input, "awesomplete-select", { text: n, origin: e || t }) && (this.replace(n), this.close({ reason: "select" }), i.fire(this.input, "awesomplete-selectcomplete", { text: n })) } }, evaluate: function () { var e = this, i = this.input.value; i.length >= this.minChars && this._list.length > 0 ? (this.index = -1, this.ul.innerHTML = "", this.suggestions = this._list.map(function (n) { return new t(e.data(n, i)) }).filter(function (t) { return e.filter(t, i) }), !1 !== this.sort && (this.suggestions = this.suggestions.sort(this.sort)), this.suggestions = this.suggestions.slice(0, this.maxItems), this.suggestions.forEach(function (t) { e.ul.appendChild(e.item(t, i)) }), 0 === this.ul.children.length ? this.close({ reason: "nomatches" }) : this.open()) : this.close({ reason: "nomatches" }) } }, r.all = [], r.FILTER_CONTAINS = function (t, e) { return RegExp(i.regExpEscape(e.trim()), "i").test(t) }, r.FILTER_STARTSWITH = function (t, e) { return RegExp("^" + i.regExpEscape(e.trim()), "i").test(t) }, r.SORT_BYLENGTH = function (t, e) { return t.length !== e.length ? t.length - e.length : t < e ? -1 : 1 }, r.ITEM = function (t, e) { return i.create("li", { innerHTML: "" === e.trim() ? t : t.replace(RegExp(i.regExpEscape(e.trim()), "gi"), "<mark>$&</mark>"), "aria-selected": "false" }) }, r.REPLACE = function (t) { this.input.value = t.value }, r.DATA = function (t) { return t }, Object.defineProperty(t.prototype = Object.create(String.prototype), "length", { get: function () { return this.label.length } }), t.prototype.toString = t.prototype.valueOf = function () { return "" + this.label }; var o = Array.prototype.slice; i.create = function (t, e) { var n = document.createElement(t); for (var s in e) { var r = e[s]; if ("inside" === s) i(r).appendChild(n); else if ("around" === s) { var o = i(r); o.parentNode.insertBefore(n, o), n.appendChild(o) } else s in n ? n[s] = r : n.setAttribute(s, r) } return n }, i.bind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.addEventListener(e, n) }) } }, i.unbind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.removeEventListener(e, n) }) } }, i.fire = function (t, e, i) { var n = document.createEvent("HTMLEvents"); n.initEvent(e, !0, !0); for (var s in i) n[s] = i[s]; return t.dispatchEvent(n) }, i.regExpEscape = function (t) { return t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&") }, i.siblingIndex = function (t) { for (var e = 0; t = t.previousElementSibling; e++); return e }, "undefined" != typeof Document && ("loading" !== document.readyState ? s() : document.addEventListener("DOMContentLoaded", s)), r.$ = i, r.$$ = n, "undefined" != typeof self && (self.Awesomplete = r), "object" == typeof module && module.exports && (module.exports = r) }();
// AddyComplete - https://www.addy.co.nz
function AddyUrlSettingFactory(e) { function s(e) { e = e.replace(/[\[\]]/g, "\\$&"); var s = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t); return s ? s[2] ? decodeURIComponent(s[2].replace(/\+/g, " ")) : "" : null } this.createOptions = function () { var e = {}; return e.ignoreKeys = [38, 40, 13], e.excludePostBox = s("excludePostBox") || !1, e.nzCountryValue = s("nzCountryValue") || "NZL", e }, this.createConfig = function () { var e = {}; return e.key = s("key"), e.key && "" != e.key || console.warn("The API key is missing"), e.maxItems = s("maxItems") || 10, e.debounceMs = s("debounceMs") || 250, e }, this.createCallback = function () { var e = s("callback"); return e && "function" == typeof window[e] ? e : null }; var t = function () { var s = document.getElementsByTagName("script"); e = e.toLowerCase(); for (var t = 0; t < s.length; t++) if (s[t].src && -1 !== s[t].src.toLowerCase().indexOf(e)) return s[t].src; return console.warn("Script source not found. Name: ", e), "" }() } function AddyComplete(e, s) { function t(e, s) { var t = new XMLHttpRequest; t.open("GET", e, !0), t.onload = function () { var e = JSON.parse(t.responseText); s(e) }, t.setRequestHeader("addy-api-key", i.key), t.send() } if (e) { var n = this; n.urlBase = "https://www.addy.co.nz/", n.fields = s || {}, n.options = addySettingsFactory.createOptions(); var i = addySettingsFactory.createConfig(); n.awesomplete = new Awesomplete(e, { maxItems: i.maxItems, minChars: 3, autoFirst: !0, sort: !1 }), n.awesomplete.filter = function () { return !0 }, this.setAddress = function (e) { n.fields.address && (n.fields.address.value = e.displayline), n.fields.suburb && (n.fields.suburb.value = e.suburb), n.fields.city && (n.fields.city.value = e.city), n.fields.region && (n.fields.region.value = e.region), n.fields.postcode && (n.fields.postcode.value = e.postcode), n.fields.line1 && (n.fields.line1.value = e.address1), n.fields.line2 && (n.fields.line2.value = e.address2), n.fields.line3 && (n.fields.line3.value = e.address3), n.fields.line4 && (n.fields.line4.value = e.address4), !n.fields.city && n.fields.suburb && "" === e.suburb && "" !== e.city && (n.fields.suburb.value = e.city), n.fields.address1 && n.fields.address2 && (e.address4 || 0 === e.address2.indexOf("RD ") ? (n.fields.address1.value = e.address1, n.fields.address2.value = e.address2) : (n.fields.address1.value = e.displayline, n.fields.address2.value = "")) }, e.onkeyup = function (e, s) { var t; return function () { var n = this, i = arguments; clearTimeout(t), (t = setTimeout(function () { t = null, e.apply(n, i) }, s)) || e.apply(n, i) } }(function (e) { -1 !== n.options.ignoreKeys.indexOf(e.keyCode) || this.value.length < n.awesomplete.minChars || (n.fields.country && this.fields.country.options[n.fields.country.selectedIndex].value !== n.options.nzCountryValue ? n.awesomplete.list = [] : t(n.urlBase + "api/search?expostbox=" + n.options.excludePostBox + "&max=" + n.awesomplete.maxItems + "&s=" + this.value, function (e) { n.awesomplete.list = e.addresses.map(function (e) { return { label: e.a, value: e.id } }) })) }, i.debounceMs), e.addEventListener("awesomplete-selectcomplete", function (e) { t(n.urlBase + "api/address/" + e.text.value, function (e) { this.setAddress(e) }.bind(this)) }.bind(this), !1) } else console.warn("Input field is missing") } var addySettingsFactory = new AddyUrlSettingFactory("addycomplete"), addyInitCallback = addySettingsFactory.createCallback(); addyInitCallback && window[addyInitCallback]();

// bigcommerce Plug-in
function initAddyBigCommerce() {

    function observeChanges() {
        if (!window.MutationObserver) return;
        
        var observer = new MutationObserver(function (mutations) {
            if (containsAutocompleteChanges(mutations)) {
                return;
            } else {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(attachForm, 600);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function containsAutocompleteChanges(mutations) {
        return mutations.find(function (m) {
            return (m.target && m.target.parentNode && m.target.parentNode.className && m.target.parentNode.className === "awesomplete");
        });
    }

    function attachForm() {
        console.log("attachForm");

        // Add billing autocomplete
        if (document.getElementById(("CheckoutStepBillingAddress"))) {
            var billingField = document.getElementById("FormField_8");

            if (billingField) {
                var addyBilling = new AddyComplete(billingField);
                addyBilling.fields = {
                    address1: billingField,
                    address2: document.getElementById("FormField_9"),
                    suburb: document.getElementById("FormField_10"),
                    region: document.getElementById("FormField_12"),
                    postcode: document.getElementById("FormField_13")
                }
            }
        }

        // Add shipping autocomplete
        if (document.getElementById("CheckoutStepShippingAddress")) { 
            var addyShipping = new AddyComplete(document.getElementById("FormField_18"));
            addyShipping.fields = {
                address1: document.getElementById("FormField_18"),
                address2: document.getElementById("FormField_19"),
                suburb: document.getElementById("FormField_20"),
                region: document.getElementById("FormField_22"),
                postcode: document.getElementById("FormField_23")
            }
        }
    }

    function attachCss() {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://addycdn.azureedge.net/autocomplete/2.1.1/addycomplete.min.css");
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    attachCss();
    observeChanges();
}

initAddyBigCommerce();
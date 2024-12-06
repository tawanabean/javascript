/**
 * @author Tawana
 * 
 * Copyright 2011, Tawana Bean
 *
 * @date : Nov 15, 2021 
 */

"use strict";

var util = function(args) {
    var _this = this;

    _this.defaults = {};
    _this.metasettings = {}
    _this.args = (arguments.length > 0) ? args : null;
    _this.fcnset = (args != null && (typeof args == "object" || typeof args == "Object")) ? true : false;

    if (_this.fcnset) {
        _this.maps = $.extend(_this.defaults, args);
        _this.items = _this.maps.items;
    }

    _this._this = _this;

    util.prototype.zeros = function(num_zeroes) {
        var __zeroe__ = "";

        for (var pzero = 0; pzero < num_zeroes; pzero++) {

            __zeroe__ += "0";

        }

        return __zeroe__;
    }

    util.prototype.isobject = function(obj) {

        return (typeof obj != "undefined" && typeof obj != null && typeof obj != "null" && obj != null && typeof obj != "NaN" && typeof obj != NaN);
    }

    util.prototype.isvalue = function(obj) {

        return (typeof obj != "undefined" && typeof obj != null && typeof obj != "null" && obj != null && typeof obj != "NaN" && typeof obj != NaN);
    }

    util.prototype.derefarray = function(obj, defaultvalue) {
        var __obj = [];
        var objhere = null;

        if (_this.isvalue(obj)) {
            objhere = obj;
        } else if (arguments.length > 1) {
            objhere = defaultvalue;
        }

        var __typeofobject = (typeof obj) + "";
        __typeofobject = __typeofobject.toLowerCase();

        if (objhere != null) {
            if (__typeofobject == "object" || __typeofobject == "function") {
                if (objhere instanceof Array) {
                    for (var x = 0; x < objhere.length; x++) {
                        __obj.push(objhere[x]);
                    }
                }
            }
        }

        return __obj;
    }

    util.prototype.derefarraytojson = function(obj, defaultvalue) {
        var __obj = {};
        var objhere = null;

        if (_this.isvalue(obj)) {
            objhere = obj;
        } else if (arguments.length > 1) {
            objhere = defaultvalue;
        }

        var __typeofobject = typeof obj;
        __typeofobject += "";
        __typeofobject = __typeofobject.toLowerCase();

        if (objhere != null) {
            __obj = {};

            if (__typeofobject == "object" || __typeofobject == "function") {
                for (var __x = 0; __x < objhere.length; __x++) {
                    for (var x in objhere[__x]) {
                        __obj[x] = objhere[__x][x];
                    }
                }
            }
        }


        return __obj;
    }

    util.prototype.derefjson = function(obj, defaultvalue) {
        var __obj = {};
        var objhere = null;

        if (_this.isvalue(obj)) {
            objhere = obj;
        } else if (arguments.length > 1) {
            objhere = defaultvalue;
        }

        var __typeofobject = typeof obj;
        __typeofobject += "";
        __typeofobject = __typeofobject.toLowerCase();

        if (objhere != null) {
            __obj = {};

            if (__typeofobject == "object" || __typeofobject == "function") {
                for (var x in objhere) {
                    __obj[x] = objhere[x];
                }
            }
        }


        return __obj;
    }

    var regexp_period = /\./gmi; //Identify more than one period
    var regexp_fslash = /\//gmi; //Identify more than forward slash
    var regexp_numeric = /([\-\+])*([\d\.])*/gmi; //Identify is numeric	
    var regexp_date = /\d{1,2}\/\d{1,2}\/\d{4}/gmi; //Identify is date	

    util.prototype.isnumber = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? false : defaultvalue;

        if (_this.isvalue(obj)) {

            //Identify more than one period

            var myregexp1 = new RegExp(new String(regexp_period + ""), "gim");

            var str = obj + "";

            var strperiod = str.match(myregexp1);
            if (_this.isvalue(strperiod)) {

                if (strperiod.length > 1) {
                    return defval;
                }

            }

            //Identify numeric			

            var myregexp = regexp_numeric;
            var strnumeric = str.match(myregexp);

            if (_this.isvalue(strnumeric)) {

                return (strnumeric.join("").length > 0);

            }

        }

        return defval;
    }

    util.prototype.isdate = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? false : defaultvalue;

        if (_this.isvalue(obj)) {

            //Identify forward slash	

            var str1 = obj + "";

            var myregexp1 = regexp_fslash;
            var strfslash = str1.match(myregexp1);

            if (_this.isvalue(strfslash)) {

                var lenslash = strfslash.length;

                //Identify date	

                if (lenslash == 2) {

                    var str2 = obj + "";

                    var myregexp2 = regexp_date;
                    var strdate = str2.match(myregexp2);

                    if (_this.isvalue(strdate)) {

                        var __str__ = strdate.join("");

                        if (__str__.length > 0) {

                            return (__str__.length <= 10 && __str__.length >= 8);

                        }

                    }

                }

            }

        }

        return defval;
    }

    util.prototype.isstring = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? false : defaultvalue;

        if (_this.isvalue(obj)) {

            //Identify string			

            var str = obj + "";

            return (str != "");

        }

        return defval;
    }

    util.prototype.getNumberString = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? "" : defaultvalue;

        if (_this.isvalue(obj)) {

            //Identify number	

            if (_this.isnumber(obj)) {

                var str = obj + "";

                var myregexp = regexp_numeric;
                var strnumeric = str.match(myregexp);

                if (_this.isvalue(strnumeric)) {

                    var __str__ = strnumeric;

                    if (__str__.length > 0) {

                        var newstr = (__str__.join(""));

                        if (newstr != defval) {

                            return newstr;

                        }

                    }

                }

            }

            return defval;
        }

        return defval;
    }

    util.prototype.getNumber = function(obj, defaultvalue) {
        var _defaultvalue = 0;

        if (this.isvalue(defaultvalue)) {
            _defaultvalue = defaultvalue;
        }

        return (new Number(_this.getNumberString(obj, defaultvalue))).valueOf();

    }

    util.prototype.getDateString = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? "" : defaultvalue;

        if (_this.isvalue(obj)) {

            //Identify date

            if (_this.isdate(obj)) {

                var str = obj + "";

                var myregexp = regexp_date;
                var strdate = str.match(myregexp);

                if (_this.isvalue(strdate)) {

                    var __str__ = strdate;

                    if (__str__.length > 0) {

                        var newstr = (__str__.join(""));

                        if (newstr != defval) {

                            return newstr;

                        }

                    }

                }

            }

            return defval;
        }


        return defval;
    }

    util.prototype.getDate = function(obj, defaultvalue) {
        var _defaultvalue = new Date();

        if (this.isdate(defaultvalue)) {
            _defaultvalue = defaultvalue;
        }

        return new Date(_this.getDateString(obj, _defaultvalue));

    }

    util.prototype.ltrim = function(str) {

        var __str = _this.getvariables(str + "");

        var __reg__ = new RegExp("/^(\s*)/", "gim");

        return __str.replace(__reg__, "");

    }

    util.prototype.rtrim = function(str) {

        var __str = _this.getvariables(str + "");

        var __reg__ = new RegExp("/(\s*)$/", "gim");

        return __str.replace(__reg__, "");

    }

    util.prototype.trim = function(str) {

        return _this.ltrim(_this.rtrim(str));

    }

    util.prototype.getString = function(obj, defaultvalue) {

        return _this.trim(_this.getvariables(obj, defaultvalue));

    }

    util.prototype.getvariables = function(obj, defaultvalue) {

        var defval = (arguments.length == 1) ? false : defaultvalue;

        if (_this.isvalue(obj)) {
            return obj;
        }

        return defval;
    }

    util.prototype.getuniquetime = function() {
        var time = new Date().getTime();

        //while (time == new Date().getTime());

        return new Date().getTime();
    }

    util.prototype.__id = 0;

    util.prototype.__idqueue = new Collection();

    util.prototype.getID = function() {
        var obj = this;

        var idhere = new Date().getTime();

        var objhere = obj.__idqueue.popFromQueue(function() {
            obj.__id++;
        });

        return obj.__id;
    }

    util.prototype.val = function(sethere) {

    }

    util.prototype.getJSONVal = function(key, val) {
        var str = escape(encodeURIComponent(val));
        return str;
    }

    util.prototype.getDecodeURIVal = function(key, val) {
        var str = unescape(decodeURIComponent(val));
        return str;
    }

    util.prototype.setDataAsString = function(data, dlm) {
        var querys = "";
        var delim = (typeof dlm != "undefined") ? dlm : "&";

        for (var key in data) {
            var val = data[key];

            querys += key + "=" + val + delim;
        }

        if (querys != "") {
            querys = querys.substring(0, querys.lastIndexOf(delim));
        }

        return querys;
    }

    util.prototype.getAllFormData = function(data, _isdecode) {

        var _this = this;


        var str = "";

        var __delim__ = " || ";
        var __delim__01__ = "\^\\#\\#\$";
        var __delim__02__ = "\\\|\\\|\\\s*\$";

        var frm = document;

        var frmid = _this.getvariables(data["id"], {});
        var data = _this.getvariables(data["getAllFormData"], {});
        var isdecode = _this.getvariables(_isdecode, false);

        //type = text|password|checkbox|radio|submit|reset|file|hidden|image|button|select|textarea

        if (frmid != "") {
            var frm = document.forms[frmid];

            if (typeof frm != "undefined") {

                for (var i = 0; i < frm.elements.length; i++) {
                    var elem = frm.elements[i];
                    var stype = (new String(elem.type + "")).toLowerCase();
                    var sname = (new String(elem.name + "")).toLowerCase();
                    var sid = (new String(elem.id + "")).toLowerCase();
                    var keys = ((sname != "") ? sname : sid);
                    var vals = "";

                    switch (stype) {
                        case "text":
                        case "password":
                        case "submit":
                        case "reset":
                        case "file":
                        case "hidden":
                        case "button":
                        case "textarea":
                            var $val = elem.value;

                            data[keys] = $val;

                            break;
                        case "checkbox":
                        case "radio":
                            if (keys != "" && elem.checked) {
                                var $val = elem.value;

                                if (!isdecode) {
                                    vals = _this.getJSONVal(keys, $val);
                                } else {
                                    vals = _this.getDecodeURIVal(keys, $val);
                                }

                                data[keys] = vals;
                            }

                            break;
                        case "select":
                        case "select-one":
                            var $val = "";

                            for (var y = 0; y < elem.options.length; y++) {
                                var opt = elem.options[y];

                                if (opt.selected) {
                                    //var re1 = new RegExp("\/\^\\#\\#\$\/gi");

                                    var re1 = new RegExp(new String(__delim__01__ + ""), "gim");

                                    var __val__ = (opt.value + "").replace(re1, __delim__);
                                    __val__ += __delim__;

                                    var re2 = new RegExp(new String(__delim__02__ + ""), "gim");

                                    __val__ = __val__.replace(re2, "");

                                    $val += __val__;
                                }
                            }

                            if ($val != "") {
                                data[keys] = $val;
                            }
                            break;

                        default:

                            break;

                    }
                }
            }
        }


        return data;

    }

    util.prototype.setSelectorText = function(selStr) {
        var str = selStr + "";
        return escape(str.replace(/\s+/gi, "")).replace(/\%/gi, "").replace(/\@/gi, "");
    }

    util.prototype.loadDocument = function loadDocument(method, strurl, isasync, responsetype, callback, params) {

        alert(strurl);

        var _this = this;

        var xhttp = null;

        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhttp.onload = function() {

            let status = xhttp.status;

            let returnparams = {
                status: status,
                params: params,
                response: xhttp.response
            };

            if (_this.isvalue(callback)) {

                callback(returnparams);

            }

        }

        xhttp.open(method, strurl, isasync);

        xhttp.send();

    }

};
/**
 * @author Tawana
 * 
 * Copyright 2011, Tawana Bean
 *
 * @date : Jan 2, 2012 
 */

"use strict";

var uiwidget = function(selector, context) {
    this._this = this;

    this.selector = selector;

    this.util = new util();

    this.selectionarray = new Array();
    this.queryarray = new Array();
    this.currentselection = new Array();

    if (arguments.length == 2) {
        this.context = context;
    } else {
        this.context = document;
    }

    this.debughere = "";
    this.debug = false;

    uiwidget.prototype.getlist = function() {

        for (var x = 0; x < querylist.length; x++) {
            this.currentselection.push(this.queryarray[x]);
        }

        return this;
    }

    uiwidget.prototype.eq = function(index) {
        var _this = this._this;

        _this.currentselection = new Array();

        if (_this.util.isvalue(_this.queryarray)) {
            var __max__index__ = 0;
            var __index__ = 0;

            for (var x = 0; x < _this.queryarray.length; x++) {
                for (var y = 0; y < _this.queryarray[x].length; y++) {
                    __max__index__ += _this.queryarray[x][y].length;

                    if (index < __max__index__) {
                        for (var z = 0; z < _this.queryarray[x][y].length; z++) {
                            if (index == __index__) {
                                _this.currentselection.push(_this.queryarray[x][y][z]);
                                break;
                            }

                            __index__++;
                        }
                    }
                }
            }
        }

        return _this;

    }

    uiwidget.prototype.addClass = function(objitem, classname) {
        var _this = this._this;

        if (_this.util.isvalue(objitem)) {
            if (arguments.length == 2 || _this.util.isvalue(classname)) {
                var _classname = _this.util.getvariables(objitem["className"], "");

                var myregexp = eval("\/\\s*" + _classname.replace("_", "\\_") + "\/gi");

                _classname = _classname.replace(myregexp, "");
                _classname += (" " + classname + " ");

                objitem["className"] = _classname;
            } else if (_this.util.isvalue(_this.currentselection)) {
                for (var x = 0; x < _this.currentselection.length; x++) {
                    _this.addClass(_this.currentselection[x], objitem);
                }
            }
        }

        return _this;
    }

    uiwidget.prototype.hideClass = function(objitem, classname) {
        var _this = this._this;

        if (_this.util.isvalue(objitem)) {
            if (arguments.length == 2 || _this.util.isvalue(classname)) {
                var _classname = _this.util.getvariables(objitem["className"], "");

                var myregexp = eval("\/\\s*" + _classname.replace("_", "\\_") + "\/gi");

                _classname = _classname.replace(myregexp, "");

                objitem["className"] = _classname;
            } else if (_this.util.isvalue(_this.currentselection)) {
                for (var x = 0; x < _this.currentselection.length; x++) {
                    _this.hideClass(_this.currentselection[x], objitem);
                }
            }
        }

        return _this;
    }

    uiwidget.prototype.setHtml = function(objdata, fcn, _ref_) {
        var _this = this._this;

        if (this.debug) {

            this.debughere += ("uiwidget setHtml objdata: " + objdata + "<br/>");
            this.debughere += ("uiwidget setHtml this.selectionarray: " + this.selectionarray + "<br/>");
            this.debughere += ("uiwidget setHtml ( typeof fcn == 'function'): " + (typeof fcn == "function") + "<br/>");

        }

        var objcontent = _this.selectionarray;

        if (typeof fcn == "function") {
            var x = fcn(_this, objdata, objcontent, _ref_);

            return x;
        }
    }

    uiwidget.prototype.init = function() {
        this._this = this;

        if (this.debug) {

            this.debughere += ("uiwidget init: " + this + "<br/>");

        }

        var objdebughere = { strparse__01: "" };

        this.objdebughere = objdebughere;

        this.getNodes();

    }

    //PRIVATE METHOD

    uiwidget.prototype.prevcharhere = function(currentstring, character) {

        if (this.debug) {

            this.debughere += "uiwidget: prevcharhere currentstring " + currentstring + "\n";
            this.debughere += "uiwidget: prevcharhere character " + character + "\n";

        }

        var indexat = currentstring.lastIndexOf(character);
        var prevchar = "";

        if (indexat > 0) {
            prevchar = currentstring.charAt(indexat - 1);
        } else if (indexat == 0) {
            prevchar = currentstring.charAt(0);
        } else {
            prevchar = ""
        }

        return prevchar;
    }

    //PRIVATE METHOD

    uiwidget.prototype.append = function(currentstring, character) {

        if (this.debug) {

            this.debughere += "uiwidget: append currentstring " + currentstring + "\n";
            this.debughere += "uiwidget: append character " + character + "\n";

        }

        var _this = this._this;

        var prevcharacter = _this.prevcharhere(currentstring, character);

        if (character == " " || character == ",") {
            return false;
        } else if (prevcharacter == " " || prevcharacter == ",") {
            return false;
        }

        return true;
    }

    //PRIVATE METHOD

    uiwidget.prototype.selection = function() {
        var _this = this._this;

        if (this.debug) {

            this.debughere += "uiwidget: selection _this " + _this + "\n";

        }

        var selHere = _this.selector.toString();
        var selHereArray = selHere.split(",");

        var selarray_sub = new Array();

        for (var _index_ = 0; _index_ < selHereArray.length; _index_++) {

            var stringarray = (selHereArray[_index_].replace(/^\s*/gi, "").replace(/(.)/gi, "$1|").split("|"));

            var selarray_sub_index = _index_;

            var selarray = new Array();
            var subsel = new Array();

            var selectionhere = "";
            var currentstring = ""

            var charattribute = false;

            var period = false;
            var sharp = false;
            var attribute = false;
            var tagname = false;

            for (var x = 0; x < stringarray.length; x++) {
                var __append = false;

                var charhere = stringarray[x];
                var currentstring = currentstring + charhere;

                var nextcharhere = stringarray[x + 1];
                var prevcharhere = stringarray[x - 1];

                if (charhere == "." || charhere == "#") {
                    if (!charattribute) {
                        if (subsel.length > 0) {
                            selectionhere = subsel.join("");
                            selector = true;
                        }

                        if (currentstring.length < selHere.length) {
                            __append = _this.append(_this.util.trim(currentstring), charhere);
                        }

                        subsel = new Array();
                    }
                } else if (charhere == "[" || charhere == "@" || charhere == "]") {
                    charattribute = true;

                    if (currentstring.length < selHere.length) {
                        __append = _this.append(_this.util.trim(currentstring), nextcharhere);
                    }

                    if (subsel.length > 0) {
                        selectionhere = subsel.join("");
                        selector = true;
                    }

                    subsel = new Array();
                } else if ((charattribute && charhere == "|" && nextcharhere == "|") ||
                    (charattribute && charhere == "&" && nextcharhere == "&")) {

                    charattribute = true;

                    if (currentstring.length < selHere.length) {
                        __append = _this.append(_this.util.trim(currentstring), charhere);
                    }

                    if (subsel.length > 0) {
                        selectionhere = subsel.join("");
                        selector = true;
                    }

                    subsel = new Array();
                } else if (charhere != " ") {

                    if (nextcharhere != " ") {
                        subsel.push(charhere);
                        selector = false;
                    } else {
                        if (subsel.length > 0) {

                            if (charhere != " " && charhere != ",") {
                                subsel.push(charhere);
                            } else {
                                selarray_sub_index++;
                            }

                            selectionhere = subsel.join("");
                            selector = true;

                            subsel = new Array();

                        }
                    }
                }

                if (currentstring.length - 1 == x - 1) {
                    selectionhere = subsel.join("");
                    selector = true;
                }

                if (selector) {
                    if (selectionhere.length > 0) {
                        var lastselection = (selarray.length == 0) ? "" : selectionhere;
                        var review = "";

                        if (lastselection == "") {
                            review = currentstring.charAt(0);
                        } else {
                            review = currentstring.charAt(currentstring.lastIndexOf(selectionhere) - 1);
                        }

                        var objsel = {};

                        if (review == ".") {
                            objsel.type = "class";
                            period = true;
                        } else if (review == "#") {
                            objsel.type = "id";
                            sharp = true;
                        } else if (review == "@") {
                            objsel.type = "attribute";
                            attribute = true;
                        } else {
                            objsel.type = "tagname";
                            tagname = true;
                        }

                        objsel.append = __append;
                        objsel.selector = selectionhere;

                        selarray.push(objsel);

                    }

                    selector = false;

                }

            }

            selarray_sub.push(selarray);

        }

        return selarray_sub;

    }

    //PRIVATE METHOD

    uiwidget.prototype.hasAttributesRules = function(attr_key, attr_value, curr_attr_key, curr_attr_value, character) {

        if (this.debug) {

            this.debughere += ("uiwidget hasAttributesRules attr_key: " + attr_key + "\n");
            this.debughere += ("uiwidget hasAttributesRules attr_value: " + attr_value + "\n");
            this.debughere += ("uiwidget hasAttributesRules curr_attr_key: " + curr_attr_key + "\n");
            this.debughere += ("uiwidget hasAttributesRules curr_attr_value: " + curr_attr_value + "\n");
            this.debughere += ("uiwidget hasAttributesRules character: " + character + "\n");

        }

        /**
        *
        ! - NOT
        ^ - BEGINNING
        $ - END
        ~ - WORD
        * - SUBSTRING
        *
        **/
        var ismatched = false;

        if (attr_key == curr_attr_key) {

            ismatched = ismatched || true;

            if (character == '!') {
                if (attr_value == curr_attr_value) {
                    ismatched = ismatched && false;
                }
            } else if (character == '^') {
                if (curr_attr_value.indexOf(attr_value) != 0) {
                    ismatched = ismatched && false;
                }
            } else if (character == '$') {
                if (curr_attr_value.lastIndexOf(attr_value) != curr_attr_key.length - 1) {
                    ismatched = ismatched && false;
                }
            } else if (character == '~') {

                var words = curr_attr_value.replace(/\s+/, " ").split(" ");

                ismatched = ismatched && false;

                if (typeof words == "object" && words.length > 0) {

                    for (keys in words) {
                        if (words[keys].toLowerCase() == attr_value) {
                            ismatched = ismatched && true;

                        }
                    }
                }

            } else if (character == '*') {
                if (curr_attr_value.indexOf(attr_value) < 0) {
                    ismatched = ismatched && false;
                }
            } else if (character == "") {

                if (attr_value != "") {

                    if (attr_value == curr_attr_value) {
                        ismatched = ismatched && true;
                    }

                }

            }

        }

        return ismatched;
    }

    //PRIVATE METHOD

    uiwidget.prototype.hasCssRules = function(sel, attr) {

        if (this.debug) {

            this.debughere += ("uiwidget hasCssRules sel: " + sel + "\n");
            this.debughere += ("uiwidget hasCssRules attr: " + attr + "\n");

        }

        var selection = sel.toLowerCase();

        var attribute = "";
        var index = -1;
        var len = 0;

        if (attr) {
            attribute = attr.toLowerCase();
            index = attribute.indexOf(selection);
            len = attribute.length;
        }

        var sel_len = selection.length;

        if (index < 0) {
            return false;
        }

        if (selection == attribute) {
            return true;
        } else if (len > sel_len) {
            var parse_len = len;

            for (var x = 0; x < parse_len;) {
                var review = attribute.indexOf(selection, x);

                if (x < parse_len && attribute.charAt(review + sel_len) == "" || attribute.charAt(review + sel_len) == " " || attribute.charAt(review + sel_len) == "." || attribute.charAt(review + sel_len) == "#") {
                    return true;
                }

                if (x > parse_len || review < 0) {
                    return false;
                }
                x = review + sel_len + 1;
            }
        }

        return false;

    }

    //PRIVATE METHOD

    uiwidget.prototype.hasSelection = function(sel, attr) {

        if (this.debug) {

            this.debughere += ("uiwidget hasSelection sel: " + sel + "\n");
            this.debughere += ("uiwidget hasSelection attr: " + attr + "\n");

        }

        var selection = sel.toLowerCase();
        var attribute = attr.toLowerCase();

        var index = attribute.indexOf(selection);
        var len = attribute.length;
        var sel_len = selection.length;

        if (index < 0) {
            return false;
        }

        if (selection == attribute) {
            return true;
        } else if (len > sel_len) {
            var parse_len = len;

            for (var x = 0; x < parse_len;) {
                var review = attribute.indexOf(selection, x);

                if (attribute.charAt(review + sel_len) == "" || attribute.charAt(review + sel_len) == " ") {
                    return true;
                }

                if (x > parse_len || review < 0) {
                    return false;
                }
                x = review + sel_len + 1;
            }
        }

        return false;
    }

    //PRIVATE METHOD

    uiwidget.prototype.getSelection = function(content, comp) {

        var _this = this;

        var strparse = "";

        var sel_selector = comp["selector"];
        var sel_type = comp["type"];
        var sel_append = comp["append"];

        var tagName = _this.util.getvariables(content["tagName"], false);

        var __tagName__ = _this.util.getvariables(content["id"], false);

        var attr = false;
        var hassel = false;
        var selection = tagName;

        if (sel_type == "class") {

            attr = _this.util.getvariables(content["classList"], false);

            if (attr) {
                for (var x = 0; x < attr.length; x++) {
                    hassel = hassel || _this.hasCssRules(sel_selector, attr[x]);
                }
            } else {
                attr = _this.util.getvariables(content["className"], false);

                if (attr) {
                    attr = _this.util.getvariables(attr.split(" "), false);

                    if (attr) {
                        for (var x = 0; x < attr.length; x++) {
                            hassel = hassel || _this.hasCssRules(sel_selector.replace(/^\s*([\S\s]*?)\s*$/, '$1'), attr[x]);
                        }
                    }
                }
            }

            selection = _this.util.getvariables(content["className"], false);

        } else if (sel_type == "id") {

            attr = _this.util.getvariables(content["id"], false);

            if (attr) {
                hassel = _this.hasCssRules(sel_selector, attr);
                hassel &= (attr.length == sel_selector.length); //EXACT MATCH
            }

            selection = attr;

        } else if (sel_type == "attribute") {

            var ismatched = false;
            var attrlist = [];
            var attr_array = sel_selector.split("=");

            var attr_key = "";
            var attr_value = "";
            var character = "";

            if (typeof attr_array == "object") {
                attr_key = attr_array[0];
                attr_key = attr_key.replace(/$\s+/, "");
                attr_key = attr_key.toLowerCase();

                if (attr_array.length == 2) {
                    attr_value = attr_array[1];
                    attr_value = attr_value.replace(/$\s+/, "");
                    attr_value = attr_value.toLowerCase();

                    character = attr_key[attr_key.length - 1];
                }
            }

            if (typeof content.attributes != "undefined" && content.attributes != null && content.attributes != "null") {

                selection = content.attributes;

                for (var x = 0; x < content.attributes.length; x++) {

                    var curr_attr = content.attributes[x];
                    var curr_attr_array = curr_attr;

                    var curr_attr_key = "";
                    var curr_attr_value = "";

                    if (typeof curr_attr == "object") {

                        curr_attr_key = curr_attr["name"];
                        curr_attr_key = curr_attr_key.replace(/$\s+/, "");
                        curr_attr_key = curr_attr_key.toLowerCase();

                        if (attr_value != "") {
                            curr_attr_value = curr_attr["value"];
                            curr_attr_value.replace(/$\s+/, "");
                            curr_attr_value = curr_attr_value.toLowerCase();
                        }

                    }

                    ismatched = ismatched || _this.hasAttributesRules(attr_key, attr_value, curr_attr_key, curr_attr_value, character);

                }
            }

            hassel = ismatched;

        } else if (sel_type == "tagname") {
            hassel = _this.hasCssRules(sel_selector, tagName);
        }

        if (this.debug) {
            strparse += (" ");
            strparse += ("uiwidget hasCssRules (" + hassel + "); " + "<br/>");
            strparse += ("uiwidget selectionType (" + sel_type + "); " + "<br/>");
            strparse += ("uiwidget selection (" + selection + "); " + "<br/>");
            strparse += (" ");

            document.write("<br/>");
            document.write(strparse);
            document.write("<br/>");
        }

        return {
            hasSelection: hassel,
            selectionType: sel_type,
            selection: selection
        };
    }

    //PRIVATE METHOD

    uiwidget.prototype.getSelectionAppend = function(content, append, indextype) {

        if (this.debug) {

            this.debughere += ("uiwidget getSelectionAppend context: " + context + "<br/>");
            this.debughere += ("uiwidget getSelectionAppend append: " + append + "\n");
            this.debughere += ("uiwidget getSelectionAppend indextype: " + indextype + "\n");

        }

        var _this = this._this;

        //Review the appended css
        var curr_index = indextype;
        var objarray = _this.selectorarray;
        var y = indextype + 1;

        while (y < objarray.length) {

            var comp = _this.util.getvariables(objarray[y], false);

            if (comp) {

                var sel_selector = comp["selector"];
                var sel_type = comp["type"];
                var sel_append = comp["append"];

                if (append || sel_type == "attribute" && sel_append == false && append == true) {

                    var hassel = _this.getSelection(content, comp).hasSelection;

                    if (hassel) {
                        curr_index = y;
                    } else {
                        break;
                    }

                    append = sel_append;

                }

            } else {

                break;

            }
            y++;

        }

        return {
            indextype: curr_index,
            append: append
        };

    }

    //PRIVATE METHOD

    uiwidget.prototype.parseNodesAddToArray = function(_queryarray, _selectionarray, curr_content, comparray, comparray_params) {

        var _this = this._this;

        var query_array_index = _this.util.getvariables(comparray_params["comp_query_index"], 0);
        var sel_array_index = _this.util.getvariables(comparray_params["comp_sel_index"], 0);
        var sel_array_index_max = _this.util.getvariables(comparray_params["comp_sel_index_max"], 0);

        if (typeof comparray != "undefined") {
            _queryarray = _this.util.getvariables(this.queryarray, []);
            _queryarray[query_array_index] = _this.util.getvariables(_queryarray[query_array_index], []);
            _queryarray[query_array_index][0] = _this.util.getvariables(_queryarray[query_array_index][0], []);
            _queryarray[query_array_index][0].push(curr_content);

            if (sel_array_index <= sel_array_index_max) {
                if (sel_array_index == (comparray.length - 1)) {
                    _selectionarray = _this.util.getvariables(this.selectionarray, []);
                    _selectionarray[query_array_index] = _this.util.getvariables(_selectionarray[query_array_index], []);
                    _selectionarray[query_array_index][0] = _this.util.getvariables(_selectionarray[query_array_index][0], []);
                    _selectionarray[query_array_index][0].push(curr_content);
                }
            }

            if ((sel_array_index + 1) < comparray.length) {
                sel_array_index++;
            }

            comparray_params["comp_sel_index"] = sel_array_index;

        } else {
            var strerr = "";
        }
    }

    //PRIVATE METHOD

    uiwidget.prototype.parseNodes = function(context, strparse01, indextype,
        original_comparray, original_comparray_params, comparray, comparray_params, hassel) {

        var _this = this._this;

        var _context_ = _this.util.getvariables(context, {});

        for (var x = 0; x < _context_.length; x++) {

            var curr_index = x;
            var curr_hassel = false;
            var curr_content = _context_[x];

            var indices = " [" + curr_index + "] \n";

            var strparse = "";

            strparse += indices;
            strparse += " _context_.length : " + _context_.length;
            strparse += " className : " + curr_content["className"];
            strparse += " id : " + curr_content["id"] + "\n";

            strparse01["strparse__01"] += strparse + " \n";

            var comp_index = _this.util.getvariables(comparray_params["comp_sel_index"], 0);
            var comp = _this.util.getvariables(comparray[comp_index], {});

            var sel_selector = comp["selector"];
            var sel_type = comp["type"];
            var sel_append = comp["append"];

            var objselection = _this.getSelection(curr_content, comp);

            var selectionType = objselection["selectionType"];
            var selection = objselection["selection"];
            curr_hassel = objselection["hasSelection"];

            if (curr_hassel) {

                hassel = curr_hassel;

                //Review the appended css

                if (sel_append) {
                    var sel_array_index = curr_index;
                    indextype = this.getSelectionAppend(sel_array_index, curr_content, sel_append, indextype)["indextype"];
                }

                _this.parseNodesAddToArray(this.queryarray, this.selectionarray, curr_content, comparray, comparray_params);

            }

            if (typeof curr_content.childNodes != "undefined") {
                if (curr_content.childNodes.length > 0) {
                    var original_comparray_next = _this.util.derefarray(comparray, []);
                    var original_comparray_params_next = _this.util.derefjson(comparray_params, {});

                    _this.parseNodes(curr_content.childNodes, strparse01, curr_index,
                        original_comparray_next, original_comparray_params_next, comparray, comparray_params, hassel);
                }
            }

            hassel = false;

            comparray = _this.util.derefarray(original_comparray, []);
            comparray_params = _this.util.derefjson(original_comparray_params, {});

        }
    }

    //PRIVATE METHOD

    uiwidget.prototype.getNodes = function(compareindex, _firstlevel, _context) {

        var _this = this._this;

        var context = _context;
        var indextype = 0;
        var firstlevel = _firstlevel;

        var strparse = "";

        var objdebughere = this.objdebughere;

        if (arguments.length == 0) {

            this.selectorarray = _this.selection();

            this.selectionarray = new Array();
            this.queryarray = new Array();

            context = this.context.getElementsByTagName("*");

            for (var x = 0; x < context.length; x++) {
                if (context[x].nodeName.toLowerCase() == "html") {
                    context = context[x];
                    break;
                }
            }

            var first_sel_selector = this.selectorarray[0]["selector"];
            var first_sel_type = this.selectorarray[0]["type"];

            if (first_sel_type == "tagname") {

                context = this.context.getElementsByTagName(first_sel_selector);

            }

            firstlevel = true;

        }

        var curr_context = null;

        if (typeof context != "undefined") {

            if (typeof context.childNodes != "undefined") {
                curr_context = context.childNodes;
            } else if (typeof context.length != "undefined") {
                curr_context = context;
            }

        }

        var selection_index = 0;
        var isselectionhierarchy = false;

        _this.comparray_selectors = [];
        _this.comparray_selectors_params = [];

        var objselector_array = this.selectorarray;

        for (var selector_array_index = 0; selector_array_index < objselector_array.length; selector_array_index++) {

            var sarrayindex = selector_array_index;

            _this.comparray_selectors[selector_array_index] = [];
            _this.comparray_selectors[selector_array_index][sarrayindex] = {};

            _this.comparray_selectors_params[selector_array_index] = [];
            _this.comparray_selectors_params[selector_array_index][sarrayindex] = {};

            var objselectarray = objselector_array[selector_array_index];
            var comparray_sel_index_max = objselector_array[selector_array_index].length - 1;

            var objcomparray = _this.comparray_selectors[selector_array_index];
            var objcomparray_params = _this.comparray_selectors_params[selector_array_index];

            objcomparray_params[sarrayindex] = {};

            for (var x = 0; x < curr_context.length; x++) {

                objcomparray[sarrayindex] = objselector_array[sarrayindex];

                objcomparray_params[sarrayindex]["comp_query_index"] = selector_array_index;
                objcomparray_params[sarrayindex]["comp_sel_index"] = 0;
                objcomparray_params[sarrayindex]["comp_sel_index_max"] = comparray_sel_index_max;

                var comparray_sel_index = 0;

                var curr_index = x;
                var content = curr_context[curr_index];

                var comparray = objcomparray[sarrayindex]
                var comparray_params = objcomparray_params[sarrayindex];

                if (typeof content != " undefined" && content != null && content != "null") {

                    var sel_selector = comparray["selector"];
                    var sel_type = comparray["type"];
                    var sel_append = comparray["append"];

                    var objselection = _this.getSelection(content, comparray);

                    var hassel = objselection["hasSelection"];
                    var selectionType = objselection["selectionType"];
                    var selection = objselection["selection"];

                    //IF THERE ARE NOT SUB-NODES PARSE COMPARE THE CSS DIRECTLY

                    if (hassel) {
                        _this.parseNodesAddToArray(this.queryarray, this.selectionarray, content, comparray, comparray_params);
                    }

                    //IF THERE ARE SUB-NODES PARSE THE DOM FOR DIRECTLY MATCHING CSS

                    var haschildren = false;

                    if (typeof content.childNodes != "undefined") {
                        if (content.childNodes.length > 0) {
                            var comparray_original = _this.util.derefarray(comparray, []);
                            var comparray_params_original = _this.util.derefjson(comparray_params, {});

                            _this.parseNodes(content.childNodes, objdebughere, curr_index,
                                comparray_original, comparray_params_original, comparray, comparray_params, isselectionhierarchy);

                            haschildren = true;
                        }
                    }

                    _this.comparray_selectors_params[selector_array_index][sarrayindex] = comparray_params;

                    hassel = false;

                }

            }

            _this.comparray_selectors[selector_array_index][sarrayindex] = objcomparray[sarrayindex];
            _this.comparray_selectors_params[selector_array_index][sarrayindex] = objcomparray_params[sarrayindex];

        }

        this.objdebughere = objdebughere;

    }

    this.init();

}
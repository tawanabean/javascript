/**
 * @author Tawana
 *
 * Copyright 2011, Tawana Bean
 *
 * @date : Apr 7, 2019
 */

"use strict";

"use strict";

var DatabaseItem = function(objhere) {

    this.queueindex = null;

    this.column = null;
    this.id = null;
    this.type = null;
    this.value = null;
    this.curr_object = objhere;
    this.left = null;
    this.right = null;
    this.previous = null;
    this.next = null;

    if (typeof objhere != "undefined") {

        if (typeof objhere["queueindex"] != "undefined") {
            this.queueindex = objhere["queueindex"];
        } else {
            this.queueindex = 0;
        }

        if (typeof objhere["id"] != "undefined") {
            this.id = objhere["id"];
        } else {
            this.id = 0;
        }

        if (typeof objhere["type"] != "undefined") {
            this.type = objhere["type"];
        }

        if (typeof objhere["value"] != "undefined") {
            this.value = objhere["value"];
        }

    }

    this.removetask = [];

};

DatabaseItem.prototype.setColumn = function(col) {
    var obj = this;

    obj.column = col;

    return obj;
}

DatabaseItem.prototype.setItem = function(id, value, type) {
    var obj = this;

    obj.id = id;
    obj.value = value;
    obj.type = type;

    return obj;

};

DatabaseItem.prototype.setPrevious = function(objprevitem) {
    var obj = this;


    if (objprevitem != null) {

        if (objprevitem instanceof DatabaseItem) {

            obj.previous = objprevitem;

            objprevitem.next = obj;

        }

    } else {

        obj.previous = objprevitem;

    }

};

DatabaseItem.prototype.setNext = function(objnextitem) {
    var obj = this;


    if (objnextitem != null) {

        if (objnextitem instanceof DatabaseItem) {

            obj.next = objnextitem;

            objnextitem.previous = obj;

        }

    } else {

        obj.next = objnextitem;

    }

};

DatabaseItem.prototype.getPrevious = function() {
    var obj = this;

    return obj.previous;

};

DatabaseItem.prototype.getNext = function() {
    var obj = this;

    return obj.next;

};

DatabaseItem.prototype.setLeft = function(objleftitem) {
    var obj = this;


    if (objleftitem != null) {

        if (objleftitem instanceof DatabaseItem) {

            var leftside = obj.left;

            var rightside = obj.right;


            obj.left = objleftitem;

            if (leftside != null) {

                leftside.right = objleftitem;

            }

        }

    } else {

        obj.left = objleftitem;

    }

};

DatabaseItem.prototype.setRight = function(objrightitem) {
    var obj = this;


    if (objrightitem != null) {

        if (objrightitem instanceof DatabaseItem) {

            var leftside = obj.left;

            var rightside = obj.right;


            obj.right = objrightitem;

            if (rightside != null) {

                rightside.left = objrightitem;

            }

        }

    } else {

        obj.right = objrightitem;

    }

};

DatabaseItem.prototype.getLeft = function() {
    var obj = this;

    return obj.left;

};

DatabaseItem.prototype.getRight = function() {
    var obj = this;

    return obj.right;

};

DatabaseItem.prototype.remove = function(params) {
    var obj = this;

};

DatabaseItem.prototype.getSkipReference = function(skipamount) {
    var obj = this;

    if (skipamount > 0) {

        for (var x = 0; x < skipamount; x++) {

            if (obj != null)
                obj = obj.next;

        }

    } else {

        for (var x = skipamount; x < 0; x++) {

            if (obj != null)
                obj = obj.previous;

        }

    }

    return obj;

};

var Database = function(objoptions) {
    var obj = this;

    obj.util = new util();

    objoptions = obj.util.getvariables(objoptions, {});

    obj.queuesize = 1;
    obj.skipgap = 5;
    obj.size = 0;
    obj.columns = {};
    obj.column_names = {};
    obj.idhere = objoptions["id"];
    obj.callback = objoptions["callback"];
    obj.objdebughere = { strparse__01: "" };
    obj.totalshifts = new Array();
    obj.skiplist = new Array();
    obj.partition = 1000;
    obj.sortcolumns = new Array();

    obj._this = this;
}

Database.prototype.import = function(data) {
    var obj = this;

    var __data__ = data;

    if (data instanceof Array) {

        __data__ = data[0];

    }

    if (data instanceof Array) {

        for (var rowitem in data) {

            obj.addRow(data[rowitem]);

        }

    }

}

Database.prototype.getTypeofValue = function(valueitem) {

    var obj = this;

    var type = typeof valueitem;


    var typevalue = "null"

    if (type == "number") {
        typevalue = "numeric"
    } else if (type == "date") {
        typevalue = "date"
    } else if (type == "string") {
        typevalue = "string"
    }


    return typevalue;

}

Database.prototype.addRow = function(rowitem) {
    var obj = this;


    var colarray = new Array();

    for (var col in rowitem) {

        colarray.push(col);

        if (typeof obj.column_names != "undefined") {

            obj.column_names[col] = col;

        }

    }


    colarray = colarray.sort();


    var objDatabaseItemPrior = null;

    var id = obj.util.getID();


    for (var i = 0; i < colarray.length; i++) {

        var col = colarray[i];

        var value = rowitem[col];

        var type = obj.getTypeofValue(value);


        var objDatabaseItem = new DatabaseItem();

        objDatabaseItem.setColumn(col);

        objDatabaseItem.setItem(id, value, type);


        //VERIFY OBJECT REFERENCING INTEGRITY OF "LASTITEM"

        var lastitem = objDatabaseItemPrior;

        if (lastitem != null && typeof lastitem != "undefined") {

            lastitem.setRight(objDatabaseItem);

        }

        objDatabaseItem.setLeft(lastitem);


        obj.addColumn(col, objDatabaseItem);

        objDatabaseItemPrior = objDatabaseItem;


        if (i == 0) {

            obj.queuesize = (obj.queuesize > 0) ? obj.queuesize : 1;

            if (obj.size == 0 || ((obj.size + 1) % (obj.queuesize + 1) == 0)) {

                if (obj.size > 0) {

                    obj.totalshifts.push(obj.size + 1);

                }

                obj.skiplist.push(objDatabaseItem);

            }

        }

    }


    obj.size += 1;

}

Database.prototype.addColumn = function(col, rowitem) {
    var obj = this;

    var objrow = null;

    var objcolumns = obj.util.getvariables(obj.columns, {});


    var objcolumn = obj.util.getvariables(objcolumns[col], null);

    if (objcolumn == null) {

        objcolumn = {};
        objcolumn["rows"] = null;
        objcolumn["datecreated"] = obj.util.getDate();
        objcolumn["col"] = obj.util.getvariables(col, null);

    }


    if (objcolumn["rows"] == null) {

        if (rowitem instanceof DatabaseItem) {

            objcolumn["headitem"] = rowitem;

        }

    } else {

        if (rowitem instanceof DatabaseItem) {

            var objprev = objcolumn["lastitem"];

            if (objprev != null) {

                objprev.setNext(rowitem);

            }

            rowitem.setPrevious(objprev);

        }

    }


    objcolumn["lastitem"] = rowitem;
    objcolumn["rows"] = rowitem;
    objcolumn["type"] = obj.util.getvariables(rowitem["type"], null);
    objcolumn["maxlength"] = obj.util.getvariables(rowitem["maxlength"], null);
    objcolumn["lastupdated"] = obj.util.getDate();

    obj.columns[col] = objcolumn;

}

Database.prototype.getuniquetime = function() {
    var time = new Date().getTime();

    while (time == new Date().getTime());

    return new Date().getTime();
};

Database.prototype.addToQueue = function(objhere) {
    var obj = this;

    if (objhere instanceof QueueItem) {
        if (typeof objhere["id"] == "undefined" || this["id"] == null) {
            objhere["id"] = obj.collection.length;
        }
    }

    obj.currobject = objhere;

    obj.collection.push(objhere);
};

Database.prototype.getFromQueue = function(id) {
    var obj = this;

    return obj.searchQueue(id, obj.collection);
};

Database.prototype.searchQueue = function(id, list, _arg, _arg2, _arg3) {
    var obj = this;

    var leftindex = 0;
    var rightindex = 0;
    var tempvalue = {
        results: null,
        index: -1
    };

    var bpasscondition = false;

    if (arguments.length == 2) {
        bpasscondition = true;
        rightindex = list.length - 1;
    } else if (arguments.length == 5) {
        leftindex = arguments[3];
        rightindex = arguments[4];
        tempvalue = arguments[5];
    }

    if (arguments.length == 5 || bpasscondition) {
        var middleindex = Math.floor((leftindex + rightindex) / 2);

        var objhere = list[middleindex];

        if (objhere instanceof QueueItem) {
            if (leftindex > rightindex || leftindex == rightindex) {
                return tempvalue;
            }

            if (objhere["id"] == id) {
                return {
                    results: objhere["id"],
                    index: middleindex
                };
            }
            objhere = list[leftindex];

            if (objhere["id"] == id) {
                return {
                    results: objhere["id"],
                    index: leftindex
                };
            }
            objhere = list[rightindex];

            if (objhere["id"] == id) {
                return {
                    results: objhere["id"],
                    index: rightindex
                };
            }

            tempvalue = obj.searchQueue(id, list, leftindex + 1, middleindex - 1, tempvalue);
            tempvalue = obj.searchQueue(id, list, middleindex + 1, rightindex - 1, tempvalue);
        }
    }

    return tempvalue;
};

Database.prototype.removeFromQueue = function(objhere) {
    var obj = this;

    var bpass = false;

    if (objhere instanceof QueueItem) {
        var results = obj.searchQueue(objhere["id"], obj.collection);

        var index = results["id"];

        if (index > -1) {
            obj.collection.splice(index, 1);
            bpass = true;
        }
    }

    return bpass;
};

Database.prototype.getCollection = function() {
    var obj = this;

    return obj.collection;
};

Database.prototype.popFromQueue = function() {
    var obj = this;

    if (obj.getCollection().length > 0) {
        return {
            data: obj.getCollection().splice(0, 1)
        };
    }

    return false;
};

Database.prototype.getColumnsArray = function() {

    var obj = this;


    var colnames = obj.column_names;

    var colarray = new Array();


    for (var col_name in colnames) {

        colarray.push(col_name);

    }


    return colarray.sort();

}

Database.prototype.getColumnName = function(colindex) {

    var obj = this;


    var colnames = obj.getColumnsArray();


    if (colindex < colnames.length && colindex >= 0) {

        return colnames[colindex];

    }


    return colnames[0];

}

Database.prototype.getColumnIndex = function(colname) {

    var obj = this;


    var colindex = 0;

    var colnames = obj.getColumnsArray();


    for (var col_index = 0; col_index < colnames.length; col_index++) {

        if ((colname + "").toLowerCase() == (colnames[col_index] + "").toLowerCase()) {

            return col_index;

        }

    }


    return colindex;

}

/**
Database.prototype.binarysearch = function(begin, end, rowcount, index, itempivot, skipqueue, __time__push, __time__reloop, __loop, list) {

    var obj = this;

    var ___debug = false;

    var ___debug__queue = false;


    var midsize = Math.floor(obj.queuesize);

    midsize = (midsize > 0) ? midsize : 1;


    var delta_queue_skip = midsize;


    list = obj.util.getvariables(list, new Array());


    var val = itempivot.value;


    var val_begin = null;

    var val_mid = null;

    var val_end = null;


    var __BINARY__start = objutil.getuniquetime();

    if (rowcount > 0) {

        var __begin = obj.util.getvariables(begin, 0);

        var __end = obj.util.getvariables(end, rowcount - 1);


        __begin = (__begin < rowcount) ? __begin : rowcount - 1;

        __end = (__end < rowcount) ? __end : rowcount - 1;

        //console.log(__begin + " " +__end);


        if (begin < rowcount) {

            for (var start = begin; start < rowcount; start++) {

                __loop++;


                var __mid__00 = __begin + Math.floor((__end - __begin) / 2);

                var __mid__01 = __begin + Math.floor((__end - __begin) * 1 / 12);

                var __mid__01a = __begin + Math.floor((__end - __begin) * 1.25 / 12);

                var __mid__01b = __begin + Math.floor((__end - __begin) * 1.5 / 12);

                var __mid__02 = __begin + Math.floor((__end - __begin) * 2 / 12);

                var __mid__02a = __begin + Math.floor((__end - __begin) * 2.25 / 12);

                var __mid__02b = __begin + Math.floor((__end - __begin) * 2.5 / 12);

                var __mid__03 = __begin + Math.floor((__end - __begin) * 3 / 12);

                var __mid__03a = __begin + Math.floor((__end - __begin) * 3.25 / 12);

                var __mid__03b = __begin + Math.floor((__end - __begin) * 3.5 / 12);

                var __mid__04 = __begin + Math.floor((__end - __begin) * 4 / 12);

                var __mid__04a = __begin + Math.floor((__end - __begin) * 4.25 / 12);

                var __mid__04b = __begin + Math.floor((__end - __begin) * 4.5 / 12);

                var __mid__05 = __begin + Math.floor((__end - __begin) * 5 / 12);

                var __mid__05a = __begin + Math.floor((__end - __begin) * 5.25 / 12);

                var __mid__05b = __begin + Math.floor((__end - __begin) * 5.5 / 12);

                var __mid__06 = __begin + Math.floor((__end - __begin) * 6 / 12);

                var __mid__06a = __begin + Math.floor((__end - __begin) * 6.25 / 12);

                var __mid__06b = __begin + Math.floor((__end - __begin) * 6.5 / 12);

                var __mid__07 = __begin + Math.floor((__end - __begin) * 7 / 12);

                var __mid__07a = __begin + Math.floor((__end - __begin) * 7.25 / 12);

                var __mid__07b = __begin + Math.floor((__end - __begin) * 7.5 / 12);

                var __mid__08 = __begin + Math.floor((__end - __begin) * 8 / 12);

                var __mid__08a = __begin + Math.floor((__end - __begin) * 8.25 / 12);

                var __mid__08b = __begin + Math.floor((__end - __begin) * 8.5 / 12);

                var __mid__09 = __begin + Math.floor((__end - __begin) * 9 / 12);

                var __mid__09a = __begin + Math.floor((__end - __begin) * 9.25 / 12);

                var __mid__09b = __begin + Math.floor((__end - __begin) * 9.5 / 12);

                var __mid__10 = __begin + Math.floor((__end - __begin) * 10 / 12);

                var __mid__10a = __begin + Math.floor((__end - __begin) * 10.25 / 12);

                var __mid__10b = __begin + Math.floor((__end - __begin) * 10.5 / 12);

                var __mid__11 = __begin + Math.floor((__end - __begin) * 11 / 12);

                var __mid__11a = __begin + Math.floor((__end - __begin) * 11.25 / 12);

                var __mid__11b = __begin + Math.floor((__end - __begin) * 11.5 / 12);


                //console.log("__begin : " + __begin);
                //console.log("__mid__07 : " + __mid__07);
                //console.log("__end : " + __end);

                if (skipqueue[__begin] == null) {
                    console.log("[" + rowcount + "] __begin[" + index + "] NULL ERROR: " + __begin);
                }
                if (skipqueue[__mid__06] == null) {
                    console.log("[" + rowcount + "] __mid__06[" + index + "]  NULL ERROR: " + __mid__06);
                }
                if (skipqueue[__end] == null) {
                    console.log("[" + rowcount + "] __end[" + index + "]  NULL ERROR: " + __end);
                }

                val_begin = skipqueue[__begin].value;

                val_mid = skipqueue[__mid__00].value;

                var val_end = skipqueue[__end].value;


                if (val_end < val_mid) {

                    console.log("error (val_end < val_mid) in sort [" + index + "] ");

                } else if (val_end < val_begin) {

                    console.log("error (val_end < val_begin) in sort [" + index + "] ");

                }


                var val_mid__01 = skipqueue[__mid__01].value;

                var val_mid__01a = skipqueue[__mid__01a].value;

                var val_mid__01b = skipqueue[__mid__01b].value;

                var val_mid__02 = skipqueue[__mid__02].value;

                var val_mid__02a = skipqueue[__mid__02a].value;

                var val_mid__02b = skipqueue[__mid__02b].value;

                var val_mid__03 = skipqueue[__mid__03].value;

                var val_mid__03a = skipqueue[__mid__03a].value;

                var val_mid__03b = skipqueue[__mid__03b].value;

                var val_mid__04 = skipqueue[__mid__04].value;

                var val_mid__04a = skipqueue[__mid__04a].value;

                var val_mid__04b = skipqueue[__mid__04b].value;

                var val_mid__05 = skipqueue[__mid__05].value;

                var val_mid__05a = skipqueue[__mid__05a].value;

                var val_mid__05b = skipqueue[__mid__05b].value;

                var val_mid__06 = skipqueue[__mid__06].value;

                var val_mid__06a = skipqueue[__mid__06a].value;

                var val_mid__06b = skipqueue[__mid__06b].value;

                var val_mid__07 = skipqueue[__mid__07].value;

                var val_mid__07a = skipqueue[__mid__07a].value;

                var val_mid__07b = skipqueue[__mid__07b].value;

                var val_mid__08 = skipqueue[__mid__08].value;

                var val_mid__08a = skipqueue[__mid__08a].value;

                var val_mid__08b = skipqueue[__mid__08b].value;

                var val_mid__09 = skipqueue[__mid__09].value;

                var val_mid__09a = skipqueue[__mid__09a].value;

                var val_mid__09b = skipqueue[__mid__09b].value;

                var val_mid__10 = skipqueue[__mid__10].value;

                var val_mid__10a = skipqueue[__mid__10a].value;

                var val_mid__10b = skipqueue[__mid__10b].value;

                var val_mid__11 = skipqueue[__mid__11].value;

                var val_mid__11a = skipqueue[__mid__11a].value;

                var val_mid__11b = skipqueue[__mid__11b].value;


                if ((index % delta_queue_skip == 0 && ___debug__queue) || ___debug)
                    console.log(" val [" + val + "]  __begin[" + __begin + "]  : " + val_begin + "  __mid01[" + __mid__01 + "]  : " + val_mid__01 + " __mid00[" + __mid__00 + "]  : " + val_mid + "  __mid02[" + __mid__02 + "]  : " + val_mid__02 + " " + " __end[" + __end + "]  : " + val_end + " ");

                if (val_mid <= val && val <= val_end) {

                    if (val_mid <= val && val < val_mid__06a) {

                        __begin = __mid__00;

                        __end = __mid__06a - 1;

                    } else if (val_mid__06a <= val && val < val_mid__06b) {

                        __begin = __mid__06a;

                        __end = __mid__06b - 1;

                    } else if (val_mid__06b <= val && val < val_mid__07) {

                        __begin = __mid__06b;

                        __end = __mid__07 - 1;

                    } else if (val_mid__07 <= val && val < val_mid__07a) {

                        __begin = __mid__07;

                        __end = __mid__07a - 1;

                    } else if (val_mid__07a <= val && val < val_mid__07b) {

                        __begin = __mid__07a;

                        __end = __mid__07b - 1;

                    } else if (val_mid__07b <= val && val < val_mid__08) {

                        __begin = __mid__07b;

                        __end = __mid__08 - 1;

                    } else if (val_mid__08 <= val && val < val_mid__08a) {

                        __begin = __mid__08;

                        __end = __mid__08a - 1;

                    } else if (val_mid__08a <= val && val < val_mid__08b) {

                        __begin = __mid__08a;

                        __end = __mid__08b - 1;

                    } else if (val_mid__08b <= val && val < val_mid__09) {

                        __begin = __mid__08b;

                        __end = __mid__09 - 1;

                    } else if (val_mid__09 <= val && val < val_mid__09a) {

                        __begin = __mid__09;

                        __end = __mid__09a - 1;

                    } else if (val_mid__09a <= val && val < val_mid__09b) {

                        __begin = __mid__09a;

                        __end = __mid__09b - 1;

                    } else if (val_mid__09b <= val && val < val_mid__10) {

                        __begin = __mid__09b;

                        __end = __mid__10 - 1;

                    } else if (val_mid__10 <= val && val < val_mid__10a) {

                        __begin = __mid__10;

                        __end = __mid__10a - 1;

                    } else if (val_mid__10a <= val && val < val_mid__10b) {

                        __begin = __mid__10a;

                        __end = __mid__10b - 1;

                    } else if (val_mid__10b <= val && val < val_mid__11) {

                        __begin = __mid__10b;

                        __end = __mid__11 - 1;

                    } else if (val_mid__11 <= val && val < val_mid__11a) {

                        __begin = __mid__11;

                        __end = __mid__11a - 1;

                    } else if (val_mid__11a <= val && val < val_mid__11b) {

                        __begin = __mid__11a;

                        __end = __mid__11b - 1;

                    } else if (val_mid__11b <= val && val < val_end) {

                        __begin = __mid__11b;

                        __end--;

                    } else {

                        var __PUSH__begin = objutil.getuniquetime();

                        list.push(__end);

                        var __PUSH__end = objutil.getuniquetime();

                        __time__push += (__PUSH__end - __PUSH__begin);

                        break;

                    }

                } else if (val_begin <= val && val < val_mid) {

                    if (val_begin <= val && val < val_mid__01) {

                        __begin = __begin;

                        __end = __mid__01 - 1;

                    } else if (val_mid__01 <= val && val < val_mid__01a) {

                        __begin = __mid__01;

                        __end = __mid__01a - 1;

                    } else if (val_mid__01a <= val && val < val_mid__01b) {

                        __begin = __mid__01a;

                        __end = __mid__01b - 1;

                    } else if (val_mid__01b <= val && val < val_mid__02) {

                        __begin = __mid__01b;

                        __end = __mid__02 - 1;

                    } else if (val_mid__02 <= val && val < val_mid__02a) {

                        __begin = __mid__02;

                        __end = __mid__02a - 1;

                    } else if (val_mid__02a <= val && val < val_mid__02b) {

                        __begin = __mid__02a;

                        __end = __mid__02b - 1;

                    } else if (val_mid__02b <= val && val < val_mid__03) {

                        __begin = __mid__02b;

                        __end = __mid__03 - 1;

                    } else if (val_mid__03 <= val && val < val_mid__03a) {

                        __begin = __mid__03;

                        __end = __mid__03a - 1;

                    } else if (val_mid__03a <= val && val < val_mid__03b) {

                        __begin = __mid__03a;

                        __end = __mid__03b - 1;

                    } else if (val_mid__03b <= val && val < val_mid__04) {

                        __begin = __mid__03b;

                        __end = __mid__04 - 1;

                    } else if (val_mid__04 <= val && val < val_mid__04a) {

                        __begin = __mid__04;

                        __end = __mid__04a - 1;

                    } else if (val_mid__04a <= val && val < val_mid__04b) {

                        __begin = __mid__04a;

                        __end = __mid__04b - 1;

                    } else if (val_mid__04b <= val && val < val_mid__05) {

                        __begin = __mid__04b;

                        __end = __mid__05 - 1;

                    } else if (val_mid__05 <= val && val < val_mid__05a) {

                        __begin = __mid__05;

                        __end = __mid__05a - 1;

                    } else if (val_mid__05a <= val && val < val_mid__05b) {

                        __begin = __mid__05a;

                        __end = __mid__05b - 1;

                    } else if (val_mid__05b <= val && val < val_mid) {

                        __begin = __mid__05b;

                        __end = __mid__00 - 1;

                    } else {

                        var __PUSH__begin = objutil.getuniquetime();

                        list.push(__end);

                        var __PUSH__end = objutil.getuniquetime();

                        __time__push += (__PUSH__end - __PUSH__begin);

                        break;

                    }

                } else {

                    var __PUSH__begin = objutil.getuniquetime();

                    if (val >= val_mid) {

                        list.push(__end);

                    } else {

                        list.push(__begin);

                    }

                    var __PUSH__end = objutil.getuniquetime();

                    __time__push += (__PUSH__end - __PUSH__begin);

                    break;

                }

            }

        } else {

            __loop = 1;

            list.push(begin);

        }
    }


    var __BINARY__end = objutil.getuniquetime();

    __time__reloop = __BINARY__end - __BINARY__start;

    return [list, __time__push, __time__reloop, __loop];

}

Database.prototype.sortsection = function(colname, sorttype, numberofrowstosort, skiprows, skiprows_endindex) {

    var objdebughere = document.getElementById("_debug__box__");


    var __strwrite = "";


    var obj = this;


    var colx = 0;


    var algorithm__loop = 0;

    var col_ = colname;


    var objcolumns = obj.util.getvariables(obj.columns, {});

    var objcolumn = obj.util.getvariables(objcolumns[col_], new Array());


    var colindex = obj.getColumnIndex(col_);

    var rowitem = obj.columns[col_]["headitem"];


    obj.sortcolumns = new Array();

    obj.sortcolumns.push(colindex);


    var __strwrite__begin___01 = (new Date()).getTime();


    var sizeoflist = skiprows.length;

    if (sizeoflist > 0) {

        var datanum = 0;

        var totalsize = 0;

        var curr_row = 0;


        var rowitempprev = null;

        var rowitempnext = null;


        var rowitemprior = null;

        //var rowitem = rowitem.getSkipReference(colindex);

        var rowitemnext = null;


        var midsize = Math.floor(obj.queuesize);

        midsize = (midsize > 0) ? midsize : 1;


        var delta_queue_skip = midsize;


        var minid = -1;

        var rowcount = 0;

        var ___debug = false;


        var __binsearchtime__ = 0;


        var __bin_search__time = 0;

        var __bin_search__time__push = 0;

        var __bin_search__time__reloop = 0;


        var __prev__next__time = 0;

        var __add__skip__time = 0;

        var __skiprow__time = 0;

        var __delta__ = 0;

        var ___bin___ = 0;

        var ___bin___total___ = 0;

        var ___add___to___skip___ = 0;


        var skipindex = 0;

        var priorskipindex = 0

        var forwardskipindex = 0;


        // INITIALIZE SKIP ARRAY

        var numberofitems = skiprows.length;

        //var numberofrowstosort = numberofitems;


        var __row__loop = rowitem;

        var __pivot__search__ = numberofrowstosort;


        var __strwrite__begin___ = objutil.getuniquetime();

        for (var x = 0; rowitem != null && rowitem.next != null && x < skiprows_endindex;) {

            if (x % 1000 == 0) {

                //console.log(x);

            }

            if (x == 1079) {

                //alert(1)

            }


            // MOVE TO THE NEXT ROW ITEM

            var next__rowitem = rowitem.next;


            var ____begin__loop_ = objutil.getuniquetime();

            var __strwrite__begin = objutil.getuniquetime();


            var nextitem = rowitemnext;


            var val = null;

            if (rowitem != null) {

                val = rowitem.value + "";

            }

            if (x % 100 == 0) {

                //console.log("rowitem[" + x + "] : " + val);

            }

            var next_row_id = rowitem.id;


            // ROW ITEM PLACEMENT

            var isnextorder = false;

            var isprevorder = false;


            var origid = rowitem.id;


            // SUB-SKIP LOOP

            var __next__loop = 0;

            var ___binary__loop = 0;


            var list = new Array();


            var __pivot__search__begin__ = __pivot__search__ * Math.floor(x / __pivot__search__);

            var __pivot__search__end__ = __pivot__search__ * Math.floor(x / __pivot__search__) + __pivot__search__ - 1;


            if ((x % delta_queue_skip == 0) || skipindex == 0) {

                var binlist = obj.binarysearch(__pivot__search__begin__, __pivot__search__end__, rowcount, x, rowitem, skiprows,
                    __bin_search__time__push, __bin_search__time__reloop, ___binary__loop, list);


                list = binlist[0];

                if (list.length > 0) {

                    skipindex = ((list.length - 1) >= 0) ? list[list.length - 1] : skipindex;

                }


                var __bin__push = binlist[1];

                var __bin__reloop = binlist[2];


                ___binary__loop = binlist[3];

            } else {

                skipindex = rowcount - 1;

            }


            var __strwrite__end = objutil.getuniquetime();


            var ___bin___search = (__strwrite__end - __strwrite__begin);

            __binsearchtime__ += ___bin___search;


            var __strwrite_BEGIN_01 = objutil.getuniquetime();



            // PLACEMENT OF ROW ITEM 

            if ((x % delta_queue_skip == 0) || skipindex == 0) {

                var __addskip__ = obj.addskip(skipindex, __pivot__search__begin__, __pivot__search__end__, rowcount, rowitem, skiprows);

                skiprows = __addskip__[0];

                skipindex = __addskip__[1];

            }


            // v a l p r i o r

            // rq = 4

            // [a] [v]
            // [a] l [v]
            // [a] l p [v]
            // [a] l (p) r [v] <- 5th / index = 2
            // [a] i l (p) r [v]
            // [a] i l (o) p r [v]
            // [a] i l (o) p r r [v]

            if (skipindex != x) {

                var prev_item = null;

                var next_item = null;

                if (rowitem != null) {

                    prev_item = rowitem.previous;

                    next_item = rowitem.next;

                }


                var completenext = false;

                var skiprownext = skiprows[skipindex];


                rowitemprior = null;

                rowitempnext = null;


                priorskipindex = skipindex - 1;

                forwardskipindex = skipindex + 1;


                if (priorskipindex >= 0) {

                    rowitemprior = skiprows[priorskipindex];

                }

                if (forwardskipindex < rowcount) {

                    if (rowitemprior != null) {

                        rowitempnext = rowitemprior.next;

                    } else {

                        rowitempnext = skiprows[forwardskipindex];

                    }

                } else {

                    if (rowitemprior != null) {

                        if (rowitemprior.next != null) {

                            rowitempnext = rowitemprior.next;

                        }

                    }

                }


                var prior_prev_item = rowitemprior;

                var prior_next_item = rowitempnext;


                var val_prior = null;

                if (rowitemprior != null) {

                    val_prior = rowitemprior.value + "";

                }


                var skip_row_val_prev = null;

                var skip_row_val_next = null;

                if (rowitempnext != null) {

                    skip_row_val_next = rowitempnext.value;

                }


                var skiprow_valnext = skip_row_val_next;

                var skipitemtoadd = rowitem;


                if ((rowitemprior != null || rowitempnext != null)) {

                    //objdebughere.value +=  "curr_row : " + curr_row + " [" + rowcount +"]" + val_prior + "--" + val + "\n";


                    //console.log( " [" + rowcount +"]" + val_prior + "--" + val + "\n" );

                    // |LP| <- val ->  <- val_prior -> |R|

                    if (prior_prev_item != null) {

                        if (rowitem.id != prior_prev_item.id) {

                            prior_prev_item.setNext(rowitem);

                            rowitem.setPrevious(prior_prev_item);

                        }

                    } else {

                        rowitem.setPrevious(prior_prev_item);

                    }


                    if (prior_next_item != null) {

                        if (rowitem.id != prior_next_item.id) {

                            rowitem.setNext(prior_next_item);

                            prior_next_item.setPrevious(rowitem);

                        }

                    } else {

                        rowitem.setNext(prior_next_item);

                    }


                    if (prev_item != null) {

                        if (rowitemprior != null) {

                            if (rowitemprior.id != prev_item.id) {

                                prev_item.setNext(next_item);

                            }

                        } else if (rowitempnext != null) {

                            if (!completenext) {

                                if (rowitempnext.id != rowitem.id) {

                                    prev_item.setNext(next_item);

                                }

                            } else {

                                if (rowitempnext.previous.id != rowitem.id) {

                                    prev_item.setNext(next_item);

                                }

                            }

                        }

                    }

                    if (next_item != null && rowitempnext != null) {

                        if ((completenext && rowitempnext.id != next_item.id) &&
                            (!completenext && rowitempnext.next.id != next_item.id)) {

                            next_item.setPrevious(prev_item);

                        }

                    }


                    obj.columns[col_]["headitem"] = skiprows[0];

                    if (next_item == null) {

                        obj.columns[col_]["lastitem"] = prev_item;

                        obj.columns[col_]["rows"] = prev_item;


                        next_row_max_id = prev_item.id;

                    }


                    nextitem = next_item;

                }

            }


            if (rowitempnext != null && rowitemprior != null && rowitempnext.previous != null && rowitempnext.previous.previous != null)
                if (rowitempnext.previous.previous.id != rowitemprior.id) {
                    console.log("prev: " + x)
                }

            if (rowitempnext != null && rowitemprior != null && rowitemprior.next != null && rowitemprior.next.next != null)
                if (rowitempnext.id != rowitemprior.next.next.id) {
                    console.log("next: " + x)
                }


                // MOVE TO NEXT ROW ITEM 

            rowitem = next__rowitem;


            val = null;

            if (rowitem != null) {

                next_row_id = rowitem.id;

                val = rowitem.value + "";

            }


            algorithm__loop += __next__loop;

            algorithm__loop += ___binary__loop;


            var __strwrite_END_01 = objutil.getuniquetime();

            var addtoskip = (__strwrite_END_01 - __strwrite_BEGIN_01);


            __add__skip__time += addtoskip;

            ___add___to___skip___ += addtoskip;


            var ____end__loop_ = objutil.getuniquetime();


            datanum++;

            rowcount++;

            x++;


            var _delta_ = (____end__loop_ - ____begin__loop_);

            __delta__ += _delta_;

            ___bin___ += ___binary__loop;

            ___bin___total___ += ___binary__loop;


            if (x % 10000 == 0 && false) {

                console.log(" curr_row : [" + x + "]" +
                    "__delta__ time [" + __delta__ +
                    "] per _delta_ time [" + _delta_ +
                    "] binarysearch time [" + __binsearchtime__ + "] " +
                    " bin [" + ___bin___ + ", " + ___bin___total___ +
                    ", per " + ___binary__loop + "] (" +
                    ___bin___search + ") (" +
                    algorithm__loop + ", " + __next__loop +
                    ") addtoskip time[" + __add__skip__time +
                    "] ( per time " + addtoskip + ", " +
                    ___add___to___skip___ + ")  skiprow (" + skiprow_valnext +
                    ") curr_row : [" + x + "]" + val_prior + "--" + val);

            }

            if (x % __pivot__search__ == 0) {

                __delta__ = 0;

                __binsearchtime__ = 0;

                ___bin___total___ = 0;

                ___add___to___skip___ = 0;

            }

        }

        //rowitem = rowitem.getSkipReference(colindex);

    }


    var __strwrite__end___01 = objutil.getuniquetime();

    //console.debug("---SORT[" + numberofitems + "]---" + (__strwrite__end___01 - __strwrite__begin___01));

    return [numberofitems, skiprows];

} 
**/

Database.prototype.mergebinary = function(sortlist, rowitem) {

    var obj = this;

    var __debug = false;


    var __begin__index = 0;

    var __end__index = sortlist.length - 1;


    var __mid__index = Math.floor((__end__index - __begin__index) / 2);


    var bskip = false;

    if (__begin__index <= __end__index && rowitem != null) {

        for (var x = 0; x < sortlist.length; x++) {

            var __begin__item = sortlist[__begin__index];

            var __mid__item = sortlist[__mid__index];

            var __end__item = sortlist[__end__index];


            if (__debug)
                console.log("rowitem[" + rowitem.value + "] " +
                    " binary[" + __begin__index + "] : " + __begin__item.value +
                    " binary[" + __mid__index + "] : " + __mid__item.value +
                    " binary[" + __end__index + "] : " + __end__item.value);
            /****/

            if (!bskip && __begin__item.value > rowitem.value) {

                return __begin__index;

            } else if (!bskip && __begin__item.value <= rowitem.value && rowitem.value < __mid__item.value) {

                __end__index = __mid__index;

                __mid__index = __begin__index + Math.floor((__end__index - __begin__index) / 2);

                bskip = (__end__index - __begin__index) <= 2;

            } else if (!bskip && __mid__item.value <= rowitem.value && rowitem.value < __end__item.value) {

                __begin__index = __mid__index;

                __mid__index = __begin__index + Math.floor((__end__index - __begin__index) / 2);

                bskip = (__end__index - __begin__index) <= 2;

            } else if (__begin__item.value > rowitem.value) {

                return __begin__index;

            } else if (__mid__item.value > rowitem.value) {

                return __mid__index;

            } else if (__end__item.value >= rowitem.value) {

                return __end__index;

            } else {

                return __end__index;

            }

        }

    }

    return __begin__index;

}

Database.prototype.addskip = function(skipindex, beginindex, endindex, rowcount, itemtopivot, skiprowqueue) {

    var obj = this;

    var ___debug = false;


    var midsize = Math.floor(obj.queuesize);

    midsize = (midsize > 0) ? midsize : 1;


    var __x = skipindex;


    __x = (skipindex - 1 > 0) ? __x - 1 : 0;

    __x = (__x > beginindex) ? __x : beginindex;


    var delta_queue_skip = midsize;

    var itemadded = false;


    var itemtopivot_val = itemtopivot.value;


    var itemtopivot_prev_val = null;

    if (itemtopivot != null && itemtopivot.previous != null) {

        itemtopivot_prev_val = itemtopivot.previous.value;

    }


    //obj.skiprow_queue = obj.util.getvariables(skiprowqueue, []);

    endindex = (endindex < rowcount) ? endindex : rowcount - 1;


    var __index__ = 0;

    if (!itemadded) {

        for (; __x <= endindex; __x++) {

            if (skiprowqueue[__x].value > itemtopivot_val) {

                itemadded = true;

                for (var updateindex = rowcount; updateindex > __x;) {

                    if ((updateindex - 1) >= 0 && (updateindex) > __x &&
                        (updateindex) <= rowcount && (updateindex - 1) <= rowcount) {
                        skiprowqueue[updateindex] = skiprowqueue[updateindex - 1];
                    }

                    if ((updateindex - 2) >= 0 && (updateindex - 1) > __x &&
                        (updateindex - 1) <= rowcount && (updateindex - 2) <= rowcount) {
                        skiprowqueue[updateindex - 1] = skiprowqueue[updateindex - 2];
                    }

                    if ((updateindex - 3) >= 0 && (updateindex - 2) > __x &&
                        (updateindex - 2) <= rowcount && (updateindex - 3) <= rowcount) {
                        skiprowqueue[updateindex - 2] = skiprowqueue[updateindex - 3];
                    }

                    if ((updateindex - 4) >= 0 && (updateindex - 3) > __x &&
                        (updateindex - 3) <= rowcount && (updateindex - 4) <= rowcount) {
                        skiprowqueue[updateindex - 3] = skiprowqueue[updateindex - 4];
                    }

                    if ((updateindex - 5) >= 0 && (updateindex - 4) > __x &&
                        (updateindex - 4) <= rowcount && (updateindex - 5) <= rowcount) {
                        skiprowqueue[updateindex - 4] = skiprowqueue[updateindex - 5];
                    }

                    if ((updateindex - 6) >= 0 && (updateindex - 5) > __x &&
                        (updateindex - 5) <= rowcount && (updateindex - 6) <= rowcount) {
                        skiprowqueue[updateindex - 5] = skiprowqueue[updateindex - 6];
                    }

                    if ((updateindex - 7) >= 0 && (updateindex - 6) > __x &&
                        (updateindex - 6) <= rowcount && (updateindex - 7) <= rowcount) {
                        skiprowqueue[updateindex - 6] = skiprowqueue[updateindex - 7];
                    }

                    if ((updateindex - 8) >= 0 && (updateindex - 7) > __x &&
                        (updateindex - 7) <= rowcount && (updateindex - 8) <= rowcount) {
                        skiprowqueue[updateindex - 7] = skiprowqueue[updateindex - 8];
                    }

                    if ((updateindex - 9) >= 0 && (updateindex - 8) > __x &&
                        (updateindex - 9) <= rowcount && (updateindex - 8) <= rowcount) {
                        skiprowqueue[updateindex - 8] = skiprowqueue[updateindex - 9];
                    }

                    if ((updateindex - 10) >= 0 && (updateindex - 9) > __x &&
                        (updateindex - 10) <= rowcount && (updateindex - 9) <= rowcount) {
                        skiprowqueue[updateindex - 9] = skiprowqueue[updateindex - 10];
                    }

                    updateindex -= 9;

                }

                skiprowqueue[__x] = itemtopivot;

                //rowcount = skiprowqueue.length;

                __x++;


                break;

            }

        }

        __index__ = __x;

    }


    if (!itemadded) {

        var __index = rowcount - 1;

        if (rowcount >= 0) {

            //console.log("addskip PUSH [" + __index + "] itemtopivot : " + itemtopivot.value);

            skiprowqueue[__index + 1] = itemtopivot;

            itemadded = true;

        }

        __index__ = __index + 1;

    } else {

        __index__ = __index__ - 1;

    }


    //obj.skiprow_queue = skiprowqueue;

    return [skiprowqueue, __index__];

}

Database.prototype.mergeitem = function(sortlist, skiprows, __partition__beginindex, __partition__endindex, __startitem__, __enditem__, __item__) {

    var obj = this;

    var debug = false;


    var placebefore = false;

    var direction = true;


    var __index__ = obj.mergebinary(sortlist, __item__);

    var __loop__ = 0;

    var __step__loop__ = 1;


    var __next__additem__ = null;

    if ((__index__ + 1) < sortlist.length) {

        __next__additem__ = sortlist[(__index__ + 1)];

    }

    var __prev__additem__ = null;

    if ((__index__ - 1) >= 0) {

        __prev__additem__ = sortlist[(__index__ - 1)];

    }


    //var __nextpivotitem__ = sortlist[(__index__ + 1) < sortlist.length ? (__index__ + 1) : (__index__ + 1)];


    var __additem__ = sortlist[__index__];

    if (__additem__ != null) {

        if (__additem__.value <= __item__.value) {

            while (__additem__.value <= __item__.value && ((__enditem__ != null && __additem__.id != __enditem__.id) || (__enditem__ == null))) {

                if (debug & (__additem__.id > __partition__endindex || __additem__.id < __partition__beginindex)) {

                    console.log(" FORWARD --> ERROR OUTSIDE OF BOUNDRY [" + __index__ + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value + " __additem__[" + __additem__.id + "] : " + __additem__.value + " __item__[" + __item__.id + "] : " + __item__.value);

                }

                if (debug)
                    console.log("FORWARD --> mergeitem[" + __item__.value + "]: " + __additem__.value);

                if (__loop__ % obj.skipgap == 0) {

                    var __setskip__ = obj.mergeskipitem(sortlist, skiprows, __loop__, __enditem__, __item__, __additem__);

                }

                if (__additem__.next == null ||
                    (__additem__.next != null && __enditem__ != null && __additem__.next.id == __enditem__.id) ||
                    (__additem__.next != null && __next__additem__ != null && __additem__.next.id == __next__additem__.id)) {

                    break;

                }

                __additem__ = __additem__.next;


                __step__loop__++;

                __loop__++;

            }

        } else {

            while (__additem__.value > __item__.value && ((__startitem__ != null && __additem__.id != __startitem__.id) || (__startitem__ == null))) {

                direction = false;

                if (debug && (__additem__.id > __partition__endindex || __additem__.id < __partition__beginindex)) {

                    console.log(" PREVIOUS <-- ERROR OUTSIDE OF BOUNDRY [" + __index__ + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value + " __additem__[" + __additem__.id + "] : " + __additem__.value + " __item__[" + __item__.id + "] : " + __item__.value);

                }

                if (debug)
                    console.log("PREVIOUS <-- mergeitem[" + __item__.value + "]: " + __additem__.value);

                if (__loop__ % obj.skipgap == 0) {

                    var __setskip__ = obj.mergeskipitem(sortlist, skiprows, __loop__, __enditem__, __item__, __additem__);

                }

                if (__additem__.previous == null ||
                    (__additem__.previous != null && __startitem__ != null && __additem__.previous.id == __startitem__.id) ||
                    (__additem__.previous != null && __prev__additem__ != null && __additem__.previous.id == __prev__additem__.id)) {

                    break;

                }

                __additem__ = __additem__.previous;

                __step__loop__--;

                __loop__++;

            }

        }

    }

    if (__additem__.previous != null) {

        if ((__startitem__ != null && __additem__.previous != null && __additem__.previous.id != __startitem__.id) ||
            (__startitem__ == null && __additem__.previous != null)) {

            if (__additem__.value > __item__.value) {

                __additem__ = __additem__.previous;


                __step__loop__++;

                __loop__++;

            }

        } else {

            if (__additem__.value > __item__.value) {

                placebefore = true;


                __step__loop__--;

                __loop__++;

            }

        }

    } else {

        if (__additem__.previous == null) {

            if (__additem__.value > __item__.value) {

                placebefore = true;

                __loop__++;

            }

        }

    }


    if (debug)
        console.log("  mergeitem: placebefore" + placebefore);

    return [__additem__, placebefore, __loop__, __step__loop__, direction];

}

Database.prototype.mergeskipitem = function(sortlist, skiprows, rowindex, __enditem__, __rowitem__, __item__) {

    var obj = this;

    var __skipindex = -1;


    if ((__item__ != null && __item__.value < __rowitem__.value && __item__.id != __rowitem__.id) ||
        (__enditem__ != null && __enditem__.id != __rowitem__.id && rowindex % obj.skipgap == 0) ||
        (__enditem__ == null && rowindex % obj.skipgap == 0)) {

        /**var __addskipitem__ = ((__enditem__ != null && __enditem__.id != __rowitem__.id && rowindex % obj.skipgap == 0) ||
            (__enditem__ == null && rowindex % obj.skipgap == 0) ? __item__ : __rowitem__); **/

        var __addskipitem__ = __rowitem__;

        __skipindex = obj.mergebinary(sortlist, __addskipitem__);

        var __skipindex__prev = ((__skipindex - 1) > 0 ? (__skipindex - 1) : 0);


        if (__addskipitem__ != null && (sortlist[__skipindex__prev].value != __addskipitem__.value) && (sortlist[__skipindex].value != __addskipitem__.value)) {

            if (sortlist[__skipindex].value < __addskipitem__.value) {

                if ((sortlist.length - 1) == __skipindex) {

                    sortlist.push(__addskipitem__);

                } else {

                    sortlist.splice(__skipindex, 0, __addskipitem__);

                }

            } else if (sortlist[__skipindex].value > __addskipitem__.value) {

                if (__skipindex == 0) {

                    sortlist.unshift(__addskipitem__);

                } else {

                    sortlist.splice(__skipindex, 0, __addskipitem__);

                }

            }

        }

    }


    return [sortlist, __skipindex];

}

Database.prototype.mergeplaceitem = function(colname, __startitem__, __enditem__, __partition__beginindex, __partition__endindex, skiprows, placebefore, placelast, __additem__, __item__) {

    var obj = this;

    var __debug = false;

    var __debug__mergeplaceitem = false;


    if (__item__ != null && __item__.next != null) {

        //console.log("__item__  id [" + __item__.id + "] : value " + __item__.value);

    }


    if (__additem__.id != __item__.id && __additem__.next.id != __item__.id) {

        var __item__prev__ = __item__.previous;

        var __item__next__ = __item__.next;


        var __prev__item = null;

        var __next__item = null;


        if (__item__.value < __additem__.value) {

            if (__additem__.previous == null) {

                __prev__item = null;

                __next__item = __additem__;

            } else {

                __prev__item = __additem__.previous;

                __next__item = __additem__;

            }

        } else {

            __prev__item = __additem__;

            __next__item = __additem__.next;

        }


        if (__prev__item != null) {

            __prev__item.next = __item__;

            if (__debug) {

                console.log("PLACE ADD PREVIOUS ITEM[" + __prev__item.id + "] : " + __prev__item.value);

            }

        }

        __item__.previous = __prev__item;

        if (__debug) {

            console.log("PLACE ADD ITEM[" + __item__.id + "] : " + __item__.value);

        }

        if (__next__item != null) {

            __next__item.previous = __item__;

            if (__debug) {

                console.log("PLACE ADD NEXT ITEM[" + __next__item.id + "] : " + __next__item.value);

            }

        }

        __item__.next = __next__item;


        if (__item__prev__ != null) {

            __item__prev__.next = __item__next__;

        }

        if (__item__next__ != null) {

            __item__next__.previous = __item__prev__;

        }


        if (placebefore) {

            if (__startitem__ != null) {

                if (__item__ != null && __item__.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __item__ : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __item__;

                } else if (__item__prev__ != null && __item__prev__.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __item__prev__ : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __item__prev__;

                } else if (__item__next__ != null && __item__next__.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __item__next__ : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __item__next__;

                } else if (__additem__ != null && __additem__.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __additem__ : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __additem__;

                } else if (__prev__item != null && __prev__item.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __prev__item : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __prev__item;

                } else if (__next__item != null && __next__item.id == __startitem__.next.id) {

                    obj.columns[colname]["headitem"] = (__partition__beginindex == 0) ? __next__item : obj.columns[colname]["headitem"];

                    skiprows[__partition__beginindex] = __next__item;

                }

                if (__debug__mergeplaceitem) {

                    console.log(" __startitem__.next[" + __startitem__.next.value + "]");
                    console.log(" ");

                }

            } else {

                if (__item__ != null && __item__.previous == null) {

                    obj.columns[colname]["headitem"] = __item__;

                    skiprows[__partition__beginindex] = __item__;

                } else if (__item__prev__ != null && __item__prev__.previous == null) {

                    obj.columns[colname]["headitem"] = __item__prev__;

                    skiprows[__partition__beginindex] = __item__prev__;

                } else if (__item__next__ != null && __item__next__.previous == null) {

                    obj.columns[colname]["headitem"] = __item__next__;

                    skiprows[__partition__beginindex] = __item__next__;

                } else if (__additem__ != null && __additem__.previous == null) {

                    obj.columns[colname]["headitem"] = __additem__;

                    skiprows[__partition__beginindex] = __additem__;

                } else if (__prev__item != null && __prev__item.previous == null) {

                    obj.columns[colname]["headitem"] = __prev__item;

                    skiprows[__partition__beginindex] = __prev__item;

                } else if (__next__item != null && __next__item.previous == null) {

                    obj.columns[colname]["headitem"] = __next__item;

                    skiprows[__partition__beginindex] = __next__item;

                }

            }

            if (__debug__mergeplaceitem) {

                console.log("PLACE START ITEM[" + obj.columns[colname]["headitem"].id + "] : " + obj.columns[colname]["headitem"].value);

            }

            if (__debug__mergeplaceitem) {

                console.log(" ");

            }

        }

        if (placelast) {

            if (__enditem__ != null) {

                if (__item__ != null && __item__.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __item__;

                } else if (__item__prev__ != null && __item__prev__.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __item__prev__;

                } else if (__item__next__ != null && __item__next__.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __item__next__;

                } else if (__additem__ != null && __additem__.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __additem__;

                } else if (__prev__item != null && __prev__item.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __prev__item;

                } else if (__next__item != null && __next__item.id == __enditem__.previous.id) {

                    skiprows[__partition__endindex] = __next__item;

                }

            } else {

                if (__item__ != null && __item__.next == null) {

                    obj.columns[colname]["lastitem"] = __item__;

                    skiprows[__partition__endindex] = __item__;

                } else if (__item__prev__ != null && __item__prev__.next == null) {

                    obj.columns[colname]["lastitem"] = __item__prev__;

                    skiprows[__partition__endindex] = __item__prev__;

                } else if (__item__next__ != null && __item__next__.next == null) {

                    obj.columns[colname]["lastitem"] = __item__next__;

                    skiprows[__partition__endindex] = __item__next__;

                } else if (__additem__ != null && __additem__.next == null) {

                    obj.columns[colname]["lastitem"] = __additem__;

                    skiprows[__partition__endindex] = __additem__;

                } else if (__prev__item != null && __prev__item.next == null) {

                    obj.columns[colname]["lastitem"] = __prev__item;

                    skiprows[__partition__endindex] = __prev__item;

                } else if (__next__item != null && __next__item.next == null) {

                    obj.columns[colname]["lastitem"] = __next__item;

                    skiprows[__partition__endindex] = __next__item;

                }

                if (__debug__mergeplaceitem) {

                    console.log("PLACE END ITEM[" + obj.columns[colname]["lastitem"].id + "] : " + obj.columns[colname]["lastitem"].value);

                }

            }


            if (__debug__mergeplaceitem) {

                console.log("PLACE END LAST PART ITEM[" + __partition__endindex + "][" + skiprows[__partition__endindex].id + "] : " + skiprows[__partition__endindex].value);

            }

            if (__debug__mergeplaceitem) {

                console.log(" ");

            }

        }

    }

    return [skiprows, __item__];

}

Database.prototype.merge = function(colname, skiprows, sectionsize) {

    var obj = this;


    var ___debug = false;
    
    var ___debug___merge = false;


    var rowcount = skiprows.length;

    var maxparts = Math.floor(rowcount / sectionsize) + ((rowcount % sectionsize) != 0 ? 1 : 0);


    var parts = 1;

    var rowitem = skiprows[0];


    var sortlist = [];

    var finallist = [];


    var skipindex = 0;

    var __loop__ = 0;


    parts = 1;

    do {

        var __partition__beginindex = (parts - 1) * sectionsize;

        var __partition__endindex = (parts * sectionsize - 1) < rowcount ? (parts * sectionsize - 1) : rowcount - 1;


        var rowindex = __partition__beginindex;

        var __rowitem__ = skiprows[__partition__beginindex];


        var __startitem__ = skiprows[__partition__beginindex].previous;

        var __enditem__ = skiprows[__partition__endindex].next;


        sortlist = [__rowitem__];

        addmore: {

            while (__rowitem__ != null && parts <= maxparts) {

                if (rowindex==98){
                    
                    var __ssssss= 0;

                }

                if (___debug___merge || (___debug && rowindex % 1000 == 0))
                    console.log("[0]  rowindex : " + rowindex + " __rowitem__[" + __rowitem__.id + "]");

                if (___debug___merge && (__rowitem__.id > __partition__endindex || __rowitem__.id < __partition__beginindex)) {

                    if (__startitem__ != null)
                        console.log("[0]  rowindex : " + (__partition__beginindex - 1) + " __startitem__[" + __startitem__.id + "]");

                    if (__enditem__ != null)
                        console.log("[0]  rowindex : " + (__partition__endindex + 1) + " __enditem__[" + __enditem__.id + "]");

                    console.log(" 1 OUTSIDE OF BOUNDRY p[" + parts + "] (" + __partition__beginindex + ", " + __partition__endindex + ") [" + rowindex + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value + " __rowitem__[" + __rowitem__.id + "] : " + __rowitem__.value);

                }

                if (___debug) {

                    console.log(" [" + __partition__beginindex + "] [" + __partition__endindex + "] [" + rowindex + "] __startitem__[" + __startitem__.id + "] : " + __startitem__.value + " __rowitem__[" + __rowitem__.id + "] : " + __rowitem__.value);

                }


                var __rowitem__prev__ = __rowitem__.previous;

                var __rowitem__next__ = __rowitem__.next;


                var __curr__next__value = null;

                var __curr__prev__value = null;


                if (__rowitem__next__ != null) {

                    __curr__next__value = __rowitem__next__.value;

                }

                if (__rowitem__prev__ != null) {

                    __curr__prev__value = __rowitem__prev__.value;

                }

                /** 
                if (__rowitem__ != null && (rowindex + 1) != __rowitem__.id)
                    console.log("error[0] rowindex : " + rowindex + " __rowitem__ : " + __rowitem__.value);
                */

                var __begin__item = __rowitem__next__;

                var __end__item = __enditem__;
                
                if (__end__item == null){

                    __end__item =  skiprows[__partition__endindex];

                }


                var __steps__ = 0;

                var __item__ = __rowitem__next__;

                var __additem__ = null;

                
                var __setskip__ = obj.mergeskipitem(sortlist, skiprows, rowindex, __end__item, __rowitem__, __item__);

                sortlist = __setskip__[0];
                

                var __skipindex = __setskip__[1];


                var __item__next__ = null;

                if (__item__ != null) {

                    __item__next__ = __item__.next;

                }


                var __initial__index__ = rowindex;

                var __final__index__ = rowindex;


                var __isnotend__ = (__end__item == null) || (__end__item != null && __end__item.id != __rowitem__.id);

                var __loopthrougharray__ = false;

                while ((__isnotend__ && __item__ != null && __item__.value < __rowitem__.value && __item__.id != __rowitem__.id)) {

                    __loopthrougharray__ = true;


                    if (___debug)
                        console.log("__rowitem__[" + __item__.id + "]");

                    if (___debug)
                        console.log("[" + __final__index__ + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value +
                            " __rowitem__[" + __rowitem__.id + "] : " + __rowitem__.value +
                            " __item__[" + __item__.id + "] : " + __item__.value);

                    if (___debug___merge && (__item__.id > __partition__endindex || __item__.id < __partition__beginindex)) {

                        if (__startitem__ != null)
                            console.log("[0]  __final__index__ : " + (__partition__beginindex - 1) + " __startitem__[" + __startitem__.id + "]");

                        if (__end__item != null)
                            console.log("[0]  __final__index__ : " + (__partition__endindex + 1) + " __end__item[" + __end__item.id + "]");

                        console.log(" 2 ERROR OUTSIDE OF BOUNDRY p[" + parts + "] (" + __partition__beginindex + ", " + __partition__endindex + ") [" + __final__index__ + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value +
                            " __rowitem__[" + __rowitem__.id + "] : " + __rowitem__.value +
                            " __item__[" + __item__.id + "] : " + __item__.value);

                    }


                    __item__next__ = __item__.next;

                    
                    var __merge__items = obj.mergeitem(sortlist, skiprows, __partition__beginindex, __partition__endindex, __startitem__, __end__item, __item__);


                    var __additem__ = __merge__items[0];

                    var __placement__delta__ = __merge__items[3];

                    var direction = __merge__items[4];


                    __final__index__++;

                    
                    var placeindex = (__final__index__ + __placement__delta__);


                    if (___debug)
                        console.log("[1]  [" + placelast + "] placerowindex : " + placeindex + " __final__index__ : " + __final__index__ + " __item__[" + __item__.id + "]");

                    /**if (__item__ != null && (__final__index__ + 1) != __item__.id)
                        console.log("error[1] [" + placelast + "] placerowindex : " + placeindex + " __final__index__ : " + __final__index__ + " __item__[" + __item__.id + "]");
                    **/


                    if (___debug___merge && (__additem__.id > __partition__endindex || __additem__.id < __partition__beginindex)) {

                        if (__startitem__ != null)
                            console.log("[0]  __final__index__ : " + (__partition__beginindex - 1) + " __startitem__[" + __startitem__.id + "]");

                        if (__end__item != null)
                            console.log("[0]  __final__index__ : " + (__partition__endindex + 1) + " __end__item[" + __end__item.id + "]");

                        console.log(" 3 ERROR OUTSIDE OF BOUNDRY p[" + parts + "] (" + __partition__beginindex + ", " + __partition__endindex + ") [" + rowindex + "] skiprows[" + skiprows[__partition__beginindex].id + "] : " + skiprows[__partition__beginindex].value +
                            " __rowitem__[" + __rowitem__.id + "] : " + __rowitem__.value +
                            " __additem__[" + __additem__.id + "] : " + __additem__.value);

                    }


                    var placebefore = ((__additem__.previous == null) || (__item__.previous == null) ||
                        (__startitem__ != null && __additem__.previous != null && __additem__.previous.id == __startitem__.id) ||
                        (__startitem__ != null && __item__.previous != null && __item__.previous.id == __startitem__.id));

                    var placelast = ((__additem__.next == null) || (__item__.next == null) ||
                        (__end__item != null && __additem__.next != null && __additem__.next.id == __end__item.id) ||
                        (__end__item != null && __item__.next != null && __item__.next.id == __end__item.id));


                    if (___debug && !placelast) {

                        console.log("placelast");
                    
                    }


                    var __merge__place__items = obj.mergeplaceitem(colname, __startitem__, __end__item, __partition__beginindex, __partition__endindex,
                        skiprows, placebefore, placelast, __additem__, __item__);

                    skiprows = __merge__place__items[0];


                    if (___debug && !obj.validateprocessing(skiprows, __partition__beginindex, __final__index__ - 1)) {

                        console.log("ERROR[" + __skipindex + "] : " + (__final__index__ + __steps__));

                    }

                    if (__item__next__ == null || (__item__next__ != null && __item__next__.value > __rowitem__.value)) {

                        __final__index__++;

                        //if (!direction)
                        //    rowindex++;

                        //if (__rowitem__ != null && (rowindex + 1) != __rowitem__.id)
                        //    console.log("error[3] rowindex : " + rowindex + " __rowitem__ : " + __rowitem__.value);

                        break;

                    }


                    __item__ = __item__next__;

                    __isnotend__ = (__end__item != null && __end__item.id != __item__.id) || (__end__item == null);


                    __steps__++;

                    sortlist = __setskip__[0];

                }


                if (__steps__ != 0) {

                    __rowitem__ = __item__next__;

                    rowindex = __final__index__;

                } else {

                    __rowitem__ = __rowitem__next__;

                    rowindex++;

                }


                __loop__ += 1;

                if (___debug && __loop__ % obj.skipgap == 0)
                    console.log("__loop__: " + __loop__);


                if (___debug && !obj.validateprocessing(skiprows, __partition__beginindex, rowindex - 1)) {

                    console.log("ERROR[" + __skipindex + "] : " + rowindex);

                }


                if (!__loopthrougharray__) {

                    if (__rowitem__ != null &&__rowitem__.next != null && (__loop__ + 1) != __rowitem__.next.id)
                        console.log("error[2] [" + placelast + "] placerowindex : " + placeindex + " rowindex : " + rowindex + " __rowitem__[" + __rowitem__.id + "]");

                }

                if ((__rowitem__ == null) || !__isnotend__ || (__end__item != null && __end__item.id == __rowitem__.id)) {

                    if (___debug___merge) {

                        console.log("partition: " + parts);

                    }


                    var __row__loop = skiprows[__partition__beginindex];

                    var indexitems = __partition__beginindex;

                    while (__row__loop != null && indexitems <= __partition__endindex) {

                        skiprows[indexitems] = __row__loop;

                        __row__loop = __row__loop.next;

                        indexitems++;

                    }


                    parts++;

                    break addmore;

                }

            }

        }

    } while (parts <= maxparts && __rowitem__ != null)

    return [skiprows.length, skiprows];

}

Database.prototype.sort = function(colname, sorttype) {

    var obj = this;

    var ___debug = false;


    var skiprows = [];

    var __row__loop = obj.columns[colname]["headitem"];


    var numberofsectionitems = 0;

    while (__row__loop != null) {

        skiprows[numberofsectionitems] = __row__loop;

        __row__loop = __row__loop.next;

        numberofsectionitems++;

    }


    var __items = obj.merge(colname, skiprows, obj.partition);

    var numberofrows = __items[0];

    var skiprowsupdate = __items[1];

    skiprows = skiprowsupdate;


    var rowcount = skiprowsupdate.length;

    var maxparts = Math.floor(rowcount / obj.partition) + ((rowcount % obj.partition) != 0 ? 1 : 0);

    /** 
    var parts = 1;

    for (; parts <= maxparts; parts++) {

        var __partition__beginindex = (parts - 1) * obj.partition;

        var __partition__endindex = (parts * obj.partition - 1) < rowcount ? (parts * obj.partition - 1) : rowcount - 1;


        if (!obj.validateprocessing(skiprowsupdate, __partition__beginindex, __partition__endindex)) { 
            console.log("ERROR validateprocessing[ b : " + __partition__beginindex + ", e : " + __partition__endindex + "]");

        }

    }


 
     __row__loop = obj.columns[colname]["headitem"];
 
     numberofsectionitems = 0;
 
     while (__row__loop != null) {
 
         skiprows[numberofsectionitems] = __row__loop;
 
         __row__loop = __row__loop.next;
 
         numberofsectionitems++;
 
     }
 */

    //var __items = obj.mergesections(colname, sorttype, numberofsectionitems, skiprowsupdate, obj.partition);

    var __items = obj.merge(colname, skiprows, skiprows.length);

    var numberofsectionitems = __items[0];

    var skiprowsupdate = __items[1];


    if (!obj.validate(skiprowsupdate, skiprowsupdate.length - 1)) {

        console.log("ERROR validate[ b : " + 0 + ", e : " + (skiprowsupdate.length - 1) + "]");

    }

    var parts = 1;

    for (; parts <= maxparts; parts++) {

        var __partition__beginindex = (parts - 1) * obj.partition;

        var __partition__endindex = (parts * obj.partition - 1) < rowcount ? (parts * obj.partition - 1) : rowcount - 1;


        if (!obj.validateprocessing(skiprowsupdate, __partition__beginindex, __partition__endindex)) { 
            console.log("ERROR validateprocessing[ b : " + __partition__beginindex + ", e : " + __partition__endindex + "]");

        }

    }

    obj.columns[colname]["headitem"] = skiprowsupdate[0];
    obj.columns[colname]["lastitem"] = skiprowsupdate[skiprowsupdate.length - 1];
    obj.columns[colname]["rows"] = skiprowsupdate[skiprowsupdate.length - 1];

    obj.sortcolumns = [obj.getColumnIndex(colname)];


    return __items;

}

/**
Database.prototype.sort01 = function(colname, sorttype) {

    var obj = this;

    var ___debug = false;


    var skiprows = new Array();

    var numberofitems = 0;


    var rowitem = obj.columns[colname]["headitem"];

    var __row__loop = rowitem;

    while (__row__loop.next != null) {

        __row__loop = __row__loop.next;

        skiprows.push(null);

        numberofitems++;

    }


    var numberofrows = 0;

    var skiprowsupdate = null;

    var __valid__ = true;


    var __items = obj.sortsection(colname, sorttype, obj.partition, skiprows, numberofitems);

    numberofrows = __items[0];

    skiprowsupdate = __items[1];


    var __items = obj.mergesections(colname, sorttype, numberofrows, skiprowsupdate, obj.partition);

    numberofrows = __items[0];

    skiprowsupdate = __items[1];


    return [numberofrows, skiprowsupdate];

}
**/

/**
Database.prototype.mergesections = function(colname, sorttype, rowcount, skiprows, sectionsize) {

    var obj = this;

    var ___debug = false;


    var numberofsectionitems = 0;

    var maxparts = Math.floor(skiprows.length / sectionsize) + ((skiprows.length % sectionsize) != 0 ? 1 : 0);

    for (var part = 1; part < maxparts; part++) {

        if (___debug || true) {

            console.log("part :" + part);

        }


        var compareindex = 0;

        var _section_size = sectionsize * (part + 1);


        var compareitem = skiprows[0];

        var compareitem_next = compareitem.next;

        var compareitem_prev = compareitem.previous;


        var rowindex = sectionsize * part;

        var rowitem = skiprows[rowindex];


        while (compareindex < _section_size && rowindex < _section_size && compareitem != null) {

            while ( rowindex < _section_size &&
                compareitem != null && rowitem != null && compareitem.id != rowitem.id) {

                //console.log("rowitem[" + rowindex + "] ID - "  + rowitem.id + " - " + rowitem.value );

                var __row__item__prev__ = rowitem.previous;

                var __row__item__next__ = rowitem.next;


                if (rowindex < skiprows.length && rowitem.id != skiprows[rowindex].id) {

                    console.log("error " + rowitem.id);

                }


                if (___debug) {

                    if (compareitem != null)
                        console.log("compareitem.value " + compareitem.value);

                    console.log("rowitem.value " + rowitem.value);

                    if (compareitem_next != null)
                        console.log("compareitem_next.value " + compareitem_next.value);

                    console.log(" ");

                }


                if ((compareitem_next != null && compareitem.value <= rowitem.value && rowitem.value < compareitem_next.value) ||
                    (compareitem_next == null && compareitem.value <= rowitem.value)) {

                    if (compareitem != null) {

                        compareitem.next = rowitem;

                    }

                    rowitem.previous = compareitem;


                    if (compareitem_next != null) {

                        compareitem_next.previous = rowitem;

                    }

                    rowitem.next = compareitem_next;


                    if (__row__item__prev__ != null) {

                        __row__item__prev__.next = __row__item__next__;

                    }

                    if (__row__item__next__ != null) {

                        __row__item__next__.previous = __row__item__prev__;

                    }


                    compareitem = rowitem;

                    rowitem = __row__item__next__;


                    if (___debug && !obj.validateprocessing(skiprows, 0, rowindex)) {

                        console.log("ERROR[" + compareindex + "] : " + rowindex);

                    }


                    rowindex++;

                } else if (compareitem != null) {

                    if (compareitem.value <= rowitem.value) {

                        compareitem = compareitem.next;

                        compareindex++;

                    } else if ((compareitem_prev != null && compareitem_prev.value <= rowitem.value && rowitem.value < compareitem.value) ||
                        (compareitem_prev == null && rowitem.value <= compareitem.value)) {

                        if (compareitem_prev != null) {

                            compareitem_prev.next = rowitem;

                        }

                        rowitem.previous = compareitem_prev;


                        if (compareitem != null) {

                            compareitem.previous = rowitem;

                        }

                        rowitem.next = compareitem;


                        if (compareitem_prev == null) {

                            skiprows[0] = rowitem;

                            obj.columns[colname]["headitem"] = rowitem;

                        }


                        if (__row__item__prev__ != null) {

                            __row__item__prev__.next = __row__item__next__;

                        }

                        if (__row__item__next__ != null) {

                            __row__item__next__.previous = __row__item__prev__;

                        }


                        compareitem = rowitem;

                        rowitem = __row__item__next__;


                        if (___debug && !obj.validateprocessing(skiprows, 0, rowindex)) {

                            console.log("ERROR[" + compareindex + "] : " + rowindex);

                        }


                        compareindex++;

                    } else if (rowitem.value <= compareitem.value) {

                        compareitem = compareitem.previous;

                        compareindex--;

                    }


                    if (compareitem != null) {

                        compareitem_prev = compareitem.previous;

                        compareitem_next = compareitem.next;

                    }

                } else {

                    break;

                }

            }


            if (compareitem != null) {

                compareitem_prev = compareitem.previous;

                compareitem_next = compareitem.next;

            }

            if (compareitem != null && rowitem != null && compareitem.id == rowitem.id) {

                //console.log("compare[" + compareindex + "] == rowitem[" + rowindex + "] id[" + compareitem.id + "]");

                break;

            }

        }

    }


    var __row__loop = skiprows[0];

    var __row__loop__last = __row__loop;

    var numberofsectionitems = 0;

    while (__row__loop != null && numberofsectionitems < _section_size) {

        skiprows[numberofsectionitems] = __row__loop;

        __row__loop__last = __row__loop;

        __row__loop = __row__loop.next;

        numberofsectionitems++;

    }


    if (__row__loop == null) {

        obj.columns[colname]["lastitem"] = __row__loop__last;

        obj.columns[colname]["rows"] = __row__loop__last;

    }

    return [numberofsectionitems, skiprows];

}
**/

Database.prototype.validateprocessing = function(skiprows, beginindexcheck, endindexcheck) {

    var index = beginindexcheck;


    var __valid__ = true;

    var rowitem = skiprows[0];


    while (index < skiprows.length && index <= endindexcheck && __valid__) {

        var beginindex = index;

        var middleindex = (index + 1 < skiprows.length) ? index + 1 : index;

        var endinindex = (index + 2 < skiprows.length) ? index + 2 : index;


        var beginitem = null;

        var middleitem = null;

        var lastitem = null;


        if (beginindex < skiprows.length && beginindex <= endindexcheck) {

            beginitem = rowitem;

            __valid__ &= beginitem != null;

        }

        if (middleindex < skiprows.length && middleindex <= endindexcheck) {

            if (rowitem != null) {

                middleitem = rowitem.next;

                __valid__ &= middleitem != null;

            } else {

                //__valid__ &= false;

            }

        }

        if (endinindex < skiprows.length && endinindex <= endindexcheck) {

            if (rowitem != null) {

                if (rowitem.next != null) {

                    lastitem = rowitem.next.next;

                    __valid__ &= lastitem != null;

                } else {

                    //__valid__ &= false;

                }

            } else {

                __valid__ &= false;

            }

        }


        if (beginitem != null) {

            if (middleitem != null) {

                if (lastitem != null) {

                    __valid__ &= (beginitem.id != middleitem.id);
                    __valid__ &= (lastitem.id != middleitem.id);
                    __valid__ &= (beginitem.value <= middleitem.value && middleitem.value <= lastitem.value);

                } else {

                    __valid__ &= (beginitem.id != middleitem.id);
                    __valid__ &= (beginitem.value <= middleitem.value);

                }

            }

        } else {

            __valid__ &= false;

        }


        if (!__valid__) {

            console.log("error rowitem[" + index + "] : id [" + rowitem.id + "] " + rowitem.value);

            if (beginitem != null)
                console.log("error rowitem[" + index + "] : id [" + beginitem.id + "] " + beginitem.value);

            if (middleitem != null)
                console.log("error rowitem[" + index + "] : id [" + middleitem.id + "] " + middleitem.value);

            if (lastitem != null)
                console.log("error rowitem[" + index + "] : id [" + lastitem.id + "] " + lastitem.value);

        }


        rowitem = rowitem.next;

        index++;

    }


    return __valid__;

}

Database.prototype.validate = function(skiprows, sectionsize) {

    var index = 0;


    var __valid__ = true;

    var rowitem = skiprows[0];


    while (index < skiprows.length && index < sectionsize) {

        var beginindex = index;
        var middleindex = (index + 1 < skiprows.length) ? index + 1 : index;
        var endinindex = (index + 2 < skiprows.length) ? index + 2 : index;

        var beginitem = null;
        var middleitem = null;
        var lastitem = null;

        if (beginindex < skiprows.length) {

            beginitem = skiprows[beginindex];
            __valid__ &= beginitem != null;
            __valid__ &= rowitem != null;

            if (beginitem != null && rowitem != null) {
                __valid__ &= (rowitem.id == beginitem.id);
                __valid__ &= rowitem != null;
            }

        }

        if (middleindex < skiprows.length) {

            middleitem = skiprows[middleindex];

            __valid__ &= middleitem != null;
            __valid__ &= rowitem != null;

            if (middleitem != null && rowitem.next != null) {
                __valid__ &= (rowitem.next.id == middleitem.id);
                __valid__ &= (beginitem.value <= middleitem.value);
            }

        }

        var _condition_ = true;

        if (endinindex < skiprows.length) {

            lastitem = skiprows[endinindex];

            _condition_ &= lastitem != null;
            _condition_ &= rowitem.next != null;

            if (lastitem != null && rowitem.next.next != null) {
                _condition_ &= (rowitem.next.next.id == lastitem.id);
                _condition_ &= (beginitem.value <= middleitem.value && middleitem.value <= lastitem.value);
            }

        }


        if (!_condition_) {

            console.log("VALIDATE ERROR : [" + index + "] " + rowitem.value)

        }

        __valid__ &= _condition_;
        
        rowitem = rowitem.next;

        index++;

    }


    if (!__valid__) {

        console.log("VALIDATE ERROR : " + __valid__);

    }

    return __valid__;

}

/** 
Database.prototype.mergesections01 = function(colname, sorttype, rowcount, skiprows, sectionsize) {

        var obj = this;

        var ___debug = false;


        var numberofsectionitems = 0;

        var part = 1;


        var maxparts = Math.floor(skiprows.length / sectionsize) + ((skiprows.length % sectionsize) != 0 ? 1 : 0);


        var rowindex = sectionsize;

        var numberofitems = skiprows.length;


        for (; part < maxparts; part++) {

            var thissectionsize = sectionsize * part;

            var row_index = 0;


            var beginindex = 0;

            var endindex = sectionsize * part - 1;

            var middleindex = Math.floor((endindex - beginindex) / 2);


            var __begin__item = skiprows[beginindex];

            var __middle__item = skiprows[middleindex];

            var __end__item = skiprows[endindex];


            var compareitem = __begin__item;

            var _section_size = sectionsize * (part + 1);

            while (rowindex < _section_size && compareitem != null) {

                var rowitem = skiprows[rowindex];

                var __row__item__prev__ = rowitem.previous;

                var __row__item__next__ = rowitem.next;


                var __row__miditem__prev__ = __middle__item.previous;


                if (rowitem.value < __middle__item.value) {

                    if (__row__miditem__prev__ != null) {

                        __row__miditem__prev__.next = rowitem;

                    }

                    rowitem.previous = __row__miditem__prev__;


                    rowitem.next = __middle__item;

                    __middle__item.previous = rowitem;


                    __row__item__prev__.next = null;

                    __row__item__next__.previous = null;


                    if (__row__item__prev__ != null) {

                        __row__item__prev__.next = __row__item__next__;

                    }

                    if (__row__item__next__ != null) {

                        __row__item__next__.previous = __row__item__prev__;

                    }


                    if (rowitem.previous == null) {

                        skiprows[0] = rowitem;

                        obj.columns[col_]["headitem"] = rowitem;

                    }

                } else {

                    break;

                }

                rowindex++;


                beginindex = 0;

                endindex = sectionsize * part - 1;

                middleindex = Math.floor((endindex - beginindex) / 2);


                __begin__item = skiprows[beginindex];

                __middle__item = skiprows[middleindex];

                __end__item = skiprows[endindex];

            }


            var __row__loop = skiprows[0];

            if (__row__loop.previous == null) {

                obj.columns[colname]["headitem"] = __row__loop;

            }


            if (__row__loop == null) {

                obj.columns[colname]["lastitem"] = __row__loop;

                obj.columns[colname]["rows"] = __row__loop;

            }


            var __items = obj.sortsection(colname, sorttype, _section_size, skiprows, _section_size);

            var numberofrows = __items[0];

            skiprows = __items[1];

        }

    } 
    **/

Database.prototype.getData = function() {
    var obj = this;


    var colindex = 0;

    if (obj.sortcolumns.length > 0) {

        colindex = obj.sortcolumns[0];

    }


    var columnname = obj.getColumnName(colindex);

    return obj.columns;

}

Database.prototype.getArray = function() {
    var obj = this;


    var data = new Array();

    var colindex = 0;

    if (obj.sortcolumns.length > 0) {

        colindex = obj.sortcolumns[0];

    }


    var columnname = obj.getColumnName(colindex);

    var rowitems = obj.columns[columnname]["headitem"];


    while (rowitems != null) {

        var item = {};

        var nextitem = rowitems.next;


        var rowitemleft = rowitems;

        while (rowitemleft != null) {

            if (rowitemleft.left == null) {

                break;

            }

            rowitemleft = rowitemleft.left;

        }

        var rowitemright = rowitemleft;

        while (rowitemright != null) {

            var row_name = rowitemright["column"];

            var row_value = rowitemright["value"];


            item[row_name] = row_value;

            rowitemright = rowitemright.right;

        }


        data.push(item);


        rowitems = nextitem;

    }


    return data;

}

Database.prototype.removeAll = function(isasync, paramslist) {
    var obj = this;

    var objcollection = obj.collection;

    for (var x = 0; x < objcollection.length; x++) {
        var objhere = objcollection[x];

        var params = null;

        if (typeof paramslist != "undefined") {
            if (x < paramslist.length) {
                params = paramslist[x];
            }
        }

        if (objhere instanceof QueueItem) {
            if (typeof objhere["queueindex"] != "undefined") {
                objhere["queueindex"] = x;
            }

            params["queueindex"] = objhere["queueindex"];

            if (isasync) {

                var _settimeoutid_ = setTimeout(function() {

                    window._settimeoutid_removeall[_settimeoutid_] = _settimeoutid_;

                    objhere.remove(params);

                    if (_settimeoutid_ != null) {
                        window.clearTimeout(_settimeoutid_);
                    }

                }, 1000);

            } else {

                objhere.remove(params);

            }

        } else {

            objhere(params);

        }

    }


};
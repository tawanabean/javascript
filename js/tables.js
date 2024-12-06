/**
 * @author Tawana
 *
 * Copyright 2011, Tawana Bean
 *
 * @date : Jan 2, 2012
 */

"use strict";


window.__array__rows__to__queue = {};

var TableSort = function(objoptions) {
    this.datahere = objoptions["data"];
    this.idhere = objoptions["id"];
    this.callback = objoptions["callback"];
    this.index = objoptions["index"];
    this.parentid = objoptions["parentid"];
    this.objdebughere = { strparse__01: "" };

    this._this = this;

}

TableSort.prototype.settable = function() {

    var _this_ = this._this;

    var objwidget = new uiwidget(_this_.idhere + " tbody", document);

    objwidget.setHtml(_this_.datahere, _this_.createrows, _this_);

    this.objdebughere = objwidget.objdebughere;

}
window.toclearinter = {}
TableSort.prototype.createrows = function(ref, dt, objcontent, _parent_ref) {

    var __obj = _parent_ref;

    var objutil = new util();

    var timestamp = objutil.getuniquetime();

    var table_rows = "";

    var _index_ = __obj.index;

    var objtableparams = __obj.tableparams;



    var __funcpagequeue = function(_rowindex, __idhere, __tbody__, dt) {

        if (__idhere != null && _rowindex < dt.length) {

            // CREATE LOOP PROCESS HERE

            var table_cells = "";

            var row = __tbody__.insertRow(_rowindex);
            row.setAttribute("id", __idhere);

            var set = dt[_rowindex];

            for (var cellitem in set) {
                var cells = row.insertCell(-1);
                cells.innerHTML = set[cellitem];
            }

        }

    }

    var objCollection = new Collection({
        id: 'tablecreation'
    });

    for (var x = 0; x < objcontent.length; x++) {

        for (var ifound = 0; ifound < objcontent[x].length; ifound++) {

            var __content__ = objcontent[x][ifound];

            for (var _ifound_ = 0; _ifound_ < __content__.length; _ifound_++) {

                var contentitem = __content__[_ifound_];

                var idhere = "utils_" + objutil.getuniquetime();

                if (contentitem.getAttribute("id") != null) {
                    idhere = contentitem.getAttribute("id");
                }

                contentitem.setAttribute("id", idhere);

                var tbody = document.getElementById(idhere);

                var objQueueItem = new QueueItem({
                    obj: __obj,
                    queueindex: _index_,
                    id: 'tablecreation_' + idhere,
                    objutil: objutil,
                    tbody: tbody,
                    dt: __obj.datahere
                });

                objQueueItem.addtask(function(obj, __objqueue) {
                    var _thisqueue = this;

                    var currobj = __objqueue["curr_object"];

                    var objqueue = currobj['obj'];
                    var pagequeue = currobj['id'];
                    var parentid = currobj['parentid'];

                    var __objutil = currobj['objutil'];
                    var __tbody = currobj['tbody'];
                    var __dt = currobj['dt'];
                    var __idhere = "utils_" + __objutil.getuniquetime();

                    var rowitem = 0;

                    var _set_timeout_id_ = "_settimeoutid_removeall_" + __objutil.getuniquetime();

                    var _fcn_queue = {}
                    _fcn_queue["_table_startall"] = {};
                    _fcn_queue["_table_startall"][_set_timeout_id_] = {};
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__tbody"] = __tbody;
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__dt"] = __dt;
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__rowitem"] = rowitem;
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__idhere"] = __idhere;
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__pagequeue"] = pagequeue;
                    _fcn_queue["_table_startall"][_set_timeout_id_]["__parentid"] = parentid;

                    var objQueueRowItem = new QueueItem({
                        id: 'tablerowcreation_' + __idhere,
                        row_fcn_queue: _fcn_queue,
                        set_timeout_id: _set_timeout_id_,
                        pagequeue: pagequeue
                    });

                    objQueueRowItem.addtask(function(objrow, __objrowqueue) {
                        var __this = __objrowqueue;

                        var row_curr_object = __this["curr_object"];
                        var row_fcn_queue = row_curr_object["row_fcn_queue"];
                        var set_timeout_id = row_curr_object["set_timeout_id"];
                        var pagequeue = row_curr_object["pagequeue"];

                        var __queue__row__here = row_fcn_queue["_table_startall"][set_timeout_id];
                        var __tbody__ = __queue__row__here["__tbody"];
                        var __dt__ = __queue__row__here["__dt"];
                        var __idhere = __queue__row__here["__idhere"];
                        var __pagequeue = __queue__row__here["__pagequeue"];

                        row_fcn_queue["_table_startall"][set_timeout_id]["__cnrowitem"] = {};


                        var _rowindex = 0;

                        var _rowgap = 500;

                        if (__dt__.length >= 1) {

                            var __set__interval = 1;

                            var _settimeid_ = window.setInterval(function() {

                                var __row__loop__ = false;

                                if (_rowindex < __dt__.length && __tbody__ != null) {

                                    while ((_rowindex + 1) % _rowgap != 0) {

                                        __funcpagequeue(_rowindex, __idhere, __tbody__, __dt__);

                                        _rowindex++;

                                        __row__loop__ = true;

                                    }

                                }
                                

                                if ((_rowindex + 1) % _rowgap == 0 || ((_rowindex + 1) == __dt__.length)) {

                                    __funcpagequeue(_rowindex, __idhere, __tbody__, __dt__);

                                    _rowindex++;
                                        
                                    
                                    var returned_id = row_fcn_queue["_table_startall"][_set_timeout_id_]["_settimeid_"];

                                    window.clearInterval(window.toclearinter[returned_id]);

                                }

                            }, __set__interval);


                            window.toclearinter[_settimeid_] = _settimeid_;

                            row_fcn_queue["_table_startall"][_set_timeout_id_]["_settimeid_"] = _settimeid_;


                            if (__dt__.length == 1) {

                                window.clearInterval(_settimeid_);

                            }

                        }

                    });

                    __array__rows__to__queue["tablerowcreation_" + pagequeue] = {};
                    __array__rows__to__queue["tablerowcreation_" + pagequeue]["queueitem"] = objQueueRowItem;
                    __array__rows__to__queue["tablerowcreation_" + pagequeue]["loop"] = true;
                    __array__rows__to__queue["tablerowcreation_" + pagequeue]["rowitem"] = 0;

                    if (__objutil.isvalue(__dt) && __objutil.isvalue(__dt.length)) {

                        var numberofrecordsinset = __dt.length;

                        if (numberofrecordsinset > 0) {
                            var _settimeid_ = window.setInterval(function(__array__rows__to__queue, tablekey, rowlength) {

                                var loopintervals = false;

                                var objItem = __array__rows__to__queue[tablekey];

                                if (objItem != null && objItem["loop"]) {
                                    objItem["queueitem"].start();
                                    loopintervals |= objItem["loop"];
                                }


                                if (!loopintervals && objItem["rowitem"] >= rowlength) {
                                    //window.clearInterval(_settimeid_);
                                }

                            }(__array__rows__to__queue, "tablerowcreation_" + pagequeue, numberofrecordsinset), 10);
                        }

                    }

                });

                objCollection.addToQueue(objQueueItem);

            }

        }

    }


    objCollection.startAllInterval(true, __obj);

    document.getElementById("_debug__box__").value += " objCollection.startAllInterval : \n";

    return this;

}

TableSort.prototype.eventsetup = function() {

    var _this_ = this._this;

    var objwidget = new uiwidget(_this_.idhere + " thead td", document);

    //alert(_this.idhere + " thead td");

    objwidget.setHtml([], _this_.createevents, _this_);

}

TableSort.prototype.sort = function() {

    var _this_ = this._this;

    var objwidget = new uiwidget(_this_.idhere + " thead td", document);

    //alert(_this.idhere + " thead td");


}

TableSort.prototype.createevents = function(ref, dt, objcontent) {

    var objutil = new util();

    var timestamp = objutil.getuniquetime();

    var table_rows = "";

    for (var x = 0; x < objcontent.length; x++) {

        for (var y = 0; y < objcontent.length; y++) {

            var _objcontent_ = objcontent[x][y];

            for (var ifound = 0; ifound < _objcontent_.length; ifound++) {

                var _content_ = _objcontent_[ifound];

                var _fcn_content_ = function(evt) {
                    var obj = this;
                    var valhere = obj.innerHTML;

                    var width = obj.getAttribute("data-width");
                    var id = obj.getAttribute("data-id");
                    var type = obj.getAttribute("data-type");
                    var resizeable = obj.getAttribute("data-resizeable");
                    var sortable = obj.getAttribute("data-sortable");
                    var name = obj.getAttribute("data-name");

                    alert(valhere + " \n " +
                        " name: " + name + " \n " +
                        " width: " + width + " \n " +
                        " id: " + id + " \n " +
                        " type: " + type + " \n " +
                        " resizeable: " + resizeable + " \n " +
                        " sortable: " + sortable + " \n ");

                };

                _content_.onclick = _fcn_content_;
            }

        }

    }

    return this;

}

TableSort.prototype.init = function() {

    this.settable();

    this.eventsetup();

    var data = null;

    if (typeof this.callback == "function") {

        this.callback(data);

    }

}
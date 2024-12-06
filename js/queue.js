/**
 * @author Tawana
 * 
 * Copyright 2011, Tawana Bean
 *
 * @date : October 2, 2012 
 */

"use strict";

var QueueItem = function(objhere) {
    this.queueindex = null;
    this.id = null;
    this.parentid = null;
    this.type = null;
    this.value = null;
    this.curr_object = objhere;

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

    if (typeof objhere["parentid"] != "undefined") {
        this.parentid = objhere["parentid"];
    } else {
        this.parentid = 0;
    }

    if (typeof objhere["type"] != "undefined") {
        this.type = objhere["type"];
    }

    if (typeof objhere["value"] != "undefined") {
        this.value = objhere["value"];
    }

    this.starttask = [];
    this.stoptask = [];
    this.restarttask = [];
    this.removetask = [];

};
QueueItem.prototype.addtask = function(objstarttask, objstoptask, objrestarttask, objremovetask) {
    var obj = this;

    if (typeof objstarttask == "function") {
        obj.starttask.push(objstarttask);
    }

    if (typeof objstoptask == "function") {
        obj.stoptask.push(objstoptask);
    }

    if (typeof objrestarttask == "function") {
        obj.restarttask.push(objrestarttask);
    }

    if (typeof objremovetask == "function") {
        obj.removetask.push(objremovetask);
    }
};
QueueItem.prototype.start = function(params) {
    var obj = this;

    if (typeof obj.starttask[0] == "function") {
        obj.starttask[0](params, obj);
    }

};

QueueItem.prototype.stop = function(params) {
    var obj = this;

    if (typeof obj.starttask[0] == "function") {
        obj.stoptask[0](params, obj);
    }

};
QueueItem.prototype.restart = function(params) {
    var obj = this;

    if (typeof obj.restarttask[0] == "function") {
        obj.restarttask[0](params, obj);
    }

};
QueueItem.prototype.remove = function(params) {
    var obj = this;

    if (typeof obj.removetask[0] == "function") {
        obj.removetask[0](params, obj);
    }

};

var Collection = function(objhere) {
    this.id = null;
    this.type = null;

    if (typeof objhere != "undefined") {

        if (typeof objhere["id"] != "undefined") {
            this.id = objhere["id"];
        }

        if (typeof objhere["type"] != "undefined") {
            this.type = objhere["type"];
        }

    }

    this.collection = [];

    window._settimeoutid_startall = {};
    window._settimeoutid_stopall = {};
    window._settimeoutid_removeall = {};
    window._settimeoutid_restartall = {};

};
Collection.prototype.getuniquetime = function() {
    var time = new Date().getTime();

    while (time == new Date().getTime());

    return new Date().getTime();
};
Collection.prototype.addToQueue = function(objhere) {
    var obj = this;

    if (objhere instanceof QueueItem) {
        if (typeof objhere["id"] == "undefined" || this["id"] == null) {
            objhere["id"] = obj.collection.length;
        }
    }

    obj.currobject = objhere;

    obj.collection.push(objhere);
};
Collection.prototype.getFromQueue = function(id) {
    var obj = this;

    return obj.searchQueue(id, obj.collection);
};
Collection.prototype.searchQueue = function(id, list, _arg, _arg2, _arg3) {
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
Collection.prototype.removeFromQueue = function(objhere) {
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
Collection.prototype.getCollection = function() {
    var obj = this;

    return obj.collection;
};

Collection.prototype.popFromQueue = function(callback) {
    var obj = this;

    if (obj.getCollection().length > 0) {

        if (typeof callback != "undefined") {
            callback();
        }

        return {

            data: obj.getCollection().splice(0, 1)

        };

    }

    if (typeof callback != "undefined") {
        callback();
    }

    return false;
};

Collection.prototype.clearAll = function(isasync, paramslist) {
    var obj = this;

    for (var x in _settimeoutid_startall) {

        obj.clearTimeout(x);

    }

    for (var x in _settimeoutid_removeall) {

        obj.clearTimeout(x);

    }

    for (var x in _settimeoutid_restartall) {

        obj.clearTimeout(x);

    }

    for (var x in _settimeoutid_stopall) {

        obj.clearTimeout(x);

    }

};

Collection.prototype.stopAll = function(isasync, paramslist) {
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
            if (typeof objhere["queueindex"] == "undefined") {
                objhere["queueindex"] = x;
            }

            params["queueindex"] = objhere["queueindex"];

            if (isasync) {

                _settimeoutid_ += "_" + obj.getuniquetime();
                _settimeoutid_ += ("_stopall");

                window._settimeoutid_stopall[_settimeoutid_] = _settimeoutid_;

                var _settimeoutid_ = setTimeout(function() {
                    objhere.stop(_settimeoutid_, params);

                    if (_settimeoutid_ != null) {
                        //window.clearTimeout(window["_settimeoutid_stopall"][_settimeoutid_]);
                    }
                }, 1000);

                window["_settimeoutid_stopall"][_settimeoutid_] = _settimeoutid_;

            } else {

                objhere.stop(params);

            }

        } else {

            objhere(params);

        }
    }

};

Collection.prototype.startAll = function(isasync, paramslist) {

    var obj = this;

    var __timestop = 1000;

    var objcollection = obj.collection;

    var datastore = window["_settimeoutid_startall"];

    for (var x = 0; x < objcollection.length; x++) {

        var _set_timeout_id_ = "_startall_" + obj.getuniquetime();

        var objhere = objcollection[x];

        var params = null;

        if (typeof paramslist != "undefined") {
            if (x < paramslist.length) {
                params = paramslist[x];
            }
        }

        if (objhere instanceof QueueItem) {
            if (typeof objhere["queueindex"] == "undefined" || objhere["queueindex"] == null) {
                objhere["queueindex"] = x;
                params["queueindex"] = x;
            }

            if (isasync) {

                datastore[_set_timeout_id_] = {};
                datastore[_set_timeout_id_]["idhere"] = _set_timeout_id_;

                var _settimeoutid_ = setTimeout(function(idhere) {

                    params["parentid"] = idhere;

                    objhere.start(params);

                    if (idhere != null) {
                        //window.clearTimeout(window["_settimeoutid_startall"]["_settimeoutid_"]);
                    }

                }(_set_timeout_id_), __timestop);

                datastore[_set_timeout_id_]["_settimeoutid_"] = _settimeoutid_;

            } else {
                objhere.start(params);
            }

        } else {
            objhere(params);
        }
    }

};

Collection.prototype.startAllInterval = function(isasync, paramslist) {

    var obj = this;

    var __timestop = 1000;


    var objcollection = obj.collection;

    var __maxparts = Math.floor(objcollection.length / __timestop);

    __maxparts += (__maxparts % __timestop != 0 || __maxparts == 0) ? 1 : 0;


    var __maxparts = objcollection.length;


    var _set_timeout_id_ = "_startall_COLLECTION_" + obj.getuniquetime();

    var repeatfcn = function(set_timeout_id, part, maxparts) {

        if (window[set_timeout_id]["interval"][part] < maxparts) {

            var objhere = objcollection[part];
            var params = null;

            if (typeof paramslist != "undefined") {
                if (part < paramslist.length) {
                    params = paramslist[part];
                }
            }

            if (objhere instanceof QueueItem) {
                if (typeof objhere["queueindex"] == "undefined" || objhere["queueindex"] == null) {
                    objhere["queueindex"] = part;
                    params["queueindex"] = part;
                }

                objhere.start(params);

            }

        }

    }

    window[_set_timeout_id_] = {};
    window[_set_timeout_id_]["interval"] = {};
    window[_set_timeout_id_]["timeout_id_fcn"] = {};
    window[_set_timeout_id_]["interval"][0] = 0;

    var listofasyncs = [];

    for (var queobject = 0; queobject < __maxparts; queobject++) {

        var _set_timeout_id_fcn = setTimeout(function(set_timeout_id, index, maxparts) {

            var existmaximum = window[_set_timeout_id_]["interval"][__maxparts];

            document.getElementById("_debug__box__").value += " clearInterval : " + window[_set_timeout_id_]["interval"][index] + "\n";

            if ((typeof existmaximum == "undefined" || existmaximum == null)) {

                repeatfcn(set_timeout_id, index, maxparts);

                window[set_timeout_id]["interval"][index + 1] = queobject + 1;

            }

        }(_set_timeout_id_, queobject, __maxparts), __timestop);

        listofasyncs.push(_set_timeout_id_fcn);

    }

    var _set_timeout_id_fcn_02 = setTimeout(function() {

        var existmaximum = window[_set_timeout_id_]["interval"][__maxparts];

        if ((typeof existmaximum != "undefined" || existmaximum != null)) {

            //window.clearInterval(_set_timeout_id_fcn);

        }

    }(), __timestop);

}

Collection.prototype.removeAll = function(isasync, paramslist) {
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

                _settimeoutid_ += "_" + obj.getuniquetime();
                _settimeoutid_ += ("_removeall");

                window._settimeoutid_removeall[_settimeoutid_] = _settimeoutid_;

                var _settimeoutid_ = setTimeout(function() {
                    objhere.remove(params);

                    if (_settimeoutid_ != null) {
                        window.clearTimeout(window["_settimeoutid_removeall"][_settimeoutid_]);
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

Collection.prototype.restartAll = function(isasync, paramslist) {
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
            if (typeof objhere["queueindex"] == "undefined") {
                objhere["queueindex"] = x;
            }

            params["queueindex"] = objhere["queueindex"];

            if (isasync) {
                _settimeoutid_ += "_" + obj.getuniquetime();
                _settimeoutid_ += ("_restartall");

                window._settimeoutid_restartall[_settimeoutid_] = _settimeoutid_;

                var _settimeoutid_ = setTimeout(function() {
                    objhere.restart(params);

                    if (_settimeoutid_ != null) {
                        window.clearTimeout(window["_settimeoutid_restartall"][_settimeoutid_]);
                    }
                }, 1000);
            } else {
                objhere.restart(params);
            }
        } else {
            objhere(params);
        }
    }

};
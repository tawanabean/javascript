/**
 * @author Tawana
 * 
 * Copyright 2021 Tawana Bean
 *
 * @date : Decemeber 30, 2021 
 */

"use strict";

var __objtreeutil = new util();

var TreeItem = function() {

    this.util = __objtreeutil;

    this.id = __this.util.getID();

    this.data = null;

    this.type = null;

    this.parent = null;

}

var Tree = function(objhere) {

    this.util = __objtreeutil;

    this.parent = null;

    this.left = null;

    this.right = null;

}

Tree.prototype.add = function(item, typeofdata) {

    var __this = this;

    var __util = __this.util;


    var objparent = __util.isvalue(__this.parent) ? __this.parent : null;

    var objleft = __util.isvalue(__this.left) ? __this.left : null;

    var objright = __util.isvalue(__this.right) ? __this.right : null;

    var objitem = __util.isvalue(item) ? item : null;


    var _parent_val_ = "";

    var _left_val_ = "";

    var _right_val_ = "";

    if (objitem != null) {

        if (objparent != null) {

            var _ref = _this.parent;

            _parent_val_ = objparent.data;

            if (objleft != null) {
                _left_val_ = objleft.data;
            }

            if (objright != null) {
                _right_val_ = objright.data;
            }

            if (_parent_val_ <= objitem.data) {

                while (_parent_val_ > objitem.data && _ref != null) {

                    objparent = __util.isvalue(_ref.parent) ? _ref.parent : null;

                    objleft = __util.isvalue(_ref.left) ? _ref.left : null;

                    objright = __util.isvalue(_ref.right) ? _ref.right : null;

                    _ref = _ref.parent;

                }

            }

        }

    }

}

Tree.prototype.addToLeft = function(item, typeofdata) {

    var __this = this;


    var additemtotree = new TreeItem();

    additemtotree.data = item;

    additemtotree.type = typeofdata;

    additemtotree.parent = __this;


    __this.left = additemtotree;

}

Tree.prototype.addToRight = function(item, typeofdata) {

    var __this = this;


    var additemtotree = new TreeItem();

    additemtotree.data = item;

    additemtotree.type = typeofdata;

    additemtotree.parent = __this;


    __this.right = additemtotree;

}

Tree.prototype.search = function(item) {

    var __this = this;


    var searchtreeitem = new Tree();

    searchtreeitem.data = item;

    searchtreeitem.type = typeofdata;

    searchtreeitem.parent = __this;

}

Tree.prototype.sort = function() {

    var __this = this;




}
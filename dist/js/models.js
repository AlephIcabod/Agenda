"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

//clase contacto

var Contacto = function Contacto(row) {
    _classCallCheck(this, Contacto);

    this.id = _.uniqueId();
    this.name = row.name;
    this.last_name = row.last_name;
    this.email = row.email;
    this.country = row.country;
};
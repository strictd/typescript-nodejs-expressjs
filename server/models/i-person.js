"use strict";
var IPerson = (function () {
    function IPerson() {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.canTextMessage = false;
    }
    return IPerson;
}());
exports.IPerson = IPerson;

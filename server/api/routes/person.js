'use strict';
var i_person_1 = require('../../models/i-person');
var PlayerRoute;
(function (PlayerRoute) {
    var Info = (function () {
        function Info() {
        }
        Info.prototype.show = function (req, res, next) {
            var player = new i_person_1.IPerson();
            player.name = 'Strict Development';
            player.email = 'strictd';
            player.phone = '123-123-1234';
            player.canTextMessage = true;
            res.status(200).send(player);
        };
        return Info;
    }());
    PlayerRoute.Info = Info;
})(PlayerRoute || (PlayerRoute = {}));
module.exports = PlayerRoute;

pc.script.create('player', function (context) {
    // Creates a new Player instance
    var Player = function (entity) {
        this.entity = entity;
    };

    Player.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Player;
});
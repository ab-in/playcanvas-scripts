pc.script.create('game_manager', function (context) {
    // Creates a new Game_manager instance
    var Game_manager = function (entity) {
        this.entity = entity;
        this.paused = false;
        this.enemySelected = null;
    };

    Game_manager.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Game_manager;
});
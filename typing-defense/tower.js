pc.script.create('tower', function (context) {
    // Creates a new Tower instance
    var Tower = function (entity) {
        this.entity = entity;
    };

    Tower.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        onTriggerEnter: function (entity)
        {
            //this.entity.destroy();
            entity.destroy();
        }
    };

    return Tower;
});
pc.script.attribute('speed', 'number', 3, {
    displayName: "Speed"
});

pc.script.create('attack_tower', function (context) {
    // Creates a new Attack_tower instance
    var Attack_tower = function (entity) {
        this.entity = entity;
    };

    Attack_tower.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.targetEntity = context.root.findByName('Tower');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (this.targetEntity !== null)
            {
                var currentPosition = this.entity.getPosition();
                var targetPosition = this.targetEntity.getPosition();

                //targetPosition.y = currentPosition.y;
                this.entity.lookAt(targetPosition);
                //this.entity.rotate(0, 180, 0);
                this.entity.rigidbody.syncEntityToBody();

                this.entity.translateLocal(0, 0, -this.speed * dt);
            }
        }
    };

    return Attack_tower;
});
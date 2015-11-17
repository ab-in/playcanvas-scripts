pc.script.attribute('distance', 'number', 10);
pc.script.attribute('height', 'number', 2);
pc.script.attribute('speed', 'number', 10);

pc.script.create('camera', function (context) {
    var gameManager;
    
    // Creates a new Camera instance
    var Camera = function (entity) {
        this.entity = entity;
        this.distance = 10;
        this.height = 2;
        this.orbitAngle = 0;
    };

    Camera.prototype = {
        initialize: function () {
            this.targetEntity = this.primaryTargetEntity = context.root.findByName('Tower');
            gameManager = context.root.findByName('GameManager');
        },
        
        update: function (dt) {
            if (gameManager.script.game_manager.enemySelected)
            {
                this.targetEntity = gameManager.script.game_manager.enemySelected;
            }
            else
            {
                this.targetEntity = this.primaryTargetEntity;
            }
            
            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.orbitAngle--;
            }
            else if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.orbitAngle++;
            }
            else if (context.keyboard.isPressed(pc.input.KEY_UP)) {
                this.distance--;
            }
            else if (context.keyboard.isPressed(pc.input.KEY_DOWN)) {
                this.distance++;
            }
            else
            {
                this.orbitAngle += this.speed * dt;
            }

            var cameraEntity = this.entity;

            // Step 1: Place the camera where the sphere is
            cameraEntity.setPosition(this.targetEntity.getPosition());

            // Step 2: Rotate the ball around the world Y (up) axis by some stored angle
            cameraEntity.setEulerAngles(0, this.orbitAngle, 0);

            // Step 3: Move the camera backwards by some 'distance' and up by some 'height'
            // Note that a camera looks down its negative Z local axis. So if this.distance
            // is a positive number, it will move backwards.
            cameraEntity.translateLocal(0, this.height, this.distance);

            // Step 4: Look at the ball from the camera's new position
            cameraEntity.lookAt(this.targetEntity.getPosition());
        }
    };

    return Camera;
});
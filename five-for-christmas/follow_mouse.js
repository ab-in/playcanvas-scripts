pc.script.attribute('speed', 'number', 3, {
    displayName: "Speed"
});

pc.script.attribute('distanceToKeep', 'number', 3, {
    displayName: "Distance to Keep From Mouse"
});

pc.script.create('follow_mouse', function (context)
{
    // Local function variables.
    var cameraEntity;
    var mousePosition;

    // Creates a new Follow_mouse instance
    var Follow_mouse = function (entity)
    {
        this.entity = entity;

        mousePosition = new pc.Vec3();

        // To handle mouse movement.
        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
    };

    Follow_mouse.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function ()
        {
            // Setup the local variable for the camera.
            cameraEntity = context.root.findByName('Camera');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt)
        {
            var playerPosition = this.entity.getPosition();
            mousePosition.y = playerPosition.y;
            this.entity.lookAt(mousePosition);
            this.entity.rotate(0, 180, 0);

            var diff = new pc.Vec3();
            diff.sub2(mousePosition, playerPosition);
            var distance = diff.length();

            if (distance > this.distanceToKeep)
            {
                this.entity.translateLocal(0, 0, this.speed * dt);
                this.entity.animation.enabled = true;
            }
            else
            {
                this.entity.animation.enabled = false;
            }
        },

        onMouseMove: function (event)
        {
            if (cameraEntity)
                cameraEntity.camera.screenToWorld(event.x, event.y, cameraEntity.getPosition().y, mousePosition);
        }
    };

    return Follow_mouse;
});
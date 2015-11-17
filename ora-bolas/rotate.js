pc.script.attribute('speed', 'number', 20, {
    displayName: "Speed"
});

pc.script.attribute('forward', 'boolean', true, {
    displayName: "Forward"
});

pc.script.attribute('rotationOnX', 'boolean', false, {
    displayName: "Rotation On X"
});

pc.script.attribute('rotationOnY', 'boolean', true, {
    displayName: "Rotation On Y"
});

pc.script.attribute('rotationOnZ', 'boolean', false, {
    displayName: "Rotation On Z"
});

pc.script.create('rotate', function (context)
{
    var Rotate = function (entity)
    {
        this.entity = entity;
    };

    Rotate.prototype = {
        update: function (dt)
        {
            var rotationSpeed = this.speed * dt;
            if (this.forward) rotationSpeed *= -1;
            this.entity.rotateLocal(
                (this.rotationOnX) ? rotationSpeed : 0,
                (this.rotationOnY) ? rotationSpeed : 0,
                (this.rotationOnZ) ? rotationSpeed : 0
            );
            this.entity.rigidbody.syncEntityToBody();

            var children = this.entity.getChildren();
            children.forEach(function (child)
            {
                if (child.rigidbody)
                {
                    child.rigidbody.syncEntityToBody();
                }
            });
        }
    };

    return Rotate;
});
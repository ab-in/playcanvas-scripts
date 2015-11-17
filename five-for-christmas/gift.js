pc.script.attribute('speed', 'number', 6, {
    displayName: "Speed"
});

pc.script.attribute('timeToApplyImpulse', 'number', 1, {
    displayName: "Time To Apply Impulse"
});

pc.script.attribute('lifeTime', 'number', 10, {
    displayName: "Life Time in Seconds"
});

pc.script.create('gift', function (context)
{
    var Gift = function (entity)
    {
        this.entity = entity;
        this.entity.addLabel('gift');
        this.timeSinceCreation = 0;
    };

    Gift.prototype = {
        update: function (dt)
        {
            if (this.entity.enabled)
            {
                if (this.timeSinceCreation < this.timeToApplyImpulse)
                {
                    this.entity.rigidbody.applyImpulse(
                        pc.math.random(-this.speed, this.speed),
                        this.speed,
                        pc.math.random(-this.speed, this.speed)
                    );
                    this.entity.rigidbody.applyTorque(
                        pc.math.random(0, this.speed),
                        pc.math.random(0, this.speed),
                        pc.math.random(0, this.speed)
                    );
                }

                if (this.timeSinceCreation < this.lifeTime)
                {
                    this.timeSinceCreation += dt;
                }
                else
                {
                    this.entity.destroy();
                }

                if (this.entity.getPosition().y < -1)
                {
                    this.entity.destroy();
                }
            }
        }
    };

    return Gift;
});
pc.script.attribute('lifeTime', 'number', 10, {
    displayName: "Life Time in Seconds"
});

pc.script.create('sack', function (context)
{
    var Sack = function (entity)
    {
        this.entity = entity;
        this.entity.addLabel('sack');
        this.timeSinceCreation = 0;
    };

    Sack.prototype = {
        update: function (dt)
        {
            if (this.entity.enabled)
            {
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

    return Sack;
});
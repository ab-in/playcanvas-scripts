pc.script.create('despawner', function (context)
{
    var Despawner = function (entity)
    {
        this.entity = entity;
    };

    Despawner.prototype = {
        initialize: function ()
        {
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        onCollisionStart: function (result)
        {
            if (result.other.rigidbody)
            {
                result.other.destroy();
            }

        }
    };

    return Despawner;
});
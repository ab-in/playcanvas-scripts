pc.script.attribute('prefabName', 'string', '', {displayName: 'Prefab Entity Name'});
pc.script.attribute('quantity', 'number', 1, {displayName: 'Quantity to Spawn At Once'});
pc.script.attribute('spawnLimit', 'number', 10, {displayName: 'Maximum Quantity to Spawn'});
pc.script.attribute('spawnInterval', 'number', 2, {displayName: "Spawn Interval in Seconds"});
pc.script.attribute('rangeMinX', 'number', -1, {displayName: 'Range Min X'});
pc.script.attribute('rangeMaxX', 'number', 1, {displayName: 'Range Max X'});
pc.script.attribute('rangeMinY', 'number', -1, {displayName: 'Range Min Y'});
pc.script.attribute('rangeMaxY', 'number', 1, {displayName: 'Range Max Y'});
pc.script.attribute('rangeMinZ', 'number', -1, {displayName: 'Range Min Z'});
pc.script.attribute('rangeMaxZ', 'number', 1, {displayName: 'Range Max Z'});

pc.script.create('spawner', function (context)
{
    var prefabEntity;

    function createMaterial()
    {
        var material = new pc.scene.PhongMaterial();
        material.diffuse = new pc.Color(pc.math.random(0,1), pc.math.random(0,1), pc.math.random(0,1));
        material.update();
        return material;
    }

    var Spawner = function (entity)
    {
        this.entity = entity;
    };

    Spawner.prototype = {
        initialize: function ()
        {
            this.spawnerPoint = this.entity.getPosition();
            this.interval = 0;
        },

        update: function (dt)
        {
            if (this.interval > this.spawnInterval)
            {
                // TODO: Don't spawn more then maximum defined.
                this.interval = 0;
                for (var i = 0; i < this.quantity; i++)
                {
                    this.spawnEntity();
                }
            }
            else
            {
                this.interval += dt;
            }
        },

        spawnEntity: function ()
        {
            prefabEntity = context.root.findByName(this.prefabName);
            var newEntity = prefabEntity.clone();

            newEntity.setPosition(
                pc.math.random(this.spawnerPoint.x + this.rangeMinX, this.spawnerPoint.x + this.rangeMaxX),
                pc.math.random(this.spawnerPoint.y + this.rangeMinY, this.spawnerPoint.y + this.rangeMaxY),
                pc.math.random(this.spawnerPoint.z + this.rangeMinZ, this.spawnerPoint.z + this.rangeMaxZ)
            );

            newEntity.model.material = createMaterial();
            if (this.prefabName == 'Kid')
            {
                newEntity.script.follow_player.spawner = this.entity;
            }
            newEntity.enabled = true;
            context.root.addChild(newEntity);
        }
    };

    return Spawner;
});
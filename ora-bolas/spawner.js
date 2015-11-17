pc.script.attribute('quantity', 'number', 1, {displayName: 'Quantity to Spawn'});
pc.script.attribute('rangeMinX', 'number', -1, {displayName: 'Range Min X'});
pc.script.attribute('rangeMaxX', 'number', 1, {displayName: 'Range Max X'});
pc.script.attribute('rangeMinY', 'number', -1, {displayName: 'Range Min Y'});
pc.script.attribute('rangeMaxY', 'number', 1, {displayName: 'Range Max Y'});
pc.script.attribute('rangeMinZ', 'number', -1, {displayName: 'Range Min Z'});
pc.script.attribute('rangeMaxZ', 'number', 1, {displayName: 'Range Max Z'});

pc.script.create('spawner', function (context)
{
    var lastSpawn = 0;
    var spanwerPoint;

    function createMaterial(color)
    {
        var material = new pc.scene.PhongMaterial();
        material.diffuse = color;
        material.update();
        return material;
    }

    var materials = [
        // createMaterial(new pc.Color(0,0,0)),
        createMaterial(new pc.Color(0, 0, 1)),
        createMaterial(new pc.Color(0, 1, 0)),
        createMaterial(new pc.Color(0, 1, 1)),
        createMaterial(new pc.Color(1, 0, 0)),
        createMaterial(new pc.Color(1, 0, 1)),
        createMaterial(new pc.Color(1, 1, 0)),
        createMaterial(new pc.Color(1, 1, 1))
    ];

    var Spawner = function (entity)
    {
        this.entity = entity;
    };

    Spawner.prototype = {
        initialize: function ()
        {
            spanwerPoint = this.entity.getPosition();
        },

        update: function (dt)
        {
            var currentSecond = (new Date()).getSeconds();
            if (lastSpawn != currentSecond)
            {
                lastSpawn = currentSecond;
                for (var i = 0; i < this.quantity; i++)
                {
                    this.spawnSphere();
                }
            }
        },

        spawnSphere: function ()
        {
            var newSphere = new pc.fw.Entity();
            newSphere.name = 'ColorBall';

            newSphere.setPosition(
                pc.math.random(spanwerPoint.x + this.rangeMinX, spanwerPoint.x + this.rangeMaxX),
                pc.math.random(spanwerPoint.y + this.rangeMinY, spanwerPoint.y + this.rangeMaxY),
                pc.math.random(spanwerPoint.z + this.rangeMinZ, spanwerPoint.z + this.rangeMaxZ)
            );

            context.systems.model.addComponent(newSphere, {
                type: 'sphere',
                castShadows: true
            });

            newSphere.model.material = materials[Math.floor(Math.random() * materials.length)];

            context.systems.rigidbody.addComponent(newSphere, {
                type: "dynamic",
                mass: 5,
                restitution: 0.8
            });

            context.systems.collision.addComponent(newSphere, {
                type: "sphere",
                radius: 0.5
            });

            context.root.addChild(newSphere);
        }
    };

    return Spawner;
});
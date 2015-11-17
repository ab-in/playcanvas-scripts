pc.script.attribute('minTimeBetweenRings', 'number', 20, {
    displayName: "Min Time Between Rings"
});

pc.script.attribute('maxTimeBetweenRings', 'number', 40, {
    displayName: "Max Time Between Rings"
});

pc.script.create('sleigh_bells', function ()
{
    // Creates a new Sleigh_bells instance
    var Sleigh_bells = function (entity)
    {
        this.entity = entity;
        this.ringTimer = 0;
    };

    Sleigh_bells.prototype = {
        update: function (dt)
        {
            if (this.ringTimer > pc.math.random(this.minTimeBetweenRings, this.maxTimeBetweenRings))
            {
                this.entity.audiosource.play("sleigh_bells");
                this.ringTimer = 0;
            }
            else
            {
                this.ringTimer += dt;
            }
        }
    };

    return Sleigh_bells;
});
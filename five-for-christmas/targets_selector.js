pc.script.create('targets_selector', function (context)
{
    var Targets_selector = function (entity)
    {
        this.entity = entity;
        this.possibleTargets = [];
        this.timer = 0;
    };

    Targets_selector.prototype = {
        update: function (dt)
        {
            if (this.timer > 1)
            {
                this.possibleTargets = [];
                context.root.findByLabel('gift', this.possibleTargets);

                for (var i = this.possibleTargets.length - 1; i >= 0; i--)
                {
                    if (!this.possibleTargets[i]._enabled)
                    {
                        this.possibleTargets.splice(i,1);
                    }
                }

                this.timer = 0;
            }
            else
            {
                this.timer += dt;
            }
        },

        contains: function (obj)
        {
            for (var i = 0; i < this.possibleTargets.length; i++)
            {
                if (this.possibleTargets[i] === obj)
                {
                    return true;
                }
            }

            return false;
        },

        hasTargets: function ()
        {
            return (this.possibleTargets.length > 0);
        },

        randomTarget: function ()
        {
            return this.possibleTargets[Math.floor(pc.math.random(0, this.possibleTargets.length))];
        }
    };

    return Targets_selector;
});
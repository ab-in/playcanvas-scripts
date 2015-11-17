pc.script.create('change_background', function (context)
{
    var camera;
    var timer;

    var Change_background = function (entity)
    {
        this.entity = entity;
    };

    Change_background.prototype = {
        initialize: function ()
        {
            camera = this.entity.camera;
            camera.clearColor = new pc.Color(pc.math.random(0.3,1), pc.math.random(0.3,1), pc.math.random(0.3,1));
            timer = 0;
        },

        update: function (dt)
        {
            if (timer > 0.5)
            {
                this.change();
                timer = 0;
            }
            else
            {
                timer += dt;
            }
        },

        change: function ()
        {
            function randomBool()
            {
                return (Math.random() < 0.5);
            }

            var newR = camera.clearColor.r + 0.01 * (randomBool() ? 1 : -1);
            var newG = camera.clearColor.g + 0.01 * (randomBool() ? 1 : -1);
            var newB = camera.clearColor.b + 0.01 * (randomBool() ? 1 : -1);

            if (newR.r < 0 || newR.r > 0.255)
                newR = camera.clearColor.r;

            if (newG.g < 0 || newG.g > 0.255)
                newG = camera.clearColor.g;

            if (newB.b < 0 || newB.b > 0.255)
                newB = camera.clearColor.b;

            camera.clearColor = new pc.Color(newR, newG, newB);
        }
    };

    return Change_background;
});

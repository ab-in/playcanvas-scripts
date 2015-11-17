pc.script.attribute('minTimeBetweenLaughs', 'number', 20, {
    displayName: "Min Time Between Laughs"
});

pc.script.attribute('maxTimeBetweenLaughs', 'number', 40, {
    displayName: "Max Time Between Laughs"
});

pc.script.create('santa_laugh', function (context) {
    var Santa_laugh = function (entity) {
        this.entity = entity;
        this.laughTimer = 0;
    };

    Santa_laugh.prototype = {
        update: function (dt) {
            if (this.laughTimer > pc.math.random(this.minTimeBetweenLaughs, this.maxTimeBetweenLaughs))
            {
                var randomLaugh = Math.floor(pc.math.random(0, this.entity.audiosource.assets.length));
                switch(randomLaugh)
                {
                    case 0: this.entity.audiosource.play('jolly_laugh'); break;
                    case 1: this.entity.audiosource.play('santa_clause_jolly_laugh'); break;
                    default: this.entity.audiosource.play('jolly_laugh');
                }
                this.laughTimer = 0;
            }
            else
            {
                this.laughTimer += dt;
            }
        }
    };

    return Santa_laugh;
});
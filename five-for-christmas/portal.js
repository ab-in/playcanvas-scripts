pc.script.attribute('duration', 'number', 60, {
    displayName: "Duration in seconds"
});

pc.script.attribute('materials', 'asset', [], {
    displayName: 'Materials',
    type: 'Material'
});

pc.script.create('portal', function (context)
{
    var Portal = function (entity)
    {
        this.entity = entity;
    };

    Portal.prototype = {
        initialize: function ()
        {
            this.currentMap = 0;
            this.timer = this.duration;
        },

        update: function (dt)
        {
            if (this.timer <= 0)
            {
                this.timer = this.duration;

                var thingsToRemove = [];

                context.root.findByLabel('follower', thingsToRemove);
                context.root.findByLabel('gift', thingsToRemove);
                context.root.findByLabel('sack', thingsToRemove);

                thingsToRemove.forEach(function (entity) {
                    if (entity.enabled)
                        entity.destroy();
                });

                context.root.findByName('Player').setPosition(0,0,0);
                
                this.changeMap();

            }
            else
            {
                this.entity.script.ui_text.setText('Portal Countdown: ' + Math.floor(this.timer));
                this.timer -= dt;
            }
        },
        
        changeMap: function ()
        {
            this.entity.audiosource.play('magical_sound');
            
            this.currentMap++;
            
            if (this.currentMap >= this.materials.length)
            {
                context.root.findByName('GameManager').script.end_game.showMessage();
                context.root.findByName('HappinessMeter').script.happiness_meter.reset();
                this.currentMap = 0;
            }
            
            context.root.findByName('Ground').model.materialAsset = this.materials[this.currentMap];
            
            var mapName = context.root.findByName('MapName').script.ui_text;
            
            switch (this.currentMap)
            {
                case 0:
                    mapName.setText('Location: Europe');
                    break;
                case 1:
                    mapName.setText('Location: Africa');
                    break;
                case 2:
                    mapName.setText('Location: America');
                    break;
                case 3:
                    mapName.setText('Location: Oceania');
                    break;
                case 4:
                    mapName.setText('Location: Asia');
                    break;
                default:
                    mapName.setText('Location: Nowhere');
            }
        }
    };

    return Portal;
});
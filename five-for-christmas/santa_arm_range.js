pc.script.create('santa_arm_range', function (context) {
    var giftsLeftLabel;
    var playerEntity;
    
    var Santa_arm_range = function (entity) {
        this.entity = entity;
    };

    Santa_arm_range.prototype = {
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
            giftsLeftLabel = context.root.findByName('GiftsLeft');
            playerEntity = context.root.findByName('Player');
        },

        onTriggerEnter: function (entity) {
            if (entity.name == "Sack")
            {
                entity.destroy();
                this.entity.audiosource.play("sack");
                playerEntity.script.click_to_throw.giftsLeft += Math.floor(pc.math.random(3,8));
                giftsLeftLabel.script.ui_text.setText('Gifts Left: ' + playerEntity.script.click_to_throw.giftsLeft);
            }
        }
    };

    return Santa_arm_range;
});
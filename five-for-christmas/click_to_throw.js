pc.script.create('click_to_throw', function (context)
{
    var giftPrefab;
    var sackPrefab;
    var giftsLeftLabel;

    var Click_to_throw = function (entity)
    {
        this.entity = entity;
        this.throwDelay = 0;
        this.giftsLeft = 20;

        // Disabling the context menu stops the browser displaying a menu when
        // you right-click the page
        context.mouse.disableContextMenu();
    };

    Click_to_throw.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function ()
        {
            giftPrefab = context.root.findByName('Gift');
            sackPrefab = context.root.findByName('Sack');
            giftsLeftLabel = context.root.findByName('GiftsLeft');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt)
        {
            if (this.throwDelay > 0.3 && this.giftsLeft > 0)
            {
                if (context.mouse.isPressed(pc.input.MOUSEBUTTON_LEFT) || context.mouse.isPressed(pc.input.MOUSEBUTTON_RIGHT))
                {
                    var giftEntity = giftPrefab.clone();
                    context.root.addChild(giftEntity);
                    giftEntity.setPosition(this.entity.getPosition());
                    giftEntity.setRotation(this.entity.getRotation());
                    giftEntity.enabled = true;
                    this.entity.audiosource.play("gift");
                    this.giftsLeft--;
                    giftsLeftLabel.script.ui_text.setText('Gifts Left: ' + this.giftsLeft);
                    this.throwDelay = 0;
                }
            }
            else
            {
                this.throwDelay += dt;
            }
        }
    };

    return Click_to_throw;
});
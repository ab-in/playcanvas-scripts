pc.script.attribute('nameList', 'asset', []);

pc.script.create('enemy', function (context) {
    var nameList = null;
    
    var gameManager;
    
    // Creates a new Enemy instance
    var Enemy = function (entity) {
        this.entity = entity;
        this.entity.addLabel('enemy');
    };

    Enemy.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            if (nameList === null)
            {
                nameList = context.assets.getAssetById(this.nameList[0]).resource.split("\n");
            }
            
            this.entity.script.label.text = nameList[Math.floor(pc.math.random(0, nameList.length))];
            gameManager = context.root.findByName('GameManager');
            
            this.entity.collision.on('contact', this.onContact, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        damage: function () {
            gameManager.script.game_manager.enemySelected = this.entity;
            this.entity.script.label.removeFirstLetter();
            
            if (this.entity.script.label.text.length === 0)
            {
                gameManager.script.game_manager.enemySelected = null;
                this.entity.destroy();
            }
        },
        
        onContact: function (result) {
            if (result.other.rigidbody) {
                this.entity.script.label.removeFirstLetter();
            
                if (this.entity.script.label.text.length === 0)
                {
                    if (gameManager.script.game_manager.enemySelected == this.entity)
                    {
                        gameManager.script.game_manager.enemySelected = null;
                    }
                    
                    this.entity.destroy();
                }
            }
        }
    };

    return Enemy;
});
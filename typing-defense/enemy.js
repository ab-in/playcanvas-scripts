pc.script.attribute('nameList', 'asset', []);

pc.script.create('enemy', function (context) {
    var nameList = null;
    
    var gameManagerScript;
    
    var accuracyLabelScript;
    
    var damageTakenLabelScript;
    
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
                nameList = context.assets.get(this.nameList[0]).resource.split(/(?:\r\n|\r|\n)/);
            }
            
            this.entity.script.label.text = nameList[Math.floor(pc.math.random(0, nameList.length))];
            gameManagerScript = context.root.findByName('GameManager').script.game_manager;
            accuracyLabelScript = context.root.findByName('AccuracyLabel').script.ui_text;
            damageTakenLabelScript = context.root.findByName('DamageTakenLabel').script.ui_text;
            
            this.entity.collision.on('contact', this.onContact, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        damage: function () {
            gameManagerScript.enemySelected = this.entity;
            gameManagerScript.correctKeystrokes++;
            this.updateAccuracyLabel();
            this.entity.script.label.removeFirstLetter();
            
            if (this.entity.script.label.text.length === 0)
            {
                gameManagerScript.enemySelected = null;
                this.entity.destroy();
            }
        },
        
        avoid: function () {
            gameManagerScript.wrongKeystrokes++;
            this.updateAccuracyLabel();
        },
        
        updateAccuracyLabel: function () {
            if (gameManagerScript.correctKeystrokes > 0 || gameManagerScript.wrongKeystrokes > 0) {
                var accuracy = gameManagerScript.correctKeystrokes / (gameManagerScript.wrongKeystrokes + gameManagerScript.correctKeystrokes);
                accuracyLabelScript.setText("Accuracy: " + (accuracy * 100).toFixed(2) + "%");
            }
        },
        
        onContact: function (result) {
            if (result.other.rigidbody) {
                gameManagerScript.damageTaken++;
                damageTakenLabelScript.setText("Damage Taken: " + gameManagerScript.damageTaken);
                this.entity.script.label.removeFirstLetter();
            
                if (this.entity.script.label.text.length === 0)
                {
                    if (gameManagerScript.enemySelected == this.entity)
                    {
                        gameManagerScript.enemySelected = null;
                    }
                    
                    this.entity.destroy();
                }
            }
        }
    };

    return Enemy;
});
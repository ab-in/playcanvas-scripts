pc.script.create('input', function (context) {
    var gameManagerScript;
    
    // Creates a new Input instance
    var Input = function (entity) {
        this.entity = entity;
        this.possibleTargets = [];
    };

    Input.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            gameManagerScript = context.root.findByName('GameManager').script.game_manager;
            context.keyboard.on(pc.input.EVENT_KEYDOWN, this.onKeyDown, this);
        },
        
        onKeyDown: function (event) {
            if (event.key === pc.input.KEY_A) {
                this.searchEnemy('a');
            }
            else if (event.key === pc.input.KEY_B) {
                this.searchEnemy('b');
            }
            else if (event.key === pc.input.KEY_C) {
                this.searchEnemy('c');
            }
            else if (event.key === pc.input.KEY_D) {
                this.searchEnemy('d');
            }
            else if (event.key === pc.input.KEY_E) {
                this.searchEnemy('e');
            }
            else if (event.key === pc.input.KEY_F) {
                this.searchEnemy('f');
            }
            else if (event.key === pc.input.KEY_G) {
                this.searchEnemy('g');
            }
            else if (event.key === pc.input.KEY_H) {
                this.searchEnemy('h');
            }
            else if (event.key === pc.input.KEY_I) {
                this.searchEnemy('i');
            }
            else if (event.key === pc.input.KEY_J) {
                this.searchEnemy('j');
            }
            else if (event.key === pc.input.KEY_K) {
                this.searchEnemy('k');
            }
            else if (event.key === pc.input.KEY_L) {
                this.searchEnemy('l');
            }
            else if (event.key === pc.input.KEY_M) {
                this.searchEnemy('m');
            }
            else if (event.key === pc.input.KEY_N) {
                this.searchEnemy('n');
            }
            else if (event.key === pc.input.KEY_O) {
                this.searchEnemy('o');
            }
            else if (event.key === pc.input.KEY_P) {
                this.searchEnemy('p');
            }
            else if (event.key === pc.input.KEY_Q) {
                this.searchEnemy('q');
            }
            else if (event.key === pc.input.KEY_R) {
                this.searchEnemy('r');
            }
            else if (event.key === pc.input.KEY_S) {
                this.searchEnemy('s');
            }
            else if (event.key === pc.input.KEY_T) {
                this.searchEnemy('t');
            }
            else if (event.key === pc.input.KEY_U) {
                this.searchEnemy('u');
            }
            else if (event.key === pc.input.KEY_V) {
                this.searchEnemy('v');
            }
            else if (event.key === pc.input.KEY_W) {
                this.searchEnemy('w');
            }
            else if (event.key === pc.input.KEY_X) {
                this.searchEnemy('x');
            }
            else if (event.key === pc.input.KEY_Y) {
                this.searchEnemy('y');
            }
            else if (event.key === pc.input.KEY_Z) {
                this.searchEnemy('z');
            }
            else if (event.key === 173 || event.key === pc.input.KEY_SUBTRACT) {
                this.searchEnemy('-');
            }

            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
            event.event.preventDefault();
        },
        
        searchEnemy: function (letter)
        {
            if (gameManagerScript.enemySelected !== null)
            {
                if (pc.string.startsWith(gameManagerScript.enemySelected.script.label.text.toLowerCase(), letter))
                {
                    gameManagerScript.enemySelected.script.enemy.damage();
                }
            }
            else
            {
                this.possibleTargets = [];
                context.root.findByLabel('enemy', this.possibleTargets);
                var enemyFound = null;
                
                for (var i = 0; i < this.possibleTargets.length; i++)
                {
                    if (pc.string.startsWith(this.possibleTargets[i].script.label.text.toLowerCase(), letter))
                    {
                        if (enemyFound === null || this.distanceFromEntity(this.possibleTargets[i]) < this.distanceFromEntity(enemyFound))
                        {
                            enemyFound = this.possibleTargets[i];
                        }
                    }
                }
                
                if (enemyFound !== null)
                {
                    console.log(enemyFound);
                    enemyFound.script.enemy.damage();
                }
                else
                {
                    // TODO: Play error sound.
                    console.log("No enemies found!");
                }
            }
        },
        
        distanceFromEntity: function (entity) {
            var diff = new pc.Vec3();
            diff.sub2(this.entity.getPosition(), entity.getPosition());
            return diff.length();
        }
    };

    return Input;
});
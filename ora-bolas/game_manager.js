pc.script.create('game_manager', function (context)
{
    var gameName = "Ora Bolas!";
    var gameIsRunning = true;
    var picker;
    var canvas;
    var timer = 0;
    var uiObjectiveColor;
    var uiScore;
    var uiCountDown;
    var uiGameOver;
    var uiGameName;

    var colors = [
        // new pc.Color(0,0,0),
        new pc.Color(0, 0, 1),
        new pc.Color(0, 1, 0),
        new pc.Color(0, 1, 1),
        new pc.Color(1, 0, 0),
        new pc.Color(1, 0, 1),
        new pc.Color(1, 1, 0),
        new pc.Color(1, 1, 1)
    ];

    var verbs = [
        'Grab',
        'Target',
        'Point to',
        'Pick',
        'Look for',
        'Collect',
        'Capture'
    ];

    var Game_manager = function (entity)
    {
        this.entity = entity;
        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
    };

    Game_manager.prototype = {
        initialize: function ()
        {
            this.countDown = 100;
            this.countDownStarted = false;
            this.objectiveColor = colors[Math.floor(pc.math.random(0, colors.length))];
            this.collected = 0;
            picker = new pc.scene.Picker(context.graphicsDevice, 1024, 1024);
            canvas = document.getElementById("application-canvas");
            uiObjectiveColor = context.root.findByName('UiObjectiveColor');
            uiScore = context.root.findByName('UiScore');
            uiCountDown = context.root.findByName('UiCountDown');
            uiGameOver = context.root.findByName('UiGameOver');
            uiGameName = context.root.findByName('UiGameName');
        },

        update: function (dt)
        {
            if (gameIsRunning)
            {
                if (this.countDownStarted)
                {
                    this.countDown -= dt;
                    uiCountDown.script.ui_text.setText("Time Left: " + Math.floor(this.countDown));
                }

                if (this.countDown <= 0)
                {
                    this.endGame();
                    gameIsRunning = false;
                }
                else
                {
                    if (timer > pc.math.random(5,10))
                    {
                        this.changeObjectiveColor();
                        timer = 0;
                    }
                    else
                    {
                        timer += dt;
                    }
                }
            }
        },

        changeObjectiveColor: function ()
        {
            if (!this.countDownStarted)
                this.countDownStarted = true;

            var randomColorIndex = Math.floor(pc.math.random(0, colors.length));
            var randomVerb = verbs[Math.floor(pc.math.random(0, verbs.length))];
            this.objectiveColor = colors[randomColorIndex];
            var colorLabel;

            switch (randomColorIndex)
            {
                case 0:
                    colorLabel = randomVerb + ' Blue!';
                    break;
                case 1:
                    colorLabel = randomVerb + ' Green!';
                    break;
                case 2:
                    colorLabel = randomVerb + ' Cyan!';
                    break;
                case 3:
                    colorLabel = randomVerb + ' Red!';
                    break;
                case 4:
                    colorLabel = randomVerb + ' Magenta!';
                    break;
                case 5:
                    colorLabel = randomVerb + ' Yellow!';
                    break;
                case 6:
                    colorLabel = randomVerb + ' White!';
                    break;
                default:
                    colorLabel = randomVerb + ' White!';
            }

            this.entity.audiosource.play("bell");

            uiObjectiveColor.script.ui_text.setColor(this.objectiveColor.toString());
            uiObjectiveColor.script.ui_text.setText(colorLabel);
        },

        onMouseMove: function (event)
        {
            var x = event.x * picker.width / canvas.clientWidth;
            var y = picker.height - (event.y * picker.height / canvas.clientHeight);

            var c = context.root.findByName('MainCamera');
            picker.prepare(c.camera.camera, context.scene);
            var selection = picker.getSelection({
                x: x,
                y: y
            });

            if (selection.length)
            {
                var mesh = selection[0];
                var node = mesh.node;
                while (node && !(node instanceof pc.fw.Entity))
                {
                    node = node.getParent();
                }

                if (node.name == "ColorBall")
                {
                    if (gameIsRunning)
                    {
                        var rEquals = (this.objectiveColor.r == node.model.material.diffuse.r);
                        var gEquals = (this.objectiveColor.g == node.model.material.diffuse.g);
                        var bEquals = (this.objectiveColor.b == node.model.material.diffuse.b);

                        if (rEquals && gEquals && bEquals)
                        {
                            canvas.style.cursor = 'pointer';
                            this.entity.audiosource.play("score");
                            this.collected++;
                            uiScore.script.ui_text.setText(this.collected + " Collected!");
                            node.destroy();
                        }
                    }
                    else
                    {
                        canvas.style.cursor = 'pointer';
                        this.entity.audiosource.play("score");
                        node.destroy();
                    }
                }
                else
                {
                    canvas.style.cursor = 'grab';
                }
            }
        },

        endGame: function ()
        {
            uiScore.script.ui_text.setVisibility(false);
            uiCountDown.script.ui_text.setVisibility(false);
            uiObjectiveColor.script.ui_text.setVisibility(false);
            uiGameName.script.ui_text.setVisibility(false);
            uiGameOver.script.ui_text.setText("Congratulations!<br/>You've collected " + this.collected + " balls!<br/>Thanks for playing!<br/><br/>\"" + gameName + "\"<br/><br/>A Game by Felladrin<br/>Made with PlayCanvas<br/>Music by Robert Del Naja<br/>Sounds from freesfx.co.uk");
            uiGameOver.script.ui_text.setVisibility(true);
        }
    };

    return Game_manager;
});
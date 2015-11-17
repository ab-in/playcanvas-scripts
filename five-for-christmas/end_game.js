pc.script.create('end_game', function (context) {
    var theEndLabel;
    var happinessMetter;
    
    var End_game = function (entity) {
        this.entity = entity;
    };

    End_game.prototype = {
        initialize: function () {
            theEndLabel = context.root.findByName('TheEnd');
            happinessMetter = context.root.findByName('HappinessMeter');
        },

        showMessage: function () {
            theEndLabel.script.ui_text.setText('Congratulations! You\'ve made<br/> ' + happinessMetter.script.happiness_meter.happiness + ' children happy in five minutes!<br/> Thank you for playing!<br/> <br/> "Five for Christmas"<br/> <br/> A game by Felladrin<br/> Made with PlayCanvas<br/> Merry Christmas!')
            theEndLabel.script.ui_text.setVisibility(true);
        }
    };

    return End_game;
});
pc.script.create('happiness_meter', function (context)
{
    var Happiness_meter = function (entity)
    {
        this.entity = entity;
        this.happiness = 0;
    };

    Happiness_meter.prototype = {
        increaseHappiness: function(happiness)
        {
            this.happiness += happiness;
            this.entity.script.ui_text.setText('Happy Children: ' + this.happiness);
        },
        
        reset: function()
        {
            this.happiness = 0;
            this.entity.script.ui_text.setText('Happy Children: ' + this.happiness);
        }
    };

    return Happiness_meter;
});
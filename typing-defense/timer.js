function convertToHHMMSS(timeDiff) {
    var sec_num = Math.floor(timeDiff / 1000);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

pc.script.create('timer', function (app) {
    // Creates a new Timer instance
    var Timer = function (entity) {
        this.entity = entity;
        this.startTime = new Date().getTime();
    };

    Timer.prototype = {
        initialize: function () {
            setInterval(function () {
                var timeDiff = new Date().getTime() - this.startTime;
                this.entity.script.ui_text.setText("Time On Earth: " + convertToHHMMSS(timeDiff));
            }.bind(this), 1000);
        },

        update: function (dt) {
        }
    };

    return Timer;
});
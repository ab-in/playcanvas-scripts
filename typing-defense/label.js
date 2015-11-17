pc.script.attribute('text', 'string', '', {
    displayName: "Label"
});

pc.script.attribute('length', 'number', 16, {
    displayName: "Length"
});

pc.script.create('label', function (context) {
    var Label = function (entity) {
        this.entity = entity;
        this.canvas = document.createElement('canvas');
        this.canvas.width = context.graphicsDevice.width;
        this.canvas.height = context.graphicsDevice.height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0px';
        this.canvas.style.top = '0px';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.textColor = '#2DDD84';
    };

    Label.prototype = {
        initialize: function () {
            this.cameraEntity = context.root.findByName('Camera');
            this.alpha = 1.0;
        },

        update: function (dt) {
            if (this.text.length)
            {
                if (context.graphicsDevice.width !== this.canvas.width || context.graphicsDevice.height !== this.canvas.height) {
                    this.canvas.width = context.graphicsDevice.width;
                    this.canvas.height = context.graphicsDevice.height;
                }
                
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                var screen = this.cameraEntity.camera.camera.worldToScreen(this.entity.getPosition(), this.canvas.width, this.canvas.height);
                
                if (screen.z > 0 && screen.x > 0 && screen.y > 0 && screen.x < this.canvas.width && screen.y < this.canvas.height)
                {
                    this.draw(this.ctx, this.text, this.alpha, screen.x, screen.y, this.length, this.textColor);
                }
            }
        },
        
        draw: function(ctx, text, opacity, x, y, length, color) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.translate(x, y);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(length, -length);
            ctx.strokeStyle = color;
            ctx.stroke();
            
            var width = ctx.measureText(text).width;
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 0, 0, .3)';
            ctx.rect(length, -length - 15, width + 8, 15);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillText(text, length + 4, -length - 4);
            
            ctx.restore();
        },
        
        removeFirstLetter: function () {
            if (this.text.length > 1)
            {
                this.textColor = '#F57E2F';
                this.text = this.text.substr(1);
            }
            else
            {
                this.text = '';
                document.body.removeChild(this.canvas);
            }
        }
    };

    return Label;
});
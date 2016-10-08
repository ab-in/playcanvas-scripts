pc.script.attribute('text', 'string', '', {
    displayName: "Text"
});

pc.script.attribute('fontFamily', 'string', '', {
    displayName: "Font Family"
});

pc.script.attribute('textAlign', 'enumeration', 'center', {
    displayName: "Text Align",
    enumerations: [
        {
            name: "Left",
            value: 'left'
        },
        {
            name: "Center",
            value: 'center'
        },
        {
            name: "Right",
            value: 'right'
        }
    ]
});

pc.script.attribute('fontSize', 'string', '32px', {
    displayName: "Font Size"
});

pc.script.attribute('width', 'string', '100%', {
    displayName: "Width"
});

pc.script.attribute('marginLeft', 'string', '-50%', {
    displayName: "Margin Left"
});

pc.script.attribute('visibility', 'enumeration', 'visible', {
    displayName: "Visibility",
    enumerations: [
        {
            name: "Visible",
            value: 'visible'
        },
        {
            name: "Hidden",
            value: 'hidden'
        }
    ]
});

pc.script.attribute('color', 'rgba', [1, 1, 1, 1], {
    displayName: "Text Color"
});

pc.script.attribute('top', 'string', '50%', {
    displayName: "Top"
});

pc.script.attribute('left', 'string', '50%', {
    displayName: "Left"
});

pc.script.attribute('bottom', 'string', '', {
    displayName: "Bottom"
});

pc.script.attribute('right', 'string', '', {
    displayName: "Right"
});

pc.script.attribute('secondsToAutoHide', 'string', '', {
    displayName: "Seconds To Auto Hide"
});

pc.script.attribute('clickToHide', 'boolean', false, {
    displayName: "Click To Hide"
});

pc.script.create('ui_text', function (context)
{
    var Ui_text = function (entity)
    {
        this.entity = entity;
        context.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    Ui_text.prototype = {
        initialize: function ()
        {
            var div = document.createElement('div');

            if (this.top !== '')
                div.style.top = this.top;
            else if (this.bottom !== '')
                div.style.bottom = this.bottom;

            if (this.left !== '')
                div.style.left = this.left;
            else if (this.right !== '')
                div.style.right = this.right;

            if (this.width !== '')
                div.style.width = this.width;

            if (this.marginLeft !== '')
                div.style.marginLeft = this.marginLeft;

            div.style.color = this.color.toString();
            div.style.position = 'absolute';
            div.style.textAlign = this.textAlign;
            div.style.opacity = this.color[3];
            div.style.fontSize = this.fontSize;
            div.style.visibility = this.visibility;

            document.querySelector('body').appendChild(div);

            var textDiv = document.createElement('p');
            textDiv.style.backgroundColor = 'rgba(0,0,0,0.3)';
            textDiv.style.padding = '8px';
            textDiv.style.margin = '0px';
            textDiv.style.borderRadius = '15px';
            
            if (this.fontFamily !== '')
                textDiv.style.fontFamily = this.fontFamily;
                
            textDiv.innerHTML = this.text;
            div.appendChild(textDiv);

            this.div = div;
            this.textDiv = textDiv;
            
            if (this.secondsToAutoHide !== '')
                setTimeout(function () { this.setVisibility(false) }.bind(this), this.secondsToAutoHide * 1000);
        },

        setVisibility: function (visible)
        {
            this.div.style.visibility = visible ? 'visible' : 'hidden';
            
            if (this.secondsToAutoHide !== '')
                setTimeout(function () { this.setVisibility(false) }.bind(this), this.secondsToAutoHide * 1000);
        },

        setColor: function (color)
        {
            this.div.style.color = color;
        },

        setText: function (text)
        {
            this.textDiv.innerHTML = text;
        },
        
        onMouseDown: function (event)
        {
            if (this.clickToHide)
                this.div.style.visibility = 'hidden';
        }
    };

    return Ui_text;
});
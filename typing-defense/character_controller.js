pc.script.attribute('speed', 'number', 2);

pc.script.create('character_controller', function (context) {
    var CharacterController = function (entity) {
        this.entity = entity;
        
        this.rayEnd = new pc.Vec3();
            
        this.onGround = true;
    };

    CharacterController.prototype = {
        initialize: function () {
            this.groundCheckRay = new pc.Vec3(0, -this.entity.getLocalScale().y / 2, 0);
        },
        
        update: function (dt) {
            this._checkGround();    
        },
        
        move: function (direction) {
            if (this.onGround) {
                direction.scale(this.speed);
                this.entity.rigidbody.linearVelocity = direction;
            }
        },
        
        moveForward: function () {
            if (this.onGround) {
                var direction = this.entity.forward;
                direction.scale(this.speed);
                this.entity.rigidbody.linearVelocity = direction;
            }
        },
        
        stopMoving: function ()
        {
            this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
        },
        
        _checkGround: function () {
            /*
            var pos = this.entity.getPosition();
            this.rayEnd.add2(pos, this.groundCheckRay);
            this.onGround = false;

            // Fire a ray straight down to just below the bottom of the rigid body, 
            // if it hits something then the character is standing on something.
            context.systems.rigidbody.raycastFirst(pos, this.rayEnd, function (result) {
                this.onGround = true;
            }.bind(this));
            */
            this.onGround = true;
        }
    };

    return CharacterController;
});
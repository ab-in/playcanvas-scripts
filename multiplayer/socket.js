pc.script.create('socket', function (context) {
    var myCharacter = null;
    
    // Creates a new Socket instance
    var Socket = function (entity) {
        this.entity = entity;
        this.connection = io('ws://187.40.133.18:2593');
        this.updateTimer = 0;
        this.players = [];
    };

    Socket.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            myCharacter = context.root.findByName('Player').clone();
            myCharacter.enabled = true;
            context.root.addChild(myCharacter);
            
            this.connection.emit('initialize', {
                position: myCharacter.getPosition()
            });
            
            this.connection.on('playerList', function (data) {
                for (var i = 0; i < data.players.length; i++)
                {
                    var clone = context.root.findByName('Player').clone();
                    clone.enabled = true;
                    this.players[data.players[i]] = clone;
                    context.root.addChild(clone);
                }
            }.bind(this));
            
            this.connection.on('playerConnected', function (data) {
                var clone = context.root.findByName('Player').clone();
                clone.enabled = true;
                this.players[data.socketId] = clone;
                context.root.addChild(clone);
                console.log('A player connected.');
            }.bind(this));
            
            this.connection.on('playerUpdated', function (data) {
                this.players[data.socketId].setPosition(data.position);
                console.log('A player updated.');
            }.bind(this));
            
            this.connection.on('playerDisconnected', function (data) {
                this.players[data.socketId].destroy();
                delete this.players[data.socketId];
                console.log('A player disconnected.');
            }.bind(this));
            
            this.connection.on('clientsCount', function (data) {
                context.root.findByName('PlayersOnline').script.ui_text.setText('Players Online: ' + data.count);
            });
        },
        
        update: function (dt) {
            var hasMoved = false;
            var speed = 2 * dt;
            
            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                myCharacter.translate(-speed, 0, 0);
                hasMoved = true;
            }
            
            if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                myCharacter.translate(speed, 0, 0);
                hasMoved = true;
            }
            
            if (context.keyboard.isPressed(pc.input.KEY_UP)) {
                myCharacter.translate(0, speed, 0);
                hasMoved = true;
            }
            
            if (context.keyboard.isPressed(pc.input.KEY_DOWN)) {
                myCharacter.translate(0, -speed, 0);
                hasMoved = true;
            }
            
            if (this.updateTimer > 0.5 && hasMoved)
            {
                this.connection.emit('update', {
                    position: myCharacter.getPosition()
                });
                this.updateTimer = 0;
            }
            else
            {
                this.updateTimer += dt;
            }
        },

        emit: function (event, data) {
            this.connection.emit(event, data);
        }
    };

    return Socket;
});
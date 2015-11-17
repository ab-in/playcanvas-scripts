pc.script.attribute('speed', 'number', 3, {
    displayName: "Speed"
});

pc.script.create('follow_player', function (context)
{
    var GameManager;
    var giftPrefab;
    var giftEntity;
    var currentPosition;
    var targetPosition;
    var diff;
    var distance;

    var Follow_player = function (entity)
    {
        this.entity = entity;
        this.entity.addLabel('follower');
        this.timer = 0;
        this.targetEntity = null;
        this.spawner = null;
        this.tookGift = false;
    };

    Follow_player.prototype = {
        initialize: function ()
        {
            GameManager = context.root.findByName('GameManager');
            giftPrefab = context.root.findByName('Gift');
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        update: function (dt)
        {
            currentPosition = this.entity.getPosition();
            if (currentPosition.y != 0.5)
            {
                this.entity.setPosition(currentPosition.x, 0.5, currentPosition.z);
            }
            
            if (!this.tookGift)
            {
                if (this.timer > 1)
                {
                    var targetsSelector = GameManager.script.targets_selector;
                    if (!targetsSelector.contains(this.targetEntity))
                    {
                        if (targetsSelector.hasTargets())
                        {
                            this.targetEntity = targetsSelector.randomTarget();
                            this.distanceToKeep = 0;
                        }
                        else
                        {
                            this.targetEntity = context.root.findByName('Player');
                            this.distanceToKeep = 3;
                        }
                    }

                    this.timer = 0;
                }
                else
                {
                    this.timer += dt;
                }

                if (this.targetEntity !== null)
                {
                    targetPosition = this.targetEntity.getPosition();

                    targetPosition.y = currentPosition.y;
                    this.entity.lookAt(targetPosition);
                    this.entity.rotate(0, 180, 0);

                    diff = new pc.Vec3();
                    diff.sub2(targetPosition, currentPosition);

                    distance = diff.length();

                    if (distance > this.distanceToKeep)
                    {
                        this.entity.translateLocal(0, 0, this.speed * dt);
                    }
                }
            }
            else
            {
                currentPosition = this.entity.getPosition();
                targetPosition = this.spawner.getPosition();

                targetPosition.y = currentPosition.y;
                this.entity.lookAt(targetPosition);
                this.entity.rotate(0, 180, 0);

                diff = new pc.Vec3();
                diff.sub2(targetPosition, currentPosition);

                distance = diff.length();

                if (distance > 1)
                {
                    this.entity.translateLocal(0, 0, this.speed * dt);
                }
                else
                {
                    this.entity.destroy();
                }
            }
        },
        
        onCollisionStart: function (result)
        {
            if (!this.tookGift)
            {
                if (result.other.name == 'Sack' || result.other.name == 'Gift')
                {
                    context.root.findByName('HappinessMeter').script.happiness_meter.increaseHappiness(1);
    
                    if (result.other.name == 'Sack')
                    {
                        for (var i = 0; i < Math.floor(pc.math.random(1,4)); i++)
                        {
                            giftEntity = giftPrefab.clone();
                            context.root.addChild(giftEntity);
                            giftEntity.setPosition(result.other.getPosition());
                            giftEntity.setRotation(result.other.getRotation());
                            giftEntity.enabled = true;
                        }
                    }
                    
                    var randomLaugh = Math.floor(pc.math.random(0, this.entity.audiosource.assets.length));
                    switch(randomLaugh)
                    {
                        case 0: this.entity.audiosource.play('kid_giggle'); break;
                        case 1: this.entity.audiosource.play('giggle_sound'); break;
                        case 2: this.entity.audiosource.play('kid_laughing'); break;
                        case 3: this.entity.audiosource.play('laugh_short'); break;
                        case 4: this.entity.audiosource.play('young_laugh'); break;
                        default: this.entity.audiosource.play('kid_giggle');
                    }
                    
                    var giftTakenEntity = context.root.findByName('GiftTaken').clone();
                    this.entity.addChild(giftTakenEntity);
                    giftTakenEntity.setLocalPosition(0, -0.3, 0.5);
                    giftTakenEntity.enabled = true;
                    
                    this.tookGift = true;
                    result.other.destroy();
                }
            }
        }
    };

    return Follow_player;
});
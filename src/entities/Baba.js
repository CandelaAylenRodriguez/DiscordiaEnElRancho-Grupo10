export class Baba extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'baba');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setDepth(1);
        this.body.setSize(80,30,true)
        this.setTint(0x75eb82)

        this.scene.time.delayedCall(5000, () => {  ///para que se destruya
            this.destroy();
        }, [], this);
    }

   
    }
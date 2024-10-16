export class Cultivo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y,key) {
      super(scene, x, y, key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(0.5);
      this.body.setImmovable(true);
      //this.body.setSize(180,180,true)
    }
    
  
  }
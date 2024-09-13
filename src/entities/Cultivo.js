export class Cultivo extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
      super(scene, x, y, "cultivo");
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(0.5);
      this.body.setImmovable(true);
      this.body.setSize(180,180,true)
    }
    
  
  }
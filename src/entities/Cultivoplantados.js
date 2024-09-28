export class CultivosPlantados extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y,key) {
      super(scene, x, y,key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(0.6);
        
      

    }
    
}
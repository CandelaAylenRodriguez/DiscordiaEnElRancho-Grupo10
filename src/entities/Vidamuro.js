export class Vidamuro extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color) {
      super(scene, x, y, width, height, color);
      
      scene.add.existing(this);
      
     
    }
    actualizaBarra(){
      this.width=this.scene.muro.vida
    }

}
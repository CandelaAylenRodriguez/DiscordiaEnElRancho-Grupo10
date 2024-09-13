export class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key ) {
      super(scene, x, y,key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(2);
      this.body.setCollideWorldBounds(true);
      
      this.velocidad= 100;
      this.target= null;

    }
    
    update(){
        if (this.target) { 
            this.scene.physics.moveToObject(this, this.target, this.velocidad);
        }
    }



    moveTo(target) {
        this.target = target;

  }


}
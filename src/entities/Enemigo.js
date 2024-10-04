export class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key ) {
      super(scene, x, y,key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(2);
      this.body.setCollideWorldBounds(true);
      this.body.setBounce(1); // Puede ajustar el rebote según sea necesario
      this.velocidad= 100;
      this.target= null;
      this.enRetroceso=false;
    }
    
    update(){
        if (this.target && this.enRetroceso==false) { 
            this.scene.physics.moveToObject(this, this.target, this.velocidad);
        }
        else if (this.target && this.enRetroceso==true){
          this.scene.physics.moveToObject(this, this.target, -this.velocidad-80);
        }
    }

    moveTo(target) {
        this.target = target;

  }

  retroceso(){
    this.enRetroceso= true;
    setTimeout(() => {
      this.enRetroceso=false;
    }, 1000);
  }
 

}
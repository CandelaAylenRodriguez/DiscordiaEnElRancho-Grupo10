export class Muro extends Phaser.GameObjects.Image {
    constructor(scene, x, y,vida) {
      super(scene, x, y, "muro");
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(0.5);
      this.body.setImmovable(true);
      this.body.setSize(470,470,true)
      this.vida= vida
    }

    update()
    {
      
    }
    
    restaVida(){
      this.vida= this.vida-60;
      console.log(this.vida);
      this.scene.barraVida.actualizaBarra();
      if (this.vida==0){
        this.destroy();
      }
    }

    sumaVida(){
      if (this.vida<=600) {
        this.vida=this.vida+60;
        this.scene.barraVida.actualizaBarra();
      }
      
    }

  
  }
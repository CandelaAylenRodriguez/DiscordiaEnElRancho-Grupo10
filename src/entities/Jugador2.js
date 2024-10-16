import { Control2 } from "../components/Control2";
export class Jugador2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, cursors2 ) {
      super(scene, x, y,key, cursors2);
      
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.setScale(3);
      this.body.setSize(16,16,true)

      ///iniciar componente control2
      this.movimiento = new Control2(scene, this, cursors2);
    }
    
    update() {
      // Actualizar el componente de movimiento
      this.movimiento.update();
    }
  }
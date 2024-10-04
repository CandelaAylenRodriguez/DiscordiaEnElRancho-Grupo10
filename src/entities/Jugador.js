import { Control } from "../components/Control";

export class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, keyAnim,cursors ) {
      super(scene, x, y,key, keyAnim,cursors);
      
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.setScale(3);
      this.body.setSize(13,18,true)

      // Crear las animaciones específicas para este jugador
      this.CreaAnimaciones(keyAnim,"caminaAbajo",0,5,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaIzquierda",8,12,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaDerecha",16,21,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaArriba",24,29,10,-1);
      this.CreaAnimaciones(keyAnim,"idle",0,2,10,-1);
      this.CreaAnimaciones(keyAnim,"ataqueAbajo",32,39,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueIzquierda",40,47,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueDerecha",48,55,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueArriba",56,63,15,0);

      

      ///iniciar componente control
      this.movimiento = new Control(scene, this, cursors);
    }
    
    update() {
      // Actualizar el componente de movimiento
      this.movimiento.update();
    }

   
    CreaAnimaciones(keyAnin,clave, startframe,endframe,rate, repet) { ///metodo para crear las animaciones
      this.anims.create({
        key: keyAnin+ clave,  // key del sritesheep + la clave de animacion para diferenciar entre los jugadores
        frames: this.anims.generateFrameNumbers(keyAnin, { start: startframe, end: endframe }),  // Rango de frames a usar
        frameRate: rate,  // Velocidad de la animación (frames por segundo)
        repeat: repet  // Repetir indefinidamente
        });
    }
    

    
  
  }
import { Control } from "../components/Control";
export class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, keyAnim,cursors ) {
      super(scene, x, y,key, keyAnim,cursors);
      
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.setScale(3);
      this.body.setSize(13,18,true)
      this.setDepth(6);
      this.paralizada=false;


      // Crear las animaciones específicas para este jugador
      this.CreaAnimaciones(keyAnim,"caminaAbajo",48,55,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaIzquierda",60,67,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaDerecha",72,79,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaArriba",84,91,10,-1);
      this.CreaAnimaciones(keyAnim,"idleAbajo",0,11,10,-1);
      this.CreaAnimaciones(keyAnim,"idleIzquierda",12,23,10,-1);
      this.CreaAnimaciones(keyAnim,"idleDerecha",24,35,10,-1);
      this.CreaAnimaciones(keyAnim,"idleArriba",36,39,10,-1);
      this.CreaAnimaciones(keyAnim,"ataqueAbajo",96,103,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueIzquierda",108,115,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueDerecha",120,127,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueArriba",132,139,15,0);

      

      ///iniciar componente control
      this.movimiento = new Control(scene, this, cursors);
    }
    
    update() {
      // Actualizar el componente de movimiento
      this.movimiento.update();
    }

   
    CreaAnimaciones(keyAnin,clave, startframe,endframe,rate, repet) { ///metodo para crear las animaciones
      this.anims.create({
        key: keyAnin + clave,  // key del sritesheep + la clave de animacion para diferenciar entre los jugadores
        frames: this.anims.generateFrameNumbers(keyAnin, { start: startframe, end: endframe }),  // Rango de frames a usar
        frameRate: rate,  // Velocidad de la animación (frames por segundo)
        repeat: repet  // Repetir indefinidamente
        });
    }

  }
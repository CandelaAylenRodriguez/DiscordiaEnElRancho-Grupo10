import { Control } from "../components/Control";
export class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, keyAnim,cursors ) {
      super(scene, x, y,key, keyAnim,cursors);
      
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.setScale(1.2);
      this.body.setSize(13,18,true)
      this.setDepth(6);
      this.paralizada=false;


      // Crear las animaciones específicas para este jugador
      this.CreaAnimaciones(keyAnim,"caminaAbajo",32,39,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaIzquierda",40,47,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaDerecha",48,55,10,-1);
      this.CreaAnimaciones(keyAnim,"caminaArriba",56,63,10,-1);
      this.CreaAnimaciones(keyAnim,"idleAbajo",32,33,5,-1);
      this.CreaAnimaciones(keyAnim,"idleIzquierda",40,41,5,-1);
      this.CreaAnimaciones(keyAnim,"idleDerecha",48,49,5,-1);
      this.CreaAnimaciones(keyAnim,"idleArriba",56,57,5,-1);
      this.CreaAnimaciones(keyAnim,"ataqueAbajo",0,3,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueIzquierda",8,11,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueDerecha",16,19,15,0);
      this.CreaAnimaciones(keyAnim,"ataqueArriba",24,27,15,0);

      

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
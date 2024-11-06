import { Baba } from "./Baba";
export class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key ) {
      super(scene, x, y,key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(1.4);
      this.body.setCollideWorldBounds(true);
      this.body.setBounce(1); // Puede ajustar el rebote según sea necesario
      this.velocidad= 100;
      this.target= null;
      this.enRetroceso=false;
      this.vivo = true;   
      this.key= key;
      this.generador;
      this.setDepth(5);
      this.initialy = y;
      this.CreaAnimaciones(key,"camina",0,3,10,-1)
      this.CreaAnimaciones(key,"muere",4,7,10,0)

      if (this.key== "enemigo2"){
       this.generador= this.scene.time.addEvent({
          delay: 2000,
          callback: this.generarBaba,
          callbackScope: this,
          loop: true,
        });}}




    //this.scene.sound.play('Aleteo');

    
    update(){
      if (this.vivo) { // Si el enemigo está vivo
        if (this.target && !this.enRetroceso) { 
            this.scene.physics.moveToObject(this, this.target, this.velocidad);
            this.play(this.texture.key + "camina", true); // Reproducir animación de caminar
        } else if (this.target && this.enRetroceso) {
            this.scene.physics.moveToObject(this, this.target, -(this.velocidad + 80));
            this.play(this.texture.key + "camina", true); // Seguir caminando hacia atrás
        }
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
 
  morir() {
    if(this.key=="enemigo2"){
      this.generador.destroy();
    }
    this.vivo = false;  // Marcar al enemigo como no vivo
    this.body.setVelocity(0, 0); // Detener su movimiento
    this.play(this.texture.key + "muere"); // Reproducir animación de muerte
    this.body.enable=false;
    const uiScene = this.scene.scene.get('UI');  // Acceder a la escena 'UI'
    uiScene.puntajeComponent.aumentarPuntaje(60);
    this.on('animationcomplete', () => {
        if (!this.vivo) {
          this.destroy(); // Destruir el enemigo una vez que la animación de muerte termine
        }
    });
}

  CreaAnimaciones(key,clave, startframe,endframe,rate, repet) { ///metodo para crear las animaciones
    this.anims.create({
      key: key+ clave,  // key del sritesheep + la clave de animacion para diferenciar entre los jugadores
      frames: this.anims.generateFrameNumbers(key, { start: startframe, end: endframe }),  // Rango de frames a usar
      frameRate: rate,  // Velocidad de la animación (frames por segundo)
      repeat: repet  // Repetir indefinidamente
      });
  }

  generarBaba(){
    
       const baba = new Baba(this.scene,this.x,this.y);
      this.scene.babas.add(baba);
      this.scene.sound.play('Baba');
    
    
   }

}
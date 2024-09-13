export class Control {
  constructor(scene, jugador, cursors) {
    this.scene = scene;
    this.jugador = jugador; // El jugador que usará este componente
    this.cursors = cursors; // Controles de entrada (pueden variar para cada jugador)
    this.velocidadInicial = 200;       // Velocidad del jugador
  }

  update(){
   
   ///movimiento y animaciones
    if (this.cursors.left.isDown) {
      this.jugador.body.setVelocityX(-this.velocidadInicial);
      this.jugador.anims.play(this.jugador.texture.key + 'caminaIzquierda', true);
    }
    else if (this.cursors.right.isDown) {
      this.jugador.body.setVelocityX(this.velocidadInicial);
      this.jugador.anims.play(this.jugador.texture.key + 'caminaDerecha', true);
    }
    else if (this.cursors.up.isDown){
      this.jugador.body.setVelocityY(-this.velocidadInicial);
      this.jugador.anims.play(this.jugador.texture.key + 'caminaArriva', true);
    }
    else if (this.cursors.down.isDown){
      this.jugador.body.setVelocityY(this.velocidadInicial);
      this.jugador.anims.play(this.jugador.texture.key + 'caminaAbajo', true);
    }
    else {
      this.jugador.body.setVelocity(0,0);
      this.jugador.anims.play(this.jugador.texture.key + 'idle', true);
    }
  }

 
  

}

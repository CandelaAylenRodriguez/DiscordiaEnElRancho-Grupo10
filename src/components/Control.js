export class Control {
  constructor(scene, jugador, cursors) {
    this.scene = scene;
    this.jugador = jugador; // El jugador que usará este componente
    this.cursors = cursors; // Controles de entrada (pueden variar para cada jugador)
    this.velocidadInicial = 200;       // Velocidad del jugador
    this.direccion = "abajo"; // Dirección inicial
    this.atacando = false; // Estado de ataque
  }

  update(){
    
     // si no esta atacando llama al metodo que contiene el movimiento
     if (!this.atacando) {
      this.ejecutarMovimiento();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.attack)) { // si se presiona la tecla de ataque entonces llama la metodo ataquee
      this.jugador.body.setVelocity(0);
      this.atacar();
    }
  }

  ejecutarMovimiento() { //// metodo para ejecutar el movimiento
    let movimiento = false; ///variable para saber si esta en movimiento
    this.jugador.body.setVelocity(0); /// resetea la velocidad
    const currentAnimKey = this.jugador.anims.currentAnim ? this.jugador.anims.currentAnim.key : ''; ///verifica si hay una animacion y sino le asigna un valor vacio para que no de error jsjsjs

    // Movimiento hacia la izquierda
    if (this.cursors.left.isDown) {
      this.jugador.body.setVelocityX(-this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaIzquierda') { ///comprueba si se esta ejecutando tal animacion o no 
        this.jugador.anims.play(this.jugador.texture.key + 'caminaIzquierda', true); ///ejecuta la animacion
      }
      this.direccion = "izquierda"; /// asigna el valor a la variable dirrecion
      movimiento = true;
    }

    // Movimiento hacia la derecha
    else if (this.cursors.right.isDown) {
      this.jugador.body.setVelocityX(this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaDerecha') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaDerecha', true);
      }
      this.direccion = "derecha";
      movimiento = true;
    }

    // Movimiento hacia arriba
    else if (this.cursors.up.isDown) {
      this.jugador.body.setVelocityY(-this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaArriba') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaArriba', true);
      }
      this.direccion = "arriba";
      movimiento = true;
    }

    // Movimiento hacia abajo
    else if (this.cursors.down.isDown) {
      this.jugador.body.setVelocityY(this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaAbajo') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaAbajo', true);
      }
      this.direccion = "abajo";
      movimiento = true;
    }

    // Si no hay movimiento, reproducir animación idle
    if (!movimiento) {
      if (currentAnimKey !== this.jugador.texture.key + 'idle') {
        this.jugador.anims.play(this.jugador.texture.key + 'idle', true);
      }
    }
  }

  atacar(){ ///metodo para ejecutae el ataque
    this.atacando = true; //////asigna que el jugador esta atacando
    let ataqueAnim; ///variable para la animacion

    
    if (this.direccion === "izquierda") {  /// determina que animacion hacer dependiendo la direccion del personaje
      ataqueAnim = this.jugador.texture.key + 'ataqueIzquierda';
    } else if (this.direccion === "derecha") {
      ataqueAnim = this.jugador.texture.key + 'ataqueDerecha';
    } else if (this.direccion === "arriba") {
      ataqueAnim = this.jugador.texture.key + 'ataqueArriba';
    } else if (this.direccion === "abajo") {
      ataqueAnim = this.jugador.texture.key + 'ataqueAbajo';
    }
    
    this.jugador.anims.play(ataqueAnim, true); ///reproduce la animacion
    this.jugador.once('animationcomplete', () => { ///cuando se termina la animacion vuelve a poner en false la variable de ataque
      this.atacando = false;
    });
  }


}

 
  



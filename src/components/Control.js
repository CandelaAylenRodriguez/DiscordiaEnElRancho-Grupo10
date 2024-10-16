import { Ataque } from "../entities/Ataque";
export class Control {
  constructor(scene, jugador, cursors) {
    this.scene = scene;
    this.jugador = jugador; // El jugador que usará este componente
    this.cursors = cursors; // Controles de entrada (pueden variar para cada jugador)
    this.velocidadInicial = 200;       // Velocidad del jugador
    this.direccion = "abajo"; // Dirección inicial
    this.atacando = false; // Estado de ataque

  }

  update() {
    if (!this.atacando) {
        this.ejecutarMovimiento();
    }

    // Verifica si this.cursors.attack está definido
    if (this.cursors.attack && Phaser.Input.Keyboard.JustDown(this.cursors.attack)) {
        this.jugador.body.setVelocity(0);
        this.atacar();
    }
}

  ejecutarMovimiento() { //// metodo para ejecutar el movimiento
    let movimiento = false; ///variable para saber si esta en movimiento
    this.jugador.body.setVelocity(0); /// resetea la velocidad
    const currentAnimKey = this.jugador.anims.currentAnim ? this.jugador.anims.currentAnim.key : ''; ///verifica si hay una animacion y sino le asigna un valor vacio para que no de error jsjsjs

    if (this.cursors.left.isDown) {// Movimiento hacia la izquierda
      this.jugador.body.setVelocityX(-this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaIzquierda') { ///comprueba si se esta ejecutando tal animacion o no 
        this.jugador.anims.play(this.jugador.texture.key + 'caminaIzquierda', true); ///ejecuta la animacion
      }
      this.direccion = "izquierda"; /// asigna el valor a la variable dirrecion
      movimiento = true;
    }
    else if (this.cursors.right.isDown) {// Movimiento hacia la derecha
      this.jugador.body.setVelocityX(this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaDerecha') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaDerecha', true);
      }
      this.direccion = "derecha";
      movimiento = true;
    }
    else if (this.cursors.up.isDown) {// Movimiento hacia arriba
      this.jugador.body.setVelocityY(-this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaArriba') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaArriba', true);
      }
      this.direccion = "arriba";
      movimiento = true;
    }
    else if (this.cursors.down.isDown) {// Movimiento hacia abajo
      this.jugador.body.setVelocityY(this.velocidadInicial);
      if (currentAnimKey !== this.jugador.texture.key + 'caminaAbajo') {
        this.jugador.anims.play(this.jugador.texture.key + 'caminaAbajo', true);
      }
      this.direccion = "abajo";
      movimiento = true;
    }

    if (!movimiento) { // Si no hay movimiento, reproducir animación idle
        if(this.direccion=="arriba"){
          this.jugador.anims.play(this.jugador.texture.key + 'idleArriba', true);
        }
        else if (this.direccion=="abajo"){
          this.jugador.anims.play(this.jugador.texture.key + 'idleAbajo', true);
        }
        else if (this.direccion=="izquierda"){
          this.jugador.anims.play(this.jugador.texture.key + 'idleIzquierda', true);
        }
        else {
          this.jugador.anims.play(this.jugador.texture.key + 'idleDerecha', true);
        
        }
    }
  }

  atacar(){ ///metodo para ejecutae el ataque
    this.atacando = true; //////asigna que el jugador esta atacando
    let ataqueAnim; ///variable para la animacion
    if (this.direccion === "izquierda") {  /// determina que animacion hacer dependiendo la direccion del personaje
      ataqueAnim = this.jugador.texture.key + 'ataqueIzquierda';
      this.creaAtq(-500,0)
    } else if (this.direccion === "derecha") {
      ataqueAnim = this.jugador.texture.key + 'ataqueDerecha';
      this.creaAtq(500,0)
    } else if (this.direccion === "arriba") {
      ataqueAnim = this.jugador.texture.key + 'ataqueArriba';
      this.creaAtq(0,-500)
    } else if (this.direccion === "abajo") {
      ataqueAnim = this.jugador.texture.key + 'ataqueAbajo';
      this.creaAtq(0,500)
    }
    this.jugador.anims.play(ataqueAnim, true); ///reproduce la animacion
    this.jugador.once('animationcomplete', () => { ///cuando se termina la animacion vuelve a poner en false la variable de ataque
    this.atacando = false;
    });
  }

  creaAtq (velx,vely) {
    const atq= new Ataque(this.scene,this.jugador.x,this.jugador.y,25,0xffffff,1);
    this.scene.ataque.add(atq);
    atq.body.setVelocity(velx,vely);
    
  }

}

 
  



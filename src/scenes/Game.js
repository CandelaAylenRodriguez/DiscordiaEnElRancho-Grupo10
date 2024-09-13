import { Scene } from "phaser";

// import class entitities
/*import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";
import { GrupoPelotas } from "../entities/GrupoPelotas";
import { GrupoBombas } from "../entities/GrupoBombas";*/
import { Cultivo } from "../entities/Cultivo";
import { Jugador } from "../entities/Jugador";
import { Control } from "../components/Control";
import { Enemigo } from "../entities/Enemigo";
import { Grupoenemigo } from "../entities/Grupoenemigo";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.add.image(960, 540, "fondo");

    this.cultivo= new Cultivo(this,920,540);
    this.enemigosTipo1 = new Grupoenemigo(this, "enemigo1", 2000, this.cultivo);

    const cursors1 = this.input.keyboard.createCursorKeys(); // Controles del jugador 2
    const cursors2 = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }); // Controles del jugador 1

    this.jugador1 = new Jugador(this, 800, 500, 'jugador1', "jugador1", cursors2); /// crea el jugador 1
    this.jugador2 = new Jugador(this, 1100, 500, 'jugador2', 'jugador2', cursors1);

    ///colisiones
    this.physics.add.collider(this.jugador1, this.cultivo);
    this.physics.add.collider(this.jugador2, this.cultivo);
    this.physics.add.collider( this.cultivo,this.enemigosTipo1.enemigos, this.colisionCultivo, null, this);
  }

  update() {
    
    this.jugador1.update();
    this.jugador2.update();
    this.enemigosTipo1.update();

  }

  colisionCultivo(cultivo,enemigosTipo1){
    enemigosTipo1.destroy();
  }
}

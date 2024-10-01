import { Scene } from "phaser";
import { Cultivo } from "../entities/Cultivo";
import { Jugador } from "../entities/Jugador";
import { Control } from "../components/Control";
import { Enemigo } from "../entities/Enemigo";
import { Grupoenemigo } from "../entities/Grupoenemigo";
import { Muro } from "../entities/Muro";
import { Vidamuro } from "../entities/Vidamuro";
import { Grupocultivo } from "../entities/Grupocultivo";
import { TimerComponent } from "../components/TimerComponent";


export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.add.image(960, 540, "fondo");

    this.cultivo= new Cultivo(this,960,540,"cultivo");
    this.verduras= new Grupocultivo(this);
    this.muro= new Muro(this,960,540,600);
    this.enemigosTipo1 = new Grupoenemigo(this, "enemigo1", 2000, this.cultivo);
    this.barraVida= new Vidamuro(this,960,1000,this.muro.vida,50,0x7FFF00);

    const cursors1 = this.input.keyboard.createCursorKeys(); // Controles del jugador 2
    cursors1.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Tecla de ataque del jugador 2
    const cursors2 = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE // Tecla de ataque del jugador 1
    }); // Controles del jugador 1

    this.jugador1 = new Jugador(this, 800, 500, 'jugador1', "jugador1", cursors2); /// crea el jugador 1
    this.jugador2 = new Jugador(this, 1100, 500, 'jugador2', 'jugador2', cursors1);

    ///colisiones
    this.physics.add.collider(this.jugador1, this.muro);
    this.physics.add.collider(this.jugador2, this.muro);
    this.physics.add.collider( this.muro,this.enemigosTipo1, this.destruyeEnemigo, null, this);
    this.physics.add.collider( this.cultivo,this.enemigosTipo1,this.destruyeUnCultivo, null, this);
    
    //Temporizador
    this.timer = new TimerComponent(this, () => {
      this.scene.start('Game'); // Reiniciar la escena al llegar a 0
        });

  }

  update() {
    
    this.jugador1.update();
    this.jugador2.update();
    this.enemigosTipo1.update();
    this.muro.update();
  }
  destruyeUnCultivo(cultivo,enemigo){
       console.log(this.verduras.getChildren().length)
        if (this.verduras.getChildren().length >0){
          enemigo.destroy();
    // Obtener una verdura aleatoria del grupo
      const verduras = this.verduras.getChildren();///obtiene todos los hijo del grupo y los guarda en una variable
      const randomIndex = Phaser.Math.Between(0, verduras.length - 1);///busca un numero aleatorio entre el 0 y la cantidad de hijos
      const verduraAleatoria = verduras[randomIndex];///depende el numero que ocupa en el array selecciona el objeto y lo guarda
        // Destruir la verdura aleatoria
          if (verduraAleatoria) { ///si existe ele objeto
            verduraAleatoria.destroy(); /// lo destruye
          }
        }
        else {
          this.scene.start('GameOver');
        }
  }

  destruyeEnemigo(muro,enemigosTipo1){
    enemigosTipo1.destroy();
    this.muro.restaVida();
  }
}
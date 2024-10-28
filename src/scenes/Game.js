import { Scene } from "phaser";
import { Cultivo } from "../entities/Cultivo";
import { Jugador } from "../entities/Jugador";
import { Grupoenemigo } from "../entities/Grupoenemigo";
import { Muro } from "../entities/Muro";
import { Grupocultivo } from "../entities/Grupocultivo";
import { Grupoataque } from "../entities/Grupoataque";
import { Grupomadera } from "../entities/Grupomadera";
import { GrupoBaba } from "../entities/GrupoBaba";
import { Jefe } from "../entities/Jefe";

export class Game extends Scene {
  constructor() {
      super("Game");
      this.maderaGroup = null; // Inicializa el grupo de maderas
  }

  create() {
     this.scene.launch("UI", { events: this.events });
    // Detener la música del menú cuando comienza la escena de juego
        const musicaMenu = this.sound.get('menuMusic'); // Asegúrate de usar el mismo nombre que usaste para cargar el audio
        if (musicaMenu) {
            musicaMenu.stop();
        }
      this.add.image(960, 540, 'fondo');
      this.cultivo = new Cultivo(this, 960, 540, "cultivo");
      this.verduras = new Grupocultivo(this);
      this.muro = new Muro(this, 960, 540);
      this.time.delayedCall(100, () => {
        this.events.emit('vida', this.muro.vida);
    });
      this.enemigosTipo1 = new Grupoenemigo(this, "enemigo1", 5000, this.cultivo,1);
      this.enemigosTipo2 = new Grupoenemigo(this, "enemigo2", 8000, this.cultivo,2);
      this.enemigosTipo3 = new Grupoenemigo(this, "enemigo3", 9000, this.cultivo,3);
      this.enemigosTipo4 = new Grupoenemigo(this, "enemigo4", 6000, this.cultivo,4);
      //this.uiScene = this.scene.get('UI');
      const uiScene = this.scene.get("UI");
      setTimeout(() => {
        const lvl = uiScene.retvl()
        console.log(uiScene.retvl()); 
        if (lvl>=5) {
          this.jefefinal = new Jefe(this,"jefe");
        }    
      }, 200);
      this.babas = new GrupoBaba(this)
      this.ataque = new Grupoataque(this);
      this.maderaGroup = new Grupomadera(this);
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
      
     /// Colisiones
      this.physics.add.collider(this.jugador1, this.muro);
      this.physics.add.collider(this.jugador2, this.muro);
      this.physics.add.collider(this.muro, this.enemigosTipo1, this.destruyeEnemigo, null, this);
      this.physics.add.collider(this.cultivo, this.enemigosTipo1, this.destruyeUnCultivo, null, this);
      this.physics.add.overlap(this.ataque, this.enemigosTipo1, this.mataEnemigo, null, this);
      this.physics.add.collider(this.muro, this.enemigosTipo2, this.destruyeEnemigo, null, this);
      this.physics.add.collider(this.cultivo, this.enemigosTipo2, this.destruyeUnCultivo, null, this);
      this.physics.add.overlap(this.ataque, this.enemigosTipo2, this.mataEnemigo, null, this);
      this.physics.add.collider(this.muro, this.enemigosTipo3, this.destruyeEnemigo, null, this);
      this.physics.add.collider(this.cultivo, this.enemigosTipo3, this.destruyeUnCultivo, null, this);
      this.physics.add.overlap(this.ataque, this.enemigosTipo3, this.mataEnemigo, null, this);
      this.physics.add.collider(this.muro, this.enemigosTipo4, this.destruyeEnemigo, null, this);
      this.physics.add.collider(this.cultivo, this.enemigosTipo4, this.destruyeUnCultivo, null, this);
      this.physics.add.overlap(this.ataque, this.enemigosTipo4, this.mataEnemigo, null, this);
      this.physics.add.overlap(this.jugador1, this.maderaGroup, this.recolectarMadera, null, this);
      this.physics.add.overlap(this.jugador2, this.maderaGroup, this.recolectarMadera, null, this);
      this.physics.add.overlap(this.maderaGroup, this.cultivo,this.destruyeMadera,null,this);
      this.physics.add.overlap(this.jugador1,this.babas,this.llamaParalisis,null,this);
      this.physics.add.overlap(this.jugador2,this.babas,this.llamaParalisis,null,this);
      this.physics.add.overlap(this.ataque,this.jefefinal,this.golpeJefe,null,this);
      
      this.events.removeAllListeners('pasarnivel');
      this.events.on('pasarnivel', () => {
        this.scene.restart();
      });

      
    }

  update() {
      this.jugador1.update();
      this.jugador2.update();
      this.enemigosTipo1.update();
      this.enemigosTipo2.update();
      this.enemigosTipo3.update();
      this.enemigosTipo4.update();
      this.muro.update();
      if (this.jefefinal) {
        this.jefefinal.update();
    }
  }
  
  recolectarMadera(jugador, madera) {
    if (this.vida > 0 || !this.visible) { // Verifica si el muro aún tiene vida
        this.muro.sumaVida(); // Aumenta la vida del muro en 120
        madera.destroy(); // Destruye el recolectable de madera
        this.maderaGroup.remove(madera); // Elimina la madera del grupo
    }
  }
  destruyeUnCultivo(cultivo, enemigo) {
    if (this.verduras.getChildren().length > 0) {
        this.cameras.main.shake(100, 0.003);
        enemigo.morir();
        const verduraAleatoria = Phaser.Utils.Array.RemoveRandomElement(this.verduras.getChildren()); // Elimina una verdura aleatoria del grupo de verduras
        if (verduraAleatoria) {
            verduraAleatoria.destroy();
        }
         if (this.verduras.getChildren().length === 0) { // Verifica si ya no quedan más cultivos después de destruir uno
            this.nivelActual = 1;
            localStorage.setItem('nivel', this.nivelActual.toString());
            this.scene.stop("UI");
            this.scene.start('GameOver');
        }
    }
}
  destruyeEnemigo(muro, enemigos) {
    enemigos.retroceso();
    muro.restaVida(); // Esto actualizará la vida del muro y luego la barra de vida
    this.cameras.main.shake(100, 0.003);
    this.muro.setTint(0xff0000);
    this.cultivo.setTint(0xff0000)
    this.time.delayedCall(100, () => {
            this.muro.clearTint();
            this.cultivo.clearTint();
        }, [], this);
  }
  mataEnemigo(ataque, enemigos) {
     enemigos.morir();
  }
  destruyeMadera(madera,cultivo){
    madera.destroy();
    this.maderaGroup.generarMadera();
    console.log("destruyo la madera");
  }

  llamaParalisis(jugador,baba){
    jugador.movimiento.paralizaJugador(jugador);
    baba.destroy();
  }
  golpeJefe(ataque,jefe){
    console.log("golpe")
    jefe.setTint(0xff0000);
    jefe.restaVida();
    jefe.intocable();
    setTimeout(() => {
      jefe.clearTint();
      jefe.CambiaPosicion();
    }, 100);
    
  }

}
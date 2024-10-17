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
import { Grupoataque } from "../entities/Grupoataque";
import { Madera } from "../entities/Madera";
import { PuntajeComponent } from "../components/PuntajeComponent";

export class Game extends Scene {
  constructor() {
      super("Game");
      this.maderaGroup = null; // Inicializa el grupo de maderas
  }

  create() {
    this.nivelActual = parseInt(localStorage.getItem('nivel')) || 1; ///recupero el valor almacenado en el localStorage, sino tiene valor le da uno
    console.log("nivel"+this.nivelActual)
    // Detener la música del menú cuando comienza la escena de juego
        const musicaMenu = this.sound.get('menuMusic'); // Asegúrate de usar el mismo nombre que usaste para cargar el audio
        if (musicaMenu) {
            musicaMenu.stop();
        }
      this.add.image(960, 540, 'fondo');
      this.cultivo = new Cultivo(this, 960, 540, "cultivo");
      this.verduras = new Grupocultivo(this);
      this.muro = new Muro(this, 960, 540, 600);
      this.enemigosTipo1 = new Grupoenemigo(this, "enemigo1", 5000, this.cultivo,1);
      this.enemigosTipo2 = new Grupoenemigo(this, "enemigo2", 8000, this.cultivo,2);
      this.enemigosTipo3 = new Grupoenemigo(this, "enemigo3", 9000, this.cultivo,3);
      this.enemigosTipo4 = new Grupoenemigo(this, "enemigo4", 6000, this.cultivo,4);
      this.barraVida = new Vidamuro(this, 960, 1000, this.muro.vida, 50, 0x7fff00);
      this.ataque = new Grupoataque(this);
      this.maderaGroup = this.physics.add.group();// Crea un grupo para las maderas
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
      
      this.time.addEvent({// Establecer un temporizador para generar madera cada 30 segundos
          delay: 30000, // 30 segundos
          callback: this.generarMadera,
          callbackScope: this,
          loop: true // Repite el evento
      });
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
      // Temporizador
      this.timer = new TimerComponent(this, () => {
        this.nivelActual= this.nivelActual+1 ///le sumo 
        localStorage.setItem('nivel', this.nivelActual.toString());/// lo guardo en el local storage
        this.scene.restart(); // Reiniciar la escena al llegar a 0
      });
      // Se asegura de que el puntaje no se reinicie// Crea una nueva instancia del componente de puntaje
      const puntajeGuardado = this.registry.get('puntaje'); // Obtener el puntaje guardado del registro
      this.puntajeComponent = new PuntajeComponent(this, puntajeGuardado); // Pasa el puntaje guardado al componente
  }

  update() {
      this.jugador1.update();
      this.jugador2.update();
      this.enemigosTipo1.update();
      this.enemigosTipo2.update();
      this.enemigosTipo3.update();
      this.enemigosTipo4.update();
      this.muro.update();
  }
  generarMadera() {
    if (this.muro.vida > 0) { // Generar una posición aleatoria dentro de los límites deseados
      const x = Phaser.Math.Between(0, this.cameras.main.width); // Ajusta según tus límites
      const y = Phaser.Math.Between(0, this.cameras.main.height); // Ajusta según tus límites
      
      const madera = new Madera(this, x, y); // Generar madera en una posición aleatoria
      this.maderaGroup.add(madera); // Añadir al grupo de maderas
    }
  }
  recolectarMadera(jugador, madera) {
    if (this.muro.vida > 0) { // Verifica si el muro aún tiene vida
        this.muro.sumaVida(); // Aumenta la vida del muro en 120
        madera.destroy(); // Destruye el recolectable de madera
        this.maderaGroup.remove(madera); // Elimina la madera del grupo

        // Agrega el console.log para mostrar la vida actual del muro
        console.log(`Vida del muro después de recolectar madera: ${this.muro.vida}`);
    }
  }
  destruyeUnCultivo(cultivo, enemigo) {
    if (this.verduras.getChildren().length > 0) {
        enemigo.destroy();
        const verduraAleatoria = Phaser.Utils.Array.RemoveRandomElement(this.verduras.getChildren()); // Elimina una verdura aleatoria del grupo de verduras
        if (verduraAleatoria) {
            verduraAleatoria.destroy();
        }
         if (this.verduras.getChildren().length === 0) { // Verifica si ya no quedan más cultivos después de destruir uno
            this.nivelActual = 1;
            localStorage.setItem('nivel', this.nivelActual.toString());
            this.scene.start('GameOver');
        }
    }
}
  destruyeEnemigo(muro, enemigos) {
    enemigos.retroceso();
    muro.restaVida(); // Esto actualizará la vida del muro y luego la barra de vida
  }
  mataEnemigo(ataque, enemigos) {
     enemigos.morir();
  }
}
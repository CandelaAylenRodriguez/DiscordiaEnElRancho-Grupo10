import { Scene } from "phaser"; 
import { crearParcelas } from '../entities/Grupoparcelas.js';
import { Jugador2 } from "../entities/Jugador2.js";
import { PuntajeComponentMiniJuego2 } from "../components/PuntajeComponentMiniJuego2.js";
import { Barro } from "../entities/Barro.js"; // Asegúrate de importar la clase Barro

export class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2' });
        this.barro = null; // Referencia para el barro
    }

    create() {
        // Detener todos los sonidos previos al comenzar esta escena
        this.sound.stopAll();

        // Iniciar la música de fondo para esta escena
        this.musicMin2 = this.sound.add('MusicMin2', { loop: true });
        this.musicMin2.play();

        // Lanzar la escena de UI2
        this.scene.launch("UI2", { events: this.events });
        this.add.image(960, 540, "fondo2");

        // Matriz de parcelas
        this.parcelas = crearParcelas(this);

        // Jugadores en posiciones específicas del array de parcelas
        const jugador1Pos = this.parcelas[0][0]; // Posición (0, 0)
        const jugador2Pos = this.parcelas[7][15]; // Posición (7, 15)

        // Tamaño de las parcelas
        const tamanoParcela = jugador1Pos.displayWidth;

        // Crea el jugador 1 en la posición inicial (0, 0) con su textura, centrado
        this.jugador1 = new Jugador2(
            this, 
            jugador1Pos.x + tamanoParcela / 2, // Centrar en x
            jugador1Pos.y + tamanoParcela / 2, // Centrar en y
            'jugador1', 
            'textura1', 
            true
        );

        // Asegúrate de que el origen esté en el centro
        this.jugador1.setOrigin(0, 0.15);
        this.jugador1.posicionx = 0;
        this.jugador1.posiciony = 0;

        // Crea el jugador 2 en la posición inicial (7, 15) con su textura, centrado
        this.jugador2 = new Jugador2(
            this, 
            jugador2Pos.x + tamanoParcela / 2, // Centrar en x
            jugador2Pos.y + tamanoParcela / 2, // Centrar en y
            'jugador2', 
            'textura2'
        );

        // Asegúrate de que el origen esté en el centro
        this.jugador2.setOrigin(0, 0.15);
        this.jugador2.posicionx = 15;
        this.jugador2.posiciony = 7;

        // Escuchar el evento 'fin' del temporizador
        this.events.removeAllListeners('fin');
        this.events.on('fin', () => {
            this.onTimerComplete1();
        });

        // Iniciar el temporizador para generar el barro cada 15 segundos
        this.time.addEvent({
            delay: 15000,
            callback: this.spawnBarro,
            callbackScope: this,
            loop: true
        });
    }

    spawnBarro() {
        // Elimina el barro anterior si existe
        if (this.barro) {
            this.barro.destroy();
        }
    
        // Selecciona una parcela aleatoria para colocar el barro
        const randomX = Phaser.Math.Between(0, this.parcelas.length - 1);
        const randomY = Phaser.Math.Between(0, this.parcelas[0].length - 1);
        const parcela = this.parcelas[randomX][randomY];
    
        // Crea una instancia de Barro en el centro de la parcela aleatoria
        const barroX = parcela.x + parcela.displayWidth / 2;
        const barroY = parcela.y + parcela.displayHeight / 2;
        this.barro = new Barro(this, barroX, barroY);
    
        // Agregar colisiones con los jugadores
        this.physics.add.overlap(this.barro, this.jugador1, () => this.barro.freezePlayer(this.jugador1));
        this.physics.add.overlap(this.barro, this.jugador2, () => this.barro.freezePlayer(this.jugador2));
    }

    update() {
        this.jugador1.update();
        this.jugador2.update();
    }

    onTimerComplete1() {
        console.log("¡El tiempo ha terminado!");

        // Detener la música actual antes de cambiar de escena
        if (this.musicMin2) {
            this.musicMin2.stop();
        }

        // Detener la escena UI2 y cambiar a la escena Victoria
        this.scene.stop("UI2");
        this.scene.start('Victoria2'); // Cambia a la escena Victoria
    }
}
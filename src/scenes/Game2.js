import { Scene } from "phaser"; 
import { crearParcelas } from '../entities/Grupoparcelas.js';
import { Jugador2 } from "../entities/Jugador2.js";
import { TimerComponentMiniJuego2 } from "../components/TimerComponentMiniJuego2.js";

export class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2' });
    }

    create() {
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

        // Inicializar el temporizador
        this.timer = new TimerComponentMiniJuego2(this, this.onTimerComplete.bind(this)); // Usar bind para asegurar el contexto
    }

    update() {
        this.jugador1.update();
        this.jugador2.update();
    }

    onTimerComplete() {
        console.log("¡El tiempo ha terminado!");
        this.scene.start('Victoria'); // Cambia a la escena Victoria
    }
}
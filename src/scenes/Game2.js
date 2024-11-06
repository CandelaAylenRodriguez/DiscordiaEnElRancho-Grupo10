import { Scene } from "phaser"; 
import { crearParcelas } from '../entities/Grupoparcelas.js';
import { Jugador2 } from "../entities/Jugador2.js";
import { PuntajeComponentMiniJuego2 } from "../components/PuntajeComponentMiniJuego2.js";
import { Barro } from "../entities/Barro.js"; 
import { Bomba } from "../entities/Bomba.js";
import { Multiplicador } from "../entities/Multiplicador.js";

export class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2' });
        this.barro = null; // Referencia para el barro
    }

    create() {
        // Detener todos los sonidos previos al comenzar esta escena
        this.sound.stopAll();
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('bombaexplota', { start: 0, end: 11 }), // Ajusta los valores de `start` y `end` según el número de fotogramas
            frameRate: 20, // Velocidad de la animación
            repeat: 0, // La animación solo se reproduce una vez
        });

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
        this.jugador1.canMove = true; // Inicializa canMove


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
        this.jugador2.canMove = true; // Inicializa canMove

        // Asegúrate de que el origen esté en el centro
        this.jugador2.setOrigin(0, 0.15);
        this.jugador2.posicionx = 15;
        this.jugador2.posiciony = 7;

        // Escuchar el evento 'fin' del temporizador
        this.events.removeAllListeners('fin');
        this.events.on('fin', () => {
            this.onTimerComplete1();
        });

        // Iniciar el temporizador para generar el barro cada x segundos
        this.time.addEvent({
            delay: 15000,
            callback: this.spawnBarro,
            callbackScope: this,
            loop: true
        });


        // Iniciar el temporizador para generar la bomba cada x segundos
        this.time.addEvent({
            delay: 20000,
            callback: this.spawnBomba,
            callbackScope: this,
            loop: true
        });

        // Iniciar el temporizador para generar el multiplicador cada x segundos
        this.time.addEvent({
            delay: 30000,
            callback: this.spawnMultiplicador,
            callbackScope: this,
            loop: true
        });

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
        this.physics.add.collider(this.barro, this.jugador1, () => this.barro.freezePlayer(this.jugador1));
        this.physics.add.collider(this.barro, this.jugador2, () => this.barro.freezePlayer(this.jugador2));
    }

spawnBomba() {
    // Elimina la bomba anterior si existe
    if (this.bomba) {
        this.bomba.destroy();
    }

    // Selecciona una parcela aleatoria para colocar el bomba
    const randomX = Phaser.Math.Between(0, this.parcelas.length - 1);
    const randomY = Phaser.Math.Between(0, this.parcelas[0].length - 1);
    const parcela = this.parcelas[randomX][randomY];

    // Crea una instancia de Bomba en el centro de la parcela aleatoria
    const bombaX = parcela.x + parcela.displayWidth / 2;
    const bombaY = parcela.y + parcela.displayHeight / 2;
    this.bomba = new Bomba(this, bombaX, bombaY);

    this.physics.add.collider(this.bomba, this.jugador1, () => this.bomba.detonar(this.jugador1));
    this.physics.add.collider(this.bomba, this.jugador2, () => this.bomba.detonar(this.jugador2));

}

spawnMultiplicador() {
    // Elimina el Multiplicador anterior si existe
    if (this.multiplicador) {
        this.multiplicador.destroy();
    }

    // Selecciona una parcela aleatoria para colocar el multiplicador
    const randomX = Phaser.Math.Between(0, this.parcelas.length - 1);
    const randomY = Phaser.Math.Between(0, this.parcelas[0].length - 1);
    const parcela = this.parcelas[randomX][randomY];

    // Crea una instancia de multiplicador en el centro de la parcela aleatoria
    const multiplicadorX = parcela.x + parcela.displayWidth / 2;
    const multiplicadorY = parcela.y + parcela.displayHeight / 2;
    this.multiplicador = new Multiplicador(this, multiplicadorX, multiplicadorY);


    this.physics.add.collider(this.multiplicador, this.jugador1, () => this.multiplicador.multiplicar(this.jugador1));
    this.physics.add.collider(this.multiplicador, this.jugador2, () => this.multiplicador.multiplicar(this.jugador2));

}

}
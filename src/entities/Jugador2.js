import { ControlJugador1 } from "../components/ControlJugador1"; // Asegúrate de importar el archivo correcto
import { ControlJugador2 } from "../components/ControlJugador2"; // Asegúrate de importar el archivo correcto

export class Jugador2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, texturaPintada, isJugador1 = false) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setScale(3);
        this.body.setSize(16, 16, true);

        // Inicializar posiciones en la matriz de parcelas
        this.posicionx = 0; // O la posición adecuada en la matriz
        this.posiciony = 0; // O la posición adecuada en la matriz

        // Guardar la textura que usará el jugador para pintar las parcelas
        this.texturaPintada = texturaPintada;

        // Iniciar controles
        if (isJugador1) {
            const wasdKeys = {
                W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
                D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            };
            this.movimiento = new ControlJugador1(scene, this, wasdKeys);
        } else {
            const cursors = scene.input.keyboard.createCursorKeys(); // Flechas para el jugador 2
            this.movimiento = new ControlJugador2(scene, this, cursors);
        }
    }

    update() {
        this.movimiento.update();
    }
}
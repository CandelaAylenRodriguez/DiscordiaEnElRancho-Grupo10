import { Scene } from "phaser";
import { getPhrase } from "../services/translations";

export class Victoria extends Scene {
    constructor() {
        super({ key: 'Victoria' });
    }

    create() { 
        // Detener todos los sonidos al iniciar la escena Victoria
        this.sound.stopAll();

        // Iniciar la música específica de la escena Victoria
        this.musicMin2V = this.sound.add('MusicMin2V', { loop: true });
        this.musicMin2V.play();

        // Configurar fondo y apariencia del texto
        this.cameras.main.setBackgroundColor(0x343434);
        this.add.image(960, 540, 'boton').setAlpha(0.5).setScale(2);

        this.add.text(960, 540, getPhrase('GANADOR'), {
            fontFamily: 'SuperBrain',
            fontSize: 64,
            color: '#343434',
            stroke: '#df8a34',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Volver al menú principal al hacer clic, y detener la música de Victoria
        this.input.once('pointerdown', () => {
            if (this.musicMin2V) {
                this.musicMin2V.stop();
            }
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.sound.stopAll();
            this.scene.start('MainMenu');
            });
        });
    }
}

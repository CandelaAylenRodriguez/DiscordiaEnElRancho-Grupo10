import { Scene } from 'phaser';
import { getPhrase } from '../services/translations';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x343434);

        this.add.image(960, 540, 'boton').setAlpha(0.5).setScale(2);
        // Detener todos los sonidos al iniciar la escena Victoria
        this.sound.stopAll();

        // Iniciar la música específica de la escena Victoria
        this.MusicaGameOver = this.sound.add('MusicGameOver', { loop: false });
        this.MusicaGameOver.play();

        this.add.text(960, 540, getPhrase('PERDIERON'), {
            fontFamily: 'SuperBrain',
            fontSize: 64,
            color: '#343434',
            stroke: '#df8a34',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Volver al menú principal al hacer clic, y detener la música de Victoria
        this.input.once('pointerdown', () => {
            if (this.MusicaGameOver) {
                this.MusicaGameOver.stop();
            }
            this.scene.start('MainMenu');
        });
    }
}

import { Scene } from 'phaser';
import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x343434);

        this.add.image(960, 540, 'boton').setAlpha(0.5).setScale(2);

        // Usa getPhrase para obtener el texto traducido
        this.add.text(960, 540, getPhrase('PERDIERON'), {
            fontFamily: 'SuperBrain',
            fontSize: 64,
            color: '#343434',
            stroke: '#df8a34',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

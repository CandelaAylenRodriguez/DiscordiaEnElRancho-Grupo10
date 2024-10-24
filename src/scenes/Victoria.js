import { Scene } from "phaser";
import { getPhrase } from "../services/translations";

export class Victoria extends Scene {
    constructor() {
        super({ key: 'Victoria' });
    }

    create() { this.cameras.main.setBackgroundColor(0x343434);

        this.add.image(960, 540, 'boton').setAlpha(0.5).setScale(2);

        this.add.text(960, 540, getPhrase('GANADOR'), {
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



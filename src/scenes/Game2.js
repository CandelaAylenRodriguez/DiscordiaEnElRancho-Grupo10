import { Scene } from "phaser";
export class Game2 extends Scene {
    constructor() {
      super("Game2");
    }

    create() {
        this.add.image(960, 540, "fondo");

        const menu = this.add.text(1000, 540, 'MENU', {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Hacer el texto interactivo
        menu.setInteractive();

        // Agregar un evento para cuando se presione el texto que lleva a la escena
        menu.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

    }


}
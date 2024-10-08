import { Scene } from 'phaser';

export class Idioma extends Scene {
    constructor() {
        super('Idioma');
    }

    
    create() {
        this.add.image(960, 540, 'fondosolo');
        

        const botonMenu = this.add.text(960, 900, 'ACEPTAR', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        botonMenu.setInteractive();



        // Cambiar a la escena MainMenu al hacer clic en el botón
        botonMenu.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
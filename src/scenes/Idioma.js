import { Scene } from 'phaser';

export class Idioma extends Scene
{
    constructor ()
    {
        super('Idioma');
    }

    preload ()
    {
        this.load.image("fondo", "./public/assets/fondo.png");
    }

    create ()
    {
        this.add.image(960, 540, 'fondo');

        const titulo = this.add.text(960, 150, 'IDIOMA', {
            fontFamily: 'Arial Black', fontSize: 80, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const botonMenu = this.add.text(960, 900, 'ACEPTAR', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        botonMenu.setInteractive();

        botonMenu.on('pointerdown', () => {
            this.scene.start('MainMenu'); // Cambiar a la escena MainMenu
        });
    }
}
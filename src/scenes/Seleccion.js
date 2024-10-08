import { Scene } from 'phaser';

export class Seleccion extends Scene
{
    constructor ()
    {
        super('Seleccion');
    }


    create() {

        this.add.image(960, 540, 'mainmenu');

        const juego1 = this.add.text(500, 540, 'MINIJUEGO 1', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Hacer el texto interactivo
        juego1.setInteractive();

        // Agregar un evento para cuando se presione el texto que lleva a la escena
        juego1.on('pointerdown', () => {
            this.scene.start('Game');
        });

        const juego2 = this.add.text(1300, 540, 'MINIJUEGO 2', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Hacer el texto interactivo
        juego2.setInteractive();

        // Agregar un evento para cuando se presione el texto que lleva a la escena
        juego2.on('pointerdown', () => {
            this.scene.start('Game2');
        });

    }

}

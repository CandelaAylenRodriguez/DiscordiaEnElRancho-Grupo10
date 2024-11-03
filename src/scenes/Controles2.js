import { Scene } from 'phaser';
import { getPhrase } from '../services/translations';

export class Controles2 extends Scene
{
    constructor ()
    {
        super('Controles2');
    }



    create ()
    {
        this.add.image(960, 540, 'mainmenu').setDepth(0);
        this.add.image(960, 540, 'controles').setDepth(1).setScale(0.8);
        this.add.text(630,560,getPhrase('ESPACIO'), {
            fontFamily: 'SuperBrain', fontSize: 30, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'}).setDepth(3);
            this.add.text(1500,560,getPhrase('INTRO'), {
                fontFamily: 'SuperBrain', fontSize: 30, color: '#343434',
                stroke: '#df8a34', strokeThickness: 8,
                align: 'center'}).setDepth(3);
        const volverBotonTexto = this.add.text(0, 0, getPhrase('JUGAR'), {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(2);

        const volverBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const volverBoton = this.add.container(960, 820, [volverBotonFondo, volverBotonTexto])
            .setDepth(3);

        volverBoton.setSize(volverBotonFondo.width, volverBotonFondo.height);
        volverBoton.setInteractive();

        // Agregar un evento para cuando se presione el botón "VOLVER"
        volverBoton.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.scene.start('Seleccion');
            });
        });
        volverBoton.on('pointerover', () => {
            volverBoton.setScale(1.2); 
        });
        volverBoton.on('pointerout', () => {
            volverBoton.setScale(1); // Vuelve al tamaño original
        });
    }
}

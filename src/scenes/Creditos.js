import { Scene } from 'phaser';
import { getPhrase } from '../services/translations'; 

export class Creditos extends Scene
{
    constructor ()
    {
        super('Creditos');
    }

    

    create ()
    {
        
        this.add.image(960, 540, 'mainmenu').setDepth(0);
        this.add.image(960, 560, 'creditos').setDepth(1).setScale(0.5);
        this.add.text(840,440,getPhrase('PROGRAMADORES'), {
            fontFamily: 'SuperBrain', fontSize: 22, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'}).setDepth(3);
            this.add.text(800,480,'Candela Rodriguez, Agustin Sala', {
                fontFamily: 'SuperBrain', fontSize: 14, color: '#343434',
                stroke: '#df8a34', strokeThickness: 8,
                align: 'center'}).setDepth(3);
            this.add.text(810,520,getPhrase('APARTADO ARTISTICO'), {
                fontFamily: 'SuperBrain', fontSize: 22, color: '#343434',
                stroke: '#df8a34', strokeThickness: 8,
                align: 'center'}).setDepth(3);
                this.add.text(880,560,'Dana Cristiani', {
                    fontFamily: 'SuperBrain', fontSize: 14, color: '#343434',
                    stroke: '#df8a34', strokeThickness: 8,
                    align: 'center'}).setDepth(3);
                this.add.text(800,600,getPhrase('MUSICA, SFX Y EXTRAS'), {
                    fontFamily: 'SuperBrain', fontSize: 22, color: '#343434',
                    stroke: '#df8a34', strokeThickness: 8,
                    align: 'center'}).setDepth(3);
                    this.add.text(880,640,'Lautaro Rosales', {
                        fontFamily: 'SuperBrain', fontSize: 14, color: '#343434',
                        stroke: '#df8a34', strokeThickness: 8,
                        align: 'center'}).setDepth(3);
          // Crear botón "VOLVER" con fondo e interactividad
          const volverBotonTexto = this.add.text(0, 0, getPhrase('VOLVER'), {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const volverBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const volverBoton = this.add.container(960, 820, [volverBotonFondo, volverBotonTexto])
            .setDepth(3);

        volverBoton.setSize(volverBotonFondo.width, volverBotonFondo.height);
        volverBoton.setInteractive();

        // Agregar un evento para cuando se presione el botón "VOLVER"
        volverBoton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
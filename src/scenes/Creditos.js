import { Scene } from 'phaser';

export class Creditos extends Scene
{
    constructor ()
    {
        super('Creditos');
    }

    

    create ()
    {
        
        this.add.image(960, 540, 'mainmenu');

          // Crear botón "VOLVER" con fondo e interactividad
          const volverBotonTexto = this.add.text(0, 0, 'VOLVER', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
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
import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta
import { Scene } from 'phaser';

export class Seleccion extends Scene {
    constructor() {
        super('Seleccion');
    }

    create() {
        // Añadir la imagen de fondo
        this.add.image(960, 540, 'mainmenu');

        // Crear botón "MINIJUEGO 1" con fondo e interactividad
        const minijuego1BotonTexto = this.add.text(0, 0, getPhrase('MINIJUEGO 1'), {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const minijuego1BotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const minijuego1Boton = this.add.container(600, 540, [minijuego1BotonFondo, minijuego1BotonTexto])
            .setDepth(3);

        minijuego1Boton.setSize(minijuego1BotonFondo.width, minijuego1BotonFondo.height);
        minijuego1Boton.setInteractive();

        // Agregar un evento para cuando se presione el botón
        minijuego1Boton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        // Crear botón "MINIJUEGO 2" con fondo e interactividad
        const minijuego2BotonTexto = this.add.text(0, 0, getPhrase('MINIJUEGO 2'), {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const minijuego2BotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const minijuego2Boton = this.add.container(1300, 540, [minijuego2BotonFondo, minijuego2BotonTexto])
            .setDepth(3);

        minijuego2Boton.setSize(minijuego2BotonFondo.width, minijuego2BotonFondo.height);
        minijuego2Boton.setInteractive();

        // Agregar un evento para cuando se presione el botón
        minijuego2Boton.on('pointerdown', () => {
            this.scene.start('Game2');
        });

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
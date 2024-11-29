import { Scene } from 'phaser';
import { getTranslations } from '../services/translations';
export class Idioma extends Scene {
    constructor() {
        super('Idioma');
    }

    create() {
        // Fondo de la escena
        this.add.image(960, 540, 'fondosolo');
        
        // Agregar la imagen del botón español
        const botonEspañol = this.add.image(550, 450, 'espanol').setOrigin(0.5);
        botonEspañol.setInteractive();

        // Cambiar a la escena MainMenu y cargar las traducciones en español
        botonEspañol.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproducir sonido 'Boton'
            getTranslations('es-AR', () => {
                this.time.delayedCall(100, () => {
                    this.scene.start('MainMenu');
                });
            });
        });
        botonEspañol.on('pointerover', () => {
            botonEspañol.setScale(1.2); 
        });
        botonEspañol.on('pointerout', () => {
            botonEspañol.setScale(1); // Vuelve al tamaño original
        });

        // Agregar la imagen del botón inglés en la posición (1350, 450)
        const botonIngles = this.add.image(1350, 450, 'ingles').setOrigin(0.5);
        botonIngles.setInteractive();

        // Cambiar a la escena MainMenu y cargar las traducciones en inglés
        botonIngles.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproducir sonido 'Boton'
            getTranslations('en-US', () => {
                this.time.delayedCall(100, () => {
                    this.scene.start('MainMenu');
                });
            });
        });
        botonIngles.on('pointerover', () => {
            botonIngles.setScale(1.2); 
        });
        botonIngles.on('pointerout', () => {
            botonIngles.setScale(1); // Vuelve al tamaño original
        });
    }
}
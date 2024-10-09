import { Scene } from 'phaser';

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
        
            // Cambiar a la escena MainMenu al hacer clic en la imagen de la bandera española
            botonEspañol.on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
        
            // Agregar la imagen del botón inglés en la posición (1000, 500)
            const botonIngles = this.add.image(1350, 450, 'ingles').setOrigin(0.5); // Duplicado de la imagen española
            botonIngles.setInteractive();
        
            // Cambiar a la escena MainMenu al hacer clic en la imagen de la bandera inglesa
            botonIngles.on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
        }
}
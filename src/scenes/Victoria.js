import { Scene } from "phaser";
import { getPhrase } from "../services/translations";

export class Victoria extends Scene {
    constructor() {
        super({ key: 'Victoria' });
    }

    create() { 
        // Detener todos los sonidos al iniciar la escena Victoria
        this.sound.stopAll();
        
        this.add.image(960, 540, 'victoria');

        this.add.image(960, 140, 'cartel').setScale(1.3);

        this.musicMin2V = this.sound.add('MusicMin2V', { loop: true });
        this.musicMin2V.play();

        // Configurar fondo y apariencia del texto
        this.add.text(960, 180, getPhrase('GANADOR'), {
            fontFamily: 'SuperBrain',
            fontSize: 80,
            color: '#343434',
            stroke: '#df8a34',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

          // Crear botón "VOLVER" con fondo e interactividad
          const volverBotonTexto = this.add.text(0, 0, getPhrase('VOLVER'), {
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        const volverBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const volverBoton = this.add.container(960, 920, [volverBotonFondo, volverBotonTexto])
            .setDepth(3);

        volverBoton.setSize(volverBotonFondo.width, volverBotonFondo.height);
        volverBoton.setInteractive();

        // Agregar un evento para cuando se presione el botón "VOLVER"
        volverBoton.on('pointerdown', () => {
            if (this.MusicaGameOver) {
                this.MusicaGameOver.stop();
            }this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.sound.stopAll();
            this.scene.start('MainMenu');
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

import { Scene } from 'phaser';
import { getPhrase } from '../services/translations';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        //this.cameras.main.setBackgroundColor(0x343434);
        this.add.image(960, 540, 'fondo1');

        this.add.image(960, 140, 'cartel').setScale(1.3);
        this.sound.stopAll();

        // Iniciar la música específica de la escena Victoria
        this.MusicaGameOver = this.sound.add('MusicGameOver', { loop: false });
        this.MusicaGameOver.play();

        this.add.text(960, 180, getPhrase('PERDIERON'), {
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

        this.jefe = this.add.sprite(960, 540, 'jefe');
        this.CreaAnimaciones("jefe","1",0,7,10,-1);
        this.jefe.play("jefe1");

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
    CreaAnimaciones(key,clave, startframe,endframe,rate, repet) { ///metodo para crear las animaciones
        this.anims.create({
          key: key+ clave,  // key del sritesheep + la clave de animacion para diferenciar entre los jugadores
          frames: this.anims.generateFrameNumbers(key, { start: startframe, end: endframe }),  // Rango de frames a usar
          frameRate: rate,  // Velocidad de la animación (frames por segundo)
          repeat: repet  // Repetir indefinidamente
          });
      }
}

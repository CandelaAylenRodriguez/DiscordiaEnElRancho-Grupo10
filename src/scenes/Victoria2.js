import { Scene } from "phaser";
import { getPhrase } from "../services/translations";

export class Victoria2 extends Scene {
    constructor() {
        super({ key: 'Victoria2' });
    }

    create() { 
        // Detener todos los sonidos al iniciar la escena Victoria
        this.sound.stopAll();
        
        this.add.image(960, 540, 'fondo1');

        this.add.image(960, 140, 'cartel').setScale(1.3);
        // Iniciar la música específica de la escena Victoria
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
        
        const puntaje1Guardado = parseInt(localStorage.getItem('puntaje1'), 10);
        const puntaje2Guardado = parseInt(localStorage.getItem('puntaje2'), 10);

        if (puntaje1Guardado>puntaje2Guardado){
            this.ganador=this.add.sprite(960,540,"jugador1").setScale(2);
            this.CreaAnimaciones("jugador1","1",32,39,10,-1);
            this.ganador.play("jugador11");
            this.puntajeText1 = this.add.text(960, 700, `${getPhrase('PUNTAJE')} : ${puntaje1Guardado}`, {
                fontFamily: 'SuperBrain',
                fontSize: 36,
                color: '#343434',
                stroke: '#df8a08',
                strokeThickness: 8,
              });
              this.puntajeText1.setOrigin(0.5);
        } else if (puntaje1Guardado<puntaje2Guardado){
            this.ganador=this.add.sprite(960,540,"jugador2").setScale(2);
            this.CreaAnimaciones("jugador2","1",32,39,10,-1);
            this.ganador.play("jugador21");
            this.puntajeText2 = this.add.text(960, 700, `${getPhrase('PUNTAJE')} : ${puntaje2Guardado}`, {
                fontFamily: 'SuperBrain',
                fontSize: 36,
                color: '#343434',
                stroke: '#df8a08',
                strokeThickness: 8,
              });
              this.puntajeText2.setOrigin(0.5);
        }else if (puntaje1Guardado==puntaje2Guardado){
            this.ganador1=this.add.sprite(760,540,"jugador1").setScale(2);
            this.CreaAnimaciones("jugador1","1",32,39,10,-1);
            this.ganador1.play("jugador11");
            this.puntajeText1 = this.add.text(760, 700, `${getPhrase('PUNTAJE')} : ${puntaje1Guardado}`, {
                fontFamily: 'SuperBrain',
                fontSize: 36,
                color: '#343434',
                stroke: '#df8a08',
                strokeThickness: 8,
              });
              this.puntajeText1.setOrigin(0.5);
              this.ganador2=this.add.sprite(1160,540,"jugador2").setScale(2);
              this.CreaAnimaciones("jugador2","1",32,39,10,-1);
              this.ganador2.play("jugador21");
              this.puntajeText2 = this.add.text(1160, 700, `${getPhrase('PUNTAJE')} : ${puntaje2Guardado}`, {
                  fontFamily: 'SuperBrain',
                  fontSize: 36,
                  color: '#343434',
                  stroke: '#df8a08',
                  strokeThickness: 8,
                });
                this.puntajeText2.setOrigin(0.5);
        }
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
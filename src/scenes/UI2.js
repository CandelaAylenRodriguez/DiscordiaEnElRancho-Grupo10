import { Scene } from 'phaser';
import { TimerComponentMiniJuego2 } from "../components/TimerComponentMiniJuego2.js";
import { PuntajeComponentMiniJuego2 } from '../components/PuntajeComponentMiniJuego2.js';
import { getPhrase } from '../services/translations.js';
export class UI2 extends Scene
{
    constructor ()
    {
        super('UI2');
    }

    create(data) {
        // Usa el evento pasado en lugar de this.events
        this.events = data.events;
       
         // Inicializar el temporizador
         this.timer = new TimerComponentMiniJuego2(this, this.onTimerComplete.bind(this));

         this.puntajeComponent = new PuntajeComponentMiniJuego2(this);

         const volverBotonTexto = this.add.text(0, 0, getPhrase('VOLVER'), {
            fontFamily: 'SuperBrain', fontSize: 26, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const volverBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5).setScale(0.8);
        const volverBoton = this.add.container(150, 1020, [volverBotonFondo, volverBotonTexto])
            .setDepth(3);

        volverBoton.setSize(volverBotonFondo.width, volverBotonFondo.height);
        volverBoton.setInteractive();

        // Agregar un evento para cuando se presione el botón "VOLVER"
        volverBoton.on('pointerdown', () => {
            this.scene.stop("Game2")
            this.scene.start('MainMenu');
        });
        volverBoton.on('pointerover', () => {
            volverBoton.setScale(1.2); 
        });
        volverBoton.on('pointerout', () => {
            volverBoton.setScale(1); // Vuelve al tamaño original
        });
        }

        update(){
            this.puntajeComponent.update();
        }

        onTimerComplete() {
            this.events.emit("fin","termino")
            console.log("termino el tiempo y se envio");
        }
        
    }

   
  
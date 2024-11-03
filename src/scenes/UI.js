import { Scene } from 'phaser';
import { PuntajeComponent } from '../components/PuntajeComponent';
import { TimerComponent } from '../components/TimerComponent';
import { Vidamuro } from '../entities/Vidamuro';
import { nivelComponent } from '../components/NivelComponent';
import { NivelPantalla } from '../components/NivelPantalla';
import { getPhrase } from '../services/translations';
export class UI extends Scene
{
    constructor ()
    {
        super('UI');
    }

    create(data) {
        // Usa el evento pasado en lugar de this.events
        this.events = data.events;
        this.nivelVisual= new NivelPantalla(this);
        const puntajeGuardado = this.registry.get('puntaje'); // Obtener el puntaje guardado del registro
        this.puntajeComponent = new PuntajeComponent(this, puntajeGuardado);
        this.nivelUI= new nivelComponent(this);
        this.lvl=this.nivelUI.nivelActual;
        
        if (this.nivelUI.nivelActual<5){
            this.timer = new TimerComponent(this, () => {
                this.nivelUI.aumentarNivel();
                this.events.emit("pasarnivel", "pasodenivel")
            });
        } 
        

        this.vida = 600; // Reinicia la vida al pasar de nivel o perder
        this.barraVida = new Vidamuro(this, 960, 1000, this.vida, 50, 0x7fff00); // Crea la barra de vida
        this.events.on('vida', (mensaje) => {
            console.log(mensaje);
            this.vida= mensaje;
            this.barraVida.actualizaBarra(); // Supón que tienes un método `setVida` en Vidamuro
           
        });
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
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.scene.stop("Game")
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

    retvl(){
        return this.lvl
    }
}  
          

   
     
    

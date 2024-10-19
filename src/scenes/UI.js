import { Scene } from 'phaser';
import { PuntajeComponent } from '../components/PuntajeComponent';
import { TimerComponent } from '../components/TimerComponent';
import { Vidamuro } from '../entities/Vidamuro';
import { nivelComponent } from '../components/NivelComponent';
import { NivelPantalla } from '../components/NivelPantalla';

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
        this.timer = new TimerComponent(this, () => {
            this.nivelUI.aumentarNivel();
            this.events.emit("pasarnivel", "pasodenivel")
          });

        this.vida = 600; // Reinicia la vida al pasar de nivel o perder
        this.barraVida = new Vidamuro(this, 960, 1000, this.vida, 50, 0x7fff00); // Crea la barra de vida
        this.events.on('vida', (mensaje) => {
            console.log(mensaje);
            this.vida= mensaje;
            this.barraVida.actualizaBarra(); // Supón que tienes un método `setVida` en Vidamuro
           
        });
    }
}  
          

   
     
    

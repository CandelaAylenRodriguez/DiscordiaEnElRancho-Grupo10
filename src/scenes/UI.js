import { Scene } from 'phaser';
import { PuntajeComponent } from '../components/PuntajeComponent';
import { TimerComponent } from '../components/TimerComponent';
import { Vidamuro } from '../entities/Vidamuro';

export class UI extends Scene
{
    constructor ()
    {
        super('UI');
    }

    create(data) {
        // Usa el evento pasado en lugar de this.events
        this.events = data.events;
        const puntajeGuardado = this.registry.get('puntaje'); // Obtener el puntaje guardado del registro
        this.puntajeComponent = new PuntajeComponent(this, puntajeGuardado);

        this.nivelActual = parseInt(localStorage.getItem('nivel')) || 1; ///recupero el valor almacenado en el localStorage, sino tiene valor le da uno
        console.log("nivel desde ui"+this.nivelActual)
        this.timer = new TimerComponent(this, () => {
            this.nivelActual= this.nivelActual+1 ///le sumo 
            localStorage.setItem('nivel', this.nivelActual.toString());/// lo guardo en el local storage
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
          

   
     
    

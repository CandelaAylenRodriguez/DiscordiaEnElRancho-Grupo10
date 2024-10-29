import { getPhrase } from '../services/translations';

export class PuntajeComponentMiniJuego2 {
  constructor(scene) {
    this.scene = scene;
    this.puntajeJugador1 = 0;
    this.puntajeJugador2 = 0;
    this.refreshPuntaje()
  }

refreshPuntaje(){
  this.puntajeText1 = this.scene.add.text(1520, 40, `${getPhrase('PUNTAJE')} 1: ${this.puntajeJugador1}`, {
    fontFamily: 'SuperBrain',
    fontSize: 36,
    color: '#343434',
    stroke: '#df8a44', // Color de borde para el jugador 1
    strokeThickness: 8,
  });

  this.puntajeText2 = this.scene.add.text(1520, 80, `${getPhrase('PUNTAJE')} 2: ${this.puntajeJugador2}`, {
    fontFamily: 'SuperBrain',
    fontSize: 36,
    color: '#343434',
    stroke: '#df8a08', // Color de borde para el jugador 2
    strokeThickness: 8,
  });
}


  update(parcelas) {
    this.puntajeJugador1 = 0;
    this.puntajeJugador2 = 0;
    parcelas.forEach(fila => {
      fila.forEach(element =>  {
        if (element.texture.key === 'textura1')
        {
          this.puntajeJugador1++
        }
        if (element.texture.key === 'textura2')
          {
            this.puntajeJugador2++
          }

      }
      )
    }); 
    this.refreshPuntaje()

  }
}
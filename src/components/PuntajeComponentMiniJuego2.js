import { getPhrase } from '../services/translations';

export class PuntajeComponentMiniJuego2 {
  constructor(scene) {
    this.scene = scene;
    this.puntajeJugador1 = 0;
    this.puntajeJugador2 = 0;
    this.gameScene = this.scene.scene.get('Game2');

    this.cartel1 = this.scene.add.image(250,40,"cartel").setScale(0.66, 0.55);
    this.cartel2 = this.scene.add.image(1670,40,"cartel").setScale(0.66, 0.55);
    this.p1 = this.scene.add.image(90,62,"p1").setScale(0.8);
    this.p2 = this.scene.add.image(1498,62,"p2").setScale(0.8);

    this.puntajeText1 = this.scene.add.text(108, 58, `${getPhrase('PUNTAJE')} 1: ${this.puntajeJugador1}`, {
      fontFamily: 'SuperBrain',
      fontSize: 36,
      color: '#343434',
      stroke: '#df8a44', // Color de borde para el jugador 1
      strokeThickness: 8,
    });
    this.puntajeText1.setOrigin(0,0.5);

    this.puntajeText2 = this.scene.add.text(1520, 58, `${getPhrase('PUNTAJE')} 2: ${this.puntajeJugador2}`, {
      fontFamily: 'SuperBrain',
      fontSize: 36,
      color: '#343434',
      stroke: '#df8a08', // Color de borde para el jugador 2
      strokeThickness: 8,
    });
    this.puntajeText2.setOrigin(0,0.5);

    this.refreshPuntaje()
  }

refreshPuntaje(){
  this.puntajeText1.setText(`${getPhrase('PUNTAJE')}: ${this.puntajeJugador1}`); 
  this.puntajeText2.setText(`${getPhrase('PUNTAJE')}: ${this.puntajeJugador2}`); // Actualiza el texto mostrado con la traducción
}


  update(parcelas) {
    this.puntajeJugador1 = 0;
    this.puntajeJugador2 = 0;
    this.gameScene.parcelas.forEach(fila => {
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
  guardaPuntaje(){
    localStorage.setItem('puntaje1', this.puntajeJugador1.toString());
    localStorage.setItem('puntaje2', this.puntajeJugador2.toString());
  }
}
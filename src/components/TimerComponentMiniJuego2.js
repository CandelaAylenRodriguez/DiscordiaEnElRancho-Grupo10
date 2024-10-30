import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class TimerComponentMiniJuego2 {
  constructor(scene, onComplete) {
    this.scene = scene;
    this.currentTime = 60; // Tiempo fijo de 1 minuto
    this.onComplete = onComplete; // Función a ejecutar cuando llegue a 0

    this.cartel = this.scene.add.image(960,40,"cartel").setScale(0.55, 0.55);
    
    this.timerText = this.scene.add.text(960, 58, `${getPhrase('TIEMPO')} ${this.formatTime(this.currentTime)}`, {
      fontFamily: 'SuperBrain', 
      fontSize: 36, 
      color: '#343434',
      stroke: '#df8a34', 
      strokeThickness: 8,
    });
    this.timerText.setOrigin(0.5,0.5);

    this.timerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
  }

  updateTimer() {
    this.currentTime--; // Decrementar el tiempo actual
    this.timerText.setText(`${getPhrase('TIEMPO')} ${this.formatTime(this.currentTime)}`);

    if (this.currentTime <= 0) {
      this.timerEvent.remove();
      if (this.onComplete) { // Asegúrate de que onComplete es una función
        this.onComplete(); // Llamar a la función cuando se complete el tiempo
      }
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const partInSeconds = seconds % 60;
    return `${minutes}:${partInSeconds.toString().padStart(2, '0')}`;
  }
}
import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class TimerComponent {
  constructor(scene, onComplete) {
    this.scene = scene;
    this.initialTime =  60// Tiempo inicial en segundos
    this.previousTime = this.scene.registry.get('timer'); // Obtener el tiempo anterior del registro
    const uiScene = this.scene.scene.get('UI');  // Acceder a la escena 'UI'

    this.cartel = this.scene.add.image(260,30,"cartel").setScale(0.55, 0.55);

    // Si no existe, inicializa en 120, de lo contrario, suma 30
    if (this.previousTime === undefined) {
      this.currentTime = this.initialTime; // Establecer en 60 en la primera vez
    }else if (uiScene.nivelUI.nivelActual== 1){
      this.currentTime= this.initialTime;
    }
    else {
      this.currentTime = this.previousTime+15; // Sumar 15 en los reinicios
      console.log("tiempoentro")
    }

    // Guardar el nuevo tiempo en el registro
    this.scene.registry.set('timer', this.currentTime);

    this.onComplete = onComplete; // Función a ejecutar cuando llegue a 0
    this.timerText = this.scene.add.text(130, 18, `${getPhrase('TIEMPO')} ${this.formatTime(this.currentTime)}`, {
      fontFamily: 'SuperBrain', 
      fontSize: 36, 
      color: '#343434',
      stroke: '#df8a34', 
      strokeThickness: 8,
    });

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
      if (this.onComplete) {
        this.onComplete(); // Llamar a la función cuando se complete el tiempo
      }
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const partInSeconds = seconds % 60;
    return `${minutes}:${partInSeconds.toString().padStart(2, '0')}`;
  }
 /* resetearTiempo(newTime = this.initialTime) {
    this.currentTime = newTime; // Reiniciar el tiempo al valor especificado o 60
    this.timerText.setText(`${getPhrase('TIEMPO')} ${this.formatTime(this.currentTime)}`);
    this.scene.registry.set('timer', this.currentTime); // Actualiza el valor en el registro
  }*/

}
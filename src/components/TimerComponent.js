export class TimerComponent {
  constructor(scene, onComplete) {
    this.scene = scene;
    this.initialTime = 120; // Tiempo inicial en segundos
    this.previousTime = this.scene.registry.get('timer'); // Obtener el tiempo anterior del registro

    // Si no existe, inicializa en 120, de lo contrario, suma 30
    if (this.previousTime === undefined) {
      this.currentTime = this.initialTime; // Establecer en 120 en la primera vez
    } else {
      this.currentTime = this.previousTime + 30; // Sumar 30 en los reinicios
    }

    // Guardar el nuevo tiempo en el registro
    this.scene.registry.set('timer', this.currentTime);

    this.onComplete = onComplete; // Función a ejecutar cuando llegue a 0
    this.timerText = this.scene.add.text(16, 16, `Tiempo ${this.formatTime(this.currentTime)}`, {
      fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
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
    this.timerText.setText(`Tiempo ${this.formatTime(this.currentTime)}`);

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
}
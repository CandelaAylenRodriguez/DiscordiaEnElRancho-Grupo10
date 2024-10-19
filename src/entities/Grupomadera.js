import { Madera } from "./Madera";
export class Grupomadera extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.scene.time.addEvent({// Establecer un temporizador para generar madera cada 20 segundos
        delay: 20000, // 20segundos
        callback: this.generarMadera,
        callbackScope: this,
        loop: true // Repite el evento
    });
  }
  generarMadera() {
      const x = Phaser.Math.Between(0, this.scene.cameras.main.width); // Ajusta según tus límites
      const y = Phaser.Math.Between(0, this.scene.cameras.main.height); // Ajusta según tus límites
      const madera = new Madera(this.scene, x, y); // Generar madera en una posición aleatoria
      this.add(madera); // Añadir al grupo de maderas
  }

  }
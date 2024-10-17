export class Vidamuro extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
      super(scene, x, y, width, height, color);
      scene.add.existing(this);
      this.maxVida = 600; // Establece la vida máxima del muro
      this.originalWidth = width; // Guarda el ancho original de la barra
      this.originalHeight = height; // Guarda la altura original de la barra
  }

  actualizaBarra() {
    this.width = (this.scene.muro.vida / this.scene.muro.vidaMaxima) * this.originalWidth;

    // Asegúrate de que la altura se mantenga constante
    this.height = this.originalHeight;

    //console.log(`Actualizando barra: Vida actual ${this.scene.muro.vida}, Ancho de barra ${this.width}`);

    // Asegúrate de que la barra sea visible si tiene vida
    //this.visible = this.scene.muro.vida > 0;
}
}
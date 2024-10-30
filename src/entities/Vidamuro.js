export class Vidamuro extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
      super(scene, x, y, width, height, color);
      scene.add.existing(this);
      this.originalWidth = width; // Guarda el ancho original de la barra
      this.originalHeight = height; // Guarda la altura original de la barra
      this.barraImage = this.scene.add.image(933, 1000, "barravida").setScale(1, 0.8);
      this.uiScene = this.scene.scene.get('UI');  // Acceder a la escena 'UI'
  }

  actualizaBarra() {
    this.width = (this.uiScene.vida / 600) * this.originalWidth;

    // Asegúrate de que la altura se mantenga constante
    this.height = this.originalHeight;
}
}
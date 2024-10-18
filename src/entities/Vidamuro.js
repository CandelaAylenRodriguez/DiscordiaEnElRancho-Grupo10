export class Vidamuro extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
      super(scene, x, y, width, height, color);
      scene.add.existing(this);
      this.originalWidth = width; // Guarda el ancho original de la barra
      this.originalHeight = height; // Guarda la altura original de la barra
      this.barraImage = this.scene.add.image(980, 1000, "barravida").setScale(0.7, 0.4);
      this.arco = this.scene.add.arc(620, 1000, 60, 360, 1, 1, 0xdaba0a, 1);
      this.icon= this.scene.add.image(620,1000,"muro").setScale(0.2)
      this.uiScene = this.scene.scene.get('UI');  // Acceder a la escena 'UI'
  }

  actualizaBarra() {
    this.width = (this.uiScene.vida / 600) * this.originalWidth;

    // Asegúrate de que la altura se mantenga constante
    this.height = this.originalHeight;
}
}
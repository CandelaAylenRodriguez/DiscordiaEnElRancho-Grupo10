export class Muro extends Phaser.GameObjects.Image {
  constructor(scene, x, y, vidaMaxima) {
    super(scene, x, y, "muro");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.5);
    this.body.setImmovable(true);
    this.body.setSize(470, 470, true);
    this.vidaMaxima = vidaMaxima; // Guarda el valor máximo de vida
    this.vida = vidaMaxima; // Inicializa la vida con el máximo
    this.barraVida = null; // Inicializa la barra de vida como null
  }

  update() {}

  setBarraVida(barraVida) {
    this.barraVida = barraVida; // Método para establecer la referencia de la barra de vida
  }

  restaVida() {
    this.vida -= 60; // Descuenta 60 de la vida
    //console.log(`Vida del muro reducida a: ${this.vida}`);
    this.scene.barraVida.actualizaBarra(); // Actualiza la barra de vida

    if (this.vida <= 0) {
      this.vida = 0; // Asegúrate de que la vida no sea negativa
      //this.barraVida.visible = false; // Oculta la barra de vida
      this.setVisible(false); // Vuelve invisible el muro
      this.body.checkCollision.none = true; // Desactiva las colisiones del muro
    }
  }

  sumaVida() {
    if (this.vida > 0 || !this.visible) { // Solo suma vida si el muro está invisible o tiene vida
      this.vida += 120; // O la cantidad que desees
      if (this.vida > this.vidaMaxima) {
        this.vida = this.vidaMaxima; // Asegúrate de no sobrepasar la vida máxima
      }
      this.scene.barraVida.actualizaBarra(); // Actualiza la barra de vida

      if (!this.visible) {
        this.setVisible(true); // Vuelve visible el muro
       // this.barraVida.visible = true; // Vuelve visible la barra de vida
        this.body.checkCollision.none = false; // Reactiva las colisiones del muro
      }
    }
  }
}
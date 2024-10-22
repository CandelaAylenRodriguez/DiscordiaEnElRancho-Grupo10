export class Parcela extends Phaser.GameObjects.Sprite {
    constructor(scene, textura, x, y, fila, columna, tamanoParcela) {
        super(scene, x, y, textura);
        this.setOrigin(0);
        this.posicionx = columna;
        this.posiciony = fila;

        scene.add.existing(this);

        // Aseguramos que la parcela tenga el tamaño correcto
        this.setDisplaySize(tamanoParcela, tamanoParcela);
    }

    pintar(nuevaTextura) {
        this.setTexture(nuevaTextura);
    }
}
export class Madera extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'maderitas'); // Usa la imagen maderitas
        this.scene = scene;

        // Agregar el objeto a la escena y habilitar físicas.
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Configura la escala a la mitad
        this.setScale(0.5); // Cambia la escala del sprite a la mitad

        // Configuración para que la madera aparezca en una posición aleatoria.
        this.setRandomPosition();
        
        this.scene.tweens.add({
            targets: this, 
            scaleX: 0.7, 
            scaleY: 0.7,
            duration: 700, // Duración del escalado
            yoyo: true, // Volver a la escala original
            repeat: -1, // Repetir indefinidamente
            ease: 'Sine.easeInOut' // Tipo de easing
        });
    }

    setRandomPosition() {
        // Colocar la madera en una posición aleatoria dentro del tamaño del mundo.
        const { width, height } = this.scene.cameras.main;
        const randomX = Phaser.Math.Between(100, width-100);
        const randomY = Phaser.Math.Between(100, height-100);
        this.setPosition(randomX, randomY);
    }

    recolectar(jugador) {
        // Aumentar la vida en 120 y destruir la madera.
        jugador.vida += 120;
        this.destroy();
    }
}
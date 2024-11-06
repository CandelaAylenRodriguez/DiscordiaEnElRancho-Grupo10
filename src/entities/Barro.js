export class Barro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Inicializa el sprite con la textura 'barro'
        super(scene, x, y, 'barro');

        // Asocia la escena
        this.scene = scene;

        // Agrega el sprite a la escena y habilita la física para él
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Ajusta propiedades
        this.setScale(1);
        this.setDepth(2);

        // Configura el área de colisión de la entidad
        this.body.setSize(80, 30, true);

    }
    freezePlayer(jugador) {
        // Almacena el tinte original del jugador
        const originalTint = jugador.tint;
    
        // Paraliza al jugador
        jugador.canMove = false;
        jugador.setTint(0x8B4513); // Tinte marrón oscuro
    
        // Destruye el barro después de 5 segundos
        this.scene.time.delayedCall(5000, () => {
            jugador.canMove = true; // Descongela al jugador
            jugador.clearTint(); // Elimina el tinte para volver a su color original
            this.destroy(); // Destruye el barro
        });
    }
}
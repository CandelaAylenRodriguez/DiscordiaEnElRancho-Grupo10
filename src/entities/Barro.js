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

        // Aplica el color marrón al sprite
        this.setTint(0x8B4513);
    }

    // Puedes agregar métodos adicionales aquí si la entidad necesita alguna lógica específica
    freezePlayer(player) {
        // Método para paralizar al jugador por 5 segundos
        player.canMove = false;
        this.scene.time.delayedCall(5000, () => {
            player.canMove = true;
        });
    }
}
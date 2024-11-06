export class Multiplicador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Arreglo de sprites posibles
        const sprites = ['x1', 'x2', 'x3'];

        // Selecciona un sprite aleatoriamente del arreglo
        const randomSprite = Phaser.Utils.Array.GetRandom(sprites);

        // Llama al constructor de la clase Phaser.Physics.Arcade.Sprite con el sprite seleccionado
        super(scene, x, y, randomSprite);

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
}
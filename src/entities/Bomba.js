export class Bomba extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bomba');

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

    detonar(jugador) {
        // Obtener la posición actual del jugador en la matriz de parcelas
        const { posicionx, posiciony, texturaPintada } = jugador;
        const parcelas = this.scene.parcelas;
    
        // Pintar parcelas adyacentes si están dentro de los límites
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const x = posicionx + dx;
                const y = posiciony + dy;
                if (x >= 0 && x < parcelas[0].length && y >= 0 && y < parcelas.length) {
                    parcelas[y][x].pintar(texturaPintada);
                }
            }
        }
    
        // Crear el sprite de explosión en la misma posición que la bomba
        const explosion = this.scene.physics.add.sprite(this.x, this.y, 'bombaexplota');
    
        // Reproducir la animación de la explosión
        explosion.anims.play('explosion', true);
    
        // Destruir la bomba
        this.destroy(); // Destruir la bomba tras explotar
    
        // Destruir el sprite de explosión después de que termine la animación
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });
    }}
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

    multiplicar(jugador) {
        // Obtener la posición actual del jugador en la matriz de parcelas
        const { posicionx, posiciony, texturaPintada } = jugador;
        const parcelas = this.scene.parcelas;

        // Definir el número de filas a pintar según el sprite seleccionado
        let filasADibujar = 1;
        let filasAdyacentes = [0]; // Array que contendrá las filas a pintar, comenzando con la fila del jugador

        if (this.texture.key === 'x2') {
            // Si es x2, pintamos la fila del jugador y una fila adyacente (superior o inferior)
            filasADibujar = 2;
            filasAdyacentes = [0, 1]; // Pintamos la fila del jugador y una fila superior o inferior
        } else if (this.texture.key === 'x3') {
            // Si es x3, pintamos la fila del jugador y las dos filas adyacentes (superior e inferior)
            filasADibujar = 3;
            filasAdyacentes = [-1, 0, 1]; // Pintamos la fila del jugador y las dos filas adyacentes
        }

        // Pintar las filas alrededor del jugador
        for (let dy of filasAdyacentes) {
            const y = posiciony + dy;

            // Verificar que las coordenadas están dentro de los límites
            if (y >= 0 && y < parcelas.length) {
                // Pintar toda la fila en la posición 'y'
                for (let x = 0; x < parcelas[y].length; x++) {
                    parcelas[y][x].pintar(texturaPintada);
                }
            }
        }

        // Destruir multiplicador
        this.destroy(); 
    }
}
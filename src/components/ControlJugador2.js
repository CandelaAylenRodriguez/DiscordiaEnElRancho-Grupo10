export class ControlJugador2 {
    constructor(scene, jugador, cursors, returnKey) {
        this.scene = scene;
        this.jugador = jugador;
        this.cursors = cursors;
        this.returnKey = returnKey; // Tecla de acción (Return)

        this.keyPressed = false; // Estado para evitar movimientos continuos
    }

    update() {
        let nuevaPosicion = { x: this.jugador.posicionx, y: this.jugador.posiciony };

        if (!this.keyPressed) {
            // Movimiento con las flechas (jugador 2)
            if (this.cursors.left.isDown) {
                nuevaPosicion.x -= 1;
                this.keyPressed = true;
            } else if (this.cursors.right.isDown) {
                nuevaPosicion.x += 1;
                this.keyPressed = true;
            } else if (this.cursors.up.isDown) {
                nuevaPosicion.y -= 1;
                this.keyPressed = true;
            } else if (this.cursors.down.isDown) {
                nuevaPosicion.y += 1;
                this.keyPressed = true;
            }
        }

        // Liberar la tecla cuando se deja de presionar
        if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) {
            this.keyPressed = false;
        }

        // Verificar si se presionó la tecla Return
        if (Phaser.Input.Keyboard.JustDown(this.returnKey)) {
            console.log('Jugador 2 ha usado la acción con Return!');
            // Aquí puedes agregar el código para lanzar power-ups o consumibles
        }

        // Verificar que la nueva posición esté dentro de los límites de la matriz
        const filas = this.scene.parcelas.length;
        const columnas = this.scene.parcelas[0].length;

        if (nuevaPosicion.x >= 0 && nuevaPosicion.x < columnas && nuevaPosicion.y >= 0 && nuevaPosicion.y < filas) {
            // Pintar la parcela anterior
            this.scene.parcelas[this.jugador.posiciony][this.jugador.posicionx].pintar(this.jugador.texturaPintada);

            // Actualizar la nueva posición del jugador
            const nuevaParcela = this.scene.parcelas[nuevaPosicion.y][nuevaPosicion.x];
            this.jugador.setPosition(nuevaParcela.x, nuevaParcela.y);
            this.jugador.posicionx = nuevaPosicion.x;
            this.jugador.posiciony = nuevaPosicion.y;
        }
    }
}
export class Control2 {
    constructor(scene, jugador, cursors, wasdKeys) {
        this.scene = scene;
        this.jugador = jugador;
        this.cursors = cursors;
        this.wasdKeys = wasdKeys;

        // Guardar la posición inicial en la matriz de parcelas
        this.jugador.posicionx = this.jugador.posicionx || 0;
        this.jugador.posiciony = this.jugador.posiciony || 0;

        // Estado para evitar movimientos continuos por separado
        this.keyPressed = false;
    }

    update() {
        let nuevaPosicion = { x: this.jugador.posicionx, y: this.jugador.posiciony };

        // Solo permitir el movimiento si la tecla no ha sido presionada previamente
        if (!this.keyPressed) {
            // Movimiento con las flechas (jugador 2)
            if (this.cursors.left.isDown) {
                nuevaPosicion.x -= 1;
                this.keyPressed = true; // Marcar como tecla presionada
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

            // Movimiento con WASD (jugador 1)
            if (this.wasdKeys.A.isDown) {
                nuevaPosicion.x -= 1;
                this.keyPressed = true;
            } else if (this.wasdKeys.D.isDown) {
                nuevaPosicion.x += 1;
                this.keyPressed = true;
            } else if (this.wasdKeys.W.isDown) {
                nuevaPosicion.y -= 1;
                this.keyPressed = true;
            } else if (this.wasdKeys.S.isDown) {
                nuevaPosicion.y += 1;
                this.keyPressed = true;
            }
        }

        // Liberar la tecla cuando se deja de presionar
        if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp &&
            this.wasdKeys.A.isUp && this.wasdKeys.D.isUp && this.wasdKeys.W.isUp && this.wasdKeys.S.isUp) {
            this.keyPressed = false; // Reiniciar el estado cuando no se presionan teclas
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
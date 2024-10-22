export class ControlJugador1 {
    constructor(scene, jugador, wasdKeys) {
        this.scene = scene;
        this.jugador = jugador;
        this.wasdKeys = wasdKeys;

        this.keyPressed = false; // Estado para evitar movimientos continuos
    }

    update() {
        let nuevaPosicion = { x: this.jugador.posicionx, y: this.jugador.posiciony };

        if (!this.keyPressed) {
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
        if (this.wasdKeys.A.isUp && this.wasdKeys.D.isUp && this.wasdKeys.W.isUp && this.wasdKeys.S.isUp) {
            this.keyPressed = false;
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
import { PuntajeComponentMiniJuego2 } from "./PuntajeComponentMiniJuego2";

export class ControlJugador1 {
    constructor(scene, jugador, wasdKeys, spaceKey) {
        this.scene = scene;
        this.jugador = jugador;
        this.wasdKeys = wasdKeys;
        this.spaceKey = spaceKey; // Tecla de acción (barra espaciadora)
        
        this.keyPressed = false; // Estado para evitar movimientos continuos
        this.actionKeyPressed = false; // Estado para evitar múltiples acciones
    }
    update() {
        if (this.jugador.canMove) { // Chequeo para permitir movimiento
            let nuevaPosicion = { x: this.jugador.posicionx, y: this.jugador.posiciony };
    
            // Movimiento con WASD (jugador 1)
            if (!this.keyPressed) {
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
    
            // Acción con la barra espaciadora
            if (this.spaceKey.isDown && !this.actionKeyPressed) {
                this.actionKeyPressed = true;
                console.log('Acción realizada: power-up lanzado');
            }
    
            // Liberar la acción cuando se deja de presionar la barra espaciadora
            if (this.spaceKey.isUp) {
                this.actionKeyPressed = false;
            }
        }
    }
}
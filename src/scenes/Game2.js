import { Scene } from "phaser";
import { crearParcelas } from '../entities/Grupoparcelas.js';
import { Jugador2 } from "../entities/Jugador2.js";
import { Control2 } from "../components/Control2.js";

export class Game2 extends Scene {
    constructor() {
        super("Game2");
    }

    create() {
        // Fondo
        this.add.image(960, 540, "fondo2");

        // Matriz de parcelas
        this.parcelas = crearParcelas(this); // Almacena el array de parcelas
        

        // Jugadores en posiciones específicas del array de parcelas
        const jugador1Pos = this.parcelas[0][0]; // Posición (0, 0)
        const jugador2Pos = this.parcelas[7][15]; // Posición (7, 15)

        // Ajustar la posición para centrar los jugadores
        const offset = jugador1Pos.displayWidth / 2; // Asumiendo que las parcelas son cuadradas

        this.jugador1 = new Jugador2(this, jugador1Pos.x + offset, jugador1Pos.y + offset, 'jugador1', "jugador1"); // Crea el jugador 1
        this.jugador2 = new Jugador2(this, jugador2Pos.x + offset, jugador2Pos.y + offset, 'jugador2', "jugador2"); // Crea el jugador 2
        
    }
}
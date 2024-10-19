import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class nivelComponent {
    constructor(scene) {
        this.scene = scene;
        this.nivelActual = parseInt(localStorage.getItem('nivel')) || 1; ///recupero el valor almacenado en el localStorage, sino tiene valor le da uno
        this.NivelTexto = this.scene.add.text(840,16,
            `${getPhrase('NIVEL')}: ${this.nivelActual}`, // Usa getPhrase para obtener la versión traducida de "PUNTAJE"
            {
                fontFamily: 'SuperBrain',
                fontSize: 36,
                color: '#343434',
                stroke: '#df8a34',
                strokeThickness: 8,
                align: 'center',
            }
        );

        
        
    }

    // Método para aumentar el puntaje
    aumentarNivel() {
        this.nivelActual += 1; // Incrementa el puntaje
        this.NivelTexto.setText(`${getPhrase('NIVEL')}: ${this.puntaje}`); // Actualiza el texto mostrado con la traducción
        localStorage.setItem('nivel', this.nivelActual.toString());/// lo guardo en el local storage
    }
}
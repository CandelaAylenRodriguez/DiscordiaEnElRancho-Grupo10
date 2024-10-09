export class PuntajeComponent {
    constructor(scene, puntajeInicial = 0) {
        this.scene = scene;
        this.puntaje = puntajeInicial; // Inicializa el puntaje con el valor recibido

        // Crea un texto en la esquina superior derecha para mostrar el puntaje
        this.puntajeText = this.scene.add.text(
            this.scene.cameras.main.width - 350, // Posición en X
            16, // Posición en Y
            `Puntaje: ${this.puntaje}`, // Texto inicial
            {
                fontFamily: 'SuperBrain',
                fontSize: 36,
                color: '#343434',
                stroke: '#df8a34',
                strokeThickness: 8,
            }
        );

        // Agrega el puntaje al registro para poder acceder a él más tarde
        this.scene.registry.set('puntaje', this.puntaje);
    }

    // Método para aumentar el puntaje
    aumentarPuntaje(cantidad) {
        this.puntaje += cantidad; // Incrementa el puntaje
        this.puntajeText.setText(`Puntaje: ${this.puntaje}`); // Actualiza el texto mostrado
        this.scene.registry.set('puntaje', this.puntaje); // Actualiza el registro
    }
}
import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class NivelPantalla {
    constructor(scene) {
        this.scene = scene;
        this.fondoNegro = this.scene.add.graphics();
        this.fondoNegro.fillStyle(0x000000, 1); // Color negro, completamente opaco
        this.fondoNegro.fillRect(0,0,1920,1080);
        this.fadeIn();
        this.nivelActual =parseInt(localStorage.getItem('nivel')) || 1;
        console.log("entro nivel"+ this.nivelActual)
        this.NivelTexto = this.scene.add.text(960,540,
            `${getPhrase('NIVEL')}: ${this.nivelActual}`, // Usa getPhrase para obtener la versión traducida de "PUNTAJE"
            {
                fontFamily: 'SuperBrain',
                fontSize: 80,
                color: '#343434',
                stroke: '#df8a34',
                strokeThickness: 8,
                align: 'center',
            }
        );
        this.NivelTexto.setOrigin(0.5,0.5)
        this.NivelTexto.setScale(0)

        this.scene.tweens.add({
            targets: this.NivelTexto, 
            scaleX: 2, 
            scaleY: 2,
            duration: 900, // Duración del escalado
            yoyo: true, // Volver a la escala original
            repeat: 0, // Repetir indefinidamente
            ease: 'Sine.easeInOut' // Tipo de easing
        });
        
        setTimeout(() => {
            this.NivelTexto.destroy();
        }, 1900);
        
    }
    fadeIn() {
        this.scene.tweens.add({
            targets: this.fondoNegro,
            alpha: 0, // Cambia de 1 a 0
            duration: 2000, 
            ease: 'Power1', 
            onComplete: () => {
                this.fondoNegro.destroy();
            }
        });
    }
}
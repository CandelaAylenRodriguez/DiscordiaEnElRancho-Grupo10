import { getPhrase } from '../services/translations'; // Asegúrate de que la ruta sea correcta

export class NivelPantalla {
    constructor(scene) {
        this.scene = scene;
        this.fondoNegro = this.scene.add.graphics();
        this.fondoNegro.fillStyle(0x000000, 1); // Color negro, completamente opaco
        this.fondoNegro.fillRect(0, 0, 1920, 1080);
        this.fadeIn();

        // Obtener el nivel actual desde localStorage
        this.nivelActual = parseInt(localStorage.getItem('nivel')) || 1;
        console.log("Nivel actual: " + this.nivelActual);
        
        // Cargar y reproducir la música del nivel
        this.cargarMusicaNivel(this.nivelActual);

        this.NivelTexto = this.scene.add.text(960, 540,
            `${getPhrase('NIVEL')}: ${this.nivelActual}`, 
            {
                fontFamily: 'SuperBrain',
                fontSize: 80,
                color: '#343434',
                stroke: '#df8a34',
                strokeThickness: 8,
                align: 'center',
            }
        );
        this.NivelTexto.setOrigin(0.5, 0.5);
        this.NivelTexto.setScale(0);

        this.scene.tweens.add({
            targets: this.NivelTexto,
            scaleX: 2, 
            scaleY: 2,
            duration: 900,
            yoyo: true,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });

        setTimeout(() => {
            this.NivelTexto.destroy();
        }, 1900);
    }

    fadeIn() {
        this.scene.tweens.add({
            targets: this.fondoNegro,
            alpha: 0,
            duration: 2000, 
            ease: 'Power1',
            onComplete: () => {
                this.fondoNegro.destroy();
            }
        });
    }

    cargarMusicaNivel(nivel) {
        // Detener y destruir cualquier música previa que esté en reproducción
        if (this.musicaNivel) {
            this.musicaNivel.stop();
            this.scene.sound.remove(this.musicaNivel);  // Asegurarse de que la música previa se elimine por completo
        }

        // Seleccionar la música según el nivel actual
        let musicaKey;
        switch (nivel) {
            case 1:
                musicaKey = 'Music1';
                break;
            case 2:
                musicaKey = 'Music2';
                break;
            case 3:
                musicaKey = 'Music3';
                break;
            case 4:
                musicaKey = 'Music4';
                break;
            case 5:
                musicaKey = 'Music5';
                break;
            default:
                musicaKey = null;
        }

        // Reproducir la música solo si hay una pista asignada
        if (musicaKey) {
            this.musicaNivel = this.scene.sound.add(musicaKey, { loop: true });
            this.musicaNivel.play();
        }
    }

    detenerMusicaFinal() {
        // Detener la música al final del Nivel 5 y eliminar la instancia
        if (this.musicaNivel) {
            this.musicaNivel.stop();
            this.scene.sound.remove(this.musicaNivel);  // Eliminar instancia para liberar recursos
            this.musicaNivel = null;
        }
    }
}
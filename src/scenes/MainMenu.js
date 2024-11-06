import { Scene } from 'phaser';
import { getPhrase } from '../services/translations'; 

export class MainMenu extends Scene {
    static musicaMenu; // Variable estática para la música

    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(960, 540, 'fondosolo'); // Añadir la imagen de fondo de la escena Idioma (que ya estaba)
    
        if (!this.game.registry.get('mainmenuLoaded')) { // Verificar si es la primera vez que se carga esta escena
            let fondoMainMenu = this.add.image(960, 540, 'mainmenu').setAlpha(0).setDepth(0);  // Inicialmente transparente
            this.tweens.add({ // Realizar el fade-in
                targets: fondoMainMenu,
                alpha: 1,             // Fade-in hasta ser opaca
                duration: 2000,       // Duración en milisegundos
                ease: 'Linear'
            });
            this.game.registry.set('mainmenuLoaded', true);// Marcar que ya se realizó el fade-in
            
            this.createButtons(true); // Llamar a la función con fade-in// Realizar fade-in para los botones interactivos solo la primera vez
        } else {
            this.add.image(960, 540, 'mainmenu').setAlpha(1); // Si ya se cargó previamente, mostrar la imagen directamente

            // Mostrar los botones directamente sin fade-in
            this.createButtons(false); // Llamar a la función sin fade-in
        }
        if (!MainMenu.musicaMenu) { // Inicia la música del menú solo si no está en reproducción
            MainMenu.musicaMenu = this.sound.add('menuMusic', { loop: true });
        }
        if (!MainMenu.musicaMenu.isPlaying) {
            MainMenu.musicaMenu.play();
        }
        this.add.image(960,900,"boton").setScale(1);
        this.add.image(760,900,"btnmusica").setScale(0.4);
        this.createVolumeSlider();
    }
    createVolumeSlider() {
        const barX = 810; // Coordenadas de la barra de volumen
        const barY = 890;
        const barWidth = 300;
        const barHeight = 20;

        this.volumeBar = this.add.graphics();  // Crear gráfico para la barra de volumen
        this.volumeBar.fillStyle(0x7dcea0, 1); // Color para la barra
        this.volumeBar.fillRect(barX, barY, barWidth, barHeight); // Dibujar la barra como un rectángulo

        const initialVolume = this.sound.volume;// Calcular posición inicial del slider según el volumen global
        const handleX = barX + initialVolume * barWidth;

        this.sliderHandle = this.add.circle(handleX, barY + barHeight / 2, 10, 0xfdfefe) // Crear el control deslizante como un objeto de círculo
            .setInteractive({ useHandCursor: true, draggable: true });
        this.input.setDraggable(this.sliderHandle); // Hacer que el deslizador sea arrastrable

        this.input.on('drag', (pointer, gameObject, dragX) => {// Escuchar el evento de arrastre
            if (gameObject === this.sliderHandle) {
                if (dragX >= barX && dragX <= barX + barWidth) { // Limitar el movimiento a los límites de la barra de volumen
                    gameObject.x = dragX;
                    const volume = (dragX - barX) / barWidth; // Ajustar el volumen global de acuerdo a la posición del deslizador
                    this.sound.setVolume(volume);
                }
            }
        });
    }
    createButtons(applyFade) {
        // Botón "JUGAR" con traducción dinámica
        const playBotonTexto = this.add.text(0, 0, getPhrase('JUGAR'), {  
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const playBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const playBoton = this.add.container(960, 540, [playBotonFondo, playBotonTexto])
            .setAlpha(applyFade ? 0 : 1)  // Inicialmente transparente si aplica fade
            .setDepth(3);

        playBoton.setSize(playBotonFondo.width, playBotonFondo.height);
        playBoton.setInteractive();

        if (applyFade) {
            // Aplicar fade-in al botón "JUGAR"
            this.tweens.add({
                targets: playBoton,
                alpha: 1,
                duration: 2000,
                ease: 'Linear'
            });
        }

        playBoton.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.scene.start('Controles2');
            });
        });
        playBoton.on('pointerover', () => {
            playBoton.setScale(1.2); 
        });
        playBoton.on('pointerout', () => {
            playBoton.setScale(1); // Vuelve al tamaño original
        });

        // Botón "CONTROLES" con traducción dinámica
        const controlesBotonTexto = this.add.text(0, 0, getPhrase('CONTROLES'), {  
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const controlesBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const controlesBoton = this.add.container(960, 640, [controlesBotonFondo, controlesBotonTexto])
            .setAlpha(applyFade ? 0 : 1)  // Inicialmente transparente si aplica fade
            .setDepth(3);

        controlesBoton.setSize(controlesBotonFondo.width, controlesBotonFondo.height);
        controlesBoton.setInteractive();

        controlesBoton.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.scene.start('Controles');
            });
        });
        controlesBoton.on('pointerover', () => {
            controlesBoton.setScale(1.2); 
        });
        controlesBoton.on('pointerout', () => {
            controlesBoton.setScale(1); // Vuelve al tamaño original
        });

        if (applyFade) {
            // Aplicar fade-in al botón "CONTROLES"
            this.tweens.add({
                targets: controlesBoton,
                alpha: 1,
                duration: 2000,
                ease: 'Linear'
            });
        }

        // Botón "CREDITOS" con traducción dinámica
        const creditosBotonTexto = this.add.text(0, 0, getPhrase('CREDITOS'), {  
            fontFamily: 'SuperBrain', fontSize: 36, color: '#343434',
            stroke: '#df8a34', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const creditosBotonFondo = this.add.image(0, 0, "boton").setOrigin(0.5);

        const creditosBoton = this.add.container(960, 740, [creditosBotonFondo, creditosBotonTexto])
            .setAlpha(applyFade ? 0 : 1)  // Inicialmente transparente si aplica fade
            .setDepth(3);

        creditosBoton.setSize(creditosBotonFondo.width, creditosBotonFondo.height);
        creditosBoton.setInteractive();

        creditosBoton.on('pointerdown', () => {
            this.sound.play('Boton'); // Reproduce el sonido 'Boton'
            this.time.delayedCall(100, () => {
                this.scene.start('Creditos');
            });
        });
        creditosBoton.on('pointerover', () => {
            creditosBoton.setScale(1.2); 
        });
        creditosBoton.on('pointerout', () => {
            creditosBoton.setScale(1); // Vuelve al tamaño original
        });

        if (applyFade) {
            // Aplicar fade-in al botón "CREDITOS"
            this.tweens.add({
                targets: creditosBoton,
                alpha: 1,
                duration: 2000,
                ease: 'Linear'
            });
        }
    }
}
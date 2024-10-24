import { Scene } from 'phaser';
import { getPhrase } from '../services/translations'; 

export class MainMenu extends Scene {
    static musicaMenu; // Variable estática para la música

    constructor() {
        super('MainMenu');
    }

    create() {
        // Añadir la imagen de fondo de la escena Idioma (que ya estaba)
        this.add.image(960, 540, 'fondosolo');
    
        // Verificar si es la primera vez que se carga esta escena
        if (!this.game.registry.get('mainmenuLoaded')) {
            let fondoMainMenu = this.add.image(960, 540, 'mainmenu').setAlpha(0).setDepth(0);  // Inicialmente transparente
    
            // Realizar el fade-in
            this.tweens.add({
                targets: fondoMainMenu,
                alpha: 1,             // Fade-in hasta ser opaca
                duration: 2000,       // Duración en milisegundos
                ease: 'Linear'
            });
    
            // Marcar que ya se realizó el fade-in
            this.game.registry.set('mainmenuLoaded', true);

            // Realizar fade-in para los botones interactivos solo la primera vez
            this.createButtons(true); // Llamar a la función con fade-in
        } else {
            // Si ya se cargó previamente, mostrar la imagen directamente
            this.add.image(960, 540, 'mainmenu').setAlpha(1);

            // Mostrar los botones directamente sin fade-in
            this.createButtons(false); // Llamar a la función sin fade-in
        }
    
        // Inicia la música del menú solo si no está en reproducción
        if (!MainMenu.musicaMenu) {
            MainMenu.musicaMenu = this.sound.add('menuMusic', { loop: true });
        }

        if (!MainMenu.musicaMenu.isPlaying) {
            MainMenu.musicaMenu.play();
        }
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
            this.scene.start('Controles2');
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

        controlesBoton.on('pointerdown', () => {
            this.scene.start('Controles');
        });

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

        if (applyFade) {
            // Aplicar fade-in al botón "CREDITOS"
            this.tweens.add({
                targets: creditosBoton,
                alpha: 1,
                duration: 2000,
                ease: 'Linear'
            });
        }

        creditosBoton.on('pointerdown', () => {
            this.scene.start('Creditos');
        });
        creditosBoton.on('pointerover', () => {
            creditosBoton.setScale(1.2); 
        });
        creditosBoton.on('pointerout', () => {
            creditosBoton.setScale(1); // Vuelve al tamaño original
        });

    }
}
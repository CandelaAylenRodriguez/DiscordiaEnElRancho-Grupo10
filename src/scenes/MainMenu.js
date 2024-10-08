import { Scene } from 'phaser';

export class MainMenu extends Scene {
    static musicaMenu; // Variable estática para la música

    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(960, 540, 'fondo');

        // Inicia la música del menú solo si no está en reproducción
        if (!MainMenu.musicaMenu) {
            MainMenu.musicaMenu = this.sound.add('menuMusic', { loop: true });
        }

        if (!MainMenu.musicaMenu.isPlaying) {
            MainMenu.musicaMenu.play();
        }

        const playBoton = this.add.text(960, 540, 'JUGAR', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        playBoton.setInteractive();
        playBoton.on('pointerdown', () => {
            this.scene.start('Seleccion');
        });

        const controlesBoton = this.add.text(960, 640, "CONTROLES", {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        controlesBoton.setInteractive();
        controlesBoton.on('pointerdown', () => {
            this.scene.start('Controles');
        });

        const creditosBoton = this.add.text(960, 740, 'CREDITOS', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FA9A',
            stroke: '#20B2AA', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        creditosBoton.setInteractive();
        creditosBoton.on('pointerdown', () => {
            this.scene.start('Creditos');
        });
    }
}
import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {

        //Menu Principal
        this.add.image(960,540,'fondosolo');

        // Una barra de progreso simple. Este es el contorno de la barra.
        this.add.image(960,540, "carga")

        //  Esta es la barra de progreso en sí. Aumentará de tamaño desde la izquierda según el porcentaje de progreso.
        const bar = this.add.rectangle(960, 540, 800, 100, 0x7FFF00);

        // Usa el evento 'progreso' emitido por LoaderPlugin para actualizar la barra de carga
        this.load.on('progress', (progress) => {

            // Actualiza la barra de progreso (nuestra barra tiene 800 px de ancho, por lo que 100% =800 px)
            bar.width = 4 + (800 * progress);

        });
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image("cultivo", "cultivo.png");
        this.load.spritesheet("enemigo1","enemigo1.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo2","enemigo2.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo3","enemigo3.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo4","enemigo4.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.image("fondo","fondo.png");
        this.load.spritesheet("jugador1","jugador1.png",{frameWidth: 79, frameHeight: 100});
        this.load.spritesheet("jugador2","jugador2.png",{frameWidth: 79, frameHeight: 100});
        this.load.spritesheet("jefe","jefe.png",{frameWidth: 427, frameHeight: 410});
        this.load.spritesheet("bombaexplota","bombaexplota.png", {frameWidth:494, frameHeight: 489});
        this.load.image("muro","muro.png");
        this.load.image("lechuga","lechuga.png");
        this.load.image("tomate","tomate.png");
        this.load.image("calabaza","calabaza.png");
        this.load.image("maderitas", "maderitas.png");
        this.load.image("mainmenu", "mainmenupelado.png");
        this.load.image("fondosolo", "fondosolo.png");
        this.load.image("fondo1", "fondosolo1.png");
        this.load.image("boton", "btn.png");
        this.load.image("espanol", "banderaespanol.png");
        this.load.image("ingles", "banderaingles.png");
        this.load.image('controles', "controlbotones.png");
        this.load.image('fondo2', "fondomin2.png");
        this.load.image('creditos', "credbase.png");
        this.load.image('textura0', "parcelamin2.png");
        this.load.image('textura1', "frutillas.png");
        this.load.image('textura2', "arandanos.png");
        this.load.image("barravida","barravida.png" );
        this.load.image("baba","baba.png" );
        this.load.image("logo","logo.png" );
        this.load.image("p1", "p1.png");
        this.load.image("p2", "p2.png");
        this.load.image("cartel", "cartel.png");
        this.load.image("barro","barro.png");
        this.load.image("bomba","bomba.png");
        this.load.image("x1","x1.png");
        this.load.image("x2","x2.png");
        this.load.image("x3","x3.png");
        
        // Preload the music files
        this.load.audio('menuMusic', './sound/MusicaMenuPrincipal.mp3');
        this.load.audio('Music1', './sound/MusicaNivel1.mp3');
        this.load.audio('Music2', './sound/MusicaNivel2.mp3');
        this.load.audio('Music3', './sound/MusicaNivel3.mp3');
        this.load.audio('Music4', './sound/MusicaNivel4.mp3');
        this.load.audio('Music5', './sound/MusicaNivel5.mp3');
        this.load.audio('MusicMin2', './sound/MusicaMiniJuego2.mp3');
        this.load.audio('MusicMin2V', './sound/MusicaMiniJuego2Victoria.mp3');
        this.load.audio('MusicGameOver', './sound/MusicaGameOver.mp3');
        this.load.audio('Boton', './sound/Boton.m4a');
        this.load.audio('Ataque', './sound/Ataque.mp3');
        this.load.audio('Baba', './sound/Baba.mp3');
        this.load.audio('Barro', './sound/Barro.mp3');
        this.load.audio('MuroRoto', './sound/MuroRoto.mp3');
        this.load.audio('Maderita', './sound/Maderita.mp3');
    }
    

    create ()
    {
        this.scene.start('Idioma');
    }
}

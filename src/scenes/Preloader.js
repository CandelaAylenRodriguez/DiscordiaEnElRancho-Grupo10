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

        // Cargamos esta imagen en nuestra escena de inicio, para que podamos mostrarla aquí.
        //this.add.image(960, 540, 'fondo');

        // Una barra de progreso simple. Este es el contorno de la barra.
        this.add.rectangle(960, 540, 800, 100).setStrokeStyle(2, 0xffffff);

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
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets'); //establece una ruta base o "directorio raíz" desde donde se cargarán los archivos de recursos
        this.load.image("cultivo", "cultivo.png");
        this.load.spritesheet("enemigo1","enemigo1.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo2","enemigo2.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo3","enemigo3.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.spritesheet("enemigo4","enemigo4.png",{frameWidth: 65.75, frameHeight: 63});
        this.load.image("fondo","fondo.png");
        this.load.spritesheet("jugador1","jugador1.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("jugador2","jugador2.png",{frameWidth: 64, frameHeight: 64});
        this.load.image("muro","muro.png");
        this.load.image("lechuga","lechuga.png");
        this.load.image("tomate","tomate.png");
        this.load.image("calabaza","calabaza.png");
        this.load.image("maderitas", "maderitas.png");
        this.load.image("mainmenu", "mainmenupelado.png");
        this.load.image("fondosolo", "fondosolo.png");
        this.load.image("boton", "btn.png");
        this.load.image("espanol", "banderaespanol.png");
        this.load.image("ingles", "banderaingles.png");
        this.load.image('controles', "controlbotones.png");
        this.load.image('creditos', "credbase.png");
        // Preload the music file
        this.load.audio('menuMusic', 'MenuPrincipal_DEER.mp3');
        
    }
    

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Idioma');
    }
}

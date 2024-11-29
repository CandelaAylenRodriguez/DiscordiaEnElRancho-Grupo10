import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('fondosolo', 'assets/fondosolo.png');
        this.load.image("carga",'assets/loading.png' )
    }

    create ()
    {
        this.scene.start('Login');
    }
}

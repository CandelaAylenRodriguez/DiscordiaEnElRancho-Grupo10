import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Controles } from './scenes/Controles';
import { Idioma } from './scenes/Idioma';
import { Creditos } from './scenes/Creditos';
import {Seleccion} from "./scenes/Seleccion";
import { Game2 } from './scenes/Game2';
import { Victoria } from './scenes/Victoria';
import { UI } from './scenes/UI';
import { Controles2 } from './scenes/Controles2';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver,
    Controles,
    Controles2,
    Idioma,
    Creditos,
    Seleccion, 
    Game2,
    Victoria,
    UI
]
};

export default new Phaser.Game(config);

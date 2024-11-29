import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Controles } from './scenes/Controles';
import { Idioma } from './scenes/Idioma';
import { Creditos } from './scenes/Creditos';
import { Seleccion } from './scenes/Seleccion';
import { Game2 } from './scenes/Game2';
import { Victoria } from './scenes/Victoria';
import { UI } from './scenes/UI';
import { Controles2 } from './scenes/Controles2';
import { UI2 } from './scenes/UI2';
import { Victoria2 } from './scenes/Victoria2';
import { FirebasePlugin } from './plugins/FirebasePlugin'; 
import Phaser from 'phaser';
import { Login } from './scenes/Login';

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
  plugins: {
    global: [
      {
        key: "FirebasePlugin",
        plugin: FirebasePlugin,
        start: true,
        mapping: "firebase",
      },
    ],
  },
  scene: [
    Boot,
    Login,
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
    UI,
    UI2,
    Victoria2,
  ]
};

export default new Phaser.Game(config);
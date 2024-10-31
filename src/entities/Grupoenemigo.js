import { Enemigo } from "./Enemigo.js";
import { Baba } from "./Baba.js";
export class Grupoenemigo extends Phaser.GameObjects.Group {
  constructor(scene, key, intervaloSeg, target,nivelAparicion) {
    super(scene);

    this.scene = scene;
    this.key = key;
    this.intervaloSeg = intervaloSeg; // Cada cuanto se crean
    this.target = target;
    this.nivelAparicion = nivelAparicion;
    this.uiScene = this.scene.scene.get('UI');  // Acceder a la escena 'UI'

    // Crear enemigos periódicamente
    this.scene.time.addEvent({
      delay: this.intervaloSeg,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemy() {
    if (this.uiScene.nivelUI.nivelActual >= this.nivelAparicion) {
       // Definir bordes del mundo (ajustar según tu escenario)
    const worldWidth = this.scene.cameras.main.width;
    const worldHeight = this.scene.cameras.main.height;
    // Elegir una posición aleatoria en el borde del mundo
    let x, y;
    const posicion = Phaser.Math.Between(0, 3); // 0 = arriba, 1 = derecha, 2 = abajo, 3 = izquierda
    if (posicion === 0) {
      x = Phaser.Math.Between(0, worldWidth);
      y = 0;
    } else if (posicion === 1) {
      x = worldWidth;
      y = Phaser.Math.Between(0, worldHeight);
    } else if (posicion === 2) {
      x = Phaser.Math.Between(0, worldWidth);
      y = worldHeight;
    } else {
      x = 0;
      y = Phaser.Math.Between(0, worldHeight);
    }

    // Crear el enemigo en la posición aleatoria
    this.enemigo = new Enemigo(this.scene, x, y, this.key);
    this.enemigo.setActive(true).setVisible(true);
    this.enemigo.rotation= Phaser.Math.Angle.Between(this.enemigo.x,this.enemigo.y,this.scene.cultivo.x,this.scene.cultivo.y);
    this.enemigo.rotation=this.enemigo.rotation+200
    // Verificar si el target aún existe antes de asignarlo
    if (this.target.active) {
      this.enemigo.moveTo(this.target);

    }

    this.add(this.enemigo);
  }

 }
   

  update() {
    this.children.each((hijo) => {
      hijo.update();
    });
  }
}
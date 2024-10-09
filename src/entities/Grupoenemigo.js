import { Enemigo } from "./Enemigo.js";
export class Grupoenemigo extends Phaser.GameObjects.Group {
  constructor(scene, key, intervaloSeg, target,nivelAparicion) {
    super(scene);

    this.scene = scene;
    this.key = key;
    this.intervaloSeg = intervaloSeg; // Cada cuanto se crean
    this.target = target;
    this.nivelAparicion = nivelAparicion;

    // Crear enemigos periódicamente
    this.scene.time.addEvent({
      delay: this.intervaloSeg,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemy() {
    if (this.scene.nivelActual >= this.nivelAparicion) {
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
    const enemigo = new Enemigo(this.scene, x, y, this.key);
    enemigo.setActive(true).setVisible(true);
    enemigo.rotation= Phaser.Math.Angle.Between(enemigo.x,enemigo.y,this.scene.cultivo.x,this.scene.cultivo.y);
    enemigo.rotation=enemigo.rotation+200
    // Verificar si el target aún existe antes de asignarlo
    if (this.target.active) {
      enemigo.moveTo(this.target);
    }

    this.add(enemigo);
  }
 }
   

  update() {
    this.children.each((hijo) => {
      hijo.update();
    });
  }
}
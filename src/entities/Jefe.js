import { Enemigo } from "./Enemigo";
export class Jefe extends Phaser.GameObjects.Sprite {
    constructor(scene, key ) {
      super(scene,key);
      this.scene=scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.body.setBounce(1); // Puede ajustar el rebote según sea necesario   
      this.key= key;
      this.setScale(0.5)
      this.generador;
      this.setDepth(6);
      this.body.setSize(210,210)
      this.body.setOffset(100,100)
      this.vida=1;

      /*this.muestraVida = this.scene.add.text(this.x-30, this.y - 90, this.vida.toString(), {
        fontFamily: 'SuperBrain',
        fontSize: 28,
        color: '#343434',
        stroke: '#df8a34',
        strokeThickness: 2,
      }).setDepth(10);*/
      

      this.ultimaPosicion = this.PosicionAleatoria(scene); // Guarda la posición inicial
      this.setPosition(this.ultimaPosicion.x, this.ultimaPosicion.y);

      this.CreaAnimaciones(key,"1",0,7,10,-1)
      this.CreaAnimaciones(key,"2",8,15,10,-1)
      this.CreaAnimaciones(key,"3",16,23,10,-1)
      this.CreaAnimaciones(key,"4",24,31,10,-1)
      this.CreaAnimaciones(key,"5",32,39,10,0)
      this.play(this.key + "1");  // Reproduce la animación 'idle'

      
       this.generador= this.scene.time.addEvent({
          delay: 3000,
          callback: this.spawnEnemigos,
          callbackScope: this,
          loop: true,
        });
      
    }

    update() {
     // this.muestraVida.setPosition(this.x-30, this.y - 90); // Mantiene el texto en la posición correcta
  }

    CreaAnimaciones(key,clave, startframe,endframe,rate, repet) { ///metodo para crear las animaciones
        this.anims.create({
          key: key+ clave,  // key del sritesheep + la clave de animacion para diferenciar entre los jugadores
          frames: this.anims.generateFrameNumbers(key, { start: startframe, end: endframe }),  // Rango de frames a usar
          frameRate: rate,  // Velocidad de la animación (frames por segundo)
          repeat: repet  // Repetir indefinidamente
          });
      }
      restaVida(){

          this.vida+=1
          if (this.vida==2){
            this.play(this.key + "2");
          } else if (this.vida==3){
            this.play(this.key + "3");
          } else if (this.vida==4){
            this.play(this.key + "4");
          } else if (this.vida==5){
          this.play(this.key + "5");  // Reproduce la animación 'idle'
          this.body.enable=false;
          setTimeout(() => {
            this.scene.scene.stop("UI");
            this.scene.scene.start("Victoria");
          }, 900)
        }
      }
        PosicionAleatoria(scene) {
        const posiciones = [
            { x: 200, y: 200, p:1 },  // Esquina superior izquierda
            { x: scene.scale.width-200, y: 200 ,p:2},  // Esquina superior derecha
            { x: 200, y: scene.scale.height -200, p:3},  // Esquina inferior izquierda
            { x: scene.scale.width-200, y: scene.scale.height-200,p:4 }  // Esquina inferior derecha
        ];
        // Elegir una posición al azar de las cuatro esquinas
        return Phaser.Utils.Array.GetRandom(posiciones);
    }
    CambiaPosicion(){
      
      if (this.vida!=5){
      let nuevaPosicion;
      nuevaPosicion = this.PosicionAleatoria(this.scene);
      while (nuevaPosicion.p===this.ultimaPosicion.p) {
        nuevaPosicion = this.PosicionAleatoria(this.scene);
      }
        this.setPosition(nuevaPosicion.x, nuevaPosicion.y); // Actualiza a la nueva posición
        this.ultimaPosicion = nuevaPosicion; // Guarda la nueva posición como la última
    }
  }
    spawnEnemigos(){
      console.log("entroalspawn")
      this.enemigo = new Enemigo(this.scene, this.x, this.y, "enemigo3");
    this.enemigo.setActive(true).setVisible(true);
    this.enemigo.rotation= Phaser.Math.Angle.Between(this.enemigo.x,this.enemigo.y,this.scene.cultivo.x,this.scene.cultivo.y);
    this.enemigo.rotation=this.enemigo.rotation+200
    // Verificar si el target aún existe antes de asignarlo
    if (this.scene.enemigosTipo3.target.active) {
      this.enemigo.moveTo(this.scene.enemigosTipo3.target);
    }

    this.scene.enemigosTipo3.add(this.enemigo);
    }
    intocable(){
      this.body.enable=false;
      setTimeout(() => {
         this.body.enable=true;
      }, 200);

    }
}
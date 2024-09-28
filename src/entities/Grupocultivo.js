import { CultivosPlantados } from "./Cultivoplantados";
export class Grupocultivo extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.scene = scene;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            this.creaCultivos(895 + i * 65,475 + j * 65);
   
        }
    }
    
  }

creaCultivos(posX,posY){
    let keynum =  Phaser.Math.Between(1,3);
  console.log(keynum);
    if (keynum==1){
        this.verdura= new CultivosPlantados (this.scene,posX,posY,"lechuga");
    }
    else if (keynum==2){
        this.verdura= new CultivosPlantados (this.scene,posX,posY,"tomate");
    }
    else {
        this.verdura= new CultivosPlantados (this.scene,posX,posY,"calabaza");
    }
    this.add(this.verdura);
}
}
export class CultivosPlantados extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y,key) {
      super(scene, x, y,key);
        
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setScale(0.6);
        
      this.scene.tweens.add({
        targets: this, 
        scaleX: 0.4, 
        scaleY: 0.4,
        duration: 1500, // Duración del escalado
        yoyo: true, // Volver a la escala original
        repeat: -1, // Repetir indefinidamente
        ease: 'Sine.easeInOut' // Tipo de easing
    });

    }
    
}
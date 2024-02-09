import Phaser from "phaser";

export default class Exit extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene)

    scene.add.zone(0, 0, 100, 100);
    scene.physics.add.existing(this); 
    this.body.allowGravity = false;
  }
}
import Phaser from "phaser";

export default class Diamond extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene)
    this.isHit = false;

    scene.add.existing(this);
    scene.physics.add.existing(this); 
    this.body.setSize(12, 12);
    // this.body.setOffset(42, 42);
    this.setPosition(420, 350);
    this.body.allowGravity = false; 

    this.play({
      key: "diamond-Idle",
    });
  }

  hit() {
    this.isHit = true;
    this.play({
      key: "diamond-Hit",
  });
  }
}




// this.isDiamondHit = false;
//     this.diamond = this.add.sprite(420, 350, "liveCoinsSpriteSheet", 29);
//     this.physics.add.existing(this.diamond);
//     this.diamond.body.setSize(12,12);
//     this.diamond.body.allowGravity = false; 

//     this.anims.create({
//       key: "diamond-Idle",
//       frames: this.anims.generateFrameNumbers("liveCoinsSpriteSheet", {
//         start: 29,
//         end: 38,
//       }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: "diamond-Hit",
//       frames: this.anims.generateFrameNumbers("liveCoinsSpriteSheet", {
//         start: 39,
//         end: 40,
//       }),
//       frameRate: 10,
//       repeat: 0,
//       hideOnComplete: true
//     });

//     this.diamond.play({
//         key: "diamond-Idle",
//     });



// this.particle = scene.add.particles("diamondSpritesheet", 0, {
//   speed: {
//   min: 0,
//   max: 1000
// },
//   quantity: 50,
//   lifespan: 1000,
//   scale: {
//     min: 0.25,
//     max: 1
//   },
//   rotate: {
//     start: 0,
//     end: 300,
//     random: true
//   },
//   gravityY: 200,
//   on: false

// })


// this.particle.emitParticleAt(this.x, this.y)

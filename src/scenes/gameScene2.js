import Phaser from "phaser";


import King from "../sprites/king";
import Pig from "../sprites/pig";
import Diamond from "../sprites/diamond";

export default class Game2 extends Phaser.Scene {
  constructor() {
    super("game-scene2")
  }
  
  preload() {
    
  }

  create() {
    this.physics.world.gravity.y = 0;

    const map = this.make.tilemap( { key: "gameScene2" });
    const terrainTiles = map.addTilesetImage("tilesets", "terrain", 32, 32);
    const bgLayer = map.createLayer("BG", terrainTiles);
    const collisionLayer = map.createLayer("Collision", terrainTiles);
    // const airLayer = map.createLayer("airCollision", terrainTiles);

    collisionLayer.setCollisionFromCollisionGroup(true, false);

    this.king = map.createFromObjects("King", {
      classType: King
    })[0]; 
    this.pig = map.createFromObjects("Pig", {
      classType: Pig
    }); 
    this.diamond = map.createFromObjects("Diamond", {
      classType: Diamond
    }); 

    this.physics.add.collider(this.king, collisionLayer);
    this.physics.add.collider(this.pig, collisionLayer);

    this.physics.add.overlap(this.king.attackZone, this.pig, (king, pig) => {
      if (this.king.isAttacking && !pig.isDead) {
        pig.dead()
      }
    });

    this.physics.add.overlap(this.king, this.pig, (king, pig) => {
      if (!this.king.isDead && !pig.isDead) {
        this.king.dead()
      }
    }
    );

    this.physics.add.overlap(this.king, this.diamond, (king, diamond) => {
      if (!diamond.isHit) {
        diamond.hit()
      }
    });

    // Camera
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.king, true, 1, 1, 0, 50);
    // this.cameras.main.setBounds(360, 0); 
    // this.cameras.main.setDeadzone(x, x);
  }  
  
  update() {
    this.king.updateFullScreen();
    this.pig.forEach(pig => {
      pig.updateFullScreen(this.king); 
    });
  }
}



// this.king = new King(this); 
    // this.pig = new Pig(this);
    // this.diamond = new Diamond(this);

    // platform setting
    // const platforms = [];
    // for (let i = 0; i < 10; i++) {
    //   const platform = this.add.sprite(0 + (32 * 3 * i), 400, "platform");
    //   this.physics.add.existing(platform);
    //   platform.body.allowGravity = false; 
    //   platform.body.immovable = true; 
    //   platforms.push(platform)
    // }
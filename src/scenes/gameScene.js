import Phaser from "phaser";

import King from "../sprites/king";
import Pig from "../sprites/pig";
import Diamond from "../sprites/diamond";
import Exit from "../sprites/exit";
import gameScene2 from "../assets/maps/gameScene2.json";


export default class Game extends Phaser.Scene {
  constructor() {
    super("game-scene")
  }

  preload() {
    this.load.tilemapTiledJSON("gameScene2", gameScene2)
  }

  create() {
    const map = this.make.tilemap( { key: "gameScene" });
    const terrainTiles = map.addTilesetImage("tilesets", "terrain", 32, 32);
    const bgLayer = map.createLayer("BG", terrainTiles);
    const collisionLayer = map.createLayer("Collision", terrainTiles);
    const decorationTiles = map.createLayer("Decoration", terrainTiles);
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
    this.exit = map.createFromObjects("Exit", {
      classType: Exit
    })[0];

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

    this.physics.add.overlap(this.king, this.exit, () => {
      this.scene.start("game-scene2")
    });

    // Camera
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.king, true, 1, 1, 0, 50);
    this.cameras.main.setBounds(360, 0);
    // this.cameras.main.setDeadzone(x, x);
  }  
  
  update() {
    this.king.updateSideScroll();
    this.pig.forEach(pig => {
      pig.updateSideScroll(this.king); 
    });
  }
}










//       if (!pig.isDead && !pig.isAlert && distance < 150) {
//           pig.isAlert = true;
//           pig.alert()
//         }

// this.king = new King(this); 
//     this.pig = new Pig(this);
//     this.diamond = new Diamond(this);

//     platform setting
//     const platforms = [];
//     for (let i = 0; i < 10; i++) {
//       const platform = this.add.sprite(0 + (32 * 3 * i), 400, "platform");
//       this.physics.add.existing(platform);
//       platform.body.allowGravity = false; 
//       platform.body.immovable = true; 
//       platforms.push(platform)
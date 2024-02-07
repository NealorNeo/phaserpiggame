import Phaser from "phaser";

import kingSpriteSheetJson from "../assets/sprites/King Human/King.json";
import kingSpriteSheet from "../assets/sprites/King Human/King.png";

import pigSpriteSheetJson from "../assets/sprites/Pig/Pig.json";  
import pigSpriteSheet from "../assets/sprites/Pig/Pig.png";

import liveCoinsSpriteSheetJson from "../assets/sprites/LiveCoins/liveCoins.json";
import liveCoinsSpriteSheet from "../assets/sprites/LiveCoins/liveCoins.png";

import gameScene from "../assets/maps/gameScene.json";
import terrain from "../assets/tilesets/tilesets.png";

import bgm from "../assets/music/bgm.mp3";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("boot-scene")
  }

  preload() { 
    // Loading Progress
    this.load.on("progress", (value) => {
      console.log(value)
    });
    
    this.load.on("complete", () => {
      this.scene.start("game-scene");
    });
    this.load.aseprite("kingSpriteSheet", kingSpriteSheet, kingSpriteSheetJson);
    this.load.aseprite("pigSpriteSheet", pigSpriteSheet, pigSpriteSheetJson);
    this.load.aseprite("liveCoinsSpriteSheet", liveCoinsSpriteSheet, liveCoinsSpriteSheetJson);

    this.load.image("terrain", terrain);
    this.load.tilemapTiledJSON("gameScene", gameScene);

    this.load.audio('bgm', bgm);

  }

  create() {
    this.anims.createFromAseprite("kingSpriteSheet");
    this.anims.createFromAseprite("pigSpriteSheet"); 
    this.anims.createFromAseprite("liveCoinsSpriteSheet"); 

    this.backgroudMusic = this.sound.add('bgm', { loop: true });
    this.backgroudMusic.play();

    this.anims.create({
      key: "diamond-Idle",
      frames: this.anims.generateFrameNumbers("liveCoinsSpriteSheet", {
        start: 29,
        end: 38,
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "diamond-Hit",
      frames: this.anims.generateFrameNumbers("liveCoinsSpriteSheet", {
        start: 39,
        end: 40,
      }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true
    });
  }

  update() {
    
  }
}




// import platform from "../assets/images/platform.png";
 // this.load.image("platform", platform);
    // this.load.image("decoration", decoration);
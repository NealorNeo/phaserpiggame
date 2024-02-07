import Phaser from "phaser";
// import "../styles.css"
import MenuScene from "./scenes/menu";
import BootScene from "./scenes/boot";
import GameScene from "./scenes/gameScene"; 
import GameScene2 from "./scenes/gameScene2"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height:  600,
    pixelArt: true,
    antialiasGL: true,
    roundPixels: true,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [MenuScene, BootScene, GameScene, GameScene2]
};

const game = new Phaser.Game(config);
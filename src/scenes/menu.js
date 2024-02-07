export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu-scene")
  }

  create() {
    this.add.text(100, 100, 'Pig Adventure', { fontSize: '32px', fill: '#fff' });
    
    const button = this.add.text(100, 200, 'Start Game', { fontSize: '24px', fill: '#fff' });
    button.setInteractive();
    button.on('pointerdown', () => {
        this.scene.start("boot-scene");
    });
  }
}
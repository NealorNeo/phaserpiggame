import Phaser from "phaser";

export default class Pig extends Phaser.GameObjects.Sprite {
  isDead = false;
  isAlert = false;

  constructor(scene) {
    super(scene)
    
    scene.add.existing(this);
    scene.physics.add.existing(this); 
    this.body.setSize(20, 20);
    this.body.setOffset(30, 30);
    // this.setPosition(500, 200);

    this.play({ 
      key: "pig-Idle",
      repeat: -1
    });
  }

  dead() { 
    this.isDead = true;
    this.body.setVelocity(0, 0);
    this.play({
      key: "pig-Dead",
      repeat: 0
    })
  }

  runRight() {
    this.setFlipX(true);
    this.body.setVelocityX(60);
    this.play({
      key: "pig-Run",
      repeat: -1,
    },
    true
    ); 
  }

  runLeft() { 
    this.setFlipX(false);
    this.body.setVelocityX(-60);
    this.play({
      key: "pig-Run",
      repeat: -1,
    },
    true
    ); 
  }

  alert() {
    this.body.setVelocityY(-50);
  }

  // Side-Scroll Model
  updateSideScroll(king) {
    const distance = Math.abs(king.x - this.x);
  
    if (king.x > this.x && !king.isDead && !this.isDead && distance < 150) {
      this.runRight();
    } else if (king.x < this.x && !king.isDead && !this.isDead && distance < 150) {
      this.runLeft();
    } else if (!this.isDead && king.isDead) {
      this.body.setVelocityX(0);
      this.play({ 
        key: "pig-Jump",
        repeat: -1
      }, 
      true
      );
    }
  }

  // Full Screen Model
  updateFullScreen(king) {
    const distance = Phaser.Math.Distance.Between(this.x, this.y, king.x, king.y);

    if (!king.isDead && !this.isDead && distance < 150) {
      const moveSpeed = 50;
      const angle = Phaser.Math.Angle.Between(this.x, this.y, king.x, king.y);
      const newX = moveSpeed * Math.cos(angle);
      const newY = moveSpeed * Math.sin(angle);

      

      this.body.setVelocity(newX, newY);
      if (this.x > king.x) {
        this.setFlipX(false);
        this.play({
          key: "pig-Run",
          repeat: -1,
        },
        true
        ); 
      } else {
        this.setFlipX(true);
        this.play({
          key: "pig-Run",
          repeat: -1,
        },
        true
        ); 
      }



    } else if (king.isDead && !this.isDead) {
      this.body.setVelocity(0, 0);
      this.play({ 
        key: "pig-Jump",
        repeat: -1
      }, 
      true
      );
    }
  }
}










  // this.isPigDead = false;
  // this.pig = this.add.sprite(410, 350, "pigSpriteSheet");
  // this.physics.add.existing(this.pig);
  // this.pig.body.setSize(16, 16);
  // this.pig.play({
  //   key: "pig-Idle",
  //   repeat: -1, 
  // });
  // this.pig.setTexture("pigSpriteSheet", 11);




  // Pig Guard Feature
  // pigGuardSpeed = 100
  //   const pigGuard = () => {
  //     if(this.body.blocked.left || this.body.blocked.right ) {
  //        
  //       this.body.setVelocityX(pigGuardSpeed)
  //       
  //     }
  //     this.body.setVelocityX(pigGuardSpeed)
  //   }





  // FullScreen Version one
   // const distanceX = Math.abs(king.x - this.x);
    // const distanceY = Math.abs(king.y - this.y);
  
    // if (king.x > this.x && !king.isDead && !this.isDead && distanceX < 150) {
    //   this.runRight();
    // } else if (king.x < this.x && !king.isDead && !this.isDead && distanceX < 150) {
    //   this.runLeft();
    // } else if (!this.isDead && king.isDead) {
    //   this.body.setVelocity(0, 0);
    //   this.play({ 
    //     key: "pig-Jump",
    //     repeat: -1
    //   }, 
    //   true
    //   );
    // }

    // if (king.y > this.y && !king.isDead && !this.isDead && distanceY < 150) {
    //   this.body.setVelocityY(60);
    // } else if (king.y < this.y && !king.isDead && !this.isDead && distanceY < 150) {
    //   this.body.setVelocityY(-60);
    // }
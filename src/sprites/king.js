import Phaser from "phaser";

export default class King extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene)
    this.isDead = false;
    this.isAttacking = false;
    this.moveSpeed = 100;
    this.jumpVelocity = 270;

    scene.add.existing(this);
    scene.physics.add.existing(this); 
    this.body.setSize(30, 30);
    // this.body.setOffset(35, 35);
    // this.setPosition(500, 1000);
    // this.setScale(3);

    this.play({
      key: "king-Idle",
      repeat: -1
    });

    this.on("animationcomplete", (animation) => {
      if (animation.key === "king-Attack") {
        this.isAttacking = false
      }
    });

    this.attackZone = scene.add.zone(0, 0, 16, 20); 
    scene.physics.add.existing(this.attackZone);
    this.attackZone.body.allowGravity = false;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyJ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
  }

  dead() { 
    this.isDead = true;
    this.body.setVelocity(0, 0);
    this.play({
      key: "king-Dead",
      repeat: 0
    })
  }

  updateSideScroll() { 
    if (!this.isDead) {
        // Left Run
      if (this.cursors.left.isDown) {
        this.setFlipX(true);
        this.body.setVelocityX(-this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          }, 
          true
          ); 
        } 
      }
      // Right Run
      if (this.cursors.right.isDown) {
        this.setFlipX(false);
        this.body.setVelocityX(this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          },
          true
          ); 
        }
      }

      if (this.cursors.left.isUp && this.cursors.right.isUp) { 
        this.body.setVelocityX(0);
        if (!this.isAttacking) {
          this.play({
            key: "king-Idle",
            repeat: -1,
          },
          true
          ); 
        }
      }
      
      // Jump
      if (this.cursors.up.isDown && this.body.onFloor()) {
        this.body.setVelocityY(-this.jumpVelocity);
        // this.play({
        //   key:"king-Jump",  
        //   repeat: -1,
        // },true); 
      }
      // Jump face changing 
      if (this.body.velocity.y < 0) {
        if (!this.isAttacking) {
        this.setTexture("kingSpriteSheet", 11)
        }
      }
      if (this.body.velocity.y > 0) { 
        if (!this.isAttacking) {
          this.setTexture("kingSpriteSheet", 12)
          }
      }


      // Attack
      if (this.cursors.space.isDown && !this.isAttacking) {
        this.isAttacking = true; 
        this.play(
          {
            key: "king-Attack",
            repeat: 0
          }, 
          true
        );
      }
      
      // king Attack Zone
      if (this.flipX) {
        this.attackZone.x = this.x - 36;
        this.attackZone.y = this.y
      } else {
        this.attackZone.x = this.x + 36;
        this.attackZone.y = this.y
      }
  
    }
    
    if (this.keyJ.isDown && this.isDead) {
      this.isDead = false;
    }
  }

  updateFullScreen() { 
    if (!this.isDead) {
        // Left Run
      if (this.cursors.left.isDown) {
        this.setFlipX(true);
        this.body.setVelocityX(-this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          }, 
          true
          ); 
        } 
      }
      // Right Run
      if (this.cursors.right.isDown) {
        this.setFlipX(false);
        this.body.setVelocityX(this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          },
          true
          ); 
        }
      }
      
      // Up Run
      if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          },
          true
          );
        }
      }

      // Down Run
      if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.moveSpeed);
        if (!this.isAttacking) {
          this.play({
            key: "king-Run",
            repeat: -1,
          },
          true
          );
        } 
      }
      // Think about anime-key issue: Happens when "king-Run" replace "king-attack"
       
      // Stand Still
      if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) { 
        this.body.setVelocity(0, 0);
        if (!this.isAttacking) {
          this.play({
            key: "king-Idle",
            repeat: -1,
          },
          true
          ); 
        }
      }
     
      // Attack
      if (this.cursors.space.isDown && !this.isAttacking) {
        this.isAttacking = true; 
        this.play(
          {
            key: "king-Attack",
            repeat: 0
          }, 
          true
        );
      }
      
      // king Attack Zone
      if (this.flipX) {
        this.attackZone.x = this.x - 36;
        this.attackZone.y = this.y
      } else {
        this.attackZone.x = this.x + 36;
        this.attackZone.y = this.y
      }
  
    }
    
    if (this.keyJ.isDown && this.isDead) {
      this.isDead = false;
    }
  }
}

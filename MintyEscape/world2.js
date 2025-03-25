class world2 extends Phaser.Scene {
  constructor() {
    super({
      key: "world2",
    });
    this.checkpointX = 300; // Default starting position
    this.checkpointY = 700;
    this.score = 0; // Initialize score
    // Put global variable here
  }  

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("world2", "assets/parkourMap2.json");

    // Step 2 : Preload any images here


    this.load.image("villagePropsImg", "assets/Village_Props/Texture_2/TX-Village-Props.png");
    this.load.image("swampImg", "assets/Swamp/1_Tiles/Tileset.png");
    this.load.image("bg1Img", "assets/bg1.png");
    this.load.image("bg2Img", "assets/bg2.png");
    this.load.image("bg3Img", "assets/bg3.png");
    this.load.image("bg4Img", "assets/bg4.png");
    this.load.image("bg5Img", "assets/bg5.png");
    this.load.image("bg6Img", "assets/bg6.png");
    this.load.image("7Estore", "assets/7Estore.png");
    this.load.image("dangerSign", "assets/dangerSign.png");
    this.load.image("bewareSign", "assets/bewareSign.png");

    this.load.spritesheet("player", "assets/lolaHiker.png", {
      frameWidth: 40,
      frameHeight: 58,
    });
    this.load.spritesheet("ciggarCanon", "assets/ciggarCanon.png", {
      frameWidth: 98.07,
      frameHeight: 70,
    });
    this.load.spritesheet("smokeBullet", "assets/smokeBullet.png", {
      frameWidth: 65.17,
      frameHeight: 54,
    });
    this.load.spritesheet("excelMint", "assets/excelMint.png", {
      frameWidth: 57.25,
      frameHeight: 58,
      endFrame: 2
    });
    this.load.spritesheet("ciggarPack", "assets/ciggarPack.png", {
      frameWidth: 57.25,
      frameHeight: 67,
    });

    //audios

    // collect mint sound
    this.load.audio('mintCollectSound', 'assets/collectMint.mp3');
    this.load.audio('ciggarDamageSound', 'assets/ciggarDamage.mp3');
    this.load.audio('bgSong', 'assets/bgSong.mp3');
    this.load.audio('mountainBgSound', 'assets/mountainBgSound.mp3');
    this.load.audio('switchSound', 'assets/switchSound.mp3');
    this.load.audio('resetSound', 'assets/resetSound.mp3');
  }

  collectMint(player, mint) {
    mint.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText(`${this.score}/4`);

    if (this.sound.context.state === 'running') {
      this.mintCollectSound.play();
    }
    console.log("Mint collected!");
  }

  create() {
    console.log('*** world2 scene');

    // Initialize audio context
    this.sound.pauseOnBlur = false;
    
    // Create all sounds but don't play them yet
    this.mountainBgSound = this.sound.add('mountainBgSound', {
      loop: true,
      volume: 0.5
    });

    this.mintCollectSound = this.sound.add('mintCollectSound');
    this.ciggarDamageSound = this.sound.add('ciggarDamageSound');
    this.switchSound = this.sound.add('switchSound');
    this.resetSound = this.sound.add('resetSound');

    // Wait for first user interaction to start audio
    this.input.once('pointerdown', () => {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }
      this.mountainBgSound.play();
    });

    // Remove duplicate audio context initialization
    // this.sound.pauseOnBlur = false;
    // if (this.sound.context.state === 'suspended') {
    //   this.sound.context.resume();
    // }

    // Step 3 - Create the map from main
    let map = this.make.tilemap({key: "world2"});

    // Step 4 Load the game tiles with correct tile sizes
    let groundTiles = map.addTilesetImage("Tileset", "swampImg", 32, 32);
    let prop1Tiles = map.addTilesetImage("TX Village Props", "villagePropsImg", 32, 32);
    
    // Set specific tile sizes for background layers
    let bg1Tiles = map.addTilesetImage("bg1", "bg1Img", 32, 32);
    let bg2Tiles = map.addTilesetImage("bg2", "bg2Img", 32, 32);
    let bg3Tiles = map.addTilesetImage("bg3", "bg3Img", 32, 32);
    let bg4Tiles = map.addTilesetImage("bg4", "bg4Img", 32, 32);
    let bg5Tiles = map.addTilesetImage("bg5", "bg5Img", 32, 32);
    let bg6Tiles = map.addTilesetImage("bg6", "bg6Img", 32, 32);

    
    // Step 5  create an array of tiles

    let tilesArray = [
      groundTiles, 
      prop1Tiles, 
      bg1Tiles, 
      bg2Tiles, 
      bg3Tiles, 
      bg4Tiles, 
      bg5Tiles, 
      bg6Tiles
  ];

  this.sound.pauseOnBlur = false;
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
    }

    // Step 6  Load in layers by layers

    // layers tiles
this.bg1Layer = map.createLayer("bg1", tilesArray, 0, 0);
this.bg2Layer = map.createLayer("bg2", tilesArray, 0, 0);
this.bg3Layer = map.createLayer("bg3", tilesArray, 0, 0);
this.bg4Layer = map.createLayer("bg4", tilesArray, 0, 0);
this.bg5Layer = map.createLayer("bg5", tilesArray, 0, 0);
this.bg6Layer = map.createLayer("bg6", tilesArray, 0, 0);
this.add.image(200,315, "7Estore").setOrigin(0.1, 0.1).setScale(0.35);
this.add.image(620,580, "dangerSign").setOrigin(0.1, 0.1).setScale(0.15);
this.add.image(1910,520, "bewareSign").setOrigin(0.1, 0.1).setScale(0.15);
this.groundLayer = map.createLayer("groundTile", tilesArray, 0, 0);
this.flowerLayer = map.createLayer("flowerTile", tilesArray, 0, 0);
this.bushesLayer = map.createLayer("bushesTile", tilesArray, 0, 0);
this.wireLayer = map.createLayer("wireTile", tilesArray, 0, 0);
this.rocksLayer = map.createLayer("rocksTile", tilesArray, 0, 0);
this.signLayer = map.createLayer("signTile", tilesArray, 0, 0);

// excelMints
this.excelMint = this.physics.add.group();

// Manually add each mint at specific locations
let mintPositions = [
  { x: 1040, y: 700 }, // 1st mint
  { x: 1680, y: 620 }, // 2nd mint
  { x: 2350, y: 350 }, // 3rd mint
  { x: 3250, y: 400 }, // 4th mint
  { x: 3700, y: 570 }, // 5th mint extra
];

// excelMints collectable singular
mintPositions.forEach((pos) => {
  let mint = this.excelMint.create(pos.x, pos.y, "excelMint");
  mint.setCollideWorldBounds(true);
  mint.setBounce(0.3);
  mint.body.setAllowGravity(false);
});

// player spawn
this.player = this.physics.add.sprite(300, 700, "player"); // Adjust starting position
this.player.setCollideWorldBounds(true);



// Set up the next level trigger at specific coordinates
this.nextLevelTrigger = this.physics.add.staticSprite(3800, 570, "trigger");
this.nextLevelTrigger.setAlpha(0); // Make invisible

// Add overlap detection between player and trigger
this.physics.add.overlap(this.player, this.nextLevelTrigger, this.nextLevel, null, this);
    

//gravity
this.physics.world.gravity.y = 1000; // Adjust gravity as needed

// Enable collision on the ground layer
this.groundLayer.setCollisionByExclusion([-1]);

// Collide player with the ground layer
this.physics.add.collider(this.player, this.groundLayer);

// camera settings
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
this.cursors = this.input.keyboard.createCursorKeys(); // capture arrow keys

// Camera follows player
this.cameras.main.startFollow(this.player, true, 0.2, 0.2);


    // create animations (only if they don't exist)
    if (!this.anims.exists('left')) {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.anims.exists('right')) {
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.anims.exists('jump')) {
      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
        frameRate: 10,
        repeat: 0,
      });
    }

    if (!this.anims.exists('idle')) {
      this.anims.create({
        key: "idle",
        frames: [{ key: "player", frame: 8 }],
        frameRate: 10,
      });
    }
    
    if (!this.anims.exists('mintJump')) {
      this.anims.create({
        key: "mintJump",
        frames: this.anims.generateFrameNumbers("excelMint", { start: 0, end: 2 }), 
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.anims.exists('ciggarPackFloat')) {
      this.anims.create({
        key: "ciggarPackFloat",
        frames: this.anims.generateFrameNumbers("ciggarPack", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
      });
    }

    this.excelMint.children.iterate((mint) => {
      mint.setCollideWorldBounds(true);
      mint.setBounce(0.3);
      mint.play("mintJump");
    });
    

    // collectable dissapear
this.physics.add.overlap(this.player, this.excelMint, this.collectMint, null, this);
    
// white rect
this.scoreBox = this.add.rectangle(480, 40, 250, 90, 0xffffff).setScrollFactor(0);

// mint count
this.scoreText = this.add.text(500, 20, "0/4", {
  fontSize: "40px",
  fill: "#000",
  fontFamily: "Hitchcut",
  fontWeight: "bold",
}).setScrollFactor(0);

// excelMint beside score
this.mintIcon = this.add.sprite(430, 50, "excelMint").setScrollFactor(0);
this.mintIcon.play("mintJump"); // Ensure animation is set
this.mintIcon.setScale(1.6);



// Enemy cigarette packs
this.ciggarPack = this.physics.add.group();

// enemy positions
let enemyPositions = [
  //{ x: 2590, y: 400 },
  { x: 1680, y: 750 },
  { x: 3220, y: 640 },
  //{ x: 3700, y: 400 },
];

// Create enemies at specified positions
enemyPositions.forEach((pos) => {
  let enemy = this.ciggarPack.create(pos.x, pos.y, "ciggarPack");
  enemy.setCollideWorldBounds(true);
  enemy.setBounce(0.3);
  enemy.body.setAllowGravity(false);
});

// Play animation for all cigarette packs
this.ciggarPack.children.iterate((pack) => {
  pack.play("ciggarPackFloat");
});

// Add collision between enemies and ground
this.physics.add.collider(this.ciggarPack, this.groundLayer);
// this.physics.add.collider(this.ciggarPack, this.prop2Layer);

// Add overlap with player for damage
this.physics.add.overlap(this.player, this.ciggarPack, this.takeDamage, null, this);

// Create cigarette cannons
this.ciggarCanon = this.physics.add.group();

// Positions for the cannons
let canonPositions = [
  { x: 2630, y: 670 },
];

// each cannon specified positions
canonPositions.forEach((pos) => {
  let canon = this.ciggarCanon.create(pos.x, pos.y, "ciggarCanon");
  canon.setImmovable(true);
  canon.body.setAllowGravity(false);
  canon.lastFired = 0;  // Track when this cannon last fired
});

    // cannon animations
    if (!this.anims.exists('canonIdle')) {
      this.anims.create({
        key: "canonIdle",
        frames: this.anims.generateFrameNumbers("ciggarCanon", { start: 13, end: 0 }),
        frameRate: 7,
        repeat: -1
      });
    }

    // Create animations for the smoke bullet
    if (!this.anims.exists('smokeBulletAnim')) {
      this.anims.create({
        key: "smokeBulletAnim",
        frames: this.anims.generateFrameNumbers("smokeBullet", { start: 4, end: 0 }),
        frameRate: 5,
        repeat: -1
      });
    }

// Create a group for the smoke bullets
this.smokeBullets = this.physics.add.group();

// Add collisions for the cannons
this.physics.add.collider(this.ciggarCanon, this.groundLayer);
// this.physics.add.collider(this.ciggarCanon, this.prop2Layer);

// Add collision between smoke bullets and player
this.physics.add.overlap(this.player, this.smokeBullets, this.takeDamage, null, this);

this.ciggarCanon.children.iterate((canon) => {
  canon.play("canonIdle");

  canon.on("animationupdate", (anim, frame) => {
      if (frame.index === 1 && !canon.isPaused) {
          canon.isPaused = true;
          canon.anims.pause();  // Pause animation at frame 1 (idle)

          this.time.delayedCall(5000, () => {
              canon.isPaused = false;
              canon.anims.resume(); // Resume animation after 4 seconds
          });
      }
      this.debugText = this.add.text(10, 70, "", { fontSize: '16px', fill: '#fff' }).setScrollFactor(0);
  });
});

this.physics.world.drawDebug = false; 
 
// text for mint requirement message (initially invisible)
this.mintRequirementText = this.add
.text(290, 120, "", {
  fontSize: "30px",
  fill: "#ffffff",
  fontFamily: "Hitchcut",
  backgroundColor: "red",
  padding: { x: 10, y: 5 }
})
.setScrollFactor(0)
.setDepth(2000)
.setVisible(false);

this.restartText = this.add
        .text(480, 190, "", {
            fontSize: "25px",
            fill: "#000000",
            fontFamily: "Hitchcut",
            align: 'center'
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(2000)
        .setVisible(false);

// restart at spawn
this.rKeyPressed = 0;  // Track R key presses
this.lastRKeyTime = 0;  // Track timing of R key presses
this.rKey = this.input.keyboard.addKey('R');  // Add R key input

// Destroy any existing music controller from previous scene
if (this.scene.get('world1').musicController) {
  this.scene.get('world1').musicController.destroy();

  
}

this.fallText = this.add
        .text(353, 120, "", {
            fontSize: "30px",
            fill: "#ffffff",
            fontFamily: "Hitchcut",
            backgroundColor: "red",
            padding: { x: 10, y: 5 }
        })
        .setScrollFactor(0)
        .setDepth(2000)
        .setVisible(false);

// Add menu button
this.menuButton = this.add.text(50, 50, 'MENU', {
  fontSize: '25px',
  fontFamily: 'Hitchcut',
  fill: '#1A3449',
  backgroundColor: '#ffffff',
  padding: { x: 15, y: 5 }
})
.setScrollFactor(0)
.setInteractive()
.setDepth(2000);

// Add submenu buttons (initially invisible)
this.homeButton = this.add.text(50, 100, 'Exit', {
  fontSize: '20px',
  fontFamily: 'Hitchcut',
  fill: '#ffffff',
  backgroundColor: '#1A3449',
  padding: { x: 15, y: 5 }
})
.setScrollFactor(0)
.setInteractive()
.setDepth(2000)
.setVisible(false);

this.guideButton = this.add.text(50, 140, 'Guide', {
  fontSize: '20px',
  fontFamily: 'Hitchcut',
  fill: '#ffffff',
  backgroundColor: '#1A3449',
  padding: { x: 15, y: 5 }
})
.setScrollFactor(0)
.setInteractive()
.setDepth(2000)
.setVisible(false);

this.closeButton = this.add.text(game.config.width - 50, 30, 'X', {
  fontSize: '25px',
  fontFamily: 'Hitchcut',
  fill: '#ffffff',
  backgroundColor: '#1A3449',
  padding: { x: 10, y: 5 }
})
.setOrigin(0.5)
.setInteractive()
.setDepth(2000);

// Close button handler
this.closeButton.on('pointerdown', () => {
  if (this.sound.get('switchSound')) {
      this.sound.play('switchSound', { volume: 1 });
  }
  this.scene.resume('world2');  // Resume the game scene
  this.scene.stop();  // Stop this overlay scene
});


// Menu button click handler
this.menuButton.on('pointerdown', () => {
  if (this.sound.get('switchSound')) {
    this.sound.play('switchSound', { volume: 1 });
  }
  this.homeButton.setVisible(!this.homeButton.visible);
  this.guideButton.setVisible(!this.guideButton.visible);
});

// Home button click handler
this.homeButton.on('pointerdown', () => {
  console.log('Home button clicked');
  if (this.sound.get('switchSound')) {
    this.sound.play('switchSound', { volume: 1 });
  }
  if (this.mountainBgSound) {
    this.mountainBgSound.stop();
  }
  this.scene.start('main');
});

// Guide button click handler
this.guideButton.on('pointerdown', () => {
  console.log('Guide button clicked');
  if (this.sound.get('switchSound')) {
    this.sound.play('switchSound', { volume: 1 });
  }
  this.scene.launch('storyboardW2');
  this.scene.pause();
});

// Close button handler
this.closeButton.on('pointerdown', () => {
  if (this.sound.get('switchSound')) {
    this.sound.play('switchSound', { volume: 1 });
  }
  this.scene.resume('world2');
  this.scene.stop();
});



this.musicController = new MusicController(this);

  } /////////////////// end of create //////////////////////////////


  
  nextLevel(player, trigger) {
    console.log("Next level reached!");
    if(this.score >= 4) {
        if (this.mountainBgSound) {
            this.mountainBgSound.stop();
        }
        this.scene.start("Level3Reminder");
        this.scene.stop(); // Stop current scene immediately
    } else {
        const mintsNeeded = 4 - this.score;
        this.mintRequirementText.setText(`Oh no! I need ${mintsNeeded} more mint${mintsNeeded > 1 ? 's' : ''}!`);
        this.mintRequirementText.setVisible(true);
        
        this.time.delayedCall(2000, () => {
            this.mintRequirementText.setVisible(false);
        });
    }
}

  update() {
    let speedFactor = this.player.body.velocity.x * 0.0005;

    if (this.player.y > 900) {
      this.playerFallDamage();
    }

    // Set parallax effect for background layers
    this.bg1Layer.setScrollFactor(0.5);
    this.bg2Layer.setScrollFactor(0.6);
    this.bg3Layer.setScrollFactor(0.7);
    this.bg4Layer.setScrollFactor(0.8);
    this.bg5Layer.setScrollFactor(0.9);
    this.bg6Layer.setScrollFactor(1);

    // Player movement
    let moving = false;

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-180);
        this.player.anims.play("left", true);
        moving = true;
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(180);
        this.player.anims.play("right", true);
        moving = true;
    } else {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-600);
        this.player.anims.play("jump", true);
        moving = true;
    }

    if (!moving) {
        this.player.anims.play("idle", true);
    }

    // Handle cannon firing
    const time = this.time.now;

    this.ciggarCanon.children.iterate((canon) => {
        if (time > (canon.lastFired || 0) + 6100) {
            let bullet = this.smokeBullets.create(canon.x - 10, canon.y - 12, "smokeBullet");
            bullet.play("smokeBulletAnim");
            bullet.setVelocityX(-130);
            bullet.body.setAllowGravity(false);
            bullet.setCollideWorldBounds(false);

            this.time.delayedCall(4000, () => {
                if (bullet.active) {
                    bullet.destroy();
                }
            });

            canon.lastFired = time;
        }
    });

    // Restart at spawn
    if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
      const currentTime = this.time.now;
      
      if (currentTime - this.lastRKeyTime < 500) {
          this.player.setPosition(300, 700);
          this.player.setVelocity(0, 0);
          this.score = 0;
          this.scoreText.setText("0/4");
          this.resetCollectables();
          this.sound.play('resetSound');
      }
      this.lastRKeyTime = currentTime;
    }
  }

// Define collectMint function
collectMint(player, mint) {
  mint.disableBody(true, true); // Hide the mint
  this.score += 1; // Increase score
  this.scoreText.setText(`${this.score}/4`); // Update UI

  // Play collect sound
  this.sound.play('mintCollectSound');

  // Flash player turquoise
  this.player.setTint(0x7cf3f7);

  // Reset player color after a short delay
  this.time.delayedCall(500, () => {
      this.player.clearTint();
  });

  console.log("Mint collected! Score: " + this.score);
}

// Define takeDamage function
takeDamage(player, enemy) {
    enemy.disableBody(true, true); // Remove the enemy

    // Play damage sound
    this.sound.play('ciggarDamageSound');

    // Flash player red
    this.player.setTint(0xff0000);
    this.cameras.main.shake(300, 0.02);

    // Decrease the score by 1 but don't go below 0
    if (this.score > 0) {
        this.score -= 1;
    }

    this.scoreText.setText(`${this.score}/4`);

    // Ensure UI elements stay on top
    this.scoreBox.setDepth(1000);
    this.mintIcon.setDepth(1000);
    this.scoreText.setDepth(1000);

    // Reset player color after a short delay
    this.time.delayedCall(500, () => {
        this.player.clearTint();
    });

    console.log("Hit by enemy! Score decreased to: " + this.score);
  }

// Define playerFallDamage function
playerFallDamage() {
  // Play damage sound
  this.sound.play('ciggarDamageSound');
  
  // Flash player red
  this.player.setTint(0xff0000);
  
  // Camera shake effect
  this.cameras.main.shake(300, 0.02);
  
  // Reset score to 0
  this.score = 0;
  this.scoreText.setText("0/4"); // score after fall damage

  // Show fall message
  this.fallText.setText("Oops! I tripped~");
  this.fallText.setVisible(true);

  this.time.delayedCall(2000, () => {
    this.fallText.setVisible(false);
});
  
  // Respawn player at starting position
  this.player.setPosition(300, 700);
  this.player.setVelocityX(0);
  this.player.setVelocityY(0);
  
  // Reset player color after a short delay
  this.time.delayedCall(500, () => {
      this.player.clearTint();
  });
  
  // Reset all collectables
  this.resetCollectables();
  
  console.log("Player died! Game reset with score: 0");
}

// Add this new function to reset collectables
resetCollectables() {
  // Reset Excel Mints
  this.excelMint.clear(true, true); // Remove all existing mints
  
  // Re-create mints at their original positions
  let mintPositions = [
    { x: 1040, y: 700 }, // 1st mint
    { x: 1680, y: 620 }, // 2nd mint
    { x: 2350, y: 350 }, // 3rd mint
    { x: 3250, y: 400 }, // 4th mint
    { x: 3700, y: 570 }, // 5th mint extra
  ];
  
  mintPositions.forEach((pos) => {
    let mint = this.excelMint.create(pos.x, pos.y, "excelMint");
    mint.setCollideWorldBounds(true);
    mint.setBounce(0.3);
    mint.body.setAllowGravity(false);
    mint.play("mintJump"); // Restart animation
  });
  
  // Also reset enemies if needed
  this.ciggarPack.clear(true, true);
  let enemyPositions = [
    { x: 1680, y: 750 },
    { x: 3220, y: 640 },
  ];
  
  enemyPositions.forEach((pos) => {
    let enemy = this.ciggarPack.create(pos.x, pos.y, "ciggarPack");
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(0.3);
    enemy.body.setAllowGravity(false);
    enemy.play("ciggarPackFloat");
  });
  
  // Reset score text to 0/4
  this.scoreText.setText("0/4");
}
}

  /////////////////// end of update //////////////////////////////

 //////////// end of class world ////////////////////////

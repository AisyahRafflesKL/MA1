class world1 extends Phaser.Scene {
  constructor() {
    super({
      key: "world1",
    });

    this.score = 0; // Initialize score
    // Put global variable here
  }

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("world1", "assets/parkourMap1.json");

    // Step 2 : Preload any images here

    this.load.image("bg1", "assets/bg1-m1.png");
    this.load.image("bg2", "assets/bg2-m1.png");
    this.load.image("bg3", "assets/bg3-m1.png");
    this.load.image("signs", "assets/signs-m1.png");
    this.load.image("colorOverlay", "assets/colorOverlay-m1.png");
    this.load.image("carts", "assets/carts-m1.png");
    this.load.image("groundTile", "assets/floor-m1.png");
    this.load.image("ceiling", "assets/ceiling-m1.png");
    this.load.image("controlreminder2", "assets/controlreminder2.png");

    this.load.spritesheet("player", "assets/lolaHiker.png", {
      frameWidth: 40,
      frameHeight: 58,
    });
    this.load.spritesheet("smokeBullet", "assets/smokeBullet.png", {
      frameWidth: 65.17,
      frameHeight: 54,
    });
    this.load.spritesheet("excelMint", "assets/excelMint.png", {
      frameWidth: 57.25,
      frameHeight: 58,
    });
    this.load.spritesheet("ciggarPack", "assets/ciggarPack.png", {
      frameWidth: 57.25,
      frameHeight: 67,
    });
    this.load.spritesheet("controlreminder", "assets/controlreminder.png", {
      frameWidth: 757.33,
      frameHeight: 678,
    });
    this.load.spritesheet("exit", "assets/exit.png", {
      frameWidth: 484.5,
      frameHeight: 381,
    });

    // audio

    // mint collect sound
    this.load.audio("mintCollectSound", "assets/collectMint.mp3");
    this.load.audio("ciggarDamageSound", "assets/ciggarDamage.mp3");
    this.load.audio("bgSong", "assets/bgSong.mp3");
    this.load.audio("mountainBgSound", "assets/mountainBgSound.mp3");
  }

  collectMint(player, mint) {
    mint.disableBody(true, true);
    console.log("Mint collected!");
  }

  create() {
    console.log("*** world1 scene");

    let map = this.make.tilemap({ key: "world1" });

    // Step 4 Load the game tiles

    let groundTile = map.addTilesetImage("floor-m1", "groundTile");
    let ceiling = map.addTilesetImage("ceiling-m1", "ceiling");
    let bg1 = map.addTilesetImage("bg1-m1", "bg1");
    let bg2 = map.addTilesetImage("bg2-m1", "bg2");
    let bg3 = map.addTilesetImage("bg3-m1", "bg3");
    let signs = map.addTilesetImage("signs-m1", "signs");
    let colorOverlay = map.addTilesetImage("colorOverlay-m1", "colorOverlay");
    let carts = map.addTilesetImage("carts-m1", "carts");

    // Step 5  create an array of tiles
    let tilesArray = [
      groundTile,
      ceiling,
      bg1,
      bg2,
      bg3,
      signs,
      colorOverlay,
      carts,
    ];

    // Step 6  Load in layers by layers

    // layers tiles

    this.bg1 = map.createLayer("bg1Tile", tilesArray, 0, 0);
    this.bg2 = map.createLayer("bg2Tile", tilesArray, 0, -110);
    this.colorOverlay = map.createLayer("colorOverlayTile", tilesArray, 0, 0);
    this.bg3 = map.createLayer("bg3Tile", tilesArray, 0, 0);
    this.carts = map.createLayer("cartsTile", tilesArray, 0, 0);
    this.groundTile = map.createLayer("groundTile", tilesArray, 0, 0);
    this.ceiling = map.createLayer("ceilingTile", tilesArray, 0, -50);
    this.signs = map.createLayer("signsTile", tilesArray, 0, 0);

    this.anims.create({
      key: "exitAnim",
      frames: this.anims.generateFrameNumbers("exit", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1,
    });

    // Create static collision boxes for carts
    this.cartColliders = this.physics.add.staticGroup();

    // Add collision boxes at specific cart locations
    const cartBoxes = [
      { x: 464, y: 850, width: 20, height: 15 },
      { x: 899, y: 850, width: 20, height: 15 },
      { x: 1024, y: 850, width: 20, height: 15 },
      { x: 1315, y: 850, width: 20, height: 15 },
      { x: 1787, y: 850, width: 20, height: 15 },
      { x: 2219, y: 850, width: 20, height: 15 },
      { x: 2507, y: 850, width: 20, height: 15 },
      { x: 2744, y: 850, width: 20, height: 15 },
      { x: 2856, y: 850, width: 20, height: 15 },
    ];

    cartBoxes.forEach((box) => {
      const collider = this.cartColliders.create(box.x, box.y);
      collider.setSize(box.width, box.height);
      collider.setImmovable(true);
      collider.setVisible(false); // Make collision box invisible
    });

    // Initialize player spawn
    this.player = this.physics.add.sprite(100, 740, "player");
    this.player.setCollideWorldBounds(true);

    // Add collision between player and cart boxes
    this.physics.add.collider(this.player, this.cartColliders);

    // Set up the next level trigger at specific coordinates
    this.nextLevelTrigger = this.physics.add.staticSprite(3174, 835, "trigger");
    this.nextLevelTrigger.setAlpha(0); // Make invisible

    // Add overlap detection between player and trigger
    this.physics.add.overlap(
      this.player,
      this.nextLevelTrigger,
      this.nextLevel,
      null,
      this
    );

    ////////////////////////////// ELEMENTS //////////////////////////////

    // excelMints
    this.excelMint = this.physics.add.group();

    // Set gravity
    this.physics.world.gravity.y = 1000;

    // Camera settings
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.4);
    this.cameras.main.followOffset.set(-50, -50);

    // Manually add each mint at specific locations
    let mintPositions = [
      { x: 460, y: 720 }, // 1st mint
      { x: 958, y: 720 }, // 2nd mint
      { x: 1550, y: 720 }, // 3rd mint
      { x: 3057, y: 750 }, // 4th mint
      { x: 2617, y: 720 }, // 5th mint
    ];

    // excelMints collectable singular
    mintPositions.forEach((pos) => {
      let mint = this.excelMint.create(pos.x, pos.y, "excelMint");
      mint.setCollideWorldBounds(true);
      mint.setBounce(0.3);
      mint.body.setAllowGravity(false);
    });

    // Enable collision on the ground layer
    this.groundTile.setCollisionByProperty({ collides: true });

    // Collide player with the ground layer
    this.physics.add.collider(this.player, this.groundTile);

    // Capture arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // create animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: 8 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "mintJump", // Name of the animation
      frames: this.anims.generateFrameNumbers("excelMint", {
        start: 0,
        end: 5,
      }), // Adjust start and end based on your spritesheet
      frameRate: 10, // Adjust speed
      repeat: -1, // Loop indefinitely
    });
    this.excelMint.children.iterate((mint) => {
      mint.setCollideWorldBounds(true);
      mint.setBounce(0.3);
      mint.setScale(0.8); // mint size for map 1
      mint.play("mintJump");
    });
    this.anims.create({
      key: "controlreminderAnim", // Name of the animation
      frames: this.anims.generateFrameNumbers("controlreminder", {
        start: 5, // Start frame
        end: 0, // End frame (adjust based on your spritesheet)
      }),
      frameRate: 5, // Speed of the animation
      repeat: -1, // Loop indefinitely
    });

    // dont bump into ground layer
    this.groundTile.setCollisionByExclusion([-1]);

    // collectable dissapear
    this.physics.add.overlap(
      this.player,
      this.excelMint,
      this.collectMint,
      null,
      this
    );

    // white rect
    this.scoreBox = this.add
      .rectangle(480, 145, 255, 90, 0xffffff)
      .setScale(0.7)
      .setScrollFactor(0);
    this.scoreBox.setDepth(1000);

    // excelMint beside score
    this.mintIcon = this.add
      .sprite(440, 150, "excelMint")
      .setScrollFactor(0)
      .setDepth(1000)
      .play("mintJump")
      .setScale(1.2);

    // Enemy cigarette packs
    this.ciggarPack = this.physics.add.group();

    // enemy positions
    let enemyPositions = [
      { x: 1545, y: 830 },
      { x: 2020, y: 830 },
    ];

    // Create enemies at specified positions
    enemyPositions.forEach((pos) => {
      let enemy = this.ciggarPack.create(pos.x, pos.y, "ciggarPack");
      enemy.setCollideWorldBounds(true);
      enemy.setBounce(0.3);
      enemy.setScale(0.85); // enemy size for map 1
      enemy.body.setAllowGravity(false);
    });

    // Create ciggarPack animation
    this.anims.create({
      key: "ciggarPackFloat",
      frames: this.anims.generateFrameNumbers("ciggarPack", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Play animation for all cigarette packs
    this.ciggarPack.children.iterate((pack) => {
      pack.play("ciggarPackFloat");
    });

    // Add collision between enemies and ground
    this.physics.add.collider(this.ciggarPack, this.groundTile);

    // Add overlap with player for damage
    this.physics.add.overlap(
      this.player,
      this.ciggarPack,
      this.takeDamage,
      null,
      this
    );

    // Create a group for the smoke bullets
    this.smokeBullets = this.physics.add.group();

    // Add collision between smoke bullets and player
    this.physics.add.overlap(
      this.player,
      this.smokeBullets,
      this.takeDamage,
      null,
      this
    );

    this.debugText = this.add
      .text(10, 70, "", { fontSize: "16px", fill: "#fff" })
      .setScrollFactor(0);

    this.physics.world.drawDebug = false;

    // mint count
    this.scoreText = this.add
      .text(495, 130, "0/2", {
        fontSize: "35px",
        fill: "#000",
        fontFamily: "Hitchcut",
        fontWeight: "bold",
      })
      .setScale(0.8)
      .setScrollFactor(0)
      .setDepth(1000);

    // Add the controlreminder sprite
    this.controlreminder = this.add
      .sprite(200, 600, "controlreminder")
      .setScale(0.25); // Adjust position and scale as needed
    this.controlreminder2 = this.add
      .sprite(1830, 600, "controlreminder2")
      .setScale(0.25);

    // Play the animation
    this.controlreminder.play("controlreminderAnim");

    // Add text for mint requirement message (initially invisible)
    this.mintRequirementText = this.add
      .text(300, 200, "", {
        fontSize: "23px",
        fill: "#ffffff",
        fontFamily: "Hitchcut",
        letterSpacing: 12,
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setScrollFactor(0)
      .setDepth(2000)
      .setVisible(false);

    this.menuButton = this.add
      .text(100 + 80, 100 + 50, "MENU", {
        fontSize: "25px",
        fontFamily: "Hitchcut",
        fill: "#1A3449",
        backgroundColor: "#ffffff",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
      .setScale(1 / 1.4);

    // Add submenu buttons (initially invisible)
    this.homeButton = this.add
      .text(100 + 80, 150 + 40, "Exit", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
      .setScale(1 / 1.4)
      .setVisible(false);

    this.guideButton = this.add
      .text(100 + 80, 190 + 30, "Guide", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
      .setScale(1 / 1.4)
      .setVisible(false);

    // Menu button click handler
    this.menuButton.on("pointerdown", () => {
      if (this.sound.get("switchSound")) {
        this.sound.play("switchSound", { volume: 0.5 });
      }
      this.homeButton.setVisible(!this.homeButton.visible);
      this.guideButton.setVisible(!this.guideButton.visible);
    });

    // Home button click handler
    this.homeButton.on("pointerdown", () => {
      console.log("Home button clicked");
      if (this.sound.get("switchSound")) {
        this.sound.play("switchSound", { volume: 0.5 });
      }
      if (this.mountainBgSound) {
        this.mountainBgSound.stop();
      }
      this.scene.start("main");
    });

    // Guide button click handler
    this.guideButton.on("pointerdown", () => {
      console.log("Guide button clicked");
      if (this.sound.get("switchSound")) {
        this.sound.play("switchSound", { volume: 0.5 });
      }
      this.scene.launch("storyboardW1");
      this.scene.pause();
    });

    this.exit = this.add.sprite(3102, 700, "exit").setScale(0.25).setDepth(100);
    this.exit.play("exitAnim");

    this.musicController = new MusicController(this);
  } /////////////////// end of create //////////////////////////////

  nextLevel(player, trigger) {
    console.log("Next level reached!");
    if (this.score >= 2) {
      this.scene.start("Level2Reminder");
    } else {
      const mintsNeeded = 2 - this.score;
      this.mintRequirementText.setText(
        `Oh no! I need ${mintsNeeded} more mint${mintsNeeded > 1 ? "s" : ""}!`
      );
      this.mintRequirementText.setVisible(true);

      // Hide the message after 2 seconds
      this.time.delayedCall(2000, () => {
        this.mintRequirementText.setVisible(false);
      });
    }
  }

  update() {
    let speedFactor = this.player.body.velocity.x * 0.0005;

    // Set parallax effect for background layers
    this.bg1.setScrollFactor(0.5);
    this.bg2.setScrollFactor(0.6);
    this.ceiling.setScrollFactor(0.8);

    // Player movement
    let moving = false;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
      moving = true;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-500); // Jump force
      moving = true;
    }

    if (!moving) {
      this.player.anims.play("idle", true);
    }

    // Debugging logs
    console.log("Player velocity: ", this.player.body.velocity.x);
    console.log("Player position: ", this.player.x, this.player.y);
  }

  // Define collectMint function
  collectMint(player, mint) {
    mint.disableBody(true, true); // Hide the mint
    this.score += 1; // Increase score
    this.scoreText.setText(`${this.score}/2`); // Update UI

    // Play collect sound
    this.sound.play("mintCollectSound");

    // Flash player turquoise
    this.player.setTint(0x7cf3f7);

    // Reset player color after a short delay
    this.time.delayedCall(500, () => {
      this.player.clearTint();
    });

    console.log("Mint collected! Score: " + this.score);
  }

  //    Define takeDamage function
  takeDamage(player, enemy) {
    enemy.disableBody(true, true); // Remove the enemy
    this.sound.play("ciggarDamageSound");
    this.player.setTint(0xff0000);
    this.cameras.main.shake(300, 0.02);

    // Decrease the score by 1 but don't go below 0
    if (this.score > 0) {
      this.score -= 1;
    }

    this.scoreText.setText(`${this.score}/2`);

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
}

/////////////////// end of update //////////////////////////////

class world3 extends Phaser.Scene {
  constructor() {
    super({
      key: "world3",
    });

    this.score = 0; // Initialize score
    // Put global variable here
  }

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("world3", "assets/parkourMap3.json");

    // Step 2 : Preload any images here

    this.load.image(
      "villagePropsImg",
      "assets/Village_Props/Texture_2/TX-Village-Props.png"
    );
    this.load.image("swampImg", "assets/Swamp/1_Tiles/Tileset.png");
    this.load.image("bg1-02Img", "assets/bg1-02.png");
    this.load.image("bg2-02Img", "assets/bg2-02.png");
    this.load.image("bg3-02Img", "assets/bg3-02.png");
    this.load.image("bg4-02Img", "assets/bg4-02.png");
    this.load.image("bg5-02Img", "assets/bg5-02.png");
    this.load.image("bg6-02Img", "assets/bg6-02.png");
    this.load.image("dangerSign", "assets/dangerSign.png");
    this.load.image("bewareSign", "assets/bewareSign.png");
    this.load.image(
      "speechbubble_npcaunty",
      "assets/speechbubble_npcaunty.png"
    );

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
    });
    this.load.spritesheet("ciggarPack", "assets/ciggarPack.png", {
      frameWidth: 57.25,
      frameHeight: 67,
    });
    this.load.spritesheet("npcaunty", "assets/npc_aunty.png", {
      frameWidth: 31.47,
      frameHeight: 47.06,
    });

    //audios

    // collect mint sound
    this.load.audio("mintCollectSound", "assets/collectMint.mp3");
    this.load.audio("ciggarDamageSound", "assets/ciggarDamage.mp3");
    this.load.audio("bgSong", "assets/bgSong.mp3");
    this.load.audio("mountainBgSound", "assets/mountainBgSound.mp3");
    this.load.audio("switchSound", "assets/switchSound.mp3");
  }

  collectMint(player, mint) {
    mint.disableBody(true, true);
    console.log("Mint collected!");
  }

  create() {
    //console.log("*** world scene");
    console.log("*** world3 scene");

    let map = this.make.tilemap({ key: "world3" });

    // Step 4 Load the game tiles

    let groundTile = map.addTilesetImage("Tileset", "swampImg");
    let prop1Tiles = map.addTilesetImage("TX-Village-Props", "villagePropsImg");
    let bg1Tiles = map.addTilesetImage("bg1-02", "bg1-02Img");
    let bg2Tiles = map.addTilesetImage("bg2-02", "bg2-02Img");
    let bg3Tiles = map.addTilesetImage("bg3-02", "bg3-02Img");
    let bg4Tiles = map.addTilesetImage("bg4-02", "bg4-02Img");
    let bg5Tiles = map.addTilesetImage("bg5-02", "bg5-02Img");
    let bg6Tiles = map.addTilesetImage("bg6-02", "bg6-02Img");

    // Step 5  create an array of tiles
    let tilesArray = [
      groundTile,
      prop1Tiles,
      bg1Tiles,
      bg2Tiles,
      bg3Tiles,
      bg4Tiles,
      bg5Tiles,
      bg6Tiles,
    ];

    // Step 6  Load in layers by layers

    // layers tiles

    this.bg1Layer = map.createLayer("bg1-02", tilesArray, 0, 0);
    this.bg2Layer = map.createLayer("bg2-02", tilesArray, 0, 0);
    this.bg3Layer = map.createLayer("bg3-02", tilesArray, 0, 0);
    this.bg4Layer = map.createLayer("bg4-02", tilesArray, 0, 0);
    this.bg5Layer = map.createLayer("bg5-02", tilesArray, 0, 0);
    this.bg6Layer = map.createLayer("bg6-02", tilesArray, 0, 0);
    this.add.image(150, 400, "dangerSign").setOrigin(0.1, 0.1).setScale(0.15);
    this.add.image(840, 380, "bewareSign").setOrigin(0.1, 0.1).setScale(0.15);
    this.add.image(1834, 360, "bewareSign").setOrigin(0.1, 0.1).setScale(0.15);
    this.groundTile = map.createLayer("groundTile", tilesArray, 0, 0);
    this.prop4Layer = map.createLayer("slipperyTile", tilesArray, 0, 0);
    this.prop1Tiles = map.createLayer("decoTile", tilesArray, 0, 0);
    this.prop9Layer = map.createLayer("nextLevel", tilesArray, 0, 0);
    this.npcAunty = this.physics.add.sprite(2972, 547, "npcaunty");
    this.npcAunty.setScale(1.3);
    this.npcAunty.setCollideWorldBounds(true);
    this.npcAunty.body.setAllowGravity(false);

    // excelMints
    this.excelMint = this.physics.add.group();

    // Manually add each mint at specific locations
    let mintPositions = [
      { x: 463, y: 613 }, // 1st mint
      { x: 1003, y: 150 }, // 2nd mint
      { x: 2446, y: 485 }, // 3rd mint
      { x: 3044, y: 253 }, // 4th mint
      { x: 1621, y: 420 }, // 5th mint
      { x: 2014, y: 630 }, // 6th mint
      { x: 3976, y: 450 }, // 7th mint extra
      { x: 4368, y: 537 }, // 8th mint extra
      { x: 3596, y: 620 }, // 9th mint extra
    ];

    // excelMints collectable singular
    mintPositions.forEach((pos) => {
      let mint = this.excelMint.create(pos.x, pos.y, "excelMint");
      mint.setCollideWorldBounds(true);
      mint.setBounce(0.3);
      mint.body.setAllowGravity(false);
    });

    // player spawn
    this.player = this.physics.add.sprite(80, 500, "player"); // Adjust starting position
    this.player.setCollideWorldBounds(true);

    //gravity
    this.physics.world.gravity.y = 1000; // Adjust gravity as needed

    this.groundTile.setCollisionByProperty({ collides: true });

    // Collide player with the ground layer
    this.physics.add.collider(this.player, this.groundTile);
    this.physics.add.collider(this.player, this.prop4Layer);

    // camera settings
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
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
      mint.play("mintJump");
    });
    this.anims.create({
      key: "aunty_idle",
      frames: this.anims.generateFrameNumbers("npcaunty", { start: 0, end: 3 }), // Adjust frame range
      frameRate: 5, // Speed of animation
      repeat: -1, // Loop indefinitely
    });

    // dont bump into ground layer
    this.groundTile.setCollisionByExclusion([-1]);
    this.prop4Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.groundTile, this.prop4Layer);

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
      .rectangle(480, 40, 250, 90, 0xffffff)
      .setScrollFactor(0);

    // excelMint beside score
    this.mintIcon = this.add.sprite(430, 50, "excelMint").setScrollFactor(0);
    this.mintIcon.play("mintJump"); // Ensure animation is set
    this.mintIcon.setScale(1.6);

    // Enemy cigarette packs
    this.ciggarPack = this.physics.add.group();

    // enemy positions
    let enemyPositions = [
      { x: 2470, y: 310 },
      { x: 3361, y: 400 },
      { x: 4238, y: 575 },
    ];

    // Create enemies at specified positions
    enemyPositions.forEach((pos) => {
      let enemy = this.ciggarPack.create(pos.x, pos.y, "ciggarPack");
      enemy.setCollideWorldBounds(true);
      enemy.setBounce(0.3);
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

    // Create cigarette cannons
    this.ciggarCanon = this.physics.add.group();

    // Positions for the cannons
    let canonPositions = [
      { x: 1234, y: 510 },
      { x: 2683, y: 639 },
    ];

    // each cannon specified positions
    canonPositions.forEach((pos) => {
      let canon = this.ciggarCanon.create(pos.x, pos.y, "ciggarCanon");
      canon.setImmovable(true);
      canon.body.setAllowGravity(false);
      canon.lastFired = 0; // Track when this cannon last fired
    });

    // cannon animations
    this.anims.create({
      key: "canonIdle",
      frames: this.anims.generateFrameNumbers("ciggarCanon", {
        start: 14,
        end: 0,
      }),
      frameRate: 7,
      repeat: -1,
    });

    // Create animations for the smoke bullet
    this.anims.create({
      key: "smokeBulletAnim",
      frames: this.anims.generateFrameNumbers("smokeBullet", {
        start: 5,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    // Play the animation for all cannons
    this.ciggarCanon.children.iterate((canon) => {
      canon.play("canonIdle");
    });

    // Create a group for the smoke bullets
    this.smokeBullets = this.physics.add.group();

    // Add collisions for the cannons
    this.physics.add.collider(this.ciggarCanon, this.groundTile);
    this.physics.add.collider(this.ciggarCanon, this.prop2Layer);

    // Add collision between smoke bullets and player
    this.physics.add.overlap(
      this.player,
      this.smokeBullets,
      this.takeDamage,
      null,
      this
    );

    this.ciggarCanon.children.iterate((canon) => {
      canon.play("canonIdle");

      canon.on("animationupdate", (anim, frame) => {
        if (frame.index === 1 && !canon.isPaused) {
          canon.isPaused = true;
          canon.anims.pause(); // Pause animation at frame 1 (idle)

          this.time.delayedCall(5000, () => {
            canon.isPaused = false;
            canon.anims.resume(); // Resume animation after 4 seconds
          });
        }
        this.debugText = this.add
          .text(10, 70, "", { fontSize: "16px", fill: "#fff" })
          .setScrollFactor(0);
      });
    });

    this.physics.world.drawDebug = false;

    // mint count
    this.scoreText = this.add
      .text(500, 20, "0/6", {
        fontSize: "40px",
        fill: "#000",
        fontFamily: "Hitchcut",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    // Define the slow zone (rectangle)
    this.slowZones = [
      new Phaser.Geom.Rectangle(44, 547, 90, 20),
      new Phaser.Geom.Rectangle(363, 643, 45, 20),
      new Phaser.Geom.Rectangle(421, 451, 45, 20),
      new Phaser.Geom.Rectangle(903, 515, 150, 20),
      new Phaser.Geom.Rectangle(1366, 611, 130, 20),
      new Phaser.Geom.Rectangle(1888, 515, 60, 20),
      new Phaser.Geom.Rectangle(2438, 515, 100, 20),
      new Phaser.Geom.Rectangle(3013, 547, 100, 20), //beside npc
      new Phaser.Geom.Rectangle(3235, 419, 150, 20),
      new Phaser.Geom.Rectangle(3489, 419, 55, 20),
      new Phaser.Geom.Rectangle(4451, 547, 70, 20),
    ];

    // // Debugging: check slow zones
    // const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
    // this.slowZones.forEach(zone => {
    //   graphics.strokeRectShape(zone);
    // });

    // Create speech bubble, initially hidden
    this.speechBubble = this.add
      .image(2972, 420, "speechbubble_npcaunty")
      .setScale(0.15);
    this.speechBubble.setVisible(false); // Hide initially

    // Set up the next level trigger at specific coordinates
    this.nextLevelTrigger = this.add.zone(4558, 547, 100, 100);
    this.physics.world.enable(this.nextLevelTrigger);
    this.nextLevelTrigger.body.setAllowGravity(false);
    this.nextLevelTrigger.body.moves = false;

    // Enable overlap checks
    this.physics.add.overlap(
      this.player,
      this.npcAunty,
      this.showSpeechBubble,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.nextLevelTrigger,
      this.nextLevel,
      null,
      this
    );

    // text for mint requirement message (initially invisible)
    this.mintRequirementText = this.add
      .text(270, 120, "", {
        fontSize: "30px",
        fill: "#ffffff",
        fontFamily: "Hitchcut",
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setScrollFactor(0)
      .setDepth(2000)
      .setVisible(false);

    this.restartText = this.add
      .text(480, 190, "", {
        fontSize: "25px",
        fill: "#000000",
        fontFamily: "Hitchcut",
        align: "center",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(2000)
      .setVisible(false);

    // restart at spawn
    this.rKeyPressed = 0; // Track R key presses
    this.lastRKeyTime = 0; // Track timing of R key presses
    this.rKey = this.input.keyboard.addKey("R"); // Add R key input

    this.menuButton = this.add
      .text(50, 50, "MENU", {
        fontSize: "25px",
        fontFamily: "Hitchcut",
        fill: "#1A3449",
        backgroundColor: "#ffffff",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000);

    // Add submenu buttons (initially invisible)
    this.homeButton = this.add
      .text(50, 100, "Exit", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
      .setVisible(false);

    this.guideButton = this.add
      .text(50, 140, "Guide", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
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
      this.scene.launch("storyboardW3");
      this.scene.pause();
    });

    // menu button
    this.menuButton = this.add
      .text(50, 50, "MENU", {
        fontSize: "25px",
        fontFamily: "Hitchcut",
        fill: "#1A3449",
        backgroundColor: "#ffffff",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000);

    // Add submenu buttons (initially invisible)
    this.homeButton = this.add
      .text(50, 100, "Exit", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
      .setVisible(false);

    this.guideButton = this.add
      .text(50, 140, "Guide", {
        fontSize: "20px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .setDepth(2000)
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
      this.scene.launch("storyboardW3");
      this.scene.pause();
    });

    this.fallText = this.add
      .text(353, 120, "", {
        fontSize: "30px",
        fill: "#ffffff",
        fontFamily: "Hitchcut",
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setScrollFactor(0)
      .setDepth(2000)
      .setVisible(false);

    if (this.scene.get("world2").musicController) {
      this.scene.get("world2").musicController.destroy();
    }

    this.musicController = new MusicController(this);
  } /////////////////// end of create //////////////////////////////

  nextLevel(player, trigger) {
    console.log("Next level reached!");
    if (this.score >= 6) {
      this.scene.start("winScene");
    } else {
      const mintsNeeded = 6 - this.score;
      this.mintRequirementText.setText(
        `Oh no! I need ${mintsNeeded} more mint${mintsNeeded > 1 ? "s" : ""}!`
      );
      this.restartText.setText("restart? [R] x2");

      this.mintRequirementText.setVisible(true);
      this.restartText.setVisible(true);

      // Hide both messages after 2 seconds
      this.time.delayedCall(2000, () => {
        this.mintRequirementText.setVisible(false);
        this.restartText.setVisible(false);
      });
    }
  }

  showSpeechBubble(player, npc) {
    this.speechBubble.setVisible(true);
    this.speechBubble.x = npc.x; // Position the speech bubble above the NPC
    this.speechBubble.y = npc.y - 100; // Adjust the Y position as needed
  }

  hideSpeechBubble() {
    this.speechBubble.setVisible(false);
  }

  update() {
    let speedFactor = this.player.body.velocity.x * 0.0005; // Adjust scrolling speed based on player movement

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
      this.player.anims.stop();
      if (this.player.body.blocked.down) {
        this.player.setVelocityX(this.player.body.velocity.x * 0.98); // Momentum effect
      }
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400); // Jump force
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-600);
      this.player.anims.play("jump", true);
      moving = true;
    }
    // Player movement control
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    if (!moving) {
      this.player.anims.play("idle", true);
    }
    this.npcAunty.anims.play("aunty_idle", true);

    // Debugging logs
    console.log("Player velocity: ", this.player.body.velocity.x);
    console.log("Player position: ", this.player.x, this.player.y);

    // Handle cannon firing
    const time = this.time.now;

    this.ciggarCanon.children.iterate((canon) => {
      if (time > (canon.lastFired || 0) + 6100) {
        // Fire every 5 seconds
        let bullet = this.smokeBullets.create(
          canon.x - 10,
          canon.y - 10,
          "smokeBullet"
        );
        bullet.play("smokeBulletAnim");
        bullet.setVelocityX(-130);
        bullet.body.setAllowGravity(false);
        bullet.setCollideWorldBounds(false);

        this.time.delayedCall(5000, () => {
          if (bullet.active) {
            bullet.destroy();
          }
        });

        canon.lastFired = time;
      }

      // Check if player is in any slow zone
      let inSlowZone = false;
      this.slowZones.forEach((zone) => {
        if (
          Phaser.Geom.Rectangle.Contains(zone, this.player.x, this.player.y)
        ) {
          inSlowZone = true;
        }
      });

      // Reduce player velocity if in a slow zone
      if (inSlowZone) {
        this.player.setVelocityX(this.player.body.velocity.x * 0.5); // Adjust the factor to control the slowdown
      }
      // Check if the player is no longer overlapping with the NPC
      if (
        !Phaser.Geom.Rectangle.Overlaps(
          this.player.getBounds(),
          this.npcAunty.getBounds()
        )
      ) {
        this.hideSpeechBubble();
      }
    });

    // Double press detected - restart at spawn
    if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
      const currentTime = this.time.now;

      if (currentTime - this.lastRKeyTime < 500) {
        // 500ms window for double press
        this.player.setPosition(80, 500);
        this.player.setVelocity(0, 0);
      }

      this.lastRKeyTime = currentTime;
    }
  }

  // Add this new function to reset collectables
  resetCollectables() {
    // Reset Excel Mints
    this.excelMint.clear(true, true); // Remove all existing mints

    // Re-create mints at their original positions
    let mintPositions = [
      { x: 463, y: 613 }, // 1st mint
      { x: 1003, y: 150 }, // 2nd mint
      { x: 2446, y: 485 }, // 3rd mint
      { x: 3044, y: 253 }, // 4th mint
      { x: 1621, y: 420 }, // 5th mint
      { x: 2014, y: 630 }, // 6th mint
      { x: 3976, y: 450 }, // 7th mint extra
      { x: 4368, y: 537 }, // 8th mint extra
      { x: 3596, y: 620 }, // 9th mint extra
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
      { x: 2470, y: 310 },
      { x: 3361, y: 400 },
      { x: 4238, y: 575 },
    ];

    enemyPositions.forEach((pos) => {
      let enemy = this.ciggarPack.create(pos.x, pos.y, "ciggarPack");
      enemy.setCollideWorldBounds(true);
      enemy.setBounce(0.3);
      enemy.body.setAllowGravity(false);
      enemy.play("ciggarPackFloat");
    });

    // Reset score text to 0/3
    this.scoreText.setText("0/6");
  }
  // Define collectMint function
  // Define collectMint function
  collectMint(player, mint) {
    mint.disableBody(true, true); // Hide the mint
    this.score += 1; // Increase score
    this.scoreText.setText(`${this.score}/6`); // Update UI

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

    // Play damage sound
    this.sound.play("ciggarDamageSound");

    // Flash player red
    this.player.setTint(0xff0000);
    this.cameras.main.shake(300, 0.02);

    // Decrease the score by 1 but don't go below 0
    if (this.score > 0) {
      this.score -= 1;
    }

    this.scoreText.setText(`${this.score}/6`);

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
    this.sound.play("ciggarDamageSound");

    // Flash player red
    this.player.setTint(0xff0000);

    // Camera shake effect
    this.cameras.main.shake(300, 0.02);

    // Reset score to 0
    this.score = 0;
    this.scoreText.setText("0/6"); // score after death

    // Show fall message
    this.fallText.setText("Oops! I tripped~");
    this.fallText.setVisible(true);

    this.time.delayedCall(2000, () => {
      this.fallText.setVisible(false);
    });

    // Respawn player at starting position
    this.player.setPosition(80, 500); // spawn coordinates
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
}

/////////////////// end of update //////////////////////////////

//////////// end of class world ////////////////////////

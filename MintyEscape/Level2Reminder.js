class Level2Reminder extends Phaser.Scene {
  constructor() {
    super({ key: "Level2Reminder" });
    this.currentPage = 1;
    this.totalPages = 3;

    // Put global variable here
  }

  preload() {
    // images
    this.load.image("storyboardBg1", "assets/storyboardBg1.png");
    this.load.image("storyboardBg2", "assets/storyboardBg2.png");
    this.load.image("storyboardBg3", "assets/storyboardBg3.png");
    this.load.image("Level2Reminder1", "assets/Level2Reminder-1.png");
    this.load.image("Level2Reminder2", "assets/Level2Reminder-2.png");
    this.load.image("Level2Reminder3", "assets/Level2Reminder-3.png");

    // animations
    this.load.spritesheet("excelMint", "assets/excelMint.png", {
      frameWidth: 57.25,
      frameHeight: 58,
    });

    // sounds

    this.load.audio("mountainBgSound", "assets/mountainBgSound.mp3");
    this.load.audio("collectMint", "assets/collectMint.mp3");
    this.load.audio("switchSound", "assets/switchSound.mp3");
  }

  create() {
    console.log("*** Level2Reminder scene");

    // Initialize background sound
    this.mountainBgSound = this.sound.add("mountainBgSound", {
      loop: true,
      volume: 1,
    });

    // Create mintJump animation
    if (!this.anims.exists("mintJump")) {
      this.anims.create({
        key: "mintJump",
        frames: this.anims.generateFrameNumbers("excelMint", {
          start: 0,
          end: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Create parallax backgrounds
    this.createBackgrounds();

    // Initialize pages and navigation
    this.showPage(1);
    this.createNavigation();
  }

  createBackgrounds() {
    const layers = ["storyboardBg1", "storyboardBg2", "storyboardBg3"];
    this.backgrounds = layers.map((key, index) => {
      return this.add
        .tileSprite(0, 0, game.config.width, game.config.height, key)
        .setOrigin(0, 0)
        .setScrollFactor(0);
    });
    [this.bg1, this.bg2, this.bg3] = this.backgrounds;
  }

  createNavigation() {
    // Common text style
    const arrowStyle = {
      fontSize: "35px",
      fontFamily: "Hitchcut",
      fill: "#ffffff",
      backgroundColor: "#1A3449",
      padding: { x: 15, y: 5 },
    };

    // Create arrows
    this.leftArrow = this.add
      .text(100, game.config.height - 100, "<", arrowStyle)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000)
      .setVisible(false);

    this.rightArrow = this.add
      .text(game.config.width - 100, game.config.height - 100, ">", arrowStyle)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000);

    // Sound setup
    this.collectMintSound = this.sound.add("switchSound");

    // Add arrow interactions
    this.leftArrow.on("pointerdown", () => {
      this.collectMintSound.play();
      this.changePage(-1);
    });

    this.rightArrow.on("pointerdown", () => {
      this.collectMintSound.play();
      this.changePage(1);
    });
  }

  showPage(pageNumber) {
    // Remove existing page if any
    if (this.currentPageImage) {
      this.currentPageImage.destroy();
    }
    if (this.mintSprite) {
      this.mintSprite.destroy();
    }

    // Show the appropriate page
    if (pageNumber === 1) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "Level2Reminder1"
      );
    } else if (pageNumber === 2) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "Level2Reminder2"
      );
      // Add ExcelMint sprite to page 2
      this.mintSprite = this.add
        .sprite(400, 320, "excelMint")
        .setScale(3.5)
        .play("mintJump");
    } else if (pageNumber === 3) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "Level2Reminder3"
      );
    }

    this.currentPageImage.setOrigin(0.5);
  }

  changePage(direction) {
    let newPage = this.currentPage + direction;

    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.showPage(this.currentPage);

      // Update left arrow visibility
      if (this.currentPage === 1) {
        this.leftArrow.setVisible(false);
      } else {
        this.leftArrow.setVisible(true);
      }

      // Update right arrow for last page
      if (this.currentPage === 3) {
        // Changed to check for page 3
        this.rightArrow.setText("Play");
        this.rightArrow.off("pointerdown");
        this.rightArrow.on("pointerdown", () => {
          this.collectMintSound.play();
          if (this.mountainBgSound) {
            // Add check if sound exists
            this.mountainBgSound.stop();
          }
          this.scene.start("world2");
        });
      } else {
        this.rightArrow.setText(">");
        this.rightArrow.off("pointerdown");
        this.rightArrow.on("pointerdown", () => {
          this.collectMintSound.play();
          this.changePage(1);
        });
      }
    }
  }

  update() {
    this.bg1.tilePositionX += 0.2;
    this.bg2.tilePositionX += 0.4;
    this.bg3.tilePositionX += 0.6;
  }
}

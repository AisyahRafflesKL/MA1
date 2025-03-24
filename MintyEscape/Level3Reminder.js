class Level3Reminder extends Phaser.Scene {
  constructor() {
    super({ key: "Level3Reminder" });
    this.currentPage = 1;
    this.totalPages = 3;

    // Put global variable here
  }

  preload() {
    // images
    this.load.image("storyboardBg1", "assets/storyboardBg1.png");
    this.load.image("storyboardBg2", "assets/storyboardBg2.png");
    this.load.image("storyboardBg3", "assets/storyboardBg3.png");
    this.load.image("Level3Reminder1", "assets/Level3Reminder-1.png");
    this.load.image("Level3Reminder2", "assets/Level3Reminder-2.png");
    this.load.image("Level3Reminder3", "assets/Level3Reminder-3.png");

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
    console.log("*** Level3Reminder scene");

    // bg sound
    this.mountainBgSound = this.sound.add("mountainBgSound", {
      loop: true,
      volume: 0.5,
    });
    this.mountainBgSound.play();

    this.events.on("shutdown", () => {
      if (this.mountainBgSound) {
        this.mountainBgSound.destroy();
      }
    });

    // Create animation
    this.anims.create({
      key: "mintJump",
      frames: this.anims.generateFrameNumbers("excelMint", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create parallax backgrounds (fixed duplicate bg1)
    this.bg1 = this.add
      .tileSprite(0, 0, game.config.width, game.config.height, "storyboardBg1")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.bg2 = this.add
      .tileSprite(0, 0, game.config.width, game.config.height, "storyboardBg2")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.bg3 = this.add
      .tileSprite(0, 0, game.config.width, game.config.height, "storyboardBg3")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Add navigation arrows using text
    this.leftArrow = this.add
      .text(100, game.config.height - 100, "<", {
        fontSize: "35px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000);

    this.rightArrow = this.add
      .text(game.config.width - 100, game.config.height - 100, ">", {
        fontSize: "35px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000);

    // Setup sounds
    this.collectMintSound = this.sound.add("switchSound");

    // Initialize page and arrows
    this.currentPage = 1;
    this.leftArrow.setVisible(false);
    this.rightArrow.setText(">");

    // Show first page
    this.showPage(1);

    // Arrow interactions
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
        "Level3Reminder1"
      );
    } else if (pageNumber === 2) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "Level3Reminder2"
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
        "Level3Reminder3"
      );
    }

    this.currentPageImage.setOrigin(0.5);
  }

  changePage(direction) {
    let newPage = this.currentPage + direction;

    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.showPage(this.currentPage);

      // Reset arrow event listeners
      this.rightArrow.off("pointerdown");
      this.leftArrow.off("pointerdown");

      // Set up new arrow event listeners
      this.leftArrow.on("pointerdown", () => {
        this.collectMintSound.play();
        this.changePage(-1);
      });

      // Update arrow visibility and behavior
      this.leftArrow.setVisible(this.currentPage !== 1);

      if (this.currentPage === this.totalPages) {
        this.rightArrow.setText("Play");
        this.rightArrow.on("pointerdown", () => {
          this.collectMintSound.play();
          this.mountainBgSound.stop();
          this.scene.start("world3");
        });
      } else {
        this.rightArrow.setText(">");
        this.rightArrow.on("pointerdown", () => {
          this.collectMintSound.play();
          this.changePage(1);
        });
      }
    }
  }

  update() {
    this.bg1.tilePositionX += 0.2; // Slowest layer
    this.bg2.tilePositionX += 0.4; // Medium speed
    this.bg3.tilePositionX += 0.6;
  }
}

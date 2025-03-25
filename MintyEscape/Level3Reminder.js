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

    // Preload all the assets here

    // Preload any images here
  }

  create() {
    console.log("*** Level3Reminder scene");

    this.setupAudio();
    this.createAnimations();
    this.createBackgrounds();
    this.createNavigation();
    this.showPage(1);
  }

  setupAudio() {
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

    this.collectMintSound = this.sound.add("switchSound");
  }

  createAnimations() {
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
    const arrowStyle = {
      fontSize: "35px",
      fontFamily: "Hitchcut",
      fill: "#ffffff",
      backgroundColor: "#1A3449",
      padding: { x: 15, y: 5 },
    };

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

    this.setupArrowHandlers();
  }

  setupArrowHandlers() {
    const playSound = () => this.collectMintSound.play();

    this.leftArrow.on("pointerdown", () => {
      playSound();
      this.changePage(-1);
    });

    this.rightArrow.on("pointerdown", () => {
      playSound();
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

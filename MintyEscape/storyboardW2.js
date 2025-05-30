class storyboardW2 extends Phaser.Scene {
  constructor() {
    super({ key: "storyboardW2" });
    this.currentPage = 1;
    this.totalPages = 11;

    // Put global variable here
  }

  preload() {
    // images
    this.load.image("storyboardBg1", "assets/storyboardBg1.png");
    this.load.image("storyboardBg2", "assets/storyboardBg2.png");
    this.load.image("storyboardBg3", "assets/storyboardBg3.png");
    this.load.image("storyboard01", "assets/storyboard01.png");
    this.load.image("storyboard02", "assets/storyboard02.png");
    this.load.image("storyboard03", "assets/storyboard03.png");
    this.load.image("storyboard04", "assets/storyboard04.png");
    this.load.image("storyboard05", "assets/storyboard05.png");
    this.load.image("storyboard06", "assets/storyboard06.png");
    this.load.image("storyboard07", "assets/storyboard07.png");
    this.load.image("storyboard08", "assets/storyboard08.png");
    this.load.image("storyboard09", "assets/storyboard09.png");
    this.load.image("storyboard10", "assets/storyboard10.png");
    this.load.image("storyboard11", "assets/storyboard11.png");

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
    console.log("*** storyboardW2 scene");

    // bg sound
    this.mountainBgSound = this.sound.add("mountainBgSound", {
      loop: true,
      volume: 0.5,
    });
    this.mountainBgSound.play();

    this.events.on("shutdown", () => {
      if (this.mountainBgSound) {
        this.mountainBgSound.stop();
      }
    });

    // Create parallax backgrounds
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
      .text(200, game.config.height - 100, "<", {
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
      .text(game.config.width - 200, game.config.height - 100, ">", {
        fontSize: "35px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000);

    this.currentPage = 1;
    this.showPage(1);
    // Arrow interactions
    this.collectMintSound = this.sound.add("switchSound");

    // Add close button in the middle
    this.closeButton = this.add
      .text(game.config.width / 2, game.config.height - 100, "Close", {
        fontSize: "25px",
        fontFamily: "Hitchcut",
        fill: "#ffffff",
        backgroundColor: "#1A3449",
        padding: { x: 15, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(2000);

    // Close button handler
    this.closeButton.on("pointerdown", () => {
      if (this.collectMintSound) {
        this.collectMintSound.play();
      }
      this.scene.resume("world2");
      this.scene.stop();
    });

    // Arrow interactions
    this.rightArrow.on("pointerdown", () => {
      if (this.collectMintSound) {
        this.collectMintSound.play();
      }
      this.changePage(1);
    });

    // Add left arrow interaction
    this.leftArrow.on("pointerdown", () => {
      if (this.collectMintSound) {
        this.collectMintSound.play();
      }
      this.changePage(-1);
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
        "storyboard01"
      );
    } else if (pageNumber === 2) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard02"
      );
    } else if (pageNumber === 3) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard03"
      );
    } else if (pageNumber === 4) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard04"
      );
      // Add ExcelMint sprite
      this.mintSprite = this.add
        .sprite(
          game.config.width / 2 + 300,
          game.config.height / 2 - 240,
          "excelMint"
        )
        .setScale(2.5)
        .play("mintJump");
    } else if (pageNumber === 5) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard05"
      );
      // Add ExcelMint sprite
      this.mintSprite = this.add
        .sprite(
          game.config.width / 2 - 160,
          game.config.height / 2 + 280,
          "excelMint"
        )
        .setScale(3)
        .play("mintJump");
    } else if (pageNumber === 6) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard06"
      );
    } else if (pageNumber === 7) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard07"
      );
    } else if (pageNumber === 8) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard08"
      );
    } else if (pageNumber === 9) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard09"
      );
    } else if (pageNumber === 10) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard10"
      );
    } else if (pageNumber === 11) {
      this.currentPageImage = this.add.image(
        game.config.width / 2,
        game.config.height / 2,
        "storyboard11"
      );
    }

    if (this.currentPage === 1) {
      this.leftArrow.setVisible(false);
    } else {
      this.leftArrow.setVisible(true);
    }

    if (this.currentPage === this.totalPages) {
      this.rightArrow.setVisible(false);
    } else {
      this.rightArrow.setVisible(true);
    }

    this.currentPageImage.setOrigin(0.5);
  }

  changePage(direction) {
    let newPage = this.currentPage + direction;

    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.showPage(this.currentPage);
    }
  }

  update() {
    this.bg1.tilePositionX += 0.2; // Slowest layer
    this.bg2.tilePositionX += 0.4; // Medium speed
    this.bg3.tilePositionX += 0.6;
  }
}

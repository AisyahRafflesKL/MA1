class storyboard extends Phaser.Scene {
  constructor() {
    super({ key: "storyboard" });
    this.currentPage = 1;
    this.totalPages = 11;

    // Put global variable here
  }

  preload() {
    // Load backgrounds
    const backgrounds = ["storyboardBg1", "storyboardBg2", "storyboardBg3"];
    backgrounds.forEach((bg) => {
      this.load.image(bg, `assets/${bg}.png`);
    });

    // Load storyboard pages
    for (let i = 1; i <= 11; i++) {
      const pageNum = i.toString().padStart(2, "0");
      this.load.image(
        `storyboard${pageNum}`,
        `assets/storyboard${pageNum}.png`
      );
    }

    // Load sprite and sounds
    this.load.spritesheet("excelMint", "assets/excelMint.png", {
      frameWidth: 57.25,
      frameHeight: 58,
    });

    this.load.audio(
      ["mountainBgSound", "collectMint", "switchSound"],
      [
        "assets/mountainBgSound.mp3",
        "assets/collectMint.mp3",
        "assets/switchSound.mp3",
      ]
    );
  }

  create() {
    console.log("*** storyboard scene");
    this.setupAudio();
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
    this.collectMintSound = this.sound.add("switchSound");

    this.events.on("shutdown", () => {
      if (this.mountainBgSound) {
        this.mountainBgSound.destroy();
      }
    });
  }

  createBackgrounds() {
    const layers = ["storyboardBg1", "storyboardBg2", "storyboardBg3"];
    this.backgrounds = layers.map((key) => {
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

    this.leftArrow = this.createArrow("<", 100, arrowStyle);
    this.rightArrow = this.createArrow(
      ">",
      game.config.width - 100,
      arrowStyle
    );
    this.setupNavigationControls();
  }

  createArrow(text, x, style) {
    return this.add
      .text(x, game.config.height - 100, text, style)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1000);
  }

  setupNavigationControls() {
    const navigate = (direction) => {
      this.collectMintSound.play();
      this.changePage(direction);
    };

    this.leftArrow.on("pointerdown", () => navigate(-1));
    this.rightArrow.on("pointerdown", () => navigate(1));
    this.input.keyboard.on("keydown-LEFT", () => navigate(-1));
    this.input.keyboard.on("keydown-RIGHT", () => navigate(1));
  }

  showPage(pageNumber) {
    if (this.currentPageImage) this.currentPageImage.destroy();
    if (this.mintSprite) this.mintSprite.destroy();

    const pageNum = pageNumber.toString().padStart(2, "0");
    this.currentPageImage = this.add
      .image(
        game.config.width / 2,
        game.config.height / 2,
        `storyboard${pageNum}`
      )
      .setOrigin(0.5);

    // Add Mint sprite for specific pages
    const mintPositions = {
      4: { x: 300, y: -240, scale: 2.5 },
      5: { x: -160, y: 280, scale: 3 },
    };

    if (mintPositions[pageNumber]) {
      const pos = mintPositions[pageNumber];
      this.mintSprite = this.add
        .sprite(
          game.config.width / 2 + pos.x,
          game.config.height / 2 + pos.y,
          "excelMint"
        )
        .setScale(pos.scale)
        .play("mintJump");
    }
  }

  changePage(direction) {
    let newPage = this.currentPage + direction;

    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.showPage(this.currentPage);

      this.rightArrow.off("pointerdown");
      this.leftArrow.off("pointerdown");

      // Add fresh listeners
      this.rightArrow.on("pointerdown", () => {
        if (this.collectMintSound) {
          this.collectMintSound.play();
        }
        this.changePage(1);
      });

      this.leftArrow.on("pointerdown", () => {
        if (this.collectMintSound) {
          this.collectMintSound.play();
        }
        this.changePage(-1);
      });
    }
  }

  update() {
    this.bg1.tilePositionX += 0.2; // Slowest layer
    this.bg2.tilePositionX += 0.4; // Medium speed
    this.bg3.tilePositionX += 0.6;
  }
}

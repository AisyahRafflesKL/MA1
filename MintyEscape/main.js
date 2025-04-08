class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  preload() {
    // images
    this.load.image("mainScreen1", "assets/mainScreen1.png");
    this.load.image("mainScreen2", "assets/mainScreen2.png");
    this.load.image("mainScreen3", "assets/mainScreen3.png");
    this.load.image("title", "assets/title.png");
    this.load.image("lolaScreen1", "assets/lolaScreen1.png");

    // animations
    this.load.spritesheet("excelMint", "assets/excelMint.png", {
      frameWidth: 57.25,
      frameHeight: 58,
    });

    // sounds
    this.load.audio("switchSound", "assets/switchSound.mp3");
  }

  setupAudio() {
    this.sound.pauseOnBlur = false;
    this.switchSound = this.sound.add("switchSound", { volume: 1 });

    this.input.once("pointerdown", () => {
      if (this.sound.context.state === "suspended") {
        this.sound.context.resume();
      }
    });
  }

  setupButtonHandlers(playButton, controlsButton) {
    playButton.on("pointerdown", () => {
      this.sound.play("switchSound", { volume: 1 });
      this.scene.start("world1");
    });

    controlsButton.on("pointerdown", () => {
      this.sound.play("switchSound", { volume: 1 });
      this.scene.launch("storyboardWMain");
      this.scene.pause();
    });
  }

  create() {
    console.log("*** main scene");

    this.setupAudio();
    this.createBackgrounds();
    this.createAnimations();
    this.createUI();
  }

  createBackgrounds() {
    const layers = ["mainScreen1", "mainScreen2", "mainScreen3"];
    this.backgrounds = layers.map((key) => {
      return this.add
        .tileSprite(0, 0, game.config.width, game.config.height, key)
        .setOrigin(0, 0)
        .setScrollFactor(0);
    });
    [this.bg1, this.bg2, this.bg3] = this.backgrounds;

    this.add
      .image(game.config.width / 2, game.config.height / 2, "title")
      .setOrigin(0.5);
    this.add
      .image(game.config.width / 2, game.config.height / 2, "lolaScreen1")
      .setOrigin(0.5);
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

  createUI() {
    const buttonStyle = {
      fontSize: "40px",
      fontFamily: "Hitchcut",
      fill: "#1A3449",
      backgroundColor: "#D1F2DE",
      padding: { x: 30, y: 15 },
    };

    const playButton = this.createButton(
      "Play",
      game.config.height / 2 + 145,
      buttonStyle
    );
    const controlsButton = this.createButton(
      "Guide",
      game.config.height / 2 + 250,
      buttonStyle
    );

    this.setupButtonHandlers(playButton, controlsButton);
    this.createCredits();
  }

  createButton(text, yPos, style) {
    const button = this.add
      .text(game.config.width / 2, yPos, text, style)
      .setOrigin(0.5)
      .setInteractive();

    button.on("pointerover", () => {
      button.setStyle({ fill: "#D1F2DE", backgroundColor: "#1A3449" });
    });
    button.on("pointerout", () => {
      button.setStyle({ fill: "#1A3449", backgroundColor: "#D1F2DE" });
    });

    return button;
  }

  createCredits() {
    this.add
      .text(
        game.config.width / 2,
        game.config.height - 50,
        "Nurul Aisyah  |  RKL-CM2309011  |  MA1",
        {
          fontSize: "20px",
          fontFamily: "Hitchcut",
          fill: "#D1F2DE",
        }
      )
      .setOrigin(0.5);
  }

  destroy() {
    if (this.mountainBgSound) {
      this.mountainBgSound.stop();
    }
  }

  update() {
    this.bg1.tilePositionX += 0.2;
    this.bg2.tilePositionX += 0.4;
    this.bg3.tilePositionX += 0.6;
  }
}

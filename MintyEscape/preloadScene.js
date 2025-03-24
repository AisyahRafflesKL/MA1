class preloadScene extends Phaser.Scene {
  constructor() {
    super("preloadScene");
  }

  preload() {
    // Add loading progress bar
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    // Loading events
    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xff3300, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
    });

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
    this.load.spritesheet("controlreminder", "assets/controlreminder.png", {
      frameWidth: 757.33,
      frameHeight: 678,
    });
  }

  create() {
    console.log("Preload complete, transitioning to main");
    this.scene.start("main");
  }
}

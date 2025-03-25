class preloadScene extends Phaser.Scene {
  constructor() {
    super("preloadScene");
  }

  preload() {
    const sprites = [
      { key: "player", file: "lolaHiker.png", width: 40, height: 58 },
      { key: "ciggarCanon", file: "ciggarCanon.png", width: 98.07, height: 70 },
      { key: "smokeBullet", file: "smokeBullet.png", width: 65.17, height: 54 },
      { key: "excelMint", file: "excelMint.png", width: 57.25, height: 58 },
      { key: "ciggarPack", file: "ciggarPack.png", width: 57.25, height: 67 },
      {
        key: "controlreminder",
        file: "controlreminder.png",
        width: 757.33,
        height: 678,
      },
    ];

    sprites.forEach((sprite) => {
      this.load.spritesheet(sprite.key, `assets/${sprite.file}`, {
        frameWidth: sprite.width,
        frameHeight: sprite.height,
      });
    });
  }

  create() {
    this.createUI();
    this.setupControls();
    console.log("This is preloadScene spacebar V3");
  }

  createUI() {
    // Create graphics
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff3300, 1);
    graphics.fillRect(100, 200, 600, 300);
    graphics.fillRect(100, 100, 100, 100);

    // Add text
    const textStyle = { font: "96px Courier", fill: "#000000" };
    const instructionStyle = { font: "24px Courier", fill: "#000000" };

    this.add.text(120, 110, "A", textStyle);
    this.add.text(
      120,
      310,
      "Press Spacebar to continue yo game",
      instructionStyle
    );
  }

  setupControls() {
    const spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on("down", () => {
      console.log("Spacebar pressed, goto gameScene");
      this.scene.start("gameScene");
    });
  }
}

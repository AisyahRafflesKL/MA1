class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super('preloadScene');
    }

    preload() {
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

    create () {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff3300, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(100, 100, 100, 100);

        // text
        this.add.text(120, 110, 'A', { font: '96px Courier', fill: '#000000' });
        this.add.text(120, 310, 'Press Spacebar to continue yo game', { font: '24px Courier', fill: '#000000' });

        console.log("This is preloadScene spacebar V3");

        // IMPORTANT
        //this.input.once('pointerdown', function(){ 
        var spaceDown = this.input.keyboard.addKey('SPACE'); // detect spacebar
        
        spaceDown.on('down', function(){ // when pressed
        console.log("Spacebar pressed, goto gameScene"); // start gameScene
        this.scene.start("gameScene"); // start gameScene
        }, this );

    }

}

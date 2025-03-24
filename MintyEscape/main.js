class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {

        // images
        //this.load.image("mainScreen", "assets/mainScreen.png");
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

          this.load.audio('mountainBgSound', 'assets/mountainBgSound.mp3');
          this.load.audio('switchSound', 'assets/switchSound.mp3');
    }

    create() {

        console.log('*** main scene');

        // bg
        this.add.image(game.config.width/2, 
        game.config.height/2, "mainScreen1")
        .setOrigin(0.5);

        this.add.image(game.config.width/2, 
            game.config.height/2, "mainScreen2")
            .setOrigin(0.5);

            this.add.image(game.config.width/2, 
                game.config.height/2, "mainScreen3")
                .setOrigin(0.5);

                this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mainScreen1')
                .setOrigin(0, 0)
                .setScrollFactor(0);
                
            this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mainScreen2')
                .setOrigin(0, 0)
                .setScrollFactor(0);
                
            this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mainScreen3')
                .setOrigin(0, 0)
                .setScrollFactor(0);

                this.add.image(game.config.width/2, 
                    game.config.height/2, "title")
                    .setOrigin(0.5);

                this.add.image(game.config.width/2, 
                    game.config.height/2, "lolaScreen1")
                    .setOrigin(0.5);

            // Create mint animation
    this.anims.create({
        key: "mintJump",
        frames: this.anims.generateFrameNumbers("excelMint", {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: -1
    });

    // Create Play button
    let playButton = this.add.text(game.config.width/2, game.config.height/2 + 145, 'Play', {
        fontSize: '40px',
        fontFamily: 'Hitchcut',
        fill: '#1A3449',
        backgroundColor: '#D1F2DE',
        padding: { x: 30, y: 15 }
    })
    .setOrigin(0.5)
    .setInteractive();

    // Create Controls button
    let controlsButton = this.add.text(game.config.width/2, game.config.height/2 + 250, 'Guide', {
        fontSize: '40px',
        fontFamily: 'Hitchcut',
        fill: '#1A3449',
        backgroundColor: '#D1F2DE',
        padding: { x: 30, y: 15 }
    })
    .setOrigin(0.5)
    .setInteractive();

    // Button interactions
    playButton.on('pointerover', () => {
        playButton.setStyle({ fill: '#D1F2DE', backgroundColor: '#1A3449' });
    });
    playButton.on('pointerout', () => {
        playButton.setStyle({ fill: '#1A3449', backgroundColor: '#D1F2DE' });
    });
    playButton.on('pointerdown', () => {
        this.scene.start('world1');
    });

    controlsButton.on('pointerover', () => {
        controlsButton.setStyle({ fill: '#D1F2DE', backgroundColor: '#1A3449' });
    });
    controlsButton.on('pointerout', () => {
        controlsButton.setStyle({ fill: '#1A3449', backgroundColor: '#D1F2DE' });
    });
    controlsButton.on('pointerdown', () => {
        if (this.sound.get('switchSound')) {
            this.sound.play('switchSound', { volume: 0.5 });
        }
        this.scene.launch('storyboardWMain');
        this.scene.pause();
    });

    // RKL Code
    this.add.text(game.config.width/2, game.config.height - 55, 'Nurul Aisyah  |  RKL-CM2309011  |  MA1', {
        fontSize: '25px',
        fontFamily: 'Hitchcut',
        fill: '#D1F2DE',
    })
    .setOrigin(0.5);

    // Button interactions
    playButton.on('pointerdown', () => {
        if (this.mountainBgSound) {
            this.mountainBgSound.stop();
        }
        this.scene.start('world1');
    });

    // background sound
    this.mountainBgSound = this.sound.add('mountainBgSound', { loop: true });
    this.mountainBgSound.play();
    this.mountainBgSound.setVolume(1); // 30% volume


}

destroy() {
    if (this.mountainBgSound) {
        this.mountainBgSound.stop();
    }
}

    update() {
        // Scroll both backgrounds
        this.bg1.tilePositionX += 0.2;  // Slowest layer (back)
    this.bg2.tilePositionX += 0.4;  // Medium speed (middle)
    this.bg3.tilePositionX += 0.6;  // Fastest layer (front)
}
        }
        
        



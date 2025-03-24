class Level2Reminder extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Reminder' });
        this.currentPage = 1;
        this.totalPages = 3;

        // Put global variable here
    }

    preload() {

        // images
        //this.load.image("mainScreen", "assets/mainScreen.png");
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

          this.load.audio('mountainBgSound', 'assets/mountainBgSound.mp3');
          this.load.audio('collectMint', 'assets/collectMint.mp3');
          this.load.audio('switchSound', 'assets/switchSound.mp3');

        // Preload all the assets here

        // Preload any images here
    }

    create() {

        console.log('*** Level2Reminder scene');

        // bg sound
        this.mountainBgSound = this.sound.add('mountainBgSound', {
            loop: true,
            volume: 0.5
        });
        this.mountainBgSound.play();

        this.events.on('shutdown', () => {
            if (this.mountainBgSound) {
                this.mountainBgSound.destroy();
            }
        });

        this.anims.create({
            key: 'mintJump',
            frames: this.anims.generateFrameNumbers('excelMint', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Create parallax backgrounds
        this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'storyboardBg1')

// Create parallax backgrounds
this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'storyboardBg1')
.setOrigin(0, 0)
.setScrollFactor(0);

this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'storyboardBg2')
.setOrigin(0, 0)
.setScrollFactor(0);

this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'storyboardBg3')
.setOrigin(0, 0)
.setScrollFactor(0);

        this.showPage(1);

        // Add navigation arrows using text
        this.leftArrow = this.add.text(100, game.config.height - 100, '<', {
            fontSize: '35px',
            fontFamily: 'Hitchcut',
            fill: '#ffffff',
            backgroundColor: '#1A3449',
            padding: { x: 15, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .setDepth(1000); 

        this.rightArrow = this.add.text(game.config.width - 100, game.config.height - 100, '>', {
            fontSize: '35px',
            fontFamily: 'Hitchcut',
            fill: '#ffffff',
            backgroundColor: '#1A3449',
            padding: { x: 15, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .setDepth(1000);

        // // Add page number text
        // this.pageText = this.add.text(game.config.width/2, game.config.height - 50, 
        //     'Page 1/11', {
        //         fontSize: '24px',
        //         fontFamily: 'Hitchcut',
        //         fill: '#ffffff'
        //     }).setOrigin(0.5);

        // Arrow interactions
        this.collectMintSound = this.sound.add('switchSound');

        // Arrow interactions
        this.leftArrow.on('pointerdown', () => {
            this.collectMintSound.play();
            this.changePage(-1);
        });

        this.rightArrow.on('pointerdown', () => {
            this.collectMintSound.play();
            this.changePage(1);
        });

        // Add keyboard navigation with sound
        this.input.keyboard.on('keydown-LEFT', () => {
            this.collectMintSound.play();
            this.changePage(-1);
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
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
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'Level2Reminder1');
        } else if (pageNumber === 2) {
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'Level2Reminder2');
            // Add ExcelMint sprite to page 2
            this.mintSprite = this.add.sprite(400, 320, 'excelMint')
                .setScale(3.5)
                .play('mintJump');
        } else if (pageNumber === 3) {
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'Level2Reminder3');
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
            if (this.currentPage === 3) {  // Changed to check for page 3
                this.rightArrow.setText('Play');
                this.rightArrow.off('pointerdown');
                this.rightArrow.on('pointerdown', () => {
                    this.collectMintSound.play();
                    this.mountainBgSound.pause();
                    this.scene.start('world2');  // Changed to start world2
                });
            } else {
                this.rightArrow.setText('>');
                this.rightArrow.off('pointerdown');
                this.rightArrow.on('pointerdown', () => {
                    this.collectMintSound.play();
                    this.changePage(1);
                });
            }
        }        
    }


    update() {
        this.bg1.tilePositionX += 0.2;  // Slowest layer
        this.bg2.tilePositionX += 0.4;  // Medium speed
        this.bg3.tilePositionX += 0.6;
}
}
        
        



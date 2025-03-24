class winScene extends Phaser.Scene {
    constructor() {
        super({ key: 'winScene' });
        this.currentPage = 1;
        this.totalPages = 3;

    }

    preload() {

        // images
        this.load.image("winScreen-01", "assets/winScreen-01.png");
        this.load.image("winScreen-02", "assets/winScreen-02.png");
        this.load.image("winScreen-03", "assets/winScreen-03.png");

        // stars
        this.load.image("winScreenSTARS-01", "assets/winScreenSTARS-01.png");
        this.load.image("winScreenSTARS-02", "assets/winScreenSTARS-02.png");
        this.load.image("winScreenSTARS-03", "assets/winScreenSTARS-03.png");


        // animations 
        this.load.spritesheet("excelMint", "assets/excelMint.png", {
            frameWidth: 57.25,
            frameHeight: 58,
          });

          // sounds

          this.load.audio('winScene', 'assets/winScene.mp3');
          this.load.audio('collectMint', 'assets/collectMint.mp3');
          this.load.audio('switchSound', 'assets/switchSound.mp3');
    }

    create() {

        console.log('*** winScene scene');

        // bg sound
        this.mountainBgSound = this.sound.add('winScene', {
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

        this.snowParticles = this.add.particles(0, 0, {
            lifespan: 4000,
            gravityY: 50,
            frequency: 100,
            quantity: 2,
            scale: { start: 0.1, end: 0 },
            alpha: { start: 0.5, end: 0 },
            speed: { min: 50, max: 100 },
            emitting: false,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(0, -50, game.config.width, 1)
            },
            particleClass: Phaser.GameObjects.Particles.Particle
        });



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
    }

    showPage(pageNumber) {
        // Remove existing page if any
        if (this.currentPageImage) {
            this.currentPageImage.destroy();
        }
        if (this.mintSprite) {
            this.mintSprite.destroy();
        }
        if (this.stars) {
            this.stars.destroy();
        }

        // Show the appropriate page
        if (pageNumber === 1) {
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'winScreen-01');
            this.stars = this.add.image(game.config.width/2, game.config.height/2, 'winScreenSTARS-01');
            this.createStarsTween(this.stars);
        } else if (pageNumber === 2) {
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'winScreen-02');
            this.stars = this.add.image(game.config.width/2, game.config.height/2, 'winScreenSTARS-02');
            this.createStarsTween(this.stars);
        } else if (pageNumber === 3) {
            this.currentPageImage = this.add.image(game.config.width/2, game.config.height/2, 'winScreen-03');
            this.stars = this.add.image(game.config.width/2, game.config.height/2, 'winScreenSTARS-03');
            this.createStarsTween(this.stars);
        } 
        
        this.currentPageImage.setOrigin(0.5);
        this.stars.setOrigin(0.5);
        this.stars.setDepth(1);
    }

    createStarsTween(stars) {
        this.tweens.add({
            targets: stars,
            alpha: { from: 1, to: 0 },
            duration: 700,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });
    }

    changePage(direction) {
        let newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.showPage(this.currentPage);

            // Update left arrow visibility
            if (this.currentPage === 1) {
                this.leftArrow.setVisible(false);
                this.rightArrow.setText('Claim');
            } else if (this.currentPage === 2) {
                this.leftArrow.setVisible(true);
                this.rightArrow.setText('Done');
            } else if (this.currentPage === 3) {
                this.leftArrow.setVisible(true);
                this.rightArrow.setText('Home');
                this.rightArrow.off('pointerdown');
                this.rightArrow.on('pointerdown', () => {
                    this.collectMintSound.play();
                    this.mountainBgSound.pause();
                    this.scene.start('main');
                });
                return;
            }

            // Default right arrow behavior for pages 1 and 2
            this.rightArrow.off('pointerdown');
            this.rightArrow.on('pointerdown', () => {
                this.collectMintSound.play();
                this.changePage(1);
            });
        }        
    }
}
        
        



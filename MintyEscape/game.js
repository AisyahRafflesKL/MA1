// Create a global scene for keyboard shortcuts
class GlobalKeys extends Phaser.Scene {
    constructor() {
        super({ key: 'GlobalKeys', active: true });
    }

    create() {
        this.input.keyboard.on('keydown-ONE', () => {
            this.scene.start('world1');
        });

        this.input.keyboard.on('keydown-TWO', () => {
            this.scene.start('world2');
        });

        this.input.keyboard.on('keydown-THREE', () => {
            this.scene.start('world3');
        });
        this.input.keyboard.on('keydown-FOUR', () => {
            this.scene.start('winScene');
        });
    }
}

var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 25,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#49AFA5',
    pixelArt: true,
    scene: [main, storyboardWMain, world1, storyboardW1, world2, Level2Reminder, 
        storyboardW2, Level3Reminder, world3, storyboardW3, winScene, GlobalKeys]  // Added GlobalKeys shortcut
        
        // Refresh everytime need to change to other worlds
        // CONTEXT: song auto overlay with worlds but when debugging is commanded out, doesnt happen
};

var game = new Phaser.Game(config);
window.excelMint = 0;
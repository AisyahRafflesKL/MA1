﻿// // Create a global scene for keyboard shortcuts
// class GlobalKeys extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GlobalKeys', active: true });
//     }

//     create() {
//         this.input.keyboard.on('keydown-ONE', () => {
//             this.scene.start('world1');
//         });

//         this.input.keyboard.on('keydown-TWO', () => {
//             this.scene.start('world2');
//         });

//         this.input.keyboard.on('keydown-THREE', () => {
//             this.scene.start('world3');
//         });
//         this.input.keyboard.on('keydown-FOUR', () => {
//             this.scene.start('winScene');
//         });
//     }
// }

var config = {
  type: Phaser.AUTO, // Change from AUTO to CANVAS
  width: 32 * 30,
  height: 32 * 25,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 300 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true,
  },
  canvas: {
    willReadFrequently: true,
    style: {
      "image-rendering": "pixelated",
    },
  },
  backgroundColor: "#49AFA5",
  scene: [
    preloadScene,
    main,
    storyboardWMain,
    world1,
    storyboardW1,
    world2,
    Level2Reminder,
    storyboardW2,
    Level3Reminder,
    world3,
    storyboardW3,
    winScene,
  ],

  // scene: [preloadScene, main, storyboardWMain, world1, storyboardW1, world2, Level2Reminder,
  //     storyboardW2, Level3Reminder, world3, storyboardW3, winScene, GlobalKeys]
};

var game = new Phaser.Game(config);
window.excelMint = 0;

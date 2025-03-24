class MusicController {
  constructor(scene) {
    if (MusicController.instance) {
      MusicController.instance.scene = scene;
      MusicController.instance.initialize();
      return MusicController.instance;
    }
    MusicController.instance = this;
    this.scene = scene;
    this.initialize();
  }

  initialize() {
    if (!this.bgSong) {
      this.bgSong = this.scene.sound.add("bgSong", { loop: true });
      this.mountainBgSound = this.scene.sound.add("mountainBgSound", {
        loop: true,
      });

      if (!this.currentTrack) {
        this.mountainBgSound.play();
        this.currentTrack = "mountainBgSound";
      }
    }

    if (this.musicText) {
      this.musicText.destroy();
    }

    this.musicText = this.scene.add
      .text(480, 400, "", {
        fontSize: "30px",
        fill: "#ffffff",
        fontFamily: "Hitchcut",
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(2000)
      .setAlpha(0);

    // Remove old keyboard listener
    if (this.keyHandler) {
      this.scene.input.keyboard.off("keydown-S", this.keyHandler);
    }

    // Setup new keyboard listener for current scene
    this.setupKeyControl();
  }

  setupKeyControl() {
    this.keyHandler = () => {
      if (this.currentTrack === "mountainBgSound") {
        this.mountainBgSound.stop();
        this.bgSong.play();
        this.currentTrack = "bgSong";
        this.showMusicText("music");
      } else if (this.currentTrack === "bgSong") {
        this.bgSong.stop();
        this.currentTrack = "mute";
        this.showMusicText("mute");
      } else {
        this.mountainBgSound.play();
        this.currentTrack = "mountainBgSound";
        this.showMusicText("nature");
      }
    };

    this.scene.input.keyboard.on("keydown-S", this.keyHandler);
  }
  showMusicText(text) {
    this.scene.tweens.killTweensOf(this.musicText);

    this.musicText.setText(text);
    this.musicText.setAlpha(1);

    this.scene.time.delayedCall(1000, () => {
      this.scene.tweens.add({
        targets: this.musicText,
        alpha: 0,
        duration: 900,
        ease: "Power2",
      });
    });
  }

  destroy() {
    if (this.musicText) {
      this.musicText.destroy();
    }
    if (this.keyHandler) {
      this.scene.input.keyboard.off("keydown-S", this.keyHandler);
    }
  }
}

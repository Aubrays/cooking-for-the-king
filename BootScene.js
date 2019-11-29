class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('background', 'assets/sprites/background.jpg');

    }

    create() {
        this.scene.start("playGame");
    }

    update() {

    }
}
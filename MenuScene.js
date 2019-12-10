class MenuScene extends Phaser.Scene {
    constructor(){
        super("menuGame");
    }

    // Menu
    // Start | Options | Credits

    // How to
    // https://www.patchesoft.com/phaser-3-title-screen-tutorial
    // plugin ? https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-menu/

    create() {
        this.scene.start("playGame");
    }
}
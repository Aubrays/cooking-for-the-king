import Button from "../classes/Button";

export default class MenuScene extends Phaser.Scene {
    constructor(){
        super("menuGame");
    }

    // Menu
    // Start | Options | Credits

    // How to
    // https://www.patchesoft.com/phaser-3-title-screen-tutorial
    // plugin ? https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-menu/

    preload(){
        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');
        this.menuBox = this.add.image(300, 400, 'menuBox').setDisplaySize(400, 600);
    }

    create() {

        // comment to display the menuScene
        // this.scene.start('playGame');

        this.add.bitmapText(160, 150, 'augusta', 'Cooking\nfor the King', 60, 1);

        let firstYPosition = 330;

        let startButton = new Button(this, 300, firstYPosition, 'Start');

        startButton
            .on('pointerdown', () => this.goToNextScene(this, 'playGame'));

        let optionsButton = new Button(this, 300, firstYPosition + 100, 'Options');

        optionsButton
            .on('pointerdown', () => this.goToNextScene(this, 'optionsGame'));

        let creditsButton = new Button(this, 300, firstYPosition + 200, 'Crédits');

        creditsButton
            .on('pointerdown', () => this.goToNextScene(this, 'playGame'));
    }

    goToNextScene(scene, nextScene) {
        scene.cameras.main.fadeOut();
        scene.time.addEvent({
            delay: 2000,
            callback: () => {
                scene.scene.start(nextScene);
            } 
        })
    }
}
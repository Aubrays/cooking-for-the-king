import Button from "../classes/Button";

export default class OptionsScene extends Phaser.Scene {
    constructor(){
        super("optionsGame");
    }

    preload(){
        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');
        this.menuBox = this.add.image(300, 400, 'menuBox').setDisplaySize(400, 600);
    }

    
    create() {

        this.add.bitmapText(160, 150, 'augusta', 'Options', 60, 1);

        let firstYPosition = 330;

        let resumeButton = new Button(this, 300, firstYPosition, 'Apply');

        resumeButton
            .on('pointerdown', () => this.goToNextScene(this, 'menuGame'));
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

    // Options
    // Enable/disable sound
    // Beginner | Nightmare


    
}
export default class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text){
        super(scene);

        let buttonSize = {
            width: 216,
            height: 74
        }
        let buttonText = scene.add.bitmapText(x, y-4, 'augusta', text, 32, 1).setOrigin(0.5, 0.5);

        let buttonBackground = scene.add.image(x,y, 'bigLightButton').setDisplaySize(buttonSize.width,buttonSize.height);
        

        this.add(buttonBackground);
        this.add(buttonText);

        let rect = new Phaser.Geom.Rectangle(x-(buttonSize.width/2), y-(buttonSize.height/2), buttonSize.width,buttonSize.height);

        this.setInteractive(rect, Phaser.Geom.Rectangle.Contains, {
            cursor: 'pointer'
        });
        // scene.input.enableDebug(this);
        scene.add.existing(this);
    }
}
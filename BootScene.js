class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    // This function loads game assets.
    preload ()
    {
        // add a global path "assets" to avoid repetition.
        this.load.setPath('assets/');
        // starting here, we no longer need to add "assets" in the file path.
        this.load.image('background', 'sprites/background.jpg');
        this.load.image('cauldron', 'sprites/cauldron2.png');
        this.load.image('shelf', 'sprites/shelf.png');
        this.load.image('Mélisende', 'chars/char1/1.png');
        this.load.image('Charles', 'chars/char2/2.png');

        // Atla generated with http://free-tex-packer.com/
        this.load.atlas('foods', 'sprites/food_dev.png', 'sprites/food_dev_atlas.json');

        this.load.json('foodData', 'json/foodData_dev.json');
        this.load.json('charData', 'json/charData.json');
    }

    create() {
        this.scene.start("menuGame");
    }

    update() {

    }
}
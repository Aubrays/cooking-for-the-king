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
        this.load.image('leek', 'sprites/leek.png');
        this.load.image('cauldron', 'sprites/cauldron2.png');
        this.load.image('cauldronHit', 'sprites/cauldronHit.png');
        this.load.image('shelf', 'sprites/shelf.png');
        this.load.image('char', 'sprites/chars/char1/char_1.png');

        // Atlas generated with: https://gammafp.github.io/atlas-packer-phaser/
        // atlas name (we decide), path for sprite file, path for sprite atlas.
        // TODO : Generate a new atlas with this tool : http://free-tex-packer.com/
        this.load.atlas('foods', 'sprites/food.png', 'sprites/foods_atlas.json');

        this.load.json('foodData', 'json/foodData.json');
    }

    create() {
        this.scene.start("playGame");
    }

    update() {

    }
}
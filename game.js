const config = {
    // Fixed size. TODO : responsive
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: '#444444',
    physics: {
        default: 'matter'
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/sprites/background.jpg');
    this.load.image('leek', 'assets/sprites/leek.png');
    this.load.image('cauldron', 'assets/sprites/cauldron2.png');
    this.load.image('shelf', 'assets/sprites/shelf.png');
    this.load.image('char', 'assets/sprites/chars/char1/char_1.png');
}


function create ()
{
    this.add.image(300,400, 'background');
    this.add.image(450, 725, 'cauldron');
    this.add.image(100, 550, 'shelf');
    this.add.image(230, 7, 'char').setOrigin(0,0);
    this.matter.world.setBounds();

    this.matter.add.image(100, 400, 'leek', null, { chamfer: 16 }).setBounce(0.5);

    //  These both do the same thing:

    // this.matter.add.pointerConstraint({ length: 1, stiffness: 0.6 });

    this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });
}

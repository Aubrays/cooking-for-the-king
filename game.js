//console.clear();

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: '#FFFFFF',
    parent: 'phaser-example',
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
    this.load.image('leek', 'assets/sprites/leek.png');
}

function create ()
{
    this.matter.world.setBounds();

    this.matter.add.image(100, 400, 'leek', null, { chamfer: 16 }).setBounce(0.5);

    //  These both do the same thing:

    // this.matter.add.pointerConstraint({ length: 1, stiffness: 0.6 });

    this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });
}

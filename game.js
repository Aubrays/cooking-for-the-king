const config = {
    // Fixed size. TODO : responsive
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: '#444444',
    physics: {
        default: 'matter',
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

// This function loads game assets.
function preload ()
{
    // add a global path "assets" to avoid repetition.
    this.load.path = 'assets/';

    // starting here, we no longer need to add "assets" in the file path.
    this.load.image('background', 'sprites/background.jpg');
    this.load.image('leek', 'sprites/leek.png');
    this.load.image('cauldron', 'sprites/cauldron2.png');
    this.load.image('cauldronHit', 'sprites/cauldronHit.png');
    this.load.image('shelf', 'sprites/shelf.png');
    this.load.image('char', 'chars/char1/char_1.png');

    // Atlas generated with: https://gammafp.github.io/atlas-packer-phaser/
    // atlas name (we decide), path for sprite file, path for sprite atlas.
    // TODO : Generate a new atlas with this tool : http://free-tex-packer.com/
    this.load.atlas('foods', 'sprites/food.png', 'sprites/foods_atlas.json');


}


function create ()
{
    // Create a container to store the animated "food" assets.
    this.food = {};

    // Test: see if the atlas is functional by loading the second part of the first line of the sprites.
    var patate = this.add.sprite(0,200, 'foods', 'food_1');

    this.add.image(300,400, 'background');
    this.add.image(100, 550, 'shelf');
    this.add.image(450, 725, 'cauldron');
    this.add.image(230, 7, 'char').setOrigin(0,0);
    this.matter.world.setBounds();

    var chauderon = this.matter.add.image(458, 628, 'cauldronHit', null, {isStatic: true, label: 'cauldron'});

    // create a leek at 450,400 rather than 100,400
    // what does chamfer do?
    this.food.leek = this.matter.add.image(450, 400, 'leek', null, { chamfer: 16, label: 'food' }).setBounce(0);
    // also add a kind of potato on the shelf
    // TODO: check if we're actually allowed potatoes? historical accuracy.
    // TODO: remove animation.
    this.food.patate = this.matter.add.sprite(100, 170, 'foods', 'food_1');

    // TODO: comment this? what is mouseSpring. not super important.
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });

    

    /* chauderon.setInteractive(new Phaser.Geom.Ellipse(160, 53, 150, 17), Phaser.Geom.Ellipse.Contains);
    this.input.on('gameobjectover', function (pointer, gameObject) {

        gameObject.setTint(0x7878ff);

    });

    this.input.on('gameobjectout', function (pointer, gameObject) {

        gameObject.clearTint();

    });  */

    //evenement collision
    this.matter.world.on('collisionstart', function (event) {
        
        //detecte les objects qui entre en collision et si un object nourriture touche
        //le chauderon, il est détruit et disparait
        var bodyA = getRootBody(event.pairs[0].bodyA);
        var bodyB = getRootBody(event.pairs[0].bodyB);

        if ((bodyA.label === 'food' && bodyB.label === 'cauldron') ||
            (bodyB.label === 'food' && bodyA.label === 'cauldron'))
            {
                var foodBody = bodyA.label === 'food' ? bodyA : bodyB;
                var food = foodBody.gameObject;                    
                this.matter.world.remove(foodBody);
    
                this.tweens.add({
                    targets: food,
                    alpha: { value: 0, duration: 150, ease: 'Power1' },
                    onComplete: function (food) { food.destroy(); }.bind(this, food)
                });
            }

    }, this);

    //TODO: comment this, what does it do?
    function getRootBody (body)
    {
        if (body.parent === body) { return body; }
        while (body.parent !== body)
        {
            body = body.parent;
        }
        return body;
    }

}

// todo:
/*
This function is called 60x per second (optimally), which should give a fluid, 60FPS animation.
*/
function update() {
    // the leek turns 0.5 degrees each update.
    // put as a comment because it isn't functionnal and throws errors.
    //this.food.leek.rotation += 0.05;
}
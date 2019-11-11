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
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/sprites/background.jpg');
    this.load.image('leek', 'assets/sprites/leek.png');
    this.load.image('cauldron', 'assets/sprites/cauldron2.png');
    this.load.image('cauldronHit', 'assets/sprites/cauldronHit.png');
    this.load.image('shelf', 'assets/sprites/shelf.png');
    this.load.image('char', 'assets/chars/char2/char_2.png');
}


function create ()
{
    this.add.image(300,400, 'background');
    this.add.image(100, 550, 'shelf');
    this.add.image(450, 725, 'cauldron');
    this.add.image(230, 7, 'char').setOrigin(0,0);
    this.matter.world.setBounds();

    var chauderon = this.matter.add.image(458, 628, 'cauldronHit', null, {isStatic: true, label: 'cauldron'});

    var leek = this.matter.add.image(100, 400, 'leek', null, { chamfer: 16, label: 'food' }).setBounce(0);

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

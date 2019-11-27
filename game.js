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

// Cette fonction sert à charger les "assets" du jeu 
function preload ()
{
    // On ajoute le chemin global "assets" afin d'éviter de le retaper 150x
    this.load.path = 'assets/';

    // il n'y a plus besoin de mettre "assets" dans le chemin du fichier
    this.load.image('background', 'sprites/background.jpg');
    this.load.image('leek', 'sprites/leek.png');
    this.load.image('cauldron', 'sprites/cauldron2.png');
    this.load.image('cauldronHit', 'sprites/cauldronHit.png');
    this.load.image('shelf', 'sprites/shelf.png');
    this.load.image('char', 'chars/char1/char_1.png');

    // Atlas generated with: https://gammafp.github.io/atlas-packer-phaser/
    // nom de l'atlas (libre), chemin vers fichier de sprites, chemin vers l'atlas des sprites
    this.load.atlas('foods', 'sprites/food.png', 'sprites/foods_atlas.json');


}


function create ()
{
    // Création d'un container pour ranger les assets "nourriture" animés
    this.food = {};

    // Test: on regarde si l'atlas fonctionne en chargeant le 2e élément de la première ligne des sprites
    var patate = this.add.sprite(0,200, 'foods', 'food_1');

    this.add.image(300,400, 'background');
    this.add.image(100, 550, 'shelf');
    this.add.image(450, 725, 'cauldron');
    this.add.image(230, 7, 'char').setOrigin(0,0);
    this.matter.world.setBounds();

    var chauderon = this.matter.add.image(458, 628, 'cauldronHit', null, {isStatic: true, label: 'cauldron'});

    // on crée un poireau aux coordonnées 450:400 (au lieu de 100:400)
    this.food.leek = this.matter.add.image(450, 400, 'leek', null, { chamfer: 16, label: 'food' }).setBounce(0);
    // on ajoute une sorte de patate en plus dans l'étagère. 
    // Fixme: enlever l'animation
    this.food.patate = this.matter.add.sprite(100, 170, 'foods', 'food_1');

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
// fonction de comparaison entre les stats d'un perso et ceux de la nourriture.
function compare(){
    let food_path = "/assets/food.json"
    let food_name = "food"
    let char_path = "/assets/chars/stats.json"
    let char_name = "characters"
    // one function to get JSON from a file and use it as an array
    // the structure of the data in stats.json and food.json allows this.
    // if any further data is to be added, it must follow a strictly identical structure.

    async function fetchJSON(path, name){
        let result = new Array()
            let promise = new Promise(function(resolve, reject){
            const myRequest = new Request(path)
            fetch(myRequest)
            .then(response => response.json())
            .then(data =>{
                for (const product of data[name]){
                    result.push(product)
                    }
                resolve(result)
                }
            )}
        )
        return promise
    }

    // ISSUE: this async function isn't awaiting, keeps returning a promise before it's resolved.
    // a function to get the food list
    async function getFoodList () {
        try{
            return await(fetchJSON(food_path, food_name))
        }
        catch(e) {
            console.error(e)
        }

    }
    //setTimeout(console.log(getFoodList()),5000)
    food_list = getFoodList()
    console.log(food_list)
}

compare()
// todo:
/*
Cette fonction est appelée 60 fois par seconde (optimalement), qui correspond à 60 FPS (animation fluide)
*/
function update() {
    // on fait tourner le poireau de .5 degrés à chaque update
    // en commentaire car pas fonctionnel.
    //this.food.leek.rotation += 0.05;
}
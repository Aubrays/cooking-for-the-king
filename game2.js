const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config)

function preload(){
    this.load.image('leek', 'assets/sprites/leek.png');
    this.load.image('chaudron', 'assets/sprites/chaudron.png');
    this.load.spritesheet('food', 'assets/sprites/food.png', 15, 17);

}

function create(){
    this.add.text(300, 250, 'Loading game...', {font:"25px Arial", fill:"yellow"});
    this.physics.add.image(100, 300, 'leek');
    this.physics.add.image(300, 200, 'chaudron');
    this.physics.add.spritesheet(200, 100, 'food');

}

function update(){
    
}

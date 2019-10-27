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
}

function create(){
    this.physics.add.image(100, 300, 'leek')
    this.physics.add.image(300, 200, 'chaudron')
}

function update(){
    
}

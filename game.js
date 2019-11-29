const config = {
    // Fixed size. TODO : responsive
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: '#444444',
    physics: {
        default: 'matter',
    },
    scene: [BootScene, PlayScene]
};

var game = new Phaser.Game(config);

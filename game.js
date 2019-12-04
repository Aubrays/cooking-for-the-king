// File for config and global values

const config = {
    // Fixed size. TODO : responsive
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    backgroundColor: '#444444',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [BootScene, PlayScene]
};

let game = new Phaser.Game(config);

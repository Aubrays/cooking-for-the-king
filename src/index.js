// File for config and global values

import Phaser from 'phaser';

// Import scenes
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene'
import PlayScene from './scenes/PlayScene';
import OptionsScene from './scenes/OptionsScene';


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
    scene: [BootScene, MenuScene, OptionsScene, PlayScene]
};

let game = new Phaser.Game(config);

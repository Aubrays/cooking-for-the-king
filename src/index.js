// File for config and global values

import Phaser from 'phaser';

// Import plugins
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

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
            debug: false
        }
    },
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin : RexUIPlugin,
            mapping: 'rexUI'
        }]
    },
    scene: [BootScene, MenuScene, OptionsScene, PlayScene],
};

let game = new Phaser.Game(config);

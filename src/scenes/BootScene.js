export default class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    // This function loads game assets.
    preload ()
    {
        // Images, atlas and spritesheets assets
        this.load.setPath('src/assets/sprites/');
        this.load.image('background', 'background.jpg');
        this.load.image('banner', 'GUI/banner.png');
        this.load.image('bannerParchment', 'GUI/bannerParchment.png');
        this.load.image('shelf', 'shelf.png');
        this.load.image('book', 'book.png');
        this.load.image('openBook', 'openBook.png');

        // Atlas generated with http://free-tex-packer.com/
        this.load.atlas('foods', 'food_dev.png', 'food_dev_atlas.json');

        this.load.spritesheet('cauldron', 'cauldron/cauldron_blue.png', {
            frameHeight: 339,
            frameWidth: 256
        });

        //trying something
        this.load.spritesheet('Mélisende', 'chars/char1.png',
                                {frameWidth:600,
                                frameHeight:600});
        this.load.spritesheet('Charles', 'chars/char2.png',
                                {frameWidth:600,
                                frameHeight:600});
        this.load.image('Gunièvre', 'chars/char3.png',
                                {frameWidth:600,
                                frameHeight:600});
        this.load.image('Loïc', 'chars/char4.png',
                                {frameWidth:600,
                                frameHeight:600});

        // Sound assets
        this.load.setPath('src/assets/sounds/');
        this.load.audio("plop", "plop_01.mp3");
        this.load.audio("splash", "splash_01.wav");
        this.load.audio("fire", "Home_Office_Fireplace_01.mp3");
        this.load.audio("win", "achievment_03.mp3");
        this.load.audio("wood", "collision_wood_soft_01.wav");
        this.load.audio("page", "Misc_Paper_TurnPage_01.mp3");
        this.load.audio('theme', 'ambiance/Locations_Medieval_Tavern_Song.mp3');

        // Various assets
        this.load.setPath('src/assets/');
        this.load.bitmapFont('augustaInk', 'fonts/augusta.png', 'fonts/augusta.fnt');



        this.load.json('foodData', 'json/foodData_dev.json');
        this.load.json('charData', 'json/charData.json');
        
        
    }

    create() {
        this.music = this.sound.add("theme");

        let musicConfig = {
            mute: true, //Unmute if necessary. Thank you for my ears. d(^_^)b
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.music.play(musicConfig);
        

        this.music = this.sound.add("fire");

        let fireConfig = {
            mute: true, 
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.anims.create({
            key: 'cauldron_anim',
            frames: this.anims.generateFrameNumbers('cauldron'),
            frameRate: 5,
            repeat: -1
          });


        this.music.play(fireConfig);
        this.scene.start("menuGame");
    }

    update() {

    }
}
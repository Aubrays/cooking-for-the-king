class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    // This function loads game assets.
    preload ()
    {
        // add a global path "assets" to avoid repetition.
        this.load.setPath('assets/');
        // starting here, we no longer need to add "assets" in the file path.
        this.load.image('background', 'sprites/background.jpg');
        this.load.image('cauldron', 'sprites/cauldron2.png');
        this.load.image('shelf', 'sprites/shelf.png');
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

        // Atlas generated with http://free-tex-packer.com/
        this.load.atlas('foods', 'sprites/food_dev.png', 'sprites/food_dev_atlas.json');

        this.load.json('foodData', 'json/foodData_dev.json');
        this.load.json('charData', 'json/charData.json');


        // add a global path "assets/sounds" to avoid repetition.
        this.load.setPath('assets/sounds/');
        this.load.audio("plop", "plop_01.mp3");
        this.load.audio("splash", "splash_01.wav");
        this.load.audio("fire", "Home_Office_Fireplace_01.mp3");
        this.load.audio("win", "achievment_03.mp3");
        this.load.audio("wood", "collision_wood_soft_01.wav");
        this.load.audio('music', ['ambiance/Locations_Medieval_Tavern_Song.mp3','ambiance/Locations_Medieval_Tavern_Song.ogg']);
        
    }

    create() {
        this.music = this.sound.add("music");

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

        this.music.play(fireConfig);
        this.scene.start("menuGame");
    }

    update() {

    }
}
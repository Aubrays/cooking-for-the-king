import Character from '../classes/Character';
import Food from '../classes/Food';
import LevelBanner from '../classes/LevelBanner';
import ProgressBar from '../classes/ProgressBar';
import { getActualStat } from '../helpers/calcStats';
import { levels } from '../levels';
import RoundRectangle from 'phaser3-rex-plugins/templates/ui/roundrectangle/Factory';
import { Tilemaps } from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(props)
    {
        const { level = 0 } = props
        this.currentLevel = level;
    }

    preload()
    {
        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');


        // Declarations of sprites (for physics)
        this.shelf = this.physics.add.sprite(100, 550, 'shelf');
        this.cauldron = this.physics.add.sprite(475, 700, 'cauldron');
    }

    // Restarted at each level
    create ()
    {

        
        
        // Elements of configuration
        this.physics.world.setBoundsCollision(true, true, true, true);
        let levelData = levels[this.currentLevel];

        // Declarations of data
        this.foodData = this.cache.json.get('foodData');
        this.charData = this.cache.json.get('charData');

        // Animation of the cauldron        
        this.cauldron.play('cauldron_anim');
        this.cauldron.body.setSize(175, 40);
        this.cauldron.body.setOffset(40, 100);

        // The recipe book
        this.book = this.add.sprite(100, 350, 'book').setInteractive();
        this.book.setScale(0.2);

        //Generates the recipe book container
        this.openBook = this.add.image(0, 0, 'openBook');
        this.openBook.setScale(0.2);
        this.close = this.add.text(140, -90, 'X').setInteractive();
        this.close.setTint(0xff0000);
        this.text = this.add.text(20, -70, 'Recipe', { fontFamily: 'Verdana, Tahoma, serif' });
        this.text.setTint(0x000000);
        this.posY = this.text.y;
        this.container = this.add.container(400, 300, [ this.openBook, this.text, this.close ]);
        this.container.visible = false;

        //opening and closing the book
        this.book.on('pointerdown', function(){
            if (this.container.visible == false){
                this.page = this.sound.add("page");
                this.page.play();
            }
            this.container.visible = true;
        }, this);
        this.close.on('pointerdown', function(){
            this.container.visible = false;
            this.page = this.sound.add("page");
            this.page.play();
        }, this);
        



        

        // Generate foods
        this.foods = this.physics.add.group();
        Phaser.Actions.Call(levelData.foods, function(food){
            let new_food = new Food(this, "foods", food);
            this.foods.add(new_food);
        }, this);
        this.alignFood(this);

        // Character elements
        this.char = new Character(this, levelData.char, 0);
        this.char.setDepth(30);
        let textScene = this.char.data.values.dialogue;
        
        if(this.currentLevel === 0){
            this.addDialogue(this, textScene);
        } else {
            this.levelText = new LevelBanner(this, this.currentLevel);
        }

        this.char.setInteractive()
        .on('pointerdown', function(pointer, localX, localY, event){
            this.scene.addDialogue(this.scene, textScene);

            this.disableInteractive();
        });



        // Creation of the progress bars
        this.heatBar = new ProgressBar(this, {
            pos: { x: 100, y: 20 },
            colorBar: 'redBar',
            // border_color: 0x000000,
            startValue: this.char.data.values.healthStats.heatStart,
            goalValue: this.char.data.values.healthStats.heatEnd
        });
        this.heatBar.updateProgressBar();

        this.coldMedal = this.add.container(35, 35);
        this.coldContainer = this.add.image(0,0, 'roundContainer').setScale(0.5);
        this.coldLogo = this.add.image(0,0, 'snowflake').setScale(0.3);
        this.coldMedal.add(this.coldContainer);
        this.coldMedal.add(this.coldLogo);

        this.heatMedal = this.add.container(375, 35);
        this.heatContainer = this.add.image(0,0, 'roundContainer').setScale(0.5);
        this.heatLogo = this.add.image(0,0, 'fire').setScale(0.3);
        this.heatMedal.add(this.heatContainer);
        this.heatMedal.add(this.heatLogo);

        this.moistBar = new ProgressBar (this, {
            pos: { x: 100, y: 50 },
            colorBar: 'blueBar',
            // border_color: 0x000000,
            startValue: this.char.data.values.healthStats.moistnessStart,
            goalValue: this.char.data.values.healthStats.moistnessEnd
        });
        this.moistBar.updateProgressBar();

        this.dryMedal = this.add.container(35, 100);
        this.dryContainer = this.add.image(0,0, 'roundContainer').setScale(0.5);
        this.dryLogo = this.add.image(0,0, 'dust').setScale(0.25);
        this.dryMedal.add(this.dryContainer);
        this.dryMedal.add(this.dryLogo);

        this.moistMedal = this.add.container(375, 100);
        this.moistContainer = this.add.image(0,0, 'roundContainer').setScale(0.5);
        this.moistLogo = this.add.image(0,0, 'drop').setScale(0.3);
        this.moistMedal.add(this.moistContainer);
        this.moistMedal.add(this.moistLogo);



        this.dish = {
            foods : [],
            heat : 0,
            moistness : 0,
            cost : 0
        }

        // Initialize stats
        this.actualMoistness = getActualStat(this, "moistness");
        this.actualHeat = getActualStat(this, "heat");

        // Game actions
        this.dragFood(this);
        this.physics.add.overlap(this.foods, this.cauldron, this.cauldronTouch, null, this);

    }

    update() {

    }

    addDialogue(context, textScene) {
        context.createTextBox(this, 300, 150, {
            wrapWidth: 250,
            fixedWidth: 250,
            fixedHeight: 150,
        })
        .start(textScene, 100);
    }

    
    createTextBox(scene, x, y, config) {
        let wrapWidth = Phaser.Utils.Objects.GetValue(config, 'wrapWidth', 0);
        let fixedWidth = Phaser.Utils.Objects.GetValue(config, 'fixedWidth', 0);
        let fixedHeight = Phaser.Utils.Objects.GetValue(config, 'fixedHeight', 0);
        let textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,
            background: scene.add.image(0, 0, 'parchment'),
            text: scene.getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 0,
                text: 0,
            }
        })
        .setOrigin(0)
        .setDepth(30)
        .layout();

        scene.displayShadow(scene, true);


        textBox.setInteractive()
        .on('pointerdown', function () {
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                this.on('pointerdown', function(pointer, localX, localY, event){
                    this.destroy();
                    scene.displayShadow(scene,false);
                    scene.char.setInteractive();
                })
                return;
            }
        }, textBox)
    return textBox;
}

    getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.add.text(0, 0, '', {
                fontSize: '20px',
                color : '#000',
                wordWrap: {
                    width: wrapWidth
                },
                maxLines: 5
            })
            .setFixedSize(fixedWidth, fixedHeight);
    }

    displayShadow(scene, bool) {
        if(bool === true){
            scene.shadow = scene.add.graphics();
            scene.shadow.fillStyle(0x000000, 0.75);
            scene.shadow.fillRect(0, 0, 600, 800);
            scene.shadow.setDepth(20);
        }
        else {
            scene.shadow.setAlpha(0);
        }
    }

    alignFood(scene) {
        Phaser.Actions.GridAlign(scene.foods.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 550
        });
    }

    realignFood(scene,food) {
        food.body.setAllowGravity(false);
        food.setVelocity(0,0);
        scene.alignFood(scene);
    }

    dragFood(scene) {
        this.input.on('dragstart', function(pointer, food, dragX, dragY){
            food.body.setAllowGravity(false);
            food.setVelocity(0,0);
            
        })
        
        this.input.on('drag', function(pointer, food, dragX, dragY){
            food.x = dragX;
            food.y = dragY;
        })

        this.input.on('dragend', function(pointer, food){

            if(food.x < scene.game.config.width/2) {

            // this.physics.moveTo(food, food.input.dragStartX, food.input.dragStartY, 5, 1000);

            // position y == height of shelf => return in shelf
            // food.input.dragStartX vs food.x
            
                // food.x = food.input.dragStartX;
                // food.y = food.input.dragStartY;
            

            } else {
                food.body.setAllowGravity(true);
                food.setGravity(0, 3000);
                food.setCollideWorldBounds(true);
                food.setBounce(0.5);
                
            }

            scene.time.addEvent({
                delay: 2000,
                callback: () => scene.realignFood(scene,food)
            })
            
        });

    }

    cauldronTouch(cauldron, food) {
        food.disableBody(true, true);

        // add sounds
        this.plop = this.sound.add("plop");
        this.plop.play();
        this.splash = this.sound.add("splash");
        this.splash.play();

        // add to the dish

        this.dish.foods.push(food.data.values.name);
        this.dish.moistness += food.data.values.moistness;
        this.dish.heat += food.data.values.heat;
        this.dish.cost += food.data.values.price;


        // write in the recipe
        this.posY += 20;
        this.recipe = this.add.text(30, this.posY, "- " + food.getData('name'));
        this.recipe.setTint(0x000000);
        this.container.add(this.recipe);
        


        // move gauges
        this.actualMoistness = getActualStat(this, "moistness");
        this.actualHeat = getActualStat(this, "heat");

        console.log('actual situation moist/heat: ' + this.actualMoistness, this.actualHeat);
        
        this.heatBar.updateProgressBar(this.actualHeat);
        this.moistBar.updateProgressBar(this.actualMoistness);
        this.checkVictory();
    }

    // checkPos()
    // {
    //     Phaser.Actions.Call(foods.getChildren(), 
    //     function(food){
    //         if(food.y > config.height){
    //             return;
    //         }
    //     });
    // }


    checkVictory(){

        let actualMoistness = this.actualMoistness;
        let actualHeat = this.actualHeat;
        let goalMoistness = this.char.data.values.healthStats.moistnessEnd;
        let goalHeat = this.char.data.values.healthStats.heatEnd;
         // function to change character appearence according to state of health.
        function checkHealth(){
            // based on the difference between actual and goal values
            let diff = ((Math.abs(actualMoistness - goalMoistness))
                        + (Math.abs(actualHeat - goalHeat)))
            console.log(diff)
            // return a value which will correspond to a certain frame
            // TODO: adjust values so this works better
            if (diff > 8){
                // this for the worst state
                return 0
                }
            else if (8 > diff && diff > 4){
                // this for medium
                return 1
                }
            else if (4 > diff && diff > 0){
                // this for doing well
                return 2
                }
            }
            console.log("health: " + checkHealth())
            // then assign the value from checkHealth to frame in char
            this.char.setFrame(checkHealth())
        if(actualMoistness == goalMoistness &&
            actualHeat == goalHeat) {
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        console.log("Victory !");
                    this.nextLevel(this, this.levelNumber);
                        this.winSound = this.sound.add("win");
                        this.winSound.play();
                    } 
                })
                
            }

        if(actualMoistness <= -4 || actualMoistness >= 4) {
            this.cameras.main.shake(500, 0.025)
            this.time.addEvent({
                delay: 500,
                callback: () => this.scene.restart()
            })
            console.log("Defeat !")
        }

        if(actualHeat <= -4 || actualHeat >= 4) {
            console.log("Defheat !")
        }
    }

    nextLevel(scene, level){
        scene.cameras.main.fadeOut();
        scene.time.addEvent({
            delay: 2000,
            callback: () => {
                scene.scene.restart({ level: this.currentLevel + 1 })
            } 
        })
        
    }

    
}


// Get data
// let data = this.cache.json.get('foodData');

// Set data to a sprite
// gameObject.setData();
// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html#setData__anchor

// parchemin under progress bars

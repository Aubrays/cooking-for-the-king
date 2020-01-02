class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(props)
    {
        const { level = 0 } = props
        this.currentLevel = level;
    }

    // Restarted at each level
    create ()
    {
        
        this.physics.world.setBoundsCollision(true, true, true, true);

        let levelName = 'level' + this.currentLevel.toString();

        let levelData = levels[this.currentLevel];

        // Declarations of data
        this.foodData = this.cache.json.get('foodData');
        this.charData = this.cache.json.get('charData');

        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');

        // Declarations of sprites (for physics)
        this.shelf = this.physics.add.sprite(100, 550, 'shelf');
        this.cauldron = this.physics.add.sprite(450, 725, 'cauldron');
        this.cauldron.body.setSize(200, 20);
        this.cauldron.body.setOffset(60, 50);
        this.book = this.add.sprite(100, 350, 'book').setInteractive();
        this.book.setScale(0.2);

        this.foods = this.physics.add.group();

        //Generates the recipe book container
        this.openBook = this.add.image(0, 0, 'openBook');
        this.openBook.setScale(0.2);
        this.close = this.add.text(140, -90, 'X');
        this.close.setTint(0xff0000);
        this.text = this.add.text(20, -70, 'Recipe');

        this.container = this.add.container(400, 300, [ this.openBook, this.text, this.close ]);
        /*this.container.visible = false;
        this.book.on('pointerdown', function () {

            this.container.visible = true;
        });*/
        
        this.posY = -50;

        // Generate foods for the level 1
        Phaser.Actions.Call(levelData.foods, function(food){
            let new_food = new Food(this, "foods", food);
            this.foods.add(new_food);
        }, this);

        // this.foods.setCollideWorldBounds(true, 0.75);

        Phaser.Actions.GridAlign(this.foods.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 550
        });

        this.dragFood();

        this.char = new Character(this, levelData.char, 0);

        // Creation of the progress bars
        this.heatBar = new ProgressBar(this, {
            pos: { x: 100, y: 40 },
            size: { w: 200, h: 20 },
            fill_color: 0xcc0000,
            border_color: 0x000000,
            startValue: this.char.data.values.heatStart,
            goalValue: this.char.data.values.heatEnd
        });
        this.heatBar.updateProgressBar();

        this.moistBar = new ProgressBar (this, {
            pos: { x: 100, y: 80 },
            size: { w: 200, h: 20 },
            fill_color: 0x0000cc,
            border_color: 0x000000,
            startValue: this.char.data.values.moistnessStart,
            goalValue: this.char.data.values.moistnessEnd
        });
        this.moistBar.updateProgressBar();

        this.dish = {
            foods : [],
            heat : 0,
            moistness : 0,
            cost : 0
        }

        this.physics.add.overlap(this.foods, this.cauldron, this.cauldronTouch, null, this);

    }

    update() {
        // checkPos();
    }

    dragFood() {
        this.input.on('dragstart', function(pointer, food, dragX, dragY){
            food.body.setAllowGravity(false);
            food.setVelocity(0,0);
            
        })
        
        this.input.on('drag', function(pointer, food, dragX, dragY){
            food.x = dragX;
            food.y = dragY;
        })

        this.input.on('dragend', function(pointer, food){
            if(food.x < config.width/2) {

            // this.physics.moveTo(food, food.input.dragStartX, food.input.dragStartY, 5, 1000);

            // position y == height of shelf => return in shelf
            // food.input.dragStartX vs food.x
            
                food.x = food.input.dragStartX;
                food.y = food.input.dragStartY;
            

            } else {
                food.body.setAllowGravity(true);
                food.setGravity(0, 3000);
                food.setCollideWorldBounds(true);
                food.setBounce(0.5);
                }
            
        });

    }

    cauldronTouch(cauldron, food) {
        food.disableBody(true, true);
        console.log(food.getData('name'));

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
        this.recipe = this.add.text(30, this.posY, food.getData('name'));
        this.container.add(this.recipe);
        this.posY + 20;


        // move gauges

        let actualMoistness = this.char.data.values.moistnessStart + this.dish.moistness;

        let actualHeat = this.char.data.values.heatStart + this.dish.heat;

        this.heatBar.updateProgressBar(actualHeat);
        this.moistBar.updateProgressBar(actualMoistness);
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
        let actualMoistness = this.char.data.values.moistnessStart + this.dish.moistness;
        let actualHeat = this.char.data.values.heatStart + this.dish.heat;
        let goalMoistness = this.char.data.values.moistnessEnd;
        let goalHeat = this.char.data.values.heatEnd;
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

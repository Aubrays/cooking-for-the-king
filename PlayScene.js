class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create ()
    {
        let foodData = this.cache.json.get('foodData');

        console.log(foodData);

        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');

        // Declarations of sprites (for physics)

        this.shelf = this.physics.add.sprite(100, 550, 'shelf');
        this.cauldron = this.physics.add.sprite(450, 725, 'cauldron');
        this.cauldron.body.setSize(200, 20);
        this.cauldron.body.setOffset(60, 50);

        // Manipulate the atlas data
        let texturesFood = this.textures.get('foods');
        let framesFood = texturesFood.getFrameNames();

        console.log(texturesFood.frames);

        // Phaser.Actions.Call(texturesFood, function(){


        // });

        // Add physics for all foods ppresent in atlas file
        // Put sprite names in game
        this.foods = this.physics.add.group({
            key: 'foods',
            frame: framesFood,
            frameQuantity: 2,
            collideWorldBounds : true
        });


        Phaser.Actions.Call(this.foods.getChildren(), function(food) {
            food.setInteractive({
                draggable: true
            });
        }, this);

        Phaser.Actions.GridAlign(this.foods.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 550
        });

        this.dragFood(this.foods);

        this.physics.add.overlap(this.foods, this.cauldron, this.cauldronTouch, null, this);

    }

    update() {
    }

    dragFood() {
        this.input.on('drag', function(pointer, food, dragX, dragY){
            food.x = dragX;
            food.y = dragY;
        })

        this.input.on('dragend', function(pointer, food){
        if(food.x < config.width/2) {
            return;

            // food.input.dragStartX vs food.x
        } else {
            food.setGravity(0, 4000);
        }
        });

        
    }

    cauldronTouch(cauldron, food) {
        food.disableBody(true, true);
        // add to the dish
        // write in the recipe
        // move gauges
    }
}


// Get data
// let data = this.cache.json.get('foodData');

// Set data to a sprite
// gameObject.setData();
// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html#setData__anchor


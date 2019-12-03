class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create ()
    {
        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');

        // Declarations of sprites (for physics)

        this.shelf = this.physics.add.sprite(100, 550, 'shelf');
        this.cauldron = this.physics.add.sprite(450, 725, 'cauldron');

        this.leek = this.physics.add.sprite(100, 200, 'leek').setInteractive();

        //Add physics for all foods
        // TODO : make a for loop !
        this.foods = this.physics.add.group();
        this.foods.add(this.leek);

        

        // Add gravtiy in the scene
        // this.physics.world.gravity.y = 60;


        // drag the leek
        this.input.setDraggable(this.leek);
        this.dragFood(this.leek);
        
        
        // if the leek is NOT in the right part of the scene,
            // go back to the shelf
        // else
            // the leek fall / add gravity

        // if the shelf collide the cauldron hitbox
            // add to the dish
            // write in the recipe
            // move gauges
        // else
            // go back to the shelf


    }

    update() {
        this.checkZone(this.leek);
    }

    dragFood(food) {
        this.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }

    checkZone(food) {
        if(food.x < config.width/2) {
            return;
        } else {
            food.setGravity(0, 300);
        }
    }
}
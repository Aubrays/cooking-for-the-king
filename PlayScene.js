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
        this.cauldron.body.setSize(200, 20);
        this.cauldron.body.setOffset(60, 50);


        this.leek = this.physics.add.sprite(100, 200, 'leek').setInteractive();

        //Add physics for all foods
        // Put sprite names in game
        this.foods = this.physics.add.group({
            key: 'foods',
            frame: ["leek.png","bread.png"],
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

        // leek example
        this.foods.add(this.leek);
        this.input.setDraggable(this.leek);
        this.dragFood(this.leek);

    }

    update() {
        Phaser.Actions.Call(this.foods.getChildren(), function(food) {
            this.checkPos(food)
        }, this);

        this.checkPos(this.leek);
    }

    dragFood() {
        this.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        
    }

    checkPos(food) {

        if(food.x < config.width/2) {
            return;

            // food.input.dragStartX vs food.x
        } else {
            food.setGravity(0, 300);
        }
    }

    cauldronTouch(cauldron, food) {
        food.disableBody(true, true);
        // add to the dish
        // write in the recipe
        // move gauges
    }
}
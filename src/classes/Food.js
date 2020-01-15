export default class Food extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, frame){
        super(scene, scene.x, scene.y);

        // scene.physics.world.enable(this);
        

        this.setTexture(texture);
        this.setFrame(frame);

        let dataObj = scene.foodData.foods.find(obj => obj.name === frame);
   
        this.setData(dataObj);

        this.setInteractive({
            draggable: true
        });
        scene.physics.add.existing(this);
        

        this.setCollideWorldBounds(true);
        this.setBounce(0.75, 0.75);

        scene.add.existing(this);
    }

}
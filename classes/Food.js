class Food extends Phaser.Physics.Arcade.Sprite {
    constructor(self, texture, frame){
        super(self, self.x, self.y);

        this.setTexture(texture);
        this.setFrame(frame);

        let dataObj = self.foodData.foods.find(obj => obj.name === frame);
   
        this.setData(dataObj);

        this.setInteractive({
            draggable: true
        });

        this.collideWorldBounds = true;


        this.scene.add.existing(this);
    }

}
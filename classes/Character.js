class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(self, texture, frame){
        super(self);
        this.x = 450;
        this.y = 0;
        this.setOrigin(0,0);

        this.setScale(0.2);       

        this.setTexture(texture);
        // this.setFrame(frame); 

        // let dataObj = self.charData.chars.find(obj => obj.name === frame);
        let dataObj = self.charData.chars.find(obj => obj.name === texture);
   
        this.setData(dataObj);

        console.log(this);

        this.scene.add.existing(this);

    }

}
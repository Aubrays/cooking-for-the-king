class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, frame){
        super(scene);
        this.x = 450;
        this.y = 0;
        this.setOrigin(0,0);

        this.setScale(0.2);       

        this.setTexture(texture);
        // this.setFrame(frame); 

        // let dataObj = self.charData.chars.find(obj => obj.name === frame);
        let dataObj = scene.charData.chars.find(obj => obj.name === texture);
   
        this.setData(dataObj);

        this.scene.add.existing(this);

    }

}
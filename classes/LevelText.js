class LevelBanner extends Phaser.GameObjects.Container {
    constructor(scene, level) {
      super(scene, 300, 400);

      let levelText = `Patient ${level + 1}`;

      let levelBitmapText = scene.add.dynamicBitmapText(0,-30,'augustaInk', levelText, 72);

      // Try to make a curved text for the banner...
      // function genPoint(centerX,centerY,degree,radius, data){
      //   let radPerDeg = Math.PI/180;
      //   data.x = centerX + ( radius * Math.cos(degree*radPerDeg) );
      //   data.y = centerY + ( radius * Math.sin(degree*radPerDeg) );
      // }

      // levelBitmapText.setDisplayCallback(genPoint(200, 100, 7, 50, levelBitmapText));
      // let banner = scene.add.image(0, 0, 'banner');

      let bannerParchment = scene.add.image(0,0, 'bannerParchment');
      bannerParchment.setScale(0.8);

      levelBitmapText.setScrollFactor(0)
        .setOrigin(0.5, 0)
        .setAlpha(1)

      

      this.add(bannerParchment);
      this.add(levelBitmapText);
      this.setScale(0.8);

      scene.add.existing(this);
  
      this.startTween();
    }
  
    // adjustPosition() {
    //   this.x = this.scene.cameras.main.width / 2
    //   this.y = this.scene.cameras.main.height / 2 - 50
    // }
  
    tweensAsync = (config) => {
      return new Promise(resolve => {
        this.scene.tweens.add({
          ...config,
          onComplete: () => {
            if (config.onComplete) config.onComplete()
            resolve()
          }
        })
      })
    }
  
    async startTween() {
      await this.tweensAsync({
        targets: this,
        scaleX: 1.5,
        scaleY: 1.5,
        yoyo: true,
        delay: 1500,
        duration: 300,
        onComplete: () => console.log('tween 1 completed')
      })
  
      // await this.tweensAsync({
      //   targets: this,
      //   y: 50,
      //   scaleX: 0.5,
      //   scaleY: 0.5,
      //   ease: 'Sine.easeInOut',
      //   delay: 500,
      //   duration: 400,
      //   onComplete: () => console.log('tween 2 completed')
      // })
  
      // this.setFontSize(28)
      // this.setScale(1)
  
      // await this.tweensAsync({
      //   targets: this,
      //   alpha: 0,
      //   delay: 2000,
      //   duration: 400,
      //   onComplete: () => console.log('tween 3 completed')
      // })
  
      this.destroy()
    }
  }
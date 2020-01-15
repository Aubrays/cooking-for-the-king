export default class LevelBanner extends Phaser.GameObjects.Container {
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

    startTween(){
      let tween = this.scene.tweens.add({
        targets: this,
        scaleX: 1.5,
        scaleY: 1.5,
        yoyo: true,
        delay: 1500,
        duration: 300,
        onComplete: () => {
          this.destroy();
        }
      })
    }
  }
export default class ProgressBar extends Phaser.GameObjects.Container {

    // Sketch
    // -4  -3  -2  -1   0   1   2   3   4
    //  |   |   |   |   |   |   |   |   |
    // => 9 positions, 8 intervals

    constructor(scene, options) {
        super(scene, options);

        let configBar = options;

        this.x = configBar.pos.x; // Must divided by 2 for an unknown reason...
        this.y = configBar.pos.y; // Must divided by 2 for an unknown reason...
        this.colorBar = configBar.colorBar;
        this.startValue = configBar.startValue;
        this.goalValue = configBar.goalValue;
        this.state = 'created';

        
        let barContainer = scene.add.sprite(this.x, this.y, 'containerBar').setScale(0.7);
        let bar = scene.add.sprite(barContainer.x, (barContainer.y)-2, this.colorBar).setScale(0.7).setDepth(5);
        this.barMask = scene.add.sprite(bar.x+90, bar.y*2+2, 'yellowBar').setScale(0.7).setDepth(10);
        this.barMask.visible = false;

        this.initBarMaskX = this.barMask.x;
        this.stepWidth = this.barMask.displayWidth / 8;
        bar.mask = new Phaser.Display.Masks.BitmapMask(scene, this.barMask);

        
        let cursorX = (this.goalValue+5) * this.stepWidth + 5;

        console.log('barContainer.x: ' + barContainer.x);
        console.log('barMask.x: ' + this.barMask.x);
        console.log('cursorX: ' + cursorX);

        let goalCursor = scene.add.sprite(cursorX, this.barMask.y, 'yellowCursorBar').setScale(0.7).setDepth(15);

        this.add(barContainer);
        this.add(bar);
        

        scene.add.existing(this);
    }

    updateProgressBar(value){
        
        if(this.state == 'created'){
            value = this.startValue;
        }

        (value < -4 ? value = -4 : value); 
        (value > 4 ? value = 4 : value);

        console.log('input value: ' + value);
    
        let nbStep = (4-value);
        let totalStepValue = this.stepWidth * nbStep;
        this.barMask.x = this.initBarMaskX - totalStepValue;
        this.setState('updated');
    }
}
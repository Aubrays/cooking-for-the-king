export default class ProgressBar extends Phaser.GameObjects.Graphics {

    // Sketch
    // -4  -3  -2  -1   0   1   2   3   4
    //  |   |   |   |   |   |   |   |   |
    // => 9 positions, 8 intervals

    constructor(scene, options) {
        super(scene, options);

        config.bar = options;

        this.x = config.bar.pos.x/2; // Must divided by 2 for an unknown reason...
        this.y = config.bar.pos.y/2; // Must divided by 2 for an unknown reason...
        this.w = config.bar.size.w;
        this.z = config.bar.size.h;
        this.defaultFillColor = config.bar.fill_color;
        this.defaultFillAlpha = 0.7;
        this.defaultStrokeColor = config.bar.border_color;
        this.startValue = config.bar.startValue;
        this.goalValue = config.bar.goalValue;
        this.state = 'created';

        let borderOffset = 1;

        let borderRect = new Phaser.Geom.Rectangle(
            this.x*2 - borderOffset,
            this.y*2 - borderOffset,
            this.w + borderOffset * 2,
            this.z + borderOffset * 2
        );

        let border = scene.add.graphics({
            lineStyle: {
                width: 2,
                color: this.defaultStrokeColor
            }
        });
        border.strokeRectShape(borderRect);


        let goalStroke = new Phaser.Geom.Line(
            ((this.goalValue + 4) / 8) * this.w + this.x*2 - borderOffset*2,
            this.y*2,
            ((this.goalValue + 4) / 8) * this.w + this.x*2 - borderOffset*2,
            this.y*2 + this.z
        );

        let goal = scene.add.graphics({
            lineStyle: {
                color: 0x00cc00,
                width: 4
            }
        });
        goal.strokeLineShape(goalStroke);
        goal.setDepth(100); // Same as z-index

        let scale = scene.add.graphics({
            lineStyle: {
                color: 0x333333,
                width: 2,
                alpha: 0.5
            }
        });
        scale.setDepth(90);

        for(let rank = 1; rank < 8; rank++){
            let scaleStroke = new Phaser.Geom.Line(
                rank/8 * this.w + this.x*2 - borderOffset ,
                this.y*2,
                rank/8 * this.w + this.x*2 - borderOffset,
                this.y*2 + this.z
            );
            scale.strokeLineShape(scaleStroke);
        }

        scene.add.existing(this);
    }

    updateProgressBar(value){
        
        if(this.state == 'created'){
            value = this.startValue;
        }
        let percentage = (value + 4) / 8;

        this.clear();
        this.fillStyle( this.defaultFillColor, this.defaultFillAlpha );
        this.fillRect( this.x, this.y, percentage * this.w , this.z);
        this.setState('updated');
    }
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    jumpHeight: number = 0;

    @property
    jumpDuration: number = 0;

    @property
    maxMoveSpeed: number = 0;

    @property
    acceleration: number = 0;

    @property({ type: cc.AudioClip })
    jumpAudio: cc.AudioClip = null;

    jumpAction: cc.ActionInterval;
    accLeft: boolean;
    accRight: boolean;
    xSpeed: number;

    setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))
            .easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight))
            .easing(cc.easeCubicActionIn());

        var callback = cc.callFunc(function () {
            cc.audioEngine.playEffect(this.jumpAudio, false);
        }, this);


        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    }

    setInputControl() {
        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event: cc.Event.EventKeyboard) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.macro.KEY.d:
                    self.accRight = true;
                    break;
                default:
            }
        });
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event: cc.Event.EventKeyboard) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.macro.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
    }


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        this.setInputControl();
    }

    start() {

    }

    update (dt) {
        if (this.accLeft) {
            this.xSpeed -= this.acceleration * dt;
        } else if (this.accRight) {
            this.xSpeed += this.acceleration * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reaches its limit, use the max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
    }
}

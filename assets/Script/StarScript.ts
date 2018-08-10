import GameScript from "./GameScript"

const { ccclass, property } = cc._decorator;

@ccclass
export default class StarScript extends cc.Component {

    @property
    pickRadius: number = 60;

    gameScript: GameScript = null;

    getPlayerDistance() {
        var playerPos = this.gameScript.player.getPosition();
        return this.node.position.sub(playerPos).mag()
        
        //return cc.pDistance(this.node.position, playerPos);
    }

    onPicked() {
        this.gameScript.spawnNewStar();
        this.gameScript.gainScore();
        this.node.destroy();
    }


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }

        // 徐々に透明になる
        var opacityRatio = 1 - this.gameScript.timer / this.gameScript.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}

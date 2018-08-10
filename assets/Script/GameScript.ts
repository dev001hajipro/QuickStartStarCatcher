import PlayerScript from "./PlayerScript"
import StarScript from "./StarScript"

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    @property
    minStarDuration: number = 0;

    @property
    maxStarDuration: number = 0;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    @property({type: cc.AudioClip})
    scoreAudio: cc.AudioClip = null;
    
    private score;
    timer;
    starDuration;
    private groundY;

    spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.makeRandomPosition());
        var ss: StarScript = newStar.getComponent('StarScript');
        ss.gameScript = this;

        this.timer = 0;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    }

    makeRandomPosition() {
        const minus1to1 = ((Math.random() - 0.5) * 2)
        var randX = minus1to1 * this.node.width / 2;

        var playerScript: PlayerScript = this.player.getComponent('PlayerScript');
        var randY = this.groundY + Math.random() * playerScript.jumpHeight + 50;

        return cc.v2(randX, 100);
    }

    gainScore () {
        this.score += 1;
        this.scoreDisplay.string = `Score: ${this.score}`;

        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('Game'); // reload game scene.
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.score = 0;
        this.timer = 0;
        this.starDuration = 0;        
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    }

    update (dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return
        }
        this.timer += dt;
    }
}

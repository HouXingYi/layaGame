var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 游戏UI类
 */
var GameInfo = /** @class */ (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        var _this = _super.call(this) || this;
        //注册按钮点击事件，点击之后暂停游戏
        _this.pauseBtn.on(Laya.Event.CLICK, _this, _this.onPauseBtnClick);
        //初始化UI显示
        _this.reset();
        return _this;
    }
    GameInfo.prototype.reset = function () {
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    };
    GameInfo.prototype.onPauseBtnClick = function (e) {
        //阻止事件冒泡
        e.stopPropagation();
        //暂停游戏
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏";
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    };
    GameInfo.prototype.onStageClick = function (e) {
        this.infoLabel.text = "";
        gameInstance.resume();
    };
    //显示血量
    GameInfo.prototype.hp = function (value) {
        this.hpLabel.text = "HP:" + value;
    };
    //显示关卡级别
    GameInfo.prototype.level = function (value) {
        this.levelLabel.text = "Level:" + value;
    };
    //显示积分
    GameInfo.prototype.score = function (value) {
        this.scoreLabel.text = "Score:" + value;
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map
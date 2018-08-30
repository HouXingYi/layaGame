var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 循环滚动的游戏背景
 */
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        _super.call(this);
        this.init();
    }
    BackGround.prototype.init = function () {
        //创建背景1
        this.bg1 = new Laya.Sprite();
        //加载并显示背景图
        this.bg1.loadImage("war/background.png");
        //把背景图显示在容器内
        this.addChild(this.bg1);
        //创建背景2
        this.bg2 = new Laya.Sprite();
        //加载并显示背景图
        this.bg2.loadImage("war/background.png");
        //更改背景2的位置，放在背景1的上边
        this.bg2.pos(0, -852);
        //把背景图显示在容器内
        this.addChild(this.bg2);
        //创建一个帧循环，更新容器的位置
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    BackGround.prototype.onLoop = function () {
        //背景容器每帧向下移动一像素
        this.y += 1;
        //如果背景图到了不可见的位置，立马调整到上边循环显示
        if (this.bg1.y + this.y >= 852) {
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map
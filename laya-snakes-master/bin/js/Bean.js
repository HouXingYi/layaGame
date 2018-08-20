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
 * Bean extends laya.display.Sprite
 */
var Bean = /** @class */ (function (_super) {
    __extends(Bean, _super);
    function Bean(x, y, colorNum) {
        if (x === void 0) { x = Math.random() * game.gameMainUI.map.width; }
        if (y === void 0) { y = Math.random() * game.gameMainUI.map.height; }
        if (colorNum === void 0) { colorNum = Math.floor(Math.random() * (6 - 1 + 1) + 1); }
        var _this = _super.call(this) || this;
        _this.haveEaten = false;
        _this.speed = 2;
        _this.eatenTargetPos = { x: 0, y: 0 };
        _this.haveEatenDis = 4;
        _this.eatenPos = { x: 0, y: 0 };
        _this.eatenInitPos = { x: 0, y: 0 };
        _this.colorNum = colorNum;
        _this.zOrder = 0;
        _this.visible = false;
        _this.eatenInitPos["x"] = x;
        _this.eatenInitPos["y"] = y;
        _this.init(x, y);
        return _this;
    }
    Bean.prototype.init = function (x, y) {
        this.loadImage("images/bean" + this.colorNum + ".png", 0, 0, 0, 0, new Handler(this, this.loaded, [x, y]));
    };
    Bean.prototype.loaded = function (x, y) {
        this.zOrder = 0;
        this.pivot(this.width / 2, this.height / 2);
        this.pos(x, y);
        this.visible = true;
    };
    return Bean;
}(laya.display.Sprite));
//# sourceMappingURL=Bean.js.map
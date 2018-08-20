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
var Metal;
(function (Metal) {
    /**
     * 长方体类
     */
    var Rectangle = /** @class */ (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(type, long, width, height, v3Positon, v3Rotate, textureUrl) {
            if (type === void 0) { type = -1; }
            if (long === void 0) { long = 1; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 3; }
            if (v3Positon === void 0) { v3Positon = new Laya.Vector3(0, 0, 0); }
            if (v3Rotate === void 0) { v3Rotate = new Laya.Vector3(0, 45, 0); }
            if (textureUrl === void 0) { textureUrl = 'laya/assets/imgs/red.png'; }
            var _this = this;
            var curBoxMesh = new Laya.BoxMesh(long, width, height);
            _this = _super.call(this, curBoxMesh) || this;
            _this.speed = 0.5;
            _this.count = 0;
            _this.type = type;
            _this.boxMesh = curBoxMesh;
            _this.transform.position = v3Positon;
            _this.curPosition = _this.transform.position;
            _this.transform.rotate(v3Rotate, false, false);
            var material = new Laya.StandardMaterial();
            material.diffuseTexture = Laya.Texture2D.load(textureUrl);
            _this.meshRender.material = material;
            return _this;
        }
        /**
         * 移动
         */
        Rectangle.prototype.move = function () {
            var subV3 = new Laya.Vector3();
            if (this.type == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE) {
                var endX = this.curPosition.x + Utils.mDistance / Math.sqrt(2) * 2;
                var endZ = this.curPosition.z + Utils.mDistance / Math.sqrt(2) * 2;
                if (this.curPosition.x > 0) {
                    endX = this.curPosition.x - Utils.mDistance / Math.sqrt(2) * 2;
                    endZ = this.curPosition.z - Utils.mDistance / Math.sqrt(2) * 2;
                }
            }
            else {
                var endX = this.curPosition.x - Utils.mDistance / Math.sqrt(2) * 2;
                var endZ = this.curPosition.z + Utils.mDistance / Math.sqrt(2) * 2;
                if (this.curPosition.x < 0) {
                    endX = this.curPosition.x + Utils.mDistance / Math.sqrt(2) * 2;
                    endZ = this.curPosition.z - Utils.mDistance / Math.sqrt(2) * 2;
                }
            }
            var endPosition = new Laya.Vector3(endX, Utils.moveRectangleY, endZ);
            Laya.Vector3.subtract(endPosition, this.transform.position, subV3);
            var self = this;
            var moveComplete = Laya.Handler.create(this, function () {
                // Notification.instance.postNotice(postNoticeName);
                self.move();
            });
            this.curMoveTween = Laya.Tween.to(this.curPosition, { x: endPosition.x, y: Utils.moveRectangleY, z: endPosition.z }, Utils.mMoveTime, null, moveComplete);
        };
        /**
         * 移动结束
         */
        Rectangle.prototype.stopMove = function () {
            if (this.curMoveTween) {
                this.curMoveTween.recover();
                this.curMoveTween = null;
            }
        };
        /**
         * 下落
         */
        Rectangle.prototype.fall = function () {
            this.curPosition = this.transform.position;
            var endPosition = new Laya.Vector3(this.transform.position.x, this.transform.position.y - 8, this.transform.position.z);
            var falltime = Utils.mFallTime;
            var postNoticeName = 'MoveRectangleFallComplete';
            if (this.type == RECTANGLETYPE.BASERECTANGLE) {
                endPosition = new Laya.Vector3(Utils.bEndPos[0], Utils.bEndPos[1], Utils.bEndPos[2]);
                falltime = Utils.bFallTime;
                postNoticeName = 'BaseRectangleFallComplete';
            }
            var fallComplete = Laya.Handler.create(this, function () {
                Notification.instance.postNotice(postNoticeName);
            });
            Laya.Tween.to(this.curPosition, { x: endPosition.x, y: endPosition.y, z: endPosition.z }, falltime, null, fallComplete);
        };
        return Rectangle;
    }(Laya.MeshSprite3D));
    Metal.Rectangle = Rectangle;
    /**
     * 长方体类型枚举
     */
    var RECTANGLETYPE;
    (function (RECTANGLETYPE) {
        RECTANGLETYPE[RECTANGLETYPE["BASERECTANGLE"] = -1] = "BASERECTANGLE";
        RECTANGLETYPE[RECTANGLETYPE["RIGHTTOPRECTANGLE"] = 0] = "RIGHTTOPRECTANGLE";
        RECTANGLETYPE[RECTANGLETYPE["LEFTTOPRECTANGLE"] = 1] = "LEFTTOPRECTANGLE";
    })(RECTANGLETYPE = Metal.RECTANGLETYPE || (Metal.RECTANGLETYPE = {}));
})(Metal || (Metal = {}));
//# sourceMappingURL=Rectangle.js.map
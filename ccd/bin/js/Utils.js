/**
 * 工具类
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * 一些常量，生产环境建议剥离到配置文件config.json
     */
    /**底座长方体常数 */
    Utils.bLong = 3.5; // 长
    Utils.bWidht = 3.5; // 宽
    Utils.bHeight = 8; // 高
    Utils.bStartPos = [0, -3, 0]; // 开始坐标
    Utils.bEndPos = [0, -4.5, 0]; // 结束坐标
    Utils.bFallTime = 1500; // 开始动画持续时间
    /**移动长方体常数 */
    Utils.mHeight = 0.3; // 高
    Utils.mDistance = 5; // 平移距离
    Utils.mFallTime = 1500; // 下落持续时间
    Utils.mMoveTime = 2000; // 平移一趟持续时间，调节难度
    // public static moveRectangleY: number = -0.3;  // y轴 
    Utils.moveRectangleY = Utils.bHeight / 2 + Utils.bEndPos[1] + Utils.mHeight / 2; // y轴 
    return Utils;
}());
//# sourceMappingURL=Utils.js.map
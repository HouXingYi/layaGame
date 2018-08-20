/**
 * 工具类
 */
class Utils {

    /**
     * 一些常量，生产环境建议剥离到配置文件config.json
     */
    /**底座长方体常数 */
    public static bLong: number = 3.5;    // 长
    public static bWidht: number = 3.5;   // 宽
    public static bHeight: number = 8;    // 高
    public static bStartPos: number[] = [0, -3, 0];  // 开始坐标
    public static bEndPos: number[] = [0, -4.5, 0];  // 结束坐标
    public static bFallTime: number = 1500;          // 开始动画持续时间

    /**移动长方体常数 */
    public static mHeight: number = 0.3;             // 高
    public static mDistance: number = 5;             // 平移距离
    public static mFallTime: number = 1500;          // 下落持续时间
    public static mMoveTime: number = 2000;          // 平移一趟持续时间，调节难度
    // public static moveRectangleY: number = -0.3;  // y轴 
    public static moveRectangleY: number = Utils.bHeight / 2 + Utils.bEndPos[1] + Utils.mHeight / 2;    // y轴 

    constructor() {

    }

}
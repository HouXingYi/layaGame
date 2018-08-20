/*
* name;
*/
var GameData = /** @class */ (function () {
    function GameData() {
    }
    /**
     * 单例模式
     */
    GameData.getInstance = function () {
        if (GameData._instance == null) {
            GameData._instance = new GameData();
        }
        return GameData._instance;
    };
    GameData._instance = null;
    return GameData;
}());
//# sourceMappingURL=GameData.js.map
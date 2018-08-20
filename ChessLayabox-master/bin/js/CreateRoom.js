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
/*
* name;
*/
var CreateRoom = /** @class */ (function (_super) {
    __extends(CreateRoom, _super);
    function CreateRoom() {
        var _this = _super.call(this) || this;
        _this.create.on(Laya.Event.CLICK, _this, _this.onCreateRoom);
        SocketEmitter.register("socket", _this.onResponse, _this);
        return _this;
    }
    CreateRoom.prototype.onCreateRoom = function (event) {
        console.log("onCreateRoom");
        var socket = SocketManager.getInstance();
    };
    CreateRoom.prototype.onResponse = function (eventName, userid) {
        console.log(eventName, userid);
        // var gamedata = GameData.getInstance();
        // gamedata.roomid = roomid;
        // UIManager.toUI("gameroom");
    };
    return CreateRoom;
}(ui.createroomUI));
//# sourceMappingURL=CreateRoom.js.map
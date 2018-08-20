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
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        NetworkManager.getInstance().connectPomelo();
        _this.login.on(Laya.Event.CLICK, _this, _this.onLogin);
        return _this;
    }
    Login.prototype.onLogin = function (e) {
        var user = this.user.text;
        var room = this.room.text;
        this.username = user;
        GameData.getInstance().myuser = user;
        // var socket = SocketManager.getInstance();
        // socket.sendLogin(user,pwd);
        NetworkManager.getInstance().onJoin(room, user, this.onJoinCallback);
    };
    Login.prototype.onJoinCallback = function (data) {
        console.log(data.room);
        console.log(data.users);
        GameData.getInstance().room = data.room;
        GameData.getInstance().users = data.users;
        UIManager.toUI(1 /* GameRoom */);
    };
    return Login;
}(ui.loginUI));
//# sourceMappingURL=Login.js.map
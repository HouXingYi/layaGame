/**
 * 抛事件
 */
var Notification = /** @class */ (function () {
    function Notification() {
        this._events = {}; //事件存储
    }
    Object.defineProperty(Notification, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new Notification();
            }
            return Notification._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注册事件通知监听
     * @param {string} name             通知名称
     * @param {Function} sender         通知回调函数
     * @param {T} context               通知回调对象
     */
    Notification.prototype.addNotice = function (name, sender, context) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
        this._events[name].push({ sender: sender, context: context });
    };
    /**
     * 执行一次事件监听后即销毁事件监听
     * @param {string} name          通知名称
     * @param {Function} sender      通知回调函数
     * @param {*} context            通知回调对象
     */
    Notification.prototype.onceNotice = function (name, sender, context) {
        // this.onceObserver(name, sender, context, priority);
    };
    /**
     * 根据事件名、回调函数和作用域，删除指定的事件监听
     * @param {string} name              通知名称
     * @param {(...args) => void} sender 通知回调函数
     * @param {T} context                通知回调对象
     */
    Notification.prototype.removeNotice = function (name, sender) {
        if (sender === void 0) { sender = null; }
        var fns = this._events[name];
        if (!fns) {
            return null;
        }
        if (!sender) {
            delete this._events[name];
        }
        else {
            for (var i = 0; i < fns.length; i++) {
                if (fns[i] && fns[i].sender === sender) {
                    fns.splice(i, 1);
                }
            }
        }
    };
    /**
     * 发送事件通知
     * @param {string} name 通知名称
     * @param {any} args    通知参数列表
     */
    Notification.prototype.postNotice = function (name, data) {
        name = Array.prototype.shift.call(arguments);
        var cbs = this._events[name];
        if (cbs && cbs.length > 0) {
            for (var i = 0; i < cbs.length; i++) {
                if (cbs[i] && cbs[i].context) {
                    cbs[i].sender.apply(cbs[i].context, arguments);
                }
            }
        }
    };
    return Notification;
}());
//# sourceMappingURL=Notification.js.map
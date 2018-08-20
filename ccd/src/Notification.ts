/**
 * 抛事件
 */
class Notification {
	private static _instance: Notification;
	protected _events: Object = {};  //事件存储
	constructor() {
	}
	public static get instance(): Notification {
		if (this._instance == null) {
			this._instance = new Notification();
		}
		return Notification._instance;
	}
	/**
	 * 注册事件通知监听
	 * @param {string} name             通知名称
	 * @param {Function} sender         通知回调函数
	 * @param {T} context               通知回调对象
	 */
	public addNotice<T>(name: string, sender: Function, context: T): void {
		if (!this._events[name]) {
			this._events[name] = [];
		}
		this._events[name].push({ sender: sender, context: context });
	}
	/**
	 * 执行一次事件监听后即销毁事件监听
	 * @param {string} name          通知名称 
	 * @param {Function} sender      通知回调函数
	 * @param {*} context            通知回调对象
	 */
	public onceNotice(name: string, sender: Function, context: any): void {
		// this.onceObserver(name, sender, context, priority);
	}
	/**
	 * 根据事件名、回调函数和作用域，删除指定的事件监听
	 * @param {string} name              通知名称
	 * @param {(...args) => void} sender 通知回调函数
	 * @param {T} context                通知回调对象
	 */
	public removeNotice<T>(name: string, sender: Function = null): void {
		var fns = this._events[name];
		if (!fns) {
			return null;
		}
		if (!sender) {
			delete this._events[name];
		} else {
			for (var i = 0; i < fns.length; i++) {
				if (fns[i] && fns[i].sender === sender) {
					fns.splice(i, 1);
				}
			}
		}
	}
	/**
	 * 发送事件通知
	 * @param {string} name 通知名称
	 * @param {any} args    通知参数列表
	 */
	public postNotice(name: string, data?: any): void {
		name = Array.prototype.shift.call(arguments);
		let cbs = this._events[name];
		if (cbs && cbs.length > 0) {
			for (let i = 0; i < cbs.length; i++) {
				if (cbs[i] && cbs[i].context) {
					cbs[i].sender.apply(cbs[i].context, arguments);
				}
			}
		}
	}
}

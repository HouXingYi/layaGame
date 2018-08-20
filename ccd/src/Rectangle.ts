
module Metal {
	/**
	 * 长方体类
	 */
	export class Rectangle extends Laya.MeshSprite3D {
		public boxMesh: Laya.BoxMesh;
		public speed: number;
		public count: number;
		public curPosition: Laya.Vector3;
		public type: number;
		public curMoveTween: Laya.Tween;

		constructor(type: number = -1, long: number = 1, width: number = 1, height: number = 3, v3Positon: Laya.Vector3 = new Laya.Vector3(0, 0, 0), v3Rotate: Laya.Vector3 = new Laya.Vector3(0, 45, 0), textureUrl: string = 'laya/assets/imgs/red.png') {
			var curBoxMesh: Laya.BoxMesh = new Laya.BoxMesh(long, width, height);
			super(curBoxMesh);
			this.speed = 0.5;
			this.count = 0;
			this.type = type;
			this.boxMesh = curBoxMesh;
			this.transform.position = v3Positon;
			this.curPosition = this.transform.position;
			this.transform.rotate(v3Rotate, false, false);
			var material: Laya.StandardMaterial = new Laya.StandardMaterial();
			material.diffuseTexture = Laya.Texture2D.load(textureUrl);
			this.meshRender.material = material;
		}
		/**
		 * 移动
		 */
		public move(): void {
			let subV3: Laya.Vector3 = new Laya.Vector3();
			if (this.type == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE) {
				var endX = this.curPosition.x + Utils.mDistance / Math.sqrt(2) * 2;
				var endZ = this.curPosition.z + Utils.mDistance / Math.sqrt(2) * 2;
				if (this.curPosition.x > 0) {
					endX = this.curPosition.x - Utils.mDistance / Math.sqrt(2) * 2;
					endZ = this.curPosition.z - Utils.mDistance / Math.sqrt(2) * 2;
				}
			} else {
				var endX = this.curPosition.x - Utils.mDistance / Math.sqrt(2) * 2;
				var endZ = this.curPosition.z + Utils.mDistance / Math.sqrt(2) * 2;
				if (this.curPosition.x < 0) {
					endX = this.curPosition.x + Utils.mDistance / Math.sqrt(2) * 2;
					endZ = this.curPosition.z - Utils.mDistance / Math.sqrt(2) * 2;
				}
			}
			let endPosition: Laya.Vector3 = new Laya.Vector3(endX, Utils.moveRectangleY, endZ);
			Laya.Vector3.subtract(endPosition, this.transform.position, subV3);
			let self = this;
			let moveComplete: Laya.Handler = Laya.Handler.create(this, () => {
				// Notification.instance.postNotice(postNoticeName);
				self.move();
			});
			this.curMoveTween = Laya.Tween.to(this.curPosition, { x: endPosition.x, y: Utils.moveRectangleY, z: endPosition.z }, Utils.mMoveTime, null, moveComplete);
		}
		/**
		 * 移动结束
		 */
		public stopMove(): void {
			if (this.curMoveTween) {
				this.curMoveTween.recover();
				this.curMoveTween = null;
			}
		}
		/**
		 * 下落
		 */
		public fall(): void {
			this.curPosition = this.transform.position;
			let endPosition: Laya.Vector3 = new Laya.Vector3(this.transform.position.x, this.transform.position.y - 8, this.transform.position.z);
			let falltime: number = Utils.mFallTime;
			let postNoticeName = 'MoveRectangleFallComplete';
			if (this.type == RECTANGLETYPE.BASERECTANGLE) {
				endPosition = new Laya.Vector3(Utils.bEndPos[0], Utils.bEndPos[1], Utils.bEndPos[2]);
				falltime = Utils.bFallTime;
				postNoticeName = 'BaseRectangleFallComplete';
			}
			let fallComplete: Laya.Handler = Laya.Handler.create(this, () => {
				Notification.instance.postNotice(postNoticeName);
			});
			Laya.Tween.to(this.curPosition, { x: endPosition.x, y: endPosition.y, z: endPosition.z }, falltime, null, fallComplete);
		}
	}
	/**
	 * 长方体类型枚举
	 */
	export enum RECTANGLETYPE {
		BASERECTANGLE = -1,    // 基座长方体
		RIGHTTOPRECTANGLE = 0, // 右上长方体（右上、左下来回平移）
		LEFTTOPRECTANGLE = 1,  // 左上长方体（左上、右下来回平移）
	}
}
// 程序入口
var Main = /** @class */ (function () {
    // private _bgRect: Laya.Sprite = null;
    function Main() {
        this._baseRectangle = null;
        this._rectabgles = [];
        this._count = 0; // 点击屏幕次数，即分数
        this._startImg = null;
        this._moveRectangle = null;
        this._lastRectangle = null;
        this._fallRectangle = null;
        this._v3Rotate = new Laya.Vector3(0, 45, 0);
        this._gameOver = false;
        this._canClickStage = false;
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //初始化引擎
        Laya3D.init(0, 0, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        // Laya.Stat.show();
        // Laya.URL.basePath = "https://www.luoluo18.cn/";
        Laya.URL.basePath = "https://www.ydhwh.cn/";
        this.init(0);
        //对屏幕改小改变进行监听
        // Laya.Browser.window.onresize = this.onWindowResize;
        Notification.instance.addNotice("MoveRectangleFallComplete", this.moveRectangleFallComplete, this);
        Notification.instance.addNotice("BaseRectangleFallComplete", this.baseRectangleFallComplete, this);
    }
    /**
     * 初始化
     */
    Main.prototype.init = function (type) {
        if (type === void 0) { type = 1; }
        // reset data
        this._rectabgles = [];
        this._count = 0;
        this._moveRectangle = null;
        this._lastRectangle = null;
        this._fallRectangle = null;
        this._gameOver = false;
        this._canClickStage = false;
        // 重置舞台
        Laya.stage.destroyChildren();
        Laya.timer.clearAll(this);
        // 加背景
        // this._bgRect = new Laya.Sprite();
        // // this._bgRect.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, '#348093');
        // this._bgRect.graphics.drawRect(0, 0, Laya.Browser.width, Laya.Browser.height, '#348093');
        // Laya.stage.addChild(this._bgRect);
        Laya.stage.bgColor = "#348093";
        //添加3D场景
        this._scene = Laya.stage.addChild(new Laya.Scene());
        //添加照相机
        this._camera = (this._scene.addChild(new Laya.Camera(0, 0.1, 100)));
        this._camera.transform.translate(new Laya.Vector3(0, 3, 3));
        this._camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        this._camera.clearColor = null;
        this._camera.orthographic = true; // 正交垂直矩阵距离，控制3D物体远近与现实大小
        //添加方向光
        this._directionLight = this._scene.addChild(new Laya.DirectionLight());
        this._directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        this._directionLight.direction = new Laya.Vector3(1, -1, 0);
        // 分数显示
        this._scoreLabel = new Laya.Label();
        this._scoreLabel.text = "0";
        // this._scoreLabel.pos(Laya.Browser.clientWidth / 2, 100);
        this._scoreLabel.y = 200;
        this._scoreLabel.centerX = 0;
        this._scoreLabel.fontSize = 80;
        this._scoreLabel.color = "#ffffff";
        Laya.stage.addChild(this._scoreLabel);
        // 添加坐标系
        // this.addCoordinate();
        // 创建底座长方体
        this.createBaseRectangle();
        if (type == 0) {
            this.createStartBtn();
        }
        else {
            this.startGame();
        }
    };
    /**
     * 添加开始按钮
     */
    Main.prototype.createStartBtn = function () {
        this._startImg = Laya.stage.addChild(new Laya.Image("laya/assets/imgs/start.png"));
        this._startImg.height = 150;
        this._startImg.width = 150;
        this._startImg.centerX = 0;
        this._startImg.centerY = 0;
        this._startImg.on(Laya.Event.MOUSE_UP, this, this.startGame);
    };
    /**
     * 开始按钮点击事件
     */
    Main.prototype.startGame = function () {
        Laya.stage.removeChild(this._startImg);
        // this.createBaseRectangle();
        this._baseRectangle.fall();
        Laya.timer.frameLoop(1, this, this.frameRefresh);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.stageClick);
        this._count = 0;
        if (Laya.stage.contains(this._gameOverLabel)) {
            Laya.stage.removeChild(this._gameOverLabel);
        }
    };
    /**
     * 创建底部长方体
     */
    Main.prototype.createBaseRectangle = function () {
        var v3BasePosition = new Laya.Vector3(Utils.bStartPos[0], Utils.bStartPos[1], Utils.bStartPos[2]);
        this._baseRectangle = new Metal.Rectangle(Metal.RECTANGLETYPE.BASERECTANGLE, Utils.bLong, Utils.bWidht, Utils.bHeight, v3BasePosition, this._v3Rotate);
        this._scene.addChild(this._baseRectangle);
        this._rectabgles.push(this._baseRectangle);
    };
    /**
     * 创建移动长方体
     */
    Main.prototype.createMoveRectangle = function () {
        this._lastRectangle = this._rectabgles[this._rectabgles.length - 1];
        var moveLong = this._lastRectangle.boxMesh.long;
        var moveWidth = this._lastRectangle.boxMesh.width;
        var lastPosition = this._lastRectangle.curPosition;
        var v3MovePosition = new Laya.Vector3(lastPosition.x + Utils.mDistance / Math.sqrt(2), Utils.moveRectangleY, lastPosition.z - Utils.mDistance / Math.sqrt(2));
        if (this._count % 2 == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE) {
            v3MovePosition = new Laya.Vector3(lastPosition.x - Utils.mDistance / Math.sqrt(2), Utils.moveRectangleY, lastPosition.z - Utils.mDistance / Math.sqrt(2));
        }
        this._moveRectangle = new Metal.Rectangle(this._count % 2, moveLong, moveWidth, Utils.mHeight, v3MovePosition, this._v3Rotate, 'laya/assets/imgs/green.png');
        this._scene.addChild(this._moveRectangle);
        this._moveRectangle.move();
    };
    /**
     * 计算长方体下落部分、保留部分
     */
    Main.prototype.caculateRectangle = function () {
        if (!this._moveRectangle) {
            return null;
        }
        this._moveRectangle.stopMove();
        this._lastRectangle = this._rectabgles[this._rectabgles.length - 1];
        var lastPosition = this._lastRectangle.curPosition;
        var lastX = lastPosition.x;
        var lastZ = lastPosition.z;
        var moveX = this._moveRectangle.curPosition.x;
        var moveZ = this._moveRectangle.curPosition.z;
        var distance = Math.sqrt(2) * Math.abs(lastX - moveX);
        if (this._moveRectangle.type == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE && distance >= this._lastRectangle.boxMesh.width) {
            console.log('game over'); // 游戏结束
            this._gameOver = true;
            this._moveRectangle.fall();
            return null;
        }
        else if (this._moveRectangle.type == Metal.RECTANGLETYPE.RIGHTTOPRECTANGLE && distance >= this._lastRectangle.boxMesh.long) {
            console.log('game over'); // 游戏结束
            this._gameOver = true;
            this._moveRectangle.fall();
            return null;
        }
        var mewLong1 = this._lastRectangle.boxMesh.long - distance;
        var newWidth1 = this._lastRectangle.boxMesh.width;
        var mewLong2 = distance;
        var newWidth2 = this._lastRectangle.boxMesh.width;
        if (this._moveRectangle.type == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE) {
            newWidth1 = this._lastRectangle.boxMesh.width - distance;
            mewLong1 = this._lastRectangle.boxMesh.long;
            newWidth2 = distance;
            mewLong2 = this._lastRectangle.boxMesh.long;
        }
        var newX1 = (lastX + moveX) / 2;
        var newZ1 = (lastZ + moveZ) / 2;
        var newV3Pos1 = new Laya.Vector3(newX1, Utils.moveRectangleY, newZ1);
        var newMoveRectangle1 = new Metal.Rectangle(this._count % 2, mewLong1, newWidth1, Utils.mHeight, newV3Pos1, this._v3Rotate, 'laya/assets/imgs/red.png');
        this._rectabgles.push(newMoveRectangle1);
        this._scene.addChild(newMoveRectangle1);
        if (this._moveRectangle.type == Metal.RECTANGLETYPE.LEFTTOPRECTANGLE) {
            if (moveX < lastX) {
                var newX2 = moveX - ((this._moveRectangle.boxMesh.width - distance) / Math.sqrt(2) / 2);
                var newZ2 = moveZ - ((this._moveRectangle.boxMesh.width - distance) / Math.sqrt(2) / 2);
            }
            else {
                var newX2 = moveX + ((this._moveRectangle.boxMesh.width - distance) / Math.sqrt(2) / 2);
                var newZ2 = moveZ + ((this._moveRectangle.boxMesh.width - distance) / Math.sqrt(2) / 2);
            }
        }
        else {
            if (moveX < lastX) {
                var newX2 = moveX - ((this._moveRectangle.boxMesh.long - distance) / Math.sqrt(2) / 2);
                var newZ2 = moveZ + ((this._moveRectangle.boxMesh.long - distance) / Math.sqrt(2) / 2);
            }
            else {
                var newX2 = moveX + ((this._moveRectangle.boxMesh.long - distance) / Math.sqrt(2) / 2);
                var newZ2 = moveZ - ((this._moveRectangle.boxMesh.long - distance) / Math.sqrt(2) / 2);
            }
        }
        var newV3Pos2 = new Laya.Vector3(newX2, Utils.moveRectangleY, newZ2);
        this._fallRectangle = new Metal.Rectangle(this._count % 2, mewLong2, newWidth2, Utils.mHeight, newV3Pos2, this._v3Rotate, 'laya/assets/imgs/green.png');
        this._scene.addChild(this._fallRectangle);
        this._fallRectangle.fall();
        this._scene.removeChild(this._moveRectangle);
        this._canClickStage = true;
    };
    /**
     * 所有长方体下移
     */
    Main.prototype.allRectangleFall = function () {
        for (var i = 0; i < this._rectabgles.length; i++) {
            var item = this._rectabgles[i];
            if (i == this._rectabgles.length - 1) {
                var self = this;
                var fallComplete = Laya.Handler.create(this, function () {
                    self.createMoveRectangle();
                });
                Laya.Tween.to(item.transform.position, { x: item.transform.position.x, y: item.transform.position.y - Utils.mHeight, z: item.transform.position.z }, 1000, null, fallComplete);
            }
            else {
                Laya.Tween.to(item.transform.position, { x: item.transform.position.x, y: item.transform.position.y - Utils.mHeight, z: item.transform.position.z }, 1000, null);
            }
        }
    };
    /**
     * 点击舞台触发事件
     */
    Main.prototype.stageClick = function () {
        if (!this._canClickStage) {
            console.log('can not click stage');
            return null;
        }
        this._canClickStage = false;
        this._count++;
        this.caculateRectangle();
        if (!this._gameOver) {
            this._scoreLabel.text = this._count.toString();
            this.allRectangleFall();
        }
        else {
            console.log('show game over page');
            this.showGameOver();
        }
    };
    /**
     * 帧事件
     */
    Main.prototype.frameRefresh = function () {
        for (var i = 0; i < this._rectabgles.length; i++) {
            var item = this._rectabgles[i];
            if (!item) {
                continue;
            }
            item.transform.position = item.curPosition;
        }
        if (this._fallRectangle) {
            this._fallRectangle.transform.position = this._fallRectangle.curPosition;
        }
        if (this._moveRectangle) {
            this._moveRectangle.transform.position = this._moveRectangle.curPosition;
        }
    };
    /**
     * 长方体下落结束回调
     */
    Main.prototype.moveRectangleFallComplete = function () {
        if (this._fallRectangle && this._scene.contains(this._fallRectangle)) {
            this._scene.removeChild(this._fallRectangle);
            this._fallRectangle = null;
        }
    };
    /**
     * 底部长方体第一次移动结束回调
     */
    Main.prototype.baseRectangleFallComplete = function () {
        this._baseRectangle.transform.position = this._baseRectangle.curPosition;
        this.createMoveRectangle();
        this._canClickStage = true;
    };
    /**
     * 游戏结束展示
     */
    Main.prototype.showGameOver = function () {
        this._startImg = Laya.stage.addChild(new Laya.Image("laya/assets/imgs/start.png"));
        this._startImg.height = 150;
        this._startImg.width = 150;
        this._startImg.centerX = 0;
        this._startImg.centerY = 0;
        this._startImg.on(Laya.Event.MOUSE_UP, this, this.init);
        this._gameOverLabel = new Laya.Label();
        this._gameOverLabel.text = "Game Over";
        this._gameOverLabel.y = 400;
        this._gameOverLabel.centerX = 0;
        this._gameOverLabel.fontSize = 80;
        this._gameOverLabel.color = "#ffffff";
        Laya.stage.addChild(this._gameOverLabel);
        for (var i = 0; i < this._rectabgles.length; i++) {
            var item = this._rectabgles[i];
            var upHeight = (1.5 + this._count * 0.05) > 4 ? 4 : 1.5 + this._count * 0.05;
            Laya.Tween.to(item.transform.position, { x: item.transform.position.x, y: item.transform.position.y, z: item.transform.position.z - upHeight }, Utils.bFallTime, null);
        }
    };
    /**
     * 监听浏览器窗口变化
     */
    Main.prototype.onWindowResize = function () {
        // if(this._bgRect){
        //     this._bgRect.width = Laya.Browser.width;
        //     this._bgRect.height = Laya.Browser.height;
        // }
    };
    /**
     * 添加坐标系
     */
    Main.prototype.addCoordinate = function () {
        //生成坐标中心，其实是球体
        var sphere = this._scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.05, 100, 100)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 0, 0, 1);
        sphere.meshRender.material = material;
        sphere.transform.position = new Laya.Vector3(0, 0, 0);
        //模拟x轴，其实是方体
        var x1 = this._scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(5, 0.03, 0.03)));
        var material = new Laya.StandardMaterial();
        // material.albedo = new Laya.Vector4(1, 0, 0, 1);        
        material.albedo = new Laya.Vector4(1, 0, 1, 1);
        x1.meshRender.material = material;
        x1.transform.position = new Laya.Vector3(1, 0, 0);
        //模拟y轴，其实是方体
        var y1 = this._scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, 0.03, 5)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 1, 0, 1);
        y1.meshRender.material = material;
        y1.transform.position = new Laya.Vector3(0, 0, 0);
        //模拟z轴，其实是方体
        var z1 = this._scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, 5, 0.03)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 0, 1, 1);
        z1.meshRender.material = material;
        z1.transform.position = new Laya.Vector3(0, 0, 1);
        this._scene.addChild(x1);
        this._scene.addChild(y1);
        this._scene.addChild(z1);
        this._scene.addChild(sphere);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map
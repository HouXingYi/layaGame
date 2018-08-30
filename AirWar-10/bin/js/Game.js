/**
 * 程序入口
 */
var Game = /** @class */ (function () {
    function Game() {
        //子弹发射偏移位置表
        this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        //关卡等级
        this.level = 0;
        //积分成绩
        this.score = 0;
        //升级等级所需成绩数量
        this.levelUpScore = 10;
        //子弹级别
        this.bulletLevel = 0;
        //敌机血量
        this.hps = [1, 2, 2];
        //敌机速度
        this.speeds = [3, 2, 1];
        //敌机被击半径
        this.radius = [15, 30, 70];
        //初始化引擎，设置游戏的宽高
        Laya.init(480, 852, Laya.WebGL);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置居中对齐
        Laya.stage.alignH = "center";
        //设置横竖屏
        Laya.stage.screenMode = "vertical";
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //创建循环滚动的背景
        var bg = new BackGround();
        //把背景添加到舞台上并显示出来
        Laya.stage.addChild(bg);
        //实例化角色容器
        this.roleBox = new Laya.Sprite();
        //添加到舞台上
        Laya.stage.addChild(this.roleBox);
        //创建游戏UI界面
        this.gameInfo = new GameInfo();
        //添加到舞台上
        Laya.stage.addChild(this.gameInfo);
        //创建一个主角
        this.hero = new Role();
        //初始化角色
        // this.hero.init("hero",0,1,0,30);
        // //设置射击类型
        // this.hero.shootType = 1;
        // //设置角色位置
        // this.hero.pos(200,500);
        //把主角添加到舞台上
        this.roleBox.addChild(this.hero);
        // //监听舞台的鼠标移动事件
        // Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        //创建敌人
        // this.createEnemy(10);
        // //创建主循环
        // Laya.timer.frameLoop(1,this,this.onLoop);
        //开始游戏
        this.restart();
    };
    Game.prototype.onLoop = function () {
        //遍历舞台上所有的飞机，更改飞机的状态
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role && role.speed) {
                //根据飞机速度改变位置
                role.y += role.speed;
                //如果敌机移动到显示区域外则移除
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    //从舞台移除
                    role.removeSelf();
                    //回收之前重置属性
                    role.isBullet = false;
                    role.visible = true;
                    //回收到对象池
                    Laya.Pool.recover("role", role);
                }
            }
            //处理发射子弹逻辑
            if (role.shootType > 0) {
                //获取当前时间
                var time = Laya.Browser.now();
                //如果当前时间大于下次射击时间
                if (time > role.shootTime) {
                    //更新下次射击时间
                    role.shootTime = time + role.shootInterval;
                    //根据不同子弹类型，设置不同的数量及位置
                    var pos = this.bulletPos[role.shootType - 1];
                    for (var index = 0; index < pos.length; index++) {
                        //从对象池中创建一个子弹
                        var bullet = Laya.Pool.getItemByClass("role", Role);
                        //初始化子弹信息
                        bullet.init("bullet1", role.camp, 1, -4 - role.shootType - Math.floor(this.level / 15), 1, 1);
                        // //设置角色类型为子弹类型
                        // bullet.isBullet = true;
                        //设置子弹的位置
                        bullet.pos(role.x + pos[index], role.y - role.hitRadius - 10);
                        //添加到舞台上
                        this.roleBox.addChild(bullet);
                    }
                    //增加发射子弹声音
                    Laya.SoundManager.playSound("res/sound/bullet.mp3");
                }
            }
        }
        //检测碰撞
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            //获取角色对象1
            var role1 = this.roleBox.getChildAt(i);
            if (role1.hp < 1)
                continue;
            for (var j = i - 1; j > -1; j--) {
                //如果角色已经死亡，则忽略
                if (!role1.visible)
                    continue;
                //获取角色对象2
                var role2 = this.roleBox.getChildAt(j);
                //如果角色未死亡，并且阵营不同才能进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //根据距离判断是否碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞之后掉血
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        //每掉一滴血，积分+1
                        this.score++;
                        //在UI上显示积分
                        this.gameInfo.score(this.score);
                        //积分大于升级积分，则升级
                        if (this.score > this.levelUpScore) {
                            //升级关卡
                            this.level++;
                            //在UI上显示等级
                            this.gameInfo.level(this.level);
                            //提高下一级的升级难度
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }
        //如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            //播放游戏结束声音
            Laya.SoundManager.playSound("res/sound/game_over.mp3");
            Laya.timer.clear(this, this.onLoop);
            //显示提示信息
            this.gameInfo.infoLabel.text = "GameOver,分数：" + this.score + "\n点击这里重新开始游戏。";
            //注册舞台点击事件，点击重新开始游戏
            this.gameInfo.infoLabel.once(Laya.Event.CLICK, this, this.restart);
        }
        // //每隔30帧创建新的敌机
        // if(Laya.timer.currFrame%60 === 0){
        //     this.createEnemy(2);
        // }
        //关卡越高，创建敌机间隔越短
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        //关卡越高，敌机飞行速度越快
        var speedUp = Math.floor(this.level / 6);
        //关卡越高，敌机血量越高
        var hpUp = Math.floor(this.level / 8);
        //关卡越高，敌机数量越多
        var numUp = Math.floor(this.level / 10);
        //生成小飞机
        if (Laya.timer.currFrame % (80 - cutTime) === 0) {
            this.createEnemy(0, 2 + numUp, 3 + speedUp, 1);
        }
        //生成中型飞机
        if (Laya.timer.currFrame % (150 - cutTime * 4) === 0) {
            this.createEnemy(1, 1 + numUp, 2 + speedUp, 2 + hpUp * 2);
        }
        //生成boss
        if (Laya.timer.currFrame % (900 - cutTime * 4) === 0) {
            this.createEnemy(2, 1, 1 + speedUp, 10 + hpUp * 6);
            //播放boss出场声音
            Laya.SoundManager.playSound("res/sound/enemy3_out.mp3");
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        //减血
        role.hp -= lostHp;
        if (role.heroType === 2) {
            //每次吃一个子弹升级道具，子弹升级+1
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量是4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if (role.heroType === 3) {
            //每吃一个血瓶，血量增加1
            this.hero.hp++;
            //设置主角血量
            this.gameInfo.hp(this.hero.hp);
            //设置最大血量不超过10
            if (this.hero.hp > 10)
                this.hero.hp = 10;
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if (role.hp > 0) {
            //如果未死亡，则播放爆炸动画
            role.playAction("hit");
        }
        else {
            if (role.heroType > 0) {
                //如果是子弹，则直接隐藏
                role.visible = false;
            }
            else {
                if (role.type != "hero") {
                    //播放爆炸动画弹声音
                    Laya.SoundManager.playSound("res/sound/" + role.type + "_down.mp3");
                }
                role.playAction("down");
                //击中boss掉落血瓶或子弹升级道具
                if (role.type == "enemy3") {
                    //随机是子弹升级道具还是血瓶
                    var type = Math.random() < 0.7 ? 2 : 3;
                    //掉落血瓶或者是子弹升级道具
                    var item = Laya.Pool.getItemByClass("role", Role);
                    //初始化信息
                    item.init("ufo" + (type - 1), role.camp, 1, 1, 15, type);
                    //设置位置
                    item.pos(role.x, role.y);
                    //添加到舞台上
                    this.roleBox.addChild(item);
                }
            }
        }
        //设置主角的血量值
        if (role == this.hero) {
            this.gameInfo.hp(role.hp);
        }
    };
    Game.prototype.restart = function () {
        //重置游戏数据
        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.gameInfo.reset();
        //初始化角色
        this.hero.init("hero", 0, 5, 0, 30);
        //设置射击类型
        this.hero.shootType = 1;
        //设置角色位置
        this.hero.pos(200, 500);
        //重置射击间隔
        this.hero.shootInterval = 500;
        //显示角色
        this.hero.visible = true;
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role != this.hero) {
                role.removeSelf();
                //回收之前重置的信息
                role.visible = true;
                //回收到对象池
                Laya.Pool.recover("role", role);
            }
        }
        this.resume();
    };
    //暂停
    Game.prototype.pause = function () {
        //停止游戏主循环
        Laya.timer.clear(this, this.onLoop);
        //移除舞台的鼠标移动事件
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    //恢复
    Game.prototype.resume = function () {
        //创建游戏主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
        //监听舞台的鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Game.prototype.onMouseMove = function () {
        //始终保持主角和鼠标位置一致
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.createEnemy = function (type, num, speed, hp) {
        for (var i = 0; i < num; i++) {
            //随机出现敌人
            // var r:number = Math.random();
            // //根据随机数，随机敌人
            // var type:number = r<0.7?0:r<0.95?1:2;
            //创建敌人
            var enemy = Laya.Pool.getItemByClass("role", Role);
            //初始化角色
            enemy.init("enemy" + (type + 1), 1, hp, speed, this.radius[type]);
            //随机位置
            enemy.pos(Math.random() * 400 + 40, -Math.random() * 200 - 100);
            //添加到舞台上
            this.roleBox.addChild(enemy);
        }
    };
    return Game;
}());
//启动游戏
var gameInstance = new Game();
//# sourceMappingURL=Game.js.map
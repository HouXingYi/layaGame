/**
 * 游戏UI类
 */
class GameInfo extends ui.GameInfoUI {
    constructor() {
        super();
        //注册按钮点击事件，点击之后暂停游戏
        this.pauseBtn.on(Laya.Event.CLICK,this,this.onPauseBtnClick);
        //初始化UI显示
        this.reset();
    }
    public reset():void{
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    }
    onPauseBtnClick(e:Laya.Event):void{
        //阻止事件冒泡
        e.stopPropagation();
        //暂停游戏
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏";
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK,this,this.onStageClick);
    }
    onStageClick(e:Laya.Event):void{
        this.infoLabel.text = "";
        gameInstance.resume();
    }
    //显示血量
    public hp(value:number):void{
        this.hpLabel.text = "HP:"+value;
    }
    //显示关卡级别
    public level(value:number):void{
        this.levelLabel.text = "Level:"+value;
    }
    //显示积分
    public score(value:number):void{
        this.scoreLabel.text = "Score:"+value;
    }
}
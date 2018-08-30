
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:Laya.Button;
		public hpLabel:Laya.Label;
		public levelLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Button","props":{"y":16,"x":391,"width":60,"var":"pauseBtn","stateNum":"1","skin":"war/btn_pause.png","height":45}},{"type":"Label","props":{"y":24,"x":20,"width":80,"var":"hpLabel","text":"HP:5","height":33,"fontSize":24,"color":"#5fff05","align":"center"}},{"type":"Label","props":{"y":22,"x":102,"width":106,"var":"levelLabel","text":"Level:50","height":33,"fontSize":24,"color":"#fbfbfb","align":"center"}},{"type":"Label","props":{"y":22,"x":213,"width":79,"var":"scoreLabel","text":"Score:100","height":33,"fontSize":24,"color":"#fdc105","align":"center"}},{"type":"Label","props":{"y":427,"x":21,"wordWrap":true,"width":445,"var":"infoLabel","text":"战斗结束","height":136,"fontSize":24,"color":"#fbfbfb","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}

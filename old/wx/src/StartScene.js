var startLayer = cc.Layer.extend({
	ctor:function(){
		//ffc5c4
		//this._super(cc.color(255,197,196,255),cc.winSize.width,cc.winSize.height);
		this._super();
		var size = cc. winSize;
		//add bg
		this.bgSprite = new cc.Sprite(res.Bg_jpg);
		this.bgSprite.attr({
			anchorX:0.5,
			anchorY:1,
			x:size.width/2,
			y:size.height
		});
		this.bgSprite.setScale(size.width/this.bgSprite.getContentSize().width);
		this.addChild(this.bgSprite,0);
		//add text
		this.textSprite = new cc.Sprite(res.Text_png);
		this.textSprite.attr({
			anchorX:0.5,
			anchorY:0.5,
			x:size.width/2,
			y:size.height/2
		});
		this.textSprite.setScale(size.width/this.textSprite.getContentSize().width*0.8);
		this.addChild(this.textSprite,0);
		
		
		//30343d 底部文字描述 
		var underLayer = new cc.LayerColor(
				cc.color(48,52,61,255),size.width,size.height-size.width/this.bgSprite.getContentSize().width*this.bgSprite.getContentSize().height); 

		underLayer.ignoreAnchor = false;
		underLayer.attr({
			x:size.width/2,
			y:underLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		
		//15
		var underlabel = new cc.LabelTTF(
				"游戏规则：规定时间内,点击面膜,躲避炸弹。抢到50个面膜有机会赢“名膜”限量版面膜一份哦~赶快抢起来吧!"
				,res.font,28,cc.size(size.width-18,size.height/6,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VE));
		underlabel.attr({
			x:underlabel.getContentSize().width/2+28,//控制与边界的距离
			y:underLayer.getContentSize().height-underlabel.getContentSize().height/2-28,
			anchorX:0.5,
			anchorY:0.5
		});
		underlabel.fillStyle=cc.color(255,255,255,255);
		underLayer.addChild(underlabel, 3);
		
		//add start menu
		var startitem=new cc.MenuItemImage(
				res.Start_N_png,
				res.Start_S_png,
				function(){
					//cc.director.runScene(new cc.TransitionPageTurn(1, new PlayScene(),false));
					document.title="初心-抢面膜"
					cc.director.runScene(new PlayScene());
				},
				this
		);
		// 缩小大小
		startitem.setScale(size.width/startitem.getContentSize().width*0.7);
		startitem.attr({
			x:size.width/2,
			y:startitem.getContentSize().height/2+10,
			anchorX:0.5,
			anchorY:0.5
		});
		var menu = new cc.Menu(startitem);
		menu.x=0;
		menu.y=0;
		//this.addChild(menu,1);
		underLayer.addChild(menu,2);

		this.addChild(underLayer,2);
		
		return true;
	}
});

var StartScene=cc.Scene.extend({
	onEnter:function(){
		this._super();		
		var layer=new startLayer();
		var size = cc.winSize;
		layer.ignoreAnchor = false;
		layer.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(layer,1);
	}
});
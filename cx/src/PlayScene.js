
var PlayLayer = cc.LayerColor.extend({
	//bgSprite:null,
	SushiSprites:null,
	BoomSprites:null,
	scoreLabel:null,
	timeLabel:null,
	score:0,
	timeout:30,
	highestScore:50,//最高分
	
	ctor:function () {
		//ffa1a1
		this._super(cc.color(255,161,161,255),cc.winSize.width,cc.winSize.height);
		var size = cc.winSize;
		this.SushiSprites =[];
		this.BoomSprites=[];
		this.schedule(this.update,1,5*1024,1);
		this.schedule(this.timer, 1, 60, 1);
		
		////ffb1b1 标题
		var titleLayer = new cc.LayerColor(cc.color(255,177,177,255),size.width,size.height/8); 

		titleLayer.ignoreAnchor = false;
		titleLayer.attr({
			x:size.width/2,
			y:size.height-titleLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});

		var titleSprite = new cc.Sprite(res.Vectory_png);
		titleSprite.attr({
			x:titleLayer.getContentSize().width/4,
			y:titleLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		// 缩小图片
		//titleSprite.setScale(size.width/titleSprite.getContentSize().width);
		//add score
		this. scoreLabel = new cc.LabelTTF("已抢到了 0 个",res.font,32);
		this.scoreLabel.attr({
			x:titleLayer.getContentSize().width/4+3*titleSprite.getContentSize().width,
			y:titleLayer.getContentSize().height/2-3
		});
		titleLayer.addChild(this.scoreLabel, 5)
		
		titleLayer.addChild(titleSprite, 3);
		this.addChild(titleLayer,2);
		
		
		
		//ffb1b1 底部时间
		var underLayer = new cc.LayerColor(cc.color(255,177,177,255),size.width,size.height/8); 

		underLayer.ignoreAnchor = false;
		underLayer.attr({
			x:size.width/2,
			y:underLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});

		var underSprite = new cc.Sprite(res.Clock_png);
		underSprite.attr({
			x:underLayer.getContentSize().width/4,
			y:underLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		// 缩小图片
		//underSprite.setScale(0.45);
		//add time
		this.timeLabel = new cc.LabelTTF("倒计时: "+this.timeout+" s",res.font,32);
		this.timeLabel.attr({
			x:titleLayer.getContentSize().width/4+3*underSprite.getContentSize().width,
			y:titleLayer.getContentSize().height/2-3
		});
		
		underLayer.addChild(this.timeLabel, 5);

		underLayer.addChild(underSprite, 3);
		
		this.addChild(underLayer, 1)
		return true;
	},
	//kind: 1为面膜，2为炸弹
	addItem:function(sprite,kind){
		cc.log("add addMianmo.");
		var sushi=sprite;//new SushiSprite("#sushi_1n.png");
		var size = cc.winSize;
		var sushiSize = sushi.getContentSize();
		//var x = sushi.width/2+size.width/2*cc.random0To1();
		//在界面内随意出现
		var x = size.width*cc.random0To1();
		x= cc.clampf(x, sushiSize.width/2, size.width-(sushiSize.width/2));
		/*if(x<sushi.getContentSize().width/2){
			x=sushi.getContentSize().width/2;
		}else if(x>(size.width-(sushiSize.width/2))){
			x=size.width-(sushiSize.width/2);
		}*/
		var y = size.height*cc.random0To1();
		y = cc.clampf(y, size.height/8+sushiSize.height/2, 
				size.height-size.height/8-sushiSize.height/2);
		/*if(y<sushiSize.height/2){
			y=sushiSize.height/2;
		}else if(y>(size.height-sushiSize.height/2)){
			y=size.height-sushiSize.height/2;
		}*/
		var p = cc.p(x,y);
		for(var i=0;i<this.SushiSprites.length;i++){
			if(cc.rectContainsPoint(this.SushiSprites[i].getBoundingBox(),p)){
					if(kind==1)
						this.addMianmo();
					else this.addBoom();
					return;
				}
		}
		for(var i=0;i<this.BoomSprites.length;i++){
			if(cc.rectContainsPoint(this.BoomSprites[i].getBoundingBox(),p)){
				if(kind==1)
					this.addMianmo();
				else this.addBoom();
				return;
			}
		}
		sushi.attr({
			x: x,
			y:y//size.height - 100
		});
		this.addChild(sushi,5);
		if(kind==1){
			this.SushiSprites.push(sushi);
		}else if(kind==2){
			this.BoomSprites.push(sushi);
		}
		//
		
		//var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-30));
		//sushi.runAction(dorpAction);
	},
	
	update:function(){
		this.addMianmo();
		this.addBoom();
		this.addMianmo();
		this.addBoom();
		this.addBoom();
		//TODO 加炸弹和面膜的逻辑
		
	},
	
	addMianmo:function(){
		//this.addItem(new SushiSprite("#sushi_1n.png"));
		var mianmo=new SushiSprite(res.Sushi_png);
		this.addItem(mianmo,1);
		
	},
	
	addBoom:function(){
		var boom =new BoomSprite(res.Boom_png);
		this.addItem(boom,2);
	
	},
	
	
	clear:function(){
		// 完成清除工作
		if(this.SushiSprites){
			for(var i=0;i<this.SushiSprites.length;i++){
				this.SushiSprites[i].removeFromParent();
				this.SushiSprites[i]=undefined;
			}
		}
		if(this.BoomSprites){
			for(var i=0;i<this.BoomSprites.length;i++){
				this.BoomSprites[i].removeFromParent();
				this.BoomSprites[i]=undefined;
			}
		}
	},
	
	removeSushi : function(sushi,addASore) {
		//移除制定的sushi
		sushi.removeFromParent();
		this.SushiSprites.splice(this.SushiSprites.indexOf(sushi), 1);
		if(addASore)
		this.addScore();
	},
	
	removeBoom : function(boom) {
		//移除制定的sushi
		boom.removeFromParent();
		this.BoomSprites.splice(this.BoomSprites.indexOf(boom), 1);
	},
	
	addScore:function(){
		this.score= this.score+1;
		this.scoreLabel.setString("已抢到了 "+this.score+" 个");
		if(this.score==this.highestScore){
			this.gameOver(3);
			return;
		}
	},
	
	timer:function(){
		if(this.timeout==0){
			
			this.gameOver(2);
			return;
		}
		this.timeout = this.timeout-1;
		this.timeLabel.setString("倒计时: "+this.timeout+" s");
	},
	//flag: 1:触碰到炸弹，2：时间到了~，3：得到了目标分数
	gameOver:function(flag){
		// 游戏结束
		this.clear();
		this.unschedule(this.update);
		this.unschedule(this.timer);
		//添加特定效果
		if(flag==1){
			//加入爆炸的效果
			var boomSp = new cc.Sprite(res.GameOver_png);
			var size = cc.winSize;
			boomSp.attr({
				x:size.width/2,
				y:size.height/2
			});
			//0.1
			boomSp.setScale(0.2);
			cc.director.getRunningScene().addChild(boomSp,10);
			boomSp.runAction(cc.sequence(
					cc.spawn(cc.rotateBy(1, 720),cc.scaleTo(1, 1)),
					cc.delayTime(0.5),
					cc.callFunc(function(){
						boomSp.removeFromParent(true);
						this.addGameOverLayer(flag);
						
						//this.unschedule(this.removeSushi);
					}, this)));
		}else if(flag==2){
			//加入时间完效果
			var timeoutSp = new cc.Sprite(res.Timeout_png);
			var size = cc.winSize;
			timeoutSp.attr({
				x:size.width/2,
				y:size.height/2
			});
			//timeoutSp.setScale(0.01);
			cc.director.getRunningScene().addChild(timeoutSp,10);
			timeoutSp.runAction(cc.sequence(
					cc.spawn(cc.rotateBy(1, 720),cc.scaleTo(1, 1)),
					cc.delayTime(0.5),
					cc.callFunc(function(){
						timeoutSp.removeFromParent(true);
						this.addGameOverLayer(flag);
					//	this.unschedule(this.removeSushi);
					}, this)));
		}else{
			this.addGameOverLayer(flag);
		}
		
	},
	
	makeDesc:function(){
		var desc="";
		if(this.score<this.highestScore){
			desc = "很遗憾,就差那么一丢丢~\n就差"+(this.highestScore-this.score)+"分就可以获赠免费面膜了 T T~~~";
		}else{
			desc = "太厉害你~\n快快先分享朋友圈，立马领取奖品吧~"
		}
		return desc;
	},
	
	
	//flag: 1:触碰到炸弹，2：时间到了~，3：得到了目标分数
	addGameOverLayer:function(flag){
		//alert('游戏结束');
		cc.log("game over");
		//ffc5c3
		var gameOverLayer = new cc.LayerColor(cc.color(255,197,196,255));
		var size = cc.winSize;
		
		var gameoversp = new cc.Sprite(res.Card_png);
		//gameoversp.setScale(0.5,0.5);
		gameoversp.setPosition(size.width/2, size.height-gameoversp.getContentSize().height/2);
		gameOverLayer.addChild(gameoversp,5);
		// 根据分数输出不同的语句
		var gameoverspSize = gameoversp.getContentSize();
		//抢到面膜
		var label1 = new cc.LabelTTF("抢到面膜",res.font,35)//, 
				//cc.size(gameoverspSize.width,gameoverspSize.height/3), cc.TEXT_ALIGNMENT_LEFT);
		label1.attr({
			x:label1.getContentSize().width/1.2,//gameoverspSize.width/2,
			y:gameoverspSize.height-label1.getContentSize().height*1.5
		});
		label1.	fillStyle=cc.color(48,52,61,255);
		gameoversp.addChild(label1,10);
		//分数
		cc.log("score"+this.score);
		var label2 = new cc.LabelTTF(this.score==0?"0":this.score,res.font,100);//, 
				//cc.size(gameoverspSize.width,gameoverspSize.height/3),
			//	cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		label2.attr({
			x:gameoverspSize.width/2,
			y:gameoverspSize.height/2
		});
		label2.	fillStyle=cc.color(254,130,130,255);
		gameoversp.addChild(label2,10);
		//个
		var label3 = new cc.LabelTTF("个",res.font,35)//, 
		//cc.size(gameoverspSize.width,gameoverspSize.height/3), cc.TEXT_ALIGNMENT_LEFT);
		label3.attr({
			x:gameoverspSize.width/1.28,
			y:gameoverspSize.height/2
		});
		label3.	fillStyle=cc.color(48,52,61,255);
		gameoversp.addChild(label3,10);
		//有机会获得面膜
		var str1="";
		if(flag==3){
			str1="有机会获得免费面膜^_^恭喜你!";
		}else{
			str1="很遗憾不能获得免费面膜>_<";
		}
		var label4 = new cc.LabelTTF(str1,res.font,30)//, 
		//cc.size(gameoverspSize.width,gameoverspSize.height/3), cc.TEXT_ALIGNMENT_LEFT);
		label4.attr({
			x:gameoverspSize.width/2,
			y:gameoverspSize.height/3.3
		});
		label4.fillStyle=cc.color(254,130,130,255);
		gameoversp.addChild(label4,10);
	/*	var titleLabel = new cc.LabelTTF(this.makeDesc(),res.font,20, cc.size(225,105), cc.TEXT_ALIGNMENT_LEFT);
		titleLabel.attr({
			x:gameoverspSize.width/2,
			y:gameoverspSize.height/2
		});*/
		document.title = this.makeDesc();
		//titleLabel.enableStroke(cc.color(0, 0, 0, 1), 2.0);
		//titleLabel.lineWidth=2;
		//gameoversp.addChild(titleLabel,10);
		
		//30343d
		var underLayer = new cc.LayerColor(cc.color(48,52,61),size.width,size.height/2);
		underLayer.ignoreAnchor = false;
		underLayer.attr({
			x:size.width/2,
			y:underLayer.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		var padding=10;
		//赢取了目标分数
		if(flag==3){
			var girly=size.height/2;
			//加入女孩
			var winGirl = new cc.Sprite(res.GirlWin_png);
			winGirl.attr({
				x:size.width/2,
				y:girly
			});
			var scale = 0.9;
			winGirl.setScale(scale);
			
			var girlHWithScale= winGirl.getContentSize().height*scale;
			
			gameOverLayer.addChild(winGirl, 100);
			
			var reward = new cc.MenuItemImage(res.Reward_png,res.Reward_png,
					function(){
				var r = new RewardUI();
				cc.director.getRunningScene().addChild(r,20);
			},this);
			
			var rewardY = girly-girlHWithScale/2-reward.getContentSize().height/2*scale;
			reward.attr({
				x: size.width/2,
				y: rewardY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			reward.setScale(scale);
			underLayer.setContentSize(cc.size(size.width,rewardY))
			underLayer.y=rewardY/2;
			cc.log("add title label");
			var tryAgain = new cc.MenuItemImage(res.Again_png,res.Again_png,
					function(){
				cc.log("Menu is clicked!");
				var transition=  new PlayScene();//new cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
				cc.director.runScene(transition);

			},this);
			
			var tryY = rewardY-tryAgain.getContentSize().height/2*scale-padding-reward.getContentSize().height/2*scale;
			tryAgain.attr({
				x: size.width/2,
				y: tryY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			tryAgain.setScale(scale);
			cc.log("add try again item");
			// 没有通知朋友了
			/*		var shareToFriends = new cc.MenuItemImage(res.Share_png,res.Share_png,
					function(){
				//添加指示页面
				window.wxData.desc=this.makeDesc();
				var share = new ShareUI();
				cc.director.getRunningScene().addChild(share,15);
			},this);
			shareToFriends.attr({
				//x: size.width/2,
				//y: size.height / 2 -60-tryAgain.getContentSize().height*2,
				anchorX: 0.5,
				anchorY: 0.5
			});
			shareToFriends.setScale(0.5);*/
			
			
			
			var guanzhu = new cc.MenuItemImage(res.Att_png,res.Att_png,
					function(){
				// 关注
				//window.open("weixin://profile/and_something");
				window.open(window.myconfig.address);

			},this);
			var gY = tryY-tryAgain.getContentSize().height/2*scale-padding-guanzhu.getContentSize().height/2*scale;
			guanzhu.attr({
				x: size.width/2,
				y: gY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			guanzhu.setScale(scale);
			
			var menu = new cc.Menu(reward,tryAgain,guanzhu);
			menu.x= 0;//size.width/2;
			menu.y=0;//size.height / 2-winGirl.getContentSize().height/3;
			gameOverLayer.addChild(menu, 10);
			this.getParent().addChild(gameOverLayer);			

		}else{
			var girlY=size.height/2;
			//加入女孩
			var winGirl = new cc.Sprite(res.GirlWin_png);
			winGirl.attr({
				x:size.width/2,
				y:girlY
			});
			var scale = 0.9;
			winGirl.setScale(scale);
			gameOverLayer.addChild(winGirl,10);
			
			var girlHWithScale= winGirl.getContentSize().height*scale;
			
			//没有获取目标分数

			//try again item
			cc.log("add title label");
			var tryAgain = new cc.MenuItemImage(res.Again_png,res.Again_png,
					function(){
				cc.log("Menu is clicked!");
				var transition=  new PlayScene();//new cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
				cc.director.runScene(transition);

			},this);
			var tryY = girlY-girlHWithScale/2-tryAgain.getContentSize().height/2*scale;
			tryAgain.attr({
				x: size.width/2,
				y: tryY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			underLayer.setContentSize(cc.size(size.width,tryY));
			underLayer.y=tryY/2;
			tryAgain.setScale(scale);
			cc.log("add try again item");
			// 没有通知朋友了
			/*		var shareToFriends = new cc.MenuItemImage(res.Share_png,res.Share_png,
					function(){
				//添加指示页面
				window.wxData.desc=this.makeDesc();
				var share = new ShareUI();
				cc.director.getRunningScene().addChild(share,15);
			},this);
			shareToFriends.attr({
				//x: size.width/2,
				//y: size.height / 2 -60-tryAgain.getContentSize().height*2,
				anchorX: 0.5,
				anchorY: 0.5
			});
			shareToFriends.setScale(0.5);*/
			var intro = new cc.MenuItemImage(res.Share_png,res.Share_png,
					function(){
				var share = new ShareUI();
				cc.director.getRunningScene().addChild(share,15);
			},this);
			var iY = tryY-tryAgain.getContentSize().height/2*scale-intro.getContentSize().height/2*scale-padding;
			intro.attr({
				x: size.width/2,
				y: iY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			intro.setScale(scale);
			
			var guanzhu = new cc.MenuItemImage(res.Att_png,res.Att_png,
					function(){
				//TODO 关注
				//window.open("weixin://profile/and_something");
				window.open(window.myconfig.address);
			},this);
			var gY=iY-tryAgain.getContentSize().height/2*scale-guanzhu.getContentSize().height/2*scale-padding;
			guanzhu.attr({
				x: size.width/2,
				y: gY,
				anchorX: 0.5,
				anchorY: 0.5
			});
			guanzhu.setScale(scale);
			
			var menu = new cc.Menu(tryAgain,intro,guanzhu);
			menu.x= 0;//size.width/2;
			//menu.alignItemsVerticallyWithPadding(10);
			menu.y=0;//size.height / 5;
			gameOverLayer.addChild(menu, 10);
			this.getParent().addChild(gameOverLayer);	
		}
		gameOverLayer.addChild(underLayer,5);
		cc.log("menu");
	}
	
	
});

var PlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PlayLayer();
		this.addChild(layer);
	}
});

var ShareUI = cc.LayerColor.extend({
	ctor: function () {
		this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

		var arrow = new cc.Sprite(res.Arrow_png);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.setScale(0.8);
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		this.addChild(arrow,20);

		var text = new cc.Sprite(res.Textshare_png);
		text.anchorX = 0.5;
		text.anchorY = 0.5;
		text.setScale(cc.winSize.width/text.getContentSize().width*0.8);
		text.x = cc.winSize.width/2;
		text.y = cc.winSize.height/1.6;
		this.addChild(text,20);
	/*	var label = new cc.LabelTTF("请点击右上角的菜单按钮\n然后\"分享到朋友圈\"\n一起来抢面膜吧~~", res.font, 18, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 100;
		label.anchorY = 1;
		label.shadowColor = cc.color(255,255,255);
		label.shadowBlur = 50;
		this.addChild(label);*/
		
		var btn = new cc.Sprite(res.Button_png);
		btn.anchorX = 0.5;
		btn.anchorY = 0.5;
		btn.setScale(cc.winSize.width/text.getContentSize().width);
		btn.x = cc.winSize.width/2;
		btn.y = cc.winSize.height/3;
		this.addChild(btn,20);
	},
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchEnded:function(t, event){
				event.getCurrentTarget().removeFromParent();
			}
		}, this);
	}
});

var RewardUI = cc.LayerColor.extend({
	ctor: function () {
		this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

		var arrow = new cc.Sprite(res.Arrow_png);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.setScale(0.5);
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		this.addChild(arrow,20);

		var text = new cc.Sprite(res.Textreward_png);
		text.anchorX = 0.5;
		text.anchorY = 0.5;
		text.setScale(cc.winSize.width/text.getContentSize().width*0.8);
		text.x = cc.winSize.width/2;
		text.y = cc.winSize.height/1.6;
		this.addChild(text,20);
		/*	var label = new cc.LabelTTF("请点击右上角的菜单按钮\n然后\"分享到朋友圈\"\n一起来抢面膜吧~~", res.font, 18, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 100;
		label.anchorY = 1;
		label.shadowColor = cc.color(255,255,255);
		label.shadowBlur = 50;
		this.addChild(label);*/

		var btn = new cc.Sprite(res.Button_png);
		btn.anchorX = 0.5;
		btn.anchorY = 0.5;
		btn.setScale(cc.winSize.width/text.getContentSize().width);
		btn.x = cc.winSize.width/2;
		btn.y = cc.winSize.height/4;
		this.addChild(btn,20);
	},
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchEnded:function(t, event){
				event.getCurrentTarget().removeFromParent();
			}
		}, this);
	}
});
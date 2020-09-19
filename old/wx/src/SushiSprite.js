var SushiSprite=cc.Sprite.extend({
	disappearAction:null,
	touchListener:null,
	state:0,//1:coming out， 1：idle，can be touched,2:disappeared
	plusOne:null,
	
	onEnter:function(){
		this._super();
		this.addTouchEventListenser();
		this.setScale(1);
		this.comingOut();
	},
	
	onExit:function(){
		this._super();
	},
	
	addTouchEventListenser:function(){
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: true,
			//onTouchBegan event callback function                      
			onTouchBegan: function (touch, event){
				var pos = touch.getLocation();
				var target = event.getCurrentTarget();  
				if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
					
					target.removeTouchEventListenser();
					//响应精灵点中
					target.stopAllActions();
					cc.log("stop");
					// 添加 加1
					var plusOne = new cc.Sprite(res.PlusOne_png);
					plusOne.x=pos.x;
					plusOne.y=pos.y;
					cc.director.getRunningScene().addChild(plusOne,11);
					plusOne.setScale(0.3);
					var po = cc.spawn(cc.scaleTo(1,1.6),cc.fadeOut(1));
					plusOne.runAction(po);
					//var ac = cc.fadeOut(0.5);//target.disappearAction;
					var seqAc= cc.sequence(//ac,
							cc.callFunc(function(){
					if(target.getParent()){
						target.getParent().removeSushi(this,true);
						}
					},target)
					);
					target.runAction(seqAc);
					return true;
				}
				return false;
			}
		});
		cc.eventManager.addListener(this.touchListener,this);
	},
	
	//加1的效果
	plusOne: function() {
		
	},
	
	createDisappearAction : function() {
		// 没有消息画面了
		var frames = [];
		for (var i = 0; i < 11; i++) {
			var str = "sushi_1n_"+i+".png";
			cc.log(str);
			
			//cc.log(str);
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames, 0.02);
		var action = new cc.Animate(animation);

		return action;
	},
	
	removeTouchEventListenser:function(){
		cc.eventManager.removeListener(this.touchListener);
	},
	comingOut:function(){
		this.stopAllActions();
		this.touchListener.setEnabled(true);
		this.state = 0;
		this.runAction(cc.sequence(
				//cc.spawn(cc.scaleTo(0.5, 1, 1)),
			//	cc.scaleTo(0.6, 1, 1),
				cc.callFunc(function(){
					this.idle();
				}, this)));
		//this.touchListener.setEnabled(false);//处于0状态是不能点
	},

	idle:function(){
		this.stopAllActions();
		this.state=1;
		cc.log("can be touched now.")
		//this.setTexture(cc.spriteFrameCache.getSpriteFrame("sushi_1n_1.png").getTexture());
		this.setTexture(res.Sushi_png);
		//TODO 时长随机 
		//this.setTextureRect(cc.rect(0, 0, 150, 150));
		//this.setScale(0.5);
/*		this.runAction(cc.sequence(
				cc.spawn(cc.scaleTo(0.5, 1, 1),cc.blink(0.5, 4))));*/
		// 添加消失的效果，在1秒内消失
		this.scheduleOnce(function(){
			this.disappeared();
		}, 1);
	},
	disappeared:function(){
		this.stopAllActions();
		this.state=2;
		this.getParent().removeSushi(this);
	},

	
});
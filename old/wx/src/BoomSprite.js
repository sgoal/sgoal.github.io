/**
 * 碰到就爆炸，然后结束
 */
var BoomSprite = cc.Sprite.extend({
		state:0,//0:coming out, 1:able to clicked,idle 2:disappeared 3:bomb
		disappearAction:null,
		touchListener:null,
		
		onEnter:function(){
			this._super();
			this.addTouchEventListenser();
			this.setScale(1);
			this.comingOut();
			cc.log("boom");
		},
			
		onExit:function(){
			this._super();
			this.removeListener();
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
						//alert("dead");
						target.removeListener();
						//响应精灵点中
						target.stopAllActions();
						
						var nowScene = cc.director.getRunningScene();

						// 添加爆炸效果
						//函数里面的变量会被清除
						nowScene.explosion = new cc.Sprite(res.Explosion_png);
						nowScene.explosion.x=pos.x;
						nowScene.explosion.y=pos.y;
						nowScene.addChild(nowScene.explosion,11);
						nowScene.explosion.setScale(0.3);
						var po = cc.spawn(cc.scaleTo(0.25,1),cc.fadeIn(0.25));

						nowScene.explosion.runAction(cc.sequence(
							po,
							cc.delayTime(0.3),
							cc.scaleTo(0.01,0),
							cc.delayTime(0.1),
							cc.callFunc(function(){
							if(target.getParent()){
									target.getParent().gameOver(1);
							}
						},nowScene.explosion)));
						
						return true;
					}
					return false;
				}
			});
			cc.eventManager.addListener(this.touchListener,this);	
		},
		removeListener:function(){
			cc.eventManager.removeListener(this.touchListener);
		},
		
		comingOut:function(){
			this.stopAllActions();
			this.touchListener.setEnabled(true);
			this.state = 0;
			//持续2.3秒，1+1.3
			this.runAction(cc.sequence(
					cc.scaleTo(1.3, 1.1),
					cc.callFunc(function(){
						this.idle();
					}, this)));
			//this.touchListener.setEnabled(false);//处于0状态是不能点
		},
		
		idle:function(){
			this.stopAllActions();
			this.state=1;
			cc.log("can be touched now.")
			//this.touchListener.setEnabled(true);
			// 添加消失的效果，在1秒内消失
			this.scheduleOnce(function(){
				this.disappeared();
			}, 1);
		},
		disappeared:function(){
			this.stopAllActions();
			this.state=2;
			this.getParent().removeBoom(this);
		},
		
		boom:function(){
			this.stopAllActions();
			this.state=3;
		}
		
});
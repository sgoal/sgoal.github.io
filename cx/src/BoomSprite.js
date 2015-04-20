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
			//this.setScale(0.2);
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
						cc.log("dead");
						target.getParent().gameOver(1);
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
			//持续2.8秒，1+1.8
			this.runAction(cc.sequence(
					cc.scaleTo(1, 1, 1),
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
			// 添加消失的效果，在1.5秒内消失
			this.scheduleOnce(function(){
				this.disappeared();
			}, 1.5);
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
//TODO http://cn.cocos2d-x.org/tutorial/show?id=2240

/**
 * 
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxefaf67406a0cbd88&secret=566d83cc2526bb2212bb091036c7610d
 * 
 * 
 * Connection: keep-alive
Date: Tue, 03 Feb 2015 11:08:38 GMT
Server: nginx/1.4.4
Content-Type: application/json; encoding=utf-8
Content-Length: 144
{
    "access_token": "qCTPwShOJzfLxa02PVsRlyP7ymXQJCc-hQOOj7QAPm2dcX4N5SyHPTaQPAkOjoMJP83g5SaWr6W2R1WSnJhSm9Q4tDaF626ghp8oILyRNMk", 
    
    "expires_in": 7200
}


{"errcode":0,"errmsg":"ok","ticket":"bxLdikRXVbTPdHSM05e5u3rlQGJ9j8BVrGXc7jkkmJ-rZX-nMI-Idm8AKNWyAGMYWOfC_AfpmVH70Sgrd_V1lw","expires_in":7200}
 */

/**
 * 
 * string1
jsapi_ticket=bxLdikRXVbTPdHSM05e5u3rlQGJ9j8BVrGXc7jkkmJ-rZX-nMI-Idm8AKNWyAGMYWOfC_AfpmVH70Sgrd_V1lw&noncestr=VQhYOUJRz6RolHqN&timestamp=1422962211&url=godoubao.com

signature
4820ce1be789d779dd2b740046458a4e0fc55b0c
 */
/**
 * APPID: wxefaf67406a0cbd88
AppSecret(应用密钥)566d83cc2526bb2212bb091036c7610d   
 * 
 */
/*wx.config({
	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	appId: 'wxefaf67406a0cbd88', // 必填，公众号的唯一标识
	timestamp: 1422962211374, // 必填，生成签名的时间戳
	nonceStr: 'VQhYOUJRz6RolHqN', // 必填，生成签名的随机串
	signature: '4820ce1be789d779dd2b740046458a4e0fc55b0c',// 必填，签名，见附录1
	jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.onMenuShareTimeline({
	title: '', // 分享标题
	link: '', // 分享链接
	imgUrl: '', // 分享图标
	success: function () { 
		// 用户确认分享后执行的回调函数
	},
	cancel: function () { 
		// 用户取消分享后执行的回调函数
	}
});*/
//TODO 换成官方API
//微信分享的数据
var wxData = {
		"appId": "wxefaf67406a0cbd88", // 服务号可以填写appId
		"imgUrl" : 'http://godoubao.com/sushi/res/boom.png',
		"link" : 'http://godoubao.com/sushi',
		"desc" : '大家好，我是sgoal~这是面膜游戏~',
		"title" : "Hell,title"
};

// 分享的回调
var wxCallbacks = {
		// 收藏操作是否触发回调，默认是开启的
		favorite : false,

		// 分享操作开始之前
		ready : function() {
			// 你可以在这里对分享的数据进行重组
			alert("准备分享");
		},
		// 分享被用户自动取消
		cancel : function(resp) {
			// 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
			alert("分享被取消，msg=" + resp.err_msg);
		},
		// 分享失败了
		fail : function(resp) {
			// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
			alert("分享失败，msg=" + resp.err_msg);
		},
		// 分享成功
		confirm : function(resp) {
			// 分享成功了，我们是不是可以做一些分享统计呢？
			alert("分享成功，msg=" + resp.err_msg);
		},
		// 整个分享过程结束
		all : function(resp,shareTo) {
			// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
			alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
		}
};

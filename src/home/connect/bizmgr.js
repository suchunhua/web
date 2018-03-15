'use strict';

import ConnBase from './connbase.js';
import UserMgr from './usermgr.js';


require("./timesolver.js");

var orderMap = new Map();

export default class extends ConnBase {
	serverUrl = '/elws/services/fdmsys';



	async updTestOrder(senderId, orderId,customerId, testItem, phoneNumber, recvContactInfo, reptReceiver,orderAmt,recvAddress,notes,promCode){
		var user = UserMgr.getUser(senderId);
		var recvAddress1 =  encodeURIComponent(recvAddress,'UTF-8');
     var reptReceiver1 =  encodeURIComponent(reptReceiver,'UTF-8');
     var notes1 =  encodeURIComponent(notes,'UTF-8');
		if(user != null){	
			var tod = new Date();
			var path = this.serverUrl + '/updTestOrder?' + 'senderId='+senderId +'&secToken='+user.secToken + '&orderId='+orderId
				+ '&customerId=' + customerId + '&testItem=' + testItem 
				+ '&sendDate=' + this.format(tod)
				//  encodeURIComponent(tod.toDateString())
				+ '&testType=2&orderStatus=6&needReturn=true';
			
			if( phoneNumber != null){ 
				path += '&phoneNumber=' + phoneNumber;
			}
			if( recvContactInfo != null){ 
				path += '&recvContactInfo=' + recvContactInfo;
			}
			if( reptReceiver != null){ 
				path += '&reptReceiver=' + reptReceiver1;
			}
			if( orderAmt != null){ 
				path += '&orderAmt=' + orderAmt;
			}
			if( recvAddress != null){ 
				path += '&recvAddress=' + recvAddress1;
			}
			if( notes != null){ 
				path += '&notes=' + notes1;
			}
			if( promCode != null){ 
				path += '&promCode=' + promCode;
			}
			this.updatePath(path);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}


	}


	async downLoadPill(senderId,orderId){
		console.log("---------downLoadPill start-------------");
		var user = UserMgr.getUser(senderId);
			if(user != null){
			this.updatePath(this.serverUrl+'/queryEReceipt?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&orderId='+orderId);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
		


	}
	async deleteTestItem(senderId,itemId){

			console.log("------deleteTestItem start----------------");
			var user = UserMgr.getUser(senderId);
			if(user != null){
			this.updatePath(this.serverUrl+'/deleteTestItem?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&itemId='+itemId);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}

	}

	//update order information
	//updTestInfo(senderId, secToken, testOrderId, custId, doctor, feeStatus, needRet, phone, 
	//recvContactInfo, reportReceiver, sendDate, sendContactInfo, senderName, sendUnit, sendTechoffice, 
	//testType, testStatus, itemId);

	async  addItem(senderId,pdtinfor){
		console.log("---------addTtem start--------------");
		console.log(pdtinfor);

		var user = UserMgr.getUser(senderId);
		var name = encodeURIComponent(pdtinfor.name);
		var desc = encodeURIComponent(pdtinfor.desc);


		if(user != null){
			this.updatePath(this.serverUrl+'/addTestItem?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&name='+name+'&desc='+desc+'&price='+pdtinfor.price);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}

	}
	async updTestInfo(senderId,infor){
		console.log("---------updTestInfo start--------------");
		console.log(infor);
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl+'/updTestInfo?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&testId='+senderId+'&custId='+orderId+'&doctor=true'+'&feeStatus=true'+'&needRet=false'
				+'&phoneNum='+orderId+'&recvContactInfo='+orderId+'&reportReceiver='+orderId+'&sendDate='+orderId
				+'&sendContactInfo='+orderId+'&senderName='+orderId+'&sendUnit='+orderId
				+'&sendTechoffice='+orderId+'&testType='+orderId+'&testStatus='+orderId+'&itemId='+orderId);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}

	}



	//pay addmethod 
	async addOrUpdOrderAccess(senderId, orderId){
		console.log("======= addOrUpdOrderAccess start=======");
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl+'/addOrUpdOrderAccess?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&userId='+senderId+'&orderId='+orderId+'&ownerYn=true'+'&creatorYn=true'+'&assignedYn=false');
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}

	}


	//更新折扣产品信息


	async updDiscPrice(senderId,id, itemId, promotionCode, startDate, endDate, price){
		console.log("======= updDiscPrice start=======");
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl+'/updDiscPrice?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&id='+id+'&itemId='+itemId+'&promotionCode='+promotionCode+'&startDate='+startDate+'&endDate='+endDate+'&price='+price);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}


	}
	//删除折扣产品信息

	async deleleDiscPrice(senderId,id){

		console.log("======= deleteDisc start=======");
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl+'/deleleDiscPrice?'+'senderId='+senderId+ '&secToken='+user.secToken
				+'&id='+id);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}


	async updateProductionPrice(senderId,itemId,name,desc,price){
			var user = UserMgr.getUser(senderId);
			if(user != null){
			this.updatePath(this.serverUrl+'/updTestItem?'+'senderId='+senderId+ '&secToken='+user.secToken+'&itemId='+itemId
				+'&name='+name+'&desc='+desc+'&price='+price
				);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}

	}
	//pricelist

	async getTestItemList(userId){
		var user = UserMgr.getUser(userId);
		if(user != null){
			this.updatePath(this.serverUrl+'/getTestItemList?'+'senderId='+userId+ '&secToken='+user.secToken
				);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}

	//query testOrder
	async queryOrder(userId){


		//删除MAP的内容
		console.log("=======显示map的内容=============");
		for(let i in orderMap ){


			console.log(orderMap[i]);

		}
		console.log("========删除map的内容=============");
		orderMap.clear();

		var user = UserMgr.getUser(userId);
		if(user != null){
			this.updatePath(this.serverUrl+'/getTestOrderList?'+'senderId='+userId+ '&secToken='+user.secToken
				+'&queryType=5'+'&userId='+userId);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}

	//query testOrder by orderId
	async queryOrderByOrderId(userId,orderId){
		var user = UserMgr.getUser(userId);
		if(user != null){
			this.updatePath(this.serverUrl+'/getTestOrderList?'+'senderId='+userId+ '&secToken='+user.secToken
				+'&queryType=1'+'&orderId='+orderId);
			return this.sendRequest();
		}else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}
	//unionpay
	async unionPay(senderId, orderId, amt, frontUrl, backUrl){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/unionPay?' + 'senderId='+senderId + '&secToken='+user.secToken
				+'&orderId=' + orderId + '&amt='+amt +'&frontUrl=' + frontUrl + '&backUrl=' + backUrl);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}

	async unionBill(senderId, encoding, jsonParam){
		var user = UserMgr.getUser(senderId);
		var jsonParam2 = encodeURIComponent(jsonParam, "UTF-8");
		
		if(user != null){
			this.updatePath(this.serverUrl + '/unionBill?' + 'senderId='+senderId + '&secToken='+user.secToken
				+'&encoding=' + encoding + '&jsonParam=' + jsonParam2);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}

	async unionVerify(senderId, encoding, jsonParam){
		var user = UserMgr.getUser(senderId);
		var jsonParam2 = encodeURIComponent(jsonParam, "UTF-8");
		if(user != null){
			this.updatePath(this.serverUrl + '/unionVerify?' + 'senderId='+senderId + '&secToken='+user.secToken
				+'&encoding=' + encoding + '&jsonParam=' + jsonParam2);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}


	//alipay method
	async buildAliPayRequest(senderId, tradeNo, subject, totalFee, body, notifyUrl, returnUrl){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/buildAliPayRequest?' + 'senderId='+senderId + '&secToken='+user.secToken
				+'&tradeNo='+tradeNo+'&subject='+subject+'&totalFee='+totalFee+'&body='+body
				+'&notifyUrl='+notifyUrl+'&returnUrl='+returnUrl);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};


	async aliVerify(senderId, encoding, jsonParam){

		console.log("========aliVerify start==========");
		var user = UserMgr.getUser(senderId);
		var jsonParam2 = encodeURIComponent(jsonParam, "UTF-8");
		if(user != null){
			this.updatePath(this.serverUrl + '/aliVerify?' + 'senderId='+senderId + '&secToken='+user.secToken
				+'&encoding=' + encoding + '&jsonParam=' + jsonParam2);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}

	async aliNotify( orderId, encoding, jsonParam){
			console.log("======aliNotify satrt==================");
			console.log(orderId);
			var order = orderMap.get(orderId);
			console.log(order);
			//var senderId1 =  order.userId;
			var senderId  = order.split(",");
			var senderId2 = senderId[1] ;
			console.log(senderId2);
			var user = UserMgr.getUser(senderId2);
		//console.log("========aliNotify start==========");
		//var user = UserMgr.getUser(senderId);
		var jsonParam2 = encodeURIComponent(jsonParam, "UTF-8");
		if(user != null){
			this.updatePath(this.serverUrl + '/aliNotify?' + 'senderId='+senderId2 + '&secToken='+user.secToken
					+'&orderId=' + orderId +'&encoding=' + encoding + '&jsonParam=' + jsonParam2);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}


	//api interface
	async getDiscPriceList(senderId){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/getDiscPriceList?' + 'senderId='+senderId + '&secToken='+user.secToken);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};


	async addDiscPrice(senderId, promotionCode, itemId, startDate, endDate, price){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/addDiscPrice?' + 'senderId='+senderId + '&secToken='+user.secToken 
					+ '&promotionCode=' + promotionCode + '&itemId=' + itemId
					+ '&startDate=' + startDate + '&endDate=' + endDate+ '&price=' + price);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async updDiscPrice(senderId, id, promotionCode, itemId, startDate, endDate, price){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/updDiscPrice?' + 'senderId='+senderId + '&secToken='+user.secToken 
					+ '&id=' + id + '&promotionCode=' + promotionCode + '&itemId=' + itemId
					+ '&startDate=' + startDate + '&endDate=' + endDate+ '&price=' + price);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async deletePrice(senderId, id){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/deletePrice?' + 'senderId='+senderId + '&secToken='+user.secToken + '&id='+id);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async getCurrentPrice( itemId, promCode){
		//var user = UserMgr.getUser(senderId);
		//if(user != null){
			//console.log(-------------"getCurrentPrice"---------);
			console.log(itemId+"|"+promCode);
			this.updatePath(this.serverUrl + '/getCurrentPrice?' + 'senderId=' + '&secToken='+ 
					 '&itemId=' + itemId + '&promotionCode=' + promCode);
			return this.sendRequest();
		//}
		//else{
		//	return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		//}
	};
	async getPersonCurrentPrice(senderId,itemId, promCode){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			//console.log(-------------"getCurrentPrice"---------);
			console.log(itemId+"|"+promCode);
			this.updatePath(this.serverUrl + '/getCurrentPrice?' + 'senderId=' + '&secToken='+ 
					 '&itemId=' + itemId + '&promotionCode=' + promCode);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async getDiscPriceList(senderId){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/getDiscPriceList?' + 'senderId='+senderId + '&secToken='+user.secToken);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async addCustomer(senderId, name, phone, email){

		console.log("---------addCustomer test---------------");
		console.log(senderId);
		var user = UserMgr.getUser(senderId);
		console.log(user);
		if(user != null){
			this.updatePath(this.serverUrl + '/addCustomer?' + 'senderId='+senderId + '&secToken='+user.secToken
					 + '&name='+name + '&type=2'+ '&age=0'+ '&contactPhone='+phone+ '&clDiagnosis='
					 + '&email=' + '&idType=1' + '&idNumber=' + '&heigh=0' 
					 + '&weight=0' + '&tnmStage=M0');
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	async getCustomerDetail(senderId, custId){
		var user = UserMgr.getUser(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/getCustomerDetail?' + 'senderId='+senderId + '&secToken='+user.secToken
					 + '&id=' + custId );
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};


	async addTestOrder(senderId, customerId, testItem, phoneNumber, recvContactInfo, reptReceiver,orderAmt,recvAddress,notes,promCode){
		var user = UserMgr.getUser(senderId);
		var recvAddress1 =  encodeURIComponent(recvAddress,'UTF-8');
     var reptReceiver1 =  encodeURIComponent(reptReceiver,'UTF-8');
     var notes1 =  encodeURIComponent(notes,'UTF-8');
		if(user != null){	
			var tod = new Date();
			var path = this.serverUrl + '/addTestOrder?' + 'senderId='+senderId + '&secToken='+user.secToken
				+ '&customerId=' + customerId + '&testItem=' + testItem 
				+ '&sendDate=' + this.format(tod)
				//  encodeURIComponent(tod.toDateString())
				+ '&testType=2&orderStatus=6&needReturn=true';
			
			if( phoneNumber != null){ 
				path += '&phoneNumber=' + phoneNumber;
			}
			if( recvContactInfo != null){ 
				path += '&recvContactInfo=' + recvContactInfo;
			}
			if( reptReceiver != null){ 
				path += '&reptReceiver=' + reptReceiver1;
			}
			if( orderAmt != null){ 
				path += '&orderAmt=' + orderAmt;
			}
			if( recvAddress != null){ 
				path += '&recvAddress=' + recvAddress1;
			}
			if( notes != null){ 
				path += '&notes=' + notes1;
			}
			if( promCode != null){ 
				path += '&promCode=' + promCode;
			}
			this.updatePath(path);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	};

	
	format(date) {
		  date = new Date(date);

		  var day = ('0' + date.getDate()).slice(-2);
		  var month = ('0' + (date.getMonth() + 1)).slice(-2);
		  var year = date.getFullYear();

		  return year + '-' + month + '-' + day;
	}

	
	async test(){
	    return this.postRequest("/back/test", "{'d1':'1'}, {'a1':'2'}");
	};


	//存储订单apli支付信息的
	static setOrder(orderInfo){
		var orderId = orderInfo.orderId;
		var userId = orderInfo.userId;
		console.log(orderInfo.orderId + "|" + orderInfo.userId  + "|||" )
		console.log("[type]" + typeof userId );
		if( orderId != null && typeof orderId == "number"){
			orderId = "" + orderId;
		}
		orderMap.set(orderId, userId);


	}


	static getOrder(orderId){
		var u =  orderMap.get(orderId);		
		console.log("|" +u.orderId + "|" + u.userId  + "--" );
		return u;

	}

}

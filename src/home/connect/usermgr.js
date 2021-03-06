'use strict';

import ConnBase from './connbase.js';

var userMap = new Map();
var md5 = require("blueimp-md5");

export default class extends ConnBase {
	serverUrl = '/elws/services/authapi';





	// admin add user 
	async addUser(senderId,username,password,phone,email,realName,userRole){
		var user = userMap.get(senderId);
		if(user != null){
			var hashpwd = this.hash(password);
			var path = this.serverUrl + '/createUser?' + 'senderId='+senderId + '&secToken='+user.secToken
					+ '&name=' + username + '&password=' + hashpwd + '&userRole='+userRole+'&cardId=null' ;
			if( realName != null){ 
				path += '&realName=' + realName;
			}
			if( email != null){ 
				path += '&email=' + email;
			}
			if( phone != null){ 
				path += '&phone=' + phone;
			}
			
			
			this.updatePath(path);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}		
	}

	//update user information
	async updateUserInfor(senderId,infor,cardId,disabled,code){
		var user = userMap.get(senderId);
		console.log("============updateUserInfor start==================");
		console.log(infor);
		var realName = infor.realName;
		var  email = infor.email;
		var  phone = infor.phone;
		var  userRole = infor.userRole;

		if(user != null){
			var hashpwd = this.hash(infor.password);
			var path = this.serverUrl + '/updateUser?' + 'senderId='+senderId + '&secToken='
				+user.secToken+ '&userId='+infor.userId+'&name=' + infor.name + '&password=' + hashpwd;
			if( realName != null){ 
				path += '&realName=' + realName;
			}
			if( email != null){ 
				path += '&email=' + email;
			}
			if( phone != null){ 
				path += '&phone=' + phone;
			}
			if( cardId != null){ 
				path += '&cardId=' + cardId;
			}
			if( userRole != null){ 
				path += '&userRole=' + userRole;
			}
			if( code != null){ 
				path += '&vCode=' + code;
			}
			if( disabled != null){ 
				path += '&disabled=' + disabled;
			}
			this.updatePath(path);
			return this.sendRequest();
		}else{

			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});

		}

	}

	//judge phone exitence

	async phoneTest(phoneNum){
		//var user = userMap.get(senderId);
		//if(user != null){
			this.updatePath(this.serverUrl + '/getUserList?' + 'senderId=0' + '&secToken='+'&phone='+phoneNum);
			return this.sendRequest();
		//}
		//else{
		//	return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
	//	}
	}

	
	//api interface
	async login(username, password){		
		var hashpwd = this.hash(password);		
		console.log("hash=" + hashpwd + "|" + password);		
		this.updatePath(this.serverUrl + '/login?' + 'name='+username + '&password='+hashpwd);
		return this.sendRequest();
	};
	
	async createUser( name, password, realName, email, phone ){
		//var user = userMap.get(senderId);
		//if(user != null){
			var name1 = encodeURIComponent(name, "UTF-8");
			var realName1 = encodeURIComponent(realName, "UTF-8");
			var hashpwd = this.hash(password);
			var path = this.serverUrl + '/createUser?' + 'senderId=5' + '&secToken='
					+ '&name=' + name1 + '&password=' + hashpwd + '&userRole=patient' ;
			if( realName != null){ 
				path += '&realName=' + realName1;
			}
			if( email != null){ 
				path += '&email=' + email;
			}
			if( phone != null){ 
				path += '&phone=' + phone;
			}
			
			this.updatePath(path);
			return this.sendRequest();
		//}
		//else{
		//	return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
	//	}		
	}
	
	async updateUser( name, password, vCode,phone,realName, email,userRole, cardId, disabled){
		var user = userMap.get(senderId);
		//if(user != null){
			var hashpwd = this.hash(password);
			var path = this.serverUrl + '/updateUser?' + 'senderId=8' + '&secToken=9'
				+ '&name=' + name + '&password=' + hashpwd;
			/*if( realName != null){ 
				path += '&realName=' + realName;
			}
			if( email != null){ 
				path += '&email=' + email;
			}
			if( phone != null){ 
				path += '&phone=' + phone;
			}
			if( cardId != null){ 
				path += '&cardId=' + cardId;
			}
			if( userRole != null){ 
				path += '&userRole=' + userRole;
			}
			if( vCode != null){ 
				path += '&vCode=' + vCode;
			}
			if( disabled != null){ 
				path += '&disabled=' + disabled;
			}*/
			this.updatePath(path);

			return this.sendRequest();
		//}
		//else{
		//	return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		//}		
	}

	async updatePassword(name, password,phone,vCode){
		var hashpwd = this.hash(password);

		
		this.updatePath(this.serverUrl + '/updateUser?' + 'senderId=8'  + '&secToken=9'
					+ '&name=' + name + '&password=' + hashpwd + '&phone=' + phone 
					 + '&vCode=' + vCode   + '&cardId=' 
					 + '&role=' + '&disabled='  + '&userId=' );
			return this.sendRequest();
	}





	async deleteUser(senderId, userId){
		console.log(senderId+'======'+userId);

		var user = userMap.get(senderId);
		console.log("========"+user.secToken)
		if(user != null){
			this.updatePath(this.serverUrl + '/deleteUser?' + 'senderId='+senderId + '&secToken='+user.secToken
					+ '&userId=' + userId);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}		
	}

	async disableUser(senderId, userId, flag){
		var user = userMap.get(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/disableUser?' + 'senderId=' + senderId + '&secToken='+user.secToken
					+ '&userId=' + userId + '&flag=' + flag);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}		
	}

	async getUser(senderId, userId){
		var user = userMap.get(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/getUser?' + 'senderId=' + senderId + '&secToken='+user.secToken
					+ '&userId=' + userId);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}		
	}

	async sendShortMsgCode(senderId,type, key){
		//var user = userMap.get(senderId);
		//if(user != null){
			console.log(senderId+"|"+key+"|"+type+"|");
			this.updatePath(this.serverUrl + '/sendShortMsgCode?' + 'senderId=' + senderId + '&secToken='
					+ '&type=' + type + '&key=' + key );
			return this.sendRequest();
		//}
		//else{
			//return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		//}		
	}

	async verificationCode(key, code){
		//var user = userMap.get(senderId);
		//if(user != null){
			this.updatePath(this.serverUrl + '/verificationCode?' + 'senderId=0'  + '&secToken=123'
					+ '&key=' + key + '&code=' + code );
			return this.sendRequest();
		//}
		//else{
		//	return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		//}		
	}

	async getUserList(senderId, phoneNum){

		
		var user = userMap.get(senderId);
		if(user != null){
			this.updatePath(this.serverUrl + '/getUserList?' + 'senderId='+senderId + '&secToken='+user.secToken);
			return this.sendRequest();
		}
		else{
			return this.localError({ "errorCode" : 100, "errorMsg" : "用户没有登录"});
		}
	}
	
	//utilitize methods
	static setUser(userInfo){
		var userId = userInfo.userId;
		console.log(userInfo.userId + "|" + userInfo.secToken  + "|||" )
		console.log("[type]" + typeof userId );
		if( userId != null && typeof userId == "number"){
			userId = "" + userId;
		}
		userMap.set(userId, userInfo);
	}
	
	static getUser(userId){
		var u =  userMap.get(userId);		
		console.log("|" +u.userId + "|" + u.secToken  + "--" );
		return u;
	}
	
	hash(data){
		var hs = md5(data);
		var sbhash = hs.substring(8,24);
		var resv = "";
		
		for(var i=sbhash.length; i>=1; i--){
			resv += sbhash.charAt(i-1);
		}
		
		console.log("hash=" + hs + "|" + sbhash + "|" + sbhash.length + "|" + resv);
		return resv;
	}

}

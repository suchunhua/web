'use strict';

import Base from './base.js';
import UserMgr from '../connect/usermgr.js';

var mgr = new UserMgr();
var errorCode = 0;

var http = require('http');

export default class extends Base {

    indexAction() {
        let action = this.get('action');
        console.log(action);
        
        this.assign('action', action);
        return this.display();
    }

    //user login method 
   async loginAction(){


          


           if(this.isGet()){
                    return this.display();
             }
             console.log("=======loginAction start=======");
          console.log("[loginAction] " + this.post());
          
          console.log(this.post().username+"|"+this.post().password);
          this.cookie("username", this.post().username);
          if(this.post().username==null || this.post().username==''){
              console.log("test loginAction");
              return this.display();
          }
          else{
        	  let pm = await mgr.login(this.post().username,this.post().password)
        	  	.then(function(result){
              console.log(result);
              UserMgr.setUser(result);
              console.log("-------------------");

              if(result.errorCode==0){
                errorCode=result.errorCode;
                console.log(errorCode);
                  return result;
              }else{
                errorCode=result.errorCode;
                return result;
              }
              //get user information method
          },
          function(error){
              console.log(error);
          })

          /*console.log("=========get getuser params===========");
              console.log(pm);
             let pm1 = await mgr.getUser(1,pm.userId)
              .then(function(result){
                  return result;
              })
              console.log("---------cookie params--------");
              console.log(pm1);
              this.cookie("phone", pm1.user.phone);
              this.cookie("email", pm1.user.email);*/

          if(errorCode==0){
            this.assign("pm",pm);
            console.log(pm);
            console.log("=========get getuser params===========");
              console.log(pm);
             let pm1 = await mgr.getUser(""+pm.userId, pm.userId)
              .then(function(result){
                  return result;
              })
              console.log("---------cookie params--------");
              console.log(pm1);
              
              this.cookie("phone", pm1.user.phone);
              this.cookie("email", pm1.user.email);
              this.cookie("name",pm1.user.name);
              this.cookie('userId', pm.userId);
              this.cookie('role',pm1.user.userRoles);
           // return this.display('home:index:index');
           // return this.redirect('/user/userlist');

	           if(pm1.user.userRoles=='admin'){
	        	   return this.redirect('/back/userlist');
	           }else{
	        	   return this.redirect('/index/index');
	           }
          }
          else{
            this.assign("pm",pm);
            console.log("======login fail==========");
            if(pm.errorCode==1002){
              this.assign("loginmsg","用户名不存在");
            }else if(pm.errorCode==1001){
              this.assign("loginmsg","用户名密码错误");                
            }else{
              this.assign("loginmsg","其他错误请稍后再试。。。。。");  
            }
            console.log(pm);
             return this.display();
          }
          
        }

    
      
    }


    //register method  
   async registerAction(){

      if(this.isGet()){
                    return this.display();
             }
      //user infor params
      //try{

      let userinfor=this.post();
      console.log(userinfor);
      console.log("====================");
      let username =this.post('username');
      let password =this.post('password');
      let realName =this.post('realName');
      let email =this.post('email');
      console.log(username+"|||"+email);

      //verification params
     let phoneNum =this.post('phoneNum');
    let code  =this.post('code');

    
    if(code==null||code==""){
            return this.display();
        }else{
          console.log("----------verificationcodeAction start -----------");
          let pm = await mgr.verificationCode(phoneNum,code)
          .then(function(result){
                console.log(result);
                //this.assign("result",result);
                return result;
         
              })

              if(pm.errorCode==0){
                  console.log("----------createUser start -----------");
                  let pmc = await mgr.createUser(username,password,realName,email,phoneNum)
                  .then(function(result){
                   // console.log(result);
                    return result;
                  })
                  console.log("--------------------------");
                  console.log(pmc);
                  console.log(typeof pmc);
                  this.assign("pm1",pmc);
                  if(pmc.errorCode==1104){
                     this.error("msg","用户名已被注册,请返回");
               }else{
                  return this.display("home:user:login");
               }
                  
               }
               
                  
               
              else{
                      this.assign("userinfor",userinfor);
                      this.assign("msg","验证码输入错误");
                      return this.display();
              }
         }
        //createUser method 

    /*  }catch(e){

        console.log("注册失败");

        this.assign("userinfor",userinfor);
        this.assign("msg","用户名已经被注册");
         return this.display();

      }*/
     
        
        
        
        
      
      //
   } 



   async registerphoneAction(){

    console.log("======registerphoneAction start==============");
    let userinfor = this.post();
    console.log(userinfor);
    this.assign("userinfor",userinfor);

    console.log(userinfor.phoneNum);
    try{
      let pm = await mgr.phoneTest(userinfor.phoneNum)
               .then(function(result){
                console.log(result);
                //this.assign("result",result);
                return result;
         
              })

      console.log(pm);

                if(pm.userList!=null){
                   
                      //this.assign("phone",phone.phone1);
                      //this.assign("username",pm.userList[0].name);
                      this.assign("msg","电话号码已注册");
                    
                    
                }else{
                  //this.assign("phone",phone.phone1);
                  this.assign("msg","电话号码可以注册(手机验证码发到手机5分钟以内不能再获取)");
                  console.log("----------sendShortMsgCodeAction  start-----------")
                   let pm = await mgr.sendShortMsgCode(0,0, userinfor.phoneNum)
                 .then(function(result){
                   //console.log(result);
                 return result;
                      })


                }



    return this.display("user:register")
   // return this.redirect("/user/register");

   }catch(e){
      return this.display("user:register");
    }





   }
   async passwordAction(){
          
          try{
              let infor = this.post();
              console.log("-------passwordAction---verificationcodeAction start -----------");
              console.log(infor);
              let pm = await mgr.updatePassword(infor.username,infor.password,infor.phone,infor.code)
              .then(function(result){

                console.log(result);
                return result;

              })
              console.log(pm);
              if(pm.errorCode==0){
                return this.display("user:login");
              }
              return this.display();
          }catch(e){
              return this.display();
          }
         
           
         // this.assign("msg","电话号码存在，请注册");


          //console.log(pm.userList[0].phone);
         
          
          
          //this.assign("msg","test");


   }

   // password find send msg
 async passwordsendmsgAction()
   {

      console.log("========passwordsendmsgAction=========");
      let phone = this.post("phone");

      console.log(phone);

      let pm = await mgr.sendShortMsgCode(0,0, phone)
    .then(function(result)
    {
        //console.log(result);
        return result;
    })
    console.log("-----------------------");
    console.log(pm);




     // return this.redirect("/user/password");
      return this.display();
   }


   async testAction(){

    let phone = this.post();

   // this.assign("msg",phone.phone1);
    console.log(phone);
    try{
      let pm = await mgr.phoneTest(phone.phone1)
               .then(function(result){
                console.log(result);
                //this.assign("result",result);
                return result;
         
              })

          console.log(pm.userList);

                if(pm.userList!=null){
                    if(phone==null){
                      this.assign("msg","");
                    }else{
                      this.assign("phone",phone.phone1);
                      this.assign("username",pm.userList.name);
                     // this.assign("msg","电话号码存在");
                    }
                    
                }else{
                  this.assign("phone",phone.phone1);
                  this.assign("msg","电话号码不存在");
                }
                /*if(pm.userList[0].phone!=phone.phone1){
                   console.log("success");
                   //this.assign("phone",infor.phone);
                  // this.assign("msg","电话号码存在");
                   this.assign("msg","电话号码不存在，请注册");
                 }else {
                  this.assign("msg","电话号码存在");
                 // this.assign("msg","电话号码不存在，请注册");
                 }*/
      //return this.redirect("/user/password");
      return this.display("user:password");

    }catch(e){
      return this.display("user:password");
    }
    
   }


   async passwordcodeAction(){
    console.log("====passwordcodeAction start===========");
    let infor = this.post();
    console.log(infor);
    try{
        let pm = await mgr.verificationCode(infor.phone,infor.code)
    .then(function(result){

        console.log(result);
        return result;
    },function(error){
      console.log(error);
    })
      console.log(pm);

      if(pm.errorCode==0){
        this.assign("msg","验证码正确");
        this.assign("phone",infor.phone);
        this.assign("username",infor.username);
        this.assign("code",infor.code);
      }else{
        this.assign("msg","验证码错误");
        //this.assign("infor",infor);
        this.assign("phone",infor.phone);
        this.assign("code",infor.code);
      }

      return this.display("user:password");
    }catch(e){

    }



   }

   //获得用户列表的方法
    async userlistAction(){
    	var userId = this.cookie('userId');
    	console.log("[userlistAction] " + userId);
      let pm  = await mgr.getUserList(userId, "")
    .then( function (result) { 
      //process.stdout.write(result);
      //console.log(result.toString()); 
      //var ret = JSON.parse(result.toString());
      
      return result;
    },   
    function (error) {   
       console.log(error);   
    });
    
    for(let j in pm.userList){
      var elm = pm.userList[j];
      console.log(elm.userId + "|" + elm.name + "|" + elm.password); 
      this.assign('elm',elm);
      this.assign('userList',pm.userList);
    }

      return this.display();
   }
   // login verification method 
   async loginverificatAction(){
      try {
      let infor = this.get('infor');
      let username = this.get('username');
      let password1 = this.get('password1');
      console.log(username+"||"+password1);
      console.log(infor);
      console.log("------------------------------------");
    errorCode = 0;
    //let pm = await mgr.login('root', 'e946b69705089bb7')
    let pm = await mgr.login(username, password1)
    .then( function (result) { 
      //process.stdout.write(result);
      if( result.errorCode == 0){
        console.log(result.userId + "|" + result.secToken); 
        UserMgr.setUser(result);
        //userinfo = result;
        return result;
         
        //console.log("ret : " + userinfo.userId + "|" + userinfo.secToken);
      }
      else{
        errorCode = result.errorCode;
        //console.log("ret : " + result.errorCode + "|" + result.errorMsg);
      } 
    },   
    function (error) { 
      errorCode =error.errorCode;
        console.log(error);   
    }); 
    
    var tod = new Date();
    console.log("today : " + tod.toString() + "|" + tod.toDateString());
    if(errorCode==0){
      //路由跳转
      return this.redirect('/user/userlist');
      //return this.display("home:user:userlist");
    }
    else{
      console.log(pm);
      console.log("---------------------");
      this.assign('user', pm);
      return this.display('home:user:login');
    }
  } 
  catch (e) { 
    console.log(e); 
  }
   }


   //send short message to cellphone
   async sendshortmsgcodeAction(){
     let phoneNum =this.get('phoneNum');
    console.log(phoneNum);
    console.log("----------sendShortMsgCodeAction  start-----------")
    let pm = await mgr.sendShortMsgCode(0,0, phoneNum)
    .then(function(result){
        //console.log(result);
        return result;
    })
    console.log("-----------------------");
    console.log(pm)
    return this.display();


   }


   async verificationcodeAction(){
    let phoneNum =this.get('phoneNum');
    let code  =this.get('code');
    console.log(phoneNum+code);
    console.log("----------verificationCode start -----------")
    let pm = await mgr.verificationCode(phoneNum,code)
    .then(function(result){

        //console.log(result);
        return result;
    })
    return pm;
    console.log("-------")
   


   }


   
}
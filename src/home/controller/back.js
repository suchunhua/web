'use strict';

import Base from './base.js';
import UserMgr from '../connect/usermgr.js';
import BizMgr from '../connect/bizmgr.js';

var mgr = new UserMgr();
//-------------------------------
var mgm = new BizMgr();
var errorCode = 0;
export default class extends Base {

	 async indexAction(){
	 	return this.display();
	 }



   async  testpageAction(){

      return this.display();
   }

   async adduserAction(){


      let year = this.get('year');
      console.log(year);
     //如果是get请求，直接显示登录页面
    if(this.isGet()){
      return this.display();
    }


   }



   
   async discpriceinforAction(){

    var discinfor = this.get();
    console.log("======discinforAction start=============");


    console.log(discinfor);



    this.assign("discinfor",discinfor);
    //change time format

    console.log(discinfor.startDate);
    console.log(discinfor.endDate);
   var  startDate = discinfor.startDate;
   var  endDate = discinfor.endDate;

   var startDate1 = startDate.substring(0,10);
   var endDate1 = endDate.substring(0,10);
   console.log(startDate1);
   this.assign("startDate1",startDate1);
   this.assign("endDate1",endDate1);
    if(discinfor.itemId==1){
        this.assign("itemname","FD-Tissue-180");

    }

    if(discinfor.itemId==2) {
        
         this.assign("itemname","FD-ctDNA-180");
    }

    if(discinfor.itemId==3){
        this.assign("itemname","FD-Tissue-600");

    }

    if(discinfor.itemId==4) {
        
         this.assign("itemname","FD-ctDNA-600");
    }
    if(discinfor.itemId==5){
        this.assign("itemname","FD-Exome");

    }

    if(discinfor.itemId==6) {
        
         this.assign("itemname","FD-ctDNA-Exome");
    }
    if(discinfor.itemId==7){
        this.assign("itemname","FD-Tissue-RNA");

    }

    if(discinfor.itemId==8) {
        
         this.assign("itemname","FD-Tissue-180+FD-ctDNA-180");
    }
     if(discinfor.itemId==9) {
        
         this.assign("itemname","FD-Tissue-600+FD-ctDNA-600");
    }
    //return this.redirect("/back/discpriceinfor");



    return this.display();

   }
   async updatepriceAction(){

      let updateinfor = this.post();

      console.log("======updatepriceAction start=========="); 
      console.log(updateinfor);
      var senderId = this.cookie('userId');

      try{
        let pm = await mgm.updateProductionPrice(senderId,updateinfor.itemId,updateinfor.name,updateinfor.desc,updateinfor.price)
        .then(function(result){

          
          return result;
        },function(error){

          return error;
          
        })


      }catch(e){

      }

      return this.redirect('pricelist');


   }
   async productioninforAction(){


    try{
      let infor = this.get();
      console.log("============[productioninforAction start]=========== " );

     // var name = encodeURIComponent(infor.name);
      //var name1 = decodeURI(name)
      var name = infor.name;

      if(name=="FD-Tissue-180 FD-ctDNA-180"){

        name="FD-Tissue-180+FD-ctDNA-180"
      }
      if(name=="FD-Tissue-600 FD-ctDNA-600"){

        name="FD-Tissue-600+FD-ctDNA-600"
      }
      this.assign("name1",name);
      console.log(infor);
      this.assign("infor",infor);

    }catch(e){


    }


    return this.display();
   }
   async updateuserAction(){
    try{
    let infor = this.post();
    console.log("=====updateuserAction start=======");
    console.log(infor);
      var senderId = this.cookie('userId');
      //var userId = this.get('userId');
      let pm = await mgr.updateUserInfor(senderId,infor,null,false,null)
      .then(function(result){

          return result;

      },function(error){

        console.log(error);

      })



    }catch(e){


    }





      return this.redirect("userlist");
   }
   async userinforAction(){
    try{


      let infor = this.get();
      console.log("============[userinforAction]=========== " );
      console.log(infor);
      this.assign("infor",infor);

      return this.display();



    }catch(e){


    }


   }
   async deleteuserAction(){
      try{
        var senderId = this.cookie('userId');
        var userId = this.get('userId');
      console.log("[userlistAction] " + userId);
      let pm  = await mgr.deleteUser(senderId,userId)
    .then( function (result) { 
      //process.stdout.write(result);
      //console.log(result.toString()); 
      //var ret = JSON.parse(result.toString());
      
      return result;
    },   
    function (error) {   
       console.log(error);   
    });
    
    console.log("========deleteuserAction start================");
    console.log(pm);
    //return this.redirect('/back/userlist');
    return this.redirect('/back/userlist');
      
    }catch(e){
        return this.redirect("/index/index");
    }

    
   }
   async disclistAction(){

      var role = this.cookie('role');
      var userId = this.cookie('userId');
      if(this.isGet()&&role=='admin'){
             try{
        //var userId = this.cookie('userId');
      console.log("[userlistAction] " + userId);
      let pm  = await mgm.getDiscPriceList(userId)
    .then( function (result) { 
      //process.stdout.write(result);
      //console.log(result.toString()); 
      //var ret = JSON.parse(result.toString());
     // pm.pname = BizMgr.getPrductName(pm.productid)
      return result;
    },   
    function (error) {   
       console.log(error);   
    });
    console.log("======disclistAction pm=========");
    console.log(pm);
    //判断日期
     if(this.isGet()&&this.get('flag')=='true'){

      console.log("======judge start========");
       //console.log(pm.discList);
       var effactiveDate4 = new Date();
       
       var effactiveDate = JSON.stringify(effactiveDate4);
      

       var effactiveDate1 = effactiveDate.substring(1,11);
       
       var effactiveDate2 = effactiveDate1.split("-");
       
       var effactiveDateTotal  = parseInt(effactiveDate2[0])*365*24*3600+parseInt(effactiveDate2[1])*24*3600+parseInt(effactiveDate2[2])*3600;
       
       let discList1 = new Array();
       for(let j in pm.discList){
        
        //console.log(effactiveDate1);
        var startDate1 = pm.discList[j].startDate.substring(0,10);
        var endDate1 = pm.discList[j].endDate.substring(0,10);
        var startDate2 = startDate1.split("-");
        var endDate2 = endDate1.split("-");
        
       // console.log(startDate2[1]*24*3600);
        var startDateTotal  = startDate2[0]*365*24*3600+startDate2[1]*24*3600+startDate2[2]*3600;
        var endDateTotal  = endDate2[0]*365*24*3600+endDate2[1]*24*3600+endDate2[2]*3600;
       // console.log(effactiveDateTotal+"|||"+endDateTotal);

      // console.log(startDateTotal+"|"+endDateTotal);
        if(startDateTotal<=effactiveDateTotal&&endDateTotal>=effactiveDateTotal){
             discList1.push(pm.discList[j]);
            //console.log(pm.discList[j].startDate);

        }
        // let discList2 = discList1;
        

       }
        console.log(discList1);
      this.assign('disclist',discList1);
      return this.display();

    }



     this.assign('disclist',pm.discList);


   /* 
    var pmstr = pm;
    console.log(pmstr);
   // console.log(typeof pm.userList);
   // console.log(pm.userList.toString())
    this.assign('userlist',pm.userList);
    this.assign('pm',pm);*/
    
      return this.display();


      
    }catch(e){
        return this.redirect("/index/index");
    }
      }else{
        return this.redirect("/index/index");
      }

   

   }

   async pricelistAction(){
      var role = this.cookie('role');
      var userId = this.cookie('userId');
      if(this.isGet()&&role=='admin'){
     try{
        
      console.log("[userlistAction] " + userId);
      let pm  = await mgm.getTestItemList(userId)
    .then( function (result) { 
      //process.stdout.write(result);
      //console.log(result.toString()); 
      //var ret = JSON.parse(result.toString());
      
      return result;
    },   
    function (error) {   
       console.log(error);   
    });
    console.log("======pricelistAction pm=========");
    console.log(pm);
  /* for(let j in pm.itemList){
      var elm = pm.userList[j];
      console.log(elm.userId + "|" + elm.name + "|" + elm.password); 
      this.assign('elm',elm);*/
      this.assign('itemlist',pm.itemList);


   /* }*/
   // console.log(pm);
    var pmstr = pm;
    console.log(pmstr);
   // console.log(typeof pm.userList);
   // console.log(pm.userList.toString())
    this.assign('userlist',pm.userList);
    this.assign('pm',pm);
    //this.assign('json',"{name:jiang,age:25}");
    return this.display();


      
    }catch(e){
        return this.redirect("/index/index");
    }

      }else{
          return this.redirect("/index/index");
      }
   

   }
	 async userlistAction(){
      var role = this.cookie('role');
      var userId = this.cookie('userId');
      if(this.isGet()&&role=='admin'){
          try{

      //var userId = this.cookie('userId');
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
      
      this.assign('userlist',pm.userList);
      
    }
   // console.log(pm);
    var pmstr = pm;
    console.log(pmstr);
   // console.log(typeof pm.userList);
   // console.log(pm.userList.toString())
    this.assign('userlist',pm.userList);
    this.assign('pm',pm);
    this.assign('json',"{name:jiang,age:25}");
      return this.display();
      }catch(e){
        return this.redirect("/index/index");
      }

      }else{

           return this.redirect("/index/index");

      }
      

      
   }


   async testAction(){
	   
    console.log("-----------------------------------");
   	let infor = this.post();
   	console.log("-------start---------");
   	console.log(infor);
   	var userId1 = infor.reqReserved;
   	var userId2 = userId1.split(",");
   	var userId =userId2[0];
   	var secToken =userId2[1];
   	//var userId = this.cookie('userId');

   	var infor1 = JSON.stringify(infor); 

    //console.log(infor1.txnType);


//对传过来的json重新排序
   	/*
    var infor11 =
    {txnType:infor.txnType,
 respCode:infor.respCode, 
currencyCode:infor.currencyCode, 
merId:infor.merId,
settleDate:infor.settleDate, 
txnSubType:infor.txnSubType, 
version:infor.version, 
txnAmt:infor.txnAmt, 
signMethod:infor.signMethod, 
certId:infor.certId, 
settleAmt:infor.settleAmt, 
encoding:infor.encoding, 
settleCurrencyCode:infor.settleCurrencyCode, 
traceTime:infor.traceTime, 
bizType:infor.bizType,
 respMsg:infor.respMsg, 
 traceNo:infor.traceNo,
 queryId:infor.queryId, 
 orderId:infor.orderId,
 signature:infor.signature,
  accessType:infor.accessType,
  txnTime:infor.txnTime} 

   	var infor11 = 	
    {
     accessType:'0',
     bizType:'000201',
     certId:'69597475696',
     currencyCode:'156',
     encoding:'UTF-8',
     merId:'898320573920750',
     orderId:'20170419153547',
     queryId:'201704191535478162748',
     respCode:'00',
     respMsg:'success',
     settleAmt:'1',
     settleCurrencyCode:'156',
     settleDate:'0419',
     signMethod:'01',
     traceNo:'816274',
     traceTime:'0419153547',
     txnAmt:'1',
     txnSubType:'01',
     txnTime:'20170419153547',
     txnType:'01',
     version:'5.0.0',
     signature:'p16MJKNPzXheCZ8/TkSwHOWIy2gB+f2ioVGRleeR9TvZXjJ+WCPxf5fdxRmrR5lUzRpHOWHLXhVe1jiLsik+K0N+UJwuWADsEobsUtm7b/wqH9G56MDc5uueIOTvh7GYaY4qTGbYdjN6UHPVf4d0BatBysX/JMDfW0iRvWHaDWJwAOJVqy7IdyhbmXe3/aXfLTb/ciqZsxEbJshdkJP0Q99E1FqqDHYp2WW3SJ4eawuLb97fyVNqymsQexzljVsdj1Fxz5g/jTW8krFmOmfvjgYLL6T28mCVGZjX1X7Cp2W+Ir37ie5rKnMV6DSnpCOZ82CsNfxaYjm7hNmO3X1oEA=='
    }
*/

//console.log("=========infor11===========");
   	console.log(infor);
    var inforStr = JSON.stringify(infor); 
   	

   //	var test  = "{accessType:0,bizType:000201,certId:69597475696,currencyCode:156,encoding:UTF-8,merId:898320573920750,orderId:0000000241,queryId:201703241515424211028}"
   	//var test1 =encodeURI(test);
   	let pm = await mgm.unionVerify(userId,'UTF-8',inforStr)
   	.then(function(result){
   		console.log("=======result===========");
   		console.log(result);

   		return result;
   	})
   	console.log("=======testAction pm=============");
   	console.log(pm);

    if(pm.errorCode==0){
      //updTestInfo(senderId, secToken, testOrderId, custId, doctor, feeStatus, needRet, phone, 
  //recvContactInfo, reportReceiver, sendDate, sendContactInfo, senderName, sendUnit, sendTechoffice, 
  //testType, testStatus, itemId);

     

        
      try{
        let pm2 = mgm.unionBill(userId, 'UTF-8', inforStr)
        .then(function(result){
          console.log(result);
        },function(error){
            console.log(error);
        })
      }catch(e){
          console.log("开票失败");
      }
      



    }
   	return this.redirect('/report/query');
   }

   async backtestAction(){

   	console.log("==========backtestAction========");

    return this.display();
   }
  /* async testAction(){
      console.log("==========testAction start========");



      var pm  = this.post();

      console.log(pm);

      
    return this.display();
   }*/


   
}

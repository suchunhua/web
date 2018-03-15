'use strict';

import Base from './base.js';
import UserMgr from '../connect/usermgr.js';
import BizMgr from '../connect/bizmgr.js';

var mgm = new BizMgr();
//---------------------------
var mgr = new UserMgr();
var errorCode = 0;

export default class extends Base {
  
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  //福满家的页面跳转
  fumanjiaAction(){
    //auto render template file production_fumanjia.html
    return this.display();
  }
  
  async fd180Action(){
	//var userId = this.cookie('userId');
    try{
      let gp=await mgm.getCurrentPrice( 1, 'AAAAAAAAAA')
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      
     
      
      return result.price;

    });
    console.log(gp);
    this.assign('price',gp);
    }
    
    catch(e){
        console.log("f180服务器连不上");
           this.assign('tips',"服务器正忙.....暂时不能购买");
           this.assign('price',12800);
           this.assign('price1',13800);
           this.assign('price2',16800);
           return this.display();

    }


    
    
    let gp1=await mgm.getCurrentPrice(2,'AAAAAAAAAA')
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      return result.price;

    });
    console.log(gp1);
    this.assign('price1',gp1);
    let gp2=await mgm.getCurrentPrice(8,'AAAAAAAAAA')
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      return result.price;

    });
    console.log(gp2);
    this.assign('price2',gp2);
    return this.display();

   
  }

  async fd600Action(){
      
      
      try{
        let gp=await mgm.getCurrentPrice(4,'AAAAAAAAAA')
        .then(function (result){
      console.log(result.itemId+result.price+"----------------");

      //
      console.log("-----------------")
      return result.price;
      console.log(gp);
      

    });
        this.assign('price',gp);
      }catch(e){
           console.log("f180服务器连不上");
           this.assign('tips',"服务器正忙.....暂时不能购买");
           this.assign('price',1122);
           this.assign('price1',1123);
           this.assign('price2',1124);
           return this.display();
      };
      try{
        let gp1=await mgm.getCurrentPrice(3,'AAAAAAAAAA')
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      return result.price;

    });
    console.log(gp1);
    this.assign('price1',gp1);
      }catch(e){
        console.log("f180服务器连不上");
           

      };
      try{
        let gp2=await mgm.getCurrentPrice(9,'AAAAAAAAAA')
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      return result.price;

    });
    console.log(gp2);
    this.assign('price2',gp2);

      }catch(e){
        console.log("f180服务器连不上");
           

      }
    

    return this.display();
  }

  async exomeAction(){
     try{
      let infor =this.get();
      
      let gp=await mgm.getCurrentPrice(5,'AAAAAAAAAA')
        .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      return result.price;

    })
    console.log(gp);
    this.assign('price',gp);






     }catch(e){
        console.log(e);
        console.log("服务器连不上");
        
        //test(this);
        this.assign('price','111');
        this.assign('tips',"服务器正忙.....暂时不能购买");
     } 
      /*function test(this){
        console.log("test() run");
        
      }*/

    return this.display();


	

  }

  async buyAction(){


    //这个是优惠码的代码
    let infor =this.get();
    var userId = this.cookie("userId");

    this.assign("orderId",infor.orderId);
    if(this.isGet()&&infor.code!='undefined'&&infor.code!=null){
     // let buyinfor = this.get();
        
        console.log("buyinforAction code test");
        console.log(infor.code);
        this.assign("infor",infor);
        //this.assign("infor.pname",infor.pname);

         this.assign("reptReceiver",infor.username);

        this.assign("recvAddress",infor.adress);

        this.assign("email",infor.email);

        this.assign("code",infor.code);

        this.assign("price",infor.totalprice);

         this.assign("testItem",infor.testItem);
        

        this.assign("notes",infor.notes);

        
       // this.assign("orderId",infor.orderId);

        console.log(infor);
        //console.log(buyinfor.testItem);
        var testItem = infor.testItem;
        var arrayItem = testItem.split(",");
        console.log(arrayItem);
        console.log(arrayItem[3]);

        let aa = await mgm.getPersonCurrentPrice(userId,arrayItem[0], infor.code)
        .then(function(result){
          //console.log(result);
          return result;
        })
        console.log('--------aa--------')
        console.log(aa.price);



        //把错误失效的优惠码获取价格较低的那个这个是和10个A做比较的测试

        try{
           let gp00=await mgm.getCurrentPrice( arrayItem[0], 'AAAAAAAAAA')
       
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      
     
      
      return result.price;

    });
    //console.log("============="+gp);
    var gp = gp00;

        }catch(e){
          console.log("获取10个大A的价格测试失败");
        }

       /* if(arrayItem[2]!=null){

        }else{
          
        }*/
        try{
           let gp11=await mgm.getCurrentPrice(arrayItem[2], 'AAAAAAAAAA')
       
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      
     
      
      return result.price;

    });
    console.log(gp11);
    var gp1 = gp11;

        }catch(e){
          console.log("获取10个大A的价格测试失败");
        }

        try{
           let gp22=await mgm.getCurrentPrice( arrayItem[4], 'AAAAAAAAAA')
       
    .then(function (result){
      console.log(result.itemId+result.price+"----------------");
      //
      console.log("-----------------")
      
     
      
      return result.price;

    });
    console.log(gp22);
    var gp2 = gp22;

        }catch(e){
          console.log("获取10个大A的价格测试失败");
        }
         



        try{
           
            let bb = await mgm.getPersonCurrentPrice(userId,arrayItem[2], infor.code)
        .then(function(result){
          //console.log(result);
          return result;
        })

        console.log(bb);
       
        var bb1 = bb.price;
        }catch(e){

        }
        
        try{
        
            let cc = await mgm.getPersonCurrentPrice(userId,arrayItem[4], infor.code)
        .then(function(result){
          //console.log(result);
          return result;
        })

        console.log(cc);
         var cc1 = cc.price;
        }catch(e){

        }
       
         
        var aa2 = aa.price;
        var aa3 =  gp>aa2?aa2:gp;
        var countPrice = aa3*arrayItem[1];
         
         //var countPrice = gp>countPrice1?countPrice1:gp;
         console.log(countPrice);
        if(arrayItem[2] != null){
          var bb2 = gp1>bb1?bb1:gp1;
          countPrice =countPrice+bb2*arrayItem[3];
           console.log(countPrice);
        }

        if(arrayItem[4] != null){
          var cc2 = gp2>cc1?cc1:gp2;
          countPrice =countPrice+ cc2*arrayItem[5];
           console.log(countPrice);
        }

        this.assign("countPrice",countPrice);
        console.log('====countPrice test==========');
       




        return this.display();
    
  }
   //这个是不用支付的代码
    try{
       // let infor =this.get();
    console.log("--------buyAction start --------------")
    //console.log(price+"|"+itemId+"|"+number);
    console.log(infor);
     //production infor 
    this.assign("infor",infor);
    //production name 
    this.assign("pname",infor.pname);
    //add production testItem

    let testItem = "";
    if(infor.ft_n>=1){
        testItem = infor.ft+","+infor.ft_n+","
    }
     
    

    if(infor.fc_n>=1){
        testItem+=infor.fc+","+infor.fc_n+","
    }

    if(infor.fa_n>=1){
        testItem+=infor.fa+","+infor.fa_n+","
    }
    testItem = testItem.substring(0,testItem.length-1);
    console.log("------testItem test---------");
    console.log(testItem);
    this.assign("testItem",testItem);


     //add production totalprice
   let price=infor.price*infor.ft_n;
   if(infor.price1!=null){
      price+=infor.price1*infor.fc_n
   }
   if(infor.price2!=null){
      price+=infor.price2*infor.fa_n
   }
    console.log(price);
    this.assign("price",price);
    if(infor.payprice!='undefined'){
      this.assign("price",infor.payprice);
        
    }
    if(infor.recvAddress!='undefined'){
      this.assign("recvAddress",infor.recvAddress);
        
    }
    if(infor.notes!='undefined'){
      this.assign("notes",infor.notes);
        
    }

    console.log(infor.notes);
    if(infor.reptReceiver!='undefined'){
      this.assign("reptReceiver",infor.reptReceiver);
        
    }
    console.log("----------------");
    //this.assign("price",infor.price);
    
    //return this.redirect('/production/buy');
   //console.log(this);


    return this.display();
    }catch(e){
      this.assign("msg","服务器正忙，请稍后再试");
      return this.display();
    }
    
      

    
    
  
  }



async buyinforAction(){


    let tradeinfor = this.post();
    var userId = this.cookie("userId");


    //这个是从未支付的里订单的updateOrder的操作
    console.log("===========buyinforAction start ==========================")

    console.log(tradeinfor);
    let orderId3 = tradeinfor.orderId;

    let orderId4 = parseInt(orderId3);
    console.log(orderId4);
    


    console.log(typeof orderId4);
    if(this.isPost()&&tradeinfor.orderId>0){


      console.log("========updTestOrder==============")

      let pm1 = await mgm.queryOrder(userId)
      .then(function(result){

        //console.log(result);
        return result;
      },function(error){
        console.log(error);
      })
      console.log(pm1.testList[0].customerId);

      let uo = await mgm.updTestOrder(userId, tradeinfor.orderId,pm1.testList[0].customerId, tradeinfor.testItem, tradeinfor.phoneNum, tradeinfor.email, 
        tradeinfor.username,tradeinfor.totalprice,tradeinfor.adress,tradeinfor.notes,tradeinfor.promCode)
      .then(function(result){

        console.log(result);

        return result;
      })

      console.log(uo);


      /*if(uo.errorCode==0){
         console.log("=====addOrUpdOrderAccess start=================");
         var userId1 = tradeinfor.orderId+','+userId;
         var orderId1 = tradeinfor.orderId;
         var orderInfor={orderId:orderId1,userId:userId1};
         console.log(orderInfor);
         BizMgr.setOrder(orderInfor);
         try{
          let pm3 = await mgm.addOrUpdOrderAccess(userId, tradeinfor.orderId)
          .then(function(result){

            
              return result;
          },function(error){
            return error;
          })

           console.log(pm3)
         }catch(e){


         }
        
       }
*/

       console.log("===== notpay  buildAliPayRequest start=================");
   // let pm2 = await mgm.buildAliPayRequest(userId, pm1.orderId, tradeinfor.pname,tradeinfor.totalprice, 1,'http://eaxqe3.natappfree.cc/backextra/alipaynotify','http://eaxqe3.natappfree.cc/backextra/alipayreturn')
   let pm2 = await mgm.buildAliPayRequest(userId, tradeinfor.orderId, tradeinfor.pname,tradeinfor.totalprice, 1,'http://121.40.55.125:8360/backextra/alipaynotify','http://121.40.55.125:8360/backextra/alipayreturn')

     .then(function(result){
       console.log(result);
       return result;
     });
    
  console.log("=======buyinforAction pm============");
  //console.log(pm);
  console.log(typeof pm2.formText);
  this.assign("formtext",pm2.formText);
  //this.assign("totalprice",tradeinfor.totalprice);


      return this.display();

    }


    
    

    console.log("--------alipay start --------------")
   // let tradeinfor = this.post();
    console.log(tradeinfor);
    console.log(tradeinfor.totalprice);
    console.log(tradeinfor.pname);
  console.log("=======addCustomer start============");
  var userId = this.cookie("userId");
  console.log("[buyinforAction] " + userId);
  let pm = await mgm.addCustomer(userId,tradeinfor.username, tradeinfor.phoneNum, tradeinfor.email)
  .then(function(result){

     console.log(result);

    return result;

  })
  console.log("======= addCustomer pm==========")
  console.log(pm);
 
    if(pm.errorCode==0){
     console.log("=====addTestOrder start=================");
     let pm1 = await mgm.addTestOrder(userId, pm.customerId, tradeinfor.testItem, tradeinfor.phoneNum, tradeinfor.email, tradeinfor.username,tradeinfor.totalprice,tradeinfor.adress,tradeinfor.notes,tradeinfor.code)

    .then(function(result){
          console.log(result);

          return result;
    })
    console.log("======= addTestOrder pm1==========")
    console.log(pm1);

    if(pm1.errorCode==0){
         console.log("=====addOrUpdOrderAccess start=================");
         var userId1 = pm1.orderId+','+userId;
         var orderId1 = pm1.orderId;
         var orderInfor={orderId:orderId1,userId:userId1};
         console.log(orderInfor);
         BizMgr.setOrder(orderInfor);
         try{
          let pm3 = await mgm.addOrUpdOrderAccess(userId, pm1.orderId)
          .then(function(result){

            
              return result;
          },function(error){
            return error;
          })
         }catch(e){


         }

    console.log("=====buildAliPayRequest start=================");
   // let pm2 = await mgm.buildAliPayRequest(userId, pm1.orderId, tradeinfor.pname,tradeinfor.totalprice, 1,'http://cfxi2z.natappfree.cc/backextra/alipaynotify','http://cfxi2z.natappfree.cc/backextra/alipayreturn')
  let pm2 = await mgm.buildAliPayRequest(userId, pm1.orderId, tradeinfor.pname,tradeinfor.totalprice, 1,'http://121.40.55.125:8360/backextra/alipaynotify','http://121.40.55.125:8360/backextra/alipayreturn')

     .then(function(result){
    	 console.log(result);
    	 return result;
     });
    
  console.log("=======buyinforAction pm============");
  //console.log(pm);
  console.log(typeof pm2.formText);
  this.assign("formtext",pm2.formText);
  this.assign("totalprice",tradeinfor.totalprice);


    }else{
      
      console.log(" alipay fail ");
    }
    }else{
      console.log(" alipay fail ");
    }
    


  
  return this.display();


}
  
  //unipay method 
  async unipaybuyinforAction(){


    let tradeinfor = this.post();
    var userId = this.cookie("userId");
     //这个是从未支付的里订单的updateOrder的操作
    console.log("===========buyinforAction start ==========================")

    console.log(tradeinfor);
    let orderId3 = tradeinfor.orderId;

    let orderId4 = parseInt(orderId3);
    console.log(orderId4);
    


    console.log(typeof orderId4);
    if(this.isPost()&&tradeinfor.orderId>0){


      console.log("========updTestOrder==============")

      let pm1 = await mgm.queryOrder(userId)
      .then(function(result){

        //console.log(result);
        return result;
      },function(error){
        console.log(error);
      })
      console.log(pm1.testList[0].customerId);

      let uo = await mgm.updTestOrder(userId, tradeinfor.orderId,pm1.testList[0].customerId, tradeinfor.testItem, tradeinfor.phoneNum, tradeinfor.email, 
        tradeinfor.username,tradeinfor.totalprice,tradeinfor.adress,tradeinfor.notes,tradeinfor.promCode)
      .then(function(result){

        console.log(result);

        return result;
      })

      console.log(uo);


      /*if(uo.errorCode==0){
         console.log("=====addOrUpdOrderAccess start=================");
         var userId1 = tradeinfor.orderId+','+userId;
         var orderId1 = tradeinfor.orderId;
         var orderInfor={orderId:orderId1,userId:userId1};
         console.log(orderInfor);
         BizMgr.setOrder(orderInfor);
         try{
          let pm3 = await mgm.addOrUpdOrderAccess(userId, tradeinfor.orderId)
          .then(function(result){

            
              return result;
          },function(error){
            return error;
          })

           console.log(pm3)
         }catch(e){


         }
        
       }
*/

       




       console.log("======= notpay unipaybuyinforAction start============");
     //let pm = await mgm.unionPay(userId,pm1.orderId,tradeinfor.totalprice*100,"http://eaxqe3.natappfree.cc/back/test","http://eaxqe3.natappfree.cc/back/backtest")
      let pm = await mgm.unionPay(userId,tradeinfor.orderId,tradeinfor.totalprice*100,"http://121.40.55.125:8360/back/test","http://121.40.55.125:8360/back/backtest")
  .then(function(result){


    console.log(result);

    return result;

  })
  console.log("=======unipaybuyinforAction pm============");
  //console.log(pm);
  console.log(typeof pm.formText);
  this.assign("formtext",pm.formText);
  //this.assign("totalprice",tradeinfor.totalprice);
  return this.display();

    }






    try{
        console.log("--------unipay start --------------")
    
  

  console.log(tradeinfor);
  console.log(tradeinfor.totalprice);
  console.log(tradeinfor.pname);
  var userId = this.cookie("userId");
  console.log("[buyinforAction] " + userId);


   console.log("=======addCustomer start============");
  var userId = this.cookie("userId");
  console.log("[buyinforAction] " + userId);
  let pm = await mgm.addCustomer(userId,tradeinfor.username, tradeinfor.phoneNum, tradeinfor.email)
  .then(function(result){

     console.log(result);

    return result;

  })
  console.log("======= addCustomer pm==========")
  console.log(pm);



  if(pm.errorCode==0){
     console.log("=====addTestOrder start=================");
     let pm1 = await mgm.addTestOrder(userId, pm.customerId, tradeinfor.testItem, tradeinfor.phoneNum, tradeinfor.email, tradeinfor.username,tradeinfor.totalprice,tradeinfor.adress,tradeinfor.notes,tradeinfor.code)

    .then(function(result){
          console.log(result);

          return result;
    })
    console.log("======= addTestOrder pm1==========")
    console.log(pm1);

    if(pm1.errorCode==0){



      console.log("=====addOrUpdOrderAccess start=================");
         try{
          let pm3 = await mgm.addOrUpdOrderAccess(userId, pm1.orderId)
          .then(function(result){

            
              return result;
          },function(error){
            return error;
          })
         }catch(e){


         }

      console.log("=======unipaybuyinforAction start============");
     //let pm = await mgm.unionPay(userId,pm1.orderId,tradeinfor.totalprice*100,"http://eaxqe3.natappfree.cc/back/test","http://eaxqe3.natappfree.cc/back/backtest")
      let pm = await mgm.unionPay(userId,pm1.orderId,tradeinfor.totalprice*100,"http://121.40.55.125:8360/back/test","http://121.40.55.125:8360/back/backtest")
  .then(function(result){


    console.log(result);

    return result;

  })
  console.log("=======unipaybuyinforAction pm============");
  //console.log(pm);
  console.log(typeof pm.formText);
  this.assign("formtext",pm.formText);
  this.assign("totalprice",tradeinfor.totalprice);
  return this.display();


    }else{
      
      console.log(" unionpay fail ");
    }
    }else{
      console.log(" unionpay fail ");
    }





  
    }catch(e){
      this.assign("msg","服务器正忙，请稍后再试");
      return this.display();

    }
      
    
  }



}
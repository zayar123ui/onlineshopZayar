
let orgprice= [ ];
let times =[ ];
let total =[ ];
let beforeDiscount=[ ];
let count =0;
let today =new Date();//take date
let weekEnd=false;//to check weekend
$(document).ready(function(){

    initial();//not weekend
    $(".mencard").click(function(){
        let alreadyexist = false;
        let img = $(this).find('img').attr("src");
        let pname  = $(this).find(".name").text();
        let code ="("+$(this).find('.code').text()+")";
        let price = $(this).find('.price').text();
        let item = $(".cart");
        //to check if item has already in the cart or not
        for (let index=0 ; index <item.length;index++){
            let exist = item[index].childNodes[1].childNodes[1].innerText ; //check by code
            //item has already in the cart
            if(code==exist){
                alreadyexist=true;
                alert("Item has already in Cart")
            }
        }
        //item is not in the cart
        if(!alreadyexist){
            /*for (let index=0 ; index <item.length;index++){
            
                orgprice[index]=(Number(price))
        }*/
        //take price
            orgprice.push(Number(price))
            $(".userCart").append(
                '<div class="cart">'+
                '<img src="'+img +' " >'+
                '<div class="nameCode">'+
                    '<p class="first">'+pname +'</p>'+
                    '<p class="sec">'+code+'</p>'+
                '</div>'+
                '<input type="number" value="0" class="time">'+
                '<ion-icon name="trash-outline" class="delete" id="'+count+'"></ion-icon>'+
            '</div>'
            )
            count++;
            //to remove
            $(document).on('click','.delete',function(){
                //price to 0
                orgprice[(this).id]=0;
                //times to 0
                times[(this).id]=0;
                //cart gone
                $(this).closest('.cart').remove();
                //multiply price and times then put in an arrray then combine them all
                calculate();


                })
                
        } 
        //to see thr amount
        $(".toclick").click(function(){
            //multiply price and times then put in an arrray then combine them all
            calculate();
            //to get discount 15%
            //total price multiply with 0.15 and substracted from the total price

            $(".toclick").text( beforeDiscount[0] - beforeDiscount[0] * 0.15)
            
            })
            //to calculate  when the number of input change 
        $(".time").change(function(){
            let item = $(".cart");
           //to get the values of every possible inputs in the cart
            for (let index=0 ; index <item.length;index++){
                let howmany = item[index].childNodes[2].value; 
                times[index]=(Number(howmany))
        }
        
        console.log(times)
        calculate();
        
    })
        })

    
         //multiply price and times then put in an arrray then combine them all
        let calculate =()=>{
            
            for(index=0; index<times.length;index++){
                total[index]=Number(orgprice.slice(index,index+1))* Number(times.slice(index,index+1))
            }
            beforeDiscount[0]= Number(total.slice(0,1))+ Number(total.slice(1,2))+ Number(total.slice(2,3))+ Number(total.slice(3,4))+ Number(total.slice(4,5))+ Number(total.slice(5,6))
            
        }
        //delivery cost
        $("#item").change(function(){
            //cheeky way 
            let deli= $("#item").val()
            //if it's not weekend , no need to multiply with 0.15 and subtracted from the total price 
            if(!weekEnd){
                //if total price is 0 , there is no bill to pay for delivary
                if(beforeDiscount[0]==0){
                    $("#grandPrice").text(0)
                }
                //if total price is not 0 ,  there is bill to pay for delivary
                else{
                    $("#grandPrice").text(beforeDiscount[0]  +Number(deli))
                }
                
            }
            //if it's  weekend , multiply with 0.15 and subtracted from the total price 
            else{
                //if total price is 0 , there is no bill to pay for delivary
                if(beforeDiscount[0]==0){
                    $("#grandPrice").text("No item in the Cart")
                }
                 //if total price is not 0 ,  there is bill to pay for delivary
                else{
                    $("#grandPrice").text(beforeDiscount[0]  - beforeDiscount[0] * 0.15 +Number(deli))
                }
            }
        
        })
        
        /*
        $(".discountPrice").click(function(){
            
            let item = $(".cart");
        for (let index=0 ; index <item.length;index++){
            let howmany = item[index].childNodes[2].value; 
            times.push(Number(howmany))
            calculate();
            console.log(total)
        }*/


        //reply to customer 
        $("#btn").click(function(){
           //get user's informations
            var name=$("#userName").val();
            var number=$("#userNumber").val();
            var address=$("#address").val();
            
            $(".reply").prepend(
                '<p>Thank You' +
                 '<span class="replyname " >'+'.'+'('+ name.toUpperCase()+')'+ '</p>'+
        '<p>We received your order! </p>'+
        '<p>We will deliver to your place at '+'('+address+')'+'</p>'+
        '<p>Before delivery we will inform to your phone number'+'('+number+')'+ '</p>'
            )
        })
    
        //if there no cart , empty the arrays
        var jlk = $(".userCart").find(".cart")
                
        console.log(jlk)
        })

        //to check weekend
        let initial =()=>{
            //if not weekend hide discount text  and discount price from the web
            $("#discountTitle").hide();
            $("#discountPrice").hide();
            $("#discountHr").hide();
            //if weekend
            checkWeekEnd();
            
            
        }

    let checkWeekEnd=()=>{  
        //if it's weekend 
            if(today.getDay()==0 || today.getDay()==6 ){
                //between  9 am to 5 pm
                if(Number(today.getHours()) >=9 && Number(today.getHours() <=17)){
                    ////if it's weekend show discount text  and discount price on the web
                    $("#discountTitle").show();
                    $("#discountPrice").show();
                    $("#discountHr").show();
                    weekEnd=true;
                }
            }
        }

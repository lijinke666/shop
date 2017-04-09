   //全局公用事件
   $(()=>{
       getCartNum();   
       searchProduct();
   }) 


    //获取购物车数量
   function getCartNum(){
        httpFetch.getJsonp({
            url:'http://www.shop.com/cart/cart-num',
            jsonp:"callback_cart",
            data:{
                user_id:"1"
            },
            callback:function(res){
                let {data:{count}} = res
                if(count && ~~count >0){
                $('.number_cart').show().html(`+${count}`)
                }else{
                    $('.number_cart').hide();
                }

            }
        })
   }

   //搜索商品
   function searchProduct(){
       let search = $('.header-search');
       search.on('click',function(){
           let $this = $(this),
                inp = $this.prev(),
                value = inp.val();
            if(value == ""){
                methodCover.capacity('请输入你要搜索的商品')
                inp.focus();
            }else{
                methodCover.go("./product.html")

            }


       })
   }

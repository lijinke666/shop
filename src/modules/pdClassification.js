$(()=>{
        httpFetch.getJsonp({
        url:'http://www.shop.com/ware/bigclass',
        jsonp:"callback",
        callback:function(res){
            const {data} = res;
            let product_tmp = _.template($('#product_category').html())({
                categories:data
            })
            $('.pd_content').html(product_tmp)
        }
    });
})
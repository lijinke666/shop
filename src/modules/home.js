$(() => {
    //产品分类 字体图标配置
    const iconsConfig = {
        "1": "icon-baoxiu",
        "2": "icon-liwu",
        "3":"icon-qiqiu",
        "4":"icon-liwu",
        "5":"icon-liwu",
        "6":"icon-liwu",
        "7":"icon-liwu"
    }

    httpFetch.getJsonp({
        url:'http://www.shop.com/ware/bigclass',
        jsonp:"callback",
        callback:function(res){
            const {status,data} = res;
                let categoryTmp = _.template($("#home_category").html())({
                    categorys:data,
                    icons:iconsConfig
                })
                $('.category-content').html(categoryTmp)
        
        }
    });

    //渲染banner图
    $.get('../../mock/banner.json',(res)=>{
        let bannerTmp = _.template($("#swiper").html())({
            banners:res
        })
        $('.carousel').html(bannerTmp)
        new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay:4000,
            pagination: '.swiper-pagination',
        });
    })


    //商品跳转
    $('.category-item').on('click',function(){
        var $this = $(this);
        var id = $this.data('id');
        console.log(id)
    })

})
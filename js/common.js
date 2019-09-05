$(function(){
    //네비게이션 ================================================================================
    $(window).resize(function(){
        var windowWidth=$(window).width();      
        if(windowWidth <= 767){        
          $('body').addClass('mobile');  
          $('nav').removeClass('scroll') ;      
        }else{
          $('body').removeClass('mobile');  
          $('nav').addClass('scroll') ;                 
        }     
      }).resize();

    $('nav li').click(function(){
        
        var vh=$('article').height();        
        var i=$(this).index();
        console.log(vh);
        
        //뷰포트의 높이만큼 스크롤의 위치를 애니메이션을 줘서 이동시키기
        $('html, body').stop(true).animate({
            scrollTop:vh*i
        });
        //버튼의 활성화 변경 
        $('nav li a').removeClass('active');
        $(this).find('a').addClass('active');
        //bar의 위치 변경 
        $('.bar').stop(true).animate({
            right:25*i+'%'
        });
        
    })

    $(window).scroll(function(){
        var scrollTop=$(this).scrollTop();  
        var vh=$('article').height();
        var nowIndex=0;     

        console.log('현재 스크롤의 위치',scrollTop);

        for(var i=0; i<4; i++){//4번 반복
            if(scrollTop >= vh*i && scrollTop < vh*(i+1)){//A 0~99
                nowIndex=i;
            } 
        }    
        
        if(scrollTop> 200){
            $('nav').addClass('scroll');
            if($('body').hasClass('mobile')){
                $('nav').removeClass('scroll')
            }
        }else{
            $('nav').removeClass('scroll');
        }
    
        $('article').find('.workInfo,.footer').removeClass('move');
        $('article').eq(nowIndex).find('.workInfo,.footer').addClass('move');  
                
        
        $('.bar').stop(true).animate({
            right:25*nowIndex+'%'
        },function(){
            //bar가 이동한 후 버튼의 활성화 변경 
            $('nav li a').removeClass('active');
            $('nav li a').eq(nowIndex).addClass('active');
        });
       
    }).scroll();
    
    $('section article').on('mousewheel',function(e, delta){
        var i=$(this).index();                         
        if(delta>0){
            if(i==0){ return false;}
            var prev=$(this).prev().offset().top;
            $('html, body').stop(true).animate({
                scrollTop:prev
            },function(){
                      
            })
        }else if(delta<0){
            if(i==3){return false;}
            var next=$(this).next().offset().top;
            $('html, body').stop(true).animate({
                scrollTop:next
            },function(){
                    
            })
        }
        
    })

    // $('.profile .tab').click(function(){
    //     $(this).fadeOut();
    //     $('.profile .contect').fadeIn();
    // })
    $('.profile .tab').on({
            click:function(){
                $(this).hide();
                $(this).next().fadeIn();
                if($('body').hasClass('mobile')){
                    $('.tag').hide();
                }
            },
            mouseenter:function(){
                $(this).find('h3').text('CLICK ME!');
            },
            mouseleave:function(){
                $(this).find('h3').text('CONTACT ME!');
            }
       
    })
    $('.profile .contect').click(function(){
        if($('body').hasClass('mobile')){
            $(this).hide();
            $('.tab').fadeIn();
            $('.tag').fadeIn();
        }else{
            $(this).hide();
            $('.tab').fadeIn();
        }
    })
    //===========================================================================================
})
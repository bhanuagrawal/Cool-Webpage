$(document).ready(function() {

    var section_top_position_array = new Array();
    absolute_position('.section_relative');
    $('.section_relative').last().css({"z-index": 1000});
    $('.section_relative').css({"width": '100%'});
    $(window).on('scroll', sections);


    function sections() {
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + $(window).outerHeight();
        $('.section_relative').each(function(i) {
            //console.log(i);
            var prev_fixed = false;
            if($(this).prev().css('position') == 'fixed'){
                prev_fixed = true;
            }

            var sectionTopPostion = $(this).position().top - windowTop;
            var sectionBottomPostion = sectionTopPostion + $(this).outerHeight();
            if(sectionTopPostion + getHeight($(this)) < 0 && sectionBottomPostion > 0 && $(this).next().attr('class').trim()!='undefined'){
                $(this).css({"position": "fixed", "top": - getHeight($(this)) });
                $(this).next().css({"z-index": i+1});
            }
            //console.log('windowTop ' + windowTop +' sectionTopPostion ' + sectionTopPostion + ' position ' + $(this).css('position'));
            if(prev_fixed==true && sectionTopPostion > $(this).prev().outerHeight() - getHeight($(this).prev() )){
                $(this).prev().css({"position": "absolute", "top": section_top_position_array[i-1] });
                //console.log($(this).prev().css('position'));
            }

        });
        //console.log('\n');
    }

    function getHeight(element){
        if($(window).outerHeight() < element.outerHeight()){
            return element.outerHeight() - $(window).outerHeight();
        }
        else{
            return 0;
        }

    }

    function absolute_position(class_name){

        var top = $(class_name).first().position().top;
        $(class_name).each(function() {

            section_top_position_array.push(top);
            $(this).css({"position": "absolute", "top": top});
            top += $(this).outerHeight();
        });
    }
});

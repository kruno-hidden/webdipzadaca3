/* === LogIn === */
var dropboxOn = 0;

function showDropbox(){
    if(dropboxOn){
        $(".dropbox").slideUp("slow");
        dropboxOn = 0;
    } else {
        $(".dropbox").slideDown("slow");
        dropboxOn = 1;
    }
}

/* === Slider === */

var timer = $.timer(function() {sliderChange(null);}); /*https://code.google.com/p/jquery-timer/*/
var speed = 6000;
var sliderNum = 0;
var sliderMaxNum = 4;

function initSlider() {
    sliderChange(null);
    timer.set({ time : speed, autostart : true });
}

function sliderPlayIcon(){
    if(timer.isActive) $('#sliderPlay').html("&#9734;");
    else $('#sliderPlay').html("&#9733;");
}

function sliderPlay(){
    timer.toggle(true);
    sliderPlayIcon();
}

function sliderChange(selectedOffer){
    if(selectedOffer===null){
        sliderNum = sliderNum+1;
        selectedOffer = sliderNum;        
        sliderNum = sliderNum%sliderMaxNum;        
    }else{
        sliderNum = selectedOffer;
        timer.pause();
        sliderPlayIcon()
    }
    var index = $('.sliderImgNum a').length-selectedOffer;
    $('.sliderImgNum a').removeClass('current');
    $($('.sliderImgNum a')[index]).addClass('current');
    $.ajax({
        url:'sliderOffers.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(xml) {
            var data = new Array();
            var offer = $(xml).find('offer[id='+selectedOffer+']');
            $(offer).each(function(){
                $(this).children().each(function(){
                    var _data = $(this).text();
                    _data = _data.replace(/"/g, '');
                    data.push(_data);
                });
            });
            slideOfferChange(data);
            sliderImgChange(data[11]);
        }
    });        
}

function sliderImgChange(img){
    var time = 400;
    if(jQuery.type(img) !== "string") img = img.src;
    $('.sliderImg img').css({opacity: 1.0}).animate({opacity: 0}, time);
    $('.sliderImg img').delay(time+10)
                       .queue(function(next){
                            $(this).attr("src", img);
                            $(this).css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, time);
                            next(); 
                        });                    
}

function slideOfferChange(data) {
    var time = 400;
    $('.sliderCaption h1').fadeOut(time, function() { $(this).text(data[0]).fadeIn(time); });
    $('.sliderCaption h2').fadeOut(time, function() { $(this).text(data[1]).fadeIn(time); });    
    $('.sliderOfferBuy h2').fadeOut(time, function() { $(this).text(data[2]).fadeIn(time); });
    $('.sliderOfferDiscount h2.u').fadeOut(time, function() { $(this).text(data[3]).fadeIn(time); });
    $('.sliderOfferDiscount h2.p').fadeOut(time, function() { $(this).text(data[4]).fadeIn(time); });
    $('.sliderOfferDiscount h2.v').fadeOut(time, function() { $(this).text(data[5]).fadeIn(time); });
    $('.sliderOfferBought h1').fadeOut(time, function() { $(this).text(data[6]).fadeIn(time); });
    $('.sliderOfferBought h2').fadeOut(time, function() { $(this).text(data[7]).fadeIn(time); });
    $('.sliderOfferBought meter').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, time);
    $('.sliderOfferBought meter').delay(time+10)
                                 .queue(function(next){ 
                                     $('.sliderOfferBought meter').attr("value", data[8]);
                                     $('.sliderOfferBought meter').attr("max", data[9]);
                                     $(this).css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, time);
                                     next(); 
                                 });    
    $('.sliderOfferTime h2').fadeOut(time, function() { $(this).text(data[10]).fadeIn(time); });
    $('.sliderOfferBuy a').attr("href", "javascript:aletr(1)");
    $('.sliderOfferFriend a').attr("href", "javascript:aletr(2)");    
    $('.sliderOfferBuy h1').fadeOut(time).fadeIn(time);
    $('.sliderOfferBuy a').fadeOut(time).fadeIn(time);    
    $('.sliderOfferTime h1').fadeOut(time).fadeIn(time);
}


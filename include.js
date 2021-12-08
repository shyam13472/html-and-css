var $j = jQuery.noConflict();$j("img.lazy").lazyload({effect : "fadeIn"});$j("div.lazy").lazyload({effect:"fadeIn"});

 $(window).scroll(function() {
        if ($(this).scrollTop() > 650) {
            if ($('#upbutton').is(':hidden')) {
                 $('#upbutton').css({opacity : 1}).fadeIn('slow');
            }
        } else { $('#upbutton').stop(true, false).fadeOut('fast'); }
    });
    $('#upbutton').click(function() {
        $('html, body').stop().animate({scrollTop : 0}, 1000);
    });
	
!function (d, id, did, st) {
  var js = d.createElement("script");
  js.src = "https://connect.ok.ru/connect.js";
  js.onload = js.onreadystatechange = function () {
  if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
    if (!this.executed) {
      this.executed = true;
      setTimeout(function () {
        OK.CONNECT.insertGroupWidget(id,did,st);
      }, 0);
    }
  }}
  d.documentElement.appendChild(js);
}(document,"ok_group_widget","53674010280188",'{"width":240,"height":160}');
new Clipboard('.bitly');

$(document).ready(function(){$(window).scroll(function(){ 
    if ($(this).scrollTop() > 650) { 
        $("#next").animate({'opacity':'1'},0);
        $("#previous").animate({'opacity':'1'},0);
        }
    else {
    $("#next").animate({'opacity':'0'},0);
        $("#previous").animate({'opacity':'0'},0);
    }
})});
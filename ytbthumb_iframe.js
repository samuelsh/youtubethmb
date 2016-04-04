// Creating thumb images from youtube videos on the page and playing them on-click
(function($) {
        $.fn.ytbthumb_plugin = $(window).load( function () {
        var ytbURL;             // youtube URL
        var ytbID;              // youtube ID
        var ytbImg;             // URL of thumb image of youtube video
        var tableTemplate = '<table border="0" class="ytbTbl"><tr><td class="ytbObject"></td><td class="ytbText" align="left" valign="top"></td></tr>'; // Table template to format post dynamically on display
        var thisTable;  // Current table

        $.getScript( "https://www.youtube.com/iframe_api")
                .done(function( script, textStatus ) {
                console.log(script);
                console.log(textStatus);
        });

        $("iframe").each(function(){

                //Getting youtube ID from the link
                ytbURL = $(this).attr('src');

                ytbID = ytbURL.match('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})');
                ytbImg = "http://img.youtube.com/vi/"+ytbID[1]+"/default.jpg";

                //building container to for youtube image
                $(this).before('<div class="youtoobin" id='+ ytbID[1] +' align="left"></div>');
                $(this).prev(".youtoobin").append('<div class="thumby_iframe" style="background-image:url(' + ytbImg +'); width:120px; height:90px;cursor:pointer"><img style="margin:31px 38px" src="/myscripts/mini-play.png"/></div>');

                // building dynamic table that wraps youtube object and its text
                thisTable = $(tableTemplate).insertBefore($(this).prev(".youtoobin"));
                thisTable.find(".ytbText").html($(this).parent().prev("p"));
                thisTable.find(".ytbObject").html($(this).prev(".youtoobin"));
        });

        // Listening to click event
        $(".thumby_iframe").on("click", function() {

                var thisYtb = jQuery(this).parent(); // current youtube div container
                window.ID = thisYtb.attr('id');
                thisYtb.css('display', 'block');
                new YT.Player(window.ID, {
                        height: '267',
                        width: '320',
 			videoId: window.ID,
                        playerVars: {
                        	autoplay: 1
                        }
                })
        });
   });
}( jQuery )); //end function

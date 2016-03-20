
window.onYouTubeIframeAPIReady = function() {
	console.log('Player init with video: ' + window.ID);
	
	window.player = new YT.Player('youtoobin', {
		height: '267',
		width: '320',
		videoId: window.ID,
		events: {
		  'onReady': onPlayerReady,
		//  'onStateChange': onPlayerStateChange
		},
		playerVars: {
			autoplay: 1
		}
	});
};


window.onPlayerReady = function(event) {

	var replay = document.getElementById('youtoobin');
	replay.addEventListener('click', function() {
		window.player.playVideo();
	});
};


// BB Dev: creating thumb images from youtube videos and loadin them on click
(function($) {
	$(window).load( function () {
	var ytbURL; 		// youtube URL
	var ytbID;		// youtube ID
	var ytbImg;		// URL of thumb image of youtube video
	var tableTemplate = '<table border="0" class="ytbTbl"><tr><td class="ytbObject"></td><td class="ytbText" align="left" valign="top"></td></tr>';	// Table template to format post dynamically on display
	var thisTable; 	// Current table
		
	$("iframe").each(function(){
		
		//Getting youtube ID from the link
		ytbURL = $(this).attr('src');
		
		ytbID = ytbURL.match('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})');
		ytbImg = "http://img.youtube.com/vi/"+ytbID[1]+"/default.jpg";
		window.ID = ytbID[1];		
		
		//building container to for youtube image
		$(this).before('<div id="youtoobin" align="left"></div>');
		$(this).prev("#youtoobin").append('<div id="thumby" style="background-image:url(' + ytbImg +'); width:120px; height:90px;cursor:pointer"><img style="margin:31px 38px" src="/myscripts/mini-play.png"/></div>');	
		
		// building dynamic table that wraps youtube object and its text
		thisTable = $(tableTemplate).insertBefore($(this).prev("#youtoobin"));
		thisTable.find(".ytbText").html($(this).parent().prev("p"));
		thisTable.find(".ytbObject").html($(this).prev("#youtoobin"));
	});
	
	// Listening to click event
	jQuery("#thumby").on("click", function() {
		$.getScript( "https://www.youtube.com/iframe_api")
			.done(function( script, textStatus ) {
			console.log(script);
			console.log(textStatus);
		});
		
		$('#youtoobin').css('display', 'block');
	});
   });	
}( jQuery )); //end function

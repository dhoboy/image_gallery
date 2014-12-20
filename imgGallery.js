// This is the JavaScript for Image Gallery: code/img_gallery/imgGallery.js
var urlArray = [];
var imgPtr = 0;

$(document).ready(function(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var imgs = JSON.parse(xmlhttp.responseText);
	  // only want img urls that end in .jpg
	  $.each(imgs.data.children, function(key, value){
		$.each(value.data, function(key, value){
	      if ((key == "url") && (value.slice(-3) == "jpg")) {
            urlArray.push(this);
		  }
		});
      });
	  // add image to viewer	
      $("#img_viewer").append("<img src=" + urlArray[0] + ">");
	  // dynamic sizing
      $("#next").css("left",$(window).width()-128); 
      $("body,#container,#img_viewer,img").width($(window).width());
    }
  }
  xmlhttp.open("GET","http://www.reddit.com/r/earthporn.json?limit=100",true);
  xmlhttp.send();
  
  // dynamic resizing
  $(window).resize(function() {
	$("#next").css("left",$(window).width()-128); 
	$("body,#container,#img_viewer,img").width($(window).width());  
  });
    
  $("#next").hover(
    function(){
      $(this).css("background-image", "url(imgs/forward.png)");
      $("#img_viewer").css("opacity",".8");
    }, function(){
      $(this).css("background-image", "");
      $("#img_viewer").css("opacity","1");
    });
    
  $("#prev").hover(
    function(){
	  $(this).css("background-image", "url(imgs/backward.png)");
      $("#img_viewer").css("opacity",".8");	    
    }, function(){
      $(this).css("background-image", "");
      $("#img_viewer").css("opacity","1");
  });
    
  $("#next").click(function(){
    if (imgPtr < urlArray.length-1){
      imgPtr++;
      $("#img_viewer").html("<img src=" + urlArray[imgPtr] + ">");
      $("#next").css("left",$(window).width()-128); 
      $("body,#container,#img_viewer,img").width($(window).width());
    } else {
      alert("You have reached the end of the gallery");
    }
  });
    
  $("#prev").click(function(){
    if (imgPtr > 0){
      imgPtr--;
      $("#img_viewer").html("<img src=" + urlArray[imgPtr] + ">");
      $("#next").css("left",$(window).width()-128); 
      $("body,#container,#img_viewer,img").width($(window).width());
    } else {
      alert("You have reached the beginning of the gallery");      
    }
  });
});

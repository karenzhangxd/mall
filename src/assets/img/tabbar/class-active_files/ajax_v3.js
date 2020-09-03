$(function(){
	
		//Begin page loader
		$('#zip_cart_area').append('<div class="loader"><img src="/api/zipcart/images/ajax-loader.gif"/><br />Loadding PNG PACKAGE...</div>');
		
		//Send the initial request for first folder.
		$.ajax({url: '/api/zipcart.ajax.php',success:function($files){
														  
				$('#zip_cart_area').html($files);
				$size = $('ul#file_cart > li').size();

				
				if($size != 0){
				$('div#cart_container').fadeIn("medium");
				$('.items').text($size);
					if($size > 50){
						$('#info_alert').text('Package, limited to 50 icons!');
					}
				}
				
				
 
			}
		});
		
		//Folder list link click
 



		//Filecart add item function
		$('a.add_cart').live('click',function(){
			
			$file  = $(this).attr('href');
			$title = $(this).attr('id');
			$("div#cart_container").fadeIn("medium");
			
			
			//animate
			$offset = $(this).offset();
			$offsetfavbar = $("div#cart_container").offset();
			$(".flyingAdd").css('left',$offset.left+'px');
			$(".flyingAdd").css('top',$offset.top+'px');
			$(".flyingAdd").animate({left:($offsetfavbar.left+200)+"px",top:($offsetfavbar.top)+"px",opacity:"0.1", fontSize:"0px"},400,function(){
				 $(".flyingAdd").css({left:"-1000px",top:"-100px",opacity:"1", fontSize:"50px"})
			});
			
			
			
			
			$.ajax({url: '/api/zipcart.ajax.php',data:'cart=1&file='+$file+'&title='+$title,success:function($files){
					$('ul#file_cart').html("");
					$($files).appendTo('ul#file_cart').show();
					$size = $('ul#file_cart > li').size();
					$('.items').text($size);
					$('#d_c').text($size);
					if($size > 50){
						$('#info_alert').text('Package, limited to 50 icons!');
						alert("Package, limited to 50 icons!");
					} 
 
					
				}
			});
				
			//$('a.show_cart').text('Hide Cart');
		
			return false;
		}); 




 
 

		//Send ajax to php -> remove from $_SESSION
		//If item is the last in $_SESSION hide the cart.
		$('a.remove_cart').live('click',function(){
			$parent = $(this).parent();
			$file  = $(this).attr('href');
			$.ajax({url: '/api/zipcart.ajax.php',type: 'GET',data:'clear=1&file='+$file,success:function($size){
				$($parent).remove();
					$size = $size.replace(/[^\d]/,'');
					$('.items').text($size);
					$('#d_c').text($size);
					//alert('|'+$size+'|');
					if(parseInt($size) == 0){
						$('div#cart_container').fadeOut();
						//$('a.show_cart').text('My Cart');
					}else if(parseInt($size) > 50){
						$('#info_alert').text('Package, limited to 50 icons!');
					}
					else{
						$('#info_alert').text('');
					}
				}
			});	
			return false;
		});
		
		//File cart clear click
		//Send ajax to php -> will call class function to destroy $_SESSION
		$('a.clear').live('click',function(){
			if(!confirm('Are you sure?')){
				return false;
			}
			$.ajax({url: '/api/zipcart.ajax.php',data:'clear=1',success:function($size){
					$('.items').text($size);
					$('div#cart_container').fadeOut("medium",function(){
						$('ul#file_cart > li').each(function(i,val){
							$(this).remove();
						});
					});
				}
			});
					
			//$('a.show_cart').text('My Cart');
				$('.items').text("0");
				$('#d_c').text("0");
			
			return false;
		});
	
		
		//file cart download zip function
		//Go through ul li and get all que items
		//Check whether cart has items -> relocate page to download page w/ items.
		$('a.download').live('click',function(){
			
			$downloads = new Array();
			$('ul#file_cart > li a').each(function(i,val){
				$downloads[i] = $(this).attr('title');
			});
			
			if($downloads.length == 0){
			alert('Your file cart is empty!');
			}
			else if($downloads.length < 51){
				
				$('div#cart_container').fadeOut("medium",function(){
					$('ul#file_cart').html("");
				});
				
				$idarry = $downloads.join();

				window.location.href = '/api/get_zip_api.php?id='+$idarry;
				
				//$('a.show_cart').text('My Cart');
				$('.items').text("0");
				$('#d_c').text("0");

			}else{
				alert('Package, limited to 50 icons!');
			} 
			return false;
		});


 	
 
		$('a.clo_x_a').live('click',function(){
			$('div#cart_container').fadeOut();
			//$('a.show_cart').text("My Cart");
		});
		
		//Toggle file cart
		//When clicked to load the cart send ajax -> get users files
		//Else hide the file cart.
		$('a.show_cart').live('click',function(){
			if(!$('div#cart_container').is(':visible')){
				//$('a.show_cart').text("Hide Cart");	
				$('div#cart_container').fadeIn("medium",function(){
				$('<img class="cartloader" src="/api/zipcart/images/ajax-loader.gif"/>').insertBefore($('ul#file_cart'));
					$.ajax({url: '/api/zipcart.ajax.php',data:'showcart=1',success:function($files){
							$('img.cartloader').fadeOut();
							$('ul#file_cart').html("");
							if(!$files){
								$files = "<div class='nofiles'>No files in your cart, click '+' add files</div>";
							}
							$('ul#file_cart').html($files).fadeIn();
						}
					});
			});
			}else{
				$('div#cart_container').fadeOut();
				//$('a.show_cart').text("My Cart");	
			}
			return false;
		});
		
		$("body").append('<div class="nav_new"><a href="/dianshang/" target="_blank" >电商素材</a>|<a href="/guanggao/" target="_blank" >广告素材</a>|<a href="/uisheji/" target="_blank" >UI设计</a>|<a href="/chahua/" target="_blank" >插画配图</a>|<a href="/tupian/" target="_blank" >专题合集</a>|<a href="/zm.html" target="_blank" >字母</a></div>'
		                 +'<br/><div id = "topic-recommand" style="position:fixed;width: 100%;left:30px;bottom:8px;"></div>');
        $.ajax({
			url:'/api/Returnhtml/',
			async:false,
			type:'get',
			dataType:'text',
			data:{action:'topic'},
			success:function(data){
				if(data.length > 0){
					$("#topic-recommand").append(data);
				}
			}			
		});		
		
});
 
	
	$(function(){
	
		handle_navigation();
		
		handle_contact_form();
		
		handle_recentWork();
		
		$('#contact-map').googleMaps({
			
			//##
			//## Change latitude and longitude values for map position
			//##
			pan: { panLatitude:	37.4569, panLongitude:	-122.1569 }
			
		}); 
		
		$('#showcase-wrapper .project').colorbox();	
		$('.image-overlay a').colorbox();	
		
		
		
		
		$('body').append('<div id="styler"><a href="#" rel="theme-pink.css" class="style-pink"></a><a href="#" rel="theme-blue.css" class="style-blue"></a><a href="#" rel="theme-brown.css" class="style-brown"></a><a href="#" rel="theme-dark.css" class="style-dark"></a><a href="#" rel="default.css" class="style-default"></a></div>')
		$('#styler a').live('click', function(){
			//var styleSheet = $('#theme-color');
			var newStyleSheet = '_themes/'+$(this).attr('rel');
			
			$('#theme-color').attr('href',newStyleSheet);
			
		});
		
		
	});
	
	
	
	
	
	function handle_recentWork(){
		
		//##
		//## Attach the colorbox
		//##
		//$('.recent-work div a').colorbox(); 
		
		
		//##
		//## Attach the hover effect
		//##
		$('.recent-work li').hover(function(){
				$('div', this).fadeIn('fast');
			}, function(){
				$('div', this).fadeOut('fast');
			
		});
		
		$('.image-overlay').hover(function(){
				$('div', this).fadeIn('fast');
			}, function(){
				$('div', this).fadeOut('fast');
			
		});
		
	}
	
	function handle_navigation(){
	
	
		//
		// Add scrollbar to page content
		//	
		$('.scroll-pane').each(function(){
			setSlider($(this)); 
		});		
		
		
		//
		// Sidebar navigation
		//
		$('#nav li').click(function(){
			
			if ($(this).hasClass('active')){
				return false;
				}
			
			$('#nav li.active').removeClass('active');
			$(this).addClass('active');
			
			
			
			var index = $(this).index();
			var newTop = (index * 550) + (15 * index);
			
			$('#content-scrollable').animate({ 'margin-top': '-'+newTop+'px' }, 800, 'easeInOutCubic', function(){  });
			
			return false;	
		});
	
	
	
		//
		// Footer navigation
		//
		$('.nav li').click(function(){
			var index = $(this).index();
			
			$('#nav li:eq('+index+')').click();
			
			return false;
		});
	
		
		//
		// Side Arrows Navigation
		//
		$('.side-nav a').click(function(){			
			var active = $('#nav  li.active');
			
			if ( $(this).hasClass('up') ){
				if (  $(active).prev().size() ){
					$(active).prev().click();
				}else{
					$('#nav li').last().click(); 
				}
			}else{
				if (  $(active).next().size() ){
					$(active).next().click();
				}else{
					$('#nav li').first().click();
				}
			}
		
		});
	
	}
	
	
	
	function setDefaultField(selector, default_value){
		$(selector).click(function(){
			selector_def_val = default_value;
			
			if ($(this).val() == selector_def_val){
				$(this).val('');
			}
		});
		
		$(selector).blur(function(){
			if ($(this).val() == ''){
				$(this).val(default_value);
				
				$(this).addClass('no-value');
			}else{
				$(this).removeClass('no-value').removeClass('error');
			}
		});
		
	}
	
	
	
	function handle_contact_form(){

	
			//##
			//## Set default values on fields
			//##
			
			setDefaultField('#frm-name', $('#frm-name').val() );
			setDefaultField('#frm-mail', $('#frm-mail').val() );
			setDefaultField('#frm-message', $('#frm-message').val() );
		
		
		
			//##
			//## Send message via contact form
			//##
			$('.contact-submit').click(function(){
				
				
				//## Form validation (comment this code if you want to remove the validation)
				if ($('.no-value').size()){
					$('.no-value').each(function(){
						$(this).addClass('error');
					});
					
					$('.frm-state').html('Please complete all the required fields!').removeClass('red').fadeIn();
					
					return false;
				}else{
					$('.frm-state').html(''); 
				}
				//## End form validation
				
				
				var frmName = $('.frm-name').attr('value');					//Get name field value
				var frmMail = $('.frm-mail').attr('value');					//Get e-mail field value
				var frmMessage = $('.frm-message').attr('value');			//Get textarea message
				
				//##
				//## Send data using ajax
				//##
				$.post("mail.php", {action: "sendMail", name: frmName , mail: frmMail, message: frmMessage},
				function(data){ 
					if (data.success == '1'){
						//If the mail was sent show the "success" message
						$('.frm-state').html(data.message).removeClass('red').fadeIn();
 
						$('.frm-name').val('').blur();
						$('.frm-mail').val('').blur();
						$('.frm-message').val('').blur(); 
						
						
					}else{
						//If the mail has failed show the error message
						$('.frm-state').html(data.message).addClass('red').fadeIn();  
					}
				});
				
				return false;
			});
		
	}
	
	
	

		//function andrei() {
		/*
		
		
		
			// find the div.fade elements and hook the hover event
			$('.button').hover(function() {
				// on hovering over find the element we want to fade *up*
				var fade = $('> .hover', this);
		 
				// if the element is currently being animated (to fadeOut)...
				if (fade.is(':animated')) {
					// ...stop the current animation, and fade it to 1 from current position
					fade.stop().fadeTo(500, 1);
				} else {
					fade.fadeIn(500);
				}
			}, function () {
				var fade = $('> .hover', this);
				if (fade.is(':animated')) {
					fade.stop().fadeTo(500, 0);
				} else {
					fade.fadeOut(500);
				}
			});
		 
			// get rid of the text
			$('.button > .hover').empty();
		
		
		*/
		//}	
//standard slider NO HANDLE IMAGE

function setSlider($scrollpane){//$scrollpane is the div to be scrolled
	
	//set options for handle image - amend this to true or false as required
	var handleImage = false;
	
	//change the main div to overflow-hidden as we can use the slider now
	$scrollpane.css('overflow','hidden');
	
	//if it's not there, wrap a div around the contents of the scrollpane to allow the scrolling
	if ($scrollpane.find('.scroll-content').length==0) $scrollpane.children().wrapAll('<\div class="scroll-content"> /');
	
	//compare the height of the scroll content to the scroll pane to see if we need a scrollbar
	var difference = $scrollpane.find('.scroll-content').height()-$scrollpane.height();//eg it's 200px longer 
	$scrollpane.data('difference',difference); 
	
	if(difference<=0 && $scrollpane.find('.slider-wrap').length>0)//scrollbar exists but is no longer required
	{
		$scrollpane.find('.slider-wrap').remove();//remove the scrollbar
		$scrollpane.find('.scroll-content').css({top:0});//and reset the top position
	}
	
	if(difference>0)//if the scrollbar is needed, set it up...
	{
		var proportion = difference / $scrollpane.find('.scroll-content').height();//eg 200px/500px
		
		var handleHeight = Math.round((1-proportion)*$scrollpane.height());//set the proportional height - round it to make sure everything adds up correctly later on
		handleHeight -= handleHeight%2; 
		
		//if the slider has already been set up and this function is called again, we may need to set the position of the slider handle
		var contentposition = $scrollpane.find('.scroll-content').position();	
		var sliderInitial = 100*(1-Math.abs(contentposition.top)/difference);
		
		if($scrollpane.find('.slider-wrap').length==0)//if the slider-wrap doesn't exist, insert it and set the initial value
		{
			$scrollpane.append('<\div class="slider-wrap"><\div class="slider-vertical"><\/div><\/div>');//append the necessary divs so they're only there if needed
			sliderInitial = 100;
		}
		
		$scrollpane.find('.slider-wrap').height($scrollpane.height());//set the height of the slider bar to that of the scroll pane
		
		//set up the slider 
		$scrollpane.find('.slider-vertical').slider({
			orientation: 'vertical',
			min: 0,
			max: 100,
			range:'min',
			value: sliderInitial,
			slide: function(event, ui) {
				var topValue = -((100-ui.value)*difference/100);
				$scrollpane.find('.scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
				$('ui-slider-range').height(ui.value+'%');//set the height of the range element
			},
			change: function(event, ui) {
				var topValue = -((100-ui.value)*($scrollpane.find('.scroll-content').height()-$scrollpane.height())/100);//recalculate the difference on change
				$scrollpane.find('.scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
				$('ui-slider-range').height(ui.value+'%');
		  }	  
		});
		
		//set the handle height and bottom margin so the middle of the handle is in line with the slider
		$scrollpane.find(".ui-slider-handle").css({height:handleHeight,'margin-bottom':-0.5*handleHeight});
		var origSliderHeight = $scrollpane.height();//read the original slider height
		var sliderHeight = origSliderHeight - handleHeight ;//the height through which the handle can move needs to be the original height minus the handle height
		var sliderMargin =  (origSliderHeight - sliderHeight)*0.5;//so the slider needs to have both top and bottom margins equal to half the difference
		$scrollpane.find(".ui-slider").css({height:sliderHeight,'margin-top':sliderMargin});//set the slider height and margins
		$scrollpane.find(".ui-slider-range").css({bottom:-sliderMargin});//position the slider-range div at the top of the slider container
		
		//if required create elements to hold the images for the scrollbar handle
		if (handleImage){
			$(".ui-slider-handle").append('<img class="scrollbar-top" src="/images/misc/scrollbar-handle-top.png"/>');
			$(".ui-slider-handle").append('<img class="scrollbar-bottom" src="/images/misc/scrollbar-handle-bottom.png"/>');
			$(".ui-slider-handle").append('<img class="scrollbar-grip" src="/images/misc/scrollbar-handle-grip.png"/>');
		}
	}//end if
		 
	//code for clicks on the scrollbar outside the slider
	$(".ui-slider").click(function(event){//stop any clicks on the slider propagating through to the code below
		event.stopPropagation();
	});
	   
	$(".slider-wrap").click(function(event){//clicks on the wrap outside the slider range
		var offsetTop = $(this).offset().top;//read the offset of the scroll pane
		var clickValue = (event.pageY-offsetTop)*100/$(this).height();//find the click point, subtract the offset, and calculate percentage of the slider clicked
		$(this).find(".slider-vertical").slider("value", 100-clickValue);//set the new value of the slider
	}); 
	
		 
	//additional code for mousewheel
	if($.fn.mousewheel){		
	
		$scrollpane.unmousewheel();//remove any previously attached mousewheel events
		$scrollpane.mousewheel(function(event, delta){
			
			var speed = Math.round(5000/$scrollpane.data('difference'));
			if (speed <1) speed = 1;
			if (speed >100) speed = 100;
	
			var sliderVal = $(this).find(".slider-vertical").slider("value");//read current value of the slider
			
			sliderVal += (delta*speed);//increment the current value
	 
			$(this).find(".slider-vertical").slider("value", sliderVal);//and set the new value of the slider
			
			event.preventDefault();//stop any default behaviour
		});
		
	}
	
}



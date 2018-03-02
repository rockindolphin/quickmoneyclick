(function($){
	$(document).ready(function() {

		//ширина скроллбара
		var scrollMeasure = $('<div>').addClass('scroll__measure').get(0);
		$('body').append(scrollMeasure);
		var scrollbarWidth = scrollMeasure.offsetWidth - scrollMeasure.clientWidth;
		$(':root').css('--scrollbar-width', scrollbarWidth+'px');
		if( scrollbarWidth > 0 ){
			$('.scroll--cutt').css({
				marginRight: -scrollbarWidth
			});		
		}
		
		//bg
		$('img[data-bg=true]').each(function(){
			var src = $(this).attr('src');
			var parent = $(this).parent();
			if( $(parent).is('picture') ){
				src = $(parent).find('img').get(0).currentSrc;
				parent =  $(parent).parent();
			}
			$(parent).css({
				'background-image': `url(${src})`
			});
			$(this).hide();
		});

		

		//sliders		
		/*var navShift = 1;

		function removeFirstSlide(){
			navShift = 0;
			sliderPics.removeSlide(0);
			sliderText.removeSlide(0);
		}

		function toggleSlider(toggleTo){
			console.log('toggleSlider');
			sliderText.slideTo(toggleTo);
		}

		function toggleTabs(toggleTo){
			console.log('toggleTabs');
			var tab = $('.slider__nav input').get(toggleTo);
			$(tab).prop('checked', true);
		}

		function toggleAll(toggleTo, initFrom){
			switch(initFrom){
				case 'tabs':
					toggleTo+= navShift;
					toggleSlider(toggleTo);
				break;
				case 'slider':
					toggleTo-= navShift;
					toggleTabs(toggleTo);
				break;
				default:
					console.log('uknown initFrom');
				break;
			}
		}*/		
	    window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function(/* function */ callback, /* DOMElement */ element){
	                window.setTimeout(callback, 1000 / 60);
	              };
	    })();

		var sliderPics = new Swiper('.slider--main-pics>.swiper-container', {
			slidesPerView: 1,
			speed: 400,
			spaceBetween: 0,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},									
		});

		var sliderText = new Swiper('.slider--main-text>.swiper-container', {
			slidesPerView: 1,
			speed: 400,
			effect: 'fade',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
			fadeEffect: {
				crossFade: true
			},
			on: {
					init: function(){
						this.controller.control = sliderPics;
						sliderPics.controller.control = this;

						this.params.initialSlide = true;
						this.params.removeInitial = function(){
							if( this.params.initialSlide ){
								console.log('remove');
								this.removeSlide(0);
								sliderPics.removeSlide(0);
								this.params.initialSlide = false;
								this.update();
							}
						}.bind(this);
						this.params.tabs = [].slice.call( $('.slider__nav input') );
						this.params.tabs.map(function(tab,index){
							if( tab ){
								$(tab).change(function(){
									this.slideTo(index);
								}.bind(this));
							}
						}.bind(this));
					},
					slideChangeTransitionStart: function(){
						$(this.params.tabs[this.activeIndex]).prop('checked', true);
					}
			}								
		});		


	});	

})(jQuery);
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
				src = $(parent).find('img').get(0).currentSrc || $(parent).find('img').get(0).src;
				parent =  $(parent).parent();
			}
			$(parent).css({
				'background-image': `url(${src})`
			});
			$(this).hide();
		});

		

		//sliders		


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
			longSwipesRatio: 0.2,
			allowTouchMove: false,	
			breakpoints: {
				1179: {
					allowTouchMove: true,	
				},
			},			
			on: {
					init: function(){
						this.controller.control = sliderPics;
						sliderPics.controller.control = this;

						this.params.changeCounter = 0;

						this.params.tabs = [].slice.call( $('.slider__nav input') );
						this.params.tabs.map(function(tab,index){//переключение табами
							$(tab).change(function(){
								this.slideTo(index);
							}.bind(this));
						}.bind(this));

					},
					slideChangeTransitionStart: function(){
						$(this.params.tabs[this.activeIndex]).prop('checked', true);//активируем таб
					},
					slideChange: function(){
						if( this.params.changeCounter === 0 ){//скрываем первый слайд
							$(this.pagination.bullets[0]).hide();
							$(this.slides[0]).css('visibility','hidden');
							$(sliderPics.slides[0]).css('visibility','hidden');
						}
						this.params.changeCounter++;
						if( this.activeIndex === 0 ){//при переходе на первый скролим на второй
							this.slideTo(1);
						}		
						var navAction = this.activeIndex === 1 ? $().addClass : $().removeClass;
						navAction.call(this.navigation.$prevEl,'swiper-button-disabled');//вкл/выкл кнопку перехода на предыдущий
					}
			}								
		});		

		//buttons
		$('.header__menu-toggle').click(function(){
			$('.header__menu').toggleClass('header__menu--open');
		});

		function togglePopup(id){
			var popup = $('.popup[data-id='+id+']');
			$(popup).css({opacity:1}).toggleClass('popup--visible');
		}

		$('.popup__close').click(function(){
			var popupId = $(this).closest('.popup').attr('data-id');
			togglePopup(popupId);
		});	

		$('.btn[data-popup]').click(function(){
			var popupId = $(this).attr('data-popup');
			togglePopup(popupId);
		});				


	});	

})(jQuery);
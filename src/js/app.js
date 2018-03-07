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


		var sliderPics = new Swiper('.slider--main-pics>.swiper-container', {
			slidesPerView: 1,
			speed: 400,
			spaceBetween: 0,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			allowTouchMove: false,												
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
			allowTouchMove: false,
			on: {
					init: function(){
						this.controller.control = sliderPics;
						sliderPics.controller.control = this;

						this.params.tabs = [].slice.call( $('.slider__nav input') );
						this.params.tabs.map(function(tab,index){
							$(tab).change(function(){
								this.slideTo(index);
							}.bind(this));
						}.bind(this));

					},
					slideChangeTransitionStart: function(){
						$(this.params.tabs[this.activeIndex]).prop('checked', true);
						$(this.$el).css({
							overflow: this.activeIndex === 0 ? 'visible' : 'hidden'
						});
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
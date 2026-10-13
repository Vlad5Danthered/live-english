/*(function(){
  const utils = window.fizzyUIUtils;
  //console.log(utils);
  const container = document.querySelector('.reviews-slider');
  if (!container) { return; }
  const elem = container.querySelector('.reviews-slider__inner');
  const flkty = new Flickity( elem, {
    // options
    lazyLoad: true,
    adaptiveHeight: true,
    prevNextButtons: false,
    pageDots: false,
    dragThreshold: 30,
    //autoPlay: 1500,
    //wrapAround: true //бесконечная прокрутка
  });

  // elements
  const cellsButtonGroup = container.querySelector('.slider-nav__pagination');
  let cellsButtons = utils.makeArray( cellsButtonGroup.children );

  // update buttons on select
  flkty.on( 'select', function() {
    const previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    let selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    previousSelectedButton.classList.remove('is-selected');
    selectedButton.classList.add('is-selected');
  });

  // cell select
  //matchesSelector() заменил на matches()
  cellsButtonGroup.addEventListener( 'click', function( event ) {
    if ( !(event.target).matches( '.button' ) ) {
      return;
    }
    let index = cellsButtons.indexOf( event.target );
    flkty.select( index );
  });
  // previous
  const previousButton = container.querySelector('.slider-nav__btn--prev');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  });
  // next
  const nextButton = container.querySelector('.slider-nav__btn--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  });

}());*/

(function(){
  const container = document.querySelector('.reviews-slider');
  if (!container) { return; }

  const elem = container.querySelector('.reviews-slider__inner');

  const swiper = new Swiper(elem, {
    /*effect: 'fade',
    fadeEffect: {
      crossFade: true // Плавное исчезновение предыдущего слайда
    },*/
    //autoHeight: true, // Аналог adaptiveHeight: true
    threshold: 30,    // Аналог dragThreshold: 30
    spaceBetween: 24, // Межслайдовый отступ
    slidesPerView: '1',

    navigation: {
      nextEl: container.querySelector('.slider-nav__btn--next'),
      prevEl: container.querySelector('.slider-nav__btn--prev'),
    },

    pagination: {
      el: container.querySelector('.slider-nav__pagination'),
      clickable: true,
      bulletClass: 'button slider-nav__dot',
      bulletActiveClass: 'is-selected',
      renderBullet: function (index, className) {
        return `<button class="${className}"><span class="visually-hidden">Slide ${index + 1}</span></button>`;
      }
    }
  });
}());
/*(function(){
  const utils = window.fizzyUIUtils;
  //console.log(utils);
  const container = document.querySelector('.hero');
  if (!container) { return; }
  const elem = container.querySelector('.hero__carousel');
  const flkty = new Flickity( elem, {
    // options
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
  const container = document.querySelector('.hero');
  if (!container) { return; }
  
  const elem = container.querySelector('.hero__carousel');

  // Инициализация Swiper
  const swiper = new Swiper(elem, {
    threshold: 30, // Аналог dragThreshold: 30
    // Встроенная обработка стрелок (заменяет ручные addEventListener для prev/next)
    navigation: {
      nextEl: container.querySelector('.slider-nav__btn--next'),
      prevEl: container.querySelector('.slider-nav__btn--prev'),
    }
  });

  // Элементы кастомной пагинации
  const cellsButtonGroup = container.querySelector('.slider-nav__pagination');
  if (cellsButtonGroup) {
    const cellsButtons = Array.from(cellsButtonGroup.children); // Замена fizzyUIUtils

    // Обновление активного класса при перелистывании (аналог flkty.on('select'))
    swiper.on('slideChange', function() {
      const previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
      if (previousSelectedButton) {
        previousSelectedButton.classList.remove('is-selected');
      }
      
      const selectedButton = cellsButtonGroup.children[swiper.activeIndex];
      if (selectedButton) {
        selectedButton.classList.add('is-selected');
      }
    });

    // Клик по кнопкам пагинации
    cellsButtonGroup.addEventListener('click', function(event) {
      if (!event.target.matches('.button')) {
        return;
      }
      const index = cellsButtons.indexOf(event.target);
      swiper.slideTo(index); // Переход к слайду (аналог flkty.select())
    });
  }
}());

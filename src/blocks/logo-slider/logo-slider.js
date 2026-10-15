/*(function(){
  const elem = document.querySelector('.logo-slider');
  if (!elem) { return; }
  const flkty = new Flickity( elem, {
    // options
    lazyLoad: 10,
    prevNextButtons: false,
    pageDots: false,
    dragThreshold: 30,
    autoPlay: 1500,
    wrapAround: true //бесконечная прокрутка
  });
}());*/

(function(){
  const elem = document.querySelector('.logo-slider__inner');
  if (!elem) { return; }
  
  const swiper = new Swiper(elem, {
    loop: true, // wrapAround: true
    slidesPerView: 'auto',
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    threshold: 30, // dragThreshold
  });
}());
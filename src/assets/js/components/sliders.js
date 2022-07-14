const introSlider = new Swiper(".intro-slider", {
  slidesPerView: "auto",
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const promotionsSlider = new Swiper(".promotions-slider", {
  slidesPerView: "auto",
  spaceBetween: 30,
});

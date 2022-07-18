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

document.querySelectorAll(".license-item__slider").forEach((el) => {
  new Swiper(el, {
    slidesPerView: "auto",
    spaceBetween: 30,
  });
});

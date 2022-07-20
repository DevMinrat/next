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

// product

let productSliderThumbs = new Swiper(".prodp-gallery__thumbs", {
  slidesPerView: 5,
  spaceBetween: 30,
  slideToClickedSlide: true,
  touchRatio: 0.2,
  breakpoints: {
    320: {
      slidesPerView: "auto",
      spaceBetween: 8,
    },
    500: {
      spaceBetween: 24,
    },
  },
});

let productSliderMain = new Swiper(".prodp-gallery__main", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  slidesPerView: 1,

  thumbs: {
    swiper: productSliderThumbs,
  },
});

const similarProductSlider = new Swiper(".similar-products-slider", {
  slidesPerView: "auto",
  spaceBetween: 30,
});

const viewedProductSlider = new Swiper(".viewed-products-slider", {
  slidesPerView: "auto",
  spaceBetween: 30,
});

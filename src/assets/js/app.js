document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/swiper/swiper-bundle.js
  //= components/

  const headerBottom = document.querySelector(".header-bottom");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = document.documentElement.scrollTop;

    if (scrolled > 96) {
      headerBottom.classList.add("fixed");
    } else {
      headerBottom.classList.remove("fixed");
    }

    if (scrolled > 160 && scrolled > scrollPrev) {
      headerBottom.classList.add("out");
    } else {
      headerBottom.classList.remove("out");
    }

    scrollPrev = scrolled;
  });

  // const hmBtn = document.querySelector(".hamburger-menu");
  // const menu = document.querySelector(".menu");
  // const menuCloseBtn = document.querySelector(".menu__close-btn");

  // hmBtn.addEventListener("click", function () {
  //   this.classList.add("active");
  //   menu.classList.add("active");
  // });

  // menuCloseBtn.addEventListener("click", () => {
  //   menu.classList.remove("active");
  //   hmBtn.classList.remove("active");
  // });

  // const faqAccTitle = document.querySelectorAll(".faq__item-title"),
  //   faqAccText = document.querySelectorAll(".faq__item-descr");

  // if (faqAccTitle) {
  //   for (let i = 0; i < faqAccTitle.length; i++) {
  //     faqAccText[0].style.maxHeight = faqAccText[0].scrollHeight + "px";

  //     faqAccTitle[i].addEventListener("click", function () {
  //       this.classList.toggle("active");

  //       let panel = faqAccText[i];

  //       if (panel.style.maxHeight) {
  //         panel.style.maxHeight = null;
  //       } else {
  //         panel.style.maxHeight = panel.scrollHeight + "px";
  //       }
  //     });
  //   }
  // }

  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs-btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs-pane");
      this._eventShow = new Event("tab.itc.change");
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs-btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs-pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove("tabs-btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs-pane_show") : null;
      elLinkTarget.classList.add("tabs-btn_active");
      elPaneTarget.classList.add("tabs-pane_show");
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs-btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  if (document.querySelector(".projects-clients")) {
    new ItcTabs(".projects-clients");
  }
});

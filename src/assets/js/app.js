document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/swiper/swiper-bundle.js
  //= ../../../node_modules/choices.js/public/assets/scripts/choices.js
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
  if (document.querySelector(".catp-aside")) {
    new ItcTabs(".catp-aside");
  }

  const catpAsideHeading = document.querySelectorAll(
      ".catpAside-link__expand-heading"
    ),
    catpAsideSublinks = document.querySelectorAll(".catpAside-link__subLinks");

  if (catpAsideHeading.length > 0) {
    for (let i = 0; i < catpAsideHeading.length; i++) {
      catpAsideHeading[i].addEventListener("click", function () {
        this.classList.toggle("rolled");

        let panel = catpAsideSublinks[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // const catpFilterSelects = document.querySelectorAll(".catp-filters__select");

  // if (catpFilterSelects.length > 0) {
  //   catpFilterSelects.forEach((el) => {
  //     new Choices(el, {
  //       placeholder: true,
  //       placeholderValue: null,
  //       searchPlaceholderValue: null,
  //       searchEnabled: false,
  //       shouldSort: false,
  //       itemSelectText: "",
  //     });
  //   });
  // }

  const filterHeadings = document.querySelectorAll(".filter-item__heading");
  const filterCheckboxes = document.querySelectorAll(".filter-item__checbox");
  const filterItems = document.querySelectorAll(".filter-item");

  if (filterHeadings.length > 0) {
    filterHeadings.forEach((el, idx) => {
      el.addEventListener("click", () => {
        filterHeadings.forEach((el, index) => {
          if (idx != index) {
            el.classList.remove("active");
          }
        });

        el.classList.toggle("active");
      });
    });

    filterCheckboxes.forEach((el) => {
      el.addEventListener("change", () => {
        checkCheckboxes(el.parentElement.parentElement);
      });
    });

    filterItems.forEach((el) => {
      checkCheckboxes(el);
    });

    function checkCheckboxes(parent) {
      let isChecked = false;
      let checkboxes = parent.querySelectorAll(".filter-item__checbox");

      checkboxes.forEach((el) => {
        if (el.checked) {
          isChecked = true;
          parent.classList.add("checked");
        }
      });

      if (!isChecked) {
        parent.classList.remove("checked");
      }

      return isChecked;
    }

    window.addEventListener("click", (e) => {
      if (
        e.target.parentElement.className != "filter-item" &&
        e.target.parentElement.className != "filter-item checked" &&
        e.target.parentElement.className != "filter-item__heading active" &&
        e.target.parentElement.className != "filter-item__content"
      ) {
        filterHeadings.forEach((el) => {
          if (el.classList.contains("active")) {
            el.classList.remove("active");
          }
        });
      }
    });

    const filtersReset = document.querySelector(".catp-filters__reset");

    filtersReset.addEventListener("click", () => {
      document.querySelector(".catp-filters").reset();
      filterItems.forEach((el) => {
        checkCheckboxes(el);
      });
    });

    const catpRow = document.querySelector("#catp-row"),
      catpGrid = document.querySelector("#catp-grid");
    const catpContent = document.querySelector(".catp__content");

    catpRow.addEventListener("click", () => {
      catpRow.classList.add("active");
      catpGrid.classList.remove("active");

      catpContent.classList.add("row-layout");
      catpContent.classList.remove("grid-layout");
    });

    catpGrid.addEventListener("click", () => {
      catpRow.classList.remove("active");
      catpGrid.classList.add("active");

      catpContent.classList.remove("row-layout");
      catpContent.classList.add("grid-layout");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/swiper/swiper-bundle.js
  //= ../../../node_modules/choices.js/public/assets/scripts/choices.js
  //= components/

  const header = document.querySelector(".header");
  const headerBottom = document.querySelector(".header-bottom");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = document.documentElement.scrollTop;

    if (scrolled > 96 && innerWidth >= 920) {
      headerBottom.classList.add("fixed");
    } else {
      headerBottom.classList.remove("fixed");
    }

    if (scrolled > 160 && scrolled > scrollPrev) {
      if (window.innerWidth <= 920) {
        header.classList.add("out");
      } else {
        headerBottom.classList.add("out");
      }
    } else {
      header.classList.remove("out");
      headerBottom.classList.remove("out");
    }

    scrollPrev = scrolled;
  });

  const hmBtn = document.querySelector(".burger-menu");
  const headerNav = document.querySelector(".header-nav");

  hmBtn.addEventListener("click", function () {
    this.classList.toggle("menu-on");
    headerNav.classList.toggle("active");
    document.documentElement.classList.toggle("noscroll");
  });

  const dropdownHeadings = document.querySelectorAll(".dropdown-heading"),
    dropdownContent = document.querySelectorAll(".header-nav__item-sublinks");

  if (dropdownHeadings.length > 0) {
    for (let i = 0; i < dropdownHeadings.length; i++) {
      dropdownHeadings[i].addEventListener("click", function () {
        this.classList.toggle("rolled");

        let panel = dropdownContent[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // catalog header mob

  const menuCatalogMainLinks = document.querySelectorAll(
    ".menu-catalog__main-link"
  );
  const menuCatalogSublinks = document.querySelectorAll(
    ".menu-catalog__sublinks"
  );

  if (window.innerWidth <= 920) {
    for (let i = 0; i < menuCatalogMainLinks.length; i++) {
      menuCatalogMainLinks[i].addEventListener("click", function (e) {
        toggleDroplinksStyle(i);
        showDroplistContent(e, i);
      });
    }
  }

  function toggleDroplinksStyle(i) {
    menuCatalogMainLinks.forEach((el, inx, arr) => {
      if (el === arr[i]) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  function hideAllDropList() {
    menuCatalogSublinks.forEach((item) => {
      item.style.maxHeight = null;
    });
  }

  function showDroplistContent(event, i) {
    if (!menuCatalogSublinks[i].style.maxHeight) {
      event.preventDefault();
      hideAllDropList();
      menuCatalogSublinks[i].style.maxHeight =
        menuCatalogSublinks[i].scrollHeight + "px";
    } else {
      event.stopPropagation();
      hideAllDropList();
    }
  }

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
  if (document.querySelector(".prodp-info")) {
    new ItcTabs(".prodp-info");
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

// product counter

const productCounterWrapper = document.querySelectorAll(".product-counter");

if (productCounterWrapper.length > 0) {
  productCounterWrapper.forEach((el) => {
    let productCounter = el.querySelector(".product-counter__value"),
      productCounterMinus = el.querySelector(".pc-minus"),
      productCounterPlus = el.querySelector(".pc-plus");

    productCounter.addEventListener("input", () => {
      productCounter.value = productCounter.value
        .replace(/[^0-9]/g, "")
        .replace(/^0[^.]/, "0");
    });

    productCounterMinus.addEventListener("click", () => {
      if (productCounter.value > 1) {
        productCounter.value -= 1;
      }
    });

    productCounterPlus.addEventListener("click", () => {
      productCounter.value = +productCounter.value + 1;
    });
  });
}

// catalog

const catalogBtn = document.querySelector(".catalog-btn");
const catalogMenu = document.querySelector(".menu-catalog");
const catalogMenuClose = document.querySelector(".menu-catalog__close");

if (catalogBtn) {
  catalogBtn.addEventListener("click", () => {
    catalogMenu.classList.toggle("active");
    document.documentElement.classList.toggle("noscroll");
  });
  catalogMenuClose.addEventListener("click", () => {
    catalogMenu.classList.remove("active");
  });
}

const mainCategoryBtn = document.querySelector(".main-category__all");
const mainCategoryModal = document.querySelector(".mc-all");
const mainCategoryModalClose = document.querySelector(".mc-all__close");

if (mainCategoryBtn) {
  mainCategoryBtn.addEventListener("click", () => {
    mainCategoryModal.classList.add("active");
  });
  mainCategoryModalClose.addEventListener("click", () => {
    mainCategoryModal.classList.remove("active");
  });
}

// modal functional

const modalTriggers = document.querySelectorAll("[data-modal]");

if (modalTriggers.length > 0) {
  modalTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      let modalName = el.dataset.modal;
      let modal = document.querySelector(`[data-name='${modalName}']`);

      modal.classList.remove("hide");
    });
  });
}

const modals = document.querySelectorAll(".modal");

if (modals.length > 0) {
  modals.forEach((el) => {
    el.querySelector("[data-close]").addEventListener("click", () => {
      el.classList.add("hide");
    });
  });
}

// license magnific popup

$(document).ready(function () {
  let magnPopupOptions = {
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom mfp-img-mobile",
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300,
      opener: function (element) {
        return element.find("img");
      },
    },
  };

  $(".license__inner").magnificPopup(magnPopupOptions);
});

function hidePageLoader() {
  const pageLoader = document.querySelector(".page-loader");
  if (pageLoader) {
    pageLoader.classList.add("loaded");
    pageLoader.addEventListener(
      "transitionend",
      () => {
        if (pageLoader.classList.contains("loaded")) {
          pageLoader.remove();
        }
      },
      { once: true }
    );
  }
}

function getRem() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

window.addEventListener("load", () => {
  hidePageLoader();
});

document.addEventListener("DOMContentLoaded", () => {
  const headerMobile = document.querySelector(".header-mobile");

  const modal = new HystModal({
    linkAttributeName: "data-hystmodal",
    //settings (optional). see API
  });

  let phones = document.querySelectorAll(".c-phone-input");

  phones.forEach((phone) => {
    const maskOptions = {
      mask: "+{7} (000) 000-00-00",
    };
    const mask = IMask(phone, maskOptions);
  });

  const swipers = [];

  function initSwiper(selector, options) {
    const element = document.querySelector(selector);
    if (!element) return null;

    const swiper = new Swiper(selector, options);
    swipers.push(swiper);
    return swiper;
  }

  // ====== Инициализация ======

  initSwiper(".b-day-uslugi__slide", {
    slidesPerView: "auto",
    spaceBetween: 0.5 * getRem(),
    slidesOffsetBefore: 1 * getRem(),
    slidesOffsetAfter: 1 * getRem(),
    pagination: { el: ".swiper-pagination" },
    navigation: {
      nextEl: ".b-day-uslugi .c-title__arrow--next",
      prevEl: ".b-day-uslugi .c-title__arrow--prev",
    },
    breakpoints: {
      992: {
        slidesOffsetBefore: 7.5 * getRem(),
        slidesOffsetAfter: 7.5 * getRem(),
      },
    },
  });

  // ====== Resize ======

  window.addEventListener("resize", () => {
    swipers.forEach((swiper) => swiper.update());
  });

  if (headerMobile) {
    const button = headerMobile.querySelector(".header-mobile__burger button");
    let scrollPosition = 0;

    button.addEventListener("click", () => {
      const isActive = headerMobile.classList.toggle("header-mobile--active");

      if (isActive) {
        // сохраняем позицию
        scrollPosition = window.pageYOffset;

        // блокируем скролл
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = "100%";
      } else {
        // возвращаем скролл
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        window.scrollTo(0, scrollPosition);
      }
    });
  }

  let faqs = document.querySelectorAll(".index-faq__item");

  faqs.forEach((faq) => {
    let outer = faq.querySelector(".index-faq__item-outer");

    outer.addEventListener("click", () => {
      faq.classList.toggle("index-faq__item--active");
    });
  });
});

import "./scss/style.scss";
import "./hero.js";
import "./slider1.js";
import "./slider2.js";
import "./image.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Nav
 */
const main = document.querySelector("main");
const nav__burger = document.querySelector(".nav__burger");
const nav__inner = document.querySelector(".nav__inner");
const nav__link = document.querySelectorAll(".nav__link");

let show__nav__inner = false;

nav__burger.addEventListener("click", () => {
  if (!show__nav__inner) {
    nav__burger.classList.add("nav--close");
    nav__inner.classList.add("nav__inner--close");
    main.style.visibility = "hidden";
    show__nav__inner = true;
  } else {
    nav__burger.classList.remove("nav--close");
    nav__inner.classList.remove("nav__inner--close");
    main.style.visibility = "visible";
    show__nav__inner = false;
  }
});

nav__link.forEach((item) => {
  item.addEventListener("click", () => {
    nav__burger.classList.remove("nav--close");
    nav__inner.classList.remove("nav__inner--close");
    main.style.visibility = "visible";
    show__nav__inner = false;
  });
});

/**
 * Hero
 */
const cta__hero = document.querySelector(".cta__hero");
const section__hero = document.querySelector(".hero");

const sectionOneOptions = {
  rootMargin: "-600px 0px 0px 0px",
};

const sectionObserver = new IntersectionObserver(function (
  entries,
  sectionOneOptions
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      cta__hero.classList.add("cta--scrolled");
      cta__hero.classList.remove("all__cta");
      cta__hero.innerHTML = "";
    } else {
      cta__hero.classList.remove("cta--scrolled");
      cta__hero.classList.add("all__cta");
      cta__hero.innerHTML = "schreib mir";
    }
  });
},
sectionOneOptions);

sectionObserver.observe(section__hero);

/**
 * Work modals close & open
 */
const modal__wrapper = document.querySelector(".work__modal__wrapper");
const modal__background = document.querySelector(".modal__background");
const modal1 = document.querySelector(".work__modal1");
const modal1__close = document.querySelector(".work__modal__close1");
const modal1__cta = document.querySelector(".work__cta1");

const modal2 = document.querySelector(".work__modal2");
const modal2__close = document.querySelector(".work__modal__close2");
const modal2__cta = document.querySelector(".work__cta2");

modal1__cta.addEventListener("click", () => {
  modal1.classList.add("work__modal__active");
  modal__wrapper.style.visibility = "visible";
});

modal1__close.addEventListener("click", () => {
  modal1.classList.remove("work__modal__active");
  modal__wrapper.style.visibility = "hidden";
});

modal__background.addEventListener("click", () => {
  modal1.classList.remove("work__modal__active");
  modal2.classList.remove("work__modal__active");
  modal__wrapper.style.visibility = "hidden";
});

modal2__cta.addEventListener("click", () => {
  modal2.classList.add("work__modal__active");
  modal__wrapper.style.visibility = "visible";
});

modal2__close.addEventListener("click", () => {
  modal2.classList.remove("work__modal__active");
  modal__wrapper.style.visibility = "hidden";
});

/**
 * scroll-animations
 */

//scroll-animations about

const tl__skill = gsap.timeline({
  scrollTrigger: {
    trigger: ".skill__container",
    start: "top center",
  },
});

gsap.from(".about__h1", {
  scrollTrigger: {
    trigger: ".about__section",
    start: "top center",
  },
  duration: 1,
  scale: 2,
  opacity: 0,
  y: "100%",
  ease: "back",
});

gsap.from(".about__img__container", {
  scrollTrigger: {
    trigger: ".about__img__container",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  x: "-50%",
  ease: "power3.out",
});

gsap.from(".about__text", {
  scrollTrigger: {
    trigger: ".about__img__container",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  y: "-50%",
  ease: "power3.out",
});

gsap.from(".about__life", {
  scrollTrigger: {
    trigger: ".about__life",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  y: "-50%",
  stagger: 0.25,
  ease: "power3.out",
});

//scroll-animations work

const tl__work = gsap.timeline({
  scrollTrigger: {
    trigger: ".work__container",
    start: "top center",
  },
});

gsap.from(".work__h1", {
  scrollTrigger: {
    trigger: ".work__section",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  scale: 2,
  y: "100%",
  ease: "back",
});

tl__work.from(".work__item", {
  duration: 1,
  y: "100%",
  opacity: 0,
  ease: "power2.out",
  stagger: 0.5,
});

gsap.from(".icon__container", {
  scrollTrigger: {
    trigger: ".icon__container",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  y: "random(-200, 200)",
  stagger: 0.25,
  ease: "power3.out",
});
//icons animations

const tl__icons = gsap.timeline({ repeat: -1 });

gsap.set(".heart, .fingerprint, .mobile, .desktop, .react", {
  transformOrigin: "50% 50%",
});

tl__icons.to(".heart", {
  duration: 0.3,
  scale: 1.2,
});

tl__icons.to(".heart", {
  duration: 0.3,
  scale: 1,
});

tl__icons.to(".heart", {
  duration: 0.3,
  scale: 1.2,
});

tl__icons.to(".heart", {
  duration: 0.3,
  scale: 1,
});

tl__icons.to(".scan", {
  opacity: 0,
  duration: 1,
  y: -150,
});

tl__icons.to(
  ".scan__line",
  {
    duration: 1,
    y: -150,
  },
  "-=1"
);

tl__icons.to(".scan__line", {
  duration: 1.5,
  y: 0,
  opacity: 0,
  ease: "power1.out",
});

tl__icons.to(".mobile", {
  duration: 1,
  rotate: 90,
  opacity: 0,
});

tl__icons.to(
  ".desktop",
  {
    duration: 1,
    opacity: 1,
  },
  "-=1"
);

tl__icons.to(".react", {
  duration: 2,
  rotate: 720,
  ease: "back",
});

//scroll-animations contact

const tl__contact = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact__section",
    start: "top bottom",
  },
});

tl__contact.from(".contact__h1", {
  duration: 1,
  opacity: 0,
  scale: 2,
  y: "100%",
  ease: "back",
});

tl__contact.from(".contact__container", {
  duration: 1,
  opacity: 0,
  x: "50%",
  ease: "power3.out",
});

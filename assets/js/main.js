//nav
const main = document.querySelector("main");
const nav__burger = document.querySelector(".js__nav__burger");
const nav__inner = document.querySelector(".js__nav__inner");
const nav__link = document.querySelectorAll(".js__nav__link");

let show__nav__inner = false;

nav__burger.addEventListener("click", () => {
  if (!show__nav__inner) {
    nav__burger.classList.add("js__nav--close");
    nav__inner.classList.add("js__nav__inner--close");
    main.style.visibility = "hidden";
    show__nav__inner = true;
  } else {
    nav__burger.classList.remove("js__nav--close");
    nav__inner.classList.remove("js__nav__inner--close");
    main.style.visibility = "visible";
    show__nav__inner = false;
  }
});

nav__link.forEach((item) => {
  item.addEventListener("click", () => {
    nav__burger.classList.remove("js__nav--close");
    nav__inner.classList.remove("js__nav__inner--close");
    main.style.visibility = "visible";
    show__nav__inner = false;
  });
});

//hero
const cta__hero = document.querySelector(".js__cta__hero");
const section__hero = document.querySelector(".js__hero");

const sectionOneOptions = {
  rootMargin: "-600px 0px 0px 0px",
};

const sectionObserver = new IntersectionObserver(function (
  entries,
  sectionOneOptions
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      cta__hero.classList.add("js__cta--scrolled");
      cta__hero.classList.remove("all__cta");
      cta__hero.innerHTML = "";
    } else {
      cta__hero.classList.remove("js__cta--scrolled");
      cta__hero.classList.add("all__cta");
      cta__hero.innerHTML = "schreib mir";
    }
  });
},
sectionOneOptions);

sectionObserver.observe(section__hero);

//gsap

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

gsap.from(".about__container", {
  scrollTrigger: {
    trigger: ".about__container",
    start: "top center",
  },
  duration: 1,
  opacity: 0,
  x: "-50%",
  ease: "power3.out",
});

tl__skill.from(".skill__container", {
  duration: 1,
  opacity: 0,
  x: "50%",
  ease: "power3.out",
});

tl__skill.from(".item__line", {
  duration: 0.8,
  width: "0%",
  stagger: 0.25,
  ease: "power1.out",
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

const tl__icons = gsap.timeline({repeat: -1,});

gsap.set(".heart, .fingerprint, .mobile, .desktop, .react", {transformOrigin: "50% 50%"});

tl__icons.to(".heart",{
    duration: 0.3,
    scale: 1.2,
});

tl__icons.to(".heart",{
    duration: 0.3,
    scale: 1,
});

tl__icons.to(".heart",{
    duration: 0.3,
    scale: 1.2,
});

tl__icons.to(".heart",{
    duration: 0.3,
    scale: 1,
});

tl__icons.to(".scan",{
    duration: 1,
    y: -150,
});

tl__icons.to(".scan__line",{
    duration: 1,
    y: -150,
}, "-=1");

tl__icons.to(".scan__line",{
    duration: 1.5,
    y: 0,
    opacity: 0,
    ease: "power1.out"
});

tl__icons.to(".mobile",{
    duration: 1,
    rotate: 90,
    opacity: 0,
});

tl__icons.to(".desktop",{
    duration: 1,
    opacity: 1,
},"-=1");

tl__icons.to(".react",{
    duration: 2,
    rotate: 720,
    ease: "back"
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

//scroll-animations contact

const tl__contact = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact__section",
    start: "top center",
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

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Camera } from "three";

/**
 * Nav
 */
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

/**
 * Hero
 */
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

/**
 *  3D-Objects
 */

// debug

const gui = new dat.GUI();

//scene

const hero__canvas = document.querySelector(".hero__canvas");
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x22160f);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

//Font loader
const fontLoader = new THREE.FontLoader();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTextureSpark04 = textureLoader.load("/textures/spark_05.png");

/**
 * Particles
 */

const particlesGeometry = new THREE.BufferGeometry();
const count = 4;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 8;
}

for (let i = 1; i < count * 3; i = i + 3) {
  positions[i] = Math.random() + 0.8;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 100,
  sizeAttenuation: true,
  color: "#7df9ff",
});
particlesMaterial.map = particleTextureSpark04;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTextureSpark04;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Font + Geometry
 */
fontLoader.load("/fonts/Dystopia_Regular.json", (font) => {
  const textGeometry = new THREE.TextGeometry("ToM", {
    font: font,
    size: 1,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  textGeometry.center();

  const material = new THREE.MeshNormalMaterial();
  material.roughness = 0.4;

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  // const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
  // plane.rotation.x = -Math.PI * 0.5;
  // plane.position.y = -1;

  // scene.add(plane);

  const textAnimation = () => {
    const elapsedTime = clock.getElapsedTime();

    // text.rotation.y = 0.1 * elapsedTime;
    // text.rotation.x = 1 * elapsedTime;

    window.requestAnimationFrame(textAnimation);
  };

  textAnimation();
});

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

//controls
const controls = new OrbitControls(camera, hero__canvas);
controls.enableDamping = true;
controls.maxDistance = 7;
controls.minDistance = 1.5;

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: hero__canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//animation

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

import * as THREE from "three";
import { gsap } from "gsap";
import img from "../static/images/potrait.jpg";

//scene
const canvas = document.querySelector(".img__canvas");
const container = document.querySelector(".about__img__container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//loaders
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
  width: container.offsetWidth,
  height: 400,
};

if (sizes.width < 300) {
  sizes.width = 300;
}

window.addEventListener("resize", () => {
  sizes.width = container.offsetWidth;
  sizes.height = container.offsetHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Image Mesh
 */
const image = textureLoader.load(img);

const imageGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
const imageMaterial = new THREE.MeshBasicMaterial({ map: image });

const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
imageMesh.scale.set(sizes.width, sizes.height, 1);

scene.add(imageMesh);

/**
 * Mouse Events
 */
const mouse = new THREE.Vector2(0, 0);
window.addEventListener("mousemove", (e) => onMouseMove(e));

const onMouseMove = (e) => {
  gsap.to(mouse, {
    duration: 0.5,
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: (e.clientY / window.innerHeight) * 2 - 1,
  });

  gsap.to(imageMesh.rotation, {
    duration: 0.5,
    x: mouse.y * 0.2,
    y: mouse.x * (Math.PI / 12),
  });
};

window.addEventListener("touchmove", (e) => onTouchMove(e));

const onTouchMove = (e) => {
  gsap.to(mouse, {
    duration: 0.5,
    x: (e.changedTouches[0].clientX / window.innerWidth) * 2 - 1,
    y: (e.changedTouches[0].clientY / window.innerHeight) * 2 - 1,
  });

  gsap.to(imageMesh.rotation, {
    duration: 0.5,
    x: mouse.y * 0.2,
    y: mouse.x * (Math.PI / 12),
  });
};

/**
 * Camera
 */

const perspective = 800;

const fov =
  (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;

const camera = new THREE.PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  1,
  550
);

camera.position.z = 400;

scene.add(camera);

/**
 * renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

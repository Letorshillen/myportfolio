import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import { Camera } from "three";

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
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.2, 100);
// pointLight.position.set(2, 3, 7);
// scene.add(pointLight);

//Font loader
const fontLoader = new THREE.FontLoader();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Font
 */
fontLoader.load("/fonts/Dystopia_Regular.json", (font) => {
  const textGeometry = new THREE.TextGeometry("ToM", {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 6,
  });
  textGeometry.center();

  const textMaterial = new THREE.MeshNormalMaterial();

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);

  const textAnimation = () => {
    const elapsedTime = clock.getElapsedTime();

    // text.rotation.y = 0.1 * elapsedTime;
    // text.rotation.x = 1 * elapsedTime;

    window.requestAnimationFrame(textAnimation);
  };

  textAnimation();
});

/**
 * Shader
 */
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uFrequenzy: { value: 5.0 },
    uTime: { value: 0 },
  },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI * 0.5;
scene.add(mesh);

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
controls.maxDistance = 10;
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

  material.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

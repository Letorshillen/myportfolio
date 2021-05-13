import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import particelsVertexShader from "./shaders/particles/vertex.glsl";
import particelsFragmentShader from "./shaders/particles/fragment.glsl";
import displayVertexShader from "./shaders/display/vertex.glsl";
import displayFragmentShader from "./shaders/display/fragment.glsl";

/**
 *  3D-Objects
 */

// debug

const gui = new dat.GUI();

//scene

const hero__canvas = document.querySelector(".hero__canvas");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffb0c8);

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedFloorTexture = textureLoader.load("bakedFloor.jpg");
bakedFloorTexture.flipY = false;
bakedFloorTexture.encoding = THREE.sRGBEncoding;

const bakedDeskTexture = textureLoader.load("bakedDesk.jpg");
bakedDeskTexture.flipY = false;
bakedDeskTexture.encoding = THREE.sRGBEncoding;

/**
 * Objects
 */
gltfLoader.load("full.glb", (gltf) => {
  const onFloorMesh = gltf.scene.children.find(
    (child) => child.name === "onfloor"
  );

  const onDeskMesh = gltf.scene.children.find(
    (child) => child.name === "ondesk"
  );

  const display1Mesh = gltf.scene.children.find(
    (child) => child.name === "Screen1Display"
  );
  const display2Mesh = gltf.scene.children.find(
    (child) => child.name === "Screen2Display"
  );
  const lightbulbMesh = gltf.scene.children.find(
    (child) => child.name === "lightbulb"
  );
  const buttonMesh = gltf.scene.children.find(
    (child) => child.name === "Buttonlight"
  );

  display1Mesh.material = displayLightMaterial;
  display2Mesh.material = displayLightMaterial;
  lightbulbMesh.material = lightbulbMaterial;
  buttonMesh.material = buttonMaterial;
  onDeskMesh.material = bakedDeskMaterial;
  onFloorMesh.material = bakedFloorMaterial;

  scene.add(gltf.scene);
});

/**
 * Material
 */
const bakedFloorMaterial = new THREE.MeshBasicMaterial({
  map: bakedFloorTexture,
});
const bakedDeskMaterial = new THREE.MeshBasicMaterial({
  map: bakedDeskTexture,
});

const lightbulbMaterial = new THREE.MeshBasicMaterial({ color: 0xfffd74 });
const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const displayLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: displayVertexShader,
  fragmentShader: displayFragmentShader,
});

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 8;
const positionArray = new Float32Array(particlesCount * 3);
const scaleArray = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
  positionArray[i * 3 + 0] = (Math.random() - 0.45) * -1.5;
  positionArray[i * 3 + 1] = Math.random() + 0.5;
  positionArray[i * 3 + 2] = (Math.random() - 0.4) * -1.5;

  scaleArray[i] = Math.random() + 1;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);
particlesGeometry.setAttribute(
  "aScale",
  new THREE.BufferAttribute(scaleArray, 1)
);

//Material
const particlesMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 60 },
  },
  vertexShader: particelsVertexShader,
  fragmentShader: particelsFragmentShader,
  transparent: true,
  // blending: THREE.AdditiveBlending,
  depthWrite: false,
});

//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
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

  particlesMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2
  );
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -2.5;
camera.position.y = 2;
camera.position.z = -2;

scene.add(camera);

//controls
const controls = new OrbitControls(camera, hero__canvas);
controls.enableDamping = true;
controls.maxDistance = 10;

/**
 * renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: hero__canvas,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animation
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  particlesMaterial.uniforms.uTime.value = elapsedTime;
  displayLightMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

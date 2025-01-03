import * as THREE from "three";

var container;
var camera, scene, renderer, clock;
var uniforms;

run();

async function run() {
  await init();
  animate();
}

async function readVertShader() {
  const response = await fetch("./shader.vert");
  const text = await response.text();
  return text;
}

async function readFragShader() {
  const response = await fetch("./shader.frag");
  const text = await response.text();
  return text;
}

async function init() {
  container = document.getElementById("container");

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  var geometry = new THREE.PlaneGeometry(2, 2);

  const texture = new THREE.TextureLoader().load("male-technologist.png");
  // const texture = new THREE.Texture();
  uniforms = {
    u_Texture: { value: texture },
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: await readVertShader(),
    fragmentShader: await readFragShader(),
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  setTimeout(animate, 200);
  render();
}

function render() {
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
}

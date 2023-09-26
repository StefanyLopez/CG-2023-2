const scene = new THREE.Scene(); // Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cámara perspectiva

const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño de la ventana y resolución
document.body.appendChild(renderer.domElement); // Muestra la escena

const geometry = new THREE.Geometry();

// Definir los vértices del cono
const altura = 2; // Altura del cono
const radio = 1; // Radio de la base del cono
const segmentos = 8; // Número de segmentos para la base del cono

// Vértice del vértice del cono
geometry.vertices.push(new THREE.Vector3(0, altura / 2, 0));

// Vértices de la base del cono
for (let i = 0; i < segmentos; i++) {
  const theta = (i / segmentos) * Math.PI * 2;
  const x = radio * Math.cos(theta);
  const z = radio * Math.sin(theta);
  geometry.vertices.push(new THREE.Vector3(x, -altura / 2, z));
}

// Definir las caras del cono
for (let i = 1; i <= segmentos; i++) {
  // Cara de la base
  const a = i;
  const b = (i % segmentos) + 1;
  geometry.faces.push(new THREE.Face3(0, a, b));

  // Caras laterales
  geometry.faces.push(new THREE.Face3(a, b, (i % segmentos) + 1));
}

// Calcular normales para las caras
geometry.computeFaceNormals();

// Calcular normales para los vértices
geometry.computeVertexNormals();


const material = new THREE.MeshNormalMaterial({ color: 0x00ff00, wireframe: false, side: THREE.DoubleSide });

const customMesh = new THREE.Mesh(geometry, material);
scene.add(customMesh);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  customMesh.rotation.x += 0.01;
  customMesh.rotation.y += 0.01; // Rotar el cono
  renderer.render(scene, camera);
}

animate();

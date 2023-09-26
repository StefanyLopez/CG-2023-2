const scene = new THREE.Scene(); // Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cámara perspectiva

const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño de la ventana y resolución
document.body.appendChild(renderer.domElement); // Muestra la escena

const geometry = new THREE.Geometry();

// Definir los vértices del cono
const altura = 20; // Altura del cono
const radio = 10; // Radio de la base del cono
const segmentos = 80; // Número de segmentos para la base del cono

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

const loader = new THREE.TextureLoader();
const textura = loader.load("pinguino.png"); // Reemplaza con la ruta correcta de tu imagen

const material = new THREE.MeshBasicMaterial({ map: textura, wireframe: false, side: THREE.DoubleSide });

const customMesh = new THREE.Mesh(geometry, material);
scene.add(customMesh);

camera.position.z = 20;

document.addEventListener('keydown', (event)=> {
  if(event.key === 'a' || event.key === 'A'){
    customMesh.rotation.x -= 0.1;
  }else if(event.key === 'd' || event.key === 'D'){
    customMesh.rotation.x +=0.1;
  } else if (event.key === 'w' || event.key === 'W'){
    customMesh.rotation.z +=0.1;
  }

})

function animate() {
  requestAnimationFrame(animate);
  customMesh.rotation.x += 0.01;
  customMesh.rotation.y += 0.01; // Rotar el cono
  renderer.render(scene, camera);
}

animate();

const scene = new THREE.Scene(); // Espacio en donde se presentan los elementos gráficos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cámara perspectiva
const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño de la ventana y resolución
document.body.appendChild(renderer.domElement); // Muestra la escena

// Crear un cono
const geometry = new THREE.CylinderGeometry(0, 2, 4, 3); // Geometría del cono (radio, altura, segmentos)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometry, material);

// Crear dos rectángulos (cubos) saliendo de la base del cono
const cylinderGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 1, 30 );  // Geometría del rectángulo (cubo)
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });

const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder1.position.set(0.8, -2.5, 0); 
cylinder2.position.set(-0.8, -2.5, 0); 

cylinder3.position.set(-1, 0, 0); 
cylinder3.rotation.z = 90
cylinder4.position.set(1, 0, 0); 
cylinder4.rotation.z = 90

// Configurar jerarquía
const container = new THREE.Object3D(); // Crear un contenedor
container.add(cone, cylinder1, cylinder2, cylinder3, cylinder4); // Agregar el cono y los cubos al contenedor
scene.add(container); // Agregar el contenedor a la escena

// Configuración de la cámara y la posición inicial
camera.position.set(0, 0, 10);
container.rotation.y = Math.PI/3 
// Función para animar la escena
function animate() {
  requestAnimationFrame(animate);
  // Rotar todo el contenedor en lugar de solo el cono
  container.rotation.x += 0.01;
  container.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate(); // Llama a la función para mostrar la escena

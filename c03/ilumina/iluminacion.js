const scene = new THREE.Scene(); // Espacio en donde se presentan los elementos gráficos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cámara perspectiva
const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño de la ventana y resolución
document.body.appendChild(renderer.domElement); // Muestra la escena

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.minDistance = 10;
controls.maxDistance = 500;

// Crear un cono
const geometry = new THREE.CylinderGeometry(0, 2, 4, 3); // Geometría del cono (radio, altura, segmentos)
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometry, material);

// Crear dos rectángulos (cubos) saliendo de la base del cono
const cylinderGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 2, 30 );  // Geometría del rectángulo (cubo)
const cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x494949 });

const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder1.position.set(0.8, -3, 0); 
cylinder2.position.set(-0.8, -3, 0); 

cylinder3.position.set(-1, -0.5, 0); 
cylinder3.rotation.z = 30;
cylinder4.position.set(1, -0.5, 0); 
cylinder4.rotation.z = 130;

const TorusGeometry = new THREE.TorusGeometry( 3, 5, 3, 100 ); 
const TorusMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } ); 
const torus = new THREE.Mesh( TorusGeometry, TorusMaterial ); 
torus.scale.set(0.08,0.08,0.08)
torus.position.z = -0.5

const TorusGeometry2 = new THREE.TorusGeometry( 1, 2, 3, 100 ); 
const TorusMaterial2 = new THREE.MeshLambertMaterial( { color: 0x000000 } ); 
const torus2 = new THREE.Mesh( TorusGeometry2, TorusMaterial2 ); 
torus2.scale.set(0.08,0.08,0.08)
torus2.position.z = -0.8

const TorusGeometry3 = new THREE.TorusGeometry( 6, 3, 3, 100 ); 
const TorusMaterial3 = new THREE.MeshLambertMaterial( { color: 0x494949 } ); 
const torus3 = new THREE.Mesh( TorusGeometry3, TorusMaterial3 ); 
torus3.scale.set(0.1,0.1,0.1)
torus3.rotation.x = Math.PI/2
torus3.position.set(0,1.5,0)

const Sombrerogeometry = new THREE.CylinderGeometry(8, 4, 22, 32); // Geometría del cono (radio, altura, segmentos)
const Sombreromaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const sombrero = new THREE.Mesh(Sombrerogeometry, Sombreromaterial);
sombrero.scale.set(0.1,0.1,0.1)
sombrero.position.y = 2.5

// Configurar jerarquía
const container = new THREE.Object3D(); // Crear un contenedor
container.add(cone, cylinder1, cylinder2, cylinder3, cylinder4, torus, torus2, torus3, sombrero); // Agregar el cono y los cubos al contenedor
scene.add(container); // Agregar el contenedor a la escena

// Configuración de la cámara y la posición inicial
camera.position.set(0, 0, 10);
container.rotation.y = Math.PI

function makeLights() {
  // we're using globals for the lights, for the GUI

  light0 = new THREE.AmbientLight( 0x202020 ); // 10%
  scene.add(light0);

  light1 = new THREE.PointLight( 0xffffff, 1.0 ); // 50%
  light1.position.set( 12, 15, 10 );
  scene.add(light1);

  light2 = new THREE.DirectionalLight( 0xffffff, 0.3 );
  light2.position.set( 0, 100, 10 );
  scene.add(light2);
}

function animate() {
  requestAnimationFrame( animate );
  container.rotation.y+=0.03;
  controls.update();
  renderer.render( scene, camera );
}


animate(); // Llama a la función para mostrar la escena
makeLights();
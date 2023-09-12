const scene = new THREE.Scene(); //Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //Camara perspectiva
const camera1 = new THREE.OrthographicCamera( window.innerWidth / - 200, window.innerWidth / 200, window.innerHeight / 200, window.innerHeight / - 200, 1, 1000 );//Camara Ortogonal


const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize( window.innerWidth, window.innerHeight ); //Tamaño de la ventana y resolución
document.body.appendChild( renderer.domElement ); //Muestra la escena

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); //Objeto que crea un cubo con sus vertices
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube ); 

const geometry2 = new THREE.SphereGeometry( 1, 30, 15); //Objeto para crear una esfera
const material2 = new THREE.MeshNormalMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry2, material2 );
scene.add( sphere );

//Posiciones
cube.position.x = 5;
camera.position.x = 2;
camera.position.z = 5;
camera1.position.z = 10;
camera1.position.x = 3;

// Lleva un registro de la cámara actual
let currentCamera = camera;

// Agrega un controlador de eventos para detectar cuando se presiona una tecla
document.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
    // Si se presiona la tecla 'c' o 'C', cambia la cámara actual
    if (currentCamera === camera) {
      currentCamera = camera1;
    } else {
      currentCamera = camera;
    }
  }
});

// Registro de las posiciones de la esfera y el cubo
let spherePosition = new THREE.Vector3(0, 0, 0);
let cubePosition = new THREE.Vector3(5, 0, 0);

// Agrega un controlador de eventos para detectar cuando se presionan teclas
document.addEventListener('keydown', (event) => {
  const moveDistance = 0.1; // Distancia de movimiento por cada pulsación de tecla
  const key = event.key.toLowerCase(); //Convierte las mayusculas en minusculas 
  switch (key) { 
    case 'w' || 'W': //Teclas para el movimiento de la esfera
      spherePosition.z -= moveDistance;
      break;
    case 's' || 'S':
      spherePosition.z += moveDistance;
      break;
    case 'a' || 'A':
      spherePosition.x -= moveDistance;
      break;
    case 'd' || 'D':
      spherePosition.x += moveDistance;
      break;
    case 'i' || 'I': //Teclas para el movimiento del cubo
      cubePosition.z -= moveDistance;
      break;
    case 'k' || 'K':
      cubePosition.z += moveDistance;
      break;
    case 'j' || 'J':
      cubePosition.x -= moveDistance;
      break;
    case 'l' || 'L':
      cubePosition.x += moveDistance;
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  // Actualiza las posiciones de la esfera y el cubo
  sphere.position.copy(spherePosition);
  cube.position.copy(cubePosition);

  renderer.render(scene, currentCamera);
}


animate(); //Llama a la función para mostrarla
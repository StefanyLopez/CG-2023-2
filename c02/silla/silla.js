const scene = new THREE.Scene(); //Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //Camara perspectiva


const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize( window.innerWidth, window.innerHeight ); //Tamaño de la ventana y resolución
document.body.appendChild( renderer.domElement ); //Muestra la escena

// Crear ejes de referencia
var axesHelper = new THREE.AxesHelper(5); // El argumento es la longitud de los ejes
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry( 2, 2, 2 ); //Objeto que crea un cubo con sus vertices
const material = new THREE.MeshNormalMaterial( { color: 0xffff00 } ); 
const cube = new THREE.Mesh( geometry, material ); 
const pata1 = new THREE.Mesh( geometry, material ); 
const pata2 = new THREE.Mesh( geometry, material ); 
const pata3 = new THREE.Mesh( geometry, material ); 
const pata4 = new THREE.Mesh( geometry, material ); 

cube.add(pata1,pata2,pata3,pata4);
scene.add(cube);


const geometry2 = new THREE.CylinderGeometry( 0.4, 0.4, 0.2 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cylinder = new THREE.Mesh( geometry2, material2 );
scene.add( cylinder );

//Posiciones
cylinder.position.x = 0;
cylinder.rotation.x = 90;
camera.position.x = 5;
camera.position.z = 8;


//Patas
pata1.scale.set(0.1,1,0.1)
pata1.position.set(-0.9,-2,0.9)

pata2.scale.set(0.1,1,0.1)
pata2.position.set(0.9,-2,0.9)

pata3.scale.set(0.1,1,0.1)
pata3.position.set(-0.9,-2,-0.9)

pata4.scale.set(0.1,1,0.1)
pata4.position.set(-0.9,-2,-1)

//asiento
cube.scale.set(0.8,0.2,0.8)
cube.position.y=-1;





function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate(); //Llama a la función para mostrarla
const scene = new THREE.Scene(); //Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //Camara perspectiva


const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize( window.innerWidth, window.innerHeight ); //Tamaño de la ventana y resolución
document.body.appendChild( renderer.domElement ); //Muestra la escena


const geometry = new THREE.BoxGeometry( 2, 2, 2 ); //Objeto que crea un cubo con sus vertices
const material = new THREE.MeshNormalMaterial( { color: 0xffff00 } ); 
const cube = new THREE.Mesh(); 
const asiento = new THREE.Mesh( geometry, material ); 
const patas = new THREE.Mesh(); 
const pata1 = new THREE.Mesh( geometry, material ); 
const pata2 = new THREE.Mesh( geometry, material ); 
const pata3 = new THREE.Mesh( geometry, material ); 
const pata4 = new THREE.Mesh( geometry, material ); 
patas.add(pata1,pata2,pata3,pata4)

const geometry2 = new THREE.CylinderGeometry( 0.4, 0.4, 0.2, 32); 
const material2 = new THREE.MeshNormalMaterial( {color: 0x00ff00} ); 
const cylinder = new THREE.Mesh( geometry2, material2 );


//Posiciones
cylinder.position.set(0,1,-0.6);
cylinder.rotation.x = Math.PI / 2;
cylinder.scale.set(2,2,2);
camera.position.x = 5;
camera.position.z = 8;

//asiento
asiento.scale.set(0.8,0.2,0.8)
cube.position.y=-1;

//Patas
patas.scale.set(0.1,1,0.1)
pata1.position.set(-7,-1,7)
pata2.position.set(-7,-1,-7)
pata3.position.set(7,-1,-7)
pata4.position.set(7,-1,7)

//Jerarquia de objetos
cube.add(asiento,patas, cylinder);
cube.position.x=5;
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01; 
  cube.rotation.y += 0.01; 
  renderer.render(scene, camera);
}


animate(); //Llama a la función para mostrarla
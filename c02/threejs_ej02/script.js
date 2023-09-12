const scene = new THREE.Scene(); //Espacio en donde se presentan los elementos gráficos

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //Camara perspectiva o ortogonal (Se proyecta)
const camera1 = new THREE.OrthographicCamera( window.innerWidth / - 200, window.innerWidth / 200, window.innerHeight / 200, window.innerHeight / - 200, 1, 1000 );


const renderer = new THREE.WebGLRenderer(); // Renderizador
renderer.setSize( window.innerWidth, window.innerHeight ); //Tamaño de la ventana y resolución
document.body.appendChild( renderer.domElement ); //Muestra la escena

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); //Objeto que crea un cubo con sus vertices
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube ); 

const geometry2 = new THREE.SphereGeometry( 1, 30, 15); //Objeto para crear una esfera
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry2, material2 );
scene.add( sphere );

sphere.position.x = 0.1;
cube.position.x = 5;
camera.position.x = 2;
camera.position.z = 5; 

camera1.position.z = 10;
camera1.position.x = 3;


function animate() { //Funcion para el movimiento del cubo
	requestAnimationFrame( animate ); 

	cube.rotation.x += 0.01; 
	cube.rotation.y += 0.01; 
	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

	renderer.render( scene, camera1 ); //Renderiza llamando la escena y la camara
}

animate(); //Llama a la función para mostrarla
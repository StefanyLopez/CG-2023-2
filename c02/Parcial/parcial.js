// Crea una nueva escena.
const scene = new THREE.Scene();

// Crea una cámara con una perspectiva de 75 grados, ajustada al tamaño de la ventana y con un rango de visión de 0.1 a 1000.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; // Configura la posición de la cámara en el eje Z.

// Crea un renderizador WebGL y establece su tamaño según el tamaño de la ventana.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Agrega el elemento del renderizador al cuerpo del documento HTML.
document.body.appendChild(renderer.domElement);


const geometry = new THREE.Geometry();
// Definir los vértices del prisma
geometry.vertices.push(
 new THREE.Vector3(-1, -1, -1),
 new THREE.Vector3( 1, -1, -1),
 new THREE.Vector3( 1, -1, 1),
 new THREE.Vector3(-1, -1, 1),
 new THREE.Vector3(-1, 1, -1),
 new THREE.Vector3( 1, 1, -1),
 new THREE.Vector3( 1, 1, 1),
 new THREE.Vector3(-1, 1, 1)
);
// Definir las caras del prisma
geometry.faces.push(
 new THREE.Face3(0, 1, 5),
 new THREE.Face3(0, 5, 4),
 new THREE.Face3(1, 2, 6),
 new THREE.Face3(1, 6, 5),
 new THREE.Face3(2, 3, 7),
 new THREE.Face3(2, 7, 6),
 new THREE.Face3(3, 0, 4),
 new THREE.Face3(3, 4, 7),
 new THREE.Face3(4, 5, 6),
 new THREE.Face3(4, 6, 7),
 new THREE.Face3(0, 3, 2),
 new THREE.Face3(0, 2, 1)
);

geometry.computeFaceNormals();
geometry.computevertexNormals();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true, side: THREE.DoubleSide})
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;



// Función de animación que rota el tubo y renderiza la escena.
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Inicia la animación.
animate();

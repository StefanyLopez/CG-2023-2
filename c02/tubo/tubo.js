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

// Crea una curva Catmull-Rom con una serie de puntos.
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, 4, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-1, 1, 0),
    new THREE.Vector3(-2, 4, 0)
]);

// Obtiene una serie de puntos a lo largo de la curva.
const points = curve.getPoints(50);

// Crea una geometría de tubo usando la curva Catmull-Rom y otros parámetros.
const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, 0.5, 10, false);

// Crea un material con un color verde.
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

// Crea una malla (objeto 3D) usando la geometría y el material definidos.
const tube = new THREE.Mesh(geometry, material);

// Agrega el tubo a la escena.
scene.add(tube);

// Configura una luz direccional con sombras.
var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight)

var hemiLight2 = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.1);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight2)// Agrega la luz direccional a la escena.


// Función de animación que rota el tubo y renderiza la escena.
const animate = function () {
    requestAnimationFrame(animate);

    tube.rotation.x += 0.01;
    tube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Inicia la animación.
animate();

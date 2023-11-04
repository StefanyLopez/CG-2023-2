// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Controles de la cámara
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.minDistance = 10;
controls.maxDistance = 500;

// Geometría: torus y esfera
const geometryTorus = new THREE.TorusGeometry(10, 3, 16, 100);
const materialTorus = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(geometryTorus, materialTorus);
scene.add(torus);

const geometrySphere = new THREE.SphereGeometry(5 , 32, 32);
const materialSphere = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(sphere);

// Fuente de luz
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 25);
scene.add(light);

// Shaders para los distintos tipos de sombreado
const shaderLocal = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        void main() {
            vec3 light = vec3(1.0, 1.0, 1.0); // Dirección de la fuente de luz
            light = normalize(light);
            float dProd = dot(vNormal, light);
            gl_FragColor = vec4(dProd, dProd, dProd, 1.0);
        }
    `
});

const shaderPlano = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const shaderGouraud = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const shaderPhong = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

// Bandera para controlar el tipo de sombreado
let shaderType = 0;

document.addEventListener('keydown', event => {
    // Cambiar el tipo de sombreado al presionar la tecla 'Space'
    if (event.code === 'Space') {
        shaderType = (shaderType + 1) % 4;
        changeShader();
    }
});

// Función para cambiar el shader de las figuras
function changeShader() {
    switch (shaderType) {
        case 0:
            torus.material = shaderLocal; // Sombreado local
            sphere.material = shaderPlano; // Sombreado plano
            break;
        case 1:
            torus.material = shaderPlano; // Sombreado plano
            sphere.material = shaderGouraud; // Sombreado Gouraud
            break;
        case 2:
            torus.material = shaderGouraud; // Sombreado Gouraud
            sphere.material = shaderPhong; // Sombreado Phong
            break;
        case 3:
            torus.material = shaderPhong; // Sombreado Phong
            sphere.material = shaderLocal; // Sombreado local
            break;
        default:
            break;
    }
}

// Aplicar un tipo de sombreado al inicio (sombreado local)
changeShader();
// Asegurar que la cámara esté ubicada y mirando hacia la escena
camera.position.z = 30;

// Animación y renderizado
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.y += 0.03;
    controls.update();
    renderer.render(scene, camera);
}

animate();

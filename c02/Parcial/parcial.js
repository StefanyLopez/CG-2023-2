// Crea una nueva escena.
const scene = new THREE.Scene();

// Crea una cámara con una perspectiva de 75 grados, ajustada al tamaño de la ventana y con un rango de visión de 0.1 a 1000.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15; // Configura la posición de la cámara en el eje Z.

// Crea un renderizador WebGL y establece su tamaño según el tamaño de la ventana.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Agrega el elemento del renderizador al cuerpo del documento HTML.
document.body.appendChild(renderer.domElement);

function createCube(size, textura) {
    const geometry = new THREE.Geometry();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textura);
    // Definir los vértices del cubo
    geometry.vertices.push(
        new THREE.Vector3(-size, -size, -size),
        new THREE.Vector3(size, -size, -size),
        new THREE.Vector3(size, -size, size),
        new THREE.Vector3(-size, -size, size),
        new THREE.Vector3(-size, size, -size),
        new THREE.Vector3(size, size, -size),
        new THREE.Vector3(size, size, size),
        new THREE.Vector3(-size, size, size)
    );
    // Definir las caras del cubo
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
    geometry.computeVertexNormals();


    // Calcular coordenadas UV manualmente
    geometry.faceVertexUvs[0] = [];
    for (let i = 0; i < geometry.faces.length; i++) {
        const face = geometry.faces[i];
        const uvs = [];
        for (let j = 0; j < 3; j++) {
            const vertexIndex = face.a + (j % 3);
            const vertex = geometry.vertices[vertexIndex];
            uvs.push(new THREE.Vector2((vertex.x + 0.5), (vertex.y + 0.5)));
        }
        geometry.faceVertexUvs[0].push(uvs);
    }

    const material = new THREE.MeshBasicMaterial({ wireframe: false, side: THREE.DoubleSide, map: texture });
    var cube = new THREE.Mesh(geometry, material);

    return cube;
}


// Crea un grupo para contener los cubos.
const cubeGroup = new THREE.Group();

// Crea el primer cubo y agrégalo al grupo.
const cube1 = createCube(2, "textura.jpg"); // Tamaño 2 y color verde.
cubeGroup.add(cube1);

const cube2 = createCube(1, "textura2.jpg");
cube2.scale.set(1, 1, 1);
cube2.position.set(0, 3, 0)
cubeGroup.add(cube2);


const cube3 = createCube(1, "textura3.jpg"); // Tamaño 1 y color rojo.
cube3.scale.set(0.5, 0.5, 0.5); // Escala 
cube3.position.set(0, 4.5, 0); // Posición 
cubeGroup.add(cube3);

// Agrega el grupo a la escena.
scene.add(cubeGroup);

camera.position.x = 1;
camera.position.y = 1;



// Función de animación que rota el grupo de cubos y renderiza.
const animate = function () {
    requestAnimationFrame(animate);

    // Rotar el grupo de cubos.
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Inicia la animación.
animate();

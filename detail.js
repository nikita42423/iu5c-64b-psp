import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getUserModel } from './idb.js';

let scene, camera, renderer, controls, model;

const params = new URLSearchParams(window.location.search);
const modelName = params.get('name');
const modelPath = params.get('path');
const isUserModel = params.get('user') === '1';
const userModelId = params.get('id');

document.getElementById('modelTitle').textContent = modelName || 'Модель';

document.getElementById('closeBtn').addEventListener('click', () => {
    window.location.href = 'index2.html';
});

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    const canvas = document.getElementById('detailCanvas');
    const container = canvas.parentElement;

    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(3, 3, 5);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(10, 10, 0x333333, 0x222222);
    scene.add(gridHelper);

    loadModel();
    animate();
}

function centerModelOnFloor(model) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box.min.y;
}

async function loadModel() {
    const loader = new GLTFLoader();

    try {
        let gltf;
        if (isUserModel && userModelId) {
            const userModel = await getUserModel(parseInt(userModelId));
            if (userModel) {
                gltf = await loader.parseAsync(userModel.data, '');
            }
        } else if (modelPath) {
            gltf = await loader.loadAsync(modelPath);
        }

        if (gltf) {
            model = gltf.scene;
            centerModelOnFloor(model);
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            model.scale.setScalar(scale);
        }
    } catch (error) {
        console.error('Model load error:', error);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function setCameraPosition(x, y, z) {
    const target = controls.target.clone();
    camera.position.set(x, y, z);
    controls.target.copy(target);
    controls.update();
}

document.getElementById('zoomIn').addEventListener('click', () => {
    camera.position.multiplyScalar(0.8);
    controls.update();
});

document.getElementById('zoomOut').addEventListener('click', () => {
    camera.position.multiplyScalar(1.2);
    controls.update();
});

document.getElementById('viewFront').addEventListener('click', () => {
    setCameraPosition(0, 1, 5);
});

document.getElementById('viewBack').addEventListener('click', () => {
    setCameraPosition(0, 1, -5);
});

document.getElementById('viewLeft').addEventListener('click', () => {
    setCameraPosition(-5, 1, 0);
});

document.getElementById('viewRight').addEventListener('click', () => {
    setCameraPosition(5, 1, 0);
});

init();
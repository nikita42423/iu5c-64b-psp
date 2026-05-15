import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getUserModels, getUserModel, saveUserModel, deleteUserModel } from './idb.js';

const cardRenderers = new Map();

const PRESET_MODELS_LIST = [
    { name: 'Big Tree', path: 'moduls/Big Tree.glb' },
    { name: 'Palm Tree', path: 'moduls/Palm Tree.glb' },
    { name: 'Range Rover', path: 'moduls/Range Rover.glb' }
];

function centerModelOnFloor(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box.min.y;
}

async function renderPreview(canvas, modelEntry, isUserEntry = false, userIdEntry = null) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f3460);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    const modelObjects = [];

    try {
        let paths = [];
        if (isUserEntry && userIdEntry !== null) {
            const userModel = await getUserModel(userIdEntry);
            if (userModel) {
                const gltf = await loader.parseAsync(userModel.data, '');
                const userModelObj = gltf.scene;
                centerModelOnFloor(userModelObj);
                scene.add(userModelObj);
                modelObjects.push(userModelObj);
            }
        } else if (modelEntry.paths) {
            paths = modelEntry.paths;
        } else {
            paths = [modelEntry.path];
        }

        for (const path of paths) {
            const gltf = await loader.loadAsync(path);
            const modelObj = gltf.scene;
            centerModelOnFloor(modelObj);
            scene.add(modelObj);
            modelObjects.push(modelObj);
        }

        if (paths.length > 1) {
            if (modelObjects[1]) {
                modelObjects[1].position.x += 2;
            }
        }

        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        modelObjects.forEach(m => m.scale.setScalar(scale));

        let lastTime = 0;

        function animate(time) {
            const delta = (time - lastTime) / 1000;
            lastTime = time;

            modelObjects.forEach(m => {
                m.rotation.y += delta * 0.5;
            });

            renderer.render(scene, camera);
            canvas._animationId = requestAnimationFrame(animate);
        }

        const animationId = requestAnimationFrame(animate);
        cardRenderers.set(canvas, { renderer, animationId });

    } catch (error) {
        console.error('Model load error:', error);
        canvas.classList.add('puzzle-icon');
        canvas.innerHTML = '🧩';
    }
}

function stopAnimation(canvas) {
    const data = cardRenderers.get(canvas);
    if (data) {
        cancelAnimationFrame(data.animationId);
        data.renderer.dispose();
        cardRenderers.delete(canvas);
    }
}

function createCard(modelEntry, isUserEntry = false, userIdEntry = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.model = JSON.stringify(modelEntry);
    card.dataset.isUser = isUserEntry;
    if (userIdEntry !== null) card.dataset.userId = userIdEntry;

    const canvas = document.createElement('canvas');
    canvas.className = 'card-canvas';
    card.appendChild(canvas);

    const info = document.createElement('div');
    info.className = 'card-info';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = modelEntry.name;
    info.appendChild(title);

    if (isUserEntry) {
        const badge = document.createElement('span');
        badge.className = 'card-badge';
        badge.textContent = 'Пользовательская';
        info.appendChild(badge);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm('Удалить эту модель?')) {
                stopAnimation(canvas);
                await deleteUserModel(userIdEntry);
                card.remove();
            }
        });
        info.appendChild(deleteBtn);
    } else {
        const badge = document.createElement('span');
        badge.className = 'card-badge preset';
        badge.textContent = 'Предустановленная';
        info.appendChild(badge);
    }

    card.appendChild(info);

    card.addEventListener('click', () => {
        const modelData = JSON.parse(card.dataset.model);
        const isUser = card.dataset.isUser === 'true';
        const userIdAttr = card.dataset.userId;
        
        if (isUser && userIdAttr !== undefined) {
            window.location.href = `detail.html?name=${encodeURIComponent(modelData.name)}&user=1&id=${userIdAttr}`;
        } else {
            const path = modelData.path || (modelData.paths ? modelData.paths[0] : '');
            window.location.href = `detail.html?name=${encodeURIComponent(modelData.name)}&path=${encodeURIComponent(path)}`;
        }
    });

    requestAnimationFrame(() => {
        renderPreview(canvas, modelEntry, isUserEntry, userIdEntry);
    });

    return card;
}

async function initGallery() {
    const gallery = document.getElementById('gallery');

    PRESET_MODELS_LIST.forEach(modelEntry => {
        gallery.appendChild(createCard(modelEntry, false));
    });

    try {
        const userModels = await getUserModels();
        userModels.forEach(userModelEntry => {
            const modelEntry = { name: userModelEntry.name, data: userModelEntry.data, id: userModelEntry.id };
            gallery.appendChild(createCard(modelEntry, true, userModelEntry.id));
        });
    } catch (error) {
        console.error('Error loading user models:', error);
    }

    document.getElementById('fileInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.glb')) {
            try {
                await saveUserModel(file);
                const updatedModels = await getUserModels();
                const newEntry = updatedModels[updatedModels.length - 1];
                const modelEntry = { name: newEntry.name, data: newEntry.data, id: newEntry.id };
                gallery.appendChild(createCard(modelEntry, true, newEntry.id));
                e.target.value = '';
            } catch (error) {
                console.error('Error saving model:', error);
                alert('Ошибка при сохранении модели');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initGallery);

window.addEventListener('beforeunload', () => {
    cardRenderers.forEach((data, canvas) => {
        cancelAnimationFrame(data.animationId);
        data.renderer.dispose();
    });
    cardRenderers.clear();
});
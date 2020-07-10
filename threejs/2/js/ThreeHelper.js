class ThreeHelper {
    constructor() {
        this.mixers = [];
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xFFFFFF));
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        let world_vector = new THREE.Vector3(0, 0, 0);
        this.camera.lookAt(world_vector);
        this.camera.position.set(0, 30, 25);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.setAttribute('class', 'mainCanvas');
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
        this.mixers = [];
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        }, false);
        this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.control.update();
        this.render();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
        for (const mixer of this.mixers) {
            mixer.update(this.clock.getDelta());
        }
        window.requestAnimationFrame(() => {
            this.render();
        });
    }
    loadObject(setting) {
        const loader = new THREE.FBXLoader();
        loader.load(setting.model, (object) => {
            object.scale.setScalar(setting.scale);
            object.position.set(setting.position[0], setting.position[1], setting.position[1]);
            this.scene.add(object);
            if (object.animations.length > 0) {
                object.mixer = new THREE.AnimationMixer(object);
                this.mixers.push(object.mixer);
                object.mixer.clipAction(object.animations[0]).play();
            }
        });
    }
}
//# sourceMappingURL=ThreeHelper.js.map
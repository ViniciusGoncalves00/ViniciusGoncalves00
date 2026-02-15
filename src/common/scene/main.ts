import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Main {
    public readonly scene: THREE.Scene;
    public readonly camera: THREE.PerspectiveCamera;
    public readonly controls: OrbitControls;
    public readonly light: THREE.Light;

    public constructor() {
        const canvas = document.getElementById("canvas")!;
        const width = canvas.clientWidth, height = canvas.clientHeight;

        this.camera = new THREE.PerspectiveCamera( 45, width / height, 0.01, 100 );
        this.camera.position.set(2, 2, 2);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene();
        this.scene.add(this.camera);

        this.light = new THREE.SpotLight(new THREE.Color("white"), 10, 1000, 15);
        this.light.lookAt(0, -1, 0);
        this.light.castShadow = true;
        this.light.shadow!.mapSize.set(2048, 2048);
        this.light.shadow!.bias = -0.0005;
        this.light.shadow!.normalBias = 0.02;

        const ambientLight = new THREE.AmbientLight();

        this.scene.add(this.light);
        this.scene.add(ambientLight);

        const animate = (time: number) => {
            renderer.render( this.scene, this.camera );
        }

        const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, canvas: canvas } );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        renderer.setSize( width, height );
        renderer.setAnimationLoop( animate );

        this.controls = new OrbitControls( this.camera, canvas );
        this.controls.enablePan = false;
        this.controls.update();
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;


        // let darkThemeEnabled = localStorage.darkTheme === "true" || (!("darkTheme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        // const ambientDay = new THREE.Color(0.9, 0.9, 1.0);
        // const spotDay = new THREE.Color(0.9, 0.5, 0.2);

        // const ambientNight = new THREE.Color(0.1, 0.1, 0.8);
        // const spotNight = new THREE.Color(0.8, 0.8, 1.0);

        // light.color = darkThemeEnabled ? spotNight : spotDay;
        // light.intensity = darkThemeEnabled ? 0.1 : 1.0;
        // ambientLight.color = darkThemeEnabled ? ambientNight : ambientDay;
        // ambientLight.intensity = darkThemeEnabled ? 0.05 : 0.2;

        // window.addEventListener("toggleLight", (event) => {
        //     darkThemeEnabled = !darkThemeEnabled;
        //     light.color = darkThemeEnabled ? spotNight : spotDay;
        //     light.intensity = darkThemeEnabled ? 0.1 : 1.0;
        //     ambientLight.color = darkThemeEnabled ? ambientNight : ambientDay;
        //     ambientLight.intensity = darkThemeEnabled ? 0.05 : 0.2;
        // })

        window.addEventListener("resize", () => {
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
    }
}
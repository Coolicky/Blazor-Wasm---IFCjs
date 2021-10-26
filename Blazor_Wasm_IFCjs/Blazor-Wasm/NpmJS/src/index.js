import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { IFCLoader } from "web-ifc-three/IFCLoader";

//Adjust the viewport to the size of the browser


//const input = document.getElementById("file-input");
//input.addEventListener(
//    "change",
//    (changed) => {
//        const file = changed.target.files[0];
//        var ifcURL = URL.createObjectURL(file);
//        ifcLoader.load(ifcURL, (ifcModel) => scene.add(ifcModel.mesh));
//    },
//    false
//);

function LoadScene() {

    //Creates the Three.js scene
    const scene = new Scene();

    //Sets up the renderer, fetching the canvas of the HTML
    const threeCanvas = document.getElementById("three-canvas");

    //Object to store the size of the div
    const size = {
        width: threeCanvas.offsetWidth,
        height: threeCanvas.offsetHeight,
    };

    //Creates the camera (point of view of the user)
    const aspect = size.width / size.height;
    const camera = new PerspectiveCamera(75, aspect);
    camera.position.z = 15;
    camera.position.y = 13;
    camera.position.x = 8;

    //Creates the lights of the scene
    const lightColor = 0xffffff;

    const ambientLight = new AmbientLight(lightColor, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(lightColor, 1);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    const renderer = new WebGLRenderer();

    renderer.setSize(size.width, size.height);

    //Creates grids and axes in the scene
    const grid = new GridHelper(50, 30);
    scene.add(grid);

    const axes = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);

    //Creates the orbit controls (to navigate the scene)
    const controls = new OrbitControls(camera, threeCanvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);
    controls.update();

    console.log(renderer);
    threeCanvas.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
        console.log("renderer");
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
    });

    LoadIFC(scene);
}

function LoadIFC(scene) {

    // Sets up the IFC loading
    const ifcLoader = new IFCLoader();

    var ifcURL = "https://designspacestorage.blob.core.windows.net/public/RAC_basic_sample_project.ifc";

    ifcLoader.load(ifcURL, (ifcModel) => scene.add(ifcModel.mesh));

}

function TestScene() {
    const threeCanvas = document.getElementById("three-canvas");

    console.log(threeCanvas);
}

window.ThreeJSFunctions = {
    load: () => { LoadScene(); },
    test: () => { TestScene(); }
};

window.onload = LoadScene;

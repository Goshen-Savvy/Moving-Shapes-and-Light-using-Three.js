
import * as THREE from "https://threejs.org/build/three.module.js";
import {
  OrbitControls
} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


let keyMap={};
let lightAmbient;
let controls;
let pointX;
let width;
let height;
let renderer;
let path;
let pos = 0;
let dxn = 1;
let motion = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let time = Date.now( ) * 0.0005;
let mouse = {
    x: 0,
    y: 0
  };


const sceneElements = {
  sceneGraph: null,
  camera: null,
  renderer: null,
};

// Objects
let cylinderMaterial;
let sphereMaterial;
let ambientLight;
let spotLight;
let orthoCam;
let camera;
let coneMaterial;

// Trackers
let oneTracker = false;
let twoTracker = false;
let threeTracker = false;
let fourTracker = false;
let fiveTracker = false;

let tTracker = false;
let lTracker = false;
let rTracker = false;
let YTracker = false;
let ZTracker = false;

// keepers
let keepOneRotating = false;
let keepTwoRotating = false;
let keepThreeRotating = false;
let keepFourRotating = false;
let keepFiveRotating = false;
let keepMoving = false;

// Three functions are called
//  1. Initialize an empty scene
//  2. Add elements within the scene
//  3. Render the scene
initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);

requestAnimationFrame(computeFrame);


function computeFrame(time) {

  // Can extract an object from the scene Graph from its name11
  const cylinder = sceneElements.sceneGraph.getObjectByName("rotatingCylinder");

  const cube = sceneElements.sceneGraph.getObjectByName("MovingCube");

  const cone = sceneElements.sceneGraph.getObjectByName("rotatingCone");

  const tetrahedron = sceneElements.sceneGraph.getObjectByName("rotatingTetrahedron");

  const sphere = sceneElements.sceneGraph.getObjectByName("MovingSphere");

  const leftLight = sceneElements.sceneGraph.getObjectByName("leftLight");

  const rightLight = sceneElements.sceneGraph.getObjectByName("rightLight");

  const pointLightX = sceneElements.sceneGraph.getObjectByName("pointLightX");

    // WAXD
	if(keyMap[87] || keyMap[119]){ // W key
		sceneElements.sceneGraph.position.x -= Math.sin(sceneElements.sceneGraph.rotation.y) * motion.speed;
		sceneElements.sceneGraph.position.z -= -Math.cos(sceneElements.sceneGraph.rotation.y) * motion.speed;
    keyMap[87] = false;
    keyMap[119] = false;
	}

	if(keyMap[88] || keyMap[120]){ // X key
		sceneElements.sceneGraph.position.x += Math.sin(sceneElements.sceneGraph.rotation.y) * motion.speed;
		sceneElements.sceneGraph.position.z += -Math.cos(sceneElements.sceneGraph.rotation.y) * motion.speed;
    keyMap[88] = false;
    keyMap[120] = false;
	}

	if(keyMap[65] || keyMap[97]){ // A key
		// Redirect motion by 90 degrees
		sceneElements.sceneGraph.position.x += Math.sin(sceneElements.sceneGraph.rotation.y + Math.PI/2) * motion.speed;
		sceneElements.sceneGraph.position.z += -Math.cos(sceneElements.sceneGraph.rotation.y + Math.PI/2) * motion.speed;
    keyMap[65] = false;
    keyMap[97] = false;
	}

	if(keyMap[68] || keyMap[100]){ // D key
		sceneElements.sceneGraph.position.x += Math.sin(sceneElements.sceneGraph.rotation.y - Math.PI/2) * motion.speed;
		sceneElements.sceneGraph.position.z += -Math.cos(sceneElements.sceneGraph.rotation.y - Math.PI/2) * motion.speed;
    keyMap[68] = false;
    keyMap[100] = false;
	}


    //Orthographic Camera
    if (keyMap[79] || keyMap[111]) {//O
      controls = new OrbitControls(orthoCam, sceneElements.renderer.domElement);
      sceneElements.camera = orthoCam;
      controls.update();

      keyMap[79] = false;
      keyMap[111] = false;
    }
    
    //Perspective camera
    if (keyMap[80] || keyMap[112]) {//P
      controls = new OrbitControls(camera, sceneElements.renderer.domElement);
      sceneElements.camera = camera;
      controls.update();

      keyMap[80] = false;
      keyMap[112] = false;
    }

  //Translate Objects
  if(keyMap[49]){ // 1
        oneTracker = !oneTracker
        if (oneTracker) {
            keepOneRotating = true;
        } else {
            keepOneRotating = false;
        }
        keyMap[49] = false;
    } if (keepOneRotating) {
      // Apply a small rotation increment of 0.07 radians
      cylinder.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.07);
    }
    if(keyMap[50]){ //2
      twoTracker = !twoTracker
      if (twoTracker) {
          keepTwoRotating = true;
      } else {
          keepTwoRotating = false;
      }
      keyMap[50] = false;
  } if (keepTwoRotating) {
        cube.translateY(+0.1);
        cube.rotateZ(0.01);
        cube.translateY(-0.1);
    }

    if(keyMap[51]){ //3
      threeTracker = !threeTracker
      if (threeTracker) {
          keepThreeRotating = true;
      } else {
          keepThreeRotating = false;
      }
      keyMap[51] = false;
  } if (keepThreeRotating) {
        cone.rotation.x += 0.008;
    }

    if(keyMap[52]){ //4  
      fourTracker = !fourTracker
      if (fourTracker) {
          keepFourRotating = true;
      } else {
          keepFourRotating = false;
      }
      keyMap[52] = false;
  } if (keepFourRotating) {
        tetrahedron.rotation.x -= 0.1;
    }

    if(keyMap[53]){ //5    
      fiveTracker = !fiveTracker
      if (fiveTracker) {
          keepFiveRotating = true;
      } else {
          keepFiveRotating = false;
      }
      keyMap[53] = false;
  } if (keepFiveRotating) {
        sphere.position.y = 0.5 + Math.abs(Math.sin(time  * 0.001)) * 2;
        sphere.rotation.y += 0.1 * 1.2;
    }

    //Top Light
    if(keyMap[84] || keyMap[116]){ //T
        tTracker = !tTracker;
        console.log("lego");
        if (tTracker) {
            const topLight = new THREE.PointLight(0xA0522D, 0.5, 100 );
            topLight.position.set( 0, 10, 0 );
            topLight.castShadow = true;
            topLight.name="topLight";
            
            sceneElements.sceneGraph.add( topLight );
        } else {
            sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("topLight"));
        }
        keyMap[84] = false;
        keyMap[116] = false;
    }

    //Left Light
    if(keyMap[76] || keyMap[108]){ //L
        lTracker = !lTracker;    
        if (lTracker) {
            const leftLight = new THREE.PointLight(0xFFFFFF, 0.5, 100);
            leftLight.position.set(-10,5,0);
            leftLight.castShadow = true;
            leftLight.name="leftLight";
            sceneElements.sceneGraph.add( leftLight );
            
        } else {
            sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("leftLight"));
        }
        keyMap[76] = false;
        keyMap[108] = false;
    }

    //Right Light
    if(keyMap[82] || keyMap[114]){ //R
        rTracker = !rTracker;    
        if (rTracker) {
            const rightLight = new THREE.PointLight(0xFFFE33, 0.5, 100);
            rightLight.position.set(0,10,20);
            rightLight.castShadow = true;
            sceneElements.sceneGraph.add( rightLight );
            rightLight.name="rightLight";
        } else {
            sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("rightLight"));
        }
        keyMap[82] = false;
        keyMap[114] = false;
    }

    //flat shading 
    if(keyMap[70] || keyMap[102]){ //F
        sphereMaterial.flatShading = true;
        sphereMaterial.needsUpdate = true;

        cylinderMaterial.flatShading = true;
        cylinderMaterial.needsUpdate = true;

        coneMaterial.flatShading = true;
        coneMaterial.needsUpdate = true;

        keyMap[70] = false;
        keyMap[102] = false;
    }

    //smooth shading
    if(keyMap[83] || keyMap[115]){ //S
        sphereMaterial.flatShading = false;
        sphereMaterial.needsUpdate = true;

        cylinderMaterial.flatShading = false;
        cylinderMaterial.needsUpdate = true;

        coneMaterial.flatShading = false;
        coneMaterial.needsUpdate = true;

        keyMap[83] = false;
        keyMap[115] = false;
    }

    //Point Light - bulb
    if(keyMap[89] || keyMap[121]){ //Y
        YTracker = !YTracker
        if (YTracker) {
          path = new THREE.Path();
          path.lineTo(0, 3);
          path.name="pathXY";

          pointX = new THREE.PointLight(0xFFFFFF, 2, 5);
          pointX.castShadow = true;
          sceneElements.sceneGraph.add( pointX );
          pointX.name="pointLightX";
          keepMoving = true;
        } else {
          sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("pointLightX"));
          sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("pathXY"));
          keepMoving = false;
        }

        keyMap[89] = false;
        keyMap[121] = false;
    } if (keepMoving) {
        moveLight();
    }

    //Spot Light - Headlamp
    if(keyMap[90] || keyMap[122]){ //Z
      ZTracker = !ZTracker;            
        if (ZTracker) {
          spotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
          spotLight.position.set(0, 1, 0);
          sceneElements.sceneGraph.add(spotLight);
          spotLight.name="spotLight";
          // Setup shadow properties for the spotlight
          spotLight.castShadow = true;
          spotLight.shadow.mapSize.width = 2048;
          spotLight.shadow.mapSize.height = 2048;
        } else {
            sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("spotLight"));
            dxn = 1;
            pos = 0;
        }     
        keyMap[90] = false;
        keyMap[122] = false;
    }
  
  function keyPress(event){
      keyMap[event.keyCode] = true;
  }
  
  window.addEventListener('keypress', keyPress);
  

  controls.update();
  // Render the scene
  render(sceneElements);

  // Call for the next frame
  requestAnimationFrame(computeFrame);

}

// Create an empty scene with a camera, spotlight, and a renderer
function initEmptyScene(sceneElements) {

  // Create the 3D scene
  sceneElements.sceneGraph = new THREE.Scene();

  // Add camera
  width = window.innerWidth;
  height = window.innerHeight;

  // Create renderer (with shadow map)
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  sceneElements.renderer = renderer;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor('rgb(0, 0, 0)', 1.0);
  renderer.setSize(width, height);

  // Setup shadowMap property
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Add the render image in the HTML DOM
  const htmlElement = document.querySelector("#Tag3DScene");
  htmlElement.appendChild(renderer.domElement);
  
  /** The parameters inside the perspective and orthographic camera are:
   *  fov — field of view.
      aspect — aspect ratio.
      near — near plane.
      far — far plane. **/
  camera = new THREE.PerspectiveCamera(5, width / height, 0.1, 500);
  camera.position.set(-50, 20, 50);
  camera.lookAt(0, 0, 0);
      
  orthoCam = new THREE.OrthographicCamera( width / - 100, width / 100, height / 100, height / - 100, 0.1, 500 );
  orthoCam.position.set(-50, 10, 50);
  orthoCam.lookAt(0, 0, 0);

  // set camera 
  controls = new OrbitControls(camera, renderer.domElement);
  sceneElements.camera = camera;
  controls.update();
  
  // Add an ambient light
  ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.5);
  sceneElements.sceneGraph.add(ambientLight);
  ambientLight.name = "ambientlight";
}

// Create and insert in the scene graph the shapes of the 3D scene
function load3DObjects(sceneGraph) {

  // Create a ground plane
  const planeGeometry = new THREE.PlaneGeometry(6, 6);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 'rgb(200, 200, 200)',
    side: THREE.DoubleSide
  });
  const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
  sceneGraph.add(planeObject);

  // Change orientation of the plane using rotation
  planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  // Set shadow property
  planeObject.receiveShadow = true;

  // Create a cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(251, 194, 200 )', specular: '0xCCCCCC', shininess: '100', flatShading:false });
  const cubeObject = new THREE.Mesh(cubeGeometry, cubeMaterial);
  sceneGraph.add(cubeObject);

  // Set position of the cube
  cubeObject.translateX(-0.2).translateY(0.7).translateZ(0.4);
  // Set shadow property
  cubeObject.castShadow = true;
  cubeObject.receiveShadow = true;

  cubeObject.name = "MovingCube";

  // Create a sphere
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  sphereMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(180,180,255)',  specular: '0xCCCCCC', shininess: '100', flatShading:false});
  const sphereObject = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sceneGraph.add(sphereObject);

  // Set position of the sphere
  sphereObject.translateX(-2.5).translateY(0.5).translateZ(-1.3);
  // Set shadow property
  sphereObject.castShadow = true;

  sphereObject.name = "MovingSphere";

  // Create a cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 25, 1);
  cylinderMaterial = new THREE.MeshPhongMaterial({color: 'rgb(200,255,150)', specular: '0xCCCCCC', shininess: '100', flatShading:false});
  const cylinderObject = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  sceneGraph.add(cylinderObject);

  // Set position of the cylinder
  cylinderObject.translateX(1.5).translateY(0.85).translateZ(1.9);
  // Set shadow property
  cylinderObject.castShadow = true;

  // Give a name to the cylinder
  cylinderObject.name = "rotatingCylinder";

  // Create a Cone
  const coneGeometry = new THREE.ConeGeometry(1, 1, 64);
   coneMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(194, 210, 251 )' ,  specular: '0xCCCCCC', shininess: '100', flatShading:false});
  const coneObject = new THREE.Mesh(coneGeometry, coneMaterial);
  sceneGraph.add(coneObject);

  // Set position of the cylinder
  coneObject.translateX(-2.0).translateY(1.2).translateZ(1.9);
  // Set shadow property
  coneObject.castShadow = true;

  // Give a name to the cylinder
  coneObject.name = "rotatingCone";

  // Create a Tetrahedron
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(1);
  const tetrahedronMaterial = new THREE.MeshPhongMaterial({color: 'rgb(241, 194, 251 )',  specular: '0xCCCCCC', shininess: '100', flatShading:false});
  const tetrahedronObject = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
  sceneGraph.add(tetrahedronObject);

  // Set position of the Tetrahedron
  tetrahedronObject.translateX(0.8).translateY(0.75).translateZ(-2.1).normalize;
  // Set shadow property
  tetrahedronObject.castShadow = true;

  // Give a name to the cylinder
  tetrahedronObject.name = "rotatingTetrahedron";
}

//Ambient Slider Control
function ambLight(event) {
    sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("ambientlight"));
    let intensity = event.target.value / 100;
    
    ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', intensity);
    sceneElements.sceneGraph.add(ambientLight);
    ambientLight.name = "ambientlight"
}

lightAmbient = document.getElementById("slider");
lightAmbient.addEventListener("input", ambLight);

// When the mouse moves, calls onMouseMove
document.addEventListener('mousemove', onMouseMove, false);

// Follows the mouse event
function onMouseMove(event) {
    if (!ZTracker) return;
    // Update the mouse letiable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

    vector.unproject(sceneElements.camera);
    let dir = vector.sub(sceneElements.camera.position).normalize();

    let distance = -sceneElements.camera.position.z / dir.z;
    let pos = sceneElements.camera.position.clone().add(dir.multiplyScalar(distance));
  
    spotLight.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
  };

  //moving Pointlight
  function moveLight(){
    if (dxn == 1 && pos < path.getPoints()[1].y) {
      pos += 0.01;
      if (pos > path.getPoints()[1].y ) {
        dxn = -1;
      }
    } else if (dxn == -1) {
      pos -= 0.01;
      if (pos < path.getPoints()[0].y ) {
        dxn = 1;
      }
    }
    pointX.position.y= pos;
  }
  
function render(sceneElements) {
  sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
}
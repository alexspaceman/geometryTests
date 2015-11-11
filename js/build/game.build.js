// ========== SETUP AND GLOBALS / start ==========
// SETUP SCENE, CAMERA AND RENDERERS
"use strict";

var tr = THREE;

var scene = new tr.Scene();
var camera = new tr.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new tr.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS
var gameEnvironment = {};
var controller = {};
controller.modifiers = {};
camera.controls = {};
camera.controls.movement = {};
camera.controls.mouse = {};

camera.controls.movement.z = false;
camera.controls.movement.z_ = false;
camera.controls.movement.x = false;
camera.controls.movement.x_ = false;
camera.controls.movement.y = false;
camera.controls.movement.y_ = false;

camera.controls.mouse.leftClick = false;
camera.controls.mouse.moving = false;
camera.controls.mouse.movementX = 0;
camera.controls.mouse.movementY = 0;

controller.modifiers.shift = false;

// GLOBAL VARIABLES
camera.controls.movement.speedBase = 0.1;
camera.controls.movement.speed = camera.controls.movement.speedBase;
camera.controls.mouse.rotationSpeed = 0.005;
controller.modifiers.shiftSpeed = 5;

gameEnvironment.gridSize = 10;

// EVENT LISTENERS
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("mouseup", onDocumentMouseUp, false);

// EVENT FUNCTIONS
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  console.log(keyCode, 'key down');

  switch (keyCode) {
    case 87:
      camera.controls.movement.z = true;break; // north
    case 83:
      camera.controls.movement.z_ = true;break; // south
    case 68:
      camera.controls.movement.x = true;break; // east
    case 65:
      camera.controls.movement.x_ = true;break; // west
    case 69:
      camera.controls.movement.y = true;break; // up
    case 81:
      camera.controls.movement.y_ = true;break; // down

    case 16:
      controller.modifiers.shift = true;break; // shift
  }
}

function onDocumentKeyUp(event) {
  var keyCode = event.which;
  console.log(keyCode, 'key up');

  switch (keyCode) {
    case 87:
      camera.controls.movement.z = false;break; // north
    case 83:
      camera.controls.movement.z_ = false;break; // south
    case 68:
      camera.controls.movement.x = false;break; // east
    case 65:
      camera.controls.movement.x_ = false;break; // west
    case 69:
      camera.controls.movement.y = false;break; // up
    case 81:
      camera.controls.movement.y_ = false;break; // down

    case 16:
      controller.modifiers.shift = false;break; // shift
  }
}

function onDocumentMouseDown(event) {
  // console.log(event, 'mouse down')

  document.addEventListener("mousemove", onDocumentMouseMove, false);

  camera.controls.mouse.leftClick = true;
}

function onDocumentMouseUp(event) {
  // console.log(event, 'mouse up')

  document.removeEventListener("mousemove", onDocumentMouseMove, false);

  camera.controls.mouse.leftClick = false;
}

function onDocumentMouseMove(event) {
  // console.log(event)

  camera.controls.mouse.movementX = event.movementX;
  camera.controls.mouse.movementY = event.movementY;
  camera.controls.mouse.moving = true;
}

// ========== SETUP AND GLOBALS / end ============
// ========== GEOMETRY MODIFICATION / start ==========
// MODIFY GEOMETRY FUNCTIONS
'use strict';

function getObjectByName(objectName) {
  for (var i = 0; i < scene.children.length; i++) {
    if (objectName === scene.children[i].name) {
      return scene.children[i];
    }
  }
}

function getObjectById(objectId) {
  for (var i = 0; i < scene.children.length; i++) {
    if (objectId === scene.children[i].objId) {
      return scene.children[i];
    }
  }
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function objNumber() {
  return scene.children.length + 1;
}

function moveObjectByName(objectName, position) {
  getObjectByName(objectName).position.x = position[0];
  getObjectByName(objectName).position.y = position[1];
  getObjectByName(objectName).position.z = position[2];
}

// GEOMETRY HELPERS
function hexVertices(options) {
  options = options || {};
  options.gridCellWidth = options.gridCellWidth || 1;

  var vertices = [new tr.Vector3(0, 0, 0), new tr.Vector3(2 * options.gridCellWidth, 3 * options.gridCellWidth, 0), new tr.Vector3(4 * options.gridCellWidth, 0, 0), new tr.Vector3(2 * options.gridCellWidth, -3 * options.gridCellWidth, 0), new tr.Vector3(-2 * options.gridCellWidth, -3 * options.gridCellWidth, 0), new tr.Vector3(-4 * options.gridCellWidth, 0, 0), new tr.Vector3(-2 * options.gridCellWidth, 3 * options.gridCellWidth, 0)];

  return vertices;
}

// DEFAULT GEOMETRY VALUES
var defaultWFMaterial = {
  color: 'rgb(200,200,200)',
  opacity: 1,
  transparent: true,
  wireframe: true,
  side: tr.DoubleSide
};

var defaultWFPlane = {
  color: 'rgb(200,200,200)',
  opacity: 0.5,
  transparent: true,
  wireframe: true,
  side: tr.DoubleSide
};

var hexVerticesValue = hexVertices();

// ========== GEOMETRY MODIFICATION / end ============
// ========== GEOMETRY CREATION / start ==========
'use strict';

var _bind = Function.prototype.bind;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function generateTriangle(vertices, material, objectName) {
  vertices = vertices || [[0, 0, 0], [2, 3, 0], [4, 0, 0]];

  var geometry = new tr.Geometry();
  geometry.vertices.push(new tr.Vector3(vertices[0][0], vertices[0][1], vertices[0][2]));
  geometry.vertices.push(new tr.Vector3(vertices[1][0], vertices[1][1], vertices[1][2]));
  geometry.vertices.push(new tr.Vector3(vertices[2][0], vertices[2][1], vertices[2][2]));
  geometry.faces.push(new tr.Face3(0, 1, 2));

  material = material || new tr.MeshBasicMaterial(defaultWFPlane);

  var triangle = new tr.Mesh(geometry, material);

  triangle.name = objectName || 'unknown';

  scene.add(triangle);
}

// fix new format, delete old format
function generateTriangle_new(options) {
  options = options || {};
  options.name = options.name || 'triangle' + scene.children.length;
  options.size = options.size || 1;
  options.material = options.material || defaultWFPlane;
  options.vertices = options.vertices || [[0, 0, 0], [2 * options.size, 3 * options.size, 0], [4 * options.size, 0, 0]];

  for (var i = 0; i < options.vertices.length; i++) {
    options.vertices[i] = options.vertices[i] * options.size;
    for (var j = 0; j < options.vertices[i].length; j++) {
      options.vertices[i][j] = options.vertices[i][j] * options.size;
    }
  }

  var geometry = new tr.Geometry();
  geometry.vertices.push(new tr.Vector3(options.vertices[0][0], options.vertices[0][1], options.vertices[0][2]));
  geometry.vertices.push(new tr.Vector3(options.vertices[1][0], options.vertices[1][1], options.vertices[1][2]));
  geometry.vertices.push(new tr.Vector3(options.vertices[2][0], options.vertices[2][1], options.vertices[2][2]));
  geometry.faces.push(new tr.Face3(0, 1, 2));

  var material = new tr.MeshBasicMaterial(options.material);

  var triangle = new tr.Mesh(geometry, material);
  triangle.name = options.name;

  scene.add(triangle);
}

// rewrite to new format
function generateCube(geometry, material, objectName) {
  geometry = geometry || [1, 1, 1];
  geometry = new (_bind.apply(tr.BoxGeometry, [null].concat(_toConsumableArray(geometry))))();

  material = material || defaultWFMaterial;
  material = new tr.MeshBasicMaterial(material);

  var cube = new tr.Mesh(geometry, material);

  cube.name = objectName || 'unknown';

  scene.add(cube);
}

// rewrite to new format
function generatePlane(geometry, material, objectName) {
  geometry = geometry || [5, 5];
  geometry = new tr.PlaneGeometry(geometry[0], geometry[1]);

  material = material || defaultWFPlane;
  material = new tr.MeshBasicMaterial(material);

  var plane = new tr.Mesh(geometry, material);

  plane.name = objectName || 'unknown';

  scene.add(plane);
}

function generateHex(options) {
  options = options || {};
  options.name = options.name || 'hex' + objNumber();
  options.id = options.id || objNumber();
  options.size = options.size || 1;
  options.origin = options.origin || new tr.Vector3(0, 0, 0);
  options.vertices = options.vertices || hexVerticesValue;
  options.material = options.material || defaultWFMaterial;

  var geometry = new tr.Geometry();

  geometry.vertices = options.vertices;

  geometry.faces.push(new tr.Face3(0, 1, 2), new tr.Face3(0, 2, 3), new tr.Face3(0, 3, 4), new tr.Face3(0, 4, 5), new tr.Face3(0, 5, 6), new tr.Face3(0, 6, 1));

  var material = new tr.MeshBasicMaterial(options.material);
  var newGameObject = new tr.Mesh(geometry, material);
  newGameObject.name = options.name;
  newGameObject.objId = options.id;

  scene.add(newGameObject);
}

// ========== GEOMETRY CREATION / end ============
// ========== GRID CREATION / start ==========
'use strict';

var gridHelper = new tr.GridHelper(100, 2);
scene.add(gridHelper);
gridHelper.setColors('rgb(250,200,100)', 'rgb(120,120,80)');

// ========== GRID CREATION / end ============
// ========== SCENE CREATION / start ==========
// OBJECT/SCENE GENERATION

// creating grid
'use strict';

generateHex({ name: '0,0' });
getObjectByName('0,0').rotation.x = toRadians(90);
generateHex({ name: '1,0' });
getObjectByName('1,0').rotation.x = toRadians(90);
moveObjectByName('1,0', [6, 0, 3]);
generateHex({ name: '0,1' });
getObjectByName('0,1').rotation.x = toRadians(90);
moveObjectByName('0,1', [0, 0, 6]);

console.log(getObjectByName('0,1'));

function createGrid(options) {
  options = options || {};
  options.gridSize = options.gridSize || 10;

  for (var i = 0; i < options.gridSize; i++) {}
}

createGrid();

// OBJECT/SCENE MODIFICATION
camera.position.z = 5;
camera.position.y = 35;
camera.rotation.x = toRadians(-75);

// ========== SCENE CREATION / end ============
// ========== RENDER LOOP / start ==========
// RENDER LOOP
"use strict";

function render() {
  requestAnimationFrame(render);

  if (camera.controls.movement.z) camera.position.z -= camera.controls.movement.speed;
  if (camera.controls.movement.z_) camera.position.z += camera.controls.movement.speed;
  if (camera.controls.movement.x) camera.position.x += camera.controls.movement.speed;
  if (camera.controls.movement.x_) camera.position.x -= camera.controls.movement.speed;
  if (camera.controls.movement.y) camera.position.y += camera.controls.movement.speed;
  if (camera.controls.movement.y_) camera.position.y -= camera.controls.movement.speed;

  if (controller.modifiers.shift) {
    camera.controls.movement.speed = camera.controls.movement.speedBase * controller.modifiers.shiftSpeed;
  } else camera.controls.movement.speed = camera.controls.movement.speedBase;

  if (camera.controls.mouse.leftClick) {
    if (camera.controls.mouse.moving) {
      camera.rotation.y -= camera.controls.mouse.movementX * camera.controls.mouse.rotationSpeed;
      camera.rotation.x -= camera.controls.mouse.movementY * camera.controls.mouse.rotationSpeed;
      camera.controls.mouse.moving = false;
    }
  }

  renderer.render(scene, camera);
}
render();

// ========== RENDER LOOP / start ==========
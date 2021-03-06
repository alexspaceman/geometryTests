// ========== SETUP AND GLOBALS / start ==========
// SETUP SCENE, CAMERA AND RENDERERS
const t = THREE

const scene = new t.Scene()
const camera = new t.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new t.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// CONTROLS
var gameEnvironment = {}
var controller = {}
controller.modifiers = {}
camera.controls = {}
camera.controls.movement = {}
camera.controls.mouse = {}

camera.controls.movement.z      = false
camera.controls.movement.z_     = false
camera.controls.movement.x      = false
camera.controls.movement.x_     = false
camera.controls.movement.y      = false
camera.controls.movement.y_     = false

camera.controls.mouse.leftClick = false
camera.controls.mouse.moving    = false
camera.controls.mouse.movementX = 0
camera.controls.mouse.movementY = 0

controller.modifiers.shift      = false


// GLOBAL VARIABLES
camera.controls.movement.speedBase  = 0.1
camera.controls.movement.speed      = camera.controls.movement.speedBase
camera.controls.mouse.rotationSpeed = 0.005
controller.modifiers.shiftSpeed     = 5

gameEnvironment.gridSize            = 10


// EVENT LISTENERS
document.addEventListener("keydown", onDocumentKeyDown, false)
document.addEventListener("keyup", onDocumentKeyUp, false)
document.addEventListener("mousedown", onDocumentMouseDown, false)
document.addEventListener("mouseup", onDocumentMouseUp, false)


// EVENT FUNCTIONS
function onDocumentKeyDown (event) {
  var keyCode = event.which
  console.log(keyCode, 'key down')

  switch (keyCode) {
    case 87: camera.controls.movement.z   = true; break // north
    case 83: camera.controls.movement.z_  = true; break // south
    case 68: camera.controls.movement.x   = true; break // east
    case 65: camera.controls.movement.x_  = true; break // west
    case 69: camera.controls.movement.y   = true; break // up
    case 81: camera.controls.movement.y_  = true; break // down

    case 16: controller.modifiers.shift   = true; break // shift
  }
}

function onDocumentKeyUp (event) {
  var keyCode = event.which
  console.log(keyCode, 'key up')

  switch (keyCode) {
    case 87: camera.controls.movement.z   = false; break // north
    case 83: camera.controls.movement.z_  = false; break // south
    case 68: camera.controls.movement.x   = false; break // east
    case 65: camera.controls.movement.x_  = false; break // west
    case 69: camera.controls.movement.y   = false; break // up
    case 81: camera.controls.movement.y_  = false; break // down

    case 16: controller.modifiers.shift   = false; break // shift
  }
}

function onDocumentMouseDown (event) {
  // console.log(event, 'mouse down')

  document.addEventListener("mousemove", onDocumentMouseMove, false)

  camera.controls.mouse.leftClick = true
}

function onDocumentMouseUp (event) {
  // console.log(event, 'mouse up')

  document.removeEventListener("mousemove", onDocumentMouseMove, false)

  camera.controls.mouse.leftClick = false
}

function onDocumentMouseMove (event) {
  // console.log(event)

  camera.controls.mouse.movementX = event.movementX
  camera.controls.mouse.movementY = event.movementY
  camera.controls.mouse.moving = true
}


// ========== SETUP AND GLOBALS / end ============


// ========== GEOMETRY MODIFICATION / start ==========
// MODIFY GEOMETRY FUNCTIONS
function getObjectByName (objectName) {
  for(let i = 0; i < scene.children.length; i++){
    if(objectName === scene.children[i].name){
      return scene.children[i]
    }
  }
}

function getObjectById (objectId) {
  for(let i = 0; i < scene.children.length; i++){
    if(objectId === scene.children[i].objId){
      return scene.children[i]
    }
  }
}

function toRadians (degrees) {
  return degrees * (Math.PI / 180)
}

function objNumber () {
  return scene.children.length + 1
}

function moveObjectByName (objectName, position) {
  getObjectByName(objectName).position.x = position[0]
  getObjectByName(objectName).position.y = position[1]
  getObjectByName(objectName).position.z = position[2]
}


// GEOMETRY HELPERS


// DEFAULT GEOMETRY VALUES
const defaultWFMaterial = {
                          color:'rgb(200,200,200)'
                        , opacity:1
                        , transparent:true
                        , wireframe:true
                        , side:t.DoubleSide
                        }

const defaultWFPlane    = {
                          color:'rgb(200,200,200)'
                        , opacity:0.5
                        , transparent:true
                        , wireframe:true
                        , side:t.DoubleSide
                        }


// ========== GEOMETRY MODIFICATION / end ============


// ========== GEOMETRY CREATION / start ==========
// start with triangles


// ========== GEOMETRY CREATION / end ============


// ========== GRID CREATION / start ==========
const gridHelper = new t.GridHelper(100, 2)
scene.add(gridHelper)
gridHelper.setColors('rgb(250,200,100)', 'rgb(120,120,80)')


// ========== GRID CREATION / end ============


// ========== SCENE CREATION / start ==========
// OBJECT/SCENE GENERATION


// OBJECT/SCENE MODIFICATION
camera.position.z = 5
camera.position.y = 35
camera.rotation.x = toRadians(-75)


// ========== SCENE CREATION / end ============


// ========== RENDER LOOP / start ==========
// RENDER LOOP
function render () {
  requestAnimationFrame(render)

  if (camera.controls.movement.z)   camera.position.z -= camera.controls.movement.speed
  if (camera.controls.movement.z_)  camera.position.z += camera.controls.movement.speed
  if (camera.controls.movement.x)   camera.position.x += camera.controls.movement.speed
  if (camera.controls.movement.x_)  camera.position.x -= camera.controls.movement.speed
  if (camera.controls.movement.y)   camera.position.y += camera.controls.movement.speed
  if (camera.controls.movement.y_)  camera.position.y -= camera.controls.movement.speed

  if (controller.modifiers.shift) {
    camera.controls.movement.speed = camera.controls.movement.speedBase * controller.modifiers.shiftSpeed
  }
  else {
    camera.controls.movement.speed = camera.controls.movement.speedBase
  }

  if (camera.controls.mouse.leftClick) {
    if (camera.controls.mouse.moving) {
      camera.rotation.y -= camera.controls.mouse.movementX * camera.controls.mouse.rotationSpeed
      camera.rotation.x -= camera.controls.mouse.movementY * camera.controls.mouse.rotationSpeed
      camera.controls.mouse.moving = false
    }
  }

  renderer.render(scene, camera)
}
render()


// ========== RENDER LOOP / start ==========
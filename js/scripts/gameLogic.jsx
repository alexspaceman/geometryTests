// ========== SETUP AND GLOBALS / start ==========
// SETUP SCENE, CAMERA AND RENDERERS
const t = THREE

const scene = new t.Scene()
const camera = new t.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new t.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// CONTROLS
let gameEnvironment = {}
let controller = {}
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
  let keyCode = event.which
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
  let keyCode = event.which
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
  let object = getObjectByName(objectName)

  object.position.x = position[0]
  object.position.y = position[1]
  object.position.z = position[2]
}

function modifyVertices (objectName, options) {
  options = options || {}
  options.whichVertex = options.whichVertex || 0
  options.newVector3 = options.newVector3 || new t.Vector3(0,20,0)

  let object = getObjectByName(objectName)

  object.geometry.vertices[options.whichVertex] = options.newVector3
  object.geometry.verticesNeedUpdate = true
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
function createTriangle_basic () {
  let geometry = new t.Geometry()
  geometry.vertices.push(new t.Vector3(0,1,0))
  geometry.vertices.push(new t.Vector3(-1,-1,0))
  geometry.vertices.push(new t.Vector3(1,-1,0))
  geometry.faces.push(new t.Face3(0,1,2))

  geometry.faces[0].vertexColors[0] = new t.Color('rgb(230,220,140)')
  geometry.faces[0].vertexColors[1] = new t.Color('rgb(100,20,20)')
  geometry.faces[0].vertexColors[2] = new t.Color('rgb(100,20,20)')

  let material = new t.MeshBasicMaterial({
    side: t.DoubleSide
  , transparent: true
  , wireframe: false
  , vertexColors: t.VertexColors
  })

  let mesh = new t.Mesh(geometry, material)
  mesh.name = 'triangle'

  scene.add(mesh)
}

// createTriangle_basic()

function createTriangle (options) {
  options = options || {}
  
  options.geometry = options.geometry || new t.Geometry()
  options.geometry.vertices = [new t.Vector3(0,1,0), new t.Vector3(-1,-1,0), new t.Vector3(1,-1,0)]
  options.geometry.faces = [new t.Face3(0,1,2)]

  options.material = options.material || new t.MeshBasicMaterial({
    side: t.DoubleSide
  })

  let mesh = new t.Mesh(options.geometry, options.material)
  mesh.name = options.name || 'triangle' + objNumber()

  scene.add(mesh)
}

createTriangle()

// ========== GEOMETRY CREATION / end ============


// ========== GRID CREATION / start ==========
const gridHelper = new t.GridHelper(100, 2)
scene.add(gridHelper)
gridHelper.setColors('rgb(250,200,100)', 'rgb(120,120,80)')


// ========== GRID CREATION / end ============


// ========== SCENE CREATION / start ==========
// OBJECT/SCENE GENERATION
function initializeScene () {
  // modifyVertices('triangle')
  console.log('initialized!')
}

initializeScene()


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
    // modifyVertices('triangle', { newVector3: new t.Vector3(0,5,0) })
  }
  else {
    camera.controls.movement.speed = camera.controls.movement.speedBase
    // this triggers over and over (VERY BAD!)
    // modifyVertices('triangle', { newVector3: new t.Vector3(0,1,0) })
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


// ========== RENDER LOOP / end ==========
///////////////
//
var CONFIG = {};
CONFIG.width = window.innerWidth;
CONFIG.height = window.innerHeight;
CONFIG.aspectRatio = CONFIG.width / CONFIG.height;

var BG = _createNeededThings();
var OBJ = _createObjects();

/////////////////////////////////
// 1. renderer 영억 그리고
BG.renderer.setSize(CONFIG.width /3, CONFIG.height/3);
document.body.appendChild(BG.renderer.domElement);

// 2. 렌더영역에 그려질 scene와 카메라를 설정을해줌.
BG.scene.add(OBJ.cube);
BG.camera.position.z = 5;

// 3. 렌더영역에 그리기.
render()();
function render(_time) {
  _time = _time || 0;
  return function _realRender() {
    console.error('rend')
    requestAnimationFrame( _realRender );

    // 1. 어떤 조작작업을 한다음에
    rotateAll(OBJ.cube);
    moveCamera(BG.camera, _time);

    // 2. 실제그림
    BG.renderer.render( BG.scene, BG.camera );
    ///////////
    ///////////
    _time += 1;
  }
}
/////////////
////
///////////////
function moveCamera(camera, time) {
  // 1초
  if (time % 60 == 0) {
    // var moveY = 0.01;
    // if (camera.position.y >= 3) {
    //   moveY = -0.01;
    // } else if (camera.position.y <= 0) {
    //   moveY = 0.01;
    // }
    // camera.position.y = moveY;
  }
}
function rotateAll(obj) {
  obj.rotation.y += 0.1;
  obj.rotation.z += 0.1;
  obj.rotation.x += 0.1;
}
///////////////////////////////////////
//  필수 객체들.
///////////////////////////////////////
function _createNeededThings() {
  return {
    renderer: new THREE.WebGLRenderer(),
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, CONFIG.aspectRatio, 0.1, 1000),
  }
}
///////////////////////////////////////
//  create object
///////////////////////////////////////
function _createObjects() {
  var rst = {};
  // 1. cube
  var geometry = new THREE.BoxGeometry(1.5,1,1);
  var meterial = new THREE.MeshBasicMaterial({color: 0x00ff00 });
  rst.cube = new THREE.Mesh( geometry, meterial );

  /////////
  return rst;
}

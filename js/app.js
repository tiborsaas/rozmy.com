let camera, scene, renderer, composer, object, light, cube;

init();

function init() {
    const canvas = document.querySelector('#hero');
    canvas.style.width = '100%';
    canvas.width = canvas.clientWidth;
    canvas.height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setPixelRatio( window.devicePixelRatio );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // LIGHTS

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 2, 1 );
    scene.add( light );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
}

let targetRotation = 0;

window.addEventListener('scroll', e => {
    targetRotation = window.scrollY / window.innerHeight;
});

function animate() {

    requestAnimationFrame( animate );

    var time = Date.now();

    cube.rotation.x += ( targetRotation - cube.rotation.x ) * 0.03;

    // composer.render();
    renderer.render(scene, camera);
}

animate();

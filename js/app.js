let camera, scene, renderer, composer, object, light, videoMesh;

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

    const geometry = new THREE.PlaneGeometry( 5, 5*9/16, 3 );
    texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const material = new THREE.MeshLambertMaterial({
        map: texture
    });

    videoMesh = new THREE.Mesh( geometry, material );
    scene.add( videoMesh );

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

let targetRotationX = 0, targetRotationY = 0;

window.addEventListener('scroll', e => {
    targetRotationX = ( window.scrollY / window.innerHeight );
});

window.addEventListener('mousemove', e => {
    targetRotationY = ( ( window.innerWidth / 2 - e.clientX  ) / window.innerWidth );
});

function animate() {

    requestAnimationFrame( animate );
    videoMesh.rotation.x += ( targetRotationX - videoMesh.rotation.x ) * 0.03; // Scroll
    videoMesh.rotation.y += ( targetRotationY - videoMesh.rotation.y ) * 0.05; // MouseX

    // composer.render();
    renderer.render(scene, camera);
}

animate();

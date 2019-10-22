/**
 * Imports
 */
var loadSvg = require('load-svg');
var parsePath = require('extract-svg-path').parse;
var svgMesh3d = require('svg-mesh-3d');

import reindex from 'mesh-reindex';
import unindex from 'unindex-mesh';


var camera, scene, renderer, composer, object, light, videoMesh;

const THREE = require('three');
const createGeom = require('three-simplicial-complex')(THREE);

import logo from '../svg/fui.svg';

init();

function init() {
    loadSvg( logo, function (err, svg) {
        if (err) throw err

        var svgPath = parsePath(svg)
        var svgMeshData = svgMesh3d(svgPath, {
            delaunay: false,
            scale: 4
        });
        // svgMeshData = reindex(unindex(svgMeshData.positions, svgMeshData.cells))

        const geom = createGeom( svgMeshData );

        const mati = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        });

        const meshSVG = new THREE.Mesh(geom, mati);
        scene.add( meshSVG );
    })

    const canvas = document.querySelector('#hero');
    canvas.style.width = '100%';
    canvas.width = canvas.clientWidth;
    canvas.height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        inputGamma: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 2;

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry( 5, 5*9/16, 3 );

    const texture = new THREE.VideoTexture( video );
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
    light.position.set( 1, 1, 1 );
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
    targetRotationX = ( - window.scrollY / window.innerHeight ) * 0.3;
});

window.addEventListener('mousemove', e => {
    targetRotationY = ( ( window.innerWidth / 2 - e.clientX  ) / window.innerWidth ) * 0.3;
});

function animate() {

    requestAnimationFrame( animate );
    videoMesh.rotation.x += ( targetRotationX - videoMesh.rotation.x ) * 0.03; // Scroll
    videoMesh.rotation.y += ( targetRotationY - videoMesh.rotation.y ) * 0.05; // MouseX

    // composer.render();
    renderer.render(scene, camera);
}

animate();

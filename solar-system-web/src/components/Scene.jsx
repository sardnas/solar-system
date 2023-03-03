import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import sun from '../img/sun.jpg';
import venusbg from '../img/venus.jpg';
import mercurybg from '../img/mercury.jpg';
import saturnbg from '../img/saturn.jpg';

const Planet = () => {
  const textureLoader = new THREE.TextureLoader();

  const sunGeo = new THREE.SphereGeometry(16, 30, 30);
  const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sun),
  });
  return new THREE.Mesh(sunGeo, sunMat);
};

function createPlanet(size, texture, position, ring) {
  const textureLoader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  mesh.position.x = position;
  return { mesh, obj };
}

export const Scene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 96;

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();

  const ambientLigth = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLigth.castShadow.true;
  scene.add(ambientLigth);

  // Adding planets :3
  const sun = Planet();
  const mercury = createPlanet(3.2, mercurybg, 28);
  const venus = createPlanet(5.8, venusbg, 44);
  const saturn = createPlanet(8, saturnbg, 80, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnbg,
  });

  scene.add(sun);
  scene.add(mercury.obj);
  scene.add(venus.obj);
  scene.add(saturn.obj);

  const animate = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    mercury.obj.rotateY(0.004);
    venus.mesh.rotateY(0.0015);
    venus.obj.rotateY(0.002);
    saturn.mesh.rotateY(0.038);
    saturn.obj.rotateY(0.0009);
  };
  animate();

  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  );
};

import React, { useEffect } from 'react';
import { render } from 'react-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Planet } from './Planet';

export const Scene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const ambientLigth = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLigth.castShadow.true;
    scene.add(ambientLigth);

    const animate = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  });
  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  );
};

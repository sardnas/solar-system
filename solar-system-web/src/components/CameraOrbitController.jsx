import React from 'react';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const CameraOrbitController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

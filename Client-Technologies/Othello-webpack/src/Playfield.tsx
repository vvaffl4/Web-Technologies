import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, ThreeElements, ThreeEvent, useFrame, Vector3 } from '@react-three/fiber';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Board from './Board';
import Stone from './Stone';

const Box: FC<{position: Vector3 }> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current!.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Playfield: FC = () => {
  return (
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <ambientLight color={'hotpink'} />
      <Board position={[0, 0, 0]}/>
      <PerspectiveCamera 
        makeDefault 
        position={[0, 5, 5.5]}
        rotation={new THREE.Euler(-45 * (Math.PI / 180), 0, 0)}
      />
      {/* <Box position={[-1.2, 0, 0]}/> */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
}

export default Playfield;
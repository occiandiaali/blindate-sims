import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor,
  useGLTF,
} from "@react-three/drei";

import { useThree, useFrame } from "@react-three/fiber";

import { useAtom } from "jotai";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatedWoman } from "./AnimatedWoman";
import { Adam } from "./Adam";
import { charactersAtom, socket } from "./SocketManager";

function FPC() {
  const modelRef = useRef();
  const cameraRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  //  const { camera } = useThree();
  const { scene } = useGLTF("/models/Animated Woman.glb");
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        const [x, y, z] = prev;
        if (e.key === "ArrowUp" || e.key === "w") return [x, y, z - 1];
        if (e.key === "ArrowDown" || e.key === "s") return [x, y, z + 1];
        if (e.key === "ArrowLeft" || e.key === "a") return [x - 1, y, z];
        if (e.key === "ArrowRight" || e.key === "d") return [x + 1, y, z];
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
    }
    if (cameraRef.current && modelRef.current) {
      cameraRef.current.position.set(...modelRef.current.position);
    }
  });
  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <perspectiveCamera ref={cameraRef} fov={75} position={[0, 2, 5]} />
    </>
  );
}

function EnvironModel() {
  const { scene } = useGLTF("/models/resort_lobby.glb");
  return <primitive object={scene} />;
}

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);

  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />

      <OrbitControls />
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[30, 30]} />
        {/* <meshStandardMaterial color="#f0f0f0" /> */}
        <meshStandardMaterial color="seagreen" />
      </mesh>
      <EnvironModel />
      <FPC />
      {characters.map((character) => (
        <AnimatedWoman
          key={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          hairColor={character.hairColor}
          topColor={character.topColor}
          bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};

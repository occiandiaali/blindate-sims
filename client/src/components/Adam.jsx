/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/Animated Woman.glb -o src/components/AnimatedWoman.jsx -r public
*/

import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";

const MOVEMENT_SPEED = 0.032;

export function Adam({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  ...props
}) {
  //const position = useMemo(() => props.position, []);

  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/Animated Woman.glb"
  );
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);

  const modelRef = useRef();
  const cameraRef = useRef();

  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("CharacterArmature|Idle");
  const [position, setPosition] = useState([0, 0, 0]);

  // useEffect(() => {
  //   actions[animation].reset().fadeIn(0.32).play();
  //   return () => actions[animation]?.fadeOut(0.32);
  // }, [animation]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        const [x, y, z] = prev;
        if (e.key === "ArrowUp" || e.key.toLowerCase() === "w")
          return [x, y, z - 1];
        if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
          return [x, y, z + 1];
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
          return [x - 1, y, z];
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
          return [x + 1, y];
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // useFrame(() => {
  //   if (group.current.position.distanceTo(props.position) > 0.1) {
  //     const direction = group.current.position
  //       .clone()
  //       .sub(props.position)
  //       .normalize()
  //       .multiplyScalar(MOVEMENT_SPEED);
  //     group.current.position.sub(direction);
  //     group.current.lookAt(props.position);
  //     setAnimation("CharacterArmature|Run");
  //   } else {
  //     setAnimation("CharacterArmature|Idle");
  //   }
  // });

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
    }
    if (cameraRef.current && modelRef.current) {
      cameraRef.current.position.set(...modelRef.current.position);
    }
  });

  return (
    <group ref={group} {...props} position={position} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} ref={modelRef} />
            <perspectiveCamera ref={cameraRef} fov={75} position={[0, 2, 5]} />
          </group>
          <group name="Casual_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Body_1"
              geometry={nodes.Casual_Body_1.geometry}
              material={materials.White}
              skeleton={nodes.Casual_Body_1.skeleton}
            >
              <meshStandardMaterial color={topColor} />
            </skinnedMesh>
            <skinnedMesh
              name="Casual_Body_2"
              geometry={nodes.Casual_Body_2.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Body_2.skeleton}
            />
          </group>
          <group name="Casual_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Feet_1"
              geometry={nodes.Casual_Feet_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Feet_1.skeleton}
            />
            <skinnedMesh
              name="Casual_Feet_2"
              geometry={nodes.Casual_Feet_2.geometry}
              material={materials.Grey}
              skeleton={nodes.Casual_Feet_2.skeleton}
            />
          </group>
          <group name="Casual_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Head_1"
              geometry={nodes.Casual_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Head_1.skeleton}
            />
            <skinnedMesh
              name="Casual_Head_2"
              geometry={nodes.Casual_Head_2.geometry}
              material={materials.Hair_Blond}
              skeleton={nodes.Casual_Head_2.skeleton}
            >
              <meshStandardMaterial color={hairColor} />
            </skinnedMesh>
            <skinnedMesh
              name="Casual_Head_3"
              geometry={nodes.Casual_Head_3.geometry}
              material={materials.Hair_Brown}
              skeleton={nodes.Casual_Head_3.skeleton}
            />
            <skinnedMesh
              name="Casual_Head_4"
              geometry={nodes.Casual_Head_4.geometry}
              material={materials.Brown}
              skeleton={nodes.Casual_Head_4.skeleton}
            />
          </group>
          <skinnedMesh
            name="Casual_Legs"
            geometry={nodes.Casual_Legs.geometry}
            material={materials.Orange}
            skeleton={nodes.Casual_Legs.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <meshStandardMaterial color={bottomColor} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Animated Woman.glb");

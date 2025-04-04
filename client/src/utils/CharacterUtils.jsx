import { useEffect, useState } from "react";
import { Vector3 } from "three";

const usePersonControls = () => {
    const keys = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        Space: 'jump'
    };

    const moveFieldByKey = (key) => keys[key];
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            setMovement((m) => ({...m, [moveFieldByKey(e.code)]: true}));
        };

        const handleKeyUp = (e) => {
            setMovement((m) => ({...m, [moveFieldByKey(e.code)]: false}));
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return movement;
};

const [mesh, api] = useCapsule(() => ({
    mass: 10,
    position: [0,1,0],
    type: 'Dynamic',
}),
useFrame = (() => {
    let frontVector = new Vector3(0,0,0);
    let sideVector = new Vector3(0,0,0);
    let direction = new Vector3(0,0,0);

    frontVector.set(0,0,Number(forward) - Number(backward));
    sideVector.set(Number(right) - Number(left), 0,0);

    direction.subVectors(frontVector, 
        sideVector
    ).normalize().multiplyScalar(SPEED);
    api.velocity.set(direction.x,0,direction.z);
    mesh.current.getWorldPosition(playerModelReference.current.position);
})
);


export {usePersonControls, useCapsule};

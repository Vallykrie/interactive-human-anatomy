'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Group } from 'three';

type ViewMode = 'all' | 'skin' | 'muscle' | 'skeleton';

interface AnatomyModelProps {
    viewMode: ViewMode;
    setMeshCount: (count: number) => void;
}

export default function AnatomyModel({ viewMode, setMeshCount }: AnatomyModelProps) {
    const all = useGLTF('/models/female-anatomy.glb') as unknown as { scene: Group };
    const skin = useGLTF('/models/skin.glb') as unknown as { scene: Group };
    const muscle = useGLTF('/models/muscle.glb') as unknown as { scene: Group };
    const skeleton = useGLTF('/models/skeleton.glb') as unknown as { scene: Group };

    const offset = .20999999999999;

    useEffect(() => {
        let count = 0;
        if (viewMode === 'all') count = 3;
        else count = 1;
        setMeshCount(count);
    }, [viewMode, setMeshCount]);

    return (
        <group position={[0, 0, 1]} scale={1}>
            {(viewMode === 'all') && <primitive object={all.scene} position={[0, 0, 0]} />}
            {(viewMode === 'skin') && <primitive object={skin.scene} position={[offset, 0, 0]} />}
            {(viewMode === 'muscle') && <primitive object={muscle.scene} position={[0, 0, 0]} />}
            {(viewMode === 'skeleton') && <primitive object={skeleton.scene} position={[-offset, 0, 0]} />}
        </group>
    );
}

useGLTF.preload('/models/skin.glb');
useGLTF.preload('/models/muscle.glb');
useGLTF.preload('/models/skeleton.glb');
useGLTF.preload('/models/female-anatomy.glb');

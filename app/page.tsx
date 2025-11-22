'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, SSAO, Bloom, ToneMapping } from '@react-three/postprocessing';
import { Suspense, useState } from 'react';
import AnatomyModel from './components/AnatomyModel';
import Loader from './components/Loader';
import InfoPanel from './components/InfoPanel';
import ControlPanel from './components/ControlPanel';
import MinimizedButton from './components/MinimizedButton';

type ViewMode = 'all' | 'skin' | 'muscle' | 'skeleton';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [meshCount, setMeshCount] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  return (
    <main className="relative w-full h-screen bg-[radial-gradient(circle_at_center,#1e293b_0%,#000000_100%)] overflow-hidden">
      {!isPanelOpen && (
        <MinimizedButton setIsPanelOpen={setIsPanelOpen} />
      )}
      {isPanelOpen && (
        <ControlPanel
          setIsPanelOpen={setIsPanelOpen}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
      <InfoPanel viewMode={viewMode} meshCount={meshCount} />
      <Canvas
        shadows
        camera={{ position: [0, .5, 1.5], fov: 50 }}
        style={{ width: '100%', height: '100vh' }}
        gl={{ antialias: false, stencil: false, depth: false }}
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-bias={-0.0001} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#204060" />
          
          <AnatomyModel viewMode={viewMode} setMeshCount={setMeshCount} />
          
          <EffectComposer enableNormalPass>
            <SSAO radius={0.1} intensity={10} luminanceInfluence={0.5} color={undefined} />
            <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.5} />
            <ToneMapping />
          </EffectComposer>

          <OrbitControls
            target={[0, .3, 1]}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={.1}
            maxDistance={20}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </main>
  );
}
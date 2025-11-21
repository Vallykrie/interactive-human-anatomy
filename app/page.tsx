'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
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
    <main className="relative w-full h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
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
        camera={{ position: [0, .5, 1.5], fov: 50 }}
        style={{ width: '100%', height: '100vh' }}
        onCreated={({ gl }) => { gl.setClearColor('#0a0a0a'); }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
          <Environment preset="city" />
          <AnatomyModel viewMode={viewMode} setMeshCount={setMeshCount} />
          <gridHelper args={[20, 20, '#3b82f6', '#1e293b']} position={[0, 0, 0]} />
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
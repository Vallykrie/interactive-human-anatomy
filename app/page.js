'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

function AnatomyModel({ viewMode, setMeshCount }) {
  const all = useGLTF('/models/female-anatomy.glb');
  const skin = useGLTF('/models/skin.glb');
  const muscle = useGLTF('/models/muscle.glb');
  const skeleton = useGLTF('/models/skeleton.glb');

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

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium">Loading 3D Models...</p>
      </div>
    </Html>
  );
}

function InfoPanel({ viewMode, meshCount }) {
  const getModelInfo = () => {
    switch(viewMode) {
      case 'skin': return { emoji: '👤', name: 'Skin/Body', color: 'bg-pink-500' };
      case 'muscle': return { emoji: '💪', name: 'Muscles', color: 'bg-red-500' };
      case 'skeleton': return { emoji: '🦴', name: 'Skeleton', color: 'bg-gray-400' };
      default: return { emoji: '🔍', name: 'All Models', color: 'bg-blue-500' };
    }
  };

  const info = getModelInfo();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full md:rounded-xl shadow-2xl border border-white/10 z-20 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 ${info.color} rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></div>
        <div>
          <div className="text-sm font-semibold flex items-center gap-2">
            <span>{info.emoji}</span> {info.name}
          </div>
          <div className="text-[10px] text-gray-300 uppercase tracking-wider">
            {meshCount} part{meshCount !== 1 ? 's' : ''} visible
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [viewMode, setViewMode] = useState('all');
  const [meshCount, setMeshCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State for visibility

  const buttons = [
    { id: 'all', label: 'All Models', emoji: '🔍', gradient: 'from-blue-600 to-blue-700' },
    { id: 'skin', label: 'Skin/Body', emoji: '👤', gradient: 'from-pink-600 to-pink-700' },
    { id: 'muscle', label: 'Muscles', emoji: '💪', gradient: 'from-red-600 to-red-700' },
    { id: 'skeleton', label: 'Skeleton', emoji: '🦴', gradient: 'from-gray-600 to-gray-700' },
  ];

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
      {/* --- MINIMIZED BUTTON (Visible only when panel is closed) --- */}
      {!isPanelOpen && (
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-xl shadow-lg hover:bg-white/20 transition-all active:scale-95 border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* --- CONTROL PANEL (Visible only when panel is open) --- */}
      {isPanelOpen && (
        <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 
                        w-[calc(100%-2rem)] md:w-80 max-h-[85vh] overflow-y-auto scrollbar-hide 
                        transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-5">
          
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">Anatomy</h2>
                  <p className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">Viewer</p>
                </div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setIsPanelOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Buttons */}
            <div className="space-y-2">
              {buttons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setViewMode(btn.id)}
                  className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform ${
                    viewMode === btn.id
                      ? `bg-gradient-to-r ${btn.gradient} text-white shadow-lg scale-[1.02] ring-1 ring-white/50`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{btn.emoji}</span>
                      <span>{btn.label}</span>
                    </span>
                    {viewMode === btn.id && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Controls Info - Hidden on very small screens if needed, or just scrollable */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                Navigation
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <span><strong>Drag</strong> to rotate</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-2m0 0H9m2 0v2m0-2V8" />
                    </svg>
                  </div>
                  <span><strong>Scroll</strong> to zoom</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <span><strong>Right Click + Drag</strong> to pan view</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Info Panel - Made responsive */}
      <InfoPanel viewMode={viewMode} meshCount={meshCount} />

      {/* 3D Canvas */}
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

useGLTF.preload('/models/skin.glb');
useGLTF.preload('/models/muscle.glb');
useGLTF.preload('/models/skeleton.glb');
useGLTF.preload('/models/female-anatomy.glb');
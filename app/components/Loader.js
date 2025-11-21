'use client';

import { Html } from '@react-three/drei';

export default function Loader() {
    return (
        <Html center>
            <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-medium">Loading 3D Models...</p>
            </div>
        </Html>
    );
}

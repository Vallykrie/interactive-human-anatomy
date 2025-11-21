'use client';

type ViewMode = 'all' | 'skin' | 'muscle' | 'skeleton';

interface InfoPanelProps {
    viewMode: ViewMode;
    meshCount: number;
}

export default function InfoPanel({ viewMode, meshCount }: InfoPanelProps) {
    const getModelInfo = () => {
        switch (viewMode) {
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

'use client';

type ViewMode = 'all' | 'skin' | 'muscle' | 'skeleton';

interface ControlPanelProps {
    setIsPanelOpen: (isOpen: boolean) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

export default function ControlPanel({ setIsPanelOpen, viewMode, setViewMode }: ControlPanelProps) {
    const buttons: { id: ViewMode; label: string; emoji: string; gradient: string }[] = [
        { id: 'all', label: 'All Models', emoji: '🔍', gradient: 'from-blue-600 to-blue-700' },
        { id: 'skin', label: 'Skin/Body', emoji: '👤', gradient: 'from-pink-600 to-pink-700' },
        { id: 'muscle', label: 'Muscles', emoji: '💪', gradient: 'from-red-600 to-red-700' },
        { id: 'skeleton', label: 'Skeleton', emoji: '🦴', gradient: 'from-gray-600 to-gray-700' },
    ];

    return (
        <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10
                    w-[calc(100%-2rem)] md:w-80 max-h-[85vh] overflow-y-auto scrollbar-hide 
                    transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-5">

            <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
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
                            className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform ${viewMode === btn.id
                                ? `bg-linear-to-r ${btn.gradient} text-white shadow-lg scale-[1.02] ring-1 ring-white/50`
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

                {/* Controls Info */}
                <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        Navigation
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                            </div>
                            <span><strong>Drag</strong> to rotate</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-2m0 0H9m2 0v2m0-2V8" />
                                </svg>
                            </div>
                            <span><strong>Scroll</strong> to zoom</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center shrink-0">
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
    );
}

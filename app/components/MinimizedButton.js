'use client';

export default function MinimizedButton({ setIsPanelOpen }) {
    return (
        <button
            onClick={() => setIsPanelOpen(true)}
            className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-xl shadow-lg hover:bg-white/20 transition-all active:scale-95 border border-white/10"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    );
}

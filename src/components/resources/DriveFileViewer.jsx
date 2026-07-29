import React, { useRef } from 'react';

function DriveFileViewer({ file, onClose }) {
  const containerRef = useRef(null);

  // ✅ Add parameters to hide the toolbar and popout button
  const previewUrl = `https://drive.google.com/file/d/${file.id}/preview?embedded=true&rm=embedded`;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: 'contain' }} // prevents page scroll when zooming inside the viewer
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-2xl z-20 transition-colors"
        >
          ✕
        </button>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-3 right-16 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl z-20 transition-colors"
          title="Toggle fullscreen"
        >
          ⛶
        </button>

        {/* File info */}
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
          <p className="text-sm font-semibold text-gray-700 truncate">{file.name}</p>
        </div>

        {/* Viewer */}
        <div className="w-full h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <iframe
            src={previewUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={file.name}
            frameBorder="0"
            referrerPolicy="origin"
          />
        </div>
      </div>
    </div>
  );
}

export default DriveFileViewer;
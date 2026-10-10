import React, { useState, useEffect } from 'react';

function AnnouncementImageModal({ isOpen, onClose, image }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Reset states when a new image is opened
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, image?.imageUrl]);

  // Keyboard navigation: Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !image?.imageUrl) return null;

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 3.5));
    } else {
      setZoom((prev) => {
        const next = Math.max(prev - 0.2, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartPos({ ...position });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setPosition({
      x: startPos.x + deltaX,
      y: startPos.y + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-all duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white border-2 border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base sm:text-lg">🖼️</span>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
              {image.title || 'Announcement Image'}
            </h3>
            {image.category && (
              <span className="hidden sm:inline-block text-[10px] font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full border border-gray-300">
                {image.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border-2 border-gray-800 bg-white hover:bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-900 shadow-xs active:scale-95 transition-all"
              aria-label="Close"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          className="flex-1 relative overflow-hidden bg-neutral-950 flex items-center justify-center min-h-[300px] sm:min-h-[400px] max-h-[76vh] p-2 sm:p-4 select-none"
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-neutral-950/90">
              <div className="w-8 h-8 border-3 border-gray-400 border-t-white rounded-full animate-spin"></div>
              <p className="text-gray-300 text-xs mt-2 font-medium">Loading image...</p>
            </div>
          )}

          <img
            src={image.imageUrl}
            alt={image.title || 'Announcement'}
            className="max-h-[70vh] sm:max-h-[72vh] max-w-full w-auto h-auto object-contain select-none block"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            draggable={false}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-900/90 border border-neutral-700 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-lg z-20">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="w-6 h-6 flex items-center justify-center text-base hover:text-gray-300 disabled:opacity-30 disabled:hover:text-white transition-colors"
              title="Zoom out"
            >
              −
            </button>
            <span
              onClick={resetZoom}
              className="cursor-pointer hover:underline text-[11px] font-mono min-w-[40px] text-center"
              title="Click to reset zoom"
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3.5}
              className="w-6 h-6 flex items-center justify-center text-base hover:text-gray-300 disabled:opacity-30 disabled:hover:text-white transition-colors"
              title="Zoom in"
            >
              +
            </button>
            {zoom > 1 && (
              <button
                onClick={resetZoom}
                className="ml-1 text-[11px] text-gray-400 hover:text-white transition-colors"
                title="Reset zoom"
              >
                ⟲
              </button>
            )}
          </div>
        </div>

        <div className="bg-white border-t-2 border-gray-800 px-4 py-2 flex items-center justify-between text-xs text-gray-600 flex-shrink-0">
          <div className="flex items-center gap-2 truncate">
            {image.sender && (
              <span className="font-semibold text-gray-800">
                👤 {image.sender}
              </span>
            )}
            {image.timeAgo && (
              <span>&middot; {image.timeAgo}</span>
            )}
          </div>
          <span className="hidden sm:inline text-[11px] text-gray-400">
            Double-click or scroll to zoom &middot; Drag to pan
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementImageModal;

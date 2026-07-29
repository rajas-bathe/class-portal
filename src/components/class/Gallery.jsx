import React, { useState, useEffect, useRef } from 'react';
import VideoEmbed from './VideoEmbed'; // ✅ same folder

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // ✅ loading state for image transitions
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  // ✅ Preload tracking
  const preloadedUrls = useRef(new Set());

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
      const FOLDER_ID = import.meta.env.VITE_GALLERY_FOLDER_ID;

      if (!API_KEY || !FOLDER_ID) {
        throw new Error('API Key or Folder ID missing.');
      }

      const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webContentLink,thumbnailLink,createdTime)&orderBy=createdTime%20desc`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const mediaFiles = data.files.filter(file =>
        file.mimeType.startsWith('image/') || file.mimeType.startsWith('video/')
      );

      setImages(mediaFiles);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index].id);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsImageLoading(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsImageLoading(false);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].id);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsImageLoading(true);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].id);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsImageLoading(true);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.3, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.3, 1));
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(prev + 0.3, 4));
    } else {
      setZoom(prev => Math.max(prev - 0.3, 1));
    }
  };

  const handleMouseDown = (e) => {
    if (images[currentIndex]?.mimeType?.startsWith('video/')) return;
    if (zoom <= 1) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartPos({ x: position.x, y: position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPosition({
      x: startPos.x + dx,
      y: startPos.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '=' || e.key === '+') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === 'r' || e.key === 'R') resetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  // ✅ Preload adjacent images (2 before, 2 after)
  const preloadImages = (imageList) => {
    imageList.forEach((img) => {
      if (!img || img.mimeType?.startsWith('video/')) return;
      const url = getHighResImageUrl(img);
      if (!url || preloadedUrls.current.has(url)) return;
      preloadedUrls.current.add(url);
      const preloadImg = new Image();
      preloadImg.src = url;
    });
  };

  useEffect(() => {
    if (images.length === 0 || selectedImage === null) return;
    const toPreload = [];
    for (let i = Math.max(0, currentIndex - 2); i <= Math.min(images.length - 1, currentIndex + 2); i++) {
      if (i !== currentIndex) {
        toPreload.push(images[i]);
      }
    }
    preloadImages(toPreload);
  }, [currentIndex, images, selectedImage]);

  const getThumbnailUrl = (img) => {
    if (img.mimeType.startsWith('video/')) {
      if (img.thumbnailLink) {
        const thumbUrl = img.thumbnailLink.replace(/^http:/, 'https:');
        return `https://images.weserv.nl/?url=${encodeURIComponent(thumbUrl)}&w=400&h=400&fit=cover`;
      }
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"%3E%3Crect x="2" y="2" width="20" height="20" rx="2"/%3E%3Cpolygon points="10,6 18,12 10,18"/%3E%3C/svg%3E';
    }

    let url;
    if (img.webContentLink) {
      url = img.webContentLink;
    } else if (img.thumbnailLink) {
      url = img.thumbnailLink.replace(/^http:/, 'https:');
    } else {
      url = `https://drive.google.com/uc?export=view&id=${img.id}`;
    }
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&h=400&fit=cover`;
  };

  const getHighResImageUrl = (img) => {
    if (!img) return '';
    let url;
    if (img.webContentLink) {
      url = img.webContentLink;
    } else if (img.thumbnailLink) {
      url = img.thumbnailLink.replace(/^http:/, 'https:');
    } else {
      url = `https://drive.google.com/uc?export=view&id=${img.id}`;
    }
    // ✅ High quality, no resizing, WebP format (smaller & crisp)
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&q=100&output=webp`;
  };

  const handleLightboxError = (e) => {
    const img = e.target;
    const fileId = img.dataset.fileid;
    if (!img.dataset.retried) {
      img.dataset.retried = 'true';
      const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      img.src = directUrl;
    }
    setIsImageLoading(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
        <p className="text-red-600 font-medium">⚠️ Failed to load gallery</p>
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={fetchGalleryImages}
          className="mt-3 bg-gray-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-gray-900"
        >
          Retry
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-8 text-center">
        <p className="text-4xl mb-2">📷</p>
        <p className="text-gray-500 font-medium">No images in the gallery yet</p>
        <p className="text-sm text-gray-400">Upload photos to the Google Drive folder</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{images.length} {images.length === 1 ? 'photo' : 'photos'}</span>
          <button
            onClick={fetchGalleryImages}
            className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, index) => {
            const thumbnailUrl = getThumbnailUrl(img);

            return (
              <div
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group bg-white border-2 border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={thumbnailUrl}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      if (!img.mimeType.startsWith('video/')) {
                        e.target.onerror = null;
                        const directUrl = `https://drive.google.com/uc?export=view&id=${img.id}`;
                        e.target.src = directUrl;
                      } else {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"%3E%3Crect x="2" y="2" width="20" height="20" rx="2"/%3E%3Cpolygon points="10,6 18,12 10,18"/%3E%3C/svg%3E';
                      }
                    }}
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate">{img.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#141414] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
              <div className="text-gray-300 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium pointer-events-auto">
                {currentIndex + 1} / {images.length}
              </div>
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={resetZoom}
                  className="text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm transition-all"
                  title="Reset zoom"
                >
                  ⟲
                </button>
                <button
                  onClick={closeLightbox}
                  className="text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-xl transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Previous / Next */}
            {images.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-3xl z-30 transition-all"
              >
                ‹
              </button>
            )}
            {images.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-3xl z-30 transition-all"
              >
                ›
              </button>
            )}

            {/* Media */}
            <div
              className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center"
              onWheel={handleWheel}
              onDoubleClick={resetZoom}
            >
              {images[currentIndex]?.mimeType?.startsWith('video/') ? (
                <VideoEmbed
                  fileId={images[currentIndex].id}
                  fileName={images[currentIndex].name}
                />
              ) : (
                <>
                  {/* ✅ Loading overlay */}
                  {isImageLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-gray-300 text-sm mt-3">Loading image...</p>
                    </div>
                  )}
                  <img
                    data-fileid={images[currentIndex].id}
                    src={getHighResImageUrl(images[currentIndex])}
                    style={{
                      transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                      cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                      transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    }}
                    className="w-full h-full object-contain select-none"
                    alt="Full resolution preview"
                    draggable="false"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onLoad={() => setIsImageLoading(false)}
                    onError={handleLightboxError}
                  />
                </>
              )}
            </div>

            {/* Zoom Controls */}
            {!images[currentIndex]?.mimeType?.startsWith('video/') && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2 py-1.5 rounded-full z-30 border border-gray-700 shadow-lg">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 w-8 h-8 flex items-center justify-center text-2xl font-light transition-colors"
                >
                  −
                </button>
                <div
                  className="text-gray-300 text-xs font-medium w-12 text-center cursor-pointer hover:text-white transition-colors"
                  onClick={resetZoom}
                  title="Reset zoom"
                >
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 4}
                  className="text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 w-8 h-8 flex items-center justify-center text-2xl font-light transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
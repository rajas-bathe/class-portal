import React, { useState, useEffect } from 'react';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

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

      const imageFiles = data.files.filter(file =>
        file.mimeType.startsWith('image/')
      );

      setImages(imageFiles);
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
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
    setZoom(1);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].id);
    setZoom(1);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].id);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '=' || e.key === '+') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

// ✅ Thumbnail: proxy via images.weserv.nl (resized to 400px to save bandwidth)
const getThumbnailUrl = (img) => {
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

// ✅ Lightbox: proxy via images.weserv.nl (full size)
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
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
};

  // Fallback: if lightbox image fails (proxy down), try direct URL
  const handleLightboxError = (e) => {
    const img = e.target;
    const fileId = img.dataset.fileid;
    if (!img.dataset.retried) {
      img.dataset.retried = 'true';
      const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      img.src = directUrl;
    }
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
                      // Fallback for thumbnail: try direct download if needed
                      e.target.onerror = null;
                      const directUrl = `https://drive.google.com/uc?export=view&id=${img.id}`;
                      e.target.src = directUrl;
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
              <button
                onClick={closeLightbox}
                className="text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-xl transition-all pointer-events-auto"
              >
                ✕
              </button>
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

            {/* Image with zoom */}
            <div 
              className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center cursor-zoom-in"
              onWheel={handleWheel}
              onDoubleClick={() => zoom > 1 ? setZoom(1) : setZoom(2)}
            >
              <img
                data-fileid={images[currentIndex].id}
                src={getHighResImageUrl(images[currentIndex])}
                style={{ transform: `scale(${zoom})` }}
                className="w-full h-full object-contain transition-transform duration-300 ease-out"
                alt="Full resolution preview"
                draggable="false"
                onError={handleLightboxError}
              />
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2 py-1.5 rounded-full z-30 border border-gray-700 shadow-lg">
              <button 
                onClick={handleZoomOut} 
                disabled={zoom <= 1}
                className="text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 w-8 h-8 flex items-center justify-center text-2xl font-light transition-colors"
              >
                −
              </button>
              
              <div className="text-gray-300 text-xs font-medium w-12 text-center cursor-pointer hover:text-white" onClick={() => setZoom(1)} title="Reset zoom">
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

          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
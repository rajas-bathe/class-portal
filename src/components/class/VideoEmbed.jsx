import React, { useState, useEffect, useRef } from 'react';

function VideoEmbed({ fileId, fileName }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(directUrl)}`;
    setVideoUrl(proxyUrl);

    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [fileId]);

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const retry = () => {
    setHasError(false);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-black/20 rounded-xl p-4 text-center">
        <p className="text-gray-300 text-sm mb-2">⚠️ Video unavailable</p>
        <p className="text-gray-400 text-xs mb-4">Try downloading or opening in Drive</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={`https://drive.google.com/file/d/${fileId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            📥 Open in Drive
          </a>
          <a
            href={`https://drive.google.com/uc?export=download&id=${fileId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            ⬇️ Download Video
          </a>
          <button
            onClick={retry}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-gray-400 text-xs">Loading video...</span>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default VideoEmbed;
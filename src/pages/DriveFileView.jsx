import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDrive } from '../hooks/useDrive';

function DriveFileView() {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const location = useLocation();

  // Get folder ID from navigation state or fallback to .env
  const folderId = location.state?.fromFolderId || import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

  // Fetch all files in the folder (for navigation)
  const { items, loading: folderLoading, error: folderError } = useDrive(folderId, galleryFolderId);
  const [file, setFile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // When items load, find the current file and its index
  useEffect(() => {
    if (!folderLoading && items.files.length > 0 && fileId) {
      const files = items.files;
      const idx = files.findIndex(f => f.id === fileId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setFile(files[idx]);
      } else {
        // File not in this folder – fallback to fetching its metadata directly
        const fetchFile = async () => {
          try {
            const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
            const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}&fields=id,name,mimeType`);
            const data = await resp.json();
            if (!data.error) setFile(data);
          } catch (e) {
            console.error('Failed to fetch file metadata', e);
          }
        };
        fetchFile();
      }
    }
  }, [folderLoading, items, fileId]);

  // Update file when items change
  useEffect(() => {
    if (!folderLoading && items.files.length > 0 && fileId) {
      const files = items.files;
      const idx = files.findIndex(f => f.id === fileId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setFile(files[idx]);
      }
    }
  }, [items, fileId, folderLoading]);

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevFile = items.files[currentIndex - 1];
      navigate(`/resources/drive/file/${prevFile.id}`, { state: { fromFolderId: folderId } });
    }
  };

  const goToNext = () => {
    if (currentIndex < items.files.length - 1) {
      const nextFile = items.files[currentIndex + 1];
      navigate(`/resources/drive/file/${nextFile.id}`, { state: { fromFolderId: folderId } });
    }
  };

  // Loading state
  if (folderLoading || !file) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading file...</p>
        </div>
      </div>
    );
  }

  if (folderError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">⚠️ Failed to load folder</p>
          <p className="text-sm">{folderError}</p>
          <button
            onClick={() => navigate(`/resources/drive/${folderId}`)}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            ← Back to Drive
          </button>
        </div>
      </div>
    );
  }

  const totalFiles = items.files.length;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?embedded=true&rm=embedded`;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Header with Back, File name, Navigation */}
      <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-200 shadow-sm flex-shrink-0 flex-wrap">
        <button
          onClick={() => navigate(`/resources/drive/${folderId}`)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          ← Back
        </button>
        <h1 className="text-base font-semibold text-gray-800 truncate flex-1 min-w-0">{file.name}</h1>
        {totalFiles > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={goToPrev}
              disabled={currentIndex <= 0}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg"
              aria-label="Previous file"
            >
              ‹
            </button>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {currentIndex + 1} / {totalFiles}
            </span>
            <button
              onClick={goToNext}
              disabled={currentIndex >= totalFiles - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg"
              aria-label="Next file"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Viewer – full height, no scroll on page */}
      <div className="flex-1 overflow-hidden" style={{ overscrollBehavior: 'contain' }}>
        <iframe
          src={previewUrl}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={file.name}
          frameBorder="0"
          referrerPolicy="origin"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}

export default DriveFileView;
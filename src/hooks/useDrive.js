import { useState, useEffect } from 'react';

export function useDrive(folderId, excludeFolderId = null) {
  const [items, setItems] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriveContents = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
        if (!API_KEY) throw new Error('Drive API key missing in .env');
        if (!folderId) throw new Error('Folder ID missing');

        const query = `'${folderId}' in parents and trashed = false`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${API_KEY}&fields=files(id,name,mimeType,webContentLink,thumbnailLink,createdTime)&orderBy=name`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        let filtered = data.files || [];
        if (excludeFolderId) {
          filtered = filtered.filter(f => f.id !== excludeFolderId);
        }

        const folders = filtered.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
        const files = filtered.filter(f => f.mimeType !== 'application/vnd.google-apps.folder');

        setItems({ folders, files });
      } catch (err) {
        console.error('Drive fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (folderId) {
      fetchDriveContents();
    }
  }, [folderId, excludeFolderId]);

  return { items, loading, error };
}
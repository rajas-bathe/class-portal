import { useState, useEffect } from 'react';

// A folder is "pinned" (always shown first, in your app only) by starting
// its name in Google Drive with this marker, e.g. "▲Class Schedule" or
// "▲ Class Schedule". The marker — and any space right after it — is
// stripped before the name is shown anywhere in the app, so students never
// see it; it only affects sort order.
const PIN_MARKER = '▲';

function parsePin(name) {
  if (typeof name !== 'string' || !name.startsWith(PIN_MARKER)) {
    return { pinned: false, displayName: name };
  }
  const stripped = name.slice(PIN_MARKER.length).replace(/^\s+/, '');
  return { pinned: true, displayName: stripped };
}

// Pinned items first (their relative order preserved), then everything
// else in whatever order it already arrived in (currently alphabetical,
// per the Drive API's orderBy=name).
function sortWithPinsFirst(items) {
  const pinned = items.filter((item) => item.pinned);
  const rest = items.filter((item) => !item.pinned);
  return [...pinned, ...rest];
}

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

        // Parse the pin marker out of every item's name up front, so
        // downstream code (and every consumer of this hook) always sees
        // a clean display name plus a `pinned` flag — never the raw marker.
        const withPinInfo = filtered.map((item) => {
          const { pinned, displayName } = parsePin(item.name);
          return { ...item, name: displayName, pinned };
        });

        const folders = sortWithPinsFirst(
          withPinInfo.filter(f => f.mimeType === 'application/vnd.google-apps.folder')
        );
        const files = sortWithPinsFirst(
          withPinInfo.filter(f => f.mimeType !== 'application/vnd.google-apps.folder')
        );

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
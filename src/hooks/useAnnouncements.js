import { useState, useEffect } from 'react';

export function useAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY; // reuse the same key
        const SHEET_ID = import.meta.env.VITE_ANNOUNCEMENTS_SHEET_ID; // new env var
        
        if (!SHEET_ID) {
          throw new Error('Sheet ID missing in .env');
        }

        // Use the Sheets API to get data in JSON format
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        // The first row is the header
        const rows = data.values;
        if (!rows || rows.length < 2) {
          setItems([]);
          setLoading(false);
          return;
        }

        const headers = rows[0]; // ["id", "sender", "avatar", ...]
        const dataRows = rows.slice(1);

        const announcements = dataRows.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            let value = row[index] || '';
            // Convert "TRUE"/"FALSE" to boolean
            if (header === 'unread') {
              value = value.toLowerCase() === 'true' || value === 'TRUE' || value === '1';
            }
            // Convert "high"/"medium"/"low" to string
            obj[header] = value;
          });
          return obj;
        });

        setItems(announcements);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const markAsRead = (id) => {
    setItems(prev => prev.map(item => 
      item.id == id ? { ...item, unread: false } : item
    ));
  };

  return { items, loading, error, markAsRead };
}
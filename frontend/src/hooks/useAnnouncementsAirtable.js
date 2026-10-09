import { useState, useEffect } from 'react';

export function useAnnouncementsAirtable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
        const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

        if (!API_KEY || !BASE_ID) {
          throw new Error('Airtable credentials missing in .env');
        }

        // ✅ Fetch all records (without sorting in the query)
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        const records = data.records.map((record) => {
          const fields = record.fields;

          // Check common attachment field names (Upload, Attachments, Image, etc.)
          const attachmentField = fields.Upload || fields.upload || fields.Attachments || fields.attachments || fields.Attachment || fields.attachment || fields.Image || fields.image || fields.Photo || fields.photo;
          const imageUrl = Array.isArray(attachmentField) && attachmentField.length > 0
            ? attachmentField[0].url
            : (typeof attachmentField === 'string' ? attachmentField : '');

          const title = fields.Title || fields.title || fields.Question || fields.question || 'Untitled';
          const message = fields.Message || fields.message || fields.Body || fields.body || '';
          const sender = fields.Sender || fields.sender || fields.Author || fields.author || 'Admin';
          const category = fields.Category || fields.category || 'General';
          const priority = fields.Priority || fields.priority || 'Medium';
          const time = record.createdTime || new Date().toISOString();

          return {
            id: record.id,
            title,
            message,
            body: message,
            sender,
            author: sender,
            category,
            priority,
            time,
            createdAt: time,
            imageUrl,
            image: imageUrl,
          };
        });

        // ✅ Sort on frontend: newest first
        const sorted = records.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });

        setItems(sorted);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return { items, loading, error };
}
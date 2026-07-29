import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AnnouncementsAdmin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
  const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
  const IMGUR_CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

  // ⚠️ CHANGE THIS PASSWORD!
  const ADMIN_PASSWORD = 'classportal123';

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`);
      const data = await res.json();
      if (data.record) setItems(data.record);
      else setItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAnnouncements();
  }, [isAuthenticated]);

  const saveToBin = async (list) => {
    try {
      setLoading(true);
      setStatus('Saving...');
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
          'X-Bin-Name': 'announcements',
        },
        body: JSON.stringify(list),
      });
      if (res.ok) {
        setStatus('✅ Saved successfully!');
        await fetchAnnouncements();
        clearForm();
      } else {
        setStatus('❌ Error saving');
      }
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      setStatus('⚠️ Please select an image first');
      return;
    }
    try {
      setStatus('📤 Uploading image...');
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.link);
        setStatus('✅ Image uploaded!');
      } else {
        setStatus('❌ Image upload failed');
      }
    } catch (err) {
      setStatus('❌ Error uploading image');
    }
  };

  const clearForm = () => {
    setTitle('');
    setMessage('');
    setSender('');
    setCategory('General');
    setPriority('Medium');
    setImageUrl('');
    setEditingId(null);
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setStatus('⚠️ Title and message are required');
      return;
    }
    let updatedList = [...items];
    if (editingId) {
      const index = updatedList.findIndex((item) => item.id === editingId);
      if (index !== -1) {
        updatedList[index] = {
          ...updatedList[index],
          title: title.trim(),
          message: message.trim(),
          sender: sender.trim() || 'Admin',
          category,
          priority,
          imageUrl: imageUrl.trim(),
        };
      }
    } else {
      const newItem = {
        id: 'ann_' + Date.now(),
        title: title.trim(),
        message: message.trim(),
        sender: sender.trim() || 'Admin',
        category,
        priority,
        imageUrl: imageUrl.trim(),
        time: new Date().toISOString(),
        unread: true,
        color: priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'blue',
        avatar: '📢',
      };
      updatedList = [newItem, ...updatedList];
    }
    saveToBin(updatedList);
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setMessage(item.message);
    setSender(item.sender);
    setCategory(item.category);
    setPriority(item.priority);
    setImageUrl(item.imageUrl || '');
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this announcement?')) return;
    const updatedList = items.filter((item) => item.id !== id);
    saveToBin(updatedList);
  };

  // --- LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl border-2 border-gray-800 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">🔐 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-gray-800 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && password === ADMIN_PASSWORD && setIsAuthenticated(true)}
          />
          <button
            onClick={() => {
              if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
              else alert('Wrong password!');
            }}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // --- ADMIN PANEL ---
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between border-b-2 border-gray-800 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">📢 Announcements Admin</h1>
        <button
          onClick={() => navigate('/announcements')}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          View Public Page →
        </button>
      </div>

      {status && (
        <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Message *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement..."
            rows="4"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Sender</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g., Hackathon Cell"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            >
              <option>Hackathon</option><option>Club</option><option>Placement</option>
              <option>Sports</option><option>Exam</option><option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            >
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://i.imgur.com/abc.jpg"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-sm text-gray-500"
          />
          <button
            type="button"
            onClick={uploadImage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            📷 Upload to Imgur
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
          >
            {editingId ? '✏️ Update' : '📤 Post'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">
          📋 All Announcements ({items.length})
        </h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">No announcements yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-gray-800 transition flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{item.sender || 'Admin'}</span>
                  <span className="text-xs text-gray-400">
                    {item.time ? new Date(item.time).toLocaleDateString() : ''}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.priority === 'High' ? 'bg-red-100 text-red-700' :
                    item.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.message}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt="Announcement" className="mt-2 max-h-24 rounded border border-gray-200" />
                )}
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(item)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">✏️ Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:text-red-800 font-medium">🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AnnouncementsAdmin;
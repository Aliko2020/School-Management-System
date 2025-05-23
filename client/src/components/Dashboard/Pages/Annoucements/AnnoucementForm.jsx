import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAnnouncementForm = ({ onAdded }) => {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [classId, setClassId] = useState('');
  const [charVisible, setCharVisible] = useState(false)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setRole(userInfo.role);
      setUserId(userInfo.user_id || userInfo.id || null);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (title.trim().length < 3) {
      alert('Title must be at least 3 characters.');
      return;
    }

    if (content.trim().length > 280) {
      alert('Content must not exceed 280 characters.');
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const payload = {
        title: title.trim(),
        content: content.trim(),
        user_id: userId,
      };

      if (role === 'teacher') {
        payload.class_id = classId || null;
      }

      await axios.post(
        'http://localhost:3000/api/announcements',
        payload,
        {
          headers: {
            Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
          },
        }
      );

      alert('Announcement added!');
      setTitle('');
      setContent('');
      setClassId('');
      setCharVisible(false);

      if (onAdded) onAdded();
    } catch (error) {
      console.error('Failed to add announcement:', error);
      alert('Error adding announcement.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">Add Announcement</h3>

      <div className="flex gap-4  items-center flex-wrap">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-grow min-w-[150px] border px-3 py-2 rounded focus:outline-none"
        />

        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => {
            const value = e.target.value.slice(0, 280);
            setContent(value);
            setCharVisible(value.length > 0); 
          }}
          required
          className="flex-grow min-w-[250px] border px-3 py-2 rounded focus:outline-none"
        />
        {charVisible && (
          <small className="text-sm text-gray-500">
            {280 - content.length} characters left
          </small>
        )}



        {role === 'teacher' && (
          <input
            type="number"
            placeholder="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-28 border px-3 py-2 rounded focus:outline-none"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddAnnouncementForm;

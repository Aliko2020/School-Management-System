import React, { useEffect, useState } from 'react';
import { classes } from './classData';
import { MdManageAccounts } from "react-icons/md";

const AnnouncementsTable = ({ announcements }) => {
  const [role, setRole] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('all');
  const [userClassId, setUserClassId] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setRole(userInfo.role);
      if (userInfo.class_id) {
        setUserClassId(userInfo.class_id);
      }
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this announcement?")) {
      console.log(`Deleting announcement ${id}`);
      // API call here
    }
  };

  const handleClassChange = (e) => {
    setSelectedClassId(e.target.value);
  };

  const filteredAnnouncements =
    role === 'admin'
      ? (selectedClassId === 'all'
        ? announcements
        : announcements.filter(a => a.class_id === Number(selectedClassId)))
      : announcements.filter(a => a.class_id === userClassId);

  return (
    <div className="">
      {role === 'admin' && (
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 items-center text-primary'>
            <MdManageAccounts size={20} />
            <h2 className='text-lg font-simibold'>Manage Annoucements</h2>
          </div>

          <div className='flex justify-end items-center gap-2 mb-8 mt-4'>
            <label htmlFor="selectClass" className="font-medium">
              View By Class:
            </label>
            <select
              id="selectClass"
              className="border px-2 py-1 focus:outline-none rounded"
              value={selectedClassId}
              onChange={handleClassChange}
            >
              <option value="all">All Classes</option>
              {classes.map(c => (
                <option key={c.class_id} value={c.class_id}>
                  {c.class_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-primaryLight text-white text-start">
            <tr>
              <th className="border px-4 py-2 text-start">Title</th>
              <th className="border px-4 py-2 text-start">Content</th>
              <th className="border px-4 py-2 text-start">Created At</th>
              {(role === 'teacher' || role === 'admin') && (
                <th className="border px-4 py-2 text-start">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((a) => (
              <tr key={a.announcement_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{a.title}</td>
                <td className="border px-4 py-2">{a.content}</td>
                <td className="border px-4 py-2">
                  {new Date(a.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>
                {(role === 'teacher' || role === 'admin') && (
                  <td className="flex justify-end border px-2 py-4">
                    <button
                      onClick={() => handleDelete(a.announcement_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filteredAnnouncements.length === 0 && (
              <tr>
                <td colSpan={role === 'teacher' || role === 'admin' ? 4 : 3} className="text-center p-4">
                  No announcements found for this class.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnouncementsTable;

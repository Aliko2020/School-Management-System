import React, { useEffect, useState } from 'react';
import AddAnnouncementForm from './AnnoucementForm';





const AnnouncementsTable = ({ announcements }) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo?.role) {
            setRole(userInfo.role);
        }
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Delete this announcement?")) {
            setAnnouncements((prev) =>
                prev.filter((a) => a.announcement_id !== id)
            );
            // API call to delete from backend
        }
    };

    const handleAdd = () => {
        setAddAnnoucVisible(()=>!addAnnouVisible)
        

    };

    return (
        <div className="">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-start">
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
                        {announcements.map((a) => (
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnouncementsTable;

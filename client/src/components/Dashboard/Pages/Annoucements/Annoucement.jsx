import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import AnnouncementsTable from './AnnoucementTable'
import AddAnnouncementForm from './AnnoucementForm'

const Annoucement = () => {
  const [announcements, setAnnoucements] = useState([])
  const [role, setRole] = useState('')

  const fetchAnnouncements = useCallback(async () => {
    const token = localStorage.getItem('userToken')
    try {
      const response = await axios.get('http://localhost:3000/api/announcements', {
        headers: {
          Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
        },
      })
      setAnnoucements(response.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }, [])

  useEffect(() => {
    fetchAnnouncements()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo?.role) {
      setRole(userInfo.role)
    }
  }, [fetchAnnouncements])

  return (
    <div className='mt-8 p-4'>
      <AnnouncementsTable announcements={announcements} />
      {(role === 'admin' || role === 'teacher') && (
        <AddAnnouncementForm onAdded={fetchAnnouncements} />
      )}
    </div>
  )
}

export default Annoucement

import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import AnnouncementsTable from './AnnoucementTable'
import AddAnnouncementForm from './AnnoucementForm'


const Annoucement = () => {
  const [announcements, setAnnoucements] = useState([])

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
  }, [fetchAnnouncements])

  return (
    <div className='mt-8 p-4'>
      <AddAnnouncementForm onAdded={fetchAnnouncements} />
      <AnnouncementsTable announcements={announcements} />
    </div>
  )
}

export default Annoucement

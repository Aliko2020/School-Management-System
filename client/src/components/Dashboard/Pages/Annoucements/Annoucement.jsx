import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import AnnouncementsTable from './AnnoucementTable'
import AddAnnouncementForm from './AnnoucementForm'
import Loader from '../../../common/Loader'


const Annoucement = () => {
  const [loading, setLoading] = useState(false)
  const [announcements, setAnnoucements] = useState([])
  const [role, setRole] = useState('')

  const fetchAnnouncements = useCallback(async () => {
    const token = localStorage.getItem('userToken')
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3000/api/announcements', {
        headers: {
          Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
        },
      })
      setAnnoucements(response.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
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
    <div className='mt-14 p-4'>
      {loading? <Loader />  : <main>
        <AnnouncementsTable announcements={announcements} />
        {(role === 'admin' || role === 'teacher') && (
          <AddAnnouncementForm onAdded={fetchAnnouncements} />
        )}
      </main>}
    </div>
  )
}

export default Annoucement

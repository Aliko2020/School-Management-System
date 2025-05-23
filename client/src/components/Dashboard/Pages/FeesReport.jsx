import React, { useEffect, useState } from 'react'
import { fetchFeeReport } from '../../../api/studentServices'


const FeesReport = () => {
  const [FeesReport, setFeeReport] = useState([])


  useEffect(() => {
    const getFeeData = async () => {
      try {
        const data = await fetchFeeReport();
        setFeeReport(data);
      } catch (error) {
        console.error('Error fetching fees data:', error.message);
      }
    };
    getFeeData()
  }, [])

  
  
  return (
    <div>
      <h1>Fee REport</h1>
      <p>Amount Collected: Ghc {FeesReport.totalAmount}</p>
      <p>Number of student paid: {FeesReport.paidStudents}</p>
    </div>
  )
}

export default FeesReport
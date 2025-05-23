import { Link } from 'react-router-dom';
import event from '/assets/event.png';
import attend from '/assets/attend.png';
import overview from '/assets/overview.png';
import cedis from '/assets/cents.png';
import manager from '/assets/manager.png';
import managerT from '/assets/team-management.png';
import announcement from '/assets/annoucement.png';
import good from '/assets/good.png';


import { useEffect, useState } from 'react';
import { fetchFeeReport } from '@/api/studentServices';


const cardDetails = [
  {
    name: 'Fee Payment Overview',
    image: cedis,
    link: '/admin/fees',
  },
  {
    name: 'Exam Report',
    image: attend,
    link: '/admin/result',
  },
  {
    name: 'Performance Overview',
    image: overview,
    link: '/admin/performance',
  },
  {
    name: 'Events Overview',
    image: event,
    link: '/admin/events',
  },
  {
    name: 'Manage Students',
    image: managerT,
    link: '/admin/students',
  },
  {
    name: 'Manage Teachers',
    image: manager,
    link: '/admin/teachers',
  },
  {
    name: 'Manage Parents',
    image: good,
    link: '/admin/parents',
  },
  {
    name: 'Annoucements',
    image: announcement,
    link: '/admin/announcements',
  }
];

const Card = () => {
  const [feesReport, setFeeReport] = useState(null);

  useEffect(() => {
    const getFeeData = async () => {
      try {
        const data = await fetchFeeReport();
        setFeeReport(data);
      } catch (error) {
        console.error('Error fetching fees data:', error.message);
      }
    };
    getFeeData();
  }, []);

  return (
    <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cardDetails.map((card, index) => (
        <Link
          key={index}
          to={card.link}
          className="flex flex-col items-center gap-2 text-primary border border-gray-300 rounded-md p-3 w-full h-48"
        >
          <img className="w-20 h-20 object-contain mt-2" src={card.image} alt={card.name} />
          <h3 className="text-base font-semibold text-center">{card.name}</h3>
        </Link>
      ))}
    </div>

  );
};

export default Card;

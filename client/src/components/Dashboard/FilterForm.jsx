import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getClasses } from "@/api/classServices";
import { MdManageAccounts } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";




const FilterForm = ({ name, setName, onSearch }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await getClasses();
        setClasses(res.data);
      } catch (error) {
        console.error("Failed to load classes:", error);
      }
    };

    loadClasses();
  }, []);

  return (
    <div className="w-full flex gap-4 justify-between items-center mt-8">
      <div className='flex gap-1 items-center text-primary'>
        <MdManageAccounts size={20} />
        <h2 className='text-lg font-simibold'>Manage Students</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border border-gray-300 text-gray-500 p-2 rounded-md">
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="John Aliko ↵ "
            className="outline-none text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>


        <div className="flex items-center gap-4 text-gray-500">
          <select id="classSelect" className="outline-none p-2 rounded bg-white border border-gray-300">
            <option value="">View Class</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.class_name}
              </option>
            ))}
          </select>
        </div>
        <Link className="flex items-center gap-2 bg-primaryLight text-white  hover:bg-primary rounded-md py-2 px-4" to="/admin/students/enroll"><IoPersonAdd />Enroll Student</Link>
      </div>
    </div>
  );
};

export default FilterForm;

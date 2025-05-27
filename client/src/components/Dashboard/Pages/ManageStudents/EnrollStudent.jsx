import { useEffect, useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { createStudent } from "@/api/studentServices";
import { getClasses } from "@/api/classServices";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";



const EnrollStudent = () => {
  const [classOptions, setClassOptions] = useState([]);
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    studentClass: "",
    address: "",
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await getClasses();
        setClassOptions(res.data);
      } catch (err) {
        console.error("Failed to load classes", err);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedClass = classOptions.find(
      (cls) => cls.class_name === formData.studentClass
    );

    if (!selectedClass) {
      alert("Please select a valid class.");
      return;
    }

    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      dob: formData.dob,
      gender: formData.gender,
      studentClass: selectedClass.class_id,
      address: formData.address || null,
    };

    try {
      await createStudent(payload);
      setFormData({
        firstname: "",
        lastname: "",
        dob: "",
        gender: "",
        studentClass: "",
        address: "",
      });
      Navigate('/admin/students')
    } catch (err) {
      console.error("Failed to create student", err);
      toast.error("Failed to enroll student")
    }
  };

  return (
    <div className="min-h-screen flex max-w-7xl rounded-r-md items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex flex-col gap-6 items-center"
      >
        <div className="flex gap-1 w-full items-center text-primary">
          <IoIosPersonAdd size={20} />
          <h2 className="text-lg font-semibold">Enroll Student</h2>
        </div>

        <div className="w-full flex gap-10">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none bg-blue-50"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none bg-blue-50"
            />
          </div>
        </div>

        <div className="w-full flex items-center gap-8">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none bg-blue-50"
            />
          </div>

          <div className="w-full flex gap-8 items-center mt-8">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="accent-blue-500"
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="accent-pink-500"
              />
              Female
            </label>
          </div>
        </div>

        <div className="w-full flex flex-col gap-10">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="studentClass" className="block mb-1">
              Student Class
            </label>
            <select
              id="studentClass"
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none bg-blue-50"
            >
              <option value="">Select Class</option>
              {classOptions.map((cls) => (
                <option key={cls.class_id} value={cls.class_name}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="address">Student Address (Optional)</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border px-3 py-2 rounded focus:outline-none bg-blue-50"
            />
          </div>
        </div>

        <div className="w-full flex">
          <button
            type="submit"
            className="bg-primaryLight text-white rounded-md px-4 py-2 hover:bg-primary"
          >
            Enroll Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollStudent;

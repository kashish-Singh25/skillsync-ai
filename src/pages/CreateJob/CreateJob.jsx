import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateJob() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    skillsRequired: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/job/create",
        {
          company: form.company,
          title: form.title,
          description: form.description,
          location: form.location,
          salary: form.salary,
      
          // Backend expects "skills"
          skills: form.skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        

      alert("🎉 Job Posted Successfully");

      navigate("/hr/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Post Job"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[700px]">

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          🚀 Create New Job
        </h1>

        <input
          className="border p-3 rounded-xl w-full mb-4"
          name="company"
          placeholder="Company"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-xl w-full mb-4"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
        />

        <textarea
          className="border p-3 rounded-xl w-full mb-4"
          rows="4"
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-xl w-full mb-4"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-xl w-full mb-4"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-xl w-full mb-6"
          name="skillsRequired"
          placeholder="React, Node, MongoDB"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-3 rounded-xl"
        >
          🚀 Post Job
        </button>

      </div>

    </div>

  );

}

export default CreateJob;
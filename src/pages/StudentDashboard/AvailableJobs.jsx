import { useEffect, useState } from "react";
import api from "../../services/api";

function AvailableJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/job/all");
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await api.post(
        "/application/apply",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data.message);
  
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10 shadow-xl">
      
<h2 className="text-3xl font-semibold text-white mb-8">
  Available Jobs
</h2>

      {jobs.length === 0 ? (
        <p className="text-slate-500">No Jobs Available</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-7 mb-6 hover:border-indigo-500 transition duration-300"          >

            {/* Company */}

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-2xl font-semibold text-white">
                  {job.company}
                </h3>

                <p className="text-slate-500 mt-2">
                  {job.title}
                </p>

              </div>

              <div className="text-5xl">
                
              </div>

            </div>

            {/* Description */}

            <p className="text-slate-500 mt-6 leading-7">
              {job.description}
            </p>

            {/* Location & Salary */}

             <div className="flex flex-wrap gap-8 mt-6 text-slate-300">

              <p>
                Location: <b>{job.location}</b>
              </p>

              <p>
                Salary:  <b>{job.salary}</b>
              </p>

            </div>

            {/* Skills */}

            <div className="flex flex-wrap gap-3 mt-6">

              {job.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-700 border border-slate-600 text-indigo-300 px-4 py-2 rounded-full text-sm"                >
                  {skill}
                </span>
              ))}

            </div>

            {/* HR */}

            <div className="mt-6 text-slate-500">
              Posted By:

              <b>{job.hr?.companyName || "Unknown Company"}</b>

            </div>

            {/* Apply Button */}

            <button
              onClick={() => applyJob(job._id)}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition"            >
                    Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AvailableJobs;
import { useEffect, useState } from "react";
import api from "../../services/api";

function HRDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    
    const [editingJob, setEditingJob] = useState(null);
    
    const [editForm, setEditForm] = useState({
      company: "",
      title: "",
      location: "",
      salary: "",
      description: "",
    });

  useEffect(() => {
    fetchJobs();
  }, []);


const updateStatus = async (applicationId, status) => {
  try {

    const token = localStorage.getItem("token");

    await api.put(
      `/application/status/${applicationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(`Application ${status}`);

    // Refresh applicants list
    const currentJob = applicants[0]?.job?._id;

    if (currentJob) {
      fetchApplicants(currentJob);
    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }
};
  
  const fetchApplicants = async (jobId) => {
    try {
  
      const token = localStorage.getItem("token");
  
      const response = await api.get(
        `/application/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setApplicants(response.data.applicants);
  
      console.log(response.data.applicants);
  
    } catch (error) {
  
      console.log(error);
  
    }
  };


  const deleteJob = async (jobId) => {
    try {
  
      const token = localStorage.getItem("token");
  
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
      );
  
      if (!confirmDelete) return;
  
      await api.delete(`/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("✅ Job Deleted Successfully");
  
      fetchJobs();
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        error.response?.data?.message ||
        "Failed to delete job"
      );
  
    }
  };
  
  const updateJob = async () => {
    try {
  
      const token = localStorage.getItem("token");
  
      await api.put(
        `/job/${editingJob._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("✅ Job Updated Successfully");
  
      setEditingJob(null);
  
      fetchJobs();
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        error.response?.data?.message ||
        "Update Failed"
      );
  
    }
  };
  
  
  const fetchJobs = async () => {
    try {
      const response = await api.get("/job/all");
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className="min-h-screen bg-slate-950 p-8 text-white">
    {
  editingJob && (

    <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-5">
        ✏️ Edit Job
      </h2>

      <input
        className="border p-3 rounded-xl w-full mb-4"
        placeholder="Company"
        value={editForm.company}
        onChange={(e)=>
          setEditForm({
            ...editForm,
            company:e.target.value
          })
        }
      />

      <input
        className="border p-3 rounded-xl w-full mb-4"
        placeholder="Title"
        value={editForm.title}
        onChange={(e)=>
          setEditForm({
            ...editForm,
            title:e.target.value
          })
        }
      />

      <input
        className="border p-3 rounded-xl w-full mb-4"
        placeholder="Location"
        value={editForm.location}
        onChange={(e)=>
          setEditForm({
            ...editForm,
            location:e.target.value
          })
        }
      />

      <input
        className="border p-3 rounded-xl w-full mb-4"
        placeholder="Salary"
        value={editForm.salary}
        onChange={(e)=>
          setEditForm({
            ...editForm,
            salary:e.target.value
          })
        }
      />

      <textarea
        className="border p-3 rounded-xl w-full mb-4"
        rows="4"
        placeholder="Description"
        value={editForm.description}
        onChange={(e)=>
          setEditForm({
            ...editForm,
            description:e.target.value
          })
        }
      />

<button
  onClick={updateJob}
  className="bg-green-600 text-white px-6 py-3 rounded-xl"
>
  ✅ Update Job
</button>

    </div>

  )
}


<div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mb-12">

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Welcome HR 👋
      </h1>

      <p className="text-slate-500 mt-3 text-lg">
        Manage jobs, track applicants and hire the best candidates using AI.
      </p>

    </div>

    <button
      onClick={() => {
        window.location.href = "/hr/create-job";
      }}
      className="bg-indigo-600 hover:bg-slate-800 border border-slate-700 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300"
    >
      + Create Job
    </button>

  </div>

</div>



<div className="grid md:grid-cols-4 gap-6 mb-12">

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition">

    <p className="text-slate-500">
      Total Jobs
    </p>

    <h2 className="text-5xl font-bold text-indigo-400 mt-4">
      {jobs.length}
    </h2>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-green-500 transition">

    <p className="text-slate-500">
      Applicants
    </p>

    <h2 className="text-5xl font-bold text-green-400 mt-4">
      {applicants.length}
    </h2>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition">

    <p className="text-slate-500">
      Accepted
    </p>

    <h2 className="text-5xl font-bold text-blue-400 mt-4">
      {applicants.filter(a => a.status === "Accepted").length}
    </h2>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-red-500 transition">

    <p className="text-slate-500">
      Rejected
    </p>

    <h2 className="text-5xl font-bold text-red-400 mt-4">
      {applicants.filter(a => a.status === "Rejected").length}
    </h2>

  </div>

</div>

      {jobs.length === 0 ? (
        <p>No Jobs Found</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl border border-slate-200 p-8 mb-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"          >
                <h3 className="text-3xl font-bold text-white">      
            {job.title}
            </h3>

            <p className="text-slate-500 text-lg mt-2">     
                         {job.company}
            </p>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

<p className="text-slate-500 text-sm">

Company

</p>

<p className="font-bold text-xl text-white mt-2">

{job.company}

</p>

</div>

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

<p className="text-slate-500 text-sm">

Location

</p>

<p className="font-bold text-xl text-white mt-2">

📍 {job.location}

</p>

</div>

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

<p className="text-slate-500 text-sm">

Salary

</p>

<p className="font-bold text-xl text-white mt-2">

💰 {job.salary}

</p>

</div>

</div>

<div className=" bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-6">

<p className="font-semibold text-white mb-3">

Job Description

</p>

<p className="text-slate-300 leading-8">

{job.description}

</p>

</div>

            
         {applicants.length > 0 && (
  <div className="mt-6 border-t pt-4">

<h3 className="text-2xl font-bold mb-6"> 
🏆 AI Ranked Applicants
</h3>

<p className="text-slate-400 mb-6">
Applicants are ranked using <b>Semantic AI Matching</b>, not keyword matching.
</p>

{applicants.map((application, index)  => (

<div
key={application._id}
className="bg-slate-900 border border-slate-800 rounded-3xl shadow-lg p-8 mb-8 hover:shadow-2xl transition-all duration-300"
>

<div className="flex justify-between items-center">

<div>

<h2 className="text-2xl font-bold">

{index===0 && "🥇"}

{index===1 && "🥈"}

{index===2 && "🥉"}

{" "}

{application.student?.fullName}

</h2>

<p className="text-slate-400">

{application.student?.email}

</p>

</div>

<div className="text-right">

<span
className={`px-4 py-2 rounded-full text-sm font-bold ${
application.status==="Accepted"
?"bg-green-100 text-green-700"
:application.status==="Rejected"
?"bg-red-100 text-red-700"
:"bg-yellow-100 text-yellow-700"
}`}
>

{application.status}

</span>

<p className="text-sm text-slate-400">

Semantic Match

</p>

<p className="text-4xl font-bold text-blue-600">

{application.matchScore.toFixed(1)}%

</p>

</div>

</div>

        <p>
          <b>Email:</b> {application.student?.email}
        </p>

        <p>
          <b>College:</b> {application.student?.college}
        </p>

        <p>
          <b>Branch:</b> {application.student?.branch}
        </p>

        <hr className="my-5"/>

<div className="grid md:grid-cols-2 gap-6">

<div>

<h3 className="font-bold text-lg">

✅ Matched Skills

</h3>

<div className="flex flex-wrap gap-2 mt-3">

{application.matchedSkills?.map((skill,index)=>(

<span
key={index}
className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
>

{skill}

</span>

))}

</div>

</div>

<div>

<h3 className="font-bold text-lg">

❌ Missing Skills

</h3>

<div className="flex flex-wrap gap-2 mt-3">

{application.missingSkills?.map((skill,index)=>(

<span
key={index}
className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
>

{skill}

</span>

))}

</div>

</div>

</div>

<div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-4 mt-6">

<p>

<h3 className="text-xl text-white font-bold">
🤖 AI Recommendation
</h3>

</p>

<p className="mt-2">

{application.recommendation}

</p>

</div>

<div className="bg-slate-900 text-white rounded-xl p-4 mt-4">

<p>

<b>AI Reason</b>

</p>

<p className="mt-2">

{application.reason}

</p>

</div>

        <p className="mt-3">
  <b>Semantic Match Score:</b>{" "}

  <div className="w-full bg-slate-700 rounded-full h-3 mt-3">

<div

className={`h-3 rounded-full ${
application.matchScore>=80
?"bg-green-500"
:application.matchScore>=60
?"bg-yellow-500"
:"bg-red-500"
}`}

style={{
width:`${application.matchScore}%`
}}

>

</div>

</div>

  <span
    className={`font-bold ${
      application.matchScore >= 80
        ? "text-green-600"
        : application.matchScore >= 60
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    <span
className={`${
application.matchScore>=85
?"text-green-600"
:application.matchScore>=70
?"text-yellow-500"
:"text-red-500"
}`}
>

{application.matchScore.toFixed(1)}%

</span>
  </span>
</p>

<p className="mt-2">
  <b>Recommendation:</b>{" "}
  {application.recommendation}
</p>

<p className="mt-2">
  <b>Reason:</b>{" "}
  {application.reason}
</p>

<p className="mt-3">
  <b>Matched Skills:</b>
</p>

<div className="flex flex-wrap gap-2 mt-2">
  {application.matchedSkills?.map((skill, index) => (
    <span
      key={index}
      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
    >
      {skill}
    </span>
  ))}
</div>

<p className="mt-3">
  <b>Missing Skills:</b>
</p>

<div className="flex flex-wrap gap-2 mt-2">
  {application.missingSkills?.map((skill, index) => (
    <span
      key={index}
      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
    >
      {skill}
    </span>
  ))}
</div>

        <p className="mt-3">
  <b>Status:</b> {application.status}
</p>

<div className="flex gap-3 mt-4">

  <button
    onClick={() =>
      updateStatus(application._id, "Accepted")
    }
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    ✅ Accept
  </button>

  <button
    onClick={() =>
      updateStatus(application._id, "Rejected")
    }
    className="bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    ❌ Reject
  </button>

</div>
        
        <a
          href={application.student?.resume}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-semibold"
        >
          📄 View Resume
        </a>

      </div>

    ))}

  </div>
)}
            
            
            <div className="flex gap-3 mt-6">

  <button
    onClick={() => fetchApplicants(job._id)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
      >
    👥 View Applicants
  </button>

  <button
  onClick={() => {
    setEditingJob(job);

    setEditForm({
      company: job.company,
      title: job.title,
      location: job.location,
      salary: job.salary,
      description: job.description,
    });
  }}
  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl"
>
  ✏️ Edit Job
</button>

  <button
    onClick={() => deleteJob(job._id)}
    className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl"
  >
    🗑 Delete Job
  </button>

</div>
          </div>
        ))
      )}

    </div>
  );
}

export default HRDashboard;
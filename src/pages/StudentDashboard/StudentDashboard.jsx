import { useEffect, useState } from "react";
import api from "../../services/api";
import AvailableJobs from "./AvailableJobs";

import ResumeAnalyzer from "./ResumeAnalyzer";


function StudentDashboard() {


    const [student, setStudent] = useState(null);
    const [applications, setApplications] = useState([]);


  useEffect(() => {


    const fetchProfile = async () => {


      try {


        const token = localStorage.getItem("token");


        const response = await api.get(
          "/student/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        setStudent(response.data.student);

        console.log("Student Profile:", response.data.student);


      } catch(error) {

        console.log(error);

      }


    };


    fetchProfile();
    fetchApplications();


  }, []);

  const fetchApplications = async () => {
    try {
  
      const token = localStorage.getItem("token");
  
      const response = await api.get(
        "/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setApplications(response.data.applications);
      console.log("Applications:", response.data.applications);
  
    } catch (error) {
  
      console.log(error);
  
    }
  };


  return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Welcome Section */}

      {/* Hero */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl px-10 py-8 shadow-xl">

<div className="flex justify-between items-center">

    <div>

        <p className="text-sm text-slate-500 tracking-wide uppercase">
            Student Dashboard
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white mt-2">          
              Welcome back, {student?.fullName}
        </h1>

        <p className="text-slate-400 text-lg mt-4 max-w-2xl">
                   Manage your profile, analyse your resume using AI,
                   track applications and discover jobs ranked through
                   semantic matching.
        </p>

    </div>

    <div className="flex gap-4">

        <button
            onClick={()=>{
                window.location.href="/student/edit-profile";
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition"        >
            Edit Profile
        </button>

        <button
            onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("student");
                window.location.href="/login";
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-red-600 text-white transition"        >
            Logout
        </button>

    </div>

</div>

</div>


<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
<p className="text-slate-400">Resume Score</p>

<h2 className="text-5xl font-bold mt-3">
{student?.aiAnalysis?.resumeScore || "--"}
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
<p className="text-slate-400">Applications</p>

<h2 className="text-5xl font-bold mt-3">
{applications.length}
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
<p className="text-slate-400">Skills</p>

<h2 className="text-5xl font-bold mt-3">
{student?.skills?.length || 0}
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
<p className="text-slate-400">Projects</p>

<h2 className="text-5xl font-bold mt-3">
{student?.projects?.length || 0}
</h2>
</div>

</div>

      {/* Profile Information */}


      <div className="grid lg:grid-cols-2 gap-8 mt-8">

    {/* Profile */}

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-semibold mb-8">
            Profile Information
        </h2>

        <div className="grid gap-5 text-slate-300">

            <p><span className="text-slate-500">Name</span><br />{student?.fullName}</p>

            <p><span className="text-slate-500">Email</span><br />{student?.email}</p>

            <p><span className="text-slate-500">College</span><br />{student?.college}</p>

            <p><span className="text-slate-500">Branch</span><br />{student?.branch}</p>

            <p><span className="text-slate-500">Graduation Year</span><br />{student?.graduationYear}</p>

            <p><span className="text-slate-500">GitHub</span><br />{student?.github}</p>

            <p><span className="text-slate-500">LinkedIn</span><br />{student?.linkedin}</p>

        </div>

    </div>

    {/* Resume */}

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-semibold mb-8">
            Resume
        </h2>

        {
            student?.resume ? (

                <>
                    <p className="text-emerald-400 mb-6">
                        Resume uploaded successfully
                    </p>

                    <div className="flex gap-4">

                        <a
                            href={student.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl"
                        >
                            View Resume
                        </a>

                        <a
                            href={student.resume}
                            download
                            className="bg-emerald-500 hover:bg-emerald-400 px-5 py-3 rounded-xl"
                        >
                            Download
                        </a>

                    </div>

                </>

            ) : (

                <p className="text-red-400">
                    Resume not uploaded
                </p>

            )
        }

    </div>

</div>


      {/* Skills */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

{/* Skills */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <h2 className="text-3xl font-semibold mb-6">
        Skills
    </h2>

    <div className="flex flex-wrap gap-3">

        {student?.skills?.map((skill,index)=>(

            <span
                key={index}
                className="bg-slate-800 border border-slate-700 text-indigo-300 px-4 py-2 rounded-full"
            >
                {skill}
            </span>

        ))}

    </div>

</div>

{/* Projects */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <h2 className="text-3xl font-semibold mb-6">
        Projects
    </h2>

    {

        student?.projects?.map((project,index)=>(

            <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-4"
            >

                {project}

            </div>

        ))

    }

</div>

</div>

      


      <AvailableJobs />

      <ResumeAnalyzer />

      {/* My Applications */}

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-5 hover:border-indigo-500 transition">

<h2 className="text-3xl font-semibold mb-8">
Applications
</h2>

{
  applications.length === 0 ? (

    <p>No Applications Yet</p>

  ) : (

    applications
  .filter((application) => application.job)
  .map((application) =>(

      <div
        key={application._id}
        className="bg-slate-900
        border
        border-slate-700
        rounded-3xl
        p-6
        mb-5
        hover:border-indigo-500
        hover:shadow-xl
        transition-all
        duration-300"      >

        <h3 className="text-xl font-semibold">
          {application.job.company}
        </h3>

        <p className="text-slate-400 mt-2">
          {application.job.title}
        </p>

        <p className="mt-2">
        Location: {application.job.location}
        </p>

        <p>
        Salary: {application.job.salary}
        </p>

        <p className="mt-3 font-bold">
        Application Status :
          {" "}
          <span
            className={
              application.status === "Accepted"
                ? "text-green-600"
                : application.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {application.status}
          </span>
        </p>

      </div>

    ))

  )
}

</div>

      {/* AI Suggestions */}
    </div>

  );

}

function JobCard({company,role,score}) {
return (
<div className="border rounded-2xl p-5 hover:shadow-lg transition">

<h3 className="text-xl font-bold">
{company}
</h3>

<p className="text-gray-500 mt-2">
{role}
</p>

<p className="text-green-600 font-semibold mt-3">
AI Match : {score}
</p>


<button className="w-full bg-blue-600 text-white rounded-xl py-2 mt-5">

Apply

</button>


</div>

);


}

function Suggestion({title,description,score}) {

return (

<div className="flex items-center justify-between border rounded-xl p-4 mb-4">

<div>

<h3 className="font-semibold">
{title}
</h3>


<p className="text-gray-500 text-sm">
{description}
</p>

</div>

<span className="text-green-600 font-bold">
{score}
</span>

</div>
);
}
export default StudentDashboard;
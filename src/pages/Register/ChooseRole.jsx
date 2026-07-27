// import { FaUserTie, FaUserGraduate } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function ChooseRole() {

//   const navigate = useNavigate();

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center px-6">

//       <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-4xl">

//         <h1 className="text-4xl font-bold text-center">

//           Join SkillSync AI

//         </h1>

//         <p className="text-center text-gray-500 mt-4">

//           Choose how you want to use SkillSync AI

//         </p>

//         <div className="grid md:grid-cols-2 gap-8 mt-12">

//           <div

//             onClick={() => navigate("/register/employee")}

//             className="cursor-pointer rounded-3xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all p-8 text-center"

//           >

//             <FaUserGraduate

//               size={70}

//               className="mx-auto text-blue-600"

//             />

//             <h2 className="text-2xl font-bold mt-6">

//               Employee

//             </h2>

//             <p className="text-gray-500 mt-4">

//               Build your profile, upload skills,
//               discover opportunities and grow your career.

//             </p>

//           </div>

//           <div

//             onClick={() => navigate("/register/hr")}

//             className="cursor-pointer rounded-3xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all p-8 text-center"

//           >

//             <FaUserTie

//               size={70}

//               className="mx-auto text-blue-600"

//             />

//             <h2 className="text-2xl font-bold mt-6">

//               HR

//             </h2>

//             <p className="text-gray-500 mt-4">

//               Search employees,
//               discover hidden talent,
//               assign projects and build teams.

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default ChooseRole;


import { useNavigate } from "react-router-dom";

function ChooseRole() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "🎓 Student",
      description:
        "Create your profile, upload your resume, discover internships and jobs with AI-powered recommendations.",
      route: "/register/student",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "💼 Professional",
      description:
        "Showcase your experience, skills, and projects to find better career opportunities.",
      route: "/register/professional",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "👩‍💼 HR Recruiter",
      description:
        "Find skilled candidates, post jobs, and use AI to discover the best talent.",
      route: "/register/hr",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">

      <h1 className="text-4xl font-bold mb-3">
        Join SkillSync AI
      </h1>

      <p className="text-gray-600 mb-10 text-center">
        Choose how you want to continue
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">

        {roles.map((role) => (

          <div
            key={role.title}
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            <div
              className={`h-2 rounded-full bg-gradient-to-r ${role.color} mb-6`}
            ></div>

            <h2 className="text-2xl font-bold mb-4">
              {role.title}
            </h2>

            <p className="text-gray-600 mb-8">
              {role.description}
            </p>

            <button
              onClick={() => navigate(role.route)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Continue
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ChooseRole;
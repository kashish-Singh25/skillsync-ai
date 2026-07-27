// import { useState } from "react";
// import api from "../../services/api";
// import Input from "../../components/UI/Input/Input";

// import { useNavigate } from "react-router-dom";


// function StudentRegister() {

//     const navigate = useNavigate();
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     college: "",
//     branch: "",
//     year: "",
//     github: "",
//     linkedin: "",
//     skills: "",
//     projects: "",
//     resume: null,
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (form.password !== form.confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//       }
  
//       const response = await api.post("/student/register", {
//         fullName: form.fullName,
//         email: form.email,
//         password: form.password,
//         college: form.college,
//         branch: form.branch,
//         graduationYear: Number(form.year),
//         github: form.github,
//         linkedin: form.linkedin,
        
//         skills: form.skills
//         .split(",")
//         .map((skill)=>skill.trim()),
        
//         projects: form.projects,
//       });
  
//       alert(response.data.message);
  
//       navigate("/login");
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Registration Failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
//       <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">

//         <h1 className="text-4xl font-bold text-center text-blue-600">
//           🎓 Student Registration
//         </h1>

//         <p className="text-center text-gray-500 mt-2 mb-8">
//           Build your profile and start your placement journey.
//         </p>

//         <Input
//           label="Full Name"
//           name="fullName"
//           value={form.fullName}
//           onChange={handleChange}
//           placeholder="Enter your full name"
//         />

//         <Input
//           label="Email"
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//         />

//         <Input
//           label="Password"
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Create a password"
//         />

//         <Input
//           label="Confirm Password"
//           type="password"
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm your password"
//         />

//         <Input
//           label="College"
//           name="college"
//           value={form.college}
//           onChange={handleChange}
//           placeholder="Enter your college"
//         />

//         <Input
//           label="Branch"
//           name="branch"
//           value={form.branch}
//           onChange={handleChange}
//           placeholder="CSE / IT / ECE"
//         />

//         <Input
//           label="Current Year"
//           name="year"
//           value={form.year}
//           onChange={handleChange}
//           placeholder="placeholder=Graduation Year (e.g. 2028)"
//         />

// <Input
//   label="GitHub Profile"
//   name="github"
//   value={form.github}
//   onChange={handleChange}
//   placeholder="https://github.com/username"
// />

// <Input
//   label="LinkedIn Profile"
//   name="linkedin"
//   value={form.linkedin}
//   onChange={handleChange}
//   placeholder="https://linkedin.com/in/username"
// />

// <Input
//   label="Skills"
//   name="skills"
//   value={form.skills}
//   onChange={handleChange}
//   placeholder="React, Java, Python, SQL"
// />

// <Input
//   label="Projects"
//   name="projects"
//   value={form.projects}
//   onChange={handleChange}
//   placeholder="SkillSync AI, Portfolio Website"
// />

// <div className="mb-5">
//   <label className="block mb-2 font-medium text-gray-700">
//     Resume
//   </label>

//   <input
//     type="file"
//     accept=".pdf,.doc,.docx"
//     className="w-full border border-gray-300 rounded-xl p-3"
//   />
// </div>

// <div className="flex items-center gap-3 my-6">
//   <input type="checkbox" />

//   <p className="text-sm text-gray-600">
//     I agree to the Terms & Conditions and Privacy Policy.
//   </p>
// </div>

// <button
// //   onClick={() => navigate("/student/dashboard")}
//   onClick={handleSubmit}
//   className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
// >
//   Create Account
// </button>

//       </div>
//     </div>
//   );
// }

// export default StudentRegister;

import { useState } from "react";
import api from "../../services/api";
import Input from "../../components/UI/Input/Input";
import { useNavigate } from "react-router-dom";

function StudentRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    branch: "",
    year: "",
    github: "",
    linkedin: "",
    skills: "",
    projects: "",
    resume: null,
  });


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      if(form.password !== form.confirmPassword){

        alert("Passwords do not match!");
        return;

      }


      const response = await api.post(
        "/student/register",
        {

          fullName: form.fullName,

          email: form.email,

          password: form.password,

          college: form.college,

          branch: form.branch,


          graduationYear: Number(form.year),


          github: form.github,

          linkedin: form.linkedin,


          skills: form.skills
          .split(",")
          .map((skill)=>skill.trim()),


          projects: form.projects
          .split(",")
          .map((project)=>project.trim()),

        }
      );


      alert(response.data.message);


      navigate("/login");


    } catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );


    }

  };



  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">


        <h1 className="text-4xl font-bold text-center text-blue-600">
          🎓 Student Registration
        </h1>


        <p className="text-center text-gray-500 mt-2 mb-8">
          Build your profile and start your placement journey.
        </p>



        <form onSubmit={handleSubmit}>


          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />



          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />



          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
          />



          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />



          <Input
            label="College"
            name="college"
            value={form.college}
            onChange={handleChange}
            placeholder="Enter your college"
          />



          <Input
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            placeholder="CSE / IT / ECE"
          />



          <Input
            label="Graduation Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Example: 2028"
          />



          <Input
            label="GitHub Profile"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />



          <Input
            label="LinkedIn Profile"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />



          <Input
            label="Skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Java, Python, SQL"
          />



          <Input
            label="Projects"
            name="projects"
            value={form.projects}
            onChange={handleChange}
            placeholder="SkillSync AI, Portfolio Website"
          />



          <div className="mb-5">

            <label className="block mb-2 font-medium text-gray-700">
              Resume
            </label>


            <input

              type="file"

              accept=".pdf,.doc,.docx"

              className="w-full border border-gray-300 rounded-xl p-3"

            />

          </div>




          <div className="flex items-center gap-3 my-6">

            <input type="checkbox" />


            <p className="text-sm text-gray-600">

              I agree to the Terms & Conditions and Privacy Policy.

            </p>

          </div>




          <button

            type="submit"

            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"

          >

            Create Account

          </button>



        </form>


      </div>

    </div>

  );

}


export default StudentRegister;
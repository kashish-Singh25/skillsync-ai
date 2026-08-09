import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ProfessionalRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    currentJobTitle: "",
    company: "",
    experience: "",
    skills: "",
    projects: "",
    github: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/professional/register",
        {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          currentJobTitle: form.currentJobTitle,
          company: form.company,
          experience: Number(form.experience) || 0,

          skills: form.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),

          projects: form.projects
            .split(",")
            .map((project) => project.trim())
            .filter(Boolean),

          github: form.github,
          linkedin: form.linkedin,
        }
      );

      alert(
        response.data.message ||
          "Professional Registered Successfully"
      );

      navigate("/login");
    }  catch (error) {
      console.log("========== REGISTRATION ERROR ==========");
      console.log("Message:", error.message);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("URL:", error.config?.url);
      console.log("Base URL:", error.config?.baseURL);
    
      alert(
        `Registration Failed\n\nStatus: ${
          error.response?.status || "No response"
        }\nMessage: ${
          error.response?.data?.message ||
          error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-purple-600">
          💼 Professional Registration
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create your professional profile and discover
          better career opportunities.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="currentJobTitle"
            placeholder="Current Job Title"
            value={form.currentJobTitle}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="company"
            placeholder="Current Company"
            value={form.company}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            type="number"
            name="experience"
            placeholder="Years of Experience"
            value={form.experience}
            onChange={handleChange}
            min="0"
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="skills"
            placeholder="Skills: React, Node.js, AWS, SQL"
            value={form.skills}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="projects"
            placeholder="Projects: Project 1, Project 2"
            value={form.projects}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-xl p-3 mb-6"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Professional Account"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default ProfessionalRegister;
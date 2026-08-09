import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function HRRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hrName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyWebsite: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/hr/register", {
        hrName: formData.hrName,
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        companyWebsite: formData.companyWebsite,
        location: formData.location,
      });

      console.log("HR Registration Response:", response.data);

      setSuccess("HR registration successful! Redirecting to login...");

      setFormData({
        hrName: "",
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyWebsite: "",
        location: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("HR Registration Error:", err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">👩‍💼</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            HR Registration
          </h1>

          <p className="text-slate-400 mt-2">
            Create your recruiter account on SkillSync AI
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111c31] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* HR Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                HR Name
              </label>

              <input
                type="text"
                name="hrName"
                value={formData.hrName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Work Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hr@company.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
                />
              </div>

            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Website
                <span className="text-slate-500 ml-1">(Optional)</span>
              </label>

              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://company.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
                <span className="text-slate-500 ml-1">(Optional)</span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore, India"
                className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 text-sm">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition duration-200"
            >
              {loading ? "Creating Account..." : "Create HR Account"}
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-purple-400 hover:text-purple-300 font-medium transition"
              >
                Login
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HRRegister;
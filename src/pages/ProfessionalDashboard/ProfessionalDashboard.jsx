import { useEffect, useState } from "react";
import api from "../../services/api";

function ProfessionalDashboard() {
  const [professional, setProfessional] =
    useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          "/professional/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfessional(
          response.data.professional
        );
      } catch (error) {
        console.log(
          "Profile Error:",
          error
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800">
          💼 Professional Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to SkillSync AI
        </p>

        {professional && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold">
              Welcome, {professional.fullName} 👋
            </h2>

            <p className="text-gray-600 mt-3">
              📧 {professional.email}
            </p>

            {professional.currentJobTitle && (
              <p className="text-gray-600 mt-2">
                💼 {professional.currentJobTitle}
              </p>
            )}

            {professional.company && (
              <p className="text-gray-600 mt-2">
                🏢 {professional.company}
              </p>
            )}

            <div className="mt-5">
              <h3 className="font-semibold">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2 mt-2">
                {(professional.skills || []).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">

              <div className="bg-purple-50 rounded-xl p-5">
                <h3 className="font-bold">
                  🔎 Find Jobs
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Discover opportunities matching
                  your skills.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold">
                  🤖 AI Matching
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Get AI-powered job recommendations.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-bold">
                  📋 Applications
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Track your job applications.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ProfessionalDashboard;
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";

function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center">
      <div className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 AI Powered Internal Talent Discovery
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            No Employee
            <span className="text-blue-600"> Should Be </span>
            Overlooked.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            SkillSync AI helps organizations discover hidden talent,
            intelligently match employees with opportunities,
            and empower career growth using Artificial Intelligence.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>

            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              AI Talent Insights
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-semibold">Employees Analyzed</p>
                <p className="text-3xl font-bold text-blue-600">2,450+</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-semibold">Projects Matched</p>
                <p className="text-3xl font-bold text-purple-600">860+</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="font-semibold">AI Recommendations</p>
                <p className="text-3xl font-bold text-green-600">12,000+</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
function AuthLayout({ title, subtitle, children }) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-6 py-10">
  
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
  
          {/* Left Side */}
  
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-12 flex flex-col justify-center">
  
            <h1 className="text-5xl font-bold">
              SkillSync AI
            </h1>
  
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Discover hidden talent.
              Match employees intelligently.
              Build stronger teams with AI.
            </p>
  
            <div className="mt-12 space-y-6">
  
              <div>
                ✅ AI Talent Discovery
              </div>
  
              <div>
                ✅ Smart Employee Matching
              </div>
  
              <div>
                ✅ Personalized Career Growth
              </div>
  
            </div>
  
          </div>
  
          {/* Right Side */}
  
          <div className="p-12 flex flex-col justify-center">
  
            <h2 className="text-4xl font-bold">
              {title}
            </h2>
  
            <p className="text-gray-500 mt-3 mb-10">
              {subtitle}
            </p>
  
            {children}
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default AuthLayout;
import {
    Brain,
    Search,
    TrendingUp,
    Users,
  } from "lucide-react";
  
  import FeatureCard from "../FeatureCard/FeatureCard";
  
  function Features() {
    return (
      <section
        id="features"
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-8">
  
          <h2 className="text-4xl font-bold text-center">
            Why Choose
            <span className="text-blue-600">
              {" "}SkillSync AI?
            </span>
          </h2>
  
          <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto">
            AI-powered talent intelligence that helps
            organizations identify, nurture, and utilize
            employee skills effectively.
          </p>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
  
            <FeatureCard
              icon={<Search size={40} />}
              title="Semantic Search"
              description="Search employees using natural language instead of exact keywords."
            />
  
            <FeatureCard
              icon={<Brain size={40} />}
              title="AI Matching"
              description="Find the most suitable employees for projects using AI recommendations."
            />
  
            <FeatureCard
              icon={<TrendingUp size={40} />}
              title="Career Growth"
              description="Provide personalized learning paths and skill recommendations."
            />
  
            <FeatureCard
              icon={<Users size={40} />}
              title="Hidden Talent"
              description="Identify skilled employees who are often overlooked."
            />
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Features;
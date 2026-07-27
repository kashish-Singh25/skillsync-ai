import { UserPlus, BrainCircuit, Search, Trophy } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      id: "01",
      icon: <UserPlus size={36} />,
      title: "Create Employee Profile",
      description:
        "Employees add their skills, projects, certifications and upload their resume."
    },
    {
      id: "02",
      icon: <BrainCircuit size={36} />,
      title: "AI Understands Skills",
      description:
        "Our AI analyzes resumes and creates a semantic skill profile for every employee."
    },
    {
      id: "03",
      icon: <Search size={36} />,
      title: "HR Searches Naturally",
      description:
        "HR can search using natural language instead of exact keywords."
    },
    {
      id: "04",
      icon: <Trophy size={36} />,
      title: "Best Match Found",
      description:
        "SkillSync AI recommends the most suitable employees with confidence scores."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          How
          <span className="text-blue-600"> SkillSync AI </span>
          Works
        </h2>

        <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto">
          A simple four-step workflow that helps organizations discover
          the right talent using Artificial Intelligence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-5xl font-bold text-gray-200">
                {step.id}
              </div>

              <div className="text-blue-600 mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
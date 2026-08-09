function Stats() {
    const stats = [
      {
        number: "2500+",
        title: "Employees"
      },
      {
        number: "15000+",
        title: "Skills Indexed"
      },
      {
        number: "95%",
        title: "AI Match Accuracy"
      },
      {
        number: "120+",
        title: "Projects Filled"
      }
    ];
  
    return (
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-8">
  
          <h2 className="text-4xl font-bold text-center text-white">
            Trusted by Growing Organizations
          </h2>
  
          <p className="text-center text-blue-100 mt-4 mb-14">
            Helping companies identify talent with AI-powered insights.
          </p>
  
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
  
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all"
              >
                <h3 className="text-5xl font-bold text-blue-600">
                  {item.number}
                </h3>
  
                <p className="mt-3 text-gray-600 font-medium">
                  {item.title}
                </p>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Stats;
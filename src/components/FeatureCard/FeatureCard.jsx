function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="mb-5 text-blue-600">
          {icon}
        </div>
  
        <h3 className="text-xl font-bold mb-3">
          {title}
        </h3>
  
        <p className="text-gray-600 leading-7">
          {description}
        </p>
      </div>
    );
  }
  
  export default FeatureCard;
  
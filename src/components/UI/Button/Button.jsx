function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    className = "",
  }) {
    const baseStyle =
      "w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400";
  
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700",
  
      secondary:
        "border border-blue-600 text-blue-600 hover:bg-blue-50",
  
      danger:
        "bg-red-600 text-white hover:bg-red-700",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          SkillSync AI
        </Link>

        {/* Menu */}

        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="hover:text-blue-600 transition"
          >
            About
          </a>

          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>

          <Link to="/register">
                  <Button>Register</Button>
          </Link>
          

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
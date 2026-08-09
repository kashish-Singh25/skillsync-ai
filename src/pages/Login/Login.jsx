import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";


function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");



  const handleLogin = async () => {

    try {

        const endpoint =
        role === "student"
          ? "/student/login"
          : role === "hr"
          ? "/hr/login"
          : "/professional/login";
      
      const response = await api.post(endpoint, {
        email,
        password,
      });

      // Clear old login
localStorage.clear();

// Save Token
localStorage.setItem("token", response.data.token);

// Save User according to role
if (role === "student") {
  localStorage.setItem(
    "student",
    JSON.stringify(response.data.student)
  );
}

if (role === "hr") {
  localStorage.setItem(
    "hr",
    JSON.stringify(response.data.hr)
  );
}

if (role === "professional") {
  localStorage.setItem(
    "professional",
    JSON.stringify(response.data.professional)
  );
}


      alert("Login Successful");


      // Redirect after login
      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "hr") {
        navigate("/hr/dashboard");
      } else {
        navigate("/professional/dashboard");
      }

    } catch(error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };



  return (

    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue your journey."
    >


<div className="mt-4">
  <label className="block text-sm font-medium mb-2">
    Login As
  </label>

  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full border rounded-lg px-4 py-3"
  >
    <option value="student">👨‍🎓 Student</option>
    <option value="hr">👩‍💼 HR</option>
    <option value="professional">💼 Professional</option>
  </select>
</div>


      <Input

        label="Email"

        type="email"

        placeholder="Enter your email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

      />



      <Input

        label="Password"

        type="password"

        placeholder="Enter password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

      />



      <Button

        className="mt-6"

        onClick={handleLogin}

      >

        Login

      </Button>



    </AuthLayout>

  );

}


export default Login;
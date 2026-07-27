
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

import ChooseRole from "./pages/Register/ChooseRole";
import StudentRegister from "./pages/StudentRegister/StudentRegister";
import ProfessionalRegister from "./pages/ProfessionalRegister/ProfessionalRegister";
import HRRegister from "./pages/HRRegister/HRRegister";
import EmployeeDashboard from "./pages/ProfessionalDashboard/ProfessionalDashboard";

import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import EditProfile from "./pages/EditProfile/EditProfile";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import CreateJob from "./pages/CreateJob/CreateJob";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<ChooseRole />} />

        <Route path="/register/student" element={<StudentRegister />} />

        <Route path="/register/professional" element={<ProfessionalRegister />} />

        <Route path="/register/hr" element={<HRRegister />} />

        <Route
  path="/student/dashboard"
  element={<StudentDashboard />}
/>



        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        <Route 
 path="/student/edit-profile"
 element={<EditProfile />}
/>

<Route
  path="/hr/dashboard"
  element={<HRDashboard />}
/>

<Route
  path="/hr/create-job"
  element={<CreateJob />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
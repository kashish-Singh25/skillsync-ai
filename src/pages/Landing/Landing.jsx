// import Navbar from "../../components/Navbar/Navbar";

// function Landing() {
//   return (
//     <>
//       <Navbar />

//       <div className="flex justify-center items-center h-[80vh]">

//         <h1 className="text-6xl font-bold text-center">

//           Welcome to

//           <span className="text-blue-600">
//             {" "}
//             SkillSync AI
//           </span>

//         </h1>

//       </div>

//     </>
//   );
// }

// export default Landing;


import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
    </>
  );
}

export default Landing;